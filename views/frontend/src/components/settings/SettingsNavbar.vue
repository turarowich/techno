<template>
  <div>
    <div class="loyalty-nav d-flex align-items-end">
      <ul class="loyalty-menu p-0 d-flex">
        <li class="loaylty-list"><router-link class="loyalty-link" v-bind:class="{ active: currentRouteName==='General' }" to="/settings" exact>General</router-link></li>
        <li class="loaylty-list"><router-link class="loyalty-link" v-bind:class="{ active: currentRouteName==='Price' }" to="/settings/price">Price</router-link></li>
        <li class="loaylty-list"><router-link class="loyalty-link" v-bind:class="{ active: currentRouteName==='CatalogSettings' }" to="/settings/catalog-settings">Catalog</router-link></li>
        <li class="loaylty-list" v-if="isAdmin"><router-link class="loyalty-link" v-bind:class="{ active: currentRouteName==='PersonalSettings' }" to="/settings/personal-settings">Personal settings</router-link></li>
        <li class="loaylty-list" v-if="isAdmin"><router-link class="loyalty-link" v-bind:class="{ active: currentRouteName==='StaffSettings' }" to="/settings/staff-settings">Staff settings</router-link></li>
        <li class="loaylty-list"><router-link class="loyalty-link" v-bind:class="{ active: currentRouteName==='AddressDelivery' }" to="/settings/address-delivery">Address and delivery</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>

// import $ from "jquery";

export default {
    name: "SettingsNavbar",
  
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user'))
        }
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        },
        isAdmin(){
            if(this.user.rate != undefined && this.user.activeBefore != undefined){
                return true
            }
            return false
        }
    },
    methods:{
    // addActive(){
    //   $(document).ready(function() {
    //     $('.loyalty-link').click(function() {
    //       $('.loyalty-link.active').removeClass("active");
    //       $(this).addClass("active");
    //     });
    //   });
    // }
  },
  mounted(){
    // this.addActive()
  }

}
</script>

<style scoped>

.router-link-active{
  background: none;
}
.loyalty-menu{
  margin-bottom: 10px;
}
.loyalty-nav{
  border-bottom: 1px solid #D3D3D3;
  margin-bottom: 22px;
}
.loyalty-link{
  color:#999;
  text-decoration: none;
  padding-bottom: 11px;
  border-bottom: 3px solid transparent;
}
.loyalty-link.active{
  color:#222;
  border-bottom: 3px solid #616CF5;
  padding-bottom: 11px;

}

.loaylty-list{
  list-style-type:none;
  margin-right: 20px;
}


</style>