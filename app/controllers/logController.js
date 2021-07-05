var bcrypt = require('bcryptjs');
const { useDB, sendError, checkAccess } = require('../../services/helper')
var validate = require('../../config/messages');
var config = require('../../config/config');
const { query } = require('express');
var path = require('path')
var dir = path.join(__dirname, "../../keys/" + config.APNs)
const moment = require('moment');
class LogController {

    addLog = async function (req, type, title="", desc="", value="", value_color="", icon="") {
        let db = useDB(req.db)
        let Log = db.model("Log");
        await new Log({
            title: title,
            description: desc,
            value: value,
            valueColor: value_color,
            user: req.userName,
            user_id: req.userID,
            type: type,
            icon: icon
        }).save();
    }; 
    getLogs = async function (req, res) {
        let db = useDB(req.db)
        let Log = db.model("Log");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "logs", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }

        
        let result = {
            'status': 200,
            'msg': 'Sending logs'
        }
        try {
            let query = { //query today up to tonight
                createdAt: {
                    "$gte": moment(req.query.start).startOf('day'),
                    "$lt": moment(req.query.end).endOf('day')
                }
            }
            let logs = await Log.find(query)
            result['objects'] = logs

        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
}


module.exports = new LogController();
