const { useDB, saveImage } = require('../../services/helper')
const fs = require('fs')

class ProductController{
    
    getProduct = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");

        let result = {
            'status': 200,
            'msg': 'Sending product'
        }
        try {
            let product = await Product.findById(req.params.product)
            result['object'] = product
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
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
            let products = await Product.find()
            result['objects'] = products
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
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
        try {
            let data = req.fields
            
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
                    result['status'] = 500
                    result['msg'] = filename
                    throw new Error('file with name ' + req.files.img.name + ' not an image');
                }else{
                    product.img = filename   
                }
            }
            
            for(let $i=0; $i < 3; $i++){
                if (req.files['imgArray' + $i]) {
                    let filename = saveImage(req.files['imgArray' + $i], req.db)
                    if (filename == 'Not image') {
                        result['status'] = 500
                        result['msg'] = filename
                        throw new Error('file with name ' + req.files['imgArray' + $i].name + ' not an image');
                    } else {
                        product.imgArray.push(filename)
                    }
                }
            }    
            product.save()
            result['object'] = product
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
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
        try {
            let data = req.fields
            let query = { '_id': req.params.product }
            data['updatedAt'] = new Date()
            let product = await Product.findOneAndUpdate(query, data)
            if (req.files.img) {
                let filename = saveImage(req.files.img, req.db, product.img)
                if (filename == 'Not image') {
                    result['status'] = 500
                    result['msg'] = filename
                    throw new Error('file with name ' + req.files.img.name + ' not an image');
                } else {
                    product.img = filename   
                }
            }
            for (let $i = 0; $i < 3; $i++) {
                if (req.files['imgArray' + $i]) {
                    product.imgArray = []
                    let filename = saveImage(req.files['imgArray' + $i], req.db)
                    if (filename == 'Not image') {
                        result['status'] = 500
                        result['msg'] = filename
                        throw new Error('file with name ' + req.files['imgArray' + $i].name + ' not an image');
                    } else {
                        product.imgArray.push(filename)
                    }
                }
            }
            product.save()
            result['object'] = product
        } catch (error) {
            console.log(error)
            result = {
                'status': 500,
                'msg': error.message
            }
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
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };
}


module.exports = new ProductController();
