<template>
<div class="container client-container">
  <div class="main-box">
    <div class="relatives">
      <h1>Modius </h1>
      <p>Brand clothing store</p>
    </div>

  </div>
  <div class="new">
    <div class="news">
      <div class="row">
        <div class="col-lg-3 ">
          <h2 class="news-title">News</h2>
          <p class="news-text">A light blue T-shirt from the spring-summer 2021 collection,
            as if faded in the sun, turned out to be as comfortable as possible. The cut of</p>
          <router-link class="view-all" to="/home/news">View all</router-link>
        </div>
        <div class="col-lg-9">
          <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-6 pl-0" @click="openNews">
              <div class="new-img">
                <img src="../../../assets/clients/Mask.svg">
              </div>
              <span class="date">12 Dec, 2021</span>
              <h4 class="news-content">New promotion, buy everything with a 20% discount!!!</h4>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 pl-0" @click="openNews">
              <div class="new-img">
                <img src="../../../assets/clients/mask2.svg">
              </div>
              <span class="date">12 Dec, 2021</span>
              <h4 class="news-content">New promotion, buy everything with a 20% discount!!!</h4>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 pl-0" @click="openNews">
              <div class="new-img">
                <img src="../../../assets/clients/mask3.svg">
              </div>
              <span class="date">12 Dec, 2021</span>
              <h4 class="news-content">New promotion, buy everything with a 20% discount!!!</h4>
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
  methods:{
    openNews(){
      this.$router.push('/home/news-detail')
    },
  }
}
</script>

<style scoped>
.date{
  color: #B0B0B0;
  margin: 10px 0;
  display: inline-block;
}
.news-content{
  color:#222;
  font-size: 16px;
  font-weight: 600;
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
  border-radius:5px ;
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
.news-text{
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
  background: url('../../../assets/clients/main-box.svg');
  position: relative;
  border-radius: 5px;
  margin-bottom: 50px;


}
</style>