<template>
  <div class="container client-container">
<nav class="navigation d-flex align-items-center justify-content-between">
    <router-link :to="`/shop/${currentCompanyCatalog}`" class="brand-navbar">Modius <span>Catalog</span></router-link>
    <ul class="client-menu">

      <li class="client-list"><router-link class="client-link" :to="`/shop/${currentCompanyCatalog}/about`"><img src="../assets/clients/info.svg"/>About us</router-link></li>
      <li v-if="!isLogged" class="client-list"><router-link class="client-link" :to="`/shop/${currentCompanyCatalog}/signin`"><img src="../assets/clients/Profile.svg"/>Login</router-link></li>
      <li v-else class="client-list"><img src="../assets/clients/Profile.svg"/><router-link class="client-link" :to="`/shop/${currentCompanyCatalog}/client-account`">My Account</router-link></li>

      <li class="client-list hoverBasket dropdown">

          <router-link class="client-link  d-inline-flex align-items-center" :to="`/shop/${currentCompanyCatalog}/basket`" data-hover="dropdown">
            <img src="../assets/clients/Buy.svg"/>Basket
            <div class="bg-not d-flex align-items-center">
              <span class="basket-not" v-if="countOrders > 0">{{countOrders}}</span>
            </div>
          </router-link>

          <div class="basket-hover">
            <div class="basket-header d-flex align-item-center justify-content-between">
              <h5>Basket</h5>
              <img  class="close-hover mr-0" src="../assets/clients/x.svg">
            </div>
            <div class="line"></div>
            <div class="scroll-basket">
              <div v-for="item in shoppingCart" @click="$router.push('/home/catalog-detail/:'+item.product._id)" :key="item.product._id" class="d-flex align-items-start">
                <div style="width:20%" class="basket-img">
                  <img src="../assets/clients/shirt.svg">
                </div>
                <div style="width:60%">
                  <h3 class="basket-title">{{item.product.name}}</h3>
                  <span class="basket-code">{{item.product.article}}</span>
                </div>
                <div class="basket-price " style="width:20%">{{item.quantity}}x</div>
                <div class="basket-price " style="width:20%">{{item.product.price}} $</div>
              </div>
            </div>
            <button class="save" @click="$router.push({ path: `/shop/${currentCompanyCatalog}/basket` })" >Go to purchasee</button>
          </div>


      </li>
    </ul>
</nav>
    <div class="line"></div>
  </div>
</template>

<script>

export default {
name: "Navbar",
  computed:{
  // ...mapGetters(["Orders/countOrders" ,"Orders/shoppingCart"]),
    countOrders(){
      return this.$store.getters['Orders/countOrders'];
    },
    shoppingCart(){
      return this.$store.state.Orders.shoppingCart;
    },
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
    isLogged(){
      return this.$store.getters['Client/getUserStatus'];
    },
  },
  methods:{
    logout(){
      this.$store.dispatch("Client/logout");
    },
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
  margin-right: 42px;
  cursor: pointer;
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
  height: 100%;
  width: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 9px;
  color:#fff;
  transition:.3s;
}
.bg-not{
  height: 14px;
  width: 14px;
  background: transparent;
  margin-left: 7px;
}

.basket-hover{
  background: #FFFFFF;
  width: 20rem;
  box-shadow: 2px 11px 35px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  padding-bottom:24px;
  transition: .3s;
  position: absolute;
  right:0;
  top: 100px;
  margin: 0;
  z-index: 99;
  opacity: 0;
  visibility: hidden;

}
.hoverBasket:hover .basket-hover{
  opacity: 1;
  top: 30px;
  visibility: visible;
}
.basket-hover .save{
  width:100%;
}
.basket-header{
  padding-bottom:10px;
}
.basket-header h5{
  color:#222;
  font-weight: 600;
  font-size: 20px;
}
.basket-img{
  height:60px;
  margin-right: 20px;
  margin-bottom: 10px;
}
.basket-img img{
  width: 100%;
  height: 100%;
}
.basket-title{
  font-size:16px;
  font-weight: normal;
  margin-bottom: 4px;
}
.basket-code{
  color: #B0B0B0;
}
.basket-price{
  font-size: 18px;
  font-weight: normal;
  padding-top: 10px;
}
.scroll-basket{
  height: 250px;
  overflow-y: auto;
}
</style>