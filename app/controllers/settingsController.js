var bcrypt = require('bcryptjs');
const { useDB, sendError } = require('../../services/helper')
var validate = require('../../config/messages');
const { query } = require('express');
const mongoose = require("mongoose");

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
            }
            let branches = await Branch.find()
            let deliveries = await Delivery.find()

            result['object'] = settings
            result['branches'] = branches
            result['deliveries'] = deliveries
        
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    updateSettings = async function (req, res) {
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
            }
            
            let updateSettings = await Settings.findOneAndUpdate({ '_id': settings._id }, req.fields, {
                new: true
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
