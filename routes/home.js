var path = require('path');
var authController = require('../app/controllers/authController');
var catalogController = require('../app/controllers/catalogController');

module.exports = function(app, passport){    
    app.get('/', function(req, res){
        res.sendFile(path.resolve('views/frontend/dist/index.html'));
    });    

    // User url
    
    app.post('/login', authController.login);
    app.post('/loginClient', authController.loginClient);
    app.post('/loginClientSocial', authController.loginClientSocial);
    app.post('/register', authController.register);
    app.post('/registerClient', authController.registerClient);
    app.post('/registerClientSocial', authController.registerClientSocial);
    app.post('/refreshToken', authController.refreshToken);
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login', session: false }), authController.callbackFB);
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), authController.callbackGG);
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login', session: false }), authController.callbackTW);
    //Catalog
    app.get('/getCatalogSettings', catalogController.getCatalogSettings);
    app.get('/getCatalog', catalogController.getCatalog);
    app.get('/getClientProducts', catalogController.getClientProducts);
    app.get('/getClientCategories', catalogController.getClientCategories);


    app.get('*', function (req, res) {
        console.log(req.url.includes('socket.io'))
        if (!req.url.includes('socket.io')){
            console.log(req.url.includes('socket.io'))
            res.sendFile(path.resolve('views/frontend/dist/index.html'));
        } 
    });
    return app
}