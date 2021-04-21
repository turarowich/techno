<template>
<div class="loyalty">
  <LoyaltyNavbar/>
    <router-view>

    </router-view>
</div>
</template>

<script>
import LoyaltyNavbar from "@/components/loyalty/LoyaltyNavbar";
export default {
name: "Loaylty",
  components:{
  LoyaltyNavbar
  }



}
</script>

<style scoped>

.loyalty{
  padding:0 30px;
  height:100vh;
  overflow-y: auto;
}
</style>