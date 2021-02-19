const express = require('express');
const app      = express();
const router = express.Router();
const config = require('./config/config.js');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const http = require('http');
const https = require('https');

const privateKey = fs.readFileSync('ssl/loygift.key', 'utf8');
const certificate = fs.readFileSync('ssl/loygift.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const { initClientDbConnection } = require('./config/dbutil');
const userConnection = initClientDbConnection()
const formidableMiddleware = require('express-formidable');
const VerifyToken = require('./services/verifyToken');

global.appRoot = path.resolve(__dirname);
global.userConnection = userConnection;
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views/frontend/dist'));
app.use(formidableMiddleware());
app.use('/', require('./routes/home.js')(router))
app.use('/api', VerifyToken, require('./routes/api.js')(router))

// handles not found errors
app.use((err, req, res, next) => {
    if (err.httpStatusCode === 404) {
        res.status(400).render('NotFound');
    }
    next(err);
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
    console.log(`App listening at http://${config.ip}:${config.port_https}`);
})
httpsServer.listen(config.port_https, () => {
    console.log(`App listening at https://${config.localhost}:${config.port_https}`);
    console.log(`App listening at https://${config.ip}:${config.port_https}`);
})



// const Publisher = mongoose.model('Publisher', new mongoose.Schema({
//     companyName: String,
//     firstParty: Boolean,
//     website: String
// }));

// const Game = mongoose.model('Game', new mongoose.Schema({
//     title: String,
// }));

// async function createPublisher(companyName, firstParty, website) {
//     const publisher = new Publisher({
//         companyName,
//         firstParty,
//         website
//     });

//     const result = await publisher.save();
//     console.log(result);
// }

// async function createGame(title, publisher) {
//     const game = new Game({
//         title,
//         publisher
//     });

//     const result = await game.save();
//     console.log(result);
// }

// async function listGames() {
//     const games = await Game
//         .find()
//         .select('title');
//     console.log(games);
// }

// createPublisher('Nintendo', true, 'https://www.nintendo.com/');
// createGame('Witcher 3', 'CD project RED');
