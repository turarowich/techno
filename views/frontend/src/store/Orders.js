//discounts priority
//items discount, promo discount, clients personal discount
import Swal from "sweetalert2";

const updateQuantity = function (clientStatusDiscount=0,state,productId,sizeId,updateType){
    let productIndex = state.shoppingCart.findIndex(x => x.product._id === productId)
    if(productIndex===-1){
        return;
    }
    //item = shopping cart item i.e product with quantity and discounts
    let item = state.shoppingCart[productIndex];

    //nonDiscountedPrice = price of the cart item without all the deductions
    let nonDiscountedPrice = 0;
    //currentPrice = the current price of the cart item with all the deductions
    let currentPrice = 0;
    //discountPercentSum = sum of all percentage discounts +
    let discountPercentSum = 0;
    //disountSum = sum of discount as a flat sum/number applies to the whole cart

    //if product has several types
    if(item.product.hasMultipleTypes && sizeId !== null){
        productIndex = state.shoppingCart.findIndex(x => x.product._id === productId
            && x.size._id === sizeId)
        if(productIndex === -1){
            return;
        }
        let sizeIndex = item.product.sizes.findIndex(x => x._id === sizeId)
        let sizeObject = item.product.sizes[sizeIndex];
        currentPrice = parseFloat(sizeObject.price);
    }else{
        currentPrice = parseFloat(item.product.price);
    }

    item = state.shoppingCart[productIndex];
    if(updateType === "increase"){
        item.quantity +=1;
    }else{
        if(item.quantity>=2){
            item.quantity -=1;
        }
    }
    nonDiscountedPrice = currentPrice * item.quantity;
    discountPercentSum = currentPrice * item.quantity*(item.discount_percent/100);
    //discounted price
    currentPrice = nonDiscountedPrice - discountPercentSum;
    // let sum = nonDiscountedPrice-(price * item.quantity*(item.discount_percent/100));
    //sum of discounts
    item.discount_percent_sum = discountPercentSum.toFixed(2);
    //if item already has a discount;
    if(item.isDiscounted){
        let discount_sum_per_item= nonDiscountedPrice - item.product.promoPrice*item.quantity;
        discount_sum_per_item = discount_sum_per_item>0? discount_sum_per_item:0 ;
        currentPrice = (nonDiscountedPrice)-(nonDiscountedPrice*(item.discount_percent/100))-(discount_sum_per_item);
        item.discount_sum = discount_sum_per_item;
    }
    //if item does not have its own discount or promo than the clients discount will apply;
    if(!item.isDiscounted && item.promocode ==='' && item.discount_percent===0 && item.discount_sum===0){
        currentPrice = nonDiscountedPrice-(nonDiscountedPrice*(clientStatusDiscount/100));
        item.discount_percent_sum = parseFloat(nonDiscountedPrice*(clientStatusDiscount/100)).toFixed(2);
    }
    item.current_price = currentPrice<0 ? 0 : parseFloat(currentPrice).toFixed(2);
}

export const OrdersModule = {
    namespaced: true,
    state: {
        size:{
            _id:"",
        },
        version:'',
        company_url: '',
        shoppingCart:[],
        countOrders: 0,
        totalPrice: 0,
        totalDiscounts: 0,
        deliveryCost: 0,
        usePointsStatus:false,
        usedPoints:0,
        selectedDelivery_Type:'delivery',
        selectedDeliveryType:{
            type:'Delivery service',
            object:{
              // price:0,
            },
        },
        guest:{},
        promocode:null,
        address:'',
    },
    // Mutations are functions that effect the STATE.
    mutations: {
        clearAll(state) {
            state.shoppingCart=[],
            state.countOrders= 0,
            state.totalPrice= 0,
            state.totalDiscounts= 0,
            state.deliveryCost= 0,
            state.usedPoints=0,
            state.selectedDeliveryType={
                type:'Delivery service',
                object:{
                    price:0,
                },
            },
            state.guest={},
            state.promocode=null,
            state.version='',
            state.company_url= '',
            state.usePointsStatus=false,
            state.selectedDelivery_Type='delivery',
            state.address=''
        },
        set_company_url(state, url) {
            state.company_url = url;
        },
        set_version(state, version) {
            state.version = version;
        },
        setSelectedDeliveryType(state, obj){
            state.selectedDeliveryType = obj;
        },
        setSelectedDelivery_Type(state, type){
            state.selectedDelivery_Type = type;
        },
        setAddress(state, str){
            state.address = str;
        },
        setDeliveryCost(state, cost){
            state.deliveryCost = cost;
        },
        setUsePointsStatus(state, points){
            state.usePointsStatus = points;
        },
        setUsedPoints(state, points){
            state.usedPoints = points;
        },
        addToCart(state, order) {
            state.shoppingCart.push(order);
        },
        removeFromBasket(state, id) {
            let index = state.shoppingCart.findIndex(x => x.product._id === id);
            if(index !== -1){
                state.shoppingCart.splice(index, 1);
            }
        },
        setGuest(state, obj){
            state.guest = obj
        },
        increaseQuantityType(state, obj){
            updateQuantity(obj.client_status_discount,state,obj.productId,obj.sizeId,"increase");
        },
        increaseQuantity(state, obj){
            updateQuantity(obj.client_status_discount,state,obj.id,null,"increase");
        },
        decreaseQuantityType(state, obj){
            updateQuantity(obj.client_status_discount,state,obj.productId,obj.sizeId,"decrease");
        },
        decreaseQuantity(state, obj){
            updateQuantity(obj.client_status_discount,state,obj.id,null,"decrease");
        },
        setPromocodeForItems(state,object){
            state.promocode=object.promocode;
            state.shoppingCart.forEach(function (item){
                if(object.ids.includes(item.product._id) && !item.isDiscounted){
                    item.promocode = object.promocode.name;
                    item.discount_percent = object.promocode.discount;
                    item.discount_sum = object.promocode.fixed_sum;

                    let currentPrice = 0;

                    if(item.product.hasMultipleTypes && item.size._id){
                        let sizeIndex = item.product.sizes.findIndex(x => x._id === item.size._id)
                        let sizeObject = item.product.sizes[sizeIndex];
                        currentPrice = parseFloat(sizeObject.price);
                    }else{
                        currentPrice = parseFloat(item.product.price);
                    }

                    let sum = (currentPrice * item.quantity)-(currentPrice * item.quantity*(item.discount_percent/100))-(item.discount_sum);
                    item.discount_percent_sum = parseFloat(currentPrice * item.quantity*(item.discount_percent/100)).toFixed(2);

                    item.current_price = sum<0 ? 0 : parseFloat(sum).toFixed(2);
                }
            })
        },
        unsetPromocode(state,client_status_discount){
            //unset promocode for basket
            let client_status_discount_unset = client_status_discount || 0;
            state.shoppingCart.forEach(function (item){
                if(item.promocode !=''){

                    item.promocode = '';
                    item.discount_percent = 0;
                    item.discount_percent_sum = 0;
                    item.discount_sum = 0;
                    let currentPrice = 0;
                    let sum = (currentPrice * item.quantity);
                    if(item.product.hasMultipleTypes && item.size._id){
                        let sizeIndex = item.product.sizes.findIndex(x => x._id === item.size._id)
                        let sizeObject = item.product.sizes[sizeIndex];
                        currentPrice = parseFloat(sizeObject.price);
                    }else{
                        currentPrice = parseFloat(item.product.price);
                    }
                    if(!item.isDiscounted && item.promocode ==='' && item.discount_percent==0 && item.discount_sum==0){
                        sum = (currentPrice * item.quantity)-(currentPrice * item.quantity*(client_status_discount_unset/100));
                        item.discount_percent_sum = parseFloat(currentPrice * item.quantity*(client_status_discount_unset/100)).toFixed(2);
                    }
                    item.current_price = parseFloat(sum).toFixed(2);
                }
            })
        },
    },

    // Actions are functions that you call throughout your application that call mutations.
    actions: {
        clearAll:function ({commit}){
            commit('clearAll');
        },
        setCompany_url_basket: function({commit},url){
            commit('set_company_url' ,url);
        },
        setVersion: function({commit},version){
            commit('set_version' ,version);
        },
        getDetail: function({commit},product){
            commit('getDetail' ,product);
        },
        setSelectedDeliveryType: function({commit},object){
            commit('setSelectedDeliveryType' ,object);
        },
        setSelectedDelivery_Type: function({commit},type){
            commit('setSelectedDelivery_Type' ,type);
        },
        setAddress: function({commit},str){
            commit('setAddress' ,str);
        },
        setDeliveryCost: function({commit},cost){
            commit('setDeliveryCost' ,cost);
        },
        setUsePointsStatus:function ({commit},status){
            commit('setUsePointsStatus' ,status);
        },
        setUsedPoints:function ({commit},points){
            commit('setUsedPoints' ,points);
        },
        addToCart: function({commit,state,dispatch,rootState}, order){
            //add new or increase quantity
            //check product size
            let client_status_discount = rootState.Client.userDiscountStatus.discount_percentage;
            if(order.product.hasMultipleTypes && order.size._id !== undefined){
                console.log("SIZE ADD")
                //Has sizes, multiple types of the same product
                //check for same size same product
                let sizeIndex = state.shoppingCart.findIndex(x => x.product._id === order.product._id
                    && x.size._id === order.size._id);
                console.log("SIZE ADD=",sizeIndex,order.size._id)
                if(sizeIndex === -1){
                    //add new
                    order.client_status_discount = client_status_discount;
                    commit('addToCart', order);
                    Swal.fire({
                        timer:1500,
                        title:'Added to cart',
                        text:"Product is added to the basket",
                        showConfirmButton:false,
                        position: 'top-right',
                        customClass:{
                            popup:'success-popup information-popup',
                            content:'success-content',
                            title:'success-title',
                            header:'success-header',
                            image:'success-img'
                        },
                        showClass:{
                            popup: 'animate__animated animate__zoomIn'
                        }
                    })
                }else{
                    //increase quantity
                    console.log('INCREASE');
                    if(state.shoppingCart[sizeIndex].product.quantity>state.shoppingCart[sizeIndex].quantity){
                        dispatch('increaseQuantityType', {productId:order.product._id,sizeId:order.size._id});
                    }else{
                        Swal.fire({
                            timer:1500,
                            title:'Cant add',
                            text:"Not enought in stock",
                            showConfirmButton:false,
                            position: 'top-right',
                            customClass:{
                                popup:'success-popup information-popup',
                                content:'success-content',
                                title:'success-title',
                                header:'success-header',
                                image:'success-img'
                            },
                            showClass:{
                                popup: 'animate__animated animate__zoomIn'
                            }
                        })
                    }
                }
            }else{
                //Only one product type
                let index = state.shoppingCart.findIndex(x => x.product._id === order.product._id)
                if(index === -1){
                    //add new
                    order.client_status_discount = client_status_discount;
                    commit('addToCart', order);
                    Swal.fire({
                        timer:1500,
                        title:'Added to cart',
                        text:"Product is added to the basket",
                        showConfirmButton:false,
                        position: 'top-right',
                        customClass:{
                            popup:'success-popup information-popup',
                            content:'success-content',
                            title:'success-title',
                            header:'success-header',
                            image:'success-img'
                        },
                        showClass:{
                            popup: 'animate__animated animate__zoomIn'
                        }
                    })
                }
                else{
                    //increase quantity
                    console.log('INCREASE');
                    if(state.shoppingCart[index].product.quantity>state.shoppingCart[index].quantity){
                        dispatch('increaseQuantity',order.product._id);
                    }else{
                        Swal.fire({
                            timer:1500,
                            title:'Cant add',
                            text:"Not enought in stock",
                            showConfirmButton:false,
                            position: 'top-right',
                            customClass:{
                                popup:'success-popup information-popup',
                                content:'success-content',
                                title:'success-title',
                                header:'success-header',
                                image:'success-img'
                            },
                            showClass:{
                                popup: 'animate__animated animate__zoomIn'
                            }
                        })
                    }
                }

            }
        },
        removeFromBasket: function({commit},id){
            commit('removeFromBasket',id)
        },
        setGuest: function({commit},obj){
            commit('setGuest',obj)
        },
        increaseQuantityType: function({commit,rootState},{productId,sizeId}){
            console.log("ACTION INCREASE TYPE",productId,sizeId)
            let client_status_discount = rootState.Client.userDiscountStatus.discount_percentage;
            let obj = {
                productId,
                sizeId,
                client_status_discount,
            }
            commit('increaseQuantityType',obj)
        },
        increaseQuantity: function({commit,rootState},id){
            let client_status_discount = rootState.Client.userDiscountStatus.discount_percentage;
            let obj = {
                id:id,
                client_status_discount:client_status_discount,
            }
            commit('increaseQuantity',obj)
        },
        decreaseQuantityType: function({commit,rootState},{productId,sizeId}){
            let client_status_discount = rootState.Client.userDiscountStatus.discount_percentage;
            let obj = {
                productId,
                sizeId,
                client_status_discount,
            }
            commit('decreaseQuantityType',obj)
        },
        decreaseQuantity: function({commit,rootState},id){
            let client_status_discount = rootState.Client.userDiscountStatus.discount_percentage;
            let obj = {
                id:id,
                client_status_discount:client_status_discount,
            }
            commit('decreaseQuantity',obj)
        },
        setPromocodeForItems: function({commit,rootState},object){
            let client_status_discount = rootState.Client.userDiscountStatus.discount_percentage;
            object.client_status_discount=client_status_discount,
            commit('setPromocodeForItems',object)
        },
        unsetPromocode: function({commit,rootState}){
            let client_status_discount = rootState.Client.userDiscountStatus.discount_percentage;
            commit('unsetPromocode',client_status_discount);
        },
    },

    getters:{
        getProduct(state){
            console.log(state.shoppingCart,"shoppingCart");
            return id => state.shoppingCart.filter(el =>{
                return el.product._id === id;
            });
        },
        shoppingCart(state){
            return state.shoppingCart
        },
        countOrders(state){
            return state.shoppingCart.length
        },
        getTotalPrice(state){
            //let sum =state.shoppingCart.map(item=>(item.product.price * item.quantity)-(item.discount_percent_sum)-(item.discount_sum)).reduce(function(acc, val) { return acc + val; }, 0)
            let sum =state.shoppingCart.map(item=>parseFloat(item.current_price)).reduce(function(acc, val) { return acc + val; }, 0)

            if(sum<0){
                return 0;
            }
            return sum.toFixed(2);
        },
        getTotalDiscounts(state){
            // let sum =state.shoppingCart.map(item=>(item.product.price * item.quantity)-(item.current_price)).reduce(function(acc, val) { return acc + val; }, 0)
            let sum =state.shoppingCart.map(item=>item.discount_percent_sum+item.discount_sum).reduce(function(acc, val) { return acc + val; }, 0)
            if(sum<0){
                return 0;
            }
            return parseFloat(sum).toFixed(2);
        },
        getTotalPriceFull(state){
            // let sum =state.shoppingCart.map(item=>(item.product.price * item.quantity)).reduce(function(acc, val) { return acc + val; }, 0)
            let sum =state.shoppingCart.map(item=>(parseFloat(item.current_price)+parseFloat(item.discount_percent_sum)+parseFloat(item.discount_sum))).reduce(function(acc, val) { return acc + val; }, 0)
            return parseFloat(sum).toFixed(2);
        },
        getBasketPromocode(state){
            let promocode = null;
            let items_with_promo =state.shoppingCart.filter(item=>(item.promocode.length!==0));
            if(items_with_promo.length>0){
                promocode = state.promocode;
            }
            return promocode;
        },
        getDeliveryTypeObject(state){
            return state.selectedDeliveryType;
        },
        getDeliveryCost(state){
            return state.deliveryCost;
        },
        getUsePointsStatus(state){
            return state.usePointsStatus;
        },
        getTotalPriceWithDelivery(state){
            // let sum =state.shoppingCart.map(item=>(item.product.price * item.quantity)-(item.discount_percent_sum)-(item.discount_sum)).reduce(function(acc, val) { return acc + val; }, 0)
            let sum =state.shoppingCart.map(item=>parseFloat(item.current_price)).reduce(function(acc, val) { return acc + val; }, 0)
            if(sum<0){
                return 0;
            }
            return (sum+parseFloat(state.deliveryCost)).toFixed(2);
        },
        getFinalSum(state){
            // let sum =state.shoppingCart.map(item=>(item.product.price * item.quantity)-(item.discount_percent_sum)-(item.discount_sum)).reduce(function(acc, val) { return acc + val; }, 0)
            let sum =state.shoppingCart.map(item=>parseFloat(item.current_price)).reduce(function(acc, val) { return acc + val; }, 0)

            if(sum<0){
                return 0;
            }
            return (sum+parseFloat(state.deliveryCost)-parseFloat(state.usedPoints)).toFixed(2);
        },
        getUsedPoints(state){
            return state.usedPoints;
        },
        getPromocode(state){
            return state.promocode;
        },
        getAddress(state){
            return state.address;
        },
        getGuest(state){
            return state.guest;
        },
        getCompany_url_basket(state){
            return state.company_url;
        },
        getVersion(state){
            return state.version;
        },
    },
}