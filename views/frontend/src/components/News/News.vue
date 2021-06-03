<template>
<div class="news">
  <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
        <button class="app-buttons-item adding-btns" data-toggle="modal" data-target="#add-news"><span>+ Add news</span></button>
      </div>
    </div>
    <div class="main-search d-flex align-items-center ">
      <img src="../../assets/icons/search-icon.svg">
      <input class="main-input" type="text" placeholder="Search" v-model="search">
    </div>
  </div>
  <div class="d-flex main-content-header">
    <div class="table-head" style="width: 30%;">Title</div>
    <div class="table-head" style="width: 30%;">Recent changes</div>
    <div class="table-head" style="width: 30%;">Action</div>
    <div class="table-head" style="width: 10%;"></div>

  </div>

  <NewsItem v-bind:newsList="newsList" v-on:selectNews="selectNews"/>
  <AddNews v-on:getNews="getNews"/>
  <EditNews v-bind:selectedNews="selectedNews" v-on:getNews="getNews"/>
</div>
</template>

<script>
import NewsItem from "@/components/News/NewsItem";
import AddNews from "@/modals/news/AddNews";
import EditNews from "@/modals/news/EditNews";
export default {
  name: "News",
  components:{
    NewsItem,
    AddNews,
    EditNews
  },
  data(){
    return{
      newsListServer:[],
      selectedNews:{},
      search:""
    }
  },
  computed:{
        newsList() {
            return this.newsListServer.filter((news) =>{
                if(news.name.toLowerCase().includes(this.search.toLowerCase())){
                    return true
                }
                return false
            });
        }
  },
  methods:{
    getNews(){
        this.axios.get(this.url('getNews'))
            .then((response) => {
                this.newsListServer = response.data.objects;
            })
    },
    selectNews(news){
        this.selectedNews = news
    }
  },
  mounted(){
    this.socket.on("server news notification", function(data) {
        console.log(data)
    })
    this.getNews()
  },
  
}
</script>

<style scoped>
.news{
  margin:0 30px;
}
.main-content-header{
  padding-left: 40px;
  padding-right: 40px;
}
</style>