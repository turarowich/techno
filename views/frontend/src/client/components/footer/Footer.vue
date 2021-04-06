<template>
<footer >
  <div class="d-flex justify-content-between align-items-center container">
  <div class="footer-contact">
    <h3>Contacts</h3>
    <p class="footer-info"><img src="../../../assets/clients/Call.svg"><a  href="/">+1 812 436 23 53</a></p>
    <p class="footer-info"><img src="../../../assets/clients/Message.svg"><a href="/">modius@support.com</a></p>
  </div>
  <div class="footer-address">
    <h3>Address</h3>
    <p class="footer-info" >135, st. Toktogula, Bishkek, Kyrgyzstan</p>
    <p class="footer-info" >08:00-19:00 Every day</p>
  </div>
  <div class="footer-logo d-flex align-items-center">
    <img class="mr-2" src="../../../assets/clients/footerLogo.svg">
    <div>
      <span class="poweredby">powered by</span>
      <h3 class="footer-title">Loy Gift</h3>
    </div>
  </div>
  </div>
</footer>
</template>

<script>
export default {
name: "Footer"
}
</script>

<style scoped>
footer{
  padding:70px 0;
  background: #F4F4F4;
  margin-top: 30px;
}
.footer-address h3, .footer-contact h3{
  color: #222222;
font-size: 16px;
  font-weight: 600;
  margin-bottom: 17px;

}
.footer-info{
  margin-bottom: 10px;
  display: block;
  color:#484848;

}
.footer-info img{
  margin-right: 10px;
}
.footer-info a, .footer-info a:hover{
  color:#484848;
  text-decoration: none;
}
.footer-title{
  font-size: 24px;
}
.poweredby{
  color:#858585;
}
</style>