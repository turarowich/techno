import Swal from "sweetalert2";
export const OrdersModule = {
    namespaced: true,
    state: {
        version:'',
        company_url: '',
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
            type:'Delivery service',
            object:{
              // price:0,
            },
        },
        guest:{},
        // getProduct: {},
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
            let client_status_discount = order.client_status_discount || 0;
            console.log(client_status_discount,"add-------------->");
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
        increaseQuantity(state, obj){
            let id = obj.id;
            let client_status_discount = obj.client_status_discount || 0;
            console.log(client_status_discount,"increase-------------->",obj);
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
                    // console.log(sum,"THE SUM clients discount will apply");
                    // console.log(item.product.price,"THE SUM clients discount will apply");
                    // console.log(item.product.price * item.quantity*(client_status_discount/100),"THE SUM clients discount will apply");
                    // console.log(item.product.price,"THE SUM clients discount will apply");
                    // console.log(item.quantity*(client_status_discount/100),"THE SUM clients discount will apply");
                    // console.log(client_status_discount/100,"THE SUM clients discount will apply");
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

                if(state.shoppingCart[index].quantity>=2){
                    //decrease till 1
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
            let index = state.shoppingCart.findIndex(x => x.product._id === order.product._id)
            let client_status_discount = rootState.Client.userDiscountStatus.discount_percentage;
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
        },
        removeFromBasket: function({commit},id){
            commit('removeFromBasket',id)
        },
        setGuest: function({commit},obj){
            commit('setGuest',obj)
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