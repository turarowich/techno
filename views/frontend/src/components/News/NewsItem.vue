<template>
<div class="table-item d-flex align-items-center">
  <div style="width:30%">
    <div  class="d-flex align-items-center">
      <div class="table-img">
        <img src="../../assets/img/sneak.webp">
      </div>
      Referral programm
    </div>

  </div>
  <div style="width:30%">
    21.03.2021
  </div>
  <div style="width:30%">
    <button class="news-btn" @click="sendNewsNotification('609104f146df229b42eb5d83')">
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
          <li class="list-group-item" @click="$router.push('/edit-news')">Edit</li>
          <li class="list-group-item">Delete</li>
        </ul>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "NewsItem",
  methods:{
      sendNewsNotification(newsID){
          console.log(newsID)
          this.socket.emit('send news notification', newsID)
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