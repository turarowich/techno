var bcrypt = require('bcryptjs');
const { useDB, sendError, saveImage, createQrFile, randomNumber } = require('../../services/helper')
var validate = require('../../config/messages');
const { query } = require('express');
const client = require('../models/client');

class ClientController{
    
    getClient = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");
        let Discount = db.model("Discount");

        let result = {
            'status': 200,
            'msg': 'Sending client'
        }
        try {
            let discounts = await Discount.find()
            let client = await Client.findById(req.params.client).populate('messages').populate('category').exec()
            if(client){
                let discount = null
                for (let i = 0; i < discounts.length; i++) {
                    if (client.balance >= discounts[i].min_sum_of_purchases) {
                        discount = discounts[i]
                    }
                }
                if (discount){
                    result['discount'] = discount
                }
                
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
                let filename = saveImage(req.files.avatar, req.db)
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
                let filename = saveImage(req.files.avatar, req.db)
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
            result['object'] = client
        } catch (error) {
            console.log(error)
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    updateClientsCategory = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");

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

        let result = {
            'status': 200,
            'msg': 'Client deleted'
        }
        try {

            let query = { '_id': req.params.client }
            await Client.findByIdAndRemove(query)

        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    
    deleteClients = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");

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
        let result = {
            'status': 200,
            'msg': 'Messages cleared'
        }
        try {

            Message.deleteMany({ client: req.params.client }, function (err) { })

        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    };
    getNewMessages = async function (req, res) {
        let db = useDB(req.db)
        let Message = db.model("Message");
        
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

            if (req.fields.from != '') {
                query['isIncoming'] = req.fields.from
            }
            let messages = await Message.find(query)
            result['objects'] = messages
        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    }

}


module.exports = new ClientController();
