<template>
<div class="d-flex">

  <div class="siding-bar">
    <SideBar v-bind:closeSideBar="closeSideBar"
              v-bind:count_order="count_order"
    />
  </div>

    <div class="main-content">
      <Header v-if="$route.name !== 'Settings'" v-bind:openSideBar="openSideBar"
              v-bind:total_order="total_order"/>
      <div  class="router-view">
          <router-view @countNewOrder="countNewOrder"
                        @totalOrders="totalOrders"
              />
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
  data(){
    return{
      count_order: 0,
      total_order:0
    }
  },
  methods:{
    openSideBar(){
        $('.siding-bar').addClass('active');
      },
    closeSideBar(){
      $('.siding-bar').removeClass('active')
    },
    countNewOrder(count_order){
      this.count_order = count_order
    },
    totalOrders(total){
      this.total_order= total;
    },
  },
}
</script>

<style scoped>
@font-face {
  font-family:"SF Pro Display";
  font-weight:normal
}
.main-content{
  width: calc(100% - 250px);
  margin-left: 250px;
  font-size: 14px;
  height:100vh;
  overflow: hidden;
}
.router-view{
  height: 100%;
}
.siding-bar{
  min-width: 250px;
  max-width: 250px;
  position: fixed;
  z-index:999;
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