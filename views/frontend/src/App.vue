<template>
<div class="d-flex">
  <div class="siding-bar">
    <SideBar/>
  </div>

    <div class="main-content">
      <Header/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header";
import SideBar from "@/components/SideBar";


export default {
  name: 'App',

  components: {
    SideBar,
    Header,
  }
}
</script>

<style scoped>


.main-content{
  width: 85%;
  padding:0 10px;
  background: #F2F6FA;
}
.siding-bar{
  width: 15%;
}

</style>