<template>
  <div>
    <div  class="table-item d-flex justify-content-between align-items-center">
      <div class="table-head d-flex align-items-center" style="width: 60%;">
      <img src="../../assets/icons/log-plus.svg" class="log-img">
        <div>
          <h5 class="operation-title">Order creation</h5>
          <span class="operation-desc">Order number 223434</span>
        </div>
      </div>
      <div class="table-head" style="width: 20%;">Admin</div>
      <div class="table-head" style="width: 20%;">12-04-2021</div>
    </div>
    <div  class="table-item d-flex justify-content-between align-items-center">
      <div class="table-head d-flex align-items-center" style="width: 60%;">
      <img src="../../assets/icons/log-minus.svg" class="log-img">
        <div>
          <h5 class="operation-title">Writing of points</h5>
          <span class="operation-desc">Customer Mikhail Stasov had <span style=" color:#E94A4A;">50 points</span></span>
        </div>
      </div>
      <div class="table-head" style="width: 20%;">Admin</div>
      <div class="table-head" style="width: 20%;">12-04-2021</div>
    </div>
    <div  class="table-item d-flex justify-content-between align-items-center">
      <div class="table-head d-flex align-items-center" style="width: 60%;">
      <img src="../../assets/icons/log-point.svg" class="log-img">
        <div>
          <h5 class="operation-title">Add point</h5>
          <span class="operation-desc"><span style="color: #5CBD85;">200 points</span> Mikhail Mikhailov successfully accured</span>
        </div>
      </div>
      <div class="table-head" style="width: 20%;">Admin</div>
      <div class="table-head" style="width: 20%;">12-04-2021</div>
    </div>
    <div  class="table-item d-flex justify-content-between align-items-center">
      <div class="table-head d-flex align-items-center" style="width: 60%;">
      <img src="../../assets/icons/log-basket.svg" class="log-img">
        <div>
          <h5 class="operation-title">Order edit #223434</h5>
          <span class="operation-desc">Change status <span style="color: #5CBD85;">Done</span> </span>
        </div>
      </div>
      <div class="table-head" style="width: 20%;">Admin</div>
      <div class="table-head" style="width: 20%;">12-04-2021</div>
    </div>
    <div  class="table-item d-flex justify-content-between align-items-center">
      <div class="table-head d-flex align-items-center" style="width: 60%;">
      <img src="../../assets/icons/log-basket.svg" class="log-img">
        <div>
          <h5 class="operation-title">Order edit #223434</h5>
          <span class="operation-desc">Change status <span style=" color:#E94A4A;">Canceled</span> </span>
        </div>
      </div>
      <div class="table-head" style="width: 20%;">Admin</div>
      <div class="table-head" style="width: 20%;">12-04-2021</div>
    </div>
    <div  class="table-item d-flex justify-content-between align-items-center">
      <div class="table-head d-flex align-items-center" style="width: 60%;">
      <img src="../../assets/icons/log-plus.svg" class="log-img">
        <div>
          <h5 class="operation-title">Cashback received</h5>
          <span class="operation-desc">10% obtained ($ 20) Cashback from order 545453 - Mikhail Mikhalkov</span>
        </div>
      </div>
      <div class="table-head" style="width: 20%;">Admin</div>
      <div class="table-head" style="width: 20%;">12-04-2021</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "LogItem"
}
</script>

<style scoped>
.log-img{
  margin-right: 20px;
  width:40px;
  height:40px;
}
.operation-title{
  font-size: 14px;
  margin-bottom: 3px;
}
.operation-desc{
  color:#858585;
}
.table-item{
  height: 77px;
}
</style>