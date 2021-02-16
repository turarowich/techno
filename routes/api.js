module.exports = function (app, network_information) {
    app.get('/api', function (req, res) {
        res.render('index.html');
    });
}