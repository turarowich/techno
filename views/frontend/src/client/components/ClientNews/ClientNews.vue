<template>
<div>

  <NewsItem v-bind:news="newsArray"/>
</div>
</template>

<script>
import NewsItem from "@/client/components/ClientNews/NewsItem";
export default {
name: "News",
  components:{
    NewsItem
  },
  data(){
  return{
    newsArray:[],
  }
  },
  computed:{
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
  },
  methods:{
    async  getNews(){
      const options = {
        headers: {"x-client-url": this.currentCompanyCatalog}
      }
      await this.axios.get(this.url('getNewsWeb'),options)
          .then((response) => {
            this.newsArray = response.data.objects;
            this.newsArray.map((item)=>{
              item.updatedAt = this.$moment(String(item.updatedAt)).format('MMMM Do YYYY');
            })
          })
    },
  },
  mounted() {
    this.getNews();
  }
}
</script>

<style scoped>

</style>