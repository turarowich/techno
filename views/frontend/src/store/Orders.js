import Swal from "sweetalert2";
export const OrdersModule = {
    namespaced: true,
    state: {
        shoppingCart:[],
        countOrders: 0,
        //with discounts
        totalPrice: 0,
        totalDiscounts: 0,
        deliveryCost: 0,
        usePointsStatus:false,
        usedPoints:0,
        selectedDelivery_Type:'delivery',
        selectedDeliveryType:{
            type:'delivery',
            object:{
              price:0,
            },
        },
        getProduct: {},
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
                type:'delivery',
                object:{
                    price:0,
                },
            },
            state.getProduct={},
            state.promocode=null
        },
        getDetail(state, product){
            state.getProduct = product
        },
        setSelectedDeliveryType(state, obj){
            state.selectedDeliveryType = obj
        },
        setSelectedDelivery_Type(state, type){
            state.selectedDelivery_Type = type
        },
        setAddress(state, str){
            state.address = str
        },
        setDeliveryCost(state, cost){
            state.deliveryCost = cost
        },
        setUsePointsStatus(state, points){
            state.usePointsStatus = points
        },
        setUsedPoints(state, points){
            state.usedPoints = points
        },
        addToCart(state, order) {
            let client_status_discount = order.client_status_discount || 0;
            console.log(client_status_discount,"add-------------->");
            state.shoppingCart.push(order)
        },
        removeFromBasket(state, id) {
            let index = state.shoppingCart.findIndex(x => x.product._id === id);
            if(index !== -1){
                state.shoppingCart.splice(index, 1);
            }
        },

        increaseQuantity(state, obj){
            let id = obj.id;
            let client_status_discount = obj.client_status_discount || 0;
            console.log(client_status_discount,"increase-------------->");
            let index = state.shoppingCart.findIndex(x => x.product._id === id);
            if(index !== -1){
                state.shoppingCart[index].quantity +=1;
                let item = state.shoppingCart[index];
                //items discount, promo discount, clients personal discount

                //if promocode discount;
                let sum = (item.product.price * item.quantity)-(item.product.price * item.quantity*(item.discount_percent/100))-(item.discount_sum);
                state.shoppingCart[index].discount_percent_sum = parseFloat(item.product.price * item.quantity*(item.discount_percent/100)).toFixed(2);

                //if item already has a discount;
                if(item.isDiscounted){
                    let discount_sum_per_item= item.product.price -item.product.promoPrice ;
                    discount_sum_per_item= discount_sum_per_item>0? discount_sum_per_item:0 ;
                    sum = (item.product.price * item.quantity)-(item.product.price * item.quantity*(item.discount_percent/100))-(discount_sum_per_item * item.quantity);
                    state.shoppingCart[index].discount_sum = discount_sum_per_item * item.quantity;
                }
                //if item does not have its own discount or promo than the clients discount will apply;
                if(!item.isDiscounted && item.promocode ==='' && item.discount_percent==0 && item.discount_sum==0){
                    console.log('clients');
                    sum = (item.product.price * item.quantity)-(item.product.price * item.quantity*(client_status_discount/100));
                    state.shoppingCart[index].discount_percent_sum = parseFloat(item.product.price * item.quantity*(client_status_discount/100)).toFixed(2);
                }

                if(sum<0){
                    state.shoppingCart[index].current_price= 0;
                }else{
                    state.shoppingCart[index].current_price =parseFloat(sum).toFixed(2);
                }
            }
        },
        decreaseQuantity(state, obj){
            let id = obj.id;
            let client_status_discount = obj.client_status_discount || 0;
            console.log(client_status_discount);
            let index = state.shoppingCart.findIndex(x => x.product._id === id);
            if(index !== -1){
                if(state.shoppingCart[index].quantity>=1){
                    state.shoppingCart[index].quantity -=1;
                    let item = state.shoppingCart[index];
                    let sum = (item.product.price * item.quantity)-(item.product.price * item.quantity*(item.discount_percent/100))-(item.discount_sum);
                    state.shoppingCart[index].discount_percent_sum = parseFloat(item.product.price * item.quantity*(item.discount_percent/100)).toFixed(2);
                    if(item.isDiscounted){
                        let discount_sum_per_item= item.product.price -item.product.promoPrice ;
                        discount_sum_per_item= discount_sum_per_item>0? discount_sum_per_item:0 ;
                        sum = (item.product.price * item.quantity)-(item.product.price * item.quantity*(item.discount_percent/100))-(discount_sum_per_item * item.quantity);
                        state.shoppingCart[index].discount_sum = discount_sum_per_item * item.quantity;
                    }

                    if(!item.isDiscounted && item.promocode ==='' && item.discount_percent==0 && item.discount_sum==0){
                        console.log('clients');
                        sum = (item.product.price * item.quantity)-(item.product.price * item.quantity*(client_status_discount/100));
                        state.shoppingCart[index].discount_percent_sum = parseFloat(item.product.price * item.quantity*(client_status_discount/100)).toFixed(2);
                    }

                    if(sum<0){
                        state.shoppingCart[index].current_price= 0;
                    }else{
                        state.shoppingCart[index].current_price =parseFloat(sum).toFixed(2);
                    }

                }
            }
        },
        setPromocodeForItems(state,object){
            let client_status_discount = object.client_status_discount || 0;
            console.log(client_status_discount);
            state.promocode=object.promocode;
            state.shoppingCart.forEach(function (item){
                if(object.ids.includes(item.product._id) && !item.isDiscounted){
                    item.promocode = object.promocode.name;
                    item.discount_percent = object.promocode.discount;
                    item.discount_sum = object.promocode.fixed_sum;
                    let sum = (item.product.price * item.quantity)-(item.product.price * item.quantity*(item.discount_percent/100))-(item.discount_sum);
                    item.discount_percent_sum = parseFloat(item.product.price * item.quantity*(item.discount_percent/100)).toFixed(2);

                    if(sum<0){
                        item.current_price= 0;
                    }else{
                        item.current_price =parseFloat(sum).toFixed(2);
                    }
                }
            })
        },
        unsetPromocode(state,client_status_discount){
            //unset promocode for basket
            let client_status_discount_unset = client_status_discount || 0;
            state.shoppingCart.forEach(function (item){
                if(item.promocode !=''){
                    let sum = (item.product.price * item.quantity);
                    item.promocode = '';
                    item.discount_percent = 0;
                    item.discount_percent_sum = 0;
                    item.discount_sum = 0;

                    if(!item.isDiscounted && item.promocode ==='' && item.discount_percent==0 && item.discount_sum==0){
                        sum = (item.product.price * item.quantity)-(item.product.price * item.quantity*(client_status_discount_unset/100));
                        item.discount_percent_sum = parseFloat(item.product.price * item.quantity*(client_status_discount_unset/100)).toFixed(2);
                    }
                    item.current_price = parseFloat(sum).toFixed(2);
                }

            })
        },
    },

    // Actions are functions that you call throughout your application that call mutations.
    actions: {
        clearAll:function ({commit}){
            commit('clearAll')
        },
        getDetail: function({commit},product){
            commit('getDetail' ,product)
        },
        setSelectedDeliveryType: function({commit},object){
            commit('setSelectedDeliveryType' ,object)
        },
        setSelectedDelivery_Type: function({commit},type){
            commit('setSelectedDelivery_Type' ,type)
        },
        setAddress: function({commit},str){
            commit('setAddress' ,str)
        },
        setDeliveryCost: function({commit},cost){
            commit('setDeliveryCost' ,cost)
        },
        setUsePointsStatus:function ({commit},status){
            commit('setUsePointsStatus' ,status)
        },
        setUsedPoints:function ({commit},points){
            commit('setUsedPoints' ,points)
        },
        addToCart: function({commit,state,dispatch,rootState}, order){
            //add new or increase quantity
            let index = state.shoppingCart.findIndex(x => x.product._id === order.product._id)
            let client_status_discount = rootState.Client.userDiscountStatus.discount_percentage;
            let obj = {
                id:order.product._id,
                client_status_discount:client_status_discount,
            }
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
                Swal.fire({
                    timer:1500,
                    title:'Added to cart',
                    text:"+++",
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
                dispatch('increaseQuantity', obj);
            }
        },
        removeFromBasket: function({commit},id){
            commit('removeFromBasket',id)
        },
        increaseQuantity: function({commit,rootState},id){
            let client_status_discount = rootState.Client.userDiscountStatus.discount_percentage;
            let obj = {
                id:id,
                client_status_discount:client_status_discount,
            }
            commit('increaseQuantity',obj)
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
            return state.getProduct
        },
        shoppingCart(state){
            return state.shoppingCart
        },
        countOrders(state){
            return state.shoppingCart.length
        },
        getTotalPrice(state){
            let sum =state.shoppingCart.map(item=>(item.product.price * item.quantity)-(item.discount_percent_sum)-(item.discount_sum)).reduce(function(acc, val) { return acc + val; }, 0)

            if(sum<0){
                return 0;
            }
            return parseFloat(sum).toFixed(2);
        },
        getTotalDiscounts(state){
            let sum =state.shoppingCart.map(item=>(item.product.price * item.quantity)-(item.current_price)).reduce(function(acc, val) { return acc + val; }, 0)
            if(sum<0){
                return 0;
            }
            return parseFloat(sum).toFixed(2);
        },
        getTotalPriceFull(state){
            let sum =state.shoppingCart.map(item=>(item.product.price * item.quantity)).reduce(function(acc, val) { return acc + val; }, 0)
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
            let sum =state.shoppingCart.map(item=>(item.product.price * item.quantity)-(item.discount_percent_sum)-(item.discount_sum)).reduce(function(acc, val) { return acc + val; }, 0)
            if(sum<0){
                return 0;
            }
            return (parseFloat(sum)+parseFloat(state.deliveryCost)).toFixed(2);
        },
        getFinalSum(state){
            // redo dry
            //includes: discounts
            //          delivery
            //          points
            //total with discount
            let sum =state.shoppingCart.map(item=>(item.product.price * item.quantity)-(item.discount_percent_sum)-(item.discount_sum)).reduce(function(acc, val) { return acc + val; }, 0)
            if(sum<0){
                return 0;
            }
            return (parseFloat(sum)+parseFloat(state.deliveryCost)-parseFloat(state.usedPoints)).toFixed(2);
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
    },
}