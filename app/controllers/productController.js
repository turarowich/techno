
const fs = require('fs')
var os = require("os");
const { useDB, sendError, saveImage, createExcel, removeImage, checkAccess } = require('../../services/helper')
var validate = require('../../config/messages');
var readXlsxFile = require('read-excel-file/node')

class ProductController{
    
    getProduct = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "catalog", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }

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
        if(req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "catalog", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }
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
        // console.log(result)
        res.status(result.status).json(result);
    };

    addProduct = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");
        let Log = db.model("Log");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "catalog", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
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
            if(data['category'] === ""){
                data['category'] = null
            }
            let product = await new Product({
                type:data.type || "product",
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
                active: data.active,
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
            await product.save()
            await new Log({
                type: "product_created",
                description: product.name,
                value: product.price,
                valueColor: "done",
                user: req.userName,
                user_id: req.userID,
                icon: "add"
            }).save()
            result['object'] = product
        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    };

    updateProduct = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");
        let Log = db.model("Log");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "catalog", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Product updated'
        }
        updateProduct: try {
            let data = req.fields
            let query = { '_id': req.params.product }
            data['updatedAt'] = new Date()
            if(data['category'] === ""){
                data['category'] = null
            }
            let product = await Product.findOneAndUpdate(query, data)
            if (req.fields.img instanceof String && req.fields.img != product.img) {
                product.img = req.fields.img
            }else if (req.files.img) {
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
                if (req.files['imgArray' + $i] != undefined && req.files['imgArray' + $i] != null) {
                    let filename = ""
                    if (product.img != product.imgArray[$i]) {
                        filename = saveImage(req.files['imgArray' + $i], req.db, product.imgArray[$i])
                    }else{
                        filename = saveImage(req.files['imgArray' + $i], req.db)
                    }
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
                        if (product.imgArray[$i] != undefined){
                            product.imgArray[$i] = filename
                        }else{
                            product.imgArray.push(filename)
                        }
                    }
                } else if (req.fields['imgArray' + $i] == "" && product.imgArray[$i]){
                    if (product.img != product.imgArray[$i]){
                        removeImage(product.imgArray[$i])
                    }
                    delete product.imgArray[$i]
                }
            }
            for (let $i = 2; $i >= 0; $i--) {
                if (product.imgArray[$i] == null || product.imgArray[$i] == undefined){
                    product.imgArray.splice($i, 1)
                }
            }
            await product.save({new:true})
            await new Log({
                type: "product_updated",
                description: product.name,
                value: product.price,
                valueColor: "done",
                user: req.userName,
                user_id: req.userID,
                icon: "update"
            }).save()
            result['object'] = product
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    updateProductsCategory = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");
        
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "catalog", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Sending objects'
        }
        try {
            let query = {}
            req.fields.objects.forEach(async function (product, index) {
                query = { '_id': product }
                await Product.findOneAndUpdate(query, req.fields)
            })
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    deleteProduct = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");
        let Log = db.model("Log");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "catalog", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Product deleted'
        }
        try {
            let query = { '_id': req.params.product }
            let product = await Product.findById(query)
            if(product){
                await new Log({
                    type: "product_deleted",
                    description: product.name,
                    value: product.price,
                    valueColor: "canceled",
                    user: req.userName,
                    user_id: req.userID,
                    icon: "delete"
                }).save()
            }
            await Product.findByIdAndRemove(query)
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    deleteProducts = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");
        let Log = db.model("Log");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "catalog", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
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
                let products = await Product.find(query, 'name')

                if (products.length) {
                    let desc = products.map(function (elem) {
                        return elem.name;
                    }).join(", ")
                    await new Log({
                        type: "products_deleted",
                        description: desc,
                        user: req.userName,
                        user_id: req.userID,
                        icon: "delete"
                    }).save()
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

    getProductExcel = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        let result = {
            'status': 200,
            'msg': 'Sending link'
        }
        if (req.userType == "employee") {
            await checkAccess(req.userID, { access: "catalog", parametr: "active", parametr2: 'canEdit' }, db, res)
        }
        try {
            let objects = await Product.find().where('_id').in(req.fields.objects).populate('category').exec()
            createExcel("product", objects, lang, req.db)
            var hostname = os.hostname();
            let file = hostname + req.db + '/Excel.xlsx'
            result['object'] = file
        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    };

    getProductImportExcel = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");
        let Category = db.model("Category");
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        if (req.userType == "employee") {
            await checkAccess(req.userID, { access: "catalog", parametr: "active", parametr2: 'canEdit' }, db, res)
        }
        let result = {
            'status': 200,
            'msg': 'Sending link'
        }
        try {

            let rows = await readXlsxFile(req.files.excel.path).catch((error) =>{
                console.log(error)
            })
            var products = []
            for (let index = 0; index < rows.length; index++) {
                let data = rows[index]
                if (index) {
                    let product = await new Product({
                        name: data[0],
                        name_ru: data[1],
                        secondary: data[2],
                        secondary_ru: data[3],
                        description: data[4],
                        description_ru: data[5],
                        vendorCode: data[6],
                        quantity: data[7],
                        price: data[8],
                    }).save();
                    products.push(product._id)

                    if (data[9]) {

                        let category = await Category.find({ type: 'product', name: data[9] })
                        category = category[0]
                        if (!category) {
                            category = await new Category({
                                name: data[9],
                                type: 'product',
                            }).save();
                        }
                        product.category = category._id
                        await product.save()
                    }
                }
            }
            let objects = await Product.find().where('_id').in(products).populate('category').exec()
            result['objects'] = objects
        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    };
    searchProduct = async function (req, res) {
        let db = useDB(req.db)
        let Product = db.model("Product");
        let search = req.query.search;
        if (req.userType == "employee") {
            await checkAccess(req.userID, { access: "catalog", parametr: "active", parametr2: 'canEdit' }, db, res)
        }
        let result = {
            'status': 200,
            'msg': 'Sending product'
        }

        console.log(req.query);

        try {
            let product = await Product.find( { "name": {$regex: search} } )
            result['objects'] = product
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.json(result);
    };
    searchProductWeb = async function (req, res) {
        let db = useDB(req.query.db)
        let Product = db.model("Product");
        let search = req.query.search;
        let result = {
            'status': 200,
            'msg': 'Sending products'
        }
        try {
            result['objects'] = await Product.find( { "name": {$regex: search} } );
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.json(result);
    };
}


module.exports = new ProductController();
