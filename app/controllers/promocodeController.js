const { useDB } = require('../../services/helper')

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
            result['promocode'] = promocode
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };

    getPromocodes = async function (req, res) {
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");

        let result = {
            'status': 200,
            'msg': 'Sending promocodes'
        }
        try {
            let promocodes = await Promocode.find()
            result['promocodes'] = promocodes
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
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

            result['promocode'] = promocode
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
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
            result['promocode'] = promocode
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
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
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };
}


module.exports = new PromocodeController();