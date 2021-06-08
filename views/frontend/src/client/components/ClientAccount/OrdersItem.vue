<template>
  <div>
    <div v-if="orderList.length === 0" class="text-center mt-5">
          <img src="../../../assets/clients/box.png">
          <h3 class="cashback-sub-title">Still empty</h3>
          <p class="client-paragraph">Information about your orders will be stored here</p>
    </div>
<div v-else class="table-item d-flex align-items-center" v-for="order in orderList" :key="order.id">
  <div style="width:20%" class="d-flex align-items-center">
    <div class="table-img">
      <img src="../../../assets/img/sneak.webp">
    </div>
    {{order.name}}
  </div>
  <div style="width:14%"> {{order.client}}</div>
  <div style="width:10%">{{order.phone}}</div>
  <div style="width:12%">{{order.total}}</div>
  <div style="width:12%">{{order.date}}</div>
  <div style="width:12%">{{order.notes}}</div>
  <div style="width:11%">10%</div>
  <div style="width:10%">{{order.status}}</div>
</div>
  </div>
</template>

<script>
export default {
name: "OrdersItem",
  props:['orderList'],
}
</script>

<style scoped>

</style>