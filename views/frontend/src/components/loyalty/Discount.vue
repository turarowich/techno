<template>
<div class="discount">
  <div class="row">
    <div class="col-lg-9">
      <div class="mb-2 d-flex">
        <label class="switch d-flex">
          <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
          <span class="slider round"></span>
        </label>
        <h2 class="cashback-title">Discount</h2>
      </div>
      <p class="mb-5 cashback-description">Increase customer loyalty with the help of this tool</p>

<!--      <div class="discount-system discount-bottom d-flex ">-->
<!--        <div class="first-block">-->
<!--          <h3 class="cashback-sub-title mb-3">Discount system</h3>-->
<!--          <div class="show-data d-flex align-items-center">Total Purchase</div>-->
<!--          <div class="show-data d-flex align-items-center">Total Purchase</div>-->
<!--        </div>-->
<!--        <div class="discount-input">-->
<!--          <label class="mb-3">Specify a discount</label>-->
<!--          <input class="cashback-input" placeholder="0">-->
<!--          <input class="cashback-input" placeholder="0">-->
<!--        </div>-->
<!--        <div  class="discount-input ">-->
<!--          <label class="mb-3">Amount of shopping</label>-->
<!--          <input class="cashback-input" placeholder="0">-->
<!--          <input class="cashback-input" placeholder="0">-->
<!--        </div>-->
<!--        <button class="discount-btn">-->
<!--          <img src="../../assets/icons/enable+.svg">-->
<!--        </button>-->
<!--      </div>-->

      <div class="discount-labels d-flex align-items-center">
        <div style="width:60%" class="cashback-sub-title">Discount system</div>
        <div style="width:18%">Specify a discount</div>
        <div style="width:18%">Amount of discount</div>
      </div>

      <div class="discount-inputs d-flex align-items-center">
        <input  style="width:65%" class="cashback-input">
        <input  style="width:18%" class="cashback-input">
        <input  style="width:18%" class="cashback-input">
        <button class="discount-btn"><img src="../../assets/icons/enable+.svg"></button>
      </div>
      <div class="discount-inputs d-flex align-items-center">
        <input  style="width:65%" class="cashback-input">
        <input  style="width:18%" class="cashback-input">
        <input  style="width:18%" class="cashback-input">
        <button class="discount-btn"><img src="../../assets/icons/enable+.svg"></button>
      </div>

      <button class="save">Save</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "Discount"
}
</script>

<style scoped>
.save{
  width: 120px;
}
.discount-btn{
  height: 45px;
  width: 45px;
  border-radius:5px;
  background: none;
  border:1px solid #616cf5;
}
.discount-inputs input{
  margin-right:10px;
}
.discount-inputs{
  margin-bottom: 14px;
}
.discount-labels{
  margin-bottom: 10px;
}
.save{
  margin-top: 50px;
}

</style>