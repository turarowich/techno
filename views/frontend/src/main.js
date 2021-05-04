import {createApp} from 'vue'
import App from './App.vue'
import 'slick-carousel/slick/slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import 'ion-rangeslider/js/ion.rangeSlider';
import 'ion-rangeslider/css/ion.rangeSlider.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'select2/dist/css/select2.css'
import 'select2/dist/js/select2'
import './assets/css/main.css'
import 'sweetalert2/dist/sweetalert2.css';
import 'lightpick/css/lightpick.css'
import 'animate.css'
import router from '@/router/router'
import Swal from "sweetalert2";
import $ from 'jquery';
import moment from 'moment';
import Lightpick from 'lightpick'
import axios from "axios";
import store from './store';
import 'dropzone/dist/dropzone'
import 'dropzone/dist/dropzone.css'

const store = createStore({

    actions:{
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
    state () {
        return {
            shoppingCart:[],
            countOrders: 0,
            totalPrice: 0,
            getProduct: {},
        }
    },

    mutations:{
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

    }
})



const app = createApp(App)
app.use(router);
app.use(store);
let token = localStorage.getItem('token')

const ax = axios.create({
    timeout: 1000,
    proxy: {
        host: 'localhost',
        port: 8443
    },
});
ax.defaults.headers.common['Authorization'] = 'Bearer '+ token
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$lightpick = Lightpick;
app.config.globalProperties.$ = $
app.config.globalProperties.axios = ax
app.config.globalProperties.$api = process.env.VUE_APP_API_URL;
app.config.globalProperties.$server = process.env.VUE_APP_SERVER_URL;

app.config.globalProperties.scrollToBottom = function(obj){
    $("#"+obj).scrollTop(1000000)
}
var home_url = ['login', 'register', 'loginClient', 'registerClient']

app.config.globalProperties.changeToken = function () {
    this.axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token')
    console.log(this.axios.defaults.headers)
}
app.config.globalProperties.url = function (main, id = null, search = null) {
    let additional = '/'
    if (id) {
        additional += id + '/'
    }
    if (search) {
        additional += '?' + search[0] + '=' + search[1]
    }
    console.log(process.env.NODE_ENV, process.env.VUE_APP_API_URL)
    if (home_url.includes(main)){
        return this.$server + '/' + main + additional
    }
    return this.$api + '/' + main + additional
    
}
app.config.globalProperties.formToJson = function (formData) {
    let obj = {}
    formData.find('.alert-danger').remove()
    formData.serializeArray().map(function (v) {
        if (v.name.includes('[]')) {
            let new_obj = {}
            let single = v.name.slice(0, -3)
            let multiple = v.name.slice(0, -2)
            if (!obj[multiple]) {
                obj[multiple] = []
            }
            new_obj[single] = v.value
            obj[multiple].push(new_obj)
        } else {
            obj[v.name] = v.value
        }
    })
    return obj
}
app.config.globalProperties.clearForm = function (formData) {
    $(formData).find(':radio, :checkbox').removeAttr('checked').end()
        .find('textarea, :text, select').val('')
}
app.config.globalProperties.$successAlert = function(text){
    Swal.fire({
            title:'Success',
            timer:1500,
            text:text,
            showConfirmButton:false,
            position: 'top-right',
            customClass:{
                popup:'success-popup',
                content:'success-content',
                title:'success-title',
                header:'success-header',
                image:'success-img'
            },
            showClass:{
                popup: 'animate__animated animate__zoomIn'
            }

        }
    )
}
app.config.globalProperties.$warningAlert = function (text){
    Swal.fire({
            title:'Warning',
            text:text,
            timer:1500,
            showConfirmButton:false,
            position: 'top-right',
            customClass:{
                popup:'success-popup warning-popup',
                content:'success-content',
                title:'success-title',
                header:'success-header',
                image:'success-img'
            },
            showClass:{
                popup: 'animate__animated animate__zoomIn'
            }
        } )
}
app.config.globalProperties.$informationAlert = function(text){
    Swal.fire({
            timer:1500,
            title:'Information',
            text:text,
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
        }
    )
}




app.mount('#app')

