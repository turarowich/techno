<template>
<div class="d-flex">

  <div class="siding-bar">
    <SideBar v-bind:closeSideBar="closeSideBar"/>
  </div>

    <div class="main-content">
      <Header v-bind:openSideBar="openSideBar"/>
      <div class="router-view">
          <router-view/>
      </div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Header from "@/components/header/Header";
import SideBar from "@/components/SideBar";


export default {
  name: 'App',

  components: {
    SideBar,
    Header,
  },
  methods:{
    openSideBar(){
        $('.siding-bar').addClass('active');
      },
    closeSideBar(){
      $('.siding-bar').removeClass('active')
    }
  }
}
</script>

<style scoped>
.main-content{
  width: 85%;
  background: #F2F6FA;
  margin-left: 250px;
}
.siding-bar{
  min-width: 250px;
  max-width: 250px;
  position: fixed;
}
.router-view{
  margin: 0 10px;
  overflow: auto;
}

@media (max-width: 992px) {
  .siding-bar {
    margin-left: -250px;
    transition: .4s;
  }
  .siding-bar.active {
    margin-left: 0;
    transition: .4s;
  }
  .main-content{
    width: 100%;
    margin-left: 0;
  }
}



</style>