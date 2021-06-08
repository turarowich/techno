const { useDB, sendError } = require('../../services/helper')
var validate = require('../../config/messages');
class CashbackController{
    getCashback = async function (req, res) {
        let db = useDB(req.db)
        let cashback_model = db.model("Cashback");
        let one = await cashback_model.find();
        let cashback_one = {};

        let result = {
            'status': 200,
            'msg': 'Sending Cashback'
        }

        try {
            if(one.length>0){
                cashback_one = one[0];
            }else{
                cashback_one = await new cashback_model().save();
            }
            result['cashback'] = cashback_one;
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    updateCashback = async function (req, res) {
        let db = useDB(req.db)
        let cashback_model = db.model("Cashback");

        let result = {
            'status': 200,
            'msg': 'Sending Cashback'
        }
        try {
            let query = { '_id': req.params.id }
            let client = await cashback_model.findOneAndUpdate(query, req.fields)
            result['object'] = client
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    // addPromocode = async function (req, res) {
    //     console.log(req.fields)
    //     let db = useDB(req.db)
    //     let Promocode = db.model("Promocode");
    //     let new_promocode =  req.fields;
    //     let result = {
    //         'status': 200,
    //         'msg': 'Promocode added'
    //     }
    //     try {
    //         let promocode = await new Promocode({
    //             name: new_promocode.name || "No name",
    //             code: new_promocode.code || "90909",
    //             percent: new_promocode.discount || "99",
    //             bonus: new_promocode.bonus || "99",
    //             startDate: new_promocode.fromDate || new Date(),
    //             endDate: new_promocode.toDate || new Date(),
    //             fixed_sum: new_promocode.fixedSum || '6',
    //             min_sum: new_promocode.minSum || '6',
    //             number_of_uses: new_promocode.numberOfUses || '6',
    //             selected_type: new_promocode.selectedType || 'type',
    //             selected_items_list: new_promocode.selectedItemsList || [1,2],
    //
    //         }).save();
    //
    //         result['object'] = promocode
    //     } catch (error) {
    //         result = sendError(error, req.headers["accept-language"])
    //     }
    //
    //     res.status(result.status).json(result);
    // };


}


module.exports = new CashbackController();