import {createApp} from 'vue'
import App from './App.vue'
import {createStore} from "vuex";
import 'slick-carousel/slick/slick';
import ZoomOnHover from 'vue-zoom-on-hover';
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
const store = createStore({

    actions:{
        getCategories:async function(ctx){
          await ax.get('http://localhost:8080/api/getCategories')
                .then((res)=>{
                    ctx.commit('updateCategory', res.data.objects)
                })
        },
        addCategory: async function( ctx, data){
           await ax.post('http://localhost:8080/api/addCategory',data)
                .then((response)=>{
                    console.log('Success ', response.data.object)
                    console.log(ctx)

                })
                .catch((error)=>{
                    console.log("Error"+error)
                })
        },
        addToCart: function({commit}, product){
            commit('addToCart', product)
        },
        getDetail: function(ctx){
            ctx.commit('changeDetail', JSON.parse(localStorage.getItem('detail')))
        },
        deleteFromCart: function(ctx,id){
            ctx.commit('deleteFromCart',id)
        }
    },
    state () {
        return {
            listCategory:[
                {id:1, name:''},
            ],
            catalog:[
                {id:1, name:'Air Forces ', count: 1, discount: '30%', code:'1617W11F', price:23, category:'shoes',image: [
                        'https://n.nordstrommedia.com/id/sr3/6766217f-3a04-4af3-8e89-82f05bc4d1f3.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838',
                        'https://n2.sdlcdn.com/imgs/h/m/c/large/Nike-AIR-FORCE-1-White-SDL968002180-1-a6803.jpeg',
                        'https://www.cdiscount.com/pdt2/9/6/2/1/700x700/mp29694962/rw/baskets-casual-pour-hommes-de-la-mode-hiver.jpg',
                        'https://kickz.akamaized.net/se/media/images/p/600/nike-air_force_1_07-WHITE_WHITE-1.jpg',
                        'https://www.babyshop.com/images/489630/open_graph.jpg',
                        'https://img01.ztat.net/article/spp-media-p1/d9f1aedd837939cc95686168fa2ba2e0/4c173933bbc841c9b1106071a3fdde9e.jpg?imwidth=762&filter=packshot'
                    ]},
                {id:2, name:'Nike Air Max',count:1, discount: '50%', code:'1617W11F', price:467,category:'shoes',image:  [
                        'https://suprehero.kg/wp-content/uploads/2021/02/nike-air-max-270-react-travis-scott-2-1000.png',
                        'https://static-sl.insales.ru/images/products/1/528/364225040/Travis_Scott_x_Nike_Air_Max_270_React_%D0%BA%D1%83%D0%BF%D0%B8%D1%82%D1%8C_-.jpg',
                        'https://step-man.com/wp-content/uploads/2020/05/Travis-Scott-x-Nike-Air-Max-270-React-Cactus-Trails-for-sale.jpg',
                        'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F03%2Ftravis-scott-nike-air-max-270-react-release-date-ct2864-200-info-001.jpg',
                        'https://i.pinimg.com/originals/45/5c/ae/455cae7b1f3255eeedc6e1bebbba7857.png'

                    ]},
                {id:3, name:'Macks', count:1, discount:  '21%', code:'1617W11F', price:12,category:'clothes',image:  [
                        'https://accessories.tvsmotor.com/images/premium-acc/T-shirts-Red-1.jpg',
                        'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2',
                        'https://cdn.shopify.com/s/files/1/2143/3217/products/500_946a22ef-e740-40ad-8c96-ba7e6ca15f87_1024x1024.png?v=1617646131',
                        'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2',
                        'https://cdn.shopify.com/s/files/1/2143/3217/products/500_946a22ef-e740-40ad-8c96-ba7e6ca15f87_1024x1024.png?v=1617646131',
                        'https://accessories.tvsmotor.com/images/premium-acc/T-shirts-Red-1.jpg',
                        'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2'
                    ]},
                {id:4, name:'Alexander msqween', count:1, discount: '70%', code:'1617W11F', price:15,category:'clothes',image: [
                        'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2',
                        'https://cdn.shopify.com/s/files/1/2143/3217/products/500_946a22ef-e740-40ad-8c96-ba7e6ca15f87_1024x1024.png?v=1617646131',
                        'https://accessories.tvsmotor.com/images/premium-acc/T-shirts-Red-1.jpg',
                        'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2',
                        'https://cdn.shopify.com/s/files/1/2143/3217/products/500_946a22ef-e740-40ad-8c96-ba7e6ca15f87_1024x1024.png?v=1617646131',
                        'https://accessories.tvsmotor.com/images/premium-acc/T-shirts-Red-1.jpg',
                        'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2'
                    ]},
                {id:5, name:'T-shirt',count:1, code:'1617W11F',discount: '100%', price:456,category:'clothes',image:  [
                        'https://accessories.tvsmotor.com/images/premium-acc/T-shirts-Red-1.jpg',
                        'https://cdn.shopify.com/s/files/1/2143/3217/products/500_946a22ef-e740-40ad-8c96-ba7e6ca15f87_1024x1024.png?v=1617646131',
                        'https://accessories.tvsmotor.com/images/premium-acc/T-shirts-Red-1.jpg',
                        'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2',
                        'https://cdn.shopify.com/s/files/1/2143/3217/products/500_946a22ef-e740-40ad-8c96-ba7e6ca15f87_1024x1024.png?v=1617646131',
                        'https://accessories.tvsmotor.com/images/premium-acc/T-shirts-Red-1.jpg',
                        'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2'
                    ] },
            ],
            shoppingCart:[],
            productDetail: '',
            countOrders: 0
        }
    },
    mutations:{
        updateCategory:(state, listCategory)=>{
            state.listCategory = listCategory
            state.listCategory.unshift({id:1, name:''})
        },
        changeDetail(state,detail) {
            state.productDetail = detail
        },
        addToCart(state, product) {
            if(state.shoppingCart.includes(product)){
                return  Swal.fire({
                    title:'Warning',
                    text:"You already added this product to your cart",
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
            else{
                Swal.fire({
                    timer:1500,
                    title:'Added to cart',
                    text:"You have added this product to your cart",
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
                state.countOrders+=1

                return   state.shoppingCart.push(product)

            }



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
                showClass: {
                    popup: 'animate__animated animate__zoomIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__zoomOut'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    state.shoppingCart = state.shoppingCart.filter((item)=>item.id !== id)
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
                        showClass:{
                            popup: 'animate__animated animate__zoomIn'
                        }}
                    )}
            })

        }
    },
    getters:{
        listCategory(state){
            return state.listCategory
        },
        catalog(state){
            return state.catalog
        },
        productDetail(state){
            return state.productDetail
        },
        shoppingCart(state){
            return state.shoppingCart
        },
        countOrders(state){
            return state.countOrders
        }
    }
})



const app = createApp(App)
app.use(router)
app.use(store)
app.use(ZoomOnHover)
let token = localStorage.getItem('token')

const ax = axios.create({
    timeout: 1000,
    proxy: {
        host: 'localhost',
        port: 8080
    },
    headers: {
        'x-access-token': token,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
ax.defaults.headers.common['Authorization'] = 'Bearer'+ token
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$lightpick = Lightpick;
app.config.globalProperties.$ = $
app.config.globalProperties.axios = ax
app.config.globalProperties.$api = "http://localhost:8080/api";


app.config.globalProperties.scrollToBottom = function(obj){
    $("#"+obj).scrollTop(1000000)
}

app.config.globalProperties.url = function (main, id = null, search = null) {
    let additional = '/'
    if (id) {
        additional += id + '/'
    }
    if (search) {
        additional += '?' + search[0] + '=' + search[1]
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

