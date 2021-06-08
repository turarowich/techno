const { useDB, sendError } = require('../../services/helper')
var validate = require('../../config/messages');
const config = require("../../config/config");
class catalogController{
    getCatalog =  function (req, res) {
        console.log(req.cat_db,"099090909090900");
        let db = useDB('loygift'+req.cat_db);
        let result = {
            'status': 200,
            'cat_db':'loygift'+req.cat_db,
        }
        res.status(result.status).json(result);
    };

    getClientProducts = async function (req, res) {
        console.log('clients catalog',req.cat_db)
        let db = useDB('loygift'+req.cat_db)
        let Product = db.model("Product");

        let result = {
            'status': 200,
            'msg': 'Sending products'
        }
        try {
            result['objects'] = await Product.find()
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    getClientCategories = async function (req, res) {
        let db = useDB('loygift'+req.db)
        let Category = db.model("Category");

        let result = {
            'status': 200,
            'msg': 'Sending categories'
        }
        try {
            let query = {}
            if (req.query.type){
                query = { 'type': req.query.type}
            }

            let categories = await Category.find(query)
            result['objects'] = categories
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    getCatalogSettings = async function (req, res) {
        if(!req.cat_db){
            console.log('should not come this far');
            return res.status('404');
        }
        //
        let shoes_db = useDB(config.Shoes);
        let catalogs_model = shoes_db.model("catalogs");
        //
        let db = useDB('loygift'+req.cat_db)
        let Settings = db.model("Settings");
        let result = {
            'status': 200,
            'msg': 'Sending client'
        }
        try {
            let settings = await Settings.find()
            if (!settings[0]){
                settings = await new Settings({
                    slogan: " ",
                }).save();
                /////
                await new catalogs_model({
                    company: settings._id,
                }).save();
                /////
            }
            result['object'] = settings[0];
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };
}


module.exports = new catalogController();