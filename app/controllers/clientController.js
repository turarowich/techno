var bcrypt = require('bcryptjs');
const { useDB, sendError } = require('../../services/helper')
var validate = require('../../config/messages');
const { query } = require('express');
class ClientController{
    
    getClient = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");
        
        let result = {
            'status': 200,
            'msg': 'Sending client'
        }
        try {
            
            let client = await Client.findById(req.params.client).populate('messages').populate('category').exec()
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
        try {
            let hashedPassword = bcrypt.hashSync(req.fields.password, 8);

            let client = await new Client({
                firstName: req.fields.firstName,
                lastName: req.fields.lastName,
                phone: req.fields.phone,
                email: req.fields.email,
                password: hashedPassword,
                birthDate: req.fields.birthDate,
                address: req.fields.address,
                category: req.fields.category
            }).save();
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
        try {
            let query = { '_id': req.params.client }
            req.fields.password = bcrypt.hashSync(req.fields.password, 8);

            let client = await Client.findOneAndUpdate(query, req.fields)
            
            if (req.fields.apns){
                client.apns.push(req.fields.apns)
                client.save()
            }
            client.password = 'secured';
            result['object'] = client
        } catch (error) {
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

}


module.exports = new ClientController();
