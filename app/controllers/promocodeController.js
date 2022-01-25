const { useDB, sendError, checkAccess,compareDates } = require('../../services/helper')
var validate = require('../../config/messages');
const client = require("../models/client");
class PromocodeController{
    
    getPromocode = async function (req, res) {
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");
        let Products = db.model("Product");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "loyalty", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Sending promocode'
        }
        try {
            let promocode = await Promocode.findById(req.query.promocode);

            let products = await Products.find({
                '_id': { $in: promocode.selected_items_list}
            });
            result['object'] = promocode
            result['products'] = products
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    getPromocodes = async function (req, res) {
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "loyalty", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }
        
        let result = {
            'status': 200,
            'msg': 'Sending promocodes'
        }
        try {
            let promocodes = await Promocode.find();
            result['objects'] = promocodes
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    addPromocode = async function (req, res) {
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");
        let Log = db.model("Log");
        let new_promocode =  req.fields;
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "loyalty", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Promocode added'
        }
        try {
            let promocode = await new Promocode({
                name: new_promocode.name || "No name",
                code: new_promocode.code || "2",
                discount: new_promocode.discount || "0",
                startDate: new_promocode.fromDate || new Date(),
                endDate: new_promocode.toDate || new Date(),
                fixed_sum: new_promocode.fixed_sum || '0',
                min_sum: new_promocode.min_sum || '0',
                number_of_uses: new_promocode.number_of_uses || '0',
                selected_type: new_promocode.selected_type || 'type',
                selected_items_list: new_promocode.selected_items_list || [1,2],
            }).save();
            await new Log({
                type: "promocode_created",
                description: promocode.name,
                value: promocode.code,
                valueColor: "done",
                user: req.userName,
                user_id: req.userID,
                icon: "add"
            }).save()
            result['object'] = promocode
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    updatePromocode = async function (req, res) {
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");
        let Log = db.model("Log");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "loyalty", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Promocode updated'
        }
        try {
            let query = { '_id': req.fields.promocode_id }
            req.fields['updatedAt'] = new Date()
            let promocode = await Promocode.findOneAndUpdate(query, req.fields)
            await new Log({
                type: "promocode_updated",
                description: promocode.name,
                value: promocode.code,
                valueColor: "done",
                user: req.userName,
                user_id: req.userID,
                icon: "update"
            }).save()
            result['object'] = promocode
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    deletePromocode = async function (req, res) {
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");
        let Log = db.model("Log");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "loyalty", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Promocode deleted'
        }
        try {
            let query = { '_id': req.params.promocode }
            let promocode = await Promocode.findById(query)
            await new Log({
                type: "promocode_deleted",
                description: promocode.name,
                value: promocode.code,
                valueColor: "canceled",
                user: req.userName,
                user_id: req.userID,
                icon: "delete"
            }).save()
            await Promocode.findByIdAndRemove(query)
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    deletePromocodes = async function (req, res) {
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");
        let Log = db.model("Log");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "clients", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Promocodes deleted'
        }
        if (req.fields.objects.length) {
            try {
                let query = {
                    '_id': {
                        $in: req.fields.objects
                    }
                }
                let clients = await Promocode.find(query, 'name')

                if (clients.length) {
                    let desc = clients.map(function (elem) {
                        return elem.name;
                    }).join(", ")
                    await new Log({
                        type: "promocodes_deleted",
                        description: desc,
                        user: req.userName,
                        user_id: req.userID,
                        icon: "delete"
                    }).save()
                }

                await Promocode.deleteMany(query)
            } catch (error) {
                result = sendError(error, req.headers["accept-language"])
            }
        } else {
            result = {
                'status': 200,
                'msg': 'Parametr objects is empty'
            }
        }


        res.status(result.status).json(result);
    };


    searchProductService = async function (req, res) {
        let db = useDB(req.db);
        let type   = req.query.type.toLowerCase();
        let Model = db.model("Product");
        let search = req.query.search;
        let result = {
            'status': 200,
            'msg': 'Sending result'
        }
        try {
            if(type !=="all") {
                result['objects'] = await Model.find({"name": {$regex: search}, "type": type});
            }else{
                result['objects'] = await db.model('Product').find( { "name": {$regex: '.*' + search + '.*' ,$options: 'i'} } );
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
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "loyalty", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
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
        // console.log("start")
        // const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        // await delay(5000) /// waiting 1 second.
        // console.log("end 5 start")
        // console.log(req.query.search,"==================",req.db)
        let db = useDB(req.db)
        let Promocode = db.model("Promocode");
        let search = req.query.search;
        let sum = req.query.sum;
        let type = req.query.type;
        let date = req.query.date || new Date();
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "loyalty", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Promocode is valid',
        }
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        promocode: try {
            let promocode = await Promocode.findOne({ "code": search });
            if(promocode){
                if(promocode.already_used >= promocode.number_of_uses){
                    result['msg'] = validate[lang]['promo_already_used']
                    break promocode
                }
                if(date){
                    if (!compareDates(promocode.startDate,promocode.endDate)){
                        console.log("DIDNOT PASS DATE")
                        result['msg'] = validate[lang]['promo_not_usable_date']
                        break promocode
                    }
                }
                if (sum < promocode.min_sum && sum){
                    result['msg'] = validate[lang]['promo_min_price']
                    break promocode
                }
                if(promocode.selected_items_list.length === 0 && type){
                    if (promocode.selected_type !== 'all' && promocode.selected_type !== type) {
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