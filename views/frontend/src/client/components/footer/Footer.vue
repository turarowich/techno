<template>
<footer >
  <div class="d-flex justify-content-between align-items-center footer-container container">
  <div class="footer-contact">
    <h3>Contacts</h3>
    <p class="footer-info"><img src="../../../assets/clients/Call.svg"><a  href="/">{{companyAddresses[0].phone}}</a></p>
    <p class="footer-info"><img src="../../../assets/clients/Message.svg"><a href="/">{{catalog_settings.email}}</a></p>
  </div>
  <div class="footer-address">
    <h3>Address</h3>
    <p class="footer-info" >{{ companyAddresses[0].address }}</p>
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
.footer-container{
  max-width: calc(100vw - 240px);
}
</style>