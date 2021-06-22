<template>
  <div class="news">
    <div class="row">
      <div class="col-9 m-auto">
        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-6   news-box" v-for="newss in news" :key="newss._id" @click="openNews(newss._id)">
              <div class="new-img">
<!--                <img :src="server+'/'+newss.img">-->
                <img v-if="!newss.error" :src="server+'/'+newss.img" @error="newss.error=true">
                <img v-else src="../../../assets/img/default.svg" >
              </div>
             <div class="news-text">
               <div class="d-flex align-items-center calendar-news" ><img src="../../../assets/icons/Calendar.svg">
                 <span class="date">
                 {{newss.updatedAt.slice(0,10)}}
               </span>
               </div>
               <h4 class="news-content">{{newss.name}}</h4>
               <p class="news-description">
                 {{newss.desc}}
               </p>
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
  computed:{
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
    server(){
      return this.$server;
    },
  },
  methods:{
    openNews(id){
      this.$router.push(`/${this.currentCompanyCatalog}/news-detail/${id}`)
    },
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>