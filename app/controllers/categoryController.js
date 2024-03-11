const ObjectId = require('mongoose').Types.ObjectId;
const { useDB, sendError } = require('../../services/helper')
class CategoryController {
    getCategory = async function (req, res) {
        let db = useDB(req.db)
        let Category = db.model("Category");

        let result = {
            'status': 200,
            'msg': 'Sending category'
        }
        try {
            let category = await Category.findById(req.params.category)
            result['object'] = category
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    getNestedCategories = async function (req, res) {
        let db = useDB(req.db)
        // const db = useDB('loygift');

        let Category = db.model("Category");

        let result = {
            'status': 200,
            'msg': 'Sending categories'
        }
        try {
            let query = {}
            if (req.query.type) {
                query = { 'type': req.query.type }
            }

            const categories = await Category.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children",
                    }
                },
                {
                    $match:
                    {
                        parent: {
                            $exists: false,
                        },
                    }
                },
            ]);
            result['objects'] = categories
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };

    getCategories = async function (req, res) {
        let db = useDB(req.db)
        // const db = useDB('loygift');
        let Category = db.model("Category");

        let result = {
            'status': 200,
            'msg': 'Sending categories'
        }
        try {
            let query = {}
            if (req.query.type){
                query = { 'type': req.query.type}
            } 
            
            let categories = await Category.find(query).populate('parent');
            result['objects'] = categories
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };

    addCategory = async function (req, res) {
        let db = useDB(req.db)
        // const db = useDB('loygift');

        const CategoryModel = db.model("Category");

        let result = {
            'status': 200,
            'msg': 'Category added'
        }
        try {
            const newCategoryObject = {
                name: req.fields.name,
                type: req.fields.type,
            }
            if (req.fields.parent && !ObjectId.isValid(req.fields.parent)) {
                res.status(400).json({
                    'status': 400,
                    'msg': 'Invalid category ObjectId',
                });
            }
            if (req.fields.parent && ObjectId.isValid(req.fields.parent)) {
                const foundParentCategory = await CategoryModel.findOne({ _id: req.fields.parent });
                if (!foundParentCategory) {
                    res.status(404).json({
                        'status': 404,
                        'msg': 'Category not found',
                    });
                }
                if (foundParentCategory.parent) {
                    res.status(400).json({
                        'status': 400,
                        'msg': 'Cannot add to sub category',
                    });
                }
                if (foundParentCategory) {
                    newCategoryObject.parent = foundParentCategory
                }
            }

            const category = await new CategoryModel(newCategoryObject).save();
            result['object'] = category
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    updateCategory = async function (req, res) {
        let db = useDB(req.db)
        let Category = db.model("Category");

        let result = {
            'status': 200,
            'msg': 'Category updated'
        }
        try {
            let query = { '_id': req.params.category }
            req.fields['updatedAt'] = new Date()
            let category = await Category.findOneAndUpdate(query, req.fields)
            result['object'] = category
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    deleteCategory = async function (req, res) {
        let db = useDB(req.db)
        let Category = db.model("Category");

        let result = {
            'status': 200,
            'msg': 'Category deleted'
        }
        try {
            let query = { '_id': req.params.category }
            await Category.findByIdAndRemove(query)
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

}

module.exports = new CategoryController();
