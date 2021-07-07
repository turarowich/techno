var catalogController = require('../app/controllers/catalogController');
module.exports = function(app){
    app.get('/getTempoOrder!@', catalogController.getTempoOrder);

    return app
}