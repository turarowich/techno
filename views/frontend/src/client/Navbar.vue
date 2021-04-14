<template>
  <div>
<nav class="navigation d-flex align-items-center justify-content-between">
    <a href="/home" class="brand-navbar">Modius <span>Catalog</span></a>
    <ul class="client-menu">
      <li class="client-list"><router-link class="client-link" to="/home/about"><img src="../assets/clients/info.svg"/>About us</router-link></li>
      <li class="client-list"><router-link class="client-link" to="/home/news"><img src="../assets/clients/Profile.svg"/>Login</router-link></li>
      <li class="client-list"><router-link class="client-link d-inline-flex align-items-center" to="/home/basket"><img src="../assets/clients/Buy.svg"/>Basket <span class="basket-not" v-if="countOrders > 0">{{countOrders}}</span></router-link></li>
    </ul>
</nav>

    <div class="line"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
name: "Navbar",
  computed:{
  ...mapGetters(["countOrders"])
  },

}
</script>

<style scoped>
.navigation{
  height: 62px;
}
.brand-navbar{
  color: #222222;
font-size: 18px;
  text-decoration: none;
  font-weight:normal ;
}
.brand-navbar span{
  font-weight: 600;
}
.client-menu{
  margin-bottom: 0;
  display: flex;
}
.client-list{
  list-style-type:none ;
  margin-right: 50px;
}
.client-list:last-child{
  margin-right: 0;
}
.client-list img{
  margin-right: 10px;
}
.client-link{
  font-weight: normal;
  color: #222222;
  text-decoration: none;
font-size: 14px;
}
.basket-not{
  background: #616CF5;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 9px;
  margin-left: 7px;
  color:#fff;
}
</style>