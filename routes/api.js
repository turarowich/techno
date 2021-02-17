const bodyParser = require('body-parser');

module.exports = function (app, network_information) {
    app.get('/api', function (req, res) {
        res.render('index.html');
    });
    app.get('/add', function (req, res) {
        res.render('index.html');
    });
    return app;
}