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
        {{order.name}}
      </div>
      <div style="width:30%"> {{order.client}}</div>
      <div class="d-flex justify-content-end" style="width:20%">{{order.phone}}</div>

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

</style>