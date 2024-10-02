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
        <div class="d-flex align-items-center" @click="removeActive">
          <router-link  :to="`/${currentCompanyCatalog}`" class="brand-navbar ">
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
        <li @click="removeActiveFromLink" class="client-list"><router-link class="client-link" :to="`/${currentCompanyCatalog}/about`"><img src="../assets/clients/info.svg"/>О нас</router-link></li>
        <li @click="removeActiveFromLink" v-if="!isLogged" class="client-list "><router-link class="client-link" :to="`/${currentCompanyCatalog}/signin`"><img  src="../assets/clients/Profile.svg"/>Войти</router-link></li>
        <li @click="removeActiveFromLink"  v-else class="client-list"><img src="../assets/clients/Profile.svg"/><router-link class="client-link" :to="`/${currentCompanyCatalog}/client-account`">Профиль</router-link></li>
        <!------------  Mobile list item корзина  -------------->

        <!-- <li v-if="!catalog_settings.catalogMode"  @click="removeActiveFromLink" class="client-list mobile-basket">
          <router-link   class="client-link  d-inline-flex align-items-center" :to="`/${currentCompanyCatalog}/basket`" >
            <img src="../assets/clients/Buy.svg"/>Basket
            <div v-if="countOrders > 0" class="bg-not d-flex align-items-center">
              <span >{{countOrders}}</span>
            </div>
          </router-link>
        </li> -->

        <!------------  Chat with Manager  -------------->

        <router-link class="client-link  d-inline-flex align-items-center" v-if="isLogged" :to="`/${currentCompanyCatalog}/basket`" >
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#616CF5"><g data-name="telegram social media network chat" id="telegram_social_media_network_chat"><path d="M28.59,4.29a2.23,2.23,0,0,0-2.27-.36L3.41,13.1a1.83,1.83,0,0,0,0,3.38l1.48.61a1,1,0,0,0,1.31-.53,1,1,0,0,0-.54-1.31L4.56,14.8l22.51-9a.22.22,0,0,1,.23,0,.24.24,0,0,1,.08.23L23.27,25.21a.4.4,0,0,1-.26.3.39.39,0,0,1-.39-.06l-8-6.24,7.83-7.91a1,1,0,0,0-1.22-1.56L9.75,16.54a1,1,0,1,0,1,1.72l4.83-2.85L13.23,17.8a2,2,0,0,0,.2,3.08l8,6.15a2.4,2.4,0,0,0,1.47.5,2.47,2.47,0,0,0,.83-.15,2.37,2.37,0,0,0,1.52-1.75L29.33,6.47A2.23,2.23,0,0,0,28.59,4.29Z"/></g></svg>
        </router-link> 
        <!-------------  Desktop list item корзина -------------->

        <li  v-if="!catalog_settings.catalogMode"  @mouseover="mouser" @mouseleave="close_drop" class="client-list hoverBasket dropdown">
          <!-- <router-link class="client-link  d-inline-flex align-items-center" :to="`/${currentCompanyCatalog}/basket`" >
            <img src="../assets/clients/Buy.svg"/>Basket
            <div v-if="countOrders > 0" class="bg-not d-flex align-items-center">
              <span  >{{countOrders}}</span>
            </div>
          </router-link> -->

<!----------------  Блок при ховера на корзину ---------------------->
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
                  <div style="display: flex;align-items: center; justify-content: space-between">
                    <span class="basket-code" >{{item.product.vendorCode}}</span>
                    <div class="basket-code " >{{item.quantity}}x</div>
                    <div class="basket-price " >{{item.product.price}} {{catalog_settings.currency}}</div>
                  </div>
                </div>
              </div>

              <div v-if="shoppingCart.length===0" class="d-flex" style="justify-content: center;align-items: center;flex-direction: column;height: 100%;">
                <img src="../assets/img/empty_basket.svg" class="mb-2" >
                <span class="empty_basket_title">
                    Basket is empty
                  </span>
              </div>
            </div>
            <button v-if="shoppingCart.length>0" class="save" @click="$router.push({ path: `/${currentCompanyCatalog}/basket` })" >Go to purchasee</button>
          </div>
        </li>
        <li v-if="isLogged"  @click="removeActive" class="client-list log-out"><span @click="logout" class="client-link"><img src="../assets/icons/Logout-mobile.svg"/>Log out</span></li>

      </ul>
<!---------------- Контакты в мобильной меню  ---------------------->
      <div class="contact">
        <h3 class="contact-title">Контакты</h3>
        <p class="footer-info"><img src="../assets/clients/Call.svg"><a  href="/">{{companyAddresses[0] ? companyAddresses[0].phone : "+9965002345"}}</a></p>
        <p class="footer-info"><img src="../assets/clients/Message.svg"><a href="/">{{catalog_settings.email || "example@gmail.com"}}</a></p>
      </div>
    </div>

  <!--------------- Фон меню в мобилке ---------------------------->
      <div class="backdrop-menu"></div>

<!-----------------  Мобильная корзина ------------------------------->
      <div class="basket-menu" v-if="!catalog_settings.catalogMode">
        <div  v-if="countOrders > 0" class="bg-not d-flex align-items-center">
          <div>{{countOrders}}</div>
        </div>
        <img  @click="$router.push(`/${currentCompanyCatalog}/basket`)" class="mobile-basket" src="../assets/clients/Buy.svg"/>
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
    removeActiveFromLink(){
      console.log("removeActiveFromLink","imp");
      $('.menu-wrapper').removeClass('active')
      setTimeout(()=>{
        $('.backdrop-menu').removeClass('active')
      },400)
      document.body.style.top = 0;
      document.body.style.position = '';
    },
    removeActive(){
      console.log("removeActive","imp");
      $('.menu-wrapper').removeClass('active')
      setTimeout(()=>{
        $('.backdrop-menu').removeClass('active')
      },400);
      const scrollY = document.body.style.top;
      document.body.style.top = '';
      document.body.style.position = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    },
    showNavbar(){
      console.log("showNavbar","imp");
      $('.menu-wrapper').addClass('active')
      $('.backdrop-menu').addClass('active')
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    },
    logout(){
      this.$store.dispatch("Client/logout");
      this.$store.dispatch("Orders/clearAll");
      this.$router.push({ path: `/${this.currentCompanyCatalog}`});
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
  },

}
</script>

<style scoped>
.backdrop-menu.active{
  display: block;
}
.backdrop-menu{
  display: none;
  width: 100%;
  height:100%;
  position: fixed;
  top:0;
  left: 0;
  background: #000;
  opacity:0.5;
  z-index:99;
}
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
  height:45px;
}
.footer-info img{
  margin-right: 10px;
}
.footer-info a, .footer-info a:hover{
  color:#484848;
  text-decoration: none;
}

.log-out{
  display: none;
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
  top:0;
  right:0;


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
.client-list.hoverBasket{
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

.bg-not{
  height: 14px;
  width: 14px;
  background: #616cf5;
  margin-left: 7px;
  color:#fff;
  border-radius: 50%;
  justify-content: center;
  font-size:10px;
  align-items:center;

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
  border-radius: 5px;
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
  margin-top: 20px;
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
  max-height: 250px;
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
  .log-out{
    display: block;
  }
  .menu-wrapper{
    position: fixed;
    width: 100vw;
    height: 100vh;
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