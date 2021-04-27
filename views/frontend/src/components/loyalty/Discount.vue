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

  <div class="discount-system discount-bottom d-flex ">
    <div class="first-block">
      <h3 class="cashback-sub-title mb-3">Discount system</h3>
      <div class="show-data d-flex align-items-center">Total Purchase</div>
      <div class="show-data d-flex align-items-center">Total Purchase</div>
    </div>
    <div class="discount-input">
      <label class="mb-3">Specify a discount</label>
      <input class="cashback-input" placeholder="0">
      <input class="cashback-input" placeholder="0">
    </div>
    <div  class="discount-input ">
      <label class="mb-3">Amount of shopping</label>
      <input class="cashback-input" placeholder="0">
      <input class="cashback-input" placeholder="0">
    </div>
    <button class="discount-btn">
      <img src="../../assets/icons/enable+.svg">
    </button>

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
  width: 70%;

}
.discount-btn{
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #616CF5;
  border-radius: 5px;
  background: none;
  margin-top: 36px;
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
  margin-bottom: 15px;
}
.discount-input{
  width: 15%;
  margin-right: 10px;
}
.discount-input input{
  width: 100%;
  margin-bottom: 15px;
}
.first-block{
  width: 70%;
  margin-right: 10px;
}
.first-block input{
  width: 100%;
}

</style>