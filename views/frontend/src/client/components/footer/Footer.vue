<template>
<footer >
  <div class="footer d-flex justify-content-between  footer-container container">
 <div class="d-flex contact-address">
   <div class="footer-contact mb-3">
     <h3>Contacts</h3>
     <p class="footer-info"><img src="../../../assets/clients/Call.svg"><a  href="/">{{companyAddresses[0] ? companyAddresses[0].phone : "+996771236478"}}</a></p>
     <p class="footer-info"><img src="../../../assets/clients/Message.svg"><a href="/">{{catalog_settings.email || "example@gmail.com"}}</a></p>
   </div>
   <div class="footer-address mb-4">
     <h3>Address</h3>
     <p class="footer-info" >{{companyAddresses[0] ? companyAddresses[0].address : "Bishkek, Kyrgyzstan"}}</p>
     <p class="footer-info" >08:00-19:00 Every day</p>
   </div>
 </div>
  <div @click="$router.push('/')" class="footer-logo d-flex align-items-center">
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
  name: "Footer",
  computed:{
    catalog_settings(){
      return this.$store.getters['Catalog/getCatalog_settings'];
    },
    companyAddresses(){
      return this.$store.getters['Catalog/getCompanyAddresses'];
    },
  },
}
</script>

<style scoped>
footer{
  padding:70px 0;
  background: #F4F4F4;
  margin-top: 100px;
}
.footer-contact{
  margin-right: 100px;
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

@media(max-width:640px){

  footer{
    padding: 50px 0;

  }
}
@media(max-width:481px){
  .footer, .contact-address{
    flex-direction: column;
    align-items: flex-start;

  }

}
</style>