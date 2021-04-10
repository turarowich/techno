<template>
<div class="client-table-item d-flex" v-for="cart in shoppingList" :key="cart.id">
  <div style="width:40%" class="d-flex align-items-center">
    <div class="client-table-img">
      <img src="../../../assets/clients/hodie1.svg">
    </div>
    <div>
      <h3 class="table-title">Polo ralph lauren</h3>
      <p class="table-parag">1617W11F</p>
    </div>
  </div>
  <div style="width:20%">
    <button class="decrease mb-0" @click="count-=1">-</button>
    <span class="count">0</span>
    <button class="increase mb-0" @click="count+=1">+</button>
  </div>
  <div style="width:14%">0%</div>
  <div style="width:14%">250 $</div>
  <div style="width:12%" class="d-flex justify-content-end pr-3"><img src="../../../assets/clients/x.svg"></div>


</div>
</template>

<script>
export default {
name: "BasketItem",
  props:['shoppingList']
}
</script>

<style scoped>

.client-table-item{
  height: 100px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #E4E4E4;
}
.client-table-img{
  height: 70px;
  width: 70px;
  margin-right: 16px;
}
.client-table-img img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.table-title{
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}
.table-parag{
  color: #B0B0B0;

}
</style>