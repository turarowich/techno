<template>
<div class="container client-container">
  <div class="main-box" v-bind:style="{ backgroundImage: 'url(' + bannerPath + ')' }" >
    <div class="relatives">
      <h1>Modius </h1>
      <p>Brand clothing store</p>
    </div>
  </div>
  <div class="new">    <div class="news">

      <div class="row">
<!--        <div class="col-lg-3 ">-->
<!--          <h2 class="news-title">News</h2>-->
<!--          <p class="news-texts">A light blue T-shirt from the spring-summer 2021 collection,-->
<!--            as if faded in the sun, turned out to be as comfortable as possible. The cut of</p>-->
<!--          <router-link class="view-all" :to="`/shop/${currentCompanyCatalog}/client-news`">View all</router-link>-->
<!--        </div>-->

        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6 pl-0" @click="openNews">
              <div class="new-img">
                <img src="../../../assets/clients/mask3.svg">
              </div>
              <div class="news-text">
                <div class="d-flex align-items-center calendar-news" ><img src="../../../assets/icons/Calendar.svg"><span class="date">12.03.1992</span></div>
                <h4 class="news-content">New promotion, buy everything with a 20% discount!!!</h4>
                <p class="news-description">A light blue T-shirt from the spring-summer 2021 collection, as if faded in the sun, turned ou dettect...</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 pl-0" @click="openNews">
              <div class="new-img">
                <img src="../../../assets/clients/mask3.svg">
              </div>
              <div class="news-text">
                <div class="d-flex align-items-center calendar-news" ><img src="../../../assets/icons/Calendar.svg"><span class="date">12.03.1992</span></div>
                <h4 class="news-content">New promotion, buy everything with a 20% discount!!!</h4>
                <p class="news-description">A light blue T-shirt from the spring-summer 2021 collection, as if faded in the sun, turned ou dettect...</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 pl-0" @click="openNews">
              <div class="new-img">
                <img src="../../../assets/clients/mask3.svg">
              </div>
              <div class="news-text">
                <div class="d-flex align-items-center calendar-news" ><img src="../../../assets/icons/Calendar.svg"><span class="date">12.03.1992</span></div>
                <h4 class="news-content">New promotion, buy everything with a 20% discount!!!</h4>
                <p class="news-description">A light blue T-shirt from the spring-summer 2021 collection, as if faded in the sun, turned ou dettect...</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 pl-0" @click="openNews">
              <div class="new-img">
                <img src="../../../assets/clients/mask3.svg">
              </div>
              <div class="news-text">
                <div class="d-flex align-items-center calendar-news" ><img src="../../../assets/icons/Calendar.svg"><span class="date">12.03.1992</span></div>
                <h4 class="news-content">New promotion, buy everything with a 20% discount!!!</h4>
                <p class="news-description">A light blue T-shirt from the spring-summer 2021 collection, as if faded in the sun, turned ou dettect...</p>
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
export default {
name: "Dashboard",
  components:{
    ClientCatalog
  },
  data(){
    return{
      settings:{},
    }
  },
  computed:{
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
    bannerPath(){
      if(this.settings.banner){
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
  },
  methods:{
    openNews(){
      this.$router.push('/home/news-detail')
    },
    async  getCatalogSettings(){
      let that = this;
      const options = {
        headers: {"company_url": this.currentCompanyCatalog}
      }
      await this.axios.get(this.url('getCatalogSettings'),options)
          .then((response) => {
            console.log(response,"cattttttsssssssss");
            this.$store.dispatch("Catalog/setCompany_addresses",response.data.branches);
            this.$store.dispatch("Catalog/setCompany_delivery_options",response.data.deliveries);
            this.settings = response.data.object;
          }).catch(function (error){
            if (error.response) {
              // console.log(error.response.status);
              // console.log(error.response.headers);
              that.$warningAlert('Requested shop was not found, check url')
            }
          })
    },
  },
  created(){
    this.getCatalogSettings();
  },
  mounted() {
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
.news-text{
  background: #F8F9FB;
  padding: 10px 20px;
}
.news-text img{
  width: 15px;
  height: 14px;
  margin-bottom: 3px;
  margin-right: 5px;
}
.news-description{
  font-size: 14px;
  color:#858585;
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
  margin-bottom: 50px;
}
</style>