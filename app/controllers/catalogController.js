const { useDB, sendError } = require('../../services/helper')
var validate = require('../../config/messages');
const config = require("../../config/config");
class catalogController{
    getCatalog =  function (req, res) {
        let db = useDB(req.db);
        let result = {
            'status': 200,
            'cat_db':req.db,
        }
        res.status(result.status).json(result);
    };

    getClientProducts = async function (req, res) {
        console.log('clients catalog',req.db)
        let db = useDB(req.db)
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

    getCatalogSettings = async function (req, res) {
        if(!req.db){
            console.log('should not come this far');
            return res.status('404');
        }
        //
        let shoes_db = useDB('loygift');
        let catalogs_model = shoes_db.model("catalogs");
        //
        let db = useDB(req.db)
        let Settings = db.model("Settings");
        let Cashback = db.model("Cashback");
        let Delivery = db.model("Delivery");
        let Branch = db.model("Branch");
        let Discount = db.model("Discount");
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
            let branches = await Branch.find()
            let deliveries = await Delivery.find()
            let cashback = await Cashback.find()
            let discounts = await Discount.find().sort({ "discount_percentage": "asc" })

            let share_points_status = false;
            if(cashback && cashback[0]){
                share_points_status = cashback[0].share_points_status;
            }

            result['object'] = settings[0];
            result['branches'] = branches;
            result['deliveries'] = deliveries;
            result['discounts'] = discounts;
            result['share_points_status'] = share_points_status;
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };

    saveTempoOrder = async function (req, res) {
        let result = {
            'status': 200,
            'msg': 'Saved as Tempo'
        }
        let shoes_db = global.userConnection.useDb('loygift').model("catalogs");
        let catalogs_model = shoes_db.model("catalogs");
        //some function to remove old orders;

        catalogs_model.findOne({ 'cat_url': req.fields.company_url})
            .then(repo => {
                if(repo){
                    let db_name = "loygift" + repo.company;
                    let TempoOrder = shoes_db.model("tempoOrder");

                    let order = new TempoOrder({
                        company: db_name,
                        company_url: req.fields.company_url,
                        code: req.fields.menu_url,
                        urlcode: req.fields.menu_url,
                        order: req.fields.order,
                    });
                    order.save();
                }else{
                    //throw error
                    console.log('company settings not found');
                }
            })
            .catch(error => {
                console.log({ error })
            })
        res.status(result.status).json(result);
    }

    getTempoOrder = async function (req, res) {
        let order_url = req.query.order_url;
        let result = {
            'status': 200,
            'msg': 'Getting a Tempo'
        }
        let shoes_db = global.userConnection.useDb('loygift').model("catalogs");
        let TempoOrder = shoes_db.model("tempoOrder");
        result['object']= await TempoOrder.findOne({urlcode:order_url});

        res.status(result.status).json(result);
    }
    updateTempoOrder = async function (req, res) {
        let order_url = req.fields.order_url;
        let db = useDB(req.fields.db);
        let Product = db.model("Product");
        let result = {
            'status': 200,
            'msg': 'Updating a Tempo'
        }
        let shoes_db = global.userConnection.useDb('loygift').model("catalogs");
        let TempoOrder = shoes_db.model("tempoOrder");
        let tempo_order = await TempoOrder.findOne({urlcode:order_url});

        if(tempo_order){
            let prod = await Product.findById(req.fields.product );
            tempo_order.order.push({
                product : prod,
                quantity : 1,
            });
            tempo_order.save();
        }
        result['object']= tempo_order;
        res.status(result.status).json(result);
    }
    updateProductTempoOrder = async function (req, res) {
        let type = req.fields.type;
        let pro_id = req.fields.product;
        let order_url = req.fields.order_url;
        let result = {
            'status': 200,
            'msg': 'Updating a TempoProduct'
        }
        let shoes_db = global.userConnection.useDb('loygift').model("catalogs");
        let TempoOrder = shoes_db.model("tempoOrder");
        let tempo_order = await TempoOrder.findOne({urlcode:order_url});

        if(tempo_order){
            tempo_order.order.forEach(function (item){
                console.log(item.product);
                if(item.product._id == pro_id){
                    if(type==="increase"){
                        item.quantity = parseFloat(item.quantity) + 1;
                    }else{
                        if(item.quantity>1){
                            item.quantity = parseFloat(item.quantity) - 1;
                        }else{
                            //remove
                        }
                    }
                }
            })
            tempo_order.save();
        }
        result['object']= tempo_order;
        res.status(result.status).json(result);
    }
    removeProductTempoOrder = async function (req, res) {
        let pro_id = req.fields.product;
        let order_url = req.fields.order_url;
        let result = {
            'status': 200,
            'msg': 'Updating a TempoProduct'
        }
        let shoes_db = global.userConnection.useDb('loygift').model("catalogs");
        let TempoOrder = shoes_db.model("tempoOrder");
        let tempo_order = await TempoOrder.findOne({urlcode:order_url});
        if(tempo_order){
            tempo_order.order = tempo_order.order.filter( item => item.product._id != pro_id );
            tempo_order.save();
        }
        result['object']= tempo_order;
        res.status(result.status).json(result);
    }
}


module.exports = new catalogController();