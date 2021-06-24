<template>
<div class="container">
  <div class="row news-detail">
    <div class="col-lg-9 m-auto">
      <div class="d-flex align-items-center justify-content-between path-box ">
        <div class="d-flex align-items-center" @click="$router.go(-1)">
          <img class="mr-3" src="../../../assets/clients/slide.svg">
          <h3 class="path-title">
            {{newsObject.name}}
          </h3>
        </div>
        <span class="news-date">12 Dec 2021</span>
      </div>

      <div class="new-item">
        <!--      <img :src="server+'/'+newsObject.img" @error="$event.target.src=`http://example.com/default.jpg`">-->
        <img v-if="!newsObject.error" :src="server+'/'+newsObject.img" @error="newsObject.error=true">
        <img v-else src="../../../assets/img/default.svg" >
      </div>
      <p class="client-paragraph">
        {{newsObject.desc}}
      </p>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: "NewsDetail",
  data(){
    return{
      newsObject:{
        name:'',
        desc:'',
      },
    }
  },
  computed:{
    this_route(){
      return this.$route.params.id;
    },
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
    server(){
      return this.$server;
    },
  },
  methods:{
    async  getOneNews(){
      const options = {
        headers: {"x-client-url": this.currentCompanyCatalog}
      }
      await this.axios.get(this.url('getSingleNewsWeb',this.$route.params.id),options)
          .then((response) => {
            console.log(response);
            this.newsObject = response.data.object;

          })
    },
  },
  mounted() {
    this.getOneNews();
  }
}
</script>

<style scoped>
.new-item{
  height: 300px;
  margin-bottom: 50px;
}
.new-item img{
  width: 100%;
  height: 100%;
  object-fit:cover;
  border-radius: 5px;
}
.news-detail{
  margin-top: 48px;
}
.path-box{
  margin-bottom: 38px;
}
.news-date{
  color: #858585;
}
</style>