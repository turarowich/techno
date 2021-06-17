const express = require('express');
const app = express();
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
const passport = require("passport");
// const strategy = require("passport-facebook");
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
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
const VerifyDB = require('./services/verifyDB');

global.appRoot = path.resolve(__dirname);
global.userConnection = userConnection;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(
    new FacebookStrategy(
        {
            clientID: config.FACEBOOK_CLIENT_ID,
            clientSecret: config.FACEBOOK_CLIENT_SECRET,
            callbackURL: config.FACEBOOK_CALLBACK_URL,
            profileFields: ["email", "first_name", "last_name", "gender", "birthday"]
        },
        function (accessToken, refreshToken, profile, done) {
            done(null, profile._json,accessToken);
        }
    )
);
//only for twitter
var expressSession = require('express-session');
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//
passport.use(new TwitterStrategy({
    consumerKey: config.TWITTER_CONSUMER_KEY,
    consumerSecret: config.TWITTER_SECRET_KEY,
    callbackURL: config.TWITTER_CALLBACK_URL,
}, function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
        return done(null, profile,token);
    });
}));
passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
        done(null, profile._json,accessToken);
    }
));

var cors = require("cors");
app.use(passport.initialize());
app.use(cors());
app.use(express.static(__dirname + '/views/frontend/dist'));
app.use(formidableMiddleware());

router.get("/auth/facebook", passport.authenticate("facebook", { authType: 'reauthenticate'}));
router.get("/auth/google", passport.authenticate("google", { authType: 'reauthenticate',scope: ['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile']}));
router.get("/auth/twitter", passport.authenticate("twitter", { authType: 'reauthenticate'}));

app.use('/images', express.static(__dirname + '/views/frontend/images'))
app.use('/files', express.static(__dirname + '/views/frontend/files'))
app.use('/api', VerifyToken, require('./routes/api.js')(router))
app.use('/', VerifyDB,require('./routes/home.js')(router, passport))
// app.use('/',require('./routes/home.js')(router, passport))




// handles not found errors
app.use((err, req, res, next) => {
    console.log('NEIIIIIIIIIIIIIIIIIIIIIn');

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

const io = require('socket.io')(httpsServer, {
    cors: {
        // origin: "http://localhost:3000",
        origin: ["http://localhost:3000", "http://127.0.0.1:3000", "https://app.loygift.com", "http://10.121.6.29:3000", "*:*"],
        methods: ["GET", "POST"],
        credentials: true
    },
    path: '/socket.io',
});
require("./routes/socket.js")(io)

httpServer.listen(config.port_http, () => {
    console.log(`App listening at http://${config.localhost}:${config.port_http}`);
    console.log(`App listening at http://${config.ip}:${config.port_http}`);
})
httpsServer.listen(config.port_https, () => {
    console.log(`App listening at https://${config.localhost}:${config.port_https}`);
    console.log(`App listening at https://${config.ip}:${config.port_https}`);
})

