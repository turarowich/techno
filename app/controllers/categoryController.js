const ObjectId = require('mongoose').Types.ObjectId;
const { useDB, sendError } = require('../../services/helper')
const postUrl = 'https://joinposter.com/api'
const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const proxy = 'http://your-proxy-url:port';
const agent = new HttpsProxyAgent(proxy);

async function postAPI(href, data) {
    let response = await axios({
      url: href,
      method: "post",
      data: data,
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip",
      },
      httpsAgent: agent
    }).catch((error) => {
      console.log(
        error.response?.data?.errors,
        "Call Api error"
      );
      return { error: error };
    });
    return response;
}
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
        const db = useDB(req.db);
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

            // this kind of data should ideally be either redisigned or migrated to sql type of storage
            // todo do something about it, thats very bad
            const categories = await Category.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "categories",
                                    localField: "_id",
                                    foreignField: "parent",
                                    as: "children",
                                },
                            },
                        ],
                    },
                },
                {
                    $match: {
                        parent: {
                            $exists: false,
                        },
                    },
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

            let categories = await Category.find(query).populate('parent');
            result['objects'] = categories
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };

    addCategory = async function (req, res) {
        let db = useDB(req.db)
        let Settings = db.model("Settings");
        let settings = await Settings.find();
        let tokenPP = settings[0].tokenPosterPos ? settings[0].tokenPosterPos : ""
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
            if (req.fields.parent && req.fields.parent !== 'null' && !ObjectId.isValid(req.fields.parent)) {
                return res.status(400).json({
                    'status': 400,
                    'msg': 'Invalid category ObjectId',
                });
            }
            if (req.fields.parent && ObjectId.isValid(req.fields.parent)) {
                const foundParentCategory = await CategoryModel.findOne({ _id: req.fields.parent }).populate('parent');
                if (!foundParentCategory) {
                    return res.status(404).json({
                        'status': 404,
                        'msg': 'Category not found',
                    });
                }
                if (foundParentCategory.parent && foundParentCategory.parent?.parent) {
                    return res.status(400).json({
                        'status': 400,
                        'msg': 'Cannot have nested categories with depth over 2'
                    });
                }
                if (foundParentCategory) {
                    newCategoryObject.parent = foundParentCategory
                }
            }
            let data = {
                'category_name'   : req.fields.name,
                'parent_category' : 0,
                'category_color'  : 'yellow',
                'category_hidden' : 0,
                'tax_id'          : 0,
            }
            if (tokenPP != "")  {
                await postAPI(`${postUrl}/menu.createCategory?token=${tokenPP}`,data)
                .then(data => {
                    newCategoryObject.post_id = data.data.response
                })
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
        let Settings = db.model("Settings");
        let settings = await Settings.find();
        let tokenPP = settings[0].tokenPosterPos ? settings[0].tokenPosterPos : ""
        let result = {
            'status': 200,
            'msg': 'Category updated'
        }
        try {
            let query = { '_id': req.params.category }
            req.fields['updatedAt'] = new Date()
            if (!req.fields.parent || req.fields.parent === '') {
                delete req.fields.parent;
                req.fields.$unset = { parent: ObjectId(req.params.category) };
            }
            let searchProduct = await Category.findById(query)

            let data = {
                'category_id'     : searchProduct.post_id,
                'category_name'   : req.fields.name,
                'parent_category' : 0,
                'category_color'  : 'yellow',
                'category_hidden' : 0,
                'tax_id'          : 0,
            }
            if (tokenPP != "")  {
                await postAPI(`${postUrl}/menu.updateCategory?token=${tokenPP}`,data)
                .then(result => {
                    console.log("searchProduct",searchProduct)
                    console.log(result)
                })
            }
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
        let Settings = db.model("Settings");
        let settings = await Settings.find();
        let tokenPP = settings[0].tokenPosterPos ? settings[0].tokenPosterPos : ""
        let result = {
            'status': 200,
            'msg': 'Category deleted'
        }
        try {
            const deleteObjectIds = [];
            deleteObjectIds.push(req.params.category);
            // i feel bad for this =(
            const nestedResult = await Category.aggregate([
                {
                    $match: {
                        _id: ObjectId(req.params.category),
                    },
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "categories",
                                    localField: "_id",
                                    foreignField: "parent",
                                    as: "children",
                                },
                            },
                        ],
                    },
                }
            ]);
            // sorry, this is ugly, we had to finish this for the client in a hurry
            if (nestedResult?.length > 0 && nestedResult[0].children?.length > 0) {
                nestedResult[0].children.forEach(child => {
                    deleteObjectIds.push(child._id);
                    if (child.children?.length > 0) {
                        child.children.forEach(grandChild => {
                            deleteObjectIds.push(grandChild._id);
                        });
                    }
                });
            }
            if (tokenPP != "")  {
                for(let i =0; i < deleteObjectIds.length; i++) {
                    let category = await Category.findById(deleteObjectIds[i])
                    console.log(category)
                    await postAPI(`${postUrl}/menu.removeCategory?token=${tokenPP}`,{'category_id': category.post_id})
                    
                }
            }
            await Category.deleteMany({ _id: { $in: deleteObjectIds } });
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

}

module.exports = new CategoryController();
