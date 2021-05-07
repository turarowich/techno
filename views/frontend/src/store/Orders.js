import Swal from "sweetalert2";
export const OrdersModule = {
    namespaced: true,

    state: {
        shoppingCart:[],
        countOrders: 0,
        totalPrice: 0,
        getProduct: {},
    },

    // Mutations are functions that effect the STATE.
    mutations: {
        getDetail(state, product){
            state.getProduct = product
        },
        addToCart(state, product) {
            const index = state.shoppingCart.findIndex(item=>item._id === product._id)
            if(index === -1){
                state.shoppingCart.push(product)
                state.countOrders+=1;
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
                   state.shoppingCart[index].quantity +=1;
                }
            },
        totalPrice(state,totalPrice){
            state.totalPrice = totalPrice
        },
        deleteFromCart(state, id) {
            Swal.fire({
                showConfirmButton: true,
                html: 'Are you sure to remove this <br>product',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                buttonsStyling:false,
                customClass:{
                    popup: 'sweet-delete',
                    confirmButton: 'confirm-btn',
                    cancelButton:'cancel-btn',
                    actions:'btn-group',
                    content:'content-sweet',
                    closeButton:'close-btn'

                },

            }).then((result) => {
                if (result.isConfirmed) {
                    state.shoppingCart = state.shoppingCart.filter((item)=>item.id !== id)
                    state.countOrders -= 1;
                    Swal.fire({
                        timer:1500,
                        title:'Removed',
                        text:"You have removed this product from your cart",
                        showConfirmButton:false,
                        position: 'top-right',
                        customClass:{
                            popup:'success-popup information-popup',
                            content:'success-content',
                            title:'success-title',
                            header:'success-header',
                            image:'success-img'
                        },
                     }
                    )}
            })

        },
        countOrders(state){
            state.countOrders = 0;
        }
    },

    // Actions are functions that you call throughout your application that call mutations.
    actions: {
        getDetail: function({commit},product){
            commit('getDetail' ,product)
        },
        addToCart: function({commit}, product){
            commit('addToCart', product)
        },
        deleteFromCart: function({commit,dispatch},id){
            commit('deleteFromCart',id)
            dispatch('totalPrice')
        },
        totalPrice:function({commit,state}){
            var total = 0
            for ( var i = 0, _len = state.shoppingCart.length; i < _len; i++ ) {
                total += state.shoppingCart[i]['count']*state.shoppingCart[i]['price']
            }
            commit('totalPrice',total)
        },
        countOrders: function({commit}){
            commit('countOrders')
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
            return state.countOrders
        },
        totalPrice(state){
            return state.totalPrice
        },
    },
}