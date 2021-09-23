import {createApp} from 'vue'
import Vue3SmoothScroll from "vue3-smooth-scroll";
import App from './App.vue'

import 'select2/dist/css/select2.min.css';
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
import 'dropzone/dist/dropzone';
import 'dropzone/dist/dropzone.css';
import io from "socket.io-client";
import messages from "./assets/js/messages";
const app = createApp(App)
app.use(router);
app.use(store);
app.use(Vue3SmoothScroll)
let token = localStorage.getItem('token')

import QRCode from 'qrcode';
app.config.globalProperties.$QRCode = QRCode;

const ax = axios.create({
    timeout: 10000,
    proxy: {
        host: 'localhost',
        port: 8443
    },
});
ax.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    if (error.response.data.auth == false && error.response.data.message == 'Failed to authenticate token.' && window.location.pathname != "/" ) {
        localStorage.clear()
        document.location.href = "/";
    }
    return Promise.reject(error);
});

const socket = io(process.env.VUE_APP_SERVER_URL, {
    extraHeaders: {
        token: localStorage.getItem('token')
    },
    withCredentials: true,
    reconnection: (process.env.VUE_APP_RECONNECTION === 'true'),
})

ax.defaults.headers.common['Authorization'] = 'Bearer '+ token
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$lightpick = Lightpick;
app.config.globalProperties.$ = $
app.config.globalProperties.axios = ax
app.config.globalProperties.$api = process.env.VUE_APP_API_URL;
app.config.globalProperties.$server = process.env.VUE_APP_SERVER_URL;
app.config.globalProperties.format_price = function (sum){parseFloat(sum).toFixed(2)};
app.config.globalProperties.base_url = process.env.VUE_APP_SERVER_URL;
app.config.globalProperties.$callEditUser = function(){
    const eb = document.getElementById('editUser');
    console.log(eb)
}
app.config.globalProperties.checkCatalogStorageLife = function (){
    ///move to router js
    let life = 2;//hours
    let version = new Date();
    let storage_version = this.$store.getters['Orders/getVersion'];
    if(!storage_version || storage_version ===""){
        this.$store.dispatch("Orders/setVersion",version);
        return;
    }
    let diff =  (version- new Date( storage_version))/1000/60/60;//get hours
    if(diff>life){
        //clear basket storage
        this.$store.dispatch("Orders/clearAll");
        //set new version
        this.$store.dispatch("Orders/setVersion",version);
    }else{
        console.log('Not time YET &&&');
    }

};
app.config.globalProperties.replaceTxt = function (txt="", lang=null) {
    let text = txt.split(" ");
    if(!lang){
        lang = "en"
    }
    for(let [index,word] of text.entries()){
        if (messages[lang][word]){
            text[index] = messages[lang][word]
        }
    }
    return text.join(' ')
}
app.config.globalProperties.getClientAuth = function(){
    //return true if catalog client is authen-ed
    //undefined otherwise
    return this.$store.getters['Client/getUserStatus'];
}
app.config.globalProperties.socket = socket
app.config.globalProperties.scrollToBottom = function(obj){
    $("#"+obj).scrollTop(1000000)
}
app.config.globalProperties.getUser = function () {
    return JSON.parse(localStorage.getItem('user'))
}
app.config.globalProperties.isAdmin = function () {
    let user = this.getUser()
    if (user.rate != undefined && user.activeBefore != undefined) {
        return true
    }
    return false
}
app.config.globalProperties.checkAccess = function (access, parametr=null, parametr2 = null) {
    let user = this.getUser()
    if (app.config.globalProperties.isAdmin()){
        return true
    }
    if (!parametr && !parametr2){
        if (user[access]){
            return true
        }
    }else if (user[access] && user[access][parametr] && !parametr2) {
        return true
    } else if (user[access] && user[access][parametr] && user[access][parametr2]) {
        return true
    }
    return false
}
var home_url = [
    'login',
    'register',
    'loginClient',
    'registerClient',
    'getClientProducts',
    'getCatalog',
    'getClientCategories',
    'getCatalogSettings',
    'searchPromocodeByCode',
    'addOrderWeb',
    'getProductWeb',
    'getEarnedPoints',
    'getNewsWeb',
    'getSingleNewsWeb',
    'saveTempoOrder',
    'getTempoOrder',
    'updateTempoOrder',
    'updateProductTempoOrder',
    'removeProductTempoOrder',
    'searchProductWeb',
]
app.config.globalProperties.addNewProperty = function(obj, key, value = "", copy) {
    obj.map(function(object) {
        if (copy) {                                                                                                                                                                                                                                                                                                                                                                                                                                             
            object[key] = object[copy]
        } else {
            object[key] = value
        }
        return object
    })

    return obj
}
app.config.globalProperties.changeToken = function () {
    this.axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token')
    this.socket = io(this.$server,{
        extraHeaders: {
            token: localStorage.getItem('token')
        },
        withCredentials: true,
        reconnection: (process.env.VUE_APP_RECONNECTION === 'true')
    })
}
app.config.globalProperties.img = function (main) {
    return this.$server + '/' + main
}
app.config.globalProperties.url = function (main, id = null, search = null) {
    console.log(main,'main');
    let additional = '/'
    if (id) {
        additional += id + '/'
    }
    if (search) {
        additional += '?' + search[0] + '=' + search[1]
    }
    if (home_url.includes(main)){
        return this.$server + '/' + main + additional
    }
    return this.$api + '/' + main + additional
    
}
app.config.globalProperties.url_home = function (main, id = null, search = null) {
    let additional = '/'
    if (id) {
        additional += id + '/'
    }
    if (search) {
        additional += '?' + search[0] + '=' + search[1]
    }
    return this.$server + '/' + main + additional
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
app.config.globalProperties.currentDate = function (day = 0) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    return date.toJSON().slice(0, 10)
}
app.config.globalProperties.setErrors = function (el, errors) {
    let error_tag = '<p class="value-error-text">place</p>'
    if (el) {
        $.each(errors.response.data.errors, function (name, value) {
            if (value instanceof Object) {
                value = value[0]
            }
            $(el).find('[name="' + name + '"]').addClass('value-error')
            if (!$(el).find('[name="' + name + '"]').next().hasClass('value-error-text')) {
                $(el).find('[name="' + name + '"]').after(error_tag.replace('place', value))
            }
        })
    }
}
app.config.globalProperties.clearForm = function (formData) {
    $(formData).find(':radio, :checkbox').removeAttr('checked').end()
        .find('textarea, :text, select').val('')
}
app.config.globalProperties.$successAlert = function(text){
    Swal.fire({
            title:'Success',
            timer:1000,
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
        }
    )
}
app.config.globalProperties.$warningAlert = function (text){
    Swal.fire({
            title:'Warning',
            text:text,
            timer:1200,
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
            timer:800,
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

