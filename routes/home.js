var path = require('path');
var authController = require('../app/controllers/authController');
var settingsController = require('../app/controllers/settingsController');
var catalogController = require('../app/controllers/catalogController');
var promocodeController = require('../app/controllers/promocodeController');
var orderController = require('../app/controllers/orderController');
var clientController = require('../app/controllers/clientController');
var productController = require('../app/controllers/productController');
var newsController = require('../app/controllers/newsController');
var pushController = require('../app/controllers/pushController');

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
    app.post('/resetPasswordMessage', authController.resetPasswordMessage);
    app.post('/resetPassword', authController.resetPassword);
    app.post('/resetCheckCode', authController.resetCheckCode);
    app.get('/getSettingsClient', settingsController.getSettingsClient);
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login', session: false }), authController.callbackFB);
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), authController.callbackGG);
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login', session: false }), authController.callbackTW);
    app.post('/loginEmployee', authController.loginEmployee);

    //Catalog
    app.get('/getCatalogSettings', catalogController.getCatalogSettings);
    app.get('/getCatalog', catalogController.getCatalog);
    app.get('/getClientProducts', catalogController.getClientProducts);


    //same as in api
    app.get('/searchProductWeb', productController.searchProductWeb);
    app.get('/getProductWeb/:product', productController.getProduct);
    app.get('/getClientCategories', catalogController.getClientCategories);

    //same as in api
    app.get('/searchPromocodeByCode', promocodeController.searchPromocodeByCode);
    app.post('/addOrderWeb', orderController.addOrder);
    //Casback from order
    app.post('/getEarnedPoints', orderController.getEarnedPoints);
    // News url
    app.get('/getSingleNewsWeb/:news', newsController.getSingleNews);
    app.get('/getNewsWeb', newsController.getNews);

    
    app.get('/sendSchedulePushes', pushController.sendSchedulePushes);
    
    app.get('*', function (req, res) {
        let main_path = req.path
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>","Backup",main_path,"<<<<<<<<<<<<<<<<<<<<<<<<<<<")
        if (!req.url.includes('socket.io')){
            console.log("IN99");
            req.king="IN99";
            res.sendFile(path.resolve('views/frontend/dist/index.html'));
        } 
    });
    return app
}