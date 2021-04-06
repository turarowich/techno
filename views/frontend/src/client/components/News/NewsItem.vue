<template>
  <div class="news">
    <div class="row">
      <div class="col-4  news-box" v-for="newss in news" :key="newss.id">
        <div class="new-img">
          <img src="../../../assets/clients/Mask.svg">
        </div>
        <span class="date">{{newss.data}}</span>
        <h4 class="news-content">{{newss.name}}</h4>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "NewsItem",
  props:['news']
}
</script>

<style scoped>
.news-box{
  margin-bottom: 37px;
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

  border-radius:5px;
}
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
</style>