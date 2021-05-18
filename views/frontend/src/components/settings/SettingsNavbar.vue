<template>
  <div>
    <div class="loyalty-nav d-flex align-items-end">
      <ul class="loyalty-menu p-0 d-flex">
        <li class="loaylty-list"><router-link class="loyalty-link active" to="/settings" exact>General</router-link></li>
        <li class="loaylty-list"><router-link class="loyalty-link" to="/settings/price">Price</router-link></li>
        <li class="loaylty-list"><router-link class="loyalty-link" to="/settings/catalog-settings">Catalog</router-link></li>
        <li class="loaylty-list"><router-link class="loyalty-link" to="/settings/personal-settings">Personal settings</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>

import $ from "jquery";

export default {
  name: "SettingsNavbar",
  methods:{
    addActive(){
      $(document).ready(function() {
        $('.loyalty-link').click(function() {
          $('.loyalty-link.active').removeClass("active");
          $(this).addClass("active");
        });
      });
    }
  },
  mounted(){
    this.addActive()
  }

}
</script>

<style scoped>


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