var clientController = require('../app/controllers/clientController');
module.exports = function (app, network_information) {
    app.post('/addClient', clientController.addClient);

    return app;
}