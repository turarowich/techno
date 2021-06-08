import Swal from "sweetalert2";
export const OrdersModule = {
    namespaced: true,
    state: {
        shoppingCart:[],
        countOrders: 0,
        totalPrice: 0,
        getProduct: {},
        promocode:null,
    },
    // Mutations are functions that effect the STATE.
    mutations: {
        getDetail(state, product){
            state.getProduct = product
        },
        addToCart(state, order) {
            let index = state.shoppingCart.findIndex(x => x.product._id === order.product._id);
            if(index === -1){
                state.shoppingCart.push(order)
                Swal.fire({
                    timer:1500,
                    title:'Added to cart',
                    text:"You have added this product to basket",
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
                state.shoppingCart[index].quantity +=1;
            }
        },
        removeFromBasket(state, id) {
            let index = state.shoppingCart.findIndex(x => x.product._id === id);
            if(index !== -1){
                state.shoppingCart.splice(index, 1);
            }

            console.log(state.shoppingCart);
        },

        increaseQuantity(state, id){
            let index = state.shoppingCart.findIndex(x => x.product._id === id);
            if(index !== -1){
                state.shoppingCart[index].quantity +=1;
                let item = state.shoppingCart[index];
                let sum = (item.product.price * item.quantity)-(item.product.price * item.quantity*(item.discount_percent/100))-(item.discount_sum);
                if(sum<0){
                    state.shoppingCart[index].current_price= 0;
                }else{
                    state.shoppingCart[index].current_price =parseFloat(sum).toFixed(2);
                }
            }
        },
        decreaseQuantity(state, id){
            let index = state.shoppingCart.findIndex(x => x.product._id === id);
            if(index !== -1){
                if(state.shoppingCart[index].quantity>=1){
                    state.shoppingCart[index].quantity -=1;
                    let item = state.shoppingCart[index];
                    let sum = (item.product.price * item.quantity)-(item.product.price * item.quantity*(item.discount_percent/100))-(item.discount_sum);
                    if(sum<0){
                        state.shoppingCart[index].current_price= 0;
                    }else{
                        state.shoppingCart[index].current_price =parseFloat(sum).toFixed(2);
                    }

                }
            }
        },
        // setPromocodeToAll(state,promocode){
        //   state.shoppingCart.forEach(function (item){
        //       item.promocode = promocode.code;
        //       item.discount_percent = promocode.percent;
        //       item.discount_sum = promocode.fixed_sum;
        //
        //       let sum = (item.product.price * item.quantity)-(item.product.price * item.quantity*(item.discount_percent/100))-(item.discount_sum);
        //       if(sum<0){
        //           item.current_price= 0;
        //       }else{
        //           item.current_price =parseFloat(sum).toFixed(2);
        //       }
        //   })
        // },
        setPromocodeForItems(state,object){
            //set promocode for basket
            state.promocode=object.promocode;
            state.shoppingCart.forEach(function (item){
                if(object.ids.includes(item.product._id)){
                    item.promocode = object.promocode.name;
                    item.discount_percent = object.promocode.percent;
                    item.discount_sum = object.promocode.fixed_sum;
                    let sum = (item.product.price * item.quantity)-(item.product.price * item.quantity*(item.discount_percent/100))-(item.discount_sum);
                    if(sum<0){
                        item.current_price= 0;
                    }else{
                        item.current_price =parseFloat(sum).toFixed(2);
                    }
                }
            })
        },
        unsetPromocode(state){
            //unset promocode for basket
            state.shoppingCart.forEach(function (item){
                item.promocode = '';
                item.discount_percent = 0;
                item.discount_sum = 0;
                item.current_price = item.product.price;
            })
        },
    },

    // Actions are functions that you call throughout your application that call mutations.
    actions: {
        getDetail: function({commit},product){
            commit('getDetail' ,product)
        },
        addToCart: function({commit}, product){
            commit('addToCart', product)
        },
        removeFromBasket: function({commit},id){
            commit('removeFromBasket',id)
        },
        increaseQuantity: function({commit},id){
            commit('increaseQuantity',id)
        },
        decreaseQuantity: function({commit},id){
            commit('decreaseQuantity',id)
        },
        // setPromocodeToAll: function({commit},promocode){
        //     commit('setPromocodeToAll',promocode)
        // },
        setPromocodeForItems: function({commit},object){
            commit('setPromocodeForItems',object)
        },
        unsetPromocode: function({commit}){
            commit('unsetPromocode')
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
            let sum =state.shoppingCart.map(item=>(item.product.price * item.quantity)-(item.product.price * item.quantity*(item.discount_percent/100))-(item.discount_sum)).reduce(function(acc, val) { return acc + val; }, 0)
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
    },
}