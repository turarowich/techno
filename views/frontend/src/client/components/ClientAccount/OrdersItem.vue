<template>
  <div>
    <div v-if="orderList.length === 0" class="text-center mt-5">
          <img src="../../../assets/clients/box.png">
          <h3 class="cashback-sub-title">Still empty</h3>
          <p class="client-paragraph">Information about your orders will be stored here</p>
    </div>
<div v-else class="table-item d-flex align-items-center" v-for="order in orderList" :key="order.id">
  <div style="width:10%" class="d-flex align-items-center">
    {{order.code}}
  </div>
  <div style="width:24%;overflow: hidden;text-overflow: ellipsis;"> {{order.address}}</div>
  <div style="width:10%">{{format_date(order.createdAt)}}</div>
  <div style="width:12%">{{order.products.length}}</div>
  <div v-if="order.deliveryPrice>0" style="width:12%">{{order.deliveryPrice}} {{catalog_settings.currency}}</div>
  <div v-else style="width:12%;color:#5CBD85;">
    <span v-if="['self','Pick-up'].includes(order.deliveryType)">Pick Up</span>
    <span v-else>Free</span>
  </div>
  <div style="width:12%">{{order.totalDiscount}} {{catalog_settings.currency}}</div>
  <div style="width:11%">{{order.totalPrice}} {{catalog_settings.currency}}</div>
  <div style="width:10%">{{order.status}}</div>
</div>
  </div>
</template>

<script>
export default {
name: "OrdersItem",
  props:['orderList'],
  computed:{
    catalog_settings(){
      return this.$store.getters['Catalog/getCatalog_settings'];
    },
  },
  methods:{
    format_date(value){
      if (value) {
        return this.$moment(String(value)).format('MM-DD-YY');
      }
    },
  },
}
</script>

<style scoped>

</style>