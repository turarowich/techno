<template>
<div>

 <div class="row pb-5">
   <div class="col-lg-5">

     <div class="d-flex margin-10">
       <label class="switch d-flex">
         <input type="checkbox">
         <span class="slider round"></span>
       </label>
       <h2 class="catalog-title">Catalog</h2>
     </div>
     <p class="catalog-description margin-30">Here you can flexibly customize your online catalog</p>

     <h3 class="catalog-sub-title margin-10">Your url from online catalog</h3>
     <p class="catalog-description mb-3">You can send a link to your catalog to your clients</p>
     <div class="reload-code d-flex align-items-center">
       <input v-model="catalogUrl">
       <div @click="updateCatalogUrl();generateQrcode();" class="url-icon">
         <img src="../../assets/icons/check.svg">
       </div>
       <div class="url-icon">
        <img src="../../assets/icons/urlIcon.svg">
       </div>
     </div>


     <h3 class="catalog-sub-title margin-20">QR code for online catalog</h3>
     <div class="d-flex align-items-center margin-50">
       <img :src="require(`../../../${qrcodePath}`)" class="mr-3">
       <div>
         <p class="catalog-description mb-2">You can print this code - this is the<br> menu for users to quickly go online</p>
         <div><img src="../../assets/icons/printer.svg" class="mr-2"><a style="color:#616cf5" href="/">Print</a></div>
       </div>
     </div>


     <div class="d-flex margin-10">
       <label class="switch d-flex">
         <input type="checkbox">
         <span class="slider round"></span>
       </label>
       <h2 class="catalog-sub-title">Catalog mode</h2>
     </div>
     <p class="catalog-description margin-50">
        This setting disables the ability to place an order, your catalog will work as an online menu,
       customers can also place an order only within your institution
     </p>

     <h3 class="catalog-sub-title mb-1">News</h3>
     <p class="catalog-description margin-30">Disable news in the directory</p>

     <label>News title</label>
     <input class="cashback-input">


     <label>News description</label>
     <textarea class="margin-50 general-area"></textarea>

     <div class="d-flex margin-10">
       <label class="switch d-flex">
         <input type="checkbox">
         <span class="slider round"></span>
       </label>
       <h2 class="catalog-sub-title">Filters and category</h2>
     </div>
     <p class="catalog-description margin-50">
       Disable categories and filters in the catalog
     </p>


     <div class="d-flex margin-10">
       <label class="switch d-flex">
         <input type="checkbox">
         <span class="slider round"></span>
       </label>
       <h2 class="catalog-sub-title">Food mode</h2>
     </div>
     <p class="catalog-description margin-50">
       Necessary if you want to use the catalog only as an online menu suitable for cafes, coffee houses, etc.
     </p>


     <button type="button" class="save mb-3">Save</button>
   </div>

<!------------------Right Side-------------------------------------   -->

   <div class="col-lg-5">

     <h2 class="catalog-title mb-1">Additional settings</h2>
     <p class="catalog-description margin-30">Catalog appearance settings</p>


     <div class="margin-30">
       <label>Logo</label>
       <div class="profile-img ">
<!--         <img class="profile-logo" src="../../assets/icons/profile-img.svg">-->
         <img class="profile-logo" :src="previewImage" >
<!--         <input type="file" id="file" v-on:change="uploadPhoto">-->
         <input type="file" id="logo_file" @change="uploadImage($event)">
         <label class="addPhoto" for="logo_file"><img src="../../assets/icons/addBtn.svg"></label>
       </div>
     </div>

     <h3 class="catalog-sub-title margin-10">Cover</h3>
     <p class="catalog-description margin-30">You can upload JPG or PNG photos, the minimum resolution is 1200*320px, the size is not more than 3 MB.</p>

     <div class="profile-img big-profile-img margin-30">
       <img src="../../assets/icons/setting-icon/no-img.svg">
       <input type="file" id="big-img" >
       <label class="addPhoto big-addPhoto"  for="big-img"><img src="../../assets/icons/addBtn.svg"></label>
     </div>

     <label>Description</label>
     <textarea class="general-area definition-area margin-30"></textarea>

     <h3 class="catalog-sub-title mb-1">Accent colors</h3>
     <p class="catalog-description margin-20">You can supply any color</p>

     <div class="color-box margin-50 d-flex justify-content-between align-items-center">
       <div style="width:100%" class="d-flex align-items-center">
         <div class="color-picker mr-2"></div>
         <input class="color-input pr-2" placeholder="#616cf5">
       </div>
       <a style="color:#616cf5" href="/">Remove</a>
     </div>

     <h3 class="catalog-sub-title margin-20">Social networks</h3>
     <div class="margin-50">
       <button class="social-btns">Whatsapp</button>
       <button class="social-btns">Telegram</button>
       <button class="social-btns">Facebook</button>
       <button class="social-btns">Instagram</button>
       <button class="social-btns">Website</button>
     </div>
   </div>
 </div>
</div>
</template>

<script>
export default {
  name: "CatalogSettings",
  data(){
    return{
      id:'',
      catalogUrl:'',
      qrcode_container:'',
      imgPath:'loygift605c615d55033f268c5d48ea',
      previewImage:require('../../assets/icons/profile-img.svg'),
    }
  },
  computed:{
    catalogFullUrl(){
      return window.location.origin+'/shop/'+this.catalogUrl;
    },
    qrcodePath(){
      // return '../../../images/'+this.imgPath+'/qr/code.png';
      return 'images/'+this.imgPath+'/qr/code.png';
    },

  },
  methods:{
    uploadImage(e){
      const image = e.target.files[0];
      if(image.name.match(/\.(jpg|jpeg|png|gif|svg)$/)){
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e =>{
          this.previewImage = e.target.result;
          this.saveCatalogSettings(image);
        };

      }else{
        console.log('wrong type',+image.type)
      }
    },

    uploadPhoto(){
      const file = document.querySelector('#file');
      let chooseFiles = file.files[0];
      if(chooseFiles){
        const reader = new FileReader();

        reader.addEventListener('load', function(){
          const logo = document.querySelector('.profile-logo')
          console.log(logo,"sdsdssdsd");
          logo.setAttribute('src', reader.result);
        })
        reader.readAsDataURL(chooseFiles)
      }
    },
    updateCatalogUrl(){
      // let that=this;
      let url = this.base_url+'/api/updateSettings';
      this.axios.put(url, {
        catalogUrl:this.catalogUrl
      }).then(function (response) {
        console.log(response);
      }).catch(function(error){
        if (error.response) {
          // console.log(error.response.status);
          // console.log(error.response.headers);
          // that.displayMessages(Object.values(error.response.data.errors),"Errors");
        }
      });
    },
    generateQrcode(){
      let url = this.base_url+'/api/generateQrCodeFile';
      console.log(this.catalogFullUrl);
      this.axios.put(url, {
        catalogUrl:this.catalogFullUrl
      }).then(function (response) {
        console.log(response);
      }).catch(function(error){
        if (error.response) {
          // console.log(error.response.status);
          // console.log(error.response.headers);
          // that.displayMessages(Object.values(error.response.data.errors),"Errors");
        }
      });
    },
    saveCatalogSettings(){
      // let that=this;
      let url = this.base_url+'/api/saveSettingsFile';
      let formData = new FormData();
      formData.append('logo', this.previewImage);
      this.axios.put(url, formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        console.log(response);
      }).catch(function(error){
        if (error.response) {
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
        .get(this.base_url+'/api/getSettings')
        .then(function (response){
          let settings = response.data.object;
          that.id= settings._id || '';
          that.catalogUrl = settings.catalogUrl || '';
          that.imgPath = response.data.imgPath || '';
        })
  },
  mounted() {
    var c = document.getElementById("qrcode_id");
    // var ctx = c.getContext("2d");
    this.qrcode_container = c;
  }
}
</script>

<style scoped>
.working-label{
  color:#858585;
}
.phone-number{
  color: #616CF5;
  font-size: 16px;
}
.map-address{
  height: 144px;
  border-radius: 10px;
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
  background: #616cf5;
  border-radius:5px;
}
.week{
  display: flex;
  margin-bottom: 20px;
}
.days{
  background: #F8F9FB;
  border-radius: 4.64125px;
  width: 48px;
  height: 45px;
  color:#858585;
  cursor:pointer;
  margin-right: 10px;
}
.days.active,.days:hover{
  background: #616cf5;
  transition: .3s;
  color:#fff;
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
  height:100px;
  border:1px solid #d3d3d3;
  display: flex;
  justify-content: center;
  border-radius: 10px;
}
.big-addPhoto{
  right: -18px !important;
  bottom: -23px !important;
}
.definition-area{
  height: 75px;
}
.url-icon{
  width: 34px;
  height: 34px;
  background: #616cf5;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
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
}
.profile-logo{
  width: 100%;
  height: 100%;
  object-fit: cover;
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

</style>