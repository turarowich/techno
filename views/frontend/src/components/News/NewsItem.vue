<template>
<div>
    <div v-for="news in  newsList" :key="news._id" class="table-item d-flex align-items-center">
        
        <div style="width:30%">
            <div  class="d-flex align-items-center">
                <div class="table-img">
                    <img :src="makeImg(news.img)">
                </div>
                <p class="w-auto  of-ellipsis mb-0">
                    {{news.name}}
                </p>
            </div>
        </div>
        <div style="width:30%">
            {{news.updatedAt.slice(0, 10)}}
        </div>
        <div style="width:30%">
            <button class="news-btn" @click="sendNewsNotification(news._id)">
            <img src="../../assets/icons/notification1.svg">
            </button>
        </div>
        <div style="width:10%" class="d-flex justify-content-end" >
            <div class="dropleft dropMenu">
            <div class="dropdown-toggle d-flex justify-content-end" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img  src="../../assets/icons/three-dots.svg"
                    class="three-dots">
            </div>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
                <ul class="list-group">
                <li class="list-group-item"  data-toggle="modal" data-target="#edit-news" @click="$emit('selectNews', news)">Edit</li>
                <li class="list-group-item" v-on:click="$emit('deleteNews' ,news._id)">Delete</li>
                </ul>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "NewsItem",
  props:['newsList'],
  methods:{
      sendNewsNotification(newsID){
          this.axios.get(this.url('sendNewsPN', newsID))
            .then(() => {
                this.$successAlert('Notification is send')
            }).catch((error)=>{
                if(error.response && error.response.data){
                    this.$warningAlert(error.response.data.msg)
                }
            });
      },
      makeImg(name){
        return this.img(name)
      }
  }
}
</script>

<style scoped>
.news-btn{
  border:none;
  background: #E9ECFF;
  border-radius: 5px;
  width: 34px;
  height: 34px;
}
.table-item{
 padding: 10px 40px;
}
</style>