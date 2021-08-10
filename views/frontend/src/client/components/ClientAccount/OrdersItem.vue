<template>
  <div>
    <div v-if="orderList.length === 0" class="text-center mt-5">
          <img src="../../../assets/clients/box.png" class="mb-3">
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

    <div class="mobile-item  align-items-center justify-content-between" v-for="order in orderList" :key="order.id">
      <div style="width:50%">
        <div class="mb-1" style="font-size:16px">Order {{order.code}}</div>
        <span style="color:#b0b0b0">{{order.createdAt?order.createdAt.slice(0,10): ''}}</span>
      </div>
      <div style="width:50%" class="d-flex justify-content-end flex-column align-items-end">
        <div class="mobile-price mb-1">{{order.totalPrice}} {{catalog_settings.currency}}</div>
        <span class="d-flex align-items-center" :class="{red:order.status === 'Cancelled', done: order.status=== 'Done'}"> <i class=" circle-status fas fa-circle"></i>{{order.status}}</span>
      </div>

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
        return this.$moment(String(value)).format('YYYY-MM-DD');
      }
    },
  },
}
</script>

<style scoped>
.table-item{
  height: 70px;
}
.red{
  color:#E94A4A;
}
.done{
  color:
      #5CBD85;
}

.mobile-price{
  font-size: 16px;
  font-weight: 600;
}
.mobile-item{
  border-bottom: 1px solid #E4E4E4;
  height: 72px;
  display:none;
}
@media(max-width:992px){
  .table-item{
    display: none !important;
  }
  .mobile-item{
    display:flex;
  }

}
</style>