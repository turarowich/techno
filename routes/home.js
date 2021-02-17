var path = require('path');
module.exports = function(app, network_information){    
    app.get('/', function(req, res){
        res.sendFile(path.resolve('views/frontend/dist/index.html'));
    });    
    return app
}