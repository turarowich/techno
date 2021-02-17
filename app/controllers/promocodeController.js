const db = global.userConnection.useDb("loygift");
const Promocode = db.model("Promocode");
const Category = db.model("Category");

exports.getPromocode = async function (req, res) {
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

exports.getPromocodes = async function (req, res) {
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

exports.addPromocode = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Promocode added'
    }
    try {
        let category = await Category.findById(req.body.category)

        let promocode = await new Promocode({
            name: req.body.name,
            code: req.body.code,
            percent: req.body.percent,
            bonus: req.body.bonus,
            startDate: req.body.startDate,
            endDate: req.body.endDate
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

exports.updatePromocode = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Promocode updated'
    }
    try {
        let query = { '_id': req.params.promocode }
        req.body['updatedAt'] = new Date()
        let promocode = await Promocode.findOneAndUpdate(query, req.body)
        result['promocode'] = promocode
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.deletePromocode = async function (req, res) {
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

