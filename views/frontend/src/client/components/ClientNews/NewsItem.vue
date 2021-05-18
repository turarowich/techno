<template>
  <div class="news">
    <div class="row">
      <div class="col-9 m-auto">
        <div class="row">
            <div class="col-4  news-box" v-for="newss in news" :key="newss.id" @click="openNewsDetail">
              <div class="new-img">
                <img src="../../../assets/clients/mask3.svg">
              </div>
             <div class="news-text">
               <div class="d-flex align-items-center calendar-news" ><img src="../../../assets/icons/Calendar.svg"><span class="date">{{newss.data}}</span></div>
               <h4 class="news-content">{{newss.name}}</h4>
               <p class="news-description">A light blue T-shirt from the spring-summer 2021 collection, as if faded in the sun, turned ou dettect...</p>
             </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsItem",
  props:['news'],
  methods:{
    openNewsDetail(){
      this.$router.push('/home/news-detail')
    }
  }
}
</script>

<style scoped>
.news-box{
  margin-bottom: 37px;
}
.calendar-news{
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: 10px;
  padding-bottom: 8px;
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
.date{
  color: #858585;
  font-size: 14px;

}
.news-content{
  color:#222;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
}
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
</style>