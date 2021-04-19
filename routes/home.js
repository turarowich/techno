var path = require('path');
var authController = require('../app/controllers/authController');

module.exports = function(app, network_information){    
    app.get('/', function(req, res){
        res.sendFile(path.resolve('views/frontend/dist/index.html'));
    });    

    // User url
    app.post('/register', authController.register);
    app.post('/login', authController.login);
    app.post('/loginClient', authController.loginClient);
    app.post('/registerClient', authController.registerClient);
    app.get('*', function (req, res) {
        if (!req.url.includes('socket.io')){
            res.sendFile(path.resolve('views/frontend/dist/index.html'));
        } 
    });
    return app
}