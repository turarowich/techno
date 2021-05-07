<template>
<div>
  <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
        <button class="app-buttons-item adding-btns" @click="$router.push('/add-promo-page')"><span>+ Add promocode</span></button>

        <button class="app-buttons-item"><img src="../../assets/icons/trash_empty.svg"><span>Remove</span></button>
      </div>
    </div>
    <div class="main-search d-flex align-items-center ">
      <img src="../../assets/icons/search-icon.svg">
      <input class="main-input" type="text" placeholder="Search" v-model="search">
    </div>
  </div>
  <div class="d-flex main-content-header">
    <div class="table-head" style="width: 3%;"><label class="custom-checkbox"><input type="checkbox" ><span class="checkmark"></span></label></div>
    <div class="table-head" style="width: 24%;">Name</div>
    <div class="table-head" style="width: 12%;">User amount</div>
    <div class="table-head" style="width: 13%;">Discount</div>
    <div class="table-head" style="width: 16%;">Code</div>
    <div class="table-head" style="width: 16%; ">Valid until</div>
    <div class="table-head" style="width: 13%;">History</div>
    <div class="table-head" style="width:3%"></div>
  </div>
  <div class="table-content tytyty">
   <PromoCodeItem/>

  </div>
  <AddPromocode/>
  <HistoryPromocode/>


</div>
</template>

<script>
import AddPromocode from '@/modals/Promocode/AddPromocode'
import HistoryPromocode from "@/modals/Promocode/HistoryPromocode";
import PromoCodeItem from "@/components/loyalty/PromoCodeItem";
export default {
  name: "Promocode",
  components:{
    PromoCodeItem,
    AddPromocode,
    HistoryPromocode
  }
}
</script>

<style scoped>

</style>