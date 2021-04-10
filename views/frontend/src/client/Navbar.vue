<template>
  <div>
<nav class="navigation d-flex align-items-center justify-content-between">
    <a href="/" class="brand-navbar">Modius <span>Catalog</span></a>
    <ul class="client-menu">
      <li class="client-list"><router-link class="client-link" to="/home/about"><img src="../assets/clients/info.svg"/>About us</router-link></li>
      <li class="client-list"><router-link class="client-link" to="/home/news"><img src="../assets/clients/Profile.svg"/>Login</router-link></li>
      <li class="client-list"><router-link class="client-link" to="/home/basket"><img src="../assets/clients/Buy.svg"/>Basket</router-link></li>
    </ul>
</nav>

    <div class="line"></div>
  </div>
</template>

<script>
export default {
name: "Navbar"
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
}
.client-list{
  display: inline-block;
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
</style>