const { useDB, sendError, checkAccess} = require('../../services/helper')
var validate = require('../../config/messages');
class DiscountController{
    getDiscounts = async function (req, res) {
        let db = useDB(req.db)
        let discount_model = db.model("Discount");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "loyalty", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }
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
        let Log = db.model("Log");
        let discount = req.fields;
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "loyalty", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
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
            await new Log({
                type: "discount_created",
                description: discount.name,
                value: discount.percentage,
                valueColor: "done",
                user: req.userName,
                icon: "add"
            }).save()
            result['discounts'] = await discount_model.find();
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };
    removeDiscount = async function (req, res) {
        let db = useDB(req.db)
        let Discount = db.model("Discount");
        let Log = db.model("Log");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "loyalty", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Discount deleted'
        }
        try {
            let query = { '_id': req.params.id }
            let discount = await Discount.findById(query)
            if(discount){
                await new Log({
                    type: "discount_deleted",
                    description: discount.name,
                    value: discount.discount_percentage,
                    valueColor: "canceled",
                    user: req.userName,
                    icon: "delete"
                }).save()
            }
            
            await Discount.findByIdAndRemove(query)
            result['discounts'] = await Discount.find();
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    }
}


module.exports = new DiscountController();