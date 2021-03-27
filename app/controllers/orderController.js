const { useDB } = require('../../services/helper')

class OrderController{
    
    getOrder = async function (req, res) {
        let db = useDB(req.db)
        let Order = db.model("Order");

        let result = {
            'status': 200,
            'msg': 'Sending order'
        }
        try {
            let order = await Order.findById(req.params.order)
            result['object'] = await order.populate('client').populate('products').execPopulate()
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };

    getOrders = async function (req, res) {
        let db = useDB(req.db)
        let Order = db.model("Order");

        let result = {
            'status': 200,
            'msg': 'Sending orders'
        }
        try {
            let orders = await Order.find().populate('client').populate('products').exec()
            result['objects'] = orders
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };

    addOrder = async function (req, res) {
        let db = useDB(req.db)
        let Order = db.model("Order");

        let result = {
            'status': 200,
            'msg': 'Order added'
        }
        try {

            let order = await new Order({
                products: req.fields.products,
                quantity: req.fields.quantity,
                client: req.fields.client,
                promoCode: req.fields.promoCode,
                status: req.fields.status,
                deliveryType: req.fields.deliveryType,
            }).save();

            result['object'] = await order.populate('client').populate('products').execPopulate()
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };

    updateOrder = async function (req, res) {
        let db = useDB(req.db)
        let Order = db.model("Order");

        let result = {
            'status': 200,
            'msg': 'Order updated'
        }
        try {
            let query = { '_id': req.params.order }
            req.fields['updatedAt'] = new Date()
            let order = await Order.findOneAndUpdate(query, req.fields)
            result['object'] = await order.populate('client').populate('products').execPopulate()
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };

    deleteOrder = async function (req, res) {
        let db = useDB(req.db)
        let Order = db.model("Order");

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
}


module.exports = new OrderController();
