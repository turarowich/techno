// var config = require('../config/config');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const oneCfileController = require('../app/controllers/oneCfileController')
function verifyDB(req, res, next) {
    let path = req.path.split('/')[1]
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>TheFullPath",req.path,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    if(req.path.includes("1c_exchange.php")){
        //auth
        let log = "admino";
        let pass = "99999";
        let basicAuth = req.headers.authorization.split(" ")[1];
        let buff = new  Buffer(basicAuth, 'base64');
        let credentials = buff.toString('ascii').split(":");
        let login = credentials[0];
        let password = credentials[1];
        if(req.query.type === "catalog" && req.query.mode === "checkauth" && log === login && pass === password){
            let cook = "cook";
            let cookies = "cookies";
            return res.status(200).send(`success\r\n${cook}\r\n${cookies}`);
        }else if(req.query.type === "catalog" && req.query.mode === "init"){
            console.log("INIT");
            return res.status(200).send(`zip=yes\r\nfile_limit=5000000`);
        }else if(req.query.type === "catalog" && req.query.mode === "file"){
            console.log(req.query,"FILES");
            oneCfileController.saveFiles(req)
        }
    }else{
        console.log("NOOOOOO")
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