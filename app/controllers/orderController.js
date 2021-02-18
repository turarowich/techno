const db = global.userConnection.useDb("loygift");
const Order = db.model("Order");
const Product = db.model("Product");

exports.getOrder = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Sending order'
    }
    try {
        let order = await Order.findById(req.params.order)
        result['order'] = await order.populate('client').populate('products').execPopulate()
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.getOrders = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Sending orders'
    }
    try {
        let orders = await Order.find().populate('client').populate('products').exec()
        result['orders'] = orders
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.addOrder = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Order added'
    }
    try {

        let order = await new Order({
            products: req.body.products,
            quantity: req.body.quantity,
            client: req.body.client,
            promoCode: req.body.promoCode,
            status: req.body.status,
            deliveryType: req.body.deliveryType,
        }).save();

        result['order'] = await order.populate('client').populate('products').execPopulate()
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.updateOrder = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Order updated'
    }
    try {
        let query = { '_id': req.params.order }
        req.body['updatedAt'] = new Date()
        let order = await Order.findOneAndUpdate(query, req.body)
        result['order'] = await order.populate('client').populate('products').execPopulate()
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

exports.deleteOrder = async function (req, res) {
    let result = {
        'status': 200,
        'msg': 'Order deleted'
    }
    try {
        let query = { '_id': req.params.order }
        await Order.findByIdAndRemove(query)
    } catch (error) {
        result = {
            'status': 500,
            'msg': error.message
        }
    }

    res.status(result.status).json(result);
};

