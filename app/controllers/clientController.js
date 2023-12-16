var bcrypt = require('bcryptjs');
const { useDB, sendError, saveImage, createQrFile, randomNumber, checkAccess, getClientDiscount } = require('../../services/helper')
var validate = require('../../config/messages');
const { query } = require('express');
const client = require('../models/client');
const LOG = require('./logController');
const Analytics = require('./analyticsController');
var path = require('path');
const fs = require('fs');

class ClientController {

    getClientInfoScan = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");
        let Discount = db.model("Discount");
        let Settings = db.model("Settings");
        let OrderScan = db.model("OrderScan");

        let result = {
            'status': 200,
            'msg': 'Points were transferred',
        };

        try {
            let discounts = await Discount.find();
            let settings = await Settings.find();
            let logo = '';
    
            if(settings.length>0){
                logo = settings[0].logo;
            }    
             
            let client = await Client.findOne({uniqueCode:req.fields.clientCode});
            let discount_obj = getClientDiscount(client,discounts); 
            await new OrderScan({
                client: client._id,
            }).save();
    
            let slimClient = {
                'name':client.name,
                'img':client.avatar,
                'phone':client.phone,
                'discount_percentage': discount_obj?.discount_percentage ?? 0,
                'logo':logo,
            }
            result['client'] = slimClient;
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    }
    
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
            let client = await Client.findById(req.params.client).populate('messages').populate('category').populate('news').exec()
            if(client){
                let discount = getClientDiscount(client,discounts);
                if (discount){
                    result['discount'] = discount
                }
                result['orders'] = await Order.find({ client: client._id }).populate('client').populate('products').exec();
                result['history'] = await ClientBonusHistory.find({client:client._id});
            }
            let newClient = '';
            const copy = JSON.parse(JSON.stringify(client));
            copy.discount = getClientDiscount(client,discounts) ? getClientDiscount(client,discounts).discount_percentage : 0;
            newClient = copy
            result['object'] = newClient

        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };

    getClients = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");
        let Order = db.model("Order");
        let Discount = db.model("Discount");
        let discounts = await Discount.find();
        let OrderScan = db.model("OrderScan");
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
            
            let clients = await Client.find().populate('messages').populate('category').exec();

            let newClient = [];
            for (const cl of clients) {
                let copy = JSON.parse(JSON.stringify(cl));
                copy.orders = await Order.find({client:cl._id});
                copy.discount = getClientDiscount(cl,discounts) ? getClientDiscount(cl,discounts).discount_percentage : 0;
                copy.scans = await OrderScan.find({client:cl._id}).sort({ createdAt: -1 });
                let last_scanned_date_full = copy.scans[0] ? copy.scans[0].createdAt : null;
                let last_scanned_date=null;
                if(last_scanned_date_full){
                    const year = last_scanned_date_full.getFullYear();
                    const month = String(last_scanned_date_full.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                    const day = String(last_scanned_date_full.getDate()).padStart(2, '0');
                    last_scanned_date = `${year}-${month}-${day}`;
                }
                copy.last_scanned_date = last_scanned_date;

                newClient.push(copy);
            }

            result['objects'] = newClient

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
            let client = await Client.findById(query).populate("news")
            client.name = req.fields.name ? req.fields.name : client.name;
            client.phone = req.fields.phone ? req.fields.phone : client.phone;
            client.email = req.fields.email ? req.fields.email : client.email;
            client.balance = req.fields.balance ? req.fields.balance : client.balance;
            client.gender = req.fields.gender ? req.fields.gender : client.gender;
            
            client.custom_field_0 = req.fields.custom_field_0
            client.custom_field_1 = req.fields.custom_field_1
            client.custom_field_2 = req.fields.custom_field_2
            if (req.fields.birthDate) {
                client.birthDate = req.fields.birthDate.replace('\r\n', '');
            }
            if (req.fields.password && req.fields.password != "\r\n") {
                client.password = req.fields.password.trim()
                await client.save()
                client.password = bcrypt.hashSync(req.fields.password, 8);
                await client.save()
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
            await client.save()
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
        let db = useDB(req.db);
        let promocode = req.fields.promocode;
        let client_id = req.userID;
        let clientModel = db.model("Client");
        let ClientBonusHistory = db.model("clientBonusHistory");
        let receives_points_back = false;
        let result = {
            'status': 200,
            'msg': 'Sending points',
        }
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        all_check: try{
            //check if exists and its not his own
            //check if client already has received the promo points
            //check if client that shared also receives points
            let check = await clientModel.find({promocode:promocode,_id:{ "$ne": client_id }});
    
            if (check.length===0){
                result.status = 404;
                result.msg = "Promocode not found";
                result.client_title = validate[lang]['promo_404']
                break all_check;
            }
            
            let client = await clientModel.findById(client_id);
            let sender = await clientModel.findById(check[0]._id);

            if(client.promocodeIsUsed){
                result.status = 404;
                result.msg = "Already used promocode";
                result.client_title = validate[lang]['promo_already_used']
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
                await client.save({validateBeforeSave: false});
                let point = await new ClientBonusHistory({
                    client: client._id,
                    points: cashback_points,
                    source: 'Share points received',
                    type: 'received',
                }).save();
                result.object = point
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
            req.fields.objects.forEach(async function(client, index){
                query = { '_id': client }
                await Client.findOneAndUpdate(query, req.fields)
            })
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

    deleteClientNews = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");
        let ClientNews = db.model("ClientNews");
        let Log = db.model("Log");
        let result = {
            'status': 200,
            'msg': 'Client news deleted'
        }
        try {

            let query = { '_id': req.userID }
            let client = await Client.findById(query)
            for(let news of client.news){
                if (news._id == req.params.news){
                    await ClientNews.findOneAndDelete({ '_id': news._id})
                    break
                }
            }

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
        console.log("ADDING DEVICE",req.fields.device_token);
        console.log(req.db,"DB");
        let db = useDB(req.db)
        let Client = db.model("Client");
        let Device = db.model("Device");

        let result = {
            'status': 200,
            'msg': 'Device added'
        }
        try {
            let client = await Client.findById(req.fields.client)
            console.log(client._id);
            if (client) {
                // let device = await Device.findOne({ "token": req.fields.device_token})//old
                let device = await Device.findOne({ "client": client})//new 04/10/21
                console.log(device,"DEVICE");
                if (device){
                    // device.client = req.fields.client //old
                    device.token = req.fields.device_token //new 04/10/21
                    device.save({ validateBeforeSave: false })
                    result['msg'] = "Device changed"
                }else{
                    try {
                        console.log("CREATED 1",req.fields.device_token);
                        let newDevice = await new Device({
                            client: req.fields.client,
                            token: req.fields.device_token,
                            type: req.fields.type
                        }).save({ validateBeforeSave: false });
                        console.log("CREATED-",newDevice);
                    } catch (error) {
                        console.log(error,"ADD DEVICE ERROR");
                    }

                }
            }
        } catch (error) {
            console.log(error,"ERORORRR");
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

            if (req.fields.isIncoming !== '' && req.fields.isIncoming !== undefined) {
                query['isIncoming'] = req.fields.isIncoming
            }
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
                    comments:req.fields.comments,
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
                    comments:req.fields.comments,
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
