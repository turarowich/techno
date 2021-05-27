const { useDB, sendError } = require('../../services/helper')
var validate = require('../../config/messages');
class DiscountController{
    getDiscounts = async function (req, res) {
        let db = useDB(req.db)
        let discount_model = db.model("Discount");
        let result = {
            'status': 200,
            'msg': 'Sending Cashback'
        }
        try {
            result['discounts'] = await discount_model.find();
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };
    addDiscount = async function (req, res) {
        let db = useDB(req.db)
        let discount_model = db.model("Discount");
        let discount = req.fields;
        let result = {
            'status': 200,
            'msg': 'Sending Discount'
        }
        try {
            await new discount_model({
                name: discount.name,
                discount_percentage: discount.percentage,
                min_sum_of_purchases: discount.min_sum,
            }).save();
            result['discounts'] = await discount_model.find();
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };
    removeDiscount = async function (req, res) {
        let db = useDB(req.db)
        let Discount = db.model("Discount");
        let result = {
            'status': 200,
            'msg': 'Discount deleted'
        }
        try {
            let query = { '_id': req.params.id }
            await Discount.findByIdAndRemove(query)
            result['discounts'] = await Discount.find();
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    }
}


module.exports = new DiscountController();