<template>
  <div>
  
   <div v-if="spinner"  style="height:65vh" class="d-flex align-items-center">
     <Spinner/>
   </div>
  
    <div v-else class="row pb-5">
      <div class="col-lg-5">
  
        <div class="d-flex margin-10">
          <label class="switch d-flex">
            <input type="checkbox" v-model="catalog_status">
            <span class="slider round"></span>
          </label>
          <h2 class="catalog-title">Web catalog</h2>
        </div>
        <p class="catalog-description margin-30">Here you can flexibly customize your online catalog</p>
  
        <h3 class="catalog-sub-title margin-10">Your url from online catalog</h3>
        <p class="catalog-description mb-3">You can send a link to your catalog to your clients</p>
        <div class="reload-code d-flex align-items-center">
          <span style="color:#858585;">{{domainNameShop}}/</span>
          <input style="color:#616CF5;padding-bottom: 1px;padding-left: 0;" v-model="catalogUrl">
          <div @click="generateQrcode();" class="url-icon mr-1">
            <img src="../../assets/icons/bird.svg" style="width:14px;height:14px">
          </div>
          <div @click="copyCatalogUrl" class="url-icon">
            <img src="../../assets/icons/urlIcon.svg">
          </div>
        </div>
        <h3 class="catalog-sub-title margin-20">QR code for online catalog</h3>
        <!--     <h3 class="catalog-sub-title mb-3" style="text-overflow: ellipsis;overflow: hidden">{{catalogFullUrl}}</h3>-->
        <div class="d-flex align-items-center margin-50">
          <img :src="qrcodePath" class="mr-2" style="width:90px; height:90px">
          <div>
            <p class="catalog-description mb-2">You can print this code - this is the<br> menu for users to quickly go online</p>
            <div>
              <img src="../../assets/icons/printer.svg" class="mr-2">
              <span @click="printQRCode" style="color:#616cf5;cursor: pointer">Print</span>
            </div>
          </div>
        </div>
  
        <div class="d-flex margin-10">
          <label class="switch d-flex">
            <input v-model="catalog_mode_status" type="checkbox">
            <span class="slider round"></span>
          </label>
          <h2 class="catalog-sub-title">Catalog mode</h2>
        </div>
        <p class="catalog-description margin-50">
          This setting disables the ability to place an order, your catalog will work as an online menu,
          customers can also place an order only within your institution
        </p>
  
  
  
  
        <!--     <div class="d-flex margin-10">-->
        <!--       <label class="switch d-flex">-->
        <!--         <input v-model="news_status" type="checkbox">-->
        <!--         <span class="slider round"></span>-->
        <!--       </label>-->
        <!--       <h2 class="catalog-sub-title">News</h2>-->
        <!--     </div>-->
        <!--     -->
        <!--     <p class="catalog-description margin-30">Disable news in the directory</p>-->
  
        <!--     <label>News title</label>-->
        <!--     <input v-model="news_title" class="cashback-input">-->
  
        <!--     <label>News description</label>-->
        <!--     <textarea v-model="news_description" class="margin-50 general-area"></textarea>-->
  
        <!--     <div class="d-flex margin-10">-->
        <!--       <label class="switch d-flex">-->
        <!--         <input v-model="filters_n_category_status" type="checkbox">-->
        <!--         <span class="slider round"></span>-->
        <!--       </label>-->
        <!--       <h2 class="catalog-sub-title">Filters and category</h2>-->
        <!--     </div>-->
        <!--     <p class="catalog-description margin-50">-->
        <!--       Disable categories and filters in the catalog-->
        <!--     </p>-->
  
  
        <div class="d-flex margin-10">
          <label class="switch d-flex">
            <input v-model="food_mode_status" type="checkbox">
            <span class="slider round"></span>
          </label>
          <h2 class="catalog-sub-title">Food mode</h2>
        </div>
        <p class="catalog-description margin-50">
          Necessary if you want to use the catalog only as an online menu suitable for cafes, coffee houses, etc.
        </p>
  
        <div class="d-flex margin-10" style="margin-top: '50px';">
          <label class="switch d-flex">
            <input v-model="productCustomFields" type="checkbox">
            <span class="slider round"></span>
          </label>
          <h2 class="catalog-sub-title">Additional Fields</h2>
        </div>
        <p class="catalog-description margin-30">
          Necessary if you want to use the catalog only as an online menu suitable for cafes, coffee houses, etc.
        </p>
        
        <input v-model="productCustomField1.name" class="social-btns" placeholder="Field name 1">
        <input v-model="productCustomField2.name" class="social-btns" placeholder="Field name 2">
  
        <div class="d-flex margin-10" :style="{'margin-top': '40px'} ">
          <label class="switch d-flex">
            <input v-model="productCustomColors.required" type="checkbox">
            <span class="slider round"></span>
          </label>
          <h2 class="catalog-sub-title">Choose Color</h2>
        </div>
        <p class="catalog-description margin-30">
          When you enable this item, you can add color to products
        </p>
        <div class="d-flex">
          <div :style="{ background: currentNewColor.value.hex }" class="dropdown dropMenu color-picker-button" style="size: 20px; padding: 0; left: 22px;
                                                                                            position: absolute;
                                                                                            border-radius: 5px;
                                                                                            margin-top: 8px;"
      >
          <div class="dropdown-toggle" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" style="size: 20px; padding: 0"
            aria-expanded="false">
            <div :style="{height: '20px', width: '20px'}"></div>
          </div>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu">
            <div :style="{background: color}">

              <Sketch 
                v-model="currentNewColor.value" 
                @input="()=>{console.log('change color')}"
              />

            </div>
          </div>
        </div>
          <input v-model="currentNewColor.name" class="form-input cashback-input" placeholder="Choose color" style="padding-left: 42px">
          <button v-if="index != 1" type="button" 
              @click="addColor()" class="discount-btn ml-2"><img alt="+" src="../../assets/icons/enable+.svg"></button>
        </div>  
        <div class="custom-fields col-12 pr-0 pl-0" v-for="(item, index) in productCustomColors.values" :key="index" >
          <div class="dropdown dropMenu" :style="{ background: productCustomColors.values[index].value.hex }" style="size: 30px; padding: 0;
                                                                                position: absolute;
                                                                                size: 30px;
                                                                                margin-top: 8px;
                                                                                left: 7px;
                                                                                border-radius: 5px;
          ">
          
        </div>
          <div class="d-flex" >
            <input disabled v-model="productCustomColors.values[index].name"  class="form-input cashback-input mb-2" placeholder="Name color" style="padding-left: 42px">
            <button type="button" 
            @click="removeVal('productCustomColors', index)" class="discount-btn ml-2"><img alt="x" src="../../assets/icons/x.svg"></button>
          </div>
        </div>

        
        <button type="button" @click="saveCatalogSettings" class="save mb-3">Save</button>
      </div>
  
      <!------------------Right Side-------------------------------------   -->
  
      <div class="col-lg-5">
  
        <h2 class="catalog-title mb-1">Additional settings</h2>
        <p class="catalog-description margin-30">Catalog appearance settings</p>
  
        <div class="margin-30">
          <label>Logo</label>
          <p class="catalog-description margin-30">You can upload JPG or PNG photos, the size is not more than 3 MB.</p>
          <div class="profile-img ">
            <!--         <img class="profile-logo" :src="previewImage" >-->
            <img class="profile-logo" :src="logoPath">
            <input type="file" id="logo_file" @change="uploadImage($event,'logo')">
            <label class="addPhoto" for="logo_file"><img src="../../assets/icons/addBtn.svg"></label>
          </div>
        </div>
  
        <h3 class="catalog-sub-title margin-10">Banner</h3>
        <p class="catalog-description margin-30">You can upload JPG or PNG photos, the size is not more than 3 MB.</p>
  
        <div class="profile-img big-profile-img margin-30">
          <img :class="{now_imgs:!banner}" :src="bannerPath">
          <input type="file" id="big-img" @change="uploadImage($event,'banner')">
          <label class="addPhoto big-addPhoto"  for="big-img"><img src="../../assets/icons/addBtn.svg"></label>
        </div>
  
        <label>Description</label>
        <textarea v-model="description" class="general-area definition-area margin-30 pt-2"></textarea>
        <!-- //dont remove-->
        <!--     <h3 class="catalog-sub-title mb-1">Accent colors</h3>-->
        <!--     <p class="catalog-description margin-20">You can supply any color</p>-->
  
        <!--     <div style="position: relative" class="color-box margin-50 d-flex justify-content-between align-items-center">-->
        <!--       <div style="width:100%;" class="d-flex align-items-center">-->
        <!--         <div v-bind:style="{ background: color}" v-on:click="seen = !seen" class="color-picker mr-2"></div>-->
        <!--         <input disabled v-model="color" class="color-input pr-2" placeholder="#616cf5">-->
  
        <!--         <div v-if="seen" class="picker_conteiner" style="position: absolute;right: 0;">-->
        <!--           <span v-on:click="seen = !seen" class="picker_close_btn"><img src="../../assets/icons/addBtn.svg"></span>-->
        <!--           <Picker v-on:sendColor="onColorPick"/>-->
        <!--         </div>-->
  
        <!--       </div>-->
        <!--       <span @click="color='#616cf5'" style="color:#616cf5;cursor: pointer">Clear</span>-->
        <!--     </div>-->
  
        <h3 class="catalog-sub-title margin-20">Social networks</h3>
        <div class="margin-50">
          <input v-model="whatsapp" class="social-btns" placeholder="Whatsapp">
          <input v-model="telegram" class="social-btns" placeholder="Telegram">
          <input v-model="facebook" class="social-btns" placeholder="Facebook">
          <input v-model="instagram" class="social-btns" placeholder="Instagram">
          <input v-model="website" class="social-btns" placeholder="Website">
        </div>
        <div class="margin-20">
          <h3 class="catalog-sub-title">Order statuses</h3>
          <p class="catalog-description margin-10">Here you can edit status names when preparing an order</p>
        </div>
        <div>
          <span>First Status</span>
          <input v-model="orderStatuses[0]" class="social-btns" :placeholder="orderStatuses[0]">
        </div>
        <div>
          <span>Second Status</span>
          <input v-model="orderStatuses[1]" class="social-btns" :placeholder="orderStatuses[1]">
        </div>
        <div>
          <span>Third Status</span>
          <input v-model="orderStatuses[2]" class="social-btns" :placeholder="orderStatuses[2]">
        </div>
        <div class="d-flex margin-10" :style="{'margin-top': '40px'} ">
          <label class="switch d-flex">
            <input v-model="orderStatusesPass" type="checkbox">
            <span class="slider round"></span>
          </label>
          <h2 class="catalog-sub-title">Automatically show first status</h2>
        </div>
        <p class="catalog-description margin-30">
          When you enable this item, the first status will automatically appear in the app and in the “orders” tab
        </p>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import { Sketch } from '@ckpack/vue-color';
  import $ from "jquery";


  // import { ColorPicker } from 'vue-color-kit'
  import Spinner from "../Spinner";
  export default {
    name: "CatalogSettings",
    components:{
      Spinner,
      Sketch
    },
    data(){
      return{
        spinner:true,
        company:'',
        id:'',
        catalog_status:false,
        catalogUrl:'',
        catalog_mode_status:false,
        news_status:false,
        news_title:'',
        news_description:'',
        filters_n_category_status:false,
        food_mode_status:false,
        logo:'',
        banner:'',
        description:'',
        color:'#616cf5',
        whatsapp:'dd',
        telegram:'',
        facebook:'',
        instagram:'',
        website:'',
        seen: false,
        productCustomField1: { name: '', value: ''},
        productCustomField2:  { name: '', value: ''},
        productCustomFields: false,
        orderStatusesPass: false,
        productCustomColors:{
          required: false,
          values: ['black'],
          names: ['']
        },
        orderStatuses: ["Accept", "In Progress", "Done"],
        currentNewColor: {
          name: '',
          value: { hex: '#000' }
        }
        // previewImage:require('../../assets/icons/profile-img.svg'),
      }
    },
    computed:{
      catalogFullUrl(){
        return window.location.host+'/'+this.catalogUrl;
      },
      domainNameShop(){
        return window.location.host;
      },
      qrcodePath(){
        if(this.company !=="" && this.id !==''){
          try {
            // return require("../../../images/"+this.company+'/qr/code.png');
            return this.server+"/images/"+this.company+'/qr/code.png';
            // eslint-disable-next-line no-empty
          }catch (e){
            console.log(e,"ddddddddddddd");
          }
        }
        return require("../../assets/icons/profile-img.svg");
      },
      logoPath(){
        if(this.logo !=="" && this.id !==''){
          try {
            // return require("../../../"+this.logo);
            return this.server+'/'+ this.logo;
            // eslint-disable-next-line no-empty
          }catch (e){
            console.log(e,"ddddddddddddddddddddddddddddddddd========================")
          }
        }
        return require("../../assets/icons/profile-img.svg");
      },
      bannerPath(){
        if(this.banner !=="" && this.id !==''){
          try {
            return this.server +'/'+ this.banner;
            // eslint-disable-next-line no-empty
          }catch (e){
            console.log(e);
          }
        }
        return require("../../assets/icons/setting-icon/no-img.svg");
      },
      server(){
        return this.$server;
      },
    },
    methods:{
      addColor() {
      if (this.currentNewColor.name.length === 0) {
        this.$warningAlert('Enter color name');
        return        
      }
      this.productCustomColors.values.push(this.currentNewColor);
      this.currentNewColor = {
        name: '',
        value: { hex: '#000'} 
      }
    },
      changePickerColor() {
          $('.siding-bar').removeClass('active')
        },

      removeVal(field, index){
        this[field].values.splice(index, 1)
      },
      addNewVal(field){
        this[field].values.unshift('');
      },
      addNewColorName() {
        this.productCustomColors.names.unshift('');
      },
      async uploadImage(e,type){
        let that = this;
        const image = e.target.files[0];
        if(image.name.match(/\.(jpg|jpeg|png|gif)$/)){
          let size = image.size;
          if(size>3000000){
            that.$warningAlert('Max size 3MB');
            return ;
          }
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = e =>{
            //check
            let im = new Image;
            im.src = e.target.result;
            im.onload = function (){
              console.log(im.width,im.height);
              // if(type==="banner" && (im.width<1200 || im.width<320)){
              //   that.$warningAlert('Min resolution 1200*320px');
              // }else{
              //   // this.previewImage = e.target.result;
              //   that.saveFile(type,e.target.result);
              // }
              that.saveFile(type,e.target.result);
            }
          };
  
        }else{
          console.log('wrong type',+image.type)
        }
      },
      copyCatalogUrl(){
        let that = this;
        let textArea = document.createElement("textarea");
        textArea.value = this.catalogFullUrl;
        textArea.style.opacity = "0";
        // document.body.appendChild(textArea);
        document.body.prepend(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          that.$successAlert('Copied');
        } catch (err) {
          that.$warningAlert('Unable to copy value , error : ' + err.message);
        }
  
        document.body.removeChild(textArea);
      },
      updateCatalogUrl(){
        let that=this;
        let url = this.url('updateSettings');
        this.axios.put(url, {
          catalogUrl:this.catalogUrl
        }).then(function (response) {
          console.log(response);
        }).catch(function(error){
            if(error.response.data && !error.response.data.errors){
                  that.$warningAlert(error.response.data.msg)
              }
          if (error.response) {
            console.log(error.message)
          }
        });
      },
      generateQrcode(){
        let that = this;
        ///check
        let list_of_router_js_routes = this.$router.options.routes;
        let found = 0;
        list_of_router_js_routes.forEach(function (component){
          if(component.path.search(that.catalogUrl)!==-1){
            found++;
          }
        })
        if(found>0){
          that.$warningAlert('Reserved route');
          return;
        }
        //end check
  
        let url = this.url('generateQrCodeFile');
        this.axios.put(url, {
          catalogUrl:this.catalogFullUrl,
          catalog:this.catalogUrl,
          settings_id:this.id,
        }).then(function (response) {
          let data = response.data;
          if(data.validation == 1){
            that.$successAlert(data.msg);
          }else{
            that.$warningAlert(data.msg);
          }
  
        }).catch(function(error){
          if (error.response) {
              if(error.response.data && !error.response.data.errors){
                  that.$warningAlert(error.response.data.msg)
              }
          }
        });
      },
      printQRCode() {
        let win = window.open('about:blank', "_new");
        win.document.open();
        win.document.write([
          '<html>',
          '   <head>',
          '   </head>',
          '   <body onload="window.print()" onafterprint="window.close()">',
          '       <img width="100%" src="' + this.qrcodePath + '"/>',
          '   </body>',
          '</html>'
        ].join(''));
        win.document.close();
      },
      saveFile(type,file){
        console.log("SAVING FILE");
        let that=this;
        let url = this.url('saveSettingsFile');
        let formData = new FormData();
        formData.append('logo', file);
        formData.append('banner', file);
        formData.append('id', this.id);
        formData.append('type', type);
        this.axios.put(url, formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (response) {
          console.log(response);
          that.$successAlert('Updated');
        }).catch(function(error){
          if (error.response) {
              if(error.response.data && !error.response.data.errors){
                  that.$warningAlert(error.response.data.msg)
              }
          }
        });
      },
      onColorPick (color) {
        this.color = color;
      },
      saveCatalogSettings(){
        let that=this;
        let url = this.url('updateSettings');
        this.axios.put(url, {
          catalogStatus:this.catalog_status,
          catalogUrl:this.catalogUrl,
          catalogMode:this.catalog_mode_status,
          newsStatus:this.news_status,
          newsTitle:this.news_title,
          newsDescription:this.news_description,
          filtersCategoryStatus:this.filters_n_category_status,
          foodMode:this.food_mode_status,
          // logo:this.logo,
          // banner:this.banner,
          description:this.description,
          color:this.color,
          whatsapp:this.whatsapp,
          telegram:this.telegram,
          facebook:this.facebook,
          instagram:this.instagram,
          website:this.website,
          orderStatuses: this.orderStatuses,
          orderStatusesPass: this.orderStatusesPass,
          productCustomField1: {name: this.productCustomField1.name, value: ''},
          productCustomField2: {name:this.productCustomField2.name, value: ''},
          productCustomFields: this.productCustomFields,
          productCustomColors: this.productCustomColors,
        }).then(function (response) {
          console.log(response);
          that.$successAlert('Updated');
        }).catch(function(error){
          if (error.response) {
              if(error.response.data && !error.response.data.errors){
                  that.$warningAlert(error.response.data.msg)
              }else{
                  that.$warningAlert('Something went wrong');
              }
            
            // console.log(error.response.status);
            // console.log(error.response.headers);
            // that.displayMessages(Object.values(error.response.data.errors),"Errors");
          }
        });
      },
    },
    beforeCreate(){
      let that = this;
      this.axios
        .get(this.url('getSettings'))
        .then(function (response){
          let settings = response.data.object;
          that.id= settings._id || '';
          that.company = response.data.company || '';
          that.catalog_status = settings.catalogStatus || false;
          that.catalogUrl = settings.catalogUrl || '';
          that.catalog_mode_status = settings.catalogMode;
          that.news_status = settings.newsStatus;
          that.news_title = settings.newsTitle
          that.news_description = settings.newsDescription
          that.filters_n_category_status = settings.filtersCategoryStatus
          that.food_mode_status = settings.foodMode
          that.logo = settings.logo || '';
          that.banner = settings.banner || '';
          that.description = settings.description || '';
          that.color = settings.color || '';
          that.whatsapp = settings.whatsapp || '';
          that.telegram = settings.telegram || '';
          that.facebook = settings.facebook || '';
          that.instagram = settings.instagram || '';
          that.website = settings.website || '';
          that.spinner = false;
          that.orderStatuses = settings.orderStatuses;
          that.orderStatusesPass = settings.orderStatusesPass;
          that.productCustomField1.name = settings?.productCustomField1.name ?? ``;
          that.productCustomField2.name = settings?.productCustomField2.name ?? ``;
          that.productCustomFields = settings?.productCustomFields ?? false;
          that.productCustomColors = settings?.productCustomColors ?? {
            required: false,
            values: ['black'],
            names: ['']
        };
        })
    },
    mounted() {
  
    }
  }
  </script>
  
  <style scoped>
  /* @import url('vue-accessible-color-picker/styles'); */

  .discount-btn{
    height: 45px;
    flex: 0 0 45px;
    border-radius:5px;
    background: none;
    border: none;
  }
  .working-label{
    color:#858585;
  }
  .phone-number{
    color: #616CF5;
    font-size: 16px;
  }
  
  .social-btns{
    border: 1px solid #D3D3D3;
    border-radius: 5px;
    width: 100%;
    height: 45px;
    background: none;
    color:#8C94A5;
    text-align: left;
    padding-left:20px;
    margin-bottom: 10px;
  }
  .color-box{
    border-bottom: 1px solid #d3d3d3;
    padding-bottom: 10px;
  }
  .color-input{
    width: 80%;
    height: 30px;
    border:none;
  }
  .color-picker{
    height: 30px;
    width: 30px;
    /*background: #616cf5;*/
    border-radius:5px;
  }
  
  .save{
    width: 120px;
  }
  .now_imgs{
    object-fit: contain !important;
    padding:10px 0;
  }
  .catalog-title{
    font-size: 20px;
    font-weight: 600;
  }
  .catalog-description{
    font-size: 14px;
    color:#b0b0b0;
    margin-bottom: 0;
  }
  .catalog-sub-title{
    font-size: 16px;
    font-weight: normal;
  }
  .margin-10{
    margin-bottom: 10px;
  }
  .margin-30{
    margin-bottom: 30px;
  }
  .margin-20{
    margin-bottom: 20px;
  }
  .margin-50{
    margin-bottom: 50px;
  }
  .big-profile-img{
    width: 100% !important;
    height:150px;
    border:1px solid #d3d3d3;
    display: flex;
    justify-content: center;
    border-radius: 10px;
  
  
  }
  .big-profile-img img{
    border-radius: 10px;
  }
  .big-addPhoto{
    right: -18px !important;
    bottom: -23px !important;
  }
  .definition-area{
    height: 100px;
  }
  .url-icon{
    width: 55px;
    height: 34px;
    background: #616cf5;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .url-icon img{
    width: 18px;
    height: 18px;
  }
  .cashback-input{
    width: 100%;
    margin-bottom: 20px;
  }
  /*.show-pswrd{*/
  /*  width: 20px;*/
  /*  height: 20px;*/
  /*}*/
  .profile-img{
    width: 100px;
    height: 100px;
    position: relative;
    border:1px solid #d3d3d3;
    border-radius:10px;
  }
  .profile-img img{
    width: 100%;
    height: 100%;
    object-fit:cover;
  }
  .profile-logo{
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
  
  }
  .profile-img input{
    display: none;
  }
  .addPhoto{
    position: absolute;
    bottom: -20px;
    right: -18px;
  }
  .picker_close_btn img{
    position: absolute;
    z-index: 1;
    right: -7px;
    top: -16px;
    transform: rotate(
        45deg
    );
  }
  </style>