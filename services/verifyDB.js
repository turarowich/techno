// var config = require('../config/config');
const oneCfileController = require('../app/controllers/oneCfileController');
const { checkUserBlockStatus } = require('../services/helper')
function verifyDB(req, res, next) {
    let path = req.path.split('/')[1]
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>TheFullPath",req.path,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    if(req.path.includes("1c_exchange.php")){
        oneCfileController.check1cAuth(req, res).then((value) => {
            // expected output: "Success!"
        });
    }
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
        'getClientInfoScan'
    ];

    let cat_url = req.headers['x-client-url'];
    console.log(cat_url,"cat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_urlcat_url");
    let shoes_db = global.userConnection.useDb('loygift').model("catalogs");
    let catalogs_model = shoes_db.model("catalogs");
    ///if already has access place
    if(req.headers['access-place'] || !catalog_urls.includes(path)){
        console.log('already has access place', req.db,req.headers['access-place']);
        next();
    }else{
        console.log("EEEEEEELSE");
        console.log(cat_url)
        catalogs_model.findOne({ 'cat_url': cat_url })
            .then(repo => {
                if(repo){
                    req.db = "loygift" + repo.company;
                    req.headers['access-place'] = repo.company;
                    console.log(repo.company,"repo.company");
                    //company status check
                    let mainUsersModel = global.userConnection.useDb('loygift').model("User");
                    mainUsersModel.findById(repo.company).then(mainUser=>{
                        if(mainUser){
                            checkUserBlockStatus(mainUser).then(blockCheck=>{
                                if(blockCheck.blocked){
                                    return res.status(404).send('Unable to find the requested company!1',cat_url);
                                }else {
                                    next();
                                }
                            })
                        }else{
                            return res.status(404).send('Unable to find the requested company!2',cat_url);
                        }
                    }).catch(err=>{
                        return res.status(404).send('Unable to find the requested company!3',cat_url);
                    })
                    //
                    // next();
                }else{
                    //throw error
                    console.log('company settings not found');
                    return res.status(404).send('Unable to find the requested company!4',cat_url);
                }
            })
            .catch(error => {
                console.log({ error })
                next();
            })
    }
}

module.exports = verifyDB;