<template>
<div class="container client-container">
<!--  <div class="main-box" v-bind:style="{ backgroundImage: 'url(' + bannerPath + ')' }" >-->
  <div class="main-box" v-bind:style="{ backgroundImage: 'url(' + server+'/'+catalog_settings.banner + ')' }" >
    <div class="relatives">
      <h1>{{catalog_settings.name || 'Company Name'}}</h1>
      <p>{{catalog_settings.welcome || 'Welcome to our thingy'}}</p>
    </div>
  </div>
  <div class="new">
    <div class="news">
      <div class="d-flex justify-content-between mb-3" >
        <div style="font-weight: bold;font-size: 20px;">News</div>
        <div><router-link class="view-all" :to="`/${currentCompanyCatalog}/client-news`">View all</router-link></div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div v-for="(news,index) in newsArray.slice(0,4)" :key="index"  class="col-lg-3 col-md-4 col-sm-6 mb-4 " @click="openNews(news._id)">
              <div class="new-img">
                <img v-if="!news.error" :src="server+'/'+news.img" @error="news.error=true">
                <img v-else src="../../../assets/img/default.svg" >
              </div>
              <div class="news-text">
                <div class="d-flex align-items-center calendar-news" >
                  <img src="../../../assets/icons/Calendar.svg">
                  <span class="date">
                    {{new Date(news.createdAt).toDateString()}}
                  </span></div>
                <h4 class="news-content">{{news.name}}</h4>
                <p class="news-description">{{news.desc}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ClientCatalog/>
</div>
</template>

<script>
import ClientCatalog from "@/client/components/ClientCatalog/ClientCatalog";
import $ from 'jquery';
export default {
name: "Dashboard",
  components:{
    ClientCatalog
  },
  data(){
    return{
      // settings:{},
      newsArray:[],
    }
  },
  computed:{
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
    bannerPath(){
      if(this.catalog_settings.banner){
        try {
          return this.base_url+'/'+ this.settings.banner;
          // eslint-disable-next-line no-empty
        }catch (e){
          console.log(e)
        }
      }
      return require("../../../assets/clients/main-box.svg");
    },
    user(){
      return this.$store.getters['Client/getUser'];
    },
    userToken(){
      return this.$store.getters['Client/getUserToken'];
    },
    catalog_settings(){
      return this.$store.getters['Catalog/getCatalog_settings'];
    },
    server(){
      return this.$server;
    },
  },
  methods:{
    openNews(id){
      this.$router.push(`/${this.currentCompanyCatalog}/news-detail/${id}`)
    },
    async  getNews(){
      const options = {
        headers: {"company_url": this.currentCompanyCatalog}
      }
      await this.axios.get(this.url('getNewsWeb'),options)
          .then((response) => {
            console.log(response);
            this.newsArray = response.data.objects;
          })
    },
  },
  beforeCreate() {
    (async () => {
      const options = {
        headers: {"company_url": this.$route.params.bekon,"X-Client-Url": this.$route.params.bekon}
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
            this.checkCatalogStorageLife();
            // $('.overlay_404').show();
          }).catch(function (error){
            if (error.response) {
              console.log('setCatalog_settings EERRRor',error.response)
              let err_page = `
              <div>
                <marquee>
                  <span style="font-size: 30px">404</span>
                </marquee>
              </div>
              `
              $('.overlay_404').html(err_page).show();
            }
          })
    })().catch(err => {
      console.error(err,"setCatalog_settings EEEEERRR");
    });
  },
  created(){
    console.log('@@ created');
    // this.getCatalogSettings();
  },
  mounted() {
    console.log('@@ mounted');
    this.getNews();
    const options = {
      headers: {
        "company_url": this.currentCompanyCatalog,
        "x-access-token": this.userToken,
      }
    }
    if(this.user){
      this.$store.dispatch("Client/updateUserData",{axios:this.axios,url:this.url('getClient',this.user._id),options:options});
    }
  }
}
</script>

<style scoped>
.calendar-news{
  border-bottom: 1px solid #E3E3E3;
  margin-bottom: 10px;
}
.news-text img{
  width: 15px;
  height: 14px;
  margin-bottom: 3px;
  margin-right: 5px;

}
.news-description{
  margin-bottom: 0;
  font-size: 14px;
  color:#858585;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.date{
  color: #B0B0B0;
  margin: 10px 0;
  display: inline-block;
}
.news-content{
  color:#222;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
}
.view-all{
  color: #616CF5;
  text-decoration: none;
  font-size: 16px;
}
.new-img{
  height: 125px;
  width: 100%;
  margin-right: 10px;

}
.new-img img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.new{
  margin-bottom: 70px;
}
.news-title{
  color: #222222;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
}
.news-texts{
  color: #999999;
  font-size: 16px;
  margin-bottom: 14px;
  padding-right: 30px;
}

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
  height: 320px;
  /*background: url('../../../assets/clients/main-box.svg');*/
  background-size: cover;
  position: relative;
  border-radius: 5px;
  margin-bottom: 25px;
}
</style>