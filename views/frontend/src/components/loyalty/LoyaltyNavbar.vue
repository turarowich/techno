<template>
<div>
  <div class="loyalty-nav d-flex align-items-end">
    <ul class="loyalty-menu p-0 d-flex">
      <li class="loaylty-list"><router-link class="loyalty-link" v-bind:class="{ active: currentRouteName==='CashBack' }" to="/loyalty" exact>Cashback</router-link></li>
      <li class="loaylty-list"><router-link class="loyalty-link" v-bind:class="{ active: currentRouteName==='PromoCode' }" to="/loyalty/promocode">Promo code</router-link></li>
      <li class="loaylty-list"><router-link class="loyalty-link" v-bind:class="{ active: currentRouteName==='Discount' }" to="/loyalty/discount">Discount</router-link></li>
    </ul>
  </div>
</div>
</template>

<script>

// import $ from "jquery";

export default {
  name: "LoyaltyNavbar",
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
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  mounted(){
    // this.addActive()
  }

}
</script>

<style scoped>
.loyalty-header{
  height: 60px;
}
.loyalty-title{
  font-size: 24px;
  font-weight: 700;
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
.router-link-active{
  background: none;
}

.loaylty-list{
  list-style-type:none;
  margin-right: 20px;
}


</style>