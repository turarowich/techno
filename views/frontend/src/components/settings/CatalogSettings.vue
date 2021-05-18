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
     <div class="reload-code d-flex align-items-center"><input><div class="url-icon"><img src="../../assets/icons/urlIcon.svg"></div></div>


     <h3 class="catalog-sub-title margin-20">QR code for online catalog</h3>
     <div class="d-flex align-items-center margin-50">
       <img src="../../assets/icons/qr-code.svg" class="mr-3">
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


     <div class="d-flex margin-10">
       <label class="switch d-flex">
         <input type="checkbox">
         <span class="slider round"></span>
       </label>
       <h2 class="catalog-sub-title">Delivery</h2>
     </div>
     <p class="catalog-description margin-30">
       You can customize the delivery method
     </p>

     <h3 class="catalog-sub-title margin-30">Delivery options</h3>
     <label>Name</label>
     <div class="d-flex">
       <input class="cashback-input mr-2">
        <button class="cash-btn"><img src="../../assets/icons/enable+.svg"></button>
     </div>
     <div class="d-flex margin-30">
       <div style="width:30%" class="mr-3">
         <label>Price</label>
         <input class="cashback-input">
       </div>

       <div style="width:70%">
         <label>Minimum order of amount</label>
         <input class="cashback-input">
       </div>
     </div>

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



   </div>

<!------------------Right Side-------------------------------------   -->

   <div class="col-lg-5">

     <h2 class="catalog-title mb-1">Additional settings</h2>
     <p class="catalog-description margin-30">Catalog appearance settings</p>


     <div class="margin-30">
       <label>Logo</label>
       <div class="profile-img ">
         <img class="profile-logo" src="../../assets/icons/profile-img.svg">
         <input type="file" id="file" v-on:change="uploadPhoto">
         <label class="addPhoto" for="file"><img src="../../assets/icons/addBtn.svg"></label>
       </div>
     </div>

     <h3 class="catalog-sub-title margin-10">Cover</h3>
     <p class="catalog-description margin-30">You can upload JPG or PNG photos, the minimum resolution is 1200*320px, the size is not more than 3 MB.</p>

     <div class="profile-img big-profile-img margin-30">
       <img src="../../assets/icons/setting-icon/no-img.svg">
       <input type="file" id="big-img" >
       <label class="addPhoto big-addPhoto"  for="file"><img src="../../assets/icons/addBtn.svg"></label>
     </div>

     <label>Definition</label>
     <textarea class="general-area definition-area margin-30"></textarea>

     <label class="margin-20">Working hours</label>
     <div class="week" >
       <div class="days active d-flex justify-content-center align-items-center">MO</div>
       <div class="days d-flex justify-content-center align-items-center">TU</div>
       <div class="days d-flex justify-content-center align-items-center">WE</div>
       <div class="days d-flex justify-content-center align-items-center">TH</div>
       <div class="days d-flex justify-content-center align-items-center">FR</div>
       <div class="days d-flex justify-content-center align-items-center">SA</div>
       <div class="days d-flex justify-content-center align-items-center">SU</div>
     </div>

    <div class="d-flex margin-50">
        <div style="width:50%" class="mr-3 d-flex align-items-center">
          <label class="mb-0 mr-3 working-label">From</label>
          <select class="form-control " aria-label="Default select example">

            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
          </select>
        </div>
      <div style="width:50%" class="d-flex align-items-center">
        <label class="mb-0 mr-3 working-label">Till</label>
        <select class="form-control " aria-label="Default select example">
          <option>+996500457834</option>
          <option>+996500457834</option>
          <option>+996500457834</option>
          <option>+996500457834</option>
          <option>+996500457834</option>
          <option>+996500457834</option>
          <option>+996500457834</option>
          <option>+996500457834</option>
          <option>+996500457834</option>
          <option>+996500457834</option>
          <option>+996500457834</option>
          <option>+996500457834</option>

        </select>
      </div>
    </div>

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

     <h3 class="catalog-sub-title mb-1">Address</h3>
     <p class="catalog-description margin-20">Enter the address manually or indicate on the map</p>

     <input class="cashback-input" placeholder="Enter your company address">

     <div class="map-address margin-20">
       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.5580245248984!2d74.60367225038095!3d42.88217200986009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb74559ed9e25%3A0x514fbb81abe4553e!2sOlolohausErkindik!5e0!3m2!1sen!2skg!4v1620191676519!5m2!1sen!2skg" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
     </div>

     <label class="margin-10">Phone number</label>
     <div class="phone-number margin-20">+996 555 45 45 45</div>

     <div class="d-flex margin-30">
       <input class="cashback-input mr-2" placeholder="Your phone number">
       <button class="cash-btn"><img src="../../assets/icons/enable+.svg"></button>
     </div>

     <a style="color:#616cf5" href="/">+ Add branch</a>
   </div>
 </div>
</div>
</template>

<script>
export default {
  name: "CatalogSettings",
  methods:{
    uploadPhoto(){
      const file = document.querySelector('#file');
      let chooseFiles = file.files[0];
      if(chooseFiles){
        const reader = new FileReader();

        reader.addEventListener('load', function(){
          const logo = document.querySelector('.profile-logo')
          logo.setAttribute('src', reader.result);
        })
        reader.readAsDataURL(chooseFiles)
      }
    },
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