const { useDB, sendError } = require('../../services/helper')
var validate = require('../../config/messages');
class PromocodeController{
    
    getPromocode = async function (req, res) {
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");
        let result = {
            'status': 200,
            'msg': 'Sending promocode'
        }
        try {
            let promocode = await Promocode.findById(req.query.promocode)
            result['object'] = promocode
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
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
            result['objects'] = promocodes
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    addPromocode = async function (req, res) {
        console.log(req.fields)
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");
        let new_promocode =  req.fields;
        let result = {
            'status': 200,
            'msg': 'Promocode added'
        }
        try {
            let promocode = await new Promocode({
                name: new_promocode.name || "No name 122 4",
                code: new_promocode.code || "90909",
                discount: new_promocode.discount || "99",
                startDate: new_promocode.fromDate || new Date(),
                endDate: new_promocode.toDate || new Date(),
                fixed_sum: new_promocode.fixedSum || '6',
                min_sum: new_promocode.minSum || '6',
                number_of_uses: new_promocode.numberOfUses || '6',
                selected_type: new_promocode.selectedType || 'type',
                selected_items_list: new_promocode.selectedItemsList || [1,2],
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
            let query = { '_id': req.fields.promocode_id }
            req.fields['updatedAt'] = new Date()
            let promocode = await Promocode.findOneAndUpdate(query, req.fields)
            result['object'] = promocode
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    deletePromocode = async function (req, res) {
        console.log(req.params,"ddd");

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
    searchProductService = async function (req, res) {
        let db = useDB(req.db);
        let type   = req.query.type;
        let search = req.query.search;
        let result = {
            'status': 200,
            'msg': 'Sending result'
        }
        try {
            if(type ==="Product"){
                let Model = db.model(type);
                result['products'] = await Model.find( { "name": {$regex: search} } )
            }else if(type ==="Service"){
                let Model = db.model(type);
                result['services'] = await Model.find( { "name": {$regex: search} } );
            }else{
                let products = await db.model('Product').find( { "name": {$regex: search} } );
                let services = await db.model('Service').find( { "name": {$regex: search} } );
                console.log(products);
                result['products'] = products;
                result['services'] = services;
            }

        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.json(result);
    };

    searchPromocode= async function (req, res) {
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");
        let search = req.query.search;
        let result = {
            'status': 200,
            'msg': 'Sending promocodes'
        }
        try {
            result['objects'] = await Promocode.find( { "name": {$regex: search} } );
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.json(result);
    };
    searchPromocodeByCode = async function (req, res) {
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");
        let search = req.query.search;
        let sum = req.query.sum;
        let type = req.query.type;
        let date = req.query.date;
        let result = {
            'status': 200,
            'msg': 'Sending promocodes',
            'object': null
        }
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        promocode: try {
            let promocode = await Promocode.findOne({ "code": search });
            if(promocode){
                var start = new Date(promocode.startDate);
                var end = new Date(promocode.endDate);
                if(date){
                    var now = new Date(date);
                    if (start >= now || now >= end) {
                        result['msg'] = validate[lang]['promo_not_usable']
                        break promocode
                    }
                }
                if (sum < promocode.min_sum && sum){
                    result['msg'] = validate[lang]['promo_min_price']
                    break promocode
                }
                if(promocode.selected_items_list.length == 0 && type){
                    if (promocode.selected_type != 'all' && promocode.selected_type != type) {
                        result['msg'] = validate[lang]['promo_not_usable']
                        break promocode
                    }
                }
            }else{
                result['msg'] = validate[lang]['promo_404']
            }
            result['object'] = promocode
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.json(result);
    };

}


module.exports = new PromocodeController();