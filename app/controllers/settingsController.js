var bcrypt = require('bcryptjs');
const { useDB, sendError,saveImage } = require('../../services/helper')
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
                result['object'] = settings
                result['branches'] = branches
                result['deliveries'] = deliveries

            } catch (error) {
                result = sendError(error, req.headers["accept-language"])
            }
        }
        

        res.status(result.status).json(result);
    };

    getSettings = async function (req, res) {
        //
        let shoes_db = useDB(config.Shoes);
        let catalogs_model = shoes_db.model("catalogs");
        //
        let db = useDB(req.db)
        let Settings = db.model("Settings");
        let Delivery = db.model("Delivery");
        let Branch = db.model("Branch");

        let result = {
            'status': 200,
            'msg': 'Sending client'
        }
        try {
            
            let settings = await Settings.find()
            settings = settings[0]
            if (!settings){
                settings = await new Settings({
                    slogan: " ",
                }).save();
                /////
                await new catalogs_model({
                    company: settings._id,
                }).save();
                /////
            }
            let branches = await Branch.find()
            let deliveries = await Delivery.find()

            result['object'] = settings[0];
            result['imgPath'] = req.db;
            result['branches'] = branches;
            result['deliveries'] = deliveries;
        
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    updateSettings = async function (req, res) {
        //
        let shoes_db = useDB(config.Shoes);
        let catalogs_model = shoes_db.model("catalogs");
        //
        let db = useDB(req.db)
        let Settings = db.model("Settings");
        let Delivery = db.model("Delivery");
        let Branch = db.model("Branch");

        let result = {
            'status': 200,
            'msg': 'Settings updated'
        }
        try {
            
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
                await catalogs_model.findOneAndUpdate({ 'company': req.db }, {cat_url:set.catalogUrl}, {
                    new: true
                })
            })


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
        let catalogUrl = req.fields.catalogUrl;
        let company = req.db;
        let dir = path.join(__dirname, '/../../views/frontend/images/' + company+'/qr')
        let result = {
            'status': 200,
            'msg': '',
        }
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
        }catch (errr){
            result.msg = 'errr';
        }
        res.status(result.status).json(result);
    }
    saveSettingsFile = async function (req, res) {
        let company = req.db;
        //directory for the logo
        let dir = path.join(__dirname, '/../../views/frontend/images/' + company+'/logo');
        let result = {
            'status': 200,
            'msg': '',
        }
        try {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {recursive: true}, err => {
                    console.log(err)
                })
            }

            //remove old
            // fs.readdir(dir, (err, files) => {
            //     files.forEach(file => {
            //         console.log(file,'fileeeeeeeeee');
            //         if(file.split('.')[0] === 'logo') fs.unlink( dir + file );
            //     });
            // });


            let img = req.fields.logo;
            let regex = /^data:.+\/(.+);base64,(.*)$/
            let matches = img.match(regex)
            let ext = matches[1]
            // strip off the data: url prefix to get just the base64-encoded bytes
            let data = img.replace(/^data:image\/\w+;base64,/, "");
            let buf = Buffer.from(data, 'base64');
            fs.writeFile(dir+ "/" + 'logo.'+ext, buf,function (out){
                console.log(out,"9090099")
            });

            result.msg = 'Success';
        }catch (errr){
            result.msg = 'errr';
        }


        res.status(result.status).json(result);

    }

    deleteDelivery = async function (req, res) {
        let db = useDB(req.db)
        let Delivery = db.model("Delivery");

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

}


module.exports = new SettingsController();
