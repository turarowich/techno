var bcrypt = require('bcryptjs');
const { useDB, sendError, saveImage, createQrFile, randomNumber, checkAccess, getClientDiscount } = require('../../services/helper')
var validate = require('../../config/messages');
const client = require('../models/client');
const Analytics = require('./analyticsController');
var path = require('path');
const fs = require('fs');
const ObjectId = require('mongoose').Types.ObjectId;
class WorkerController {
    getWorker = async function (req, res) {
        let db = useDB(req.db)
        let Worker = db.model("Worker");
        // let ClientBonusHistory = db.model("clientBonusHistory");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "clients", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Sending woorker'
        }
        try {
            if(!ObjectId.isValid(req.params.worker)){
                res.status(404).json({ status: 404, msg: 'Not valid ObjectID' }); //todo make global check for all oid
                return;
            }
            let worker = await Worker.findById(req.params.worker)
            if (!worker) {
                res.status(403).json({ status: 403, msg: 'Worker not found' }); //todo
                return;
            }
            // if(worker){
            //     let discount = getClientDiscount(client,discounts);
            //     if (discount){
            //         result['discount'] = discount
            //     }
            //     result['orders'] = await Order.find({ client: client._id }).populate('client').populate('sample').populate('branch').populate('branchObject').populate('manager').exec();
            //     result['history'] = await ClientBonusHistory.find({client:client._id});
            // }
            let newClient = '';
            const copy = JSON.parse(JSON.stringify(worker));
            newClient = copy
            result['object'] = newClient

        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };

    getWorkers = async function (req, res) {
        let db = useDB(req.db)
        let Worker = db.model("Worker");
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
            
            let workers = await Worker.find()
            result['objects'] = workers

        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    addWorker = async function (req, res) {
        let db = useDB(req.db)
        let Worker = db.model("Worker");
        let Log = db.model("Log");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "clients", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Worker added'
        }
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        addClient: try {
            let number = randomNumber(100000, 1000000)
            let worker = await new Worker({
                name: req.fields.name,
                phone: req.fields.phone,
                email: req.fields.email,
                uniqueCode: number,
                comment: req.fields.comment,
                role: req.fields.role
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
                    worker.avatar = filename
                    worker.save()
                }
            }
            await Analytics.updateAnalytics(req, worker.createdAt, false, true)
            await new Log({
                type: "Добавление работника",
                description: worker.name + " "+ worker.phone,
                user: req.userName,
                user_id: req.userID,
                icon: "add"
            }).save()
            result['object'] = worker
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };

    updateWorker = async function (req, res) {
        let db = useDB(req.db)
        let Worker = db.model("Worker");
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
        updateWorker: try {
            let query = { '_id': req.params.worker }
            let worker = await Worker.findById(query)
            worker.name = req.fields.name ? req.fields.name : worker.name;
            worker.phone = req.fields.phone ? req.fields.phone : worker.phone;
            worker.email = req.fields.email ? req.fields.email : worker.email;
            worker.balance = (typeof req.fields.balance !== 'undefined') ? req.fields.balance : worker.balance;
            worker.role = req.fields.role ? req.fields.role : worker.role;
            worker.comment = req.fields.comment ? req.fields.comment : worker.comment;
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
                    break updateWorker
                } else {
                    worker.avatar = filename
                    await worker.save({
                        new: true
                    })
                }
            }
            
            await worker.save()
            await new Log({
                type: "Обновление работника",
                description: worker.name + " "+ worker.phone,
                user: req.userName,
                user_id: req.userID,
                icon: "update"
            }).save()

            await Analytics.updateAnalytics(req, worker.createdAt, false, true)
            result['object'] = worker
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };
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

    deleteWorker = async function (req, res) {
        let db = useDB(req.db)
        let Worker = db.model("Worker");
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

            let query = { '_id': req.params.worker }
            let worker = await Worker.findById(query)
            if (client) {
                await new Log({
                    type: "Удаление работника",
                    description: worker.name + ' ' + (worker.phone ? worker.phone : ""),
                    user: req.userName,
                    user_id: req.userID,
                    icon: "delete"
                }).save()
            }
            await Worker.findByIdAndRemove(query)

        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    deleteWorkers = async function (req, res) {
        let db = useDB(req.db)
        let Worker = db.model("Worker");
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
                let workers = await Worker.find(query, 'name')

                if (workers.length) {
                    let desc = workers.map(function (elem) {
                        return elem.name +' ' + (elem.phone ? elem.phone : "");
                    }).join(", ")
                    await new Log({
                        type: "Удаление работников",
                        description: desc,
                        user: req.userName,
                        user_id: req.userID,
                        icon: "delete"
                    }).save()
                }
                
                await Worker.deleteMany(query)
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
                    type: "Добавление бонусов",
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
                    type: "Удаление бонусов",
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
    addWork = async function (req, res) {
        let db = useDB(req.db)
        let Worker = db.model("Worker");
        let Log = db.model("Log");
        let WorkHistory = db.model("WorkHistory");
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
                _id: req.fields.worker
            }
            let worker = await Worker.findById(query)
            if(worker){
                worker.balance = (parseFloat(worker.balance) + parseFloat(req.fields.sum)).toFixed(2);
                await worker.save({ validateBeforeSave: false });
                await new WorkHistory({
                    worker: worker._id,
                    sample: req.fields.sample,
                    order: req.fields.order,
                    count: req.fields.count,
                }).save();
                await new Log({
                    type: "Добавление работы",
                    description: worker.name + " Успешно выполнил",
                    value: req.fields.count + 'P',
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

    getWorks = async function (req, res) {
        let db = useDB(req.db)
        let WorkHistory = db.model("WorkHistory");
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
                worker: req.params.worker
            }
            let works = await WorkHistory.find(query).populate('worker').populate('sample').populate('order').exec()
            result['objects'] = works
        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    }

    addPrepay  = async function (req, res) {
        let db = useDB(req.db)
        let Worker = db.model("Worker");
        let Log = db.model("Log");
        let WorkerPrePay = db.model("WorkerPrePay");
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
            'msg': 'Prepay added'
        }
        try {
            let query = {
                _id: req.fields.worker
            }
            let worker = await Worker.findById(query)
            if(worker){
                worker.balance = (parseFloat(worker.balance) - parseFloat(req.fields.sum)).toFixed(2);
                await worker.save({ validateBeforeSave: false });
                await new WorkerPrePay({
                    worker: worker._id,
                    comment: req.fields.comment,
                    sum: req.fields.sum,
                }).save();
                await new Log({
                    type: "Выдача аванса",
                    description: worker.name + " Успешно получил аванс",
                    value: req.fields.sum + 'P',
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

    getPrepay = async function (req, res) {
        let db = useDB(req.db)
        let WorkerPrePay = db.model("WorkerPrePay");
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        let result = {
            'status': 200,
            'msg': 'Prepay sending'
        }
        try {
            let query = {
                worker: req.params.worker
            }
            let prepays = await WorkerPrePay.find(query).populate('worker').exec()
            result['objects'] = prepays
        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    }


}


module.exports = new WorkerController();
