var jwt = require('jsonwebtoken');
var config = require('../config/config');

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    console.log(token)
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret_key, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // if everything good, save to request for use in other routes
        req.userID = decoded.id;
        req.db = decoded.db;
        next();
    });
}

module.exports = verifyToken;