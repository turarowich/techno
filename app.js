const express = require('express');
const app      = express();
const router = express.Router();
const config = require('./config/config.js');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const http = require('http');
const https = require('https');

const privateKey = fs.readFileSync(config.privateKey, 'utf8');
const certificate = fs.readFileSync(config.certificate, 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
const io = require('socket.io')(httpsServer, {
    cors: {
        methods: ["GET", "POST"],
        credentials: true
    },
    path: '/socket.io',
});
require("./app/controllers/chatController")(io)

const { initClientDbConnection } = require('./config/dbutil');
const userConnection = initClientDbConnection()

app.use((req, res, next) => {
    if (userConnection.readyState == 0) {
        res.status(500).json({ status: 500, msg: 'DB not connected' });
    }
    next();
})
const formidableMiddleware = require('express-formidable');
const VerifyToken = require('./services/verifyToken');

global.appRoot = path.resolve(__dirname);
global.userConnection = userConnection;


var cors = require("cors");
app.use(cors());
app.use(express.static(__dirname + '/views/frontend/dist'));
app.use(formidableMiddleware());
app.use('/images', express.static(__dirname + '/views/frontend/images'))
app.use('/api', VerifyToken, require('./routes/api.js')(router))
app.use('/', require('./routes/home.js')(router))




// handles not found errors
app.error(function(err, req, res, next){
    if (err instanceof NotFound) {
        res.sendFile(path.resolve('views/frontend/dist/index.html'));
    } else {
        next(err);
    }
});

// handles unauthorized errors


app.use((err, req, res, next) => {
    if (err.httpStatusCode === 304) {
        res.status(304).render('Unauthorized');
    }
    next(err);
})


// catch all
app.use((err, req, res, next) => {
    console.log(err);
    if (!res.headersSent) {
        res.status(err.httpStatusCode || 500).render('UnknownError');
    }
});



httpServer.listen(config.port_http, () => {
    console.log(`App listening at http://${config.localhost}:${config.port_http}`);
    console.log(`App listening at http://${config.ip}:${config.port_http}`);
})
httpsServer.listen(config.port_https, () => {
    console.log(`App listening at https://${config.localhost}:${config.port_https}`);
    console.log(`App listening at https://${config.ip}:${config.port_https}`);
})

