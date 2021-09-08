var bcrypt = require('bcryptjs');
const { useDB, sendError } = require('../../services/helper')
var validate = require('../../config/messages');
var config = require('../../config/config');
const { query } = require('express');
var apn = require('apn');
var path = require('path')
var dir = path.join(__dirname, "../../keys/" + config.APNs)
var moment = require('moment')
var options = {
    token: {
        key: dir,
        keyId: config.APNsKeyID,
        teamId: config.APNsTeamID
    },
    production: true
};


try {
    var apnProvider = new apn.Provider(options);
}catch (err){
    console.log(err);
}

class PushController {
    sendNewsPN = async function (req, res) {
        let db = useDB(req.db)
        let News = db.model("News");
        let Device = db.model("Device");
        let Settings = db.model("Settings");
        let settings = await Settings.find()
        settings = settings[0]
        let data = await News.findById(req.params.id)
        let result = {
            'status': 500,
            'msg': 'Something went wrong'
        }
        if (data && settings) {
            result['status'] = 200
            result['msg'] = "Sending news"
            result['object'] = data
            let devicesIOS = await Device.find({'type': 'ios'})
            let noteIOS = new apn.Notification({
                alert: {
                    title: data.name,
                    subtitle: "",
                    body: data.desc,
                },
                mutableContent: 1,
                payload:{
                    name: data.name,
                    name_ru: data.name_ru,
                    desc: data.desc,
                    desc_ru: data.desc_ru,
                    img: data.img,
                    date: data.startDate,
                    type: "news",
                },
                sound: "default",
                topic: settings.APNsTopic
            });
            console.log('this is topic',settings.APNsTopic)
            apnProvider.send(noteIOS, devicesIOS.map(device => device.token)).then((response) => {
                console.log(response)
                if (response.failed.length){
                    
                    response.failed.forEach((fail) => {
                        console.log(fail.response)
                        if (fail.status == '400' && fail.response.reason == 'BadDeviceToken'){
                            let device = devicesIOS.find(device => device.token == fail.device)
                            if(device) device.deleteOne()
                        }
                    });
                }
            }).catch(function (error) {
                console.log("Faled to send message to ", error);
            });
        }
        res.status(result.status).json(result);
    };
    sendNewMessage = async function (req_db, client, message) {
        let db = useDB(req_db)
        let Device = db.model("Device");
        let Message = db.model("Message");
        let Settings = db.model("Settings");
        let settings = await Settings.find()
        settings = settings[0]
        if (client && settings) {
            let messages = await Message.find({ 'client': client, 'new': true, 'isIncoming': true })
            let devicesIOS = await Device.find({ 'type': 'ios', 'client': client })
            let noteIOS = new apn.Notification({
                alert: {
                    title: "New message",
                    subtitle: "",
                    body: message.text,
                },
                badge: messages.length,
                mutableContent: 1,
                payload: {
                    type: "message",
                },
                sound: "default",
                topic: settings.APNsTopic
            });
            apnProvider.send(noteIOS, devicesIOS.map(device => device.token)).then((response) => {
                if (response.failed.length) {
                    response.failed.forEach((fail) => {
                        console.log(fail.response)
                        if (fail.status == '400' && fail.response.reason == 'BadDeviceToken') {
                            let device = devicesIOS.find(device => device.token == fail.device)
                            if (device) device.deleteOne()
                        }
                    });
                }
            }).catch(function (error) {
                console.log("Faled to send message to ", error);
            });
        }
    };

    sendNewMessageAndroid = async function (req_db, client, message) {
        console.log("sendNewMessageAndroid")
        let db = useDB(req_db)
        let Device = db.model("Device");
        const admin = require("../../app");
        try{
            let devicesAndroid = await Device.find({ 'type': 'android', 'client': message.client })
            console.log("sendNewMessageAndroid",devicesAndroid)
            let registrationToken = ""
            if(devicesAndroid.length > 0){
                registrationToken = devicesAndroid[0].token
            }
            const message1 = {
                notification : {
                    body : message.text,
                    title: "New message"
                },
                data: {
                    text: message.text,
                },
                token: registrationToken
            };

            admin.messaging().send(message1)
                .then((response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                });
        }catch (e) {
            console.log("EEEE",e)
        }

    };


    sendPushNotification = async function (req, res) {
        let db = useDB(req.db)
        let Device = db.model("Device");
        let Settings = db.model("Settings");
        let settings = await Settings.find()
        let News = db.model("News");
        settings = settings[0]
        let clients = req.fields.clients
        let data = await News.findById(req.fields.news)
        if (!data) {
            data = await new News({
                name: req.fields.title,
                name_ru: req.fields.title,
                desc: req.fields.description,
                desc_ru: req.fields.description,
                category: "news",
            });
        }
        let result = {
            'status': 500,
            'msg': 'Something went wrong'
        }
        if (clients && settings) {
            let query = { 'type': 'ios', 'client': { $in: clients } }

            if (req.fields.sendToAll){
                query = {}
            }
            let devicesIOS = await Device.find(query)

            let noteIOS = new apn.Notification({
                alert: {
                    title: data.name,
                    subtitle: "",
                    body: data.desc,
                },
                mutableContent: 1,
                payload: {
                    name: data.name,
                    name_ru: data.name_ru,
                    desc: data.desc,
                    desc_ru: data.desc_ru,
                    img: data.img,
                    date: data.startDate,
                    type: "news",
                },
                sound: "default",
                topic: settings.APNsTopic
            });
            if (apnProvider){
                apnProvider.send(noteIOS, devicesIOS.map(device => device.token)).then((response) => {
                    if (response.failed.length) {
                        response.failed.forEach((fail) => {
                            if (fail.status == '400' && fail.response.reason == 'BadDeviceToken') {
                                let device = devicesIOS.find(device => device.token == fail.device)
                                if (device) device.deleteOne()
                            }
                        });
                    }
                }).catch(function (error) {
                    console.log("Faled to send message to ", error);
                });
            }
            result['status'] = 200
            result['msg'] = "Sending push notifications"
        }
        res.status(result.status).json(result);
    };


    // SCHEDULE PUSH model functions listed
    getSchedulePush = async function (req, res) {
        let db = useDB(req.db)
        let SchedulePush = db.model("SchedulePush");
        let result = {
            'status': 200,
            'msg': 'Sending schedulePush'
        }
        try {
            let schedulePush = await SchedulePush.findById(req.params.object).populate('clients').exec()
            result['object'] = schedulePush
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    getSchedulePushes = async function (req, res) {
        let db = useDB(req.db)
        let SchedulePush = db.model("SchedulePush");
        let result = {
            'status': 200,
            'msg': 'Sending schedule pushs'
        }
        try {
            let schedulePushes = await SchedulePush.find().populate('clients').exec()
            result['objects'] = schedulePushes
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    addSchedulePush = async function (req, res) {
        let db = useDB(req.db)
        let SchedulePush = db.model("SchedulePush");
        let Log = db.model("Log");
        let result = {
            'status': 200,
            'msg': 'SchedulePush added'
        }
        try {
            let schedulePush = await new SchedulePush(req.fields).save();
            await new Log({
                type: "schedule_push_added",
                description: schedulePush.title,
                user: req.userName,
                user_id: req.userID,
                icon: "add"
            }).save()
            schedulePush = await SchedulePush.find({ '_id': schedulePush._id}).populate('clients').exec()
            result['object'] = schedulePush
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    updateSchedulePush = async function (req, res) {
        let db = useDB(req.db)
        let SchedulePush = db.model("SchedulePush");
        let Log = db.model("Log");
        let result = {
            'status': 200,
            'msg': 'SchedulePush updated'
        }
        try {

            let query = { '_id': req.params.object }
            req.fields['updatedAt'] = new Date()
            let schedulePush = await SchedulePush.findOneAndUpdate(query, req.fields)
            await new Log({
                type: "schedule_push_updated",
                description: schedulePush.title,
                user: req.userName,
                user_id: req.userID,
                icon: "update"
            }).save()
            schedulePush = await SchedulePush.find({ '_id': schedulePush._id }).populate('clients').exec()
            result['object'] = schedulePush
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    deleteSchedulePush = async function (req, res) {
        let db = useDB(req.db)
        let SchedulePush = db.model("SchedulePush");
        let Log = db.model("Log");
        let result = {
            'status': 200,
            'msg': 'SchedulePush deleted'
        }
        try {
            let query = { '_id': req.params.object }
            let schedulePush = await SchedulePush.findById(query)
            if (schedulePush) {
                await new Log({
                    type: "schedule_push_deleted",
                    description: schedulePush.title,
                    user: req.userName,
                    user_id: req.userID,
                    icon: "delete"
                }).save()
            }
            await SchedulePush.findByIdAndRemove(query)
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    
    deleteSchedulePushes = async function (req, res) {
        let db = useDB(req.db)
        let SchedulePush = db.model("SchedulePush");
        let Log = db.model("Log");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "catalog", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'SchedulePushes deleted'
        }
        if (req.fields.objects.length) {
            try {
                let query = {
                    '_id': {
                        $in: req.fields.objects
                    }
                }
                let schedulePushes = await SchedulePush.find(query, 'title')

                if (schedulePushes.length) {
                    let desc = schedulePushes.map(function (elem) {
                        return elem.title;
                    }).join(", ")
                    await new Log({
                        type: "schedule_pushes_deleted",
                        description: desc,
                        user: req.userName,
                        user_id: req.userID,
                        icon: "delete"
                    }).save()
                }

                await SchedulePush.deleteMany(query)
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

    sendSchedulePushes = async function (req, res) {
        let db = useDB("loygift")
        let User = db.model("User");
        let users = await User.find()
        console.log("Starting push loop")
        let today = (moment().format('dddd')).toLowerCase();
        let query = { 'isActive': true }
        query[`${today}.isActive`] = true
        for(let user of users){
            db = useDB("loygift" + user._id)
            let Device = db.model("Device");
            let Settings = db.model("Settings");
            let SchedulePush = db.model("SchedulePush");
            let settings = await Settings.find()
            settings = settings[0]
            
            let data = await SchedulePush.find(query)
            console.log("Checking company", "loygift" + user._id)
            for(let info of data){                        
                let devicesIOS = await Device.find(query)
                let query = { 'type': 'ios', 'client': { $in: info.clients } }
                if (info.sendToAll) {
                    query = {}
                }
                let todayInfo = info[today]
                console.log("Get info from", today, info[today])
                for (let push of todayInfo.push) {
                    // First compare two dates
                    let nowDate = (new Date()).setHours(0, 0, 0, 0)
                    let infoDate = (new Date(info.sendAt)).setHours(0, 0, 0, 0)
                    if (nowDate <= infoDate) {
                        console.log("Already send push", today)
                        return;
                    }

                    // Second compare times
                    let now = moment.minutes() + moment.hours() * 60;
                    let infoTime = parseInt(push.time.slice(0, 2)) + parseInt(push.time.slice(3, 5)) * 60
                    if (now < infoTime) {
                        console.log("Time not has come", push.time, moment.format("HH:mm"))
                        return;
                    }
                    push.sendAt = new Date()
                    await push.save()
                    console.log("Everything is okay start to send", push.title)
                    let noteIOS = new apn.Notification({
                        alert: {
                            title: push.title,
                            subtitle: "",
                            body: push.desc,
                        },
                        mutableContent: 1,
                        payload: {
                            type: "individual",
                        },
                        sound: "default",
                        topic: settings.APNsTopic
                    });
                    if (apnProvider) {
                        apnProvider.send(noteIOS, devicesIOS.map(device => device.token)).then((response) => {
                            if (response.failed.length) {
                                response.failed.forEach((fail) => {
                                    if (fail.status == '400' && fail.response.reason == 'BadDeviceToken') {
                                        let device = devicesIOS.find(device => device.token == fail.device)
                                        if (device) device.deleteOne()
                                    }
                                });
                            }
                        }).catch(function (error) {
                            console.log("Faled to send message to ", error);
                        });
                    }
                    console.log("Finish push", push.title)
                }
            }
        }
        return;
    };

    
}


module.exports = new PushController();
