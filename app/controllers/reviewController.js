
const { useDB } = require('../../services/helper')

class ReviewController{
    
    getReview = async function (req, res) {
        let db = useDB(req.db)
        let Review = db.model("Review");

        let result = {
            'status': 200,
            'msg': 'Sending review'
        }
        try {
            let review = await Review.findById(req.params.review)
            result['review'] = review
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };

    getReviews = async function (req, res) {
        let db = useDB(req.db)
        let Review = db.model("Review");

        let result = {
            'status': 200,
            'msg': 'Sending reviews'
        }
        try {
            let review = await Review.find()
            result['review'] = review
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };

    addReview = async function (req, res) {
        let db = useDB(req.db)
        let Review = db.model("Review");

        let result = {
            'status': 200,
            'msg': 'Review added'
        }
        try {
            let review = await new Review({
                client: req.fields.client,
                comment: req.fields.comment,
                score: req.fields.score,
                type: req.fields.type,
            }).save();

            result['review'] = review
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };

    updateReview = async function (req, res) {
        let db = useDB(req.db)
        let Review = db.model("Review");

        let result = {
            'status': 200,
            'msg': 'Review updated'
        }
        try {
            let query = { '_id': req.params.review }
            req.fields['updatedAt'] = new Date()
            let review = await Review.findOneAndUpdate(query, req.fields)
            result['review'] = review
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };

    deleteReview = async function (req, res) {
        let db = useDB(req.db)
        let Review = db.model("Review");
        
        let result = {
            'status': 200,
            'msg': 'Review deleted'
        }
        try {
            let query = { '_id': req.params.review }
            await Review.findByIdAndRemove(query)
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };
}


module.exports = new ReviewController();
