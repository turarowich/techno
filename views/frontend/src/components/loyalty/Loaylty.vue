<template>
<div class="loyalty">
  <div class="loyalty-header">
    <h2 class="route-name">Loyalty Program</h2>
  </div>
  <LoyaltyTab :tabs="['Cash Backs','Promo Codes', 'Discounts']" :selected="selected" @selected="setSelected">
    <LoyaltyTabContent :isSelected="selected==='Cash Backs'">
      <CashBack/>
    </LoyaltyTabContent>
    <LoyaltyTabContent :isSelected="selected==='Promo Codes'">
      <PromoCodes/>
    </LoyaltyTabContent>
    <LoyaltyTabContent :isSelected="selected==='Discounts'">
      <Discount/>
    </LoyaltyTabContent>
  </LoyaltyTab>
</div>
</template>

<script>
import LoyaltyTab from "@/components/loyalty/LoyaltyTab";
import LoyaltyTabContent from "@/components/loyalty/LoyaltyTabContent";
import CashBack from "@/components/loyalty/CashBack/CashBack";
import Discount from "@/components/loyalty/Discount/Discount";
import PromoCodes from "@/components/loyalty/PromoCodes/PromoCodes";
export default {
name: "Loaylty",
  components:{
    LoyaltyTab,
    LoyaltyTabContent,
    CashBack,
    PromoCodes,
    Discount

  },
  data(){
  return{
    selected:'Cash Backs'
  }
  },
  methods:{
  setSelected(tab){
    this.selected = tab
  }
  }
}
</script>

<style scoped>
.loyalty-header{
  height:60px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.loyalty{
  padding:0 20px;
  height:100vh;
  overflow-y: auto;
}
</style>