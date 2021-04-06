<template>
<div>
  <div class="line mt-0"></div>
  <NewsItem v-bind:news="news"/>
</div>
</template>

<script>
import NewsItem from "@/client/components/News/NewsItem";
export default {
name: "News",
  components:{
    NewsItem
  },
  data(){
  return{
    news:[
      {id:1, data:'12 Dec 2021', name:'New promotion, buy everything with a 20% discount!!!'},
      {id:2, data:'12 Dec 2021', name:'New promotion, buy everything with a 20% discount!!!'},
      {id:3, data:'12 Dec 2021', name:'New promotion, buy everything with a 20% discount!!!'},
      {id:4, data:'12 Dec 2021', name:'New promotion, buy everything with a 20% discount!!!'},
      {id:5, data:'12 Dec 2021', name:'New promotion, buy everything with a 20% discount!!!'},
      {id:6, data:'12 Dec 2021', name:'New promotion, buy everything with a 20% discount!!!'},
      {id:7, data:'12 Dec 2021', name:'New promotion, buy everything with a 20% discount!!!'},
      {id:8, data:'12 Dec 2021', name:'New promotion, buy everything with a 20% discount!!!'},
      {id:9, data:'12 Dec 2021', name:'New promotion, buy everything with a 20% discount!!!'},
    ]
  }
  }
}
</script>

<style scoped>

</style>