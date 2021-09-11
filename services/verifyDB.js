// var config = require('../config/config');

function verifyDB(req, res, next) {
    let path = req.path.split('/')[1]
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>TheFullPath",req.path,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
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
        console.log('already has access place', req.db,req.headers['access-place']);
        next();
    }else{
        catalogs_model.findOne({ 'cat_url': cat_url })
            .then(repo => {
                if(repo){
                    req.db = "loygift" + repo.company;
                    req.headers['access-place'] = repo.company;
                    console.log(repo.company,"repo.company");
                    next();
                }else{
                    //throw error
                    console.log('company settings not found');
                    return res.status(404).send('Unable to find the requested company!');
                }
            })
            .catch(error => {
                console.log({ error })
                next();
            })
    }
}

module.exports = verifyDB;