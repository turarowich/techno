<template>
<div class="about container client-container">
  <div class="row">
  <div class="col-lg-7 mr-4">
    <div class="about-left">
      <div class="show-path"><img class="path-img" src="../../../assets/clients/path-img.svg"><div @click="$router.go(-1)" class="mr-1">Back </div>  | <span>{{$route.name}}</span> </div>
      <div class="main-box" v-bind:style="{ backgroundImage: 'url(' + server+'/'+catalog_settings.banner + ')' }">
<!--        <img :src="server+'/'+catalog_settings.banner">-->
<!--        <div class="relatives">-->
<!--         </div>-->
      </div>
      <h3 class="about-title">About us</h3>
      <p class="client-paragraph">
        {{catalog_settings.description}}
      </p>
      <button class=" catalog-btn" @click="$router.push(`/${currentCompanyCatalog}`)">Go to catalog</button>
    </div>
  </div>
  <div class="col-lg-4">
    <div class="about-right">
      <h2 class="shop-name">{{catalog_settings.name || ""}}</h2>
      <div class="line mt-0"></div>

      <h3 class="contact-title">Contacts</h3>
      <div v-if="companyAddresses.length>1">

      <div class="contact-box">
        <p><img src="../../../assets/clients/call-about.svg">{{companyAddresses[0].phone}}</p>
        <p><img src="../../../assets/clients/call-about.svg">{{companyAddresses[0].phone2}}</p>
        <p class="mb-0"><img src="../../../assets/clients/message-about.svg">{{catalog_settings.email}}</p>
      </div>

        <p class="contact-address">{{ companyAddresses[0].address }}</p>
        <p v-if="companyAddresses[0].monday.active" class="contact-time mb-0">Mon {{companyAddresses[0].monday.start}}-{{companyAddresses[0].monday.end}}</p>
        <p v-if="companyAddresses[0].monday.active" class="contact-time mb-0">Tue {{companyAddresses[0].tuesday.start}}-{{companyAddresses[0].tuesday.end}}</p>
        <p v-if="companyAddresses[0].wednesday.active" class="contact-time mb-0">Wed {{companyAddresses[0].wednesday.start}}-{{companyAddresses[0].wednesday.end}}</p>
        <p v-if="companyAddresses[0].thursday.active" class="contact-time mb-0">Thr {{companyAddresses[0].thursday.start}}-{{companyAddresses[0].thursday.end}}</p>
        <p v-if="companyAddresses[0].friday.active" class="contact-time mb-0">Fr {{companyAddresses[0].friday.start}}-{{companyAddresses[0].friday.end}}</p>
        <p v-if="companyAddresses[0].saturday.active" class="contact-time mb-0">Sat {{companyAddresses[0].saturday.start}}-{{companyAddresses[0].saturday.end}}</p>
        <p v-if="companyAddresses[0].sunday.active" class="contact-time mb-0">Sun {{companyAddresses[0].sunday.start}}-{{companyAddresses[0].sunday.end}}</p>
      </div>

      <h3 class="contact-title">Links</h3>
      <div class="contact-icon">
        <a :href="catalog_settings.facebook" target="_blank"><img src="../../../assets/clients/Facebook.svg"></a>
        <a :href="catalog_settings.instagram" target="_blank"><img src="../../../assets/clients/Instagram.svg"></a>
        <a :href="catalog_settings.website" target="_blank"><img src="../../../assets/clients/ls_web.svg"></a>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: "About",
  data(){
    return{

    }
  },
  computed:{
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
    currentCompanyCatalogStorage() {
      return this.$store.getters['Catalog/getCompany_ur'];
    },
    catalog_settings(){
      return this.$store.getters['Catalog/getCatalog_settings'];
    },

    companyAddresses(){
      return this.$store.getters['Catalog/getCompanyAddresses'];
    },
    server(){
      return this.$server;
    },
  },
  beforeCreate() {
    (async () => {
      const options = {
        headers: {"company_url": this.$route.params.bekon}
      }
      await this.axios.get(this.url('getCatalogSettings'),options)
          .then((response) => {
            let settings = response.data.object;
            this.$store.dispatch("Catalog/setCompany_addresses",response.data.branches);
            this.$store.dispatch("Catalog/setCompany_delivery_options",response.data.deliveries);
            let catalog_settings={
              name:settings.name,
              email:settings.email,
              banner:settings.banner,
              description:settings.description,
              welcome:settings.welcome,
              delivery:settings.delivery,
              deliveryDescription:settings.deliveryDescription,
              telegram:settings.telegram,
              facebook:settings.facebook,
              instagram:settings.instagram,
              whatsapp:settings.whatsapp,
              website:settings.website,
            }
            this.$store.dispatch("Catalog/setCatalog_settings",catalog_settings);
            // $('.overlay_404').show();
          }).catch(function (error){
            if (error.response) {
              console.log('eeeeeeeeeeeeee',error.response)
              // let err_page = `
              // <div>--->404</div>
              // `
              // $('.overlay_404').html(err_page).show();
            }
          })
    })().catch(err => {
      console.error(err);
    });
  },
  created() {
    console.log(this.currentCompanyCatalogStorage);
    console.log(this.currentCompanyCatalog);
  }
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