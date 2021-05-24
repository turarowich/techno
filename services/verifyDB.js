var jwt = require('jsonwebtoken');
var config = require('../config/config');

function verifyDB(req, res, next) {
    console.log(req.headers['company_url'],"MIDLD",config.Shoes);
    let cat_url = req.headers['company_url'];
    let shoes = config.Shoes;
    let shoes_db = global.userConnection.useDb(shoes).model("catalogs");
    let catalogs_model = shoes_db.model("catalogs");

    catalogs_model.findOne({ 'cat_url': cat_url })
        .then(repo => {
            if(repo){
                req.cat_db = repo.company;
            }
            next();
        })
        .catch(error => {
            console.log({ error })
            next();
        })
}

module.exports = verifyDB;