const db = global.userConnection.useDb("loygift");
const Review = db.model("Review");
const Client = db.model("Client");

exports.getReview = async function (req, res) {
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

exports.getReviews = async function (req, res) {
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

exports.addReview = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Review added'
    }
    try {
        let client = await Client.findById(req.body.client)

        let review = await new Review({
            client: client._id,
            comment: req.body.comment,
            score: req.body.score,
            type: req.body.type,
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

exports.updateReview = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Review updated'
    }
    try {
        let query = { '_id': req.params.review }
        req.body['updatedAt'] = new Date()
        let review = await Review.findOneAndUpdate(query, req.body)
        result['review'] = review
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.deleteReview = async function (req, res) {
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

