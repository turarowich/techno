const { useDB, sendError, createExcel, randomNumber, checkAccess } = require('../../services/helper')

var validate = require('../../config/messages');
const fs = require('fs');
const moment = require('moment');
const { connect } = require('mongodb');
const Analytics = require('./analyticsController');
function compareDates(dateStart_,dateEnd_){
    if(!dateStart_ || !dateEnd_){
        return false;
    }
    let today = moment();
    let dateStart = moment(dateStart_);
    let dateEnd = moment(dateEnd_);
    //(start<=today<=end)
    return(dateStart.isSameOrBefore(today,'day') && dateEnd.isSameOrAfter(today,'day'))
}
async function products_with_discounts(products=[],Product,promocode=null,client=null,discounts=[]) {
    //params: product->list of products ids and quantity, Product model,promocode obj,client obj,discounts list.
    //stuff that can affect the price
    //1 items own discount, 2 promo, 3 clients status
    let nonDiscountedTotal = 0;
    let discountedTotal = 0;
    let discountsTotal = 0;
    let productCurrentPrice = [];
    for (const product of products) {
        let product_obj =  await Product.findById(product.id);
        if(!product_obj){
            continue;
        }
        let temp = {
            current_price:0,
            quantity:0,
            product:{},
            discounted:false,
        }
        temp.product = product_obj;
        temp.quantity = product.quantity;
        //check products own discount
        if(compareDates(product_obj.promoStart,product_obj.promoEnd)){
            temp.current_price = parseFloat(product_obj.promoPrice) * parseFloat(product.quantity);
            temp.discounted = true;
        }else{
            temp.current_price = parseFloat(product_obj.price)  * parseFloat(product.quantity);
        }
        //check the promo
        if(!temp.discounted){
            if(promocode){
                //assume that promo is already validated
                if(promocode.selected_type==="all" || promocode.selected_items_list.includes(product_obj._id.toString())){
                    let non_discounted = parseFloat(product_obj.price) * parseFloat(product.quantity);
                    let discount_percent = non_discounted*(parseFloat(promocode.discount)/100);
                    let discount_sum = parseFloat(promocode.fixed_sum);
                    let sum = (non_discounted-discount_percent-discount_sum).toFixed(2); //its a string
                    temp.current_price = sum>0 ? sum : 0;
                    temp.discounted = true;
                }
            }
        }
        //check clients discount
        if(!temp.discounted){
            if(client && discounts.length>0){
                let dis_percent = 0;
                discounts.forEach(function (discount){
                    if(client.balance>=discount.min_sum_of_purchases){
                        dis_percent = discount.discount_percentage;
                    }
                });
                if(dis_percent>0){
                    let non_discounted = parseFloat(product_obj.price) * parseFloat(product.quantity);
                    let discount_percent = non_discounted*(parseFloat(dis_percent)/100);
                    temp.current_price = (non_discounted-discount_percent).toFixed(2); //its a string
                    temp.discounted = true;
                }
            }
        }
        productCurrentPrice.push(temp);
    }
    //Counting
    productCurrentPrice.forEach(function (prod){
        nonDiscountedTotal = (parseFloat(nonDiscountedTotal) + parseFloat(prod.product.price))*parseFloat(prod.quantity);
        discountedTotal = parseFloat(discountedTotal) + parseFloat(prod.current_price);
    })
    discountsTotal = nonDiscountedTotal-discountedTotal;
    //return each product discounted
    //return total sum non-discounted, total sum discounted, total discounts
    return {
        productCurrentPrice:productCurrentPrice,
        nonDiscountedTotal:nonDiscountedTotal.toFixed(2),
        discountedTotal:discountedTotal.toFixed(2),
        discountsTotal:discountsTotal.toFixed(2),
    }
}

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
async function checkAndUpdatePromo(promocode=null,client=null) {
    if(promocode){
        // promocode.usedBy = [];
        // promocode.save();
        // console.log(promocode);
        // return;

        //check uses
        if(promocode.already_used >= promocode.number_of_uses){
            return res.status(400).send("Promocode has expired");
        }
        promocode.already_used +=1;
        let usedBy = promocode.usedBy;
        if(client){
            console.log('YASSS CLIENT');
            let exists = usedBy.find(used => used.user == client._id.toString());
            if(!exists){
                console.log("NEW USER");
                usedBy.push({
                    user:client._id,
                    quantity:1,
                    name:client.name,
                })
            }else{
                console.log("OLD USER");
                exists.quantity +=1;
            }
        }else{
            console.log("else");
            let exists = usedBy.find(used => used.user == null);
            if(!exists){
                console.log("NEW null");
                usedBy.push({
                    user:null,
                    quantity:1,
                })
            }else{
                console.log("OLD null");
                exists.quantity +=1;
            }
        }
        promocode.save();
    }
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
        let db = useDB(req.db)
        let Order = db.model("Order");
        let Client = db.model("Client");  
        let Product = db.model("Product");
        let OrderProduct = db.model("OrderProduct");
        let Log = db.model("Log");
        let ClientBonusHistory = db.model("clientBonusHistory");
        let DeliveryModel = db.model("Delivery");
        let Discount = db.model("Discount");
        let PromocodeModel = db.model("Promocode");
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

        order_try: try {
            
            let discounts = await Discount.find();
            let client = await Client.findById(req.fields.client);
            
            if (req.fields.promoCode == "") {
                req.fields.promoCode = null
            }
            let promocode = await PromocodeModel.findById(req.fields.promoCode);
            let delivery = await DeliveryModel.findById(req.fields.delivery);
            let deliveryPrice = 0;
            if(delivery){
                deliveryPrice = delivery.price;
            }
            console.log(req.fields)
            
            //params: product->list of products ids and quantity, Product model,promocode obj,client obj,discounts list.
            let result_object = await products_with_discounts(
                req.fields.products, // list of product ids and quant
                Product,             // Product model
                promocode,           // promocode object
                client,              // client object
                discounts,           // list of discounts
            );
            let total = (parseFloat(result_object.discountedTotal) + parseFloat(deliveryPrice) - parseFloat(req.fields.points || 0)).toFixed(2);

            //update promocode
            await checkAndUpdatePromo(promocode,client);
            
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
                points: req.fields.points || 0,
                code: randomNumber(100000, 10000000),
                deliveryPrice: deliveryPrice,
                totalDiscount: result_object.discountsTotal,
                productsPrice: result_object.nonDiscountedTotal,
                totalPrice: total,
                branch: req.fields.branch,
                products:[],
            });

            var products = req.fields.products
            for(let i=0; i < products.length; i++){
                let product = products[i]
                let search_product = await Product.findById(product.id)
                if(!product.id){
                    search_product = await Product.findById(product._id)
                }
                if (search_product && search_product.quantity>=product.quantity) {
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
                }else{
                    return res.status(400).send(`Out of stock, ${search_product.name} only ${search_product.quantity} left`);
                    // break order_try;
                }
                //send warning
            }

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
                client.balance = (parseFloat(client.balance) +parseFloat(order.totalPrice)).toFixed(2);
                await client.save({ validateBeforeSave: false });

                order.client=client._id;
                order.client_name=client.name;
                order.client_phone=client.phone;

            }else if(req.fields.guest){
                let guest = req.fields.guest;
                order.client_name=guest.name || '';
                order.client_phone=guest.phone || '';
            }
            await new Log({
                type: "order_created",
                description: "order_num",
                value: "#" + order.code,
                user: req.userName,
                user_id: req.userID,
                icon: "add"
            }).save()
            await order.save();
            result['object'] = await order.populate('products').execPopulate();
        } catch (error) {
            console.log("errror890");
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
        let Log = db.model("Log");
        let Discount = db.model("Discount");
        let PromocodeModel = db.model("Promocode");
        let Client = db.model("Client");
        let ClientBonusHistory = db.model("clientBonusHistory");

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
            let discounts = await Discount.find();
            let query = { '_id': req.params.order }
            req.fields['updatedAt'] = new Date()
            var products = req.fields.products
            // req.fields.products = null  ?
            let order = await Order.findOneAndUpdate(query, req.fields)
            let client = await Client.findById(order.client);
            let promocode = await PromocodeModel.findById(req.fields.promoCode);
            await checkAndUpdatePromo(promocode,client);

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
            let status = req.fields.status.replace(/ /g, '').toLowerCase()
            var logVal = {
                type: "order_updated",
                title: "#" + order.code,
                description: "order_changed",
                user: req.userName,
                user_id: req.userID,
                icon: "update"
            }
            if (req.fields.status && Object.keys(req.fields).length == 2){
                logVal.description = "status_changed"
                logVal.valueColor = status
                logVal.value = status
            }
            await new Log(logVal).save()
            await Analytics.updateAnalytics(req, order.createdAt, true)
            //Cashback

            let updated_order = await Order.findById(order._id);
            if(updated_order.status === "Done" && client){
                ///////////////////////////////////////////////////////////////////////////////////////////////////////
                let cashback_model = db.model("Cashback");
                let products_and_quantity = [];
                await updated_order.populate('client').populate('products').execPopulate();

                let promocode = await PromocodeModel.findById(updated_order.promoCode);
                for (const pro_ of updated_order.products) {
                    products_and_quantity.push({
                        id:pro_.product,
                        quantity:pro_.quantity,
                    })
                }
                let result_object = await products_with_discounts(
                    products_and_quantity, // list of product ids $ quant
                    Product,             // Product model
                    promocode,           // promocode object
                    client,              // client object
                    discounts,           // list of discounts
                );

                let cashback_from_order = await calcCashback(result_object.productCurrentPrice,cashback_model);
                updated_order.earnedPoints = parseFloat(cashback_from_order) || 0;
                await updated_order.save();
                //////////////////////////////////////////////////////////////////////////////////////////////////
                client.points = (parseFloat(client.points)+parseFloat(cashback_from_order)).toFixed(2);
                await client.save();
                if(parseFloat(cashback_from_order)>0){
                    await new ClientBonusHistory({
                        client: client._id,
                        points: cashback_from_order,
                        source: 'Points received order #'+updated_order.code,
                        order: updated_order._id,
                        type: 'received',
                    }).save();
                }

            }
            //

            if(updated_order.status === "Cancelled" && client){
                console.log('CANCELLED');
                //subtract cashback, balance, add cashback used to client, create new bonus history
                //deduct balance
                client.balance = (parseFloat(client.balance)-parseFloat(updated_order.totalPrice)).toFixed(2);
                client.points = (parseFloat(client.points)+parseFloat(updated_order.points)).toFixed(2);
                //add used cashback
                if(parseFloat(updated_order.points)>0){
                    await new ClientBonusHistory({
                        client: client._id,
                        points: updated_order.points,
                        source: 'Spent points refunded order #' + updated_order.code,
                        order: updated_order._id,
                        type: 'received',
                    }).save();
                }


                ////deduct cashback
                //calculate cashback
                
                //duplicate code redo later
                let cashback_model = db.model("Cashback");
                let products_and_quantity = [];
                await updated_order.populate('client').populate('products').execPopulate();

                let promocode = await PromocodeModel.findById(updated_order.promoCode);
                for (const pro_ of updated_order.products) {
                    products_and_quantity.push({
                        id:pro_.product,
                        quantity:pro_.quantity,
                    })
                }
                let result_object = await products_with_discounts(
                    products_and_quantity, // list of product ids $ quant
                    Product,             // Product model
                    promocode,           // promocode object
                    client,              // client object
                    discounts,           // list of discounts
                );

                let cashback_from_order = await calcCashback(result_object.productCurrentPrice,cashback_model);
                /////////////////////////////////////////////////////////////////////////////////////////////////
                client.points = (parseFloat(client.points)-parseFloat(cashback_from_order)).toFixed(2);
                if(parseFloat(cashback_from_order)>0){
                    await new ClientBonusHistory({
                        client: client._id,
                        points: cashback_from_order,
                        source: 'Points cancelled order #' + updated_order.code,
                        order: updated_order._id,
                        type: 'deducted',
                    }).save();
                }


                await client.save({ validateBeforeSave: false });
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
        let Log = db.model("Log");
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
            let order = await Order.findById(query)
            
            if(order){
                await new Log({
                    type: "order_deleted",
                    title: "#" + order.code,
                    description: "order_by",
                    value: order.client_name,
                    user: req.userName,
                    user_id: req.userID,
                    icon: "delete"
                }).save()
                await Analytics.updateAnalytics(req, order.createdAt, true)
            }
            
            await Order.findByIdAndRemove(query)
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    deleteOrders = async function (req, res) {
        let db = useDB(req.db)
        let Order = db.model("Order");
        let Log = db.model("Log");
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
                let orders = await Order.find(query, 'code')
                
                if (orders.length) {
                    let desc = orders.map(function (elem) {
                        return "#" + elem.code;
                    }).join(", ")
                    await Analytics.updateAnalytics(req, orders[0].createdAt, true)
                    await new Log({
                        type: "orders_deleted",
                        description: desc,
                        user: req.userName,
                        user_id: req.userID,
                        icon: "delete"
                    }).save()
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
