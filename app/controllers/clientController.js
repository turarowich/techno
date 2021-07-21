var bcrypt = require('bcryptjs');
const { useDB, sendError, saveImage, createQrFile, randomNumber, checkAccess, getClientDiscount } = require('../../services/helper')
var validate = require('../../config/messages');
const { query } = require('express');
const client = require('../models/client');
const LOG = require('./logController');
const Analytics = require('./analyticsController');
var path = require('path');
const fs = require('fs');

class ClientController{
    
    getClient = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");
        let Discount = db.model("Discount");
        let Order = db.model("Order");
        let ClientBonusHistory = db.model("clientBonusHistory");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "clients", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Sending client'
        }
        try {
            let discounts = await Discount.find()
            let client = await Client.findById(req.params.client).populate('messages').populate('category').exec()
            if(client){
                let discount = getClientDiscount(client,discounts);
                if (discount){
                    result['discount'] = discount
                }
                result['orders'] = await Order.find({client:client._id});
                result['history'] = await ClientBonusHistory.find({client:client._id});
            }
            
            result['object'] = client

        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    getClients = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "clients", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Sending clients'
        }
        try {
            
            let clients = await Client.find().populate('messages').populate('category').exec()

            result['objects'] = clients
        
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    addClient = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "clients", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Client added'
        }
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        addClient: try {
            let hashedPassword = bcrypt.hashSync(req.fields.password, 8);
            let number = randomNumber(100000, 1000000)
            let qrCode = createQrFile(number, req.db)
            let client = await new Client({
                name: req.fields.name,
                phone: req.fields.phone,
                email: req.fields.email,
                password: hashedPassword,
                birthDate: req.fields.birthDate,
                address: req.fields.address,
                category: req.fields.category,
                uniqueCode: number,
                QRCode: qrCode 
            }).save();
            
            if (req.files.avatar) {
                let filename = saveImage(req.files.avatar, req.db, null, true)
                if (filename == 'Not image') {
                    result = {
                        status: 500,
                        msg: "Validation error",
                        errors: {
                            img: validate[lang]['image_not_valid'],
                        },
                    }
                    break addClient
                } else {
                    client.avatar = filename
                    client.save()
                }
            }
            await Analytics.updateAnalytics(req, client.createdAt, false, true)
            client.password = 'secured';
            result['object'] = client
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    updateClient = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");
        let Log = db.model("Log");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "clients", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Client updated'
        }
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        updateClient: try {
            let query = { '_id': req.params.client }
            let client = null
            if (req.fields.birthDate) {
                req.fields.birthDate = req.fields.birthDate.replace('\r\n', '');
            }
            console.log(req.fields)
            if (req.fields.password && req.fields.password != "\r\n") {
                req.fields.password = req.fields.password.trim()
                client = await Client.findOneAndUpdate(query, req.fields, {
                    new: true
                }).select('+password')
                await client.save()
                client.password = bcrypt.hashSync(req.fields.password, 8);
                await client.save()

            }else{
                delete req.fields.password
                
                client = await Client.findOneAndUpdate(query, req.fields, {
                    new: true
                })
            }

            if (req.files.avatar) {
                let filename = saveImage(req.files.avatar, req.db, null, true)
                if (filename == 'Not image') {
                    result = {
                        status: 500,
                        msg: "Validation error",
                        errors: {
                            img: validate[lang]['image_not_valid'],
                        },
                    }
                    break updateClient
                } else {
                    client.avatar = filename
                    await client.save({
                        new: true
                    })
                }
            }
            
            if (req.fields.apns){
                client.apns.push(req.fields.apns)
                await client.save()
            }
            await new Log({
                type: "client_updated",
                description: client.name + " "+ client.phone,
                user: req.userName,
                user_id: req.userID,
                icon: "update"
            }).save()

            await Analytics.updateAnalytics(req, client.createdAt, false, true)
            result['object'] = client
        } catch (error) {
            console.log(error)
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    saveAvatar = async function (req, res) {
        let db = useDB(req.db)
        let company = req.db;
        let clientModel = db.model("Client");
        let client = req.fields.client;
        let img = req.fields.avatar;
        let ext = img.substring("data:image/".length, img.indexOf(";base64"));
        let file_name = client+'.'+ext;
        let dir = path.join(__dirname, '/../../views/frontend/images/' + company);
        let full_file_name = 'images/' + company+'/'+file_name;

        let update = {
            avatar:full_file_name
        };
        let result = {
            'status': 200,
            'msg': '',
        }
        console.log('try STARTING SER SAVE');
        try {
            //remove old
            let client_object = await clientModel.findById(client);
            if(client_object.avatar){
                let remove_path = path.join(__dirname, '/../../views/frontend/'+client_object.avatar);
                await fs.unlinkSync(remove_path);
            }

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
            await clientModel.findOneAndUpdate({_id:client}, update);
            result.msg = 'Success';
            result.avatar = full_file_name;
        }catch (errr){
            console.log(errr);
            result.msg = 'errr';
        }
        res.status(result.status).json(result);
    }
    checkPromocode = async function (req, res) {
        console.log(req.fields);
        let db = useDB(req.db);
        let promocode = req.fields.promocode;
        let client_id = req.fields.client;
        let clientModel = db.model("Client");
        let ClientBonusHistory = db.model("clientBonusHistory");
        let receives_points_back = false;
        let result = {
            'status': 200,
            'msg': '',
        }
        all_check: try{
            //check if exists and its not his own
            //check if client already has received the promo points
            //check if client that shared also receives points
            let check = await clientModel.find({promocode:promocode,_id:{ "$ne": client_id }});
            if (check.length===0){
                result.status = 404;
                result.msg = "Promocode not found";
                break all_check;
            }
            let client = await clientModel.findById(client_id);
            let sender = await clientModel.findById(check[0]._id);

            if(client.promocodeIsUsed){
                result.status = 404;
                result.msg = "Already used promocode";
                break all_check;
            }


            //Cashback points
            let cashback_model = db.model("Cashback");
            let cashbackAll = await cashback_model.find();
            let cashback = cashbackAll[0];
            let cashback_points = cashback.share_points_quant;
            if (cashback.receive_back_points_status){
                receives_points_back = true;
            }

            if(cashback_points>0){
                client.points = parseFloat(client.points ) + parseFloat(cashback_points);
                client.promocodeIsUsed = true;
                client.whosePromoUsed = sender ? sender._id : null;
                await client.save();
                await new ClientBonusHistory({
                    client: client._id,
                    points: cashback_points,
                    source: 'Share points received',
                    type: 'received',
                }).save();
                //sender
                if(sender && receives_points_back){
                    sender.points = parseFloat(sender.points ) + parseFloat(cashback_points);
                    await sender.save();
                    await new ClientBonusHistory({
                        client: sender._id,
                        points: cashback_points,
                        source: 'Points for sharing',
                        type: 'received',
                    }).save();
                }
            }
        }catch (e){
            result.msg = "AAAA";
            console.log(e);
        }
        res.status(result.status).json(result);
    }

    updateClientsCategory = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "clients", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Sending clients'
        }
        
        try {
            let  query = {}
            if (req.fields.category){
                req.fields.objects.forEach(async function(client, index){
                    query = { '_id': client }
                    await Client.findOneAndUpdate(query, req.fields)
                })
            }
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    deleteClient = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");
        let Log = db.model("Log");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "clients", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Client deleted'
        }
        try {

            let query = { '_id': req.params.client }
            let client = await Client.findById(query)
            if (client) {
                await new Log({
                    type: "client_deleted",
                    description: client.name + ' ' + (client.phone ? client.phone : ""),
                    user: req.userName,
                    user_id: req.userID,
                    icon: "delete"
                }).save()
            }
            await Client.findByIdAndRemove(query)

        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    
    deleteClients = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");
        let Log = db.model("Log");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "clients", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Clients deleted'
        }
        if (req.fields.objects.length) {
            try {
                let query = {
                    '_id': {
                        $in: req.fields.objects
                    }
                }
                let clients = await Client.find(query, 'name')

                if (clients.length) {
                    let desc = clients.map(function (elem) {
                        return elem.name +' ' + (client.phone ? client.phone : "");
                    }).join(", ")
                    await new Log({
                        type: "clients_deleted",
                        description: desc,
                        user: req.userName,
                        user_id: req.userID,
                        icon: "delete"
                    }).save()
                }
                
                await Client.deleteMany(query)
            } catch (error) {
                result = sendError(error, req.headers["accept-language"])
            }
        } else {
            result = {
                'status': 200,
                'msg': 'Parametr objects is empty'
            }
        }


        res.status(result.status).json(result);
    };

    addClientDevice = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");
        let Device = db.model("Device");

        let result = {
            'status': 200,
            'msg': 'Devce added'
        }
        try {
            let client = await Client.findById(req.fields.client)
            if (client) {
                let device = await Device.findOne({ "token": req.fields.device_token})
                if (device){
                    device.client = req.fields.client
                    device.save()
                    result['msg'] = "Devce changed"
                }else{
                    device = await new Device({
                        client: req.fields.client,
                        token: req.fields.device_token,
                        type: req.fields.type
                    }).save();
                }
            }
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    updatedMessagesStatus = async function (req, res) {
        let db = useDB(req.db)
        let Message = db.model("Message");
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "chat", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Messages updated'
        }
        try {
            Message.updateMany({ client: req.params.client}, { new: false });
            
        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    };

    clearMessages = async function (req, res) {
        let db = useDB(req.db)
        let Message = db.model("Message");
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "chat", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Messages cleared'
        }
        try {
            for (let client of req.fields.clients){
                await Message.deleteMany({ client: client }, function (err) { })
            }

        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    };
    getNewMessages = async function (req, res) {
        let db = useDB(req.db)
        let Message = db.model("Message");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "chat", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        let result = {
            'status': 200,
            'msg': 'Messages send'
        }
        try {
            let query = {
                new: true
            }
            if (req.fields.client) {
                query['client'] = req.fields.client
            }

            if (req.fields.isIncoming !== '') {
                query['isIncoming'] = req.fields.isIncoming
            }
            console.log(query, req.fields.isIncoming)
            let messages = await Message.find(query)
            result['objects'] = messages
        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    }


    addPoints = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");
        let Log = db.model("Log");
        let ClientBonusHistory = db.model("clientBonusHistory");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "addPoint" }, db, res)
            if (checkResult) {
                return;
            }
        }
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        let result = {
            'status': 200,
            'msg': 'Points added'
        }
        try {
            let query = {
                _id: req.fields.client
            }
            let client = await Client.findById(query)
            if(client){
                client.points = (parseFloat(client.points) + parseFloat(req.fields.points)).toFixed(2);
                await client.save({ validateBeforeSave: false });
                await new ClientBonusHistory({
                    client: client._id,
                    points: req.fields.points,
                    source: 'Points added by company',
                    type: 'received',
                }).save();
                await new Log({
                    type: "points_added",
                    description: client.name + " successfully_get",
                    value: req.fields.points + 'P',
                    valueColor: "done",
                    user: req.userName,
                    user_id: req.userID,
                    icon: "addPoint"
                }).save()
            }
        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    }

    deductPoints = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");
        let Log = db.model("Log");
        let ClientBonusHistory = db.model("clientBonusHistory");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "addPoint" }, db, res)
            if (checkResult) {
                return;
            }
        }
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        let result = {
            'status': 200,
            'msg': 'Points deducted'
        }
        try {
            let query = {
                _id: req.fields.client
            }
            let client = await Client.findById(query)
            if(client){
                if (parseFloat(client.points) < parseFloat(req.fields.points)) {
                    req.fields.points = client.points
                }
                client.points = (parseFloat(client.points) - parseFloat(req.fields.points)).toFixed(2);

                await client.save({ validateBeforeSave: false });
                await new ClientBonusHistory({
                    client: client._id,
                    points: -req.fields.points,
                    source: 'Points deducted by company',
                    type: 'deducted',
                }).save();
                await new Log({
                    type: "points_deducted",
                    description: "from_client " + client.name + " writting_off",
                    value: -req.fields.points + 'P',
                    valueColor: "canceled",
                    user: req.userName,
                    user_id: req.userID,
                    icon: "delete"
                }).save()
            }   
            
        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    }
    getPoints = async function (req, res) {
        let db = useDB(req.db)
        let ClientBonusHistory = db.model("clientBonusHistory");
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        let result = {
            'status': 200,
            'msg': 'Points sending'
        }
        try {
            let query = {
                client: req.userID
            }
            let points = await ClientBonusHistory.find(query)
            result['objects'] = points
        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    }

}


module.exports = new ClientController();
