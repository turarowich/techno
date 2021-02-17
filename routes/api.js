var clientController = require('../app/controllers/clientController');
module.exports = function (app, network_information) {
    app.get('/getClient/:client', clientController.getClient);
    app.get('/getClients', clientController.getClients);
    app.post('/addClient', clientController.addClient);
    app.put('/updateClient/:client', clientController.updateClient);
    app.delete('/deleteClient/:client', clientController.deleteClient);
    
    return app;
}