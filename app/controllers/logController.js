var bcrypt = require('bcryptjs');
const { useDB, sendError } = require('../../services/helper')
var validate = require('../../config/messages');
var config = require('../../config/config');
const { query } = require('express');
var path = require('path')
var dir = path.join(__dirname, "../../keys/" + config.APNs)

class LogController {

    addLog = async function (req, type, title="", desc="", value="", value_color="") {
        let db = useDB(req.db)
        let Log = db.model("Log");
        await new Log({
            title: title,
            description: desc,
            value: value,
            valueColor: value_color,
            user: req.userName,
            type: type,
        }).save();
    };    
}


module.exports = new LogController();
