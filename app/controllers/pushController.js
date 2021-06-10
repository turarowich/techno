var bcrypt = require('bcryptjs');
const { useDB, sendError } = require('../../services/helper')
var validate = require('../../config/messages');
var config = require('../../config/config');
const { query } = require('express');
var apn = require('apn');
var path = require('path')
var dir = path.join(__dirname, "../../keys/" + config.APNs)

var options = {
    token: {
        key: dir,
        keyId: config.APNsKeyID,
        teamId: config.APNsTeamID
    },
    production: false
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
        
        let data = await News.findById(req.params.id)
        let result = {
            'status': 500,
            'msg': 'Something went wrong'
        }
        if (data) {
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
                topic: config.APNsTopic
            });
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
        if (client) {
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
                topic: config.APNsTopic
            });
            console.log(noteIOS)
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


    
}


module.exports = new PushController();
