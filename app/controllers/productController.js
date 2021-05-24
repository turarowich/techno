
const fs = require('fs')
const { useDB, sendError, saveImage } = require('../../services/helper')
var validate = require('../../config/messages');
class ProductController{
    
    getProduct = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");

        let result = {
            'status': 200,
            'msg': 'Sending product'
        }
        try {
            let product = await Product.findById(req.params.product).populate('category').exec()
            result['object'] = product
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    getProducts = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");

        let result = {
            'status': 200,
            'msg': 'Sending products'
        }
        try {
            let products = await Product.find().populate('category').exec()
            result['objects'] = products
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    addProduct = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");
        
        let result = {
            'status': 200,
            'msg': 'Product added'
        }
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        addProduct: try {
            let data = req.fields
            console.log(data)
            let product = await new Product({
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
            await product.validate()
        
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
                    product.img = filename   
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
                        product.imgArray.push(filename)
                    }
                }
            }    
            product.save()
            result['object'] = product
        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    };

    updateProduct = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");

        let result = {
            'status': 200,
            'msg': 'Product updated'
        }
        updateProduct: try {
            let data = req.fields
            let query = { '_id': req.params.product }
            data['updatedAt'] = new Date()
            let product = await Product.findOneAndUpdate(query, data)
            if (req.files.img) {
                let filename = saveImage(req.files.img, req.db, product.img)
                if (filename == 'Not image') {
                    result = {
                        status: 500,
                        msg: "Validation error",
                        errors: {
                            img: validate[lang]['image_not_valid'],
                        },
                    }
                    break updateProduct
                } else {
                    product.img = filename   
                }
            }
            for (let $i = 0; $i < 3; $i++) {
                if (req.files['imgArray' + $i]) {
                    product.imgArray = []
                    let filename = saveImage(req.files['imgArray' + $i], req.db)
                    if (filename == 'Not image') {
                        result = {
                            status: 500,
                            msg: "Validation error",
                            errors: {
                                imgArray: validate[lang]['image_not_valid'],
                            },
                        }
                        break updateProduct
                    } else {
                        product.imgArray.push(filename)
                    }
                }
            }
            product.save()
            result['object'] = product
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    deleteProduct = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");
        
        let result = {
            'status': 200,
            'msg': 'Product deleted'
        }
        try {
            let query = { '_id': req.params.product }
            await Product.findByIdAndRemove(query)
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    deleteProducts = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");

        let result = {
            'status': 200,
            'msg': 'Product deleted'
        }
        if (req.fields.objects.length){
            try {
                let query = {
                    '_id': {
                        $in: req.fields.objects
                    }
                }
                await Product.deleteMany(query)
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
}


module.exports = new ProductController();
