const db = global.userConnection.useDb("loygift");
const Product = db.model("Product");
const Category = db.model("Category");

exports.getProduct = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Sending product'
    }
    try {
        let product = await Product.findById(req.params.product)
        result['product'] = product
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.getProducts = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Sending products'
    }
    try {
        let products = await Product.find()
        result['products'] = products
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.addProduct = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Product added'
    }
    try {
        let category = await Category.findById(req.body.category)

        let product = await new Product({
            name: req.body.name,
            img: req.body.img,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price,
            category: category._id
        }).save();

        result['product'] = product
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.updateProduct = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Product updated'
    }
    try {
        let query = { '_id': req.params.product }
        req.body['updatedAt'] = new Date()
        let product = await Product.findOneAndUpdate(query, req.body)
        result['product'] = product
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.deleteProduct = async function (req, res) {
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

