// var config = require('../config/config');

function verifyDB(req, res, next) {
    let path = req.path.split('/')[1]
    //check if its client url or company;
    let catalog_urls = [
        'getCatalogSettings',
        'getClientCategories',
        'getClientProducts',
        'registerClient',
        'loginClient',
        'loginEmployee',
        'searchPromocodeByCode',
        'addOrderWeb',
        'getProductWeb',
        'getEarnedPoints',
        'getNewsWeb',
        'getSingleNewsWeb',
    ];

    let cat_url = req.headers['x-client-url'];
    let shoes_db = global.userConnection.useDb('loygift').model("catalogs");
    let catalogs_model = shoes_db.model("catalogs");
    ///if already has access place
    if(req.headers['access-place'] || !catalog_urls.includes(path)){
        console.log('already has access place order', req.db);
        next();
    }else{
        catalogs_model.findOne({ 'cat_url': cat_url })
            .then(repo => {
                if(repo){
                    req.db = "loygift" + repo.company;
                    req.headers['access-place'] = repo.company;
                    next();
                }else{
                    //throw error
                    return res.status(404).send('Unable to find the requested company!s');
                }
            })
            .catch(error => {
                next();
            })
    }
}

module.exports = verifyDB;