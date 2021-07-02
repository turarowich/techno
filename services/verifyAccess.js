var jwt = require('jsonwebtoken');
var config = require('../config/config');
function verifyAccess(req, res, next) {

    let token = req.headers['x-access-token'] || req.headers['authorization'];

    token = token.replace(/^Bearer\s+/, "");

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret_key, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        if (decoded.type && (decoded.type == "admin" || decoded.type == "employee")) {
            return next();
        }
        return res.status(500).send({ auth: false, message: 'Permission denied.' });
    });
}

module.exports = verifyAccess;