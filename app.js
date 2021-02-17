const express  = require('express');
const app      = express();
const mongoose = require('mongoose');
var router = express.Router();
var config = require('./config/config.js');
var fs = require('fs');
var path = require('path');

var http = require('http');
var https = require('https');

var privateKey = fs.readFileSync('ssl/loygift.key', 'utf8');
var certificate = fs.readFileSync('ssl/loygift.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

const { initClientDbConnection } = require('./config/dbutil.js');

app.use('/', require('./routes/home.js')(router))
app.use('/api', require('./routes/api.js')(router))
app.use(express.static(__dirname + '/views/frontend/dist'));


global.clientConnection = initClientDbConnection();
global.appRoot = path.resolve(__dirname);

// const dbConnection =  global.clientConnection;
// const db =  dbConnection.useDb("loygift");
// const Client = db.model("Client");
// const Category = db.model("Category");

// const category = new Category({
//     name: 'Human',
//     type: 'Client'
// }).save(function (err, category) {
//     const newUser = new Client({
//         firstName: 'Ormonali',
//         lastName: 'Omuraliev',
//         phone: '0772405055',
//         email: 'kaarov8@gmail.com',
//         birthDate: new Date(),
//         address: 'some address',
//         category: category._id
//     }).save(function (err, user) {
//         console.log(user.populate('Category'))
//     });    
// });

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
