const { useDB, sendError, createExcel, randomNumber, checkAccess } = require('../../services/helper')
var validate = require('../../config/messages');
const fs = require('fs');
const { connect } = require('mongodb');

async function calcCashback(products_full_data,cashback_model) {
    //Cashback
    //1 check if cashback is active,2 check if applies to everything or
    //specific products,3 if all -apply & end ,else check if products match
    let cashback_from_order = 0;
    if(!products_full_data){
        return 0;
    }
    try {
        let cashback = await cashback_model.find();
        let first_cashback = cashback[0];
        if (first_cashback) {
            //1
            let cashback_status = first_cashback.status;
            let cashback_default_percent = parseFloat(first_cashback.default_cashback) / 100;
            if (!cashback_status) {
                return;
            }
            //2
            let cashback_products = first_cashback.selectedItemsList;
            //3
            if (cashback_products.length === 0) {
                //applies to all
                products_full_data.forEach(function (prod) {
                    //discounted price
                    let sum = prod.current_price || 0;
                    cashback_from_order += (parseFloat(sum) * cashback_default_percent).toFixed(2);
                })
            } else {
                //applies to specific products
                products_full_data.forEach(function (prod) {
                    //check
                    cashback_products.forEach(function (cash) {
                        if (prod.product._id == cash.id) {
                            //discounted price
                            let sum = prod.current_price || 0;
                            let cashback_percent = parseFloat(cash.percentage_cashback) / 100 || 0;
                            let cashback_sum = cash.fixed_cashback || 0;
                            cashback_from_order = (parseFloat(cashback_from_order) + (parseFloat(sum) * cashback_percent) + parseFloat(cashback_sum)).toFixed(2);
                        }
                    })
                })
            }

        }
    } catch (e) {
        console.log(e);
    }
    return cashback_from_order;
}

class OrderController{
    
    getOrder = async function (req, res) {
        let db = useDB(req.db)
        let Order = db.model("Order");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "orders", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }
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
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "orders", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }
        try {
            let query = {}
            if (req.query.client) {
                query = { 'client': req.query.client }
            }
            let orders = {}
            if (req.query.populate == "client"){
                orders = await Order.find(query).populate('client').populate('products').exec()
            }else{
                orders = await Order.find(query).populate('products').exec()
            }
            
            result['objects'] = orders
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    addOrder = async function (req, res) {
        console.log(req.fields);
        let db = useDB(req.db)
        let Order = db.model("Order");
        let Client = db.model("Client");  
        let Product = db.model("Product");
        let OrderProduct = db.model("OrderProduct");
        let ClientBonusHistory = db.model("clientBonusHistory");
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "orders", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Order added'
        }
        try {
            let order = await new Order({
                 // client: client._id,
                 // client_name: client.name,
                 // client_phone: client.phone,
                promoCode: req.fields.promoCode,
                status: req.fields.status,
                address: req.fields.address,
                delivery: req.fields.delivery,
                deliveryType: req.fields.deliveryType,
                notes: req.fields.notes,
                points: req.fields.points,
                code: randomNumber(1000, 10000),

                deliveryPrice: req.fields.deliveryPrice,
                totalDiscount: req.fields.totalDiscount,
                productsPrice: req.fields.productsPrice,
                totalPrice: req.fields.totalPrice,
                branch: req.fields.branch,
            });
            var products = req.fields.products
            for(let i=0; i < products.length; i++){
                let product = products[i]
                let search_product = await Product.findById(product.id)
                if(!product.id){
                    search_product = await Product.findById(product._id)
                }
                if (search_product) {
                    let order_product = await new OrderProduct({
                        product: product.id ? product.id : product._id,
                        name: search_product.name,
                        name_ru: search_product.name_ru,
                        secondary: search_product.secondary,
                        secondary_ru: search_product.secondary_ru,
                        img: search_product.img,
                        price: search_product.price,
                        quantity: product.quantity
                    }).save();
                    order.products.push(order_product._id);
                    search_product.quantity = parseFloat(search_product.quantity)-parseFloat(product.quantity);
                    search_product.save();
                }
            }

        //Cashback
        let cashback_model = db.model("Cashback");
        let products_full_data = req.fields.products_full_data;
        let cashback_from_order = await calcCashback(products_full_data,cashback_model);
        order.earnedPoints = parseFloat(cashback_from_order) || 0;
        if(!req.fields.client){
            req.fields.client = null
        }
        let client = await Client.findById(req.fields.client)
        if(client){
            if (req.fields.points){
                client.points -= req.fields.points;
                client.save({ validateBeforeSave: false });
                await new ClientBonusHistory({
                    client: client._id,
                    points: req.fields.points,
                    source: 'Points used order #'+order.code,
                    order: order._id,
                    type: 'used',
                }).save();
            }
            client.points = (parseFloat(client.points)+parseFloat(cashback_from_order)).toFixed(2);
            client.balance = (parseFloat(client.balance) +parseFloat(order.totalPrice)).toFixed(2);
            await client.save({ validateBeforeSave: false });

            order.client=client._id;
            order.client_name=client.name;
            order.client_phone=client.phone;

            await new ClientBonusHistory({
                client: client._id,
                points: cashback_from_order,
                source: 'Points received order #'+order.code,
                order: order._id,
                type: 'received',
            }).save();
        }else if(req.fields.guest){
            let guest = req.fields.guest;
            order.client_name=guest.name || '';
            order.client_phone=guest.phone || '';
        }
        console.log('EARNED CASHBACK',cashback_from_order,order);
        await order.save();
        result['object'] = await order.populate('products').execPopulate();
        } catch (error) {
            console.log("errror")
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };

    getEarnedPoints = async function (req, res) {
        let db = useDB(req.db)
        let cashback_model = db.model("Cashback");
        let products_full_data = req.fields.products_full_data;
        let result = await calcCashback(products_full_data,cashback_model);
        res.status(200).json(result);
    }
    updateOrder = async function (req, res) {
        let db = useDB(req.db)
        let Order = db.model("Order");
        let Product = db.model("Product");
        let OrderProduct = db.model("OrderProduct");
        
        if (req.userType == "employee" && Object.keys(req.fields).length == 1 && "status" in req.fields){
            let checkResult = await checkAccess(req.userID, { access: "canChangeOrderStatus" }, db, res)
            if (checkResult) {
                return;
            }
        }
        if (req.userType == "employee" && "status" in req.fields) {
            let checkResult = await checkAccess(req.userID, { access: "canChangeOrderStatus" }, db)
            if (checkResult) {
                delete req.fields.status;
            }
        }
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "orders", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Order updated'
        }
        try {
            let query = { '_id': req.params.order }
            req.fields['updatedAt'] = new Date()
            var products = req.fields.products
            // req.fields.products = null
            let order = await Order.findOneAndUpdate(query, req.fields)
            if(products && products.length){
                order.products = []
                for (let i = 0; i < products.length; i++) {
                    let product = products[i]
                    let search_product = await Product.findById(product.id)
                    if (!product.id) {
                        search_product = await Product.findById(product._id)
                    }

                    if (search_product) {

                        let order_product = await new OrderProduct({
                            product: search_product._id,
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
                await order.save()
            }
            result['object'] = await order.populate('client').populate('products').execPopulate()
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    deleteOrder = async function (req, res) {
        let db = useDB(req.db)
        let Order = db.model("Order");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "orders", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
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
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "orders", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        
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
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "orders", parametr: "active"}, db, res)
            if (checkResult) {
                return;
            }
        }
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        let result = {
            'status': 200,
            'msg': 'Sending link'
        }
        try {
            let objects = await Order.find().where('_id').in(req.fields.objects).populate('client').populate('products').exec()
            createExcel("order", objects, lang, req.db)
            let file = 'https://localhost:8443/files/' + req.db + '/Excel.xlsx'
            result['object'] = file
        } catch (error) {
            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    };
}


module.exports = new OrderController();
