module.exports = function(app, network_information){    
    app.get('/', function(req, res){
        res.render('index.html');
    });    
}