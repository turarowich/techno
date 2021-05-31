var config = require('../config/config');

function verifyDB(req, res, next) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ThePath",req.path,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    //check if its client url or company;
    // let company_url = ['/login/','/register/','/signup','/socket.io/',];
    let catalog_urls = ['/getCatalogSettings/','/getClientCategories/','/getClientProducts/'];

    console.log(req.headers['company_url'],"MIDDLEWARE",config.Shoes);
    let cat_url = req.headers['company_url'];
    let shoes = config.Shoes;
    let shoes_db = global.userConnection.useDb(shoes).model("catalogs");
    let catalogs_model = shoes_db.model("catalogs");
    ///if already has access place
    if(req.headers['access_place'] || !catalog_urls.includes(req.path)){
        console.log('already has access place');
        next();
    }else{
        catalogs_model.findOne({ 'cat_url': cat_url })
            .then(repo => {
                if(repo){
                    req.cat_db = repo.company;
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