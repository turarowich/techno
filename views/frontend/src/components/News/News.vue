<template>
<div class="news">
  <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
        <button class="app-buttons-item adding-btns" data-toggle="modal" data-target="#add-category"><span>+ Add news</span></button>
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

  <NewsItem/>
  <NewsItem/>
  <NewsItem/>
</div>
</template>

<script>
import NewsItem from "@/components/News/NewsItem";
export default {
  name: "News",
  components:{
    NewsItem
  }
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