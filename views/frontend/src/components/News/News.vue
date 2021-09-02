<template>
<div class="news">
  <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
        <button v-if="check()" class="app-buttons-item adding-btns" data-toggle="modal" data-target="#add-news"><span>+ Add news</span></button>
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

 <div class="table-content">
   <div v-if="spinner" class="mt-5">
     <Spinner/>
   </div>
   <div v-else>
     <NewsItem v-bind:newsList="newsList" v-on:selectNews="selectNews" v-on:deleteNews="deleteNews"/>
   </div>

 </div>
  <AddNews v-on:getNews="getNews"/>
  <EditNews v-bind:selectedNews="selectedNews" v-on:getNews="getNews"/>
</div>
</template>

<script>
import Spinner from "../Spinner";
import NewsItem from "@/components/News/NewsItem";
import AddNews from "@/modals/news/AddNews";
import EditNews from "@/modals/news/EditNews";
import Swal from 'sweetalert2';
export default {
  name: "News",
  components:{
    NewsItem,
    AddNews,
    EditNews,
    Spinner
  },
  data(){
    return{
      newsListServer:[],
      selectedNews:{},
      search:"",
      spinner:true,
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
    check(access="news", parametr="active", parametr2="canEdit"){
        return this.checkAccess(access, parametr, parametr2)
    },
    getNews(){
        this.axios.get(this.url('getNews'))
            .then((response) => {
                this.newsListServer = response.data.objects;
                this.spinner = false
                console.log(response)
            })
    },
    selectNews(news){
        this.selectedNews = news
    },
    deleteNews(newsID){
        Swal.fire({
        showConfirmButton: true,
        html: 'Are you sure to remove this <br>news',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        buttonsStyling:false,
        customClass:{
          popup: 'sweet-delete',
          confirmButton: 'confirm-btn',
          cancelButton:'cancel-btn',
          actions:'btn-group',
          content:'content-sweet',
          closeButton:'close-btn'
        },
          showClass: {
            popup: 'animate__animated animate__slideInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }


        }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(this.url('deleteNews', newsID))
          .then(()=>{
            this.getNews()
            Swal.fire({
                  title:'Success',
                  timer:1500,
                  text:'News has been removed',
                  showConfirmButton:false,
                  position: 'top-right',
                  customClass:{
                    popup:'success-popup',
                    content:'success-content',
                    title:'success-title',
                    header:'success-header',
                    image:'success-img'
                  },
                  showClass:{
                    popup: 'animate__animated animate__zoomIn'
                  },
                }
            )
          }).catch((error)=>{
                if(error.response && error.response.data){
                    this.$warningAlert(error.response.data.msg)
                }
            });
       }
      })
          
      },
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
.table-content{
  height: calc(100vh - 270px) ;
}

</style>