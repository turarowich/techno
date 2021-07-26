<template>
  <div class="container">
<nav class="navigation d-flex  align-items-center justify-content-between">
  <div class="burger" @click="showNavbar">
    <img src="../assets/icons/menu.svg">
  </div>
    <router-link :to="`/${currentCompanyCatalog}`" class="brand-navbar ">
<!--      <div v-if="catalog_settings.logo && catalog_settings.logo !==''"  v-bind:style="{ backgroundImage: 'url(' + server+'/'+catalog_settings.logo + ')' }" class="catalog_logo 2Q">-->
<!--      </div>-->
      <img class="web-catalog-logo" v-if="catalog_settings.logo && catalog_settings.logo !==''" :src="server+'/'+catalog_settings.logo">
      <span v-else >
        {{catalog_settings.name || 'Company Name'}}
      </span>
    </router-link>

<!--    <router-link :to="`/${currentCompanyCatalog}`" class="brand-navbar ">{{catalog_settings.name || 'Company Name'}} </router-link>-->
    <div class="menu-wrapper">
      <div class="mobile-header d-flex justify-content-between align-items-center" >
        <div class="d-flex align-items-center">
          <router-link :to="`/${currentCompanyCatalog}`" class="brand-navbar ">
            <div v-if="catalog_settings.logo && catalog_settings.logo !==''"  v-bind:style="{ backgroundImage: 'url(' + server+'/'+catalog_settings.logo + ')' }" class="catalog_logo Q3">
            </div>
            <span v-else>
              {{catalog_settings.name || 'Company Name'}}
            </span>
          </router-link>
        </div>
        <img @click="removeActive" class="close-nav" src="../assets/icons/xBlack.svg">
      </div>


      <ul class="client-menu">
        <li @click="removeActive" class="client-list"><router-link class="client-link" :to="`/${currentCompanyCatalog}/about`"><img src="../assets/clients/info.svg"/>About us</router-link></li>
        <span class="client-list" v-if="!catalog_settings.catalogMode && !catalog_settings.foodMode">
          <li @click="removeActive" v-if="!isLogged" class="client-list "><router-link class="client-link" :to="`/${currentCompanyCatalog}/signin`"><img  src="../assets/clients/Profile.svg"/>Login</router-link></li>
          <li @click="removeActive"  v-else class="client-list"><img src="../assets/clients/Profile.svg"/><router-link class="client-link" :to="`/${currentCompanyCatalog}/client-account`">My Account</router-link></li>
        </span>

        <li v-if="!catalog_settings.catalogMode"  @click="removeActive" class="client-list mobile-basket">
          <router-link   class="client-link  d-inline-flex align-items-center" :to="`/${currentCompanyCatalog}/basket`" >
            <img src="../assets/clients/Buy.svg"/>Basket
            <div class="bg-not d-flex align-items-center">
              <span class="basket-not" v-if="countOrders > 0">{{countOrders}}</span>
            </div>
          </router-link>
        </li>

        <li  v-if="!catalog_settings.catalogMode"  @mouseover="mouser" @mouseleave="close_drop" class="client-list hoverBasket dropdown">

          <router-link class="client-link  d-inline-flex align-items-center" :to="`/${currentCompanyCatalog}/basket`" >
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
                  <img style="object-fit: contain" v-if="!item.product.error" :src="server+'/'+item.product.img" @error="item.product.error=true">
                  <img v-else src="../assets/icons/no-catalog.svg" >
                </div>
                <div style="display:flex;flex-direction: column;flex: 1;">
                  <div>
                    <h3 class="basket-title">{{item.product.name}}</h3>
                  </div>
                  <div style="display: flex;align-items: center;">
                    <span class="basket-code" style="flex: 3">{{item.product.vendorCode}}</span>
                    <div class="basket-code " style="flex: 2">{{item.quantity}}x</div>
                    <div class="basket-price " style="flex: 2">{{item.product.price}} {{catalog_settings.currency}}</div>
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
      <div class="contact">
        <h3 class="contact-title">Contacts</h3>
        <p class="footer-info"><img src="../assets/clients/Call.svg"><a  href="/">{{companyAddresses[0] ? companyAddresses[0].phone : "+9965002345"}}</a></p>
        <p class="footer-info"><img src="../assets/clients/Message.svg"><a href="/">{{catalog_settings.email || "example@gmail.com"}}</a></p>
      </div>
    </div>

    <div class="basket-menu" v-if="!catalog_settings.catalogMode">
      <div class="bg-not d-flex align-items-center">
        <span class="basket-not" v-if="countOrders > 0">{{countOrders}}</span>
      </div>

      <img   @click="$router.push(`/${currentCompanyCatalog}/basket`)" class="mobile-basket" src="../assets/clients/Buy.svg"/>

    </div>


</nav>
  </div>
  <!--Centered Modal-->
  <div class="parent-modal">
    <div class="modal myModal fade" id="orderStatus"  role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content category-content">
          <div class="modal-header category-header align-items-center">
            <h3 class="modal-title orderStatusText">
            </h3>
            <button type="button" data-dismiss="modal" aria-label="Close" class="close mr-0">
                  <span aria-hidden="true">
                    <img src="../assets/icons/xBlack.svg" alt="">
                  </span>
            </button>
          </div>
        </div>
      </div>
    </div>
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
    //Contacts company
    companyAddresses(){
      return this.$store.getters['Catalog/getCompanyAddresses'];
    },

    user(){
      return this.$store.getters['Client/getUser'];
    },
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
    removeActive(){
      $('.menu-wrapper').removeClass('active')

      $('body').css({'overflow':''})

    },
    showNavbar(){
      $('.menu-wrapper').addClass('active')

      $('body').css({'overflow':'hidden'})



    },
    logout(){
      this.$store.dispatch("Client/logout");
    },
    close_drop(){
        $('.basket-hover').css('visibility', 'hidden');
    },
    mouser(){
      $('.basket-hover').css('visibility', 'visible');
    },
    mouser_leave(){
      $('.basket-hover').css('visibility', 'hidden');
    }
  },
  created() {
    if(this.user) {
      this.socket.on("sendingHey", function (data) {
        $('#orderStatus').modal('show');
        let text = `Order #${data.code} is ${data.status}`;
        $('.orderStatusText').text(text);
      });
    }
  }
}
</script>

<style scoped>
.contact{
  position: absolute;
  bottom: 20px;
  left:20px;
  border-top: 1px solid #e7e7e7;
  width: 88%;
  padding-top: 20px;
  display:none;
}
.router-link-active{
  background: none;
}
.contact-title{
  color: #222222;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 17px;
}
.footer-info{
  margin-bottom: 10px;
  display: block;
  color:#484848;
}
.list-span{
  margin-right: 40px;
}
.web-catalog-logo{
  height:55px;
}
.footer-info img{
  margin-right: 10px;
}
.footer-info a, .footer-info a:hover{
  color:#484848;
  text-decoration: none;
}


.close-nav{
  width: 24px;
  height: 24px;
}

.menu-wrapper.active{
  position: fixed;
  width: 100vw;
  height: 100%;
  z-index:9999;
  top: 0;
  left: 0;
  background: #fafafa;
  padding: 0 20px;
  transition:.4s;
  overflow:hidden;


}
.mobile-basket ,.basket-menu{
  display:none;

}
.mobile-basket{
  width: 26px;
  height: 26px;
}
.basket-menu{
  position: relative;
  padding: 5px;

}
.basket-menu img{
  width: 24px;
  height: 24px;
}
.basket-menu .bg-not{
  position: absolute;
  top:3px;
  right: -2px;
}
.menu-wrapper .mobile-header{
  display:none !important;
}
.menu-wrapper.active .mobile-header{
  display: flex !important;
}
.menu-wrapper.active .client-menu {
  margin: auto;
  display: block;
  padding: 0;
}
.menu-wrapper.active .client-list{
  margin-bottom: 20px;
  margin-right: 0;
}
.client-list img{
  width: 20px;
  height: 20px;
}
.burger{
  display: none;
}

.navigation{
  height: 62px;
  border-bottom: 1px solid #E4E4E4;

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
.basket-title{
  width: 10rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow:hidden;
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
.catalog_logo{
  background-repeat: no-repeat;
  max-height: 55px;
  height: 45px;
  max-width: 45px;
  width: 55px;
  background-size: contain;
  background-position: center;
  border-radius: 5px;
}
@media(min-width:1200px){
  .client-container{
    width: calc(100vw - 240px);
  }
}
@media(max-width:992px){
  .menu-wrapper .client-menu {
    display: none;

  }
  .menu-wrapper{
    position: fixed;
    width: 100vw;
    height: 100%;
    z-index:9999;
    top: 0;
    left: -100vw;
    background: #fafafa;
    padding: 0 20px;
    transition:0.4s;
  }
  .client-link{
    font-size: 16px;
  }
  .burger{
    display: block;
  }
  .mobile-basket, .basket-menu{
    display:block;
  }
  .hoverBasket{
    display:none;
  }
  .contact{
    display:block;
  }

}

</style>