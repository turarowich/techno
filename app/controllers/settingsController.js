var bcrypt = require('bcryptjs');
const { useDB, sendError, saveImage, checkAccess } = require('../../services/helper')
var validate = require('../../config/messages');
const { query } = require('express');
const mongoose = require("mongoose");

const delivery = require('../models/delivery');
const config = require("../../config/config");
const QRCode = require('qrcode');
var path = require('path');
const fs = require('fs')
class SettingsController{
    
    getSettingsClient = async function (req, res) {
        let db = useDB('loygift' + req.headers['access-place']);
        let Settings = db.model("Settings");
        let Delivery = db.model("Delivery");
        let Branch = db.model("Branch");
        let Discount = db.model("Discount");

        let result = {
            'status': 200,
            'msg': 'Sending settings'
        }

        if (!req.headers['access-place']) {
            result.msg = "Wrong access place"
        } else {
            try {
                let settings = await Settings.find()
                settings = settings[0]

                let branches = await Branch.find()
                let deliveries = await Delivery.find()
                let discounts = await Discount.find().sort({ "discount_percentage": "asc" })

                result['object'] = settings
                result['branches'] = branches
                result['deliveries'] = deliveries
                result['discounts'] = discounts;
                console.log(discounts)

            } catch (error) {
                result = sendError(error, req.headers["accept-language"])
            }
        }
        res.status(result.status).json(result);
    };

    getSettings = async function (req, res) {
        //
        let shoes_db = useDB('loygift');
        let catalogs_model = shoes_db.model("catalogs");
        //
        let db = useDB(req.db)
        let Settings = db.model("Settings");
        let Delivery = db.model("Delivery");
        let Branch = db.model("Branch");
        let Discount = db.model("Discount");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Sending settings'
        }
        try {
            let settings = await Settings.find();
            settings = settings[0];
            if (!settings){
                settings = await new Settings({
                    slogan: " ",
                }).save();
                /////
                let company = req.db.slice(7);//removing loygift
                await new catalogs_model({
                    company: company,
                }).save();
                /////
            }
            let branches = await Branch.find()
            let deliveries = await Delivery.find()
            let discounts = await Discount.find().sort({ "discount_percentage": "asc" })

            result['object'] = settings;
            result['company'] = req.db;
            result['branches'] = branches;
            result['deliveries'] = deliveries;
            result['discounts'] = discounts;
            console.log(await Discount.find())
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };

    updateSettings = async function (req, res) {
        //
        let shoes_db = useDB('loygift');
        let catalogs_model = shoes_db.model("catalogs");
        //
        let db = useDB(req.db)
        let Settings = db.model("Settings");
        let Delivery = db.model("Delivery");
        let Branch = db.model("Branch");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Settings updated'
        }
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        updateSettings: try {
            
            if(req.fields.deliveries){
                for (let delivery of req.fields.deliveries){
                    if ('_id' in delivery){
                        await Delivery.findOneAndUpdate({ "_id": delivery._id }, delivery)
                    }else{
                        await new Delivery(delivery).save();
                    }
                }
            }
            if (req.fields.branches) {
                for (let branch of req.fields.branches) {
                    if ('_id' in branch) {
                        await Branch.findOneAndUpdate({ "_id": branch._id }, branch)
                    } else {
                        await new Branch(branch).save();
                    }
                }
            }
            
            let settings = await Settings.find()
            settings = settings[0]
            if (!settings) {
                settings = await new Settings({
                    slogan: " ",
                }).save();

                /////
                await new catalogs_model({
                    company: req.db,
                }).save();
                /////
            }

            let updateSettings = await Settings.findOneAndUpdate({ '_id': settings._id }, req.fields, {
                new: true
            }).then(async function (set){
                //new func
                let company = req.db.slice(7);//removing loygift
                console.log(company,"settings company");
                await catalogs_model.findOneAndUpdate({ 'company': company }, {cat_url:set.catalogUrl}, {
                    new: true
                })
            })
            updateSettings = await Settings.find()
            updateSettings = updateSettings[0]

            if (req.files.logo) {
                let filename = saveImage(req.files.logo, req.db)
                if (filename == 'Not image') {
                    result = {
                        status: 500,
                        msg: "Validation error",
                        errors: {
                            img: validate[lang]['image_not_valid'],
                        },
                    }
                    break updateSettings
                } else {
                    updateSettings.logo = filename
                    updateSettings.save()
                }
            }
            if (req.files.backgroundImageApp) {
                let filename = saveImage(req.files.backgroundImageApp, req.db)
                if (filename == 'Not image') {
                    result = {
                        status: 500,
                        msg: "Validation error",
                        errors: {
                            img: validate[lang]['image_not_valid'],
                        },
                    }
                    break updateSettings
                } else {
                    updateSettings.backgroundImageApp = filename
                    updateSettings.save()
                }
            }


            let branches = await Branch.find()
            let deliveries = await Delivery.find()
            
            result['object'] = updateSettings
            result['branches'] = branches
            result['deliveries'] = deliveries
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    generateQrCodeFile = async function (req, res) {
        // console.log(req.app._router);
        let result = {
            'status': 200,
            'validation':1,
            'msg': '',
        }
        let catalog = req.fields.catalog;
        ///express routes check
        let route, routes = [];
        req.app._router.stack.forEach(function(middleware){
            if(middleware.route){ // routes registered directly on the app
                routes.push(middleware.route);
            } else if(middleware.name === 'router'){ // router middleware
                middleware.handle.stack.forEach(function(handler){
                    route = handler.route;
                    route && routes.push(route.path);
                });
            }
        });

        routes.forEach(function (path){
            if(path.search(catalog)!==-1){
                result.msg = 'Url reserved';
                result.validation = 0;
                ///return if express route match;
                return res.status(200).json(result);
            }

        })
        //check
        ///main_db _check
        let main_db = global.userConnection.useDb('loygift');
        let catalogs_model = main_db.model("catalogs");
        ///new catalog route

        ///check
        let found = await catalogs_model.find( { "cat_url": catalog } );
        if(found.length>0){
            result.msg = 'Url already exists';
            result.validation = 0;
            return res.status(200).json(result);
        }

        let company_id = req.db.slice(7);//removing loygift
        await catalogs_model.findOneAndUpdate({ "company": company_id },{cat_url:catalog});

        let this_company = useDB(req.db);
        let Settings = this_company.model("Settings");

        //
        let catalogUrl = req.fields.catalogUrl;
        let company = req.db;
        let dir = path.join(__dirname, '/../../views/frontend/images/' + company+'/qr');

        try {
            function createQrFile(){
                let filename = dir + '/' + 'code.png';
                QRCode.toFile(filename, catalogUrl, {
                    color: {
                        dark: '#000000',  // Blue dots
                        light: '#0000' // Transparent background
                    }
                }, function (err) {
                    if (err) throw err
                    console.log('done')
                })
            }

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {recursive: true}, err => {
                    console.log(err)
                })
            }
            createQrFile();
            result.msg = 'Success';
            await Settings.findOneAndUpdate(req.fields.settings_id, {catalogUrl:catalog});
        }catch (errr){
            result.msg = 'errr';
        }
        res.status(result.status).json(result);
    }
    saveSettingsFile = async function (req, res) {
        let type = req.fields.type;
        let db = useDB(req.db)
        let settings_model = db.model("Settings");
        let company = req.db;
        let img = req.fields.logo;
        // let regex = /^data:.+\/(.+);base64,(.*)$/
        // let matches = img.match(regex);
        // let ext = matches[1];
        let ext = img.substring("data:image/".length, img.indexOf(";base64"));

        let dir = path.join(__dirname, '/../../views/frontend/images/' + company+'/logo');
        let full_file_name = 'images/' + company+'/logo/logo.'+ext;
        let file_name = 'logo.'+ext;
        let update = {};
        if(type==='banner'){
            dir = path.join(__dirname, '/../../views/frontend/images/' + company+'/banner');
            full_file_name = 'images/' + company+'/banner/banner.'+ext;
            update.banner=full_file_name;
            file_name='banner.'+ext;
        }else{
            update.logo=full_file_name;
        }

        let result = {
            'status': 200,
            'msg': '',
        }
        console.log('try STARTING SER SAVE');
        try {
            // strip off the data: url prefix to get just the base64-encoded bytes
            let data = img.replace(/^data:image\/\w+;base64,/, "");
            let buf = Buffer.from(data, 'base64');
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {recursive: true}, err => {
                    console.log(err)
                })
            }
            await fs.writeFile(dir+ "/" + file_name, buf,function (out){
                console.log(out,"9090099")
            });
            await settings_model.findOneAndUpdate(req.fields.id, update);
            result.msg = 'Success';
        }catch (errr){
            result.msg = 'errr';
        }
        res.status(result.status).json(result);
    }

    deleteDelivery = async function (req, res) {
        let db = useDB(req.db)
        let Delivery = db.model("Delivery");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Delivery deleted'
        }
        try {
            let query = { '_id': req.params.delivery }
            await Delivery.findByIdAndRemove(query)
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    deleteBranch = async function (req, res) {
        let db = useDB(req.db)
        let Branch = db.model("Branch");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Branch deleted'
        }
        try {
            let query = { '_id': req.params.branch }
            await Branch.findByIdAndRemove(query)

        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };
    addBranch = async function (req, res) {
        let new_branch = req.fields.branch;
        let db = useDB(req.db)
        let Branch = db.model("Branch");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Branch added'
        }
        try {
            await new Branch(new_branch).save();
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };
    getBranch = async function (req, res) {
        let db = useDB(req.db)
        let Branch = db.model("Branch");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active"}, db, res)
            if (checkResult) {
                return;
            }
        }
        
        let result = {
            'status': 200,
            'msg': 'Branch added'
        }
        try {
            result['object']= await Branch.findById(req.query.branch);
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };
    updateBranch = async function (req, res) {
        let edit_branch = req.fields.branch;
        let db = useDB(req.db)
        let Branch = db.model("Branch");
        let result = {
            'status': 200,
            'msg': 'Branch updated'
        }
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        try {
            let query = { '_id': edit_branch._id }
            req.fields['updatedAt'] = new Date()
            result['object'] = await Branch.findOneAndUpdate(query, edit_branch)
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };

    addDeliveryOption = async function (req, res) {
        console.log(req);
        let new_option = req.fields.option;
        let db = useDB(req.db)
        let Delivery = db.model("Delivery");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Delivery option added'
        }
        try {
            await new Delivery(new_option).save();
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };
    getDeliveryOption = async function (req, res) {
        let db = useDB(req.db)
        let Delivery = db.model("Delivery");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Delivery on da way'
        }
        try {
            result['object']= await Delivery.findById(req.query.delivery);
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };
    updateDeliveryOption = async function (req, res) {
        let edit_option = req.fields.option;
        let db = useDB(req.db)
        let Delivery = db.model("Delivery");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Branch updated'
        }
        try {
            let query = { '_id': edit_option._id }
            req.fields['updatedAt'] = new Date()
            result['object'] = await Delivery.findOneAndUpdate(query, edit_option)
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };

    getPersonalSettings = async function (req, res) {
        let users = useDB('loygift');
        let personal_model = users.model("User");
        let db = useDB(req.db)
        let Settings = db.model("Settings");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Sending settings'
        }
        try {
            let settings = await Settings.find();
            settings = settings[0];
            let company = req.db.slice(7);//removing loygift
            if (!settings){
                settings = await new Settings({
                    slogan: " ",
                }).save();
                /////
                await new catalogs_model({
                    company: company,
                }).save();
                /////
            }
            result['object'] = settings;
            ///////////////////////////////////////////////////////
            let user = await personal_model.findById(company);
            result['user'] = user;
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };
    updatePersonalSettings = async function (req, res) {
        let users = useDB('loygift');
        let personal_model = users.model("User");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Updated'
        }
        try {
            let filter = { '_id': req.fields._id };
            let user = await personal_model.findOne(filter);
            if(user){
                user.name =req.fields.name;
                user.email =req.fields.email;
                user.phone =req.fields.phone;
            }
            if(req.fields.password.length!==0){
                user.password = bcrypt.hashSync(req.fields.password, 8);
            }
            await user.validate();
            await user.save();
            // result['user']=await personal_model.findOneAndUpdate(filter,user,{runValidators:true} );
            result['user']=user;
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    }
}


module.exports = new SettingsController();
