var bcrypt = require('bcryptjs');
const { useDB, sendError } = require('../../services/helper')
var validate = require('../../config/messages');
var config = require('../../config/config');
const { query } = require('express');
var apn = require('apn');
var path = require('path')
var dir = path.join(__dirname, "../../keys/" + config.APNs)
console.log(dir)
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
                    title: "Hi there",
                    subtitle: "We present our new clothes",
                    body: "Check it our when it's in stock"
                },
                sound: "default",
                topic: config.APNsTopic
            });
            
            apnProvider.send(noteIOS, devicesIOS.map(device => device.token)).then((response) => {
                if (response.failed.length){
                    response.failed.forEach((fail) => {
                        if (fail.status == '400' && fail.response.reason == 'BadDeviceToken'){
                            let device = devicesIOS.find(device => device.token == fail.device)
                            if(device) device.deleteOne()
                        }
                    });
                }
            });
        }
        res.status(result.status).json(result);
    };


    
}


module.exports = new PushController();
