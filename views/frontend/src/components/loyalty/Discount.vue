<template>
<div class="discount">
  <div class="mb-3">
    <label class="switch d-flex">
      <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
      <span class="slider round"><span class="enable">  Enable</span></span>
    </label>
  </div>


  <div class="marginBottom">
    <h2 class="cashback-title">Discount</h2>
    <p class="cashback-description">Increase customer loyalty with the help of this tool</p>
  </div>

  <div class="discount-system discount-bottom d-flex align-items-center">
    <div class="first-block">
      <h3 class="cashback-sub-title mb-3">Discount system</h3>
      <div class="show-data d-flex align-items-center">Total Purchase</div>
    </div>
    <div class="discount-input">
      <p class="sum-point mb-3">Specify a discount</p>
      <input class="cashback-input" placeholder="0">
    </div>
    <div  class="discount-input ">
      <p class="sum-point mb-3">Specify a discount</p>
      <input class="cashback-input" placeholder="0">
    </div>
  </div>


  <h3 class="cashback-sub-title mb-3">Validity period</h3>
  <div class="valid-bottom discount-system d-flex align-items-end">
    <div class="first-block">
     <div class="show-data mb-3"></div>
     <input  class="cashback-input" placeholder="+ add product or category">
    </div>
    <div class="discount-input">
      <input class="cashback-input mb-3" placeholder="10 %">
      <input class="cashback-input" placeholder="0" >
    </div>
    <div  class="discount-input d-flex">
      <button class="cash-btn"><img src="../../assets/icons/enable+.svg"></button>
    </div>
  </div>

  <button class="save">Save</button>

</div>
</template>

<script>
export default {
name: "Discount"
}
</script>

<style scoped>
.discount-bottom{
  margin-bottom: 30px;
}

.discount-system{
  width: 60%;

}
.valid-bottom{
  margin-bottom: 100px;

}
.show-data img{
  width: 35px;
  height: 35px;
  border-radius:50%;
  margin-right: 10px;
}
.show-data{
  border: 1px solid #E3E3E3;
  border-radius: 5px;
  height:45px;
  padding-left:10px;
  box-sizing: border-box;
}
.discount-input{
  width: 15%;
  margin-right: 10px;
}
.discount-input input{
  width: 100%;
}
.first-block{
  width: 70%;
  margin-right: 10px;
}
.first-block input{
  width: 100%;
}

</style>