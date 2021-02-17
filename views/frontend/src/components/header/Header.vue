<template>
  <div class="main-page">
    <div class="header d-flex align-items-center">
      <button v-on:click="openSideBar" type="button" id="sidebarCollapse" class="btn">
        <i class="fas fa-align-left"></i>

      </button>
      <div class="d-flex ">
      <div class="select-lang">
        <a href="/">Eng <img src="../../assets/icons/Line.svg"></a>
      </div>

      <div class="notification">
        <img src="../../assets/icons/notification.svg">
        <img src="../../assets/icons/doubt.svg">
      </div>

      <div class="user-info d-flex">
        <span class="user-logo">W</span>
        <div class="user-text">
          <h4 class="user-name">Wory Shop</h4>
          <span class="user-tariff">tarif: lite</span>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Header",
  props:{
  openSideBar:{
    type:Function
  }
  }
}
</script>

<style scoped>
.header{
  background: #fff;
  padding:10px 50px;
  height:55px;
  margin-bottom: 10px;
  justify-content:flex-end;

}

.select-lang a{
  color: #525252;
  font-size: 14px;
}
.notification{
  padding:0 10px;
  border-right:1px solid #e8e8e8;
  border-left:1px solid #e8e8e8;
  margin:0 20px;
  cursor: pointer;
}
.notification img:first-child{
  margin-right: 10px;
}
.user-name{
  font-size: 16px;
  margin-bottom: 0;
  font-weight:500;
  cursor:pointer;
}
.user-tariff{
  color: #BABABA;
  font-size: 14px;
}
.user-logo{
  width: 34px;
  height: 34px;
  background: #4257D0;
  color:#fff;
  border-radius:5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor:pointer;
}
.user-text{
  line-height: 17px;
}
#sidebarCollapse{
  display: none;
}
@media(max-width:992px){
  #sidebarCollapse{
    display: block;
  }
  .header{
    justify-content: space-between;
  }
}
</style>