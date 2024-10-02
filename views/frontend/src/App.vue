<template>
  <div class="d-flex">
    <div class="siding-bar" v-if="!$route.meta.hideNavbar">
      <SideBar v-bind:closeSideBar="closeSideBar"  v-show="!$route.path.includes('/shop')"/>
    </div>
    <div class="main-content" v-bind:class="{hun: $route.name === 'SignUp' || $route.name === 'Admin'  || $route.name === 'SignIn' || $route.name === 'Home' || $route.meta.hideNavbar} ">
        <Header  v-if="homePage()"  v-bind:openSideBar="openSideBar"/>
        <NewMessageAlert v-if="homePage()"/>
        <div  class="router-view">
          <router-view/>
        </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Header from "@/components/header/Header";
import NewMessageAlert from "@/components/chats/NewMessageAlert";
import SideBar from "@/components/SideBar";

export default {
  name: "App",

  components: {
    Header,
    SideBar,
    NewMessageAlert
  },

    methods: {
    homePage(){
      if(['Home','Settings','SignIn', 'SignUp', 'OrderDetail','EditClientPage', 'PushNotification',
            'EditProductPage','IndividualPush','EditPromo','AddPromoPage','AddProductPage','AccessSettings','AddNews','EditNews','AddOrder'].includes(this.$route.name) || this.$route.meta.hideNavbar

      ){
        return false
      }
      else{
        return true
      }
    },
      openSideBar() {
        $('.siding-bar').addClass('active');
      },
      closeSideBar() {
        $('.siding-bar').removeClass('active')
      },


    },
    mounted(){

        $(document).ready(function(){
            $(document).tooltip({
                selector: '.tool-tip'
            });
        });
        $(document).on("input", '.value-error' , function () {
            if(!$(this).hasClass('not-handle-error')){
                
                $(this).removeClass('value-error');
                
                if($(this).next().hasClass('value-error-text')){
                
                    $(this).next().remove();
                }

            }
        })
    },

  watch: {
    $route: {
      immediate: true,
      handler() {
        document.title = "Techno";
      }
    },

  }
  }


</script>
<style scoped>
.modal-backdrop {
  margin-left: 250px;
}
@font-face {
 font-family:"SF Pro Display";
 font-weight:normal;
}
.main-content{
 width: calc(100% - 250px);
  margin-left: 250px;
  font-size: 14px;

}
.hun{
  width: 100%;
  margin-left: 0;
}

.siding-bar{
  min-width: 250px;
 max-width: 250px;
  position: fixed;
  z-index:999;}

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



