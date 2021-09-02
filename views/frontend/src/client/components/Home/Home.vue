<template>
  <div class="client  overlay_404">
    <div>
      <div id="navbar" class="fixed-top " v-if="!['ClientLogin', 'ClientRegister', 'EmployeeLogin'].includes($route.name)">
        <Navbar/>
      </div>
      <div class="router-content" id="router-content">
          <router-view />
      </div>
    </div>

    <div v-if="!['ClientLogin', 'ClientRegister'].includes($route.name)">
      <Footer/>
      <img @click="scrollToTop" id="back-top" class="d-none" src="../../../assets/icons/back-top.svg">
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Navbar from "@/client/Navbar";
import Footer from "@/client/components/footer/Footer";

export default {
name: "Home",
  components:{
  Navbar,
  Footer
  },
  data(){
   return{

   }
  },
  computed: {
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    }
  },
  methods:{
      scrollToTop(){
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;


      }

  },
  beforeCreate(){
    console.log("BeforeCreate HOME VUE");
    ///Ahahah ahahhah
    // (async () => {
    //   const options = {
    //     headers: {"company_url": this.$route.params.bekon}
    //   }
    //   await this.axios.get(this.url('getCatalogSettings'),options)
    //       .then((response) => {
    //         let settings = response.data.object;
    //         this.$store.dispatch("Catalog/setCompany_addresses",response.data.branches);
    //         this.$store.dispatch("Catalog/setCompany_delivery_options",response.data.deliveries);
    //         let catalog_settings={
    //           name:settings.name,
    //           email:settings.email,
    //           banner:settings.banner,
    //           description:settings.description,
    //           welcome:settings.welcome,
    //           delivery:settings.delivery,
    //           deliveryDescription:settings.deliveryDescription,
    //           telegram:settings.telegram,
    //           facebook:settings.facebook,
    //           instagram:settings.instagram,
    //           whatsapp:settings.whatsapp,
    //           website:settings.website,
    //         }
    //         this.$store.dispatch("Catalog/setCatalog_settings",catalog_settings);
    //         $('.overlay_404').show();
    //       }).catch(function (error){
    //         if (error.response) {
    //           let err_page = `
    //           <div>--->404</div>
    //           `
    //           $('.overlay_404').html(err_page).show();
    //         }
    //       })
    // })().catch(err => {
    //   console.error(err);
    // });
    this.$store.dispatch("Catalog/setCompany_url",this.$route.params.bekon);
    // this.$store.dispatch("Orders/setCompany_url_basket",this.$route.params.bekon);
  },
  created(){

  },
  mounted() {

    $(".modal-backdrop").attr('class', 'active');
    $(document).ready(function(){
      $(window).on("scroll",function() {
        if($(this).scrollTop() > 200)
        {
          $(".fixed-top").addClass("nav-top");
          $('.navigation').css({'border-bottom': '1px solid transparent'})
          $('#back-top').css({'display':'block'})
        }
        else {
          $(".fixed-top").removeClass("nav-top");
          $('.navigation').css({'border-bottom': '1px solid #e4e4e4'})
          $('#back-top').css({'display':'none'})
        }
      })
    })


    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
        $('.catalog-left').css({'top':'100px'})
      } else {
        document.getElementById("navbar").style.top = "-62px";
        $('.catalog-left').css({'top':'40px'})
      }
      prevScrollpos = currentScrollPos;
    }



  }
}
</script>

<style scoped>

.nav-top{
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.2);
  transition:.3s;
}

.fixed-top{
  background: #fff;
}
.client.before{

  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3) !important;
  position: fixed;
  z-index:10000;
  left: 0;
  top: 0;
}
#navbar{
  transition: 0.3s;
}
.router-content{
  margin-top:90px;
}
#back-top{
  position: fixed;
  bottom: 20px;
  right:20px;

}
.overlay_404{
  /*display: none;*/
}
.client{


}


.main-box h1{
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 5px;
}.main-box p{
  font-size: 22px;
   font-weight: normal;
 }


.new-img img{
  width: 100%;
}
@media(min-width:1200px){
  .client-container{
    max-width: calc(100vw - 240px);
  }
}
</style>