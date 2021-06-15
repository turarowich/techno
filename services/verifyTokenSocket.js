var jwt = require('jsonwebtoken');
var config = require('../config/config');

function verifyTokenSocket(socket, next) {
    // Header names in Express are auto-converted to lowercase
    var token = socket.handshake.headers.token
    if (!token)
        console.log('No token provided.')
        // return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret_key, function (err, decoded) {
        if (err){
            console.log('Failed to authenticate token.')
            next();
        }
        

        socket.handshake.headers.user = decoded.user;
        socket.handshake.headers.db = "loygift" + decoded.id;
        
        // mainRoom is admin id so if he want send some notification for his client just need to use that room
        if (decoded.id){
            socket.handshake.headers.mainRoom = "mainRoom" + decoded.id
            socket.join(socket.handshake.headers.mainRoom)
        }
        
        // selfRoom is client id so if he want send some notification for his client just need to use that room
        if (decoded.user){
            socket.handshake.headers.selfRoom = "selfRoom" + decoded.user
            socket.join(socket.handshake.headers.selfRoom)
        }
        next();
    });
}

module.exports = verifyTokenSocket;