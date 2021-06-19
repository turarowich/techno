const { useDB, sendError, saveImage, checkAccess } = require('../../services/helper')
var validate = require('../../config/messages');
var path = require('path');
const fs = require('fs')
class NewsController {

    getSingleNews = async function (req, res) {
        let db = useDB(req.db)
        let News = db.model("News");
        if (req.userType == "employee") {
            await checkAccess(req.userID, { access: "news", parametr: "active" }, db, res)
        }
        let result = {
            'status': 200,
            'msg': 'Sending news'
        }
        try {
            let category = await News.findById(req.params.news)
            result['object'] = category
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    getNews = async function (req, res) {
        let db = useDB(req.db)
        let News = db.model("News");
        if (req.userType == "employee") {
            await checkAccess(req.userID, { access: "news", parametr: "active" }, db, res)
        }
        let result = {
            'status': 200,
            'msg': 'Sending news'
        }
        try {

            let news = await News.find()
            result['objects'] = news
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    addNews = async function (req, res) {
        let db = useDB(req.db)
        let News = db.model("News");
        if (req.userType == "employee") {
            await checkAccess(req.userID, { access: "news", parametr: "active", parametr2: 'canEdit' }, db, res)
        }
        let result = {
            'status': 200,
            'msg': 'News added'
        }
        if (req.fields.category){
            req.fields.category = "promotions"
        }else{
            req.fields.category = "news"
        }
        addNews: try {
            let news = await new News({
                name: req.fields.name,
                name_ru: req.fields.name_ru,
                desc: req.fields.desc,
                desc_ru: req.fields.desc_ru,
                startDate: req.fields.startDate,
                endDate: req.fields.endDate,
                category: req.fields.category,
            });
            await news.validate()

            if (req.files.img) {
                //
                let dir = path.join(__dirname, '/../../views/frontend/images/' + req.db);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, {recursive: true}, err => {
                        console.log(err)
                    })
                }
                //
                let filename = saveImage(req.files.img, req.db)
                if (filename == 'Not image') {
                    result = {
                        status: 500,
                        msg: "Validation error",
                        errors: {
                            img: validate[lang]['image_not_valid'],
                        },
                    }
                    break addNews
                } else {
                    news.img = filename
                }
            }
            news.save()
            result['object'] = news
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    updateNews = async function (req, res) {
        let db = useDB(req.db)
        let News = db.model("News");
        if (req.userType == "employee") {
            await checkAccess(req.userID, { access: "news", parametr: "active", parametr2: 'canEdit' }, db, res)
        }
        let result = {
            'status': 200,
            'msg': 'News updated'
        }
        updateNews: try {

            let query = { '_id': req.params.news }
            req.fields['updatedAt'] = new Date()
            if (req.fields.category) {
                req.fields.category = "promotions"
            } else {
                req.fields.category = "news"
            }
            let news = await News.findOneAndUpdate(query, req.fields)
            if (req.files.img) {
                let filename = saveImage(req.files.img, req.db, news.img)
                if (filename == 'Not image') {
                    result = {
                        status: 500,
                        msg: "Validation error",
                        errors: {
                            img: validate[lang]['image_not_valid'],
                        },
                    }
                    break updateNews
                } else {
                    news.img = filename
                    await news.save()
                }
            }
            result['object'] = news
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    deleteNews = async function (req, res) {
        let db = useDB(req.db)
        let News = db.model("News");
        if (req.userType == "employee") {
            await checkAccess(req.userID, { access: "news", parametr: "active", parametr2: 'canEdit' }, db, res)
        }
        let result = {
            'status': 200,
            'msg': 'News deleted'
        }
        try {
            let query = { '_id': req.params.news }
            await News.findByIdAndRemove(query)
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

}

module.exports = new NewsController();
