const { useDB, sendError, createExcel } = require('../../services/helper')
var validate = require('../../config/errorMessages');
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
            result = sendError(error, req.headers["accept-language"])
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
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    addOrder = async function (req, res) {
        let db = useDB(req.db)
        let Order = db.model("Order");
        let Client = db.model("Client");  
        let Product = db.model("Product");
        let OrderProduct = db.model("OrderProduct");
        let result = {
            'status': 200,
            'msg': 'Order added'
        }
        try {
            let client = await Client.findById(req.userID)
            if(client){
                
                let order = await new Order({
                    client: client._id,
                    client_name: client.name,
                    client_phone: client.phone,
                    promoCode: req.fields.promoCode,
                    status: req.fields.status,
                    deliveryType: req.fields.deliveryType,
                });
                var products = req.fields.products
                for(let i=0; i < products.length; i++){
                    let product = products[i]
                    let search_product = await Product.findById(product.id)
                    if (search_product) {

                        let order_product = await new OrderProduct({
                            product: product.id,
                            name: search_product.name,
                            name_ru: search_product.name_ru,
                            secondary: search_product.secondary,
                            secondary_ru: search_product.secondary_ru,
                            img: search_product.img,
                            price: search_product.price,
                            quantity: product.quantity
                        }).save();
                        order.products.push(order_product._id)
                    }
                }
                order.save()
                result['object'] = await order.populate('products').execPopulate()
            }else{
                result['msg'] = 'Cant find user'
            }
            

            
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
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
            result = sendError(error, req.headers["accept-language"])
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
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    deleteOrders = async function (req, res) {
        let db = useDB(req.db)
        let Order = db.model("Order");

        let result = {
            'status': 200,
            'msg': 'Orders deleted'
        }
        if (req.fields.objects.length) {
            try {
                let query = {
                    '_id': {
                        $in: req.fields.objects
                    }
                }
                await Order.deleteMany(query)
            } catch (error) {
                result = sendError(error, req.headers["accept-language"])
            }
        } else {
            result = {
                'status': 200,
                'msg': 'Parametr objects is empty'
            }
        }


        res.status(result.status).json(result);
    };
    getOrderExcel = async function (req, res) {
        let db = useDB(req.db)
        let Order = db.model("Order");
        
        let result = {
            'status': 200,
            'msg': 'Order deleted'
        }
        try {
            let result = {
                'status': 200,
                'msg': 'Order deleted'
            }
            // let excel = createExcel(куыг)    
            // console.log(excel)
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
}


module.exports = new OrderController();
