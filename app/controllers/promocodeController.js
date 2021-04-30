const { useDB, sendError } = require('../../services/helper')
var validate = require('../../config/errorMessages');
class PromocodeController{
    
    getPromocode = async function (req, res) {
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");

        let result = {
            'status': 200,
            'msg': 'Sending promocode'
        }
        try {
            let promocode = await Promocode.findById(req.params.promocode)
            result['object'] = promocode
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    getPromocodes = async function (req, res) {
        console.log(req)
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");

        let result = {
            'status': 200,
            'msg': 'Sending promocodes'
        }
        try {
            let promocodes = await Promocode.find()
            result['objects'] = promocodes
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    addPromocode = async function (req, res) {
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");

        let result = {
            'status': 200,
            'msg': 'Promocode added'
        }
        try {
            let promocode = await new Promocode({
                name: req.fields.name,
                code: req.fields.code,
                percent: req.fields.percent,
                bonus: req.fields.bonus,
                startDate: req.fields.startDate,
                endDate: req.fields.endDate
            }).save();

            result['object'] = promocode
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    updatePromocode = async function (req, res) {
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");

        let result = {
            'status': 200,
            'msg': 'Promocode updated'
        }
        try {
            let query = { '_id': req.params.promocode }
            req.fields['updatedAt'] = new Date()
            let promocode = await Promocode.findOneAndUpdate(query, req.fields)
            result['object'] = promocode
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    deletePromocode = async function (req, res) {
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");

        let result = {
            'status': 200,
            'msg': 'Promocode deleted'
        }
        try {
            let query = { '_id': req.params.promocode }
            await Promocode.findByIdAndRemove(query)
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
}


module.exports = new PromocodeController();