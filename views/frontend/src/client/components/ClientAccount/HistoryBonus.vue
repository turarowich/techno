<template>
  <div>
    <div v-if="orderList.length === 0" class="text-center mt-5">
      <img src="../../../assets/clients/box.png">
      <h3 class="cashback-sub-title">Still empty</h3>
      <p class="client-paragraph">Information about your orders will be stored here</p>
    </div>
    <div v-else class="table-item d-flex align-items-center" v-for="order in orderList" :key="order.id">
      <div style="width:50%" class="d-flex align-items-center">
        <div class="table-img">
          <img src="../../../assets/img/sneak.webp">
        </div>
        {{order.source}}
      </div>
      <div style="width:30%"> {{order.createdAt.slice(0,10)}}</div>
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
</style>