<template>
  <div>
    <div v-if="orderList.length === 0" class="text-center mt-5">
      <img src="../../../assets/clients/box.png" class="mb-3">

      <p class="client-paragraph">Information about your orders will be stored here</p>
    </div>
    <div v-else class="table-item d-flex align-items-center justify-content-between" v-for="order in orderList" :key="order.id">
      <div style="width:50%" class=" pr-3 mobile-source">
        {{order.source}}
        <div class="mt-1" style="color:#b0b0b0">{{order.createdAt.slice(0,10)}}</div>
      </div>
      <div style="width:30%" class="createdAt"> {{order.createdAt.slice(0,10)}}</div>
      <div v-if="order.type==='received'" class="d-flex justify-content-end received" style="width:20%">+{{order.points}}</div>
      <div v-else class="d-flex justify-content-end used" style="width:20%">-{{order.points}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryBonus",
  props:['orderList']
}
</script>

<style scoped>
.received{
  color: green;
}
.used{
  color: red;
}
.table-item{
  height: 70px;
}
@media(max-width:992px){
  .createdAt{
    display: none;
  }
  .mobile-source{
    width: 70% !important;
  }
  .table-item{
    padding: 0;
  }
}
</style>