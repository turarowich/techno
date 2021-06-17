<template>
  <div class="client overlay_404">
    <div>
      <div v-if="!['ClientLogin', 'ClientRegister'].includes($route.name)">
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
import $ from 'jquery';
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
    ///Ahahah ahahhah
    (async () => {
      const options = {
        headers: {"company_url": this.$route.params.bekon}
      }
      await this.axios.get(this.url('getCatalogSettings'),options)
          .then((response) => {
            console.log(response,"HOMMEEEEE SElf");
            $('.overlay_404').show();
          }).catch(function (error){
            if (error.response) {
              let err_page = `
              <div>--->404</div>
              `
              $('.overlay_404').html(err_page).show();
            }
          })
    })().catch(err => {
      console.error(err,"tehh selfllf");
    });
    this.$store.dispatch("Catalog/setCompany_url",this.$route.params.bekon);
  },
  created(){

  },
  mounted() {




  }
}
</script>

<style scoped>
@media(min-width:1200px){
  .client-container{
    max-width: calc(100vw - 240px);
  }
}
.overlay_404{
  display: none;
}
.client{
  overflow-y: auto;
  height: 100%;
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

</style>