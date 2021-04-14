<template>
<div class="about">
  <div class="row">
  <div class="col-lg-7 mr-4">
    <div class="about-left">
      <div class="show-path"><img class="path-img" src="../../../assets/clients/path-img.svg"><div @click="$router.go(-1)" class="mr-1">Back </div>  | <span>{{$route.name}}</span> </div>
      <div class="main-box">
        <div class="relatives">
         </div>
      </div>

      <h3 class="about-title">About us</h3>
      <p class="client-paragraph">Enter your real phone number and you will receive a confirmation codeEnter your real phone number and you will receive a confirmation
        codeEnter your real phone number and you will receive a confirmation codeEnter your real phone number and you will recei...</p>
      <button class=" catalog-btn" @click="$router.push('/home')"><a>Go to catalog</a></button>
    </div>
  </div>
  <div class="col-lg-4">
    <div class="about-right">
      <h2 class="shop-name">Modius Catalog</h2>
      <div class="line mt-0"></div>

      <h3 class="contact-title">Contacts</h3>
      <div class="contact-box">
        <p><img src="../../../assets/clients/call-about.svg"><a href="/">+1 812 436 23 53</a></p>
        <p class="mb-0"><img src="../../../assets/clients/message-about.svg"><a href="/">modius@support.com</a></p>
      </div>

      <p class="contact-address">135, st. Toktogula, Bishkek, Kyrgyzstan</p>
      <p class="contact-time mb-0">Mn-Fr 08:00 - 19:00</p>
      <p class="contact-time">Sd 08:00 - 17:00</p>

      <h3 class="contact-title">Links</h3>
      <div class="contact-icon">
        <img src="../../../assets/clients/Facebook.svg">
        <img src="../../../assets/clients/Instagram.svg">
        <img src="../../../assets/clients/ls_web.svg">

      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: "About"
}
</script>

<style scoped>

.relatives{
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  border-radius: 5px;
  display: flex;
  align-items: center;justify-content: center;
  flex-direction: column;
  color:#fff;
}
.main-box{
  height: 411px;
  background: url('../../../assets/clients/main-box.svg')no-repeat center;
  position: relative;
  border-radius: 5px;
background-size:cover;
}
.about-title{
  margin: 30px 0;
  font-size: 16px;
  font-weight: 600;
}

.shop-name{
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}
.contact-title{
  font-size: 16px;
  font-weight: 600;
  margin: 20px 0;
}
.contact-box{
  background: #F8F9FF;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}
.contact-box img{
  margin-right: 10px;
}
.contact-box a{
  color:#616CF5;
}
.contact-box a:hover{
  text-decoration: none;
}
.contact-box p{
  margin-bottom: 9px;
}
.contact-address{
  color: #606877;
  margin-bottom: 5px;
}
.contact-time{
  color:#616CF5;
}
.contact-icon img{
  margin-right: 20px;
}
.contact-icon img:first-child{
  margin-right: 16px;
}
</style>