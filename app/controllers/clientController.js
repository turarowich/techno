const category = require("../models/category");

const db = global.userConnection.useDb("loygift");
const Client = db.model("Client");
const Category = db.model("Category");

exports.getClient = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Sending client'
    }
    try {
        let client = await Client.findById(req.params.client)
        result['client'] = client
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.getClients = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Sending clients'
    }
    try {
        let clients = await Client.find()
        result['clients'] = clients
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.addClient = async function(req, res) {
    let result = {
        'status': 200,
        'msg': 'Client added'
    }
    try {
        let category = await Category.findById(req.body.category)

        let client = await new Client({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            birthDate: req.body.birthDate,
            address: req.body.address,
            category: category._id
        }).save();
        result['client'] = client
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }
    
    res.status(result.status).json(result);
};

exports.updateClient = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Client updated'
    }
    try {
        let query = {'_id': req.params.client}
        let client = await Client.findOneAndUpdate(query, req.body)
        result['client'] = client
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.deleteClient = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Client deleted'
    }
    try {
        let query = { '_id': req.params.client }
        await Client.findByIdAndRemove(query)
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};