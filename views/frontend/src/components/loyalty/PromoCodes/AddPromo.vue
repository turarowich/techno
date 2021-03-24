<template>
  <div v-for="promocode in promocodes" :key="promocode.key" @click="$emit('removePromo', promocode.id)"  class="promo-item mb-2 p-3">
    <p class="cashback-description sum-point">Name</p>
    <h3 class="cashback-sub-title mb-3">{{promocode.name}}</h3>
    <div class="d-flex align-items-center">
      <div class=" add-promo-left d-flex align-items-center">
        <img class="promo-img" src="../../../assets/icons/Discount.svg">
        <span class="promo-text">{{promocode.sale}} %</span>
      </div>
      <div class=" d-flex align-items-center">
        <img class="promo-img" src="../../../assets/icons/Calendar.svg">
        <span  class="promo-text">{{promocode.date}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AddPromo",
  props:{
    promocodes:{
      type:Array
    }
  },

}
</script>

<style scoped>
.promo-item{
  background: #fff;
  border: 1px solid #8C94A5;
  border-radius: 5px;
}
.promo-img{
  margin-right:5px;
}
.promo-text{
  color: #8C94A5;
}
.add-promo-left{
  margin-right: 20px;
}
.active{
  border:1px solid red;
}
</style>