<template>

    <div class="header d-flex justify-content-between align-items-center">
      <button v-on:click="openSideBar" type="button" id="sidebarCollapse" class="btn">
        <i class="fas fa-align-left"></i>

      </button>
      <div class="total-order">
        <h5 class="route-name">{{$route.name}}</h5>
        <span class="total-order">Total orders: {{total_order}}</span>
      </div>
      <div class="d-flex align-items-center">
      <div class="select-lang dropdown">
        <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <a href="/">Eng <img src="../../assets/icons/Line.svg"></a>
        </div>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
          <ul class="list-group" >
            <li class="list-group-item">English</li>
            <li class="list-group-item">Russian</li>

          </ul>
        </div>

      </div>

      <div class="notification">
        <img src="../../assets/icons/ring.svg">
      </div>

      <div class="user-info d-flex">
        <span class="user-logo">W</span>
        <div class="user-text">
          <h4 class="user-name">Wory Shop</h4>
          <span class="user-tariff">Your tarif is lite</span>
        </div>
        <img src="../../assets/icons/Line.svg">
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
  },
    total_order:Number,
  }
}
</script>

<style scoped>

.total-order span{
  color: #8C94A5;
  font-size: 14px;
  line-height: 17px;
}
.total-order{
  line-height: 17px;
}
.header{
  background: #fff;
  height: 60px;
  padding: 0 30px;
  margin-bottom: 30px;

}
.select-lang a{
  color: #525252;
  font-size: 14px;
}
.notification{
  margin:0 24px;
  cursor: pointer;
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
  border-radius:50%;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor:pointer;
}
.user-text{
  line-height: 17px;
  margin-right: 10px;
}
.user-info img{
  cursor:pointer;
}
#sidebarCollapse{
  display: none;
  padding: 0;
}
@media(max-width:992px){
  #sidebarCollapse{
    display: block;
  }

}
</style>