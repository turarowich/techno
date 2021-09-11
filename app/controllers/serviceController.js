const { useDB, sendError, saveImage } = require('../../services/helper');
var validate = require('../../config/messages');
class ServiceController{
    
    getService = async function (req, res) {
        let db = useDB(req.db)
        let Service = db.model("Service");
        let result = {
            'status': 200,
            'msg': 'Sending service'
        }
        try {
            let service = await Service.findById(req.params.product)
            result['object'] = service
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    getService= async function (req, res) {
        let db = useDB(req.db)
        let Service = db.model("Service");

        let result = {
            'status': 200,
            'msg': 'Sending products'
        }
        try {
            let service = await Service.find()
            result['objects'] = service
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    addService = async function (req, res) {
        let db = useDB(req.db)
        let Service = db.model("Service");
        
        let result = {
            'status': 200,
            'msg': 'Service added'
        }
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        addProduct: try {
            let data = req.fields
            console.log(data)
            let service = await new Service({
                name: data.name,
                name_ru: data.name_ru,
                secondary: data.secondary,
                secondary_ru: data.secondary_ru,
                description: data.description,
                description_ru: data.description_ru,
                vendorCode: data.vendorCode,
                promo: data.promo,
                promoPrice: data.promoPrice,
                promoStart: data.promoStart,
                promoEnd: data.promoEnd,
                quantity: data.quantity,
                price: data.price,
                category: data.category,
                recommend: data.recommend,
            });
            await service.validate()
        
            if (req.files.img){
                
                let filename = saveImage(req.files.img, req.db)
                if (filename == 'Not image') {
                    result = {
                        status: 500,
                        msg: "Validation error",
                        errors: {
                            img: validate[lang]['image_not_valid'],
                        },
                    }
                    break addProduct
                }else{
                    service.img = filename
                }
            }
            
            for(let $i=0; $i < 3; $i++){
                if (req.files['imgArray' + $i]) {
                    let filename = saveImage(req.files['imgArray' + $i], req.db)
                    if (filename == 'Not image') {
                        result = {
                            status: 500,
                            msg: "Validation error",
                            errors: {
                                imgArray: validate[lang]['image_not_valid'],
                            },
                        }
                        break addProduct
                    } else {
                        service.imgArray.push(filename)
                    }
                }
            }
            service.save()
            result['object'] = service
        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    };

    updateService = async function (req, res) {
        let db = useDB(req.db)
        let Service = db.model("Service");

        let result = {
            'status': 200,
            'msg': 'Service updated'
        }
        updateService: try {
            let data = req.fields
            let query = { '_id': req.params.product }
            data['updatedAt'] = new Date()
            let service = await Service.findOneAndUpdate(query, data)
            if (req.files.img) {
                let filename = saveImage(req.files.img, req.db, service.img)
                if (filename == 'Not image') {
                    result = {
                        status: 500,
                        msg: "Validation error",
                        errors: {
                            img: validate[lang]['image_not_valid'],
                        },
                    }
                    break updateService
                } else {
                    service.img = filename
                }
            }
            for (let $i = 0; $i < 3; $i++) {
                if (req.files['imgArray' + $i]) {
                    service.imgArray = []
                    let filename = saveImage(req.files['imgArray' + $i], req.db)
                    if (filename == 'Not image') {
                        result = {
                            status: 500,
                            msg: "Validation error",
                            errors: {
                                imgArray: validate[lang]['image_not_valid'],
                            },
                        }
                        break updateService
                    } else {
                        service.imgArray.push(filename)
                    }
                }
            }
            service.save()
            result['object'] = service
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    deleteService= async function (req, res) {
        let db = useDB(req.db)
        let Service = db.model("Service");
        
        let result = {
            'status': 200,
            'msg': 'Service deleted'
        }
        try {
            let query = { '_id': req.params.product }
            await Service.findByIdAndRemove(query)
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    deleteServices = async function (req, res) {
        let db = useDB(req.db)
        let Service = db.model("Service");

        let result = {
            'status': 200,
            'msg': 'Services deleted'
        }
        if (req.fields.objects.length){
            try {
                let query = {
                    '_id': {
                        $in: req.fields.objects
                    }
                }
                await Service.deleteMany(query)
            } catch (error) {
                result = sendError(error, req.headers["accept-language"])
            }
        }else{
            result = {
                'status': 200,
                'msg': 'Parametr objects is empty'
            }
        }
        

        res.status(result.status).json(result);
    };
    searchService = async function (req, res) {
        let db = useDB(req.db)
        let Service = db.model("Service");
        let search = req.query.search;

        let result = {
            'status': 200,
            'msg': 'Sending product'
        }
        try {
            let service = await Service.find( { "name": {$regex: search} } )
            result['objects'] = service
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.json(result);
    };
}


module.exports = new ServiceController();
