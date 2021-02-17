const express  = require('express');
const app      = express();
const mongoose = require('mongoose');
var router = express.Router();
var config = require('./config/config.js');
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('ssl/loygift.key', 'utf8');
var certificate = fs.readFileSync('ssl/loygift.crt', 'utf8');

var credentials = { key: privateKey, cert: certificate };

app.use('/', require('./routes/home.js')(router))
app.use('/api', require('./routes/api.js')(router))
app.use(express.static(__dirname + '/views/frontend/dist'));

//Database
// mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
// mongoose.connection.once('open', function () {
//     console.log('Database connected Successfully');
// }).on('error', function (err) {
//     console.log('Error', err);
// });

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);


httpServer.listen(config.port_http, () => {
    console.log(`App listening at http://${config.localhost}:${config.port_http}`);
    console.log(`App listening at http://${config.ip}:${config.port_https}`);
})
httpsServer.listen(config.port_https, () => {
    console.log(`App listening at https://${config.localhost}:${config.port_https}`);
    console.log(`App listening at https://${config.ip}:${config.port_https}`);
})