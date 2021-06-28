<template>
  <div class="client overlay_404">
    <div >
      <div v-if="!['ClientLogin', 'ClientRegister', 'EmployeeLogin'].includes($route.name)">
        <Navbar/>
      </div>
      <router-view/>
    </div>
    <div v-if="!['ClientLogin', 'ClientRegister'].includes($route.name)">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Navbar from "@/client/Navbar";
import Footer from "@/client/components/footer/Footer";
// import $ from 'jquery';
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




  }
}
</script>

<style scoped>

.overlay_404{
  /*display: none;*/
}
.client{
  overflow-y: auto;
  height: 100%;
}
.client.active{
  height: 300px;
  overflow:hidden;
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