<template>
  <div class="container client-container">
<nav class="navigation d-flex align-items-center justify-content-between">
    <router-link :to="`/${currentCompanyCatalog}`" class="brand-navbar">{{catalog_settings.name || 'Company Name'}} <span>Catalog</span></router-link>
    <ul class="client-menu">

      <li class="client-list"><router-link class="client-link" :to="`/${currentCompanyCatalog}/about`"><img src="../assets/clients/info.svg"/>About us</router-link></li>
      <li v-if="!isLogged" class="client-list"><router-link class="client-link" :to="`/${currentCompanyCatalog}/signin`"><img src="../assets/clients/Profile.svg"/>Login</router-link></li>
      <li v-else class="client-list"><img src="../assets/clients/Profile.svg"/><router-link class="client-link" :to="`/${currentCompanyCatalog}/client-account`">My Account</router-link></li>

      <li @mouseover="mouser" @mouseleave="close_drop" class="client-list hoverBasket dropdown">

          <router-link  class="client-link  d-inline-flex align-items-center" :to="`/${currentCompanyCatalog}/basket`" >
            <img src="../assets/clients/Buy.svg"/>Basket
            <div class="bg-not d-flex align-items-center">
              <span class="basket-not" v-if="countOrders > 0">{{countOrders}}</span>
            </div>
          </router-link>

          <div class="basket-hover">
            <div class="basket-header d-flex align-item-center justify-content-between">
              <h5>Basket</h5>
              <img @click="close_drop" class="close-hover mr-0"  src="../assets/clients/x.svg">
            </div>
            <div class="line"></div>
            <div class="scroll-basket">
              <div v-for="item in shoppingCart" :key="item.product._id" class="d-flex align-items-start">
                <div style="flex: 0 0 60px;" class="basket-img">
                  <img v-if="!item.product.error" :src="server+'/'+item.product.img" @error="item.product.error=true">
                  <img v-else src="../assets/img/default.svg" >
                </div>
                <div style="display:flex;flex-direction: column;flex: 1;">
                  <div>
                    <h3 class="basket-title">{{item.product.name}}</h3>
                  </div>
                  <div style="display: flex;align-items: center;">
                    <span class="basket-code" style="flex: 3">{{item.product.vendorCode}}</span>
                    <div class="basket-code " style="flex: 2">{{item.quantity}}x</div>
                    <div class="basket-price " style="flex: 2">{{item.product.price}} $</div>
                  </div>
                </div>
              </div>

              <div v-if="shoppingCart.length===0" class="d-flex" style="justify-content: center;align-items: center;flex-direction: column;height: 100%;">
                  <img src="../assets/img/empty_basket.svg" >
                  <span class="empty_basket_title">
                    Basket is empty
                  </span>
              </div>
            </div>
            <button v-if="shoppingCart.length>0" class="save" @click="$router.push({ path: `/${currentCompanyCatalog}/basket` })" >Go to purchasee</button>
          </div>
      </li>
    </ul>
</nav>
    <div class="line"></div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: "Navbar",
  data(){
    return{
      show_mini_basket:false,
    }
  },
  computed:{
  // ...mapGetters(["Orders/countOrders" ,"Orders/shoppingCart"]),
    company_url_basket(){
      return this.$store.getters['Orders/getCompany_url_basket'];
    },
    countOrders(){
      if(this.currentCompanyCatalog!==this.company_url_basket){
        return 0;
      }
      return this.$store.getters['Orders/countOrders'];

    },
    shoppingCart(){

      if(this.currentCompanyCatalog!==this.company_url_basket){
        return [];
      }
      return this.$store.state.Orders.shoppingCart;
    },
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
    catalog_settings(){
      return this.$store.getters['Catalog/getCatalog_settings'];
    },
    isLogged(){
      return this.$store.getters['Client/getUserStatus'];
    },
    server(){
      return this.$server;
    },
  },
  methods:{
    logout(){
      this.$store.dispatch("Client/logout");
    },
    close_drop(){
        $('.basket-hover').css('visibility', 'hidden');
    },
    mouser(){
      $('.basket-hover').css('visibility', 'visible');
      console.log('DADASASASASS');
    },
    mouser_leave(){
      $('.basket-hover').css('visibility', 'hidden');
      console.log('DADASASASASS');
    }
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
  margin-top: 10px;
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
  overflow: hidden;
  text-overflow: ellipsis;
  max-width:179px ;
}
.basket-code{
  color: #B0B0B0;
  overflow: hidden;
  text-overflow: ellipsis;
}
.basket-price{
  font-size: 18px;
  font-weight: normal;
}
.scroll-basket{
  height: 250px;
  overflow-y: auto;
}
.empty_basket_title{
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #B0B0B0;
}
</style>