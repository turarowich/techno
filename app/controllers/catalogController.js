const { useDB, sendError } = require('../../services/helper')
var validate = require('../../config/messages');
class catalogController{
    getCatalog =  function (req, res) {
        console.log(req.cat_db,"099090909090900");
        let db = useDB(req.cat_db);
        let result = {
            'status': 200,
            'cat_db':req.cat_db,
        }
        res.status(result.status).json(result);
    };

    getClientProducts = async function (req, res) {
        console.log('clients catalog',req.cat_db)
        let db = useDB(req.cat_db)
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
        let db = useDB(req.db)
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
}


module.exports = new catalogController();