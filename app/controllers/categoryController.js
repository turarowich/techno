const {useDB}  = require('../../services/helper')

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
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };
    getCategories = async function (req, res) {
        let db = useDB(req.db)
        let Category = db.model("Category");

        let result = {
            'status': 200,
            'msg': 'Sending categories'
        }
        try {
            
            let categories = await Category.find()
            result['objects'] = categories
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };

    addCategory = async function (req, res) {
        let db = useDB(req.db)
        let Category = db.model("Category");

        let result = {
            'status': 200,
            'msg': 'Category added'
        }
        try {
            let category = await new Category({
                name: req.fields.name,
                type: req.fields.type,
            }).save();

            result['object'] = category
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
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
            result = {
                'status': 500,
                'msg': error.message
            }
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
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };

}

module.exports =  new CategoryController();
