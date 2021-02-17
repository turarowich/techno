const category = require("../models/category");

const db = global.userConnection.useDb("loygift");
const Client = db.model("Client");
const Category = db.model("Category");

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

    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }
    
    res.status(result.status).json(result);
};
