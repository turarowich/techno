var jwt = require('jsonwebtoken');
var config = require('../config/config');

function verifyTokenSocket(socket, next) {
    // Header names in Express are auto-converted to lowercase
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    // Remove Bearer from string
    token = token.replace(/^Bearer\s+/, "");
    
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret_key, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        socket.handshake.headers.userID = decoded.id;
        socket.handshake.headers.db = "loygift" + decoded.id;
        next();
    });
}

module.exports = verifyTokenSocket;