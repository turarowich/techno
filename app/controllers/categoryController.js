const db = global.userConnection.useDb("loygift");
const Category = db.model("Category");

exports.getCategory = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Sending category'
    }
    try {
        let category = await Category.findById(req.params.category)
        result['category'] = category
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.getCategories = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Sending categories'
    }
    try {
        let categories = await Category.find()
        result['categories'] = categories
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.addCategory = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Category added'
    }
    try {
        let category = await new Category({
            name: req.body.name,
            type: req.body.type,
        }).save();

        result['category'] = category
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.updateCategory = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Category updated'
    }
    try {
        let query = { '_id': req.params.category }
        req.body['updatedAt'] = new Date()
        let category = await Category.findOneAndUpdate(query, req.body)
        result['category'] = category
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.deleteCategory = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Category deleted'
    }
    try {
        let query = { '_id': req.params.category }
        await Category.findByIdAndRemove(query)
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

