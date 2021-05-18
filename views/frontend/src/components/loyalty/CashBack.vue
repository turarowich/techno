<template>
<div class="row cashback">
  <div class="col-lg-6">
    <div class="mb-4">
        <div class="d-flex enable-title">
          <label class="switch d-flex">
            <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
            <span class="slider round"></span>
          </label>
          <h2 class="cashback-title">Cashback</h2>
        </div>
       <p class="cashback-description">Increase customer loyalty with the help of this tool</p>
    </div>

    <div class="minimum-cashback">
      <h3 class="cashback-sub-title">Minimum cashback amount</h3>
      <div class="d-flex align-items-center">
        <input style="width:40%" class="cashback-input mr-3">
        <span style="width:50%" class="cashback-description mb-0">Enter the minimum amount to activate cashback</span>
      </div>
    </div>

    <div class="d-flex marginBottom">
      <div class="select-left">
        <h3 class="cashback-sub-title mb-3 ">Select product</h3>
        <select class=" form-control long-form-control form-control-lg mb-2" aria-label=".form-select-lg example">
          <option>All product</option>
          <option>Only shoes and clothes</option>
          <option>Food and Drinks</option>
        </select>
        <select class=" form-control long-form-control form-control-lg mb-2" aria-label=".form-select-lg example">
          <option>All product</option>
          <option>Only shoes and clothes</option>
          <option>Food and Drinks</option>
        </select>
        <select class=" form-control long-form-control form-control-lg mb-2" aria-label=".form-select-lg example">
          <option>All product</option>
          <option>Only shoes and clothes</option>
          <option>Food and Drinks</option>
        </select>


      </div>

      <div class="select-right">

        <h3 class="cashback-sub-title mb-3">% or total</h3>
        <input class="cashback-input mb-2"  placeholder="0">
        <input class="cashback-input mb-2"  placeholder="0">
        <input class="cashback-input mb-2"  placeholder="0"><button disabled="true" class=" check cash-btn"><img src="../../assets/icons/enable+.svg"></button>
      </div>
    </div>

  <div class="box-switches">
      <div class="d-flex enable-title align-items-center">
        <label class="switch d-flex ">
          <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
          <span class="slider round"></span>
        </label>
        <h2 class="cashback-sub-title mb-0">Welcome points</h2>
      </div>
      <p class="cashback-description">Increase customer loyalty with the help of this tool</p>
      <input class="cashback-input" style="width:40%">
  </div>

    <div class="box-switches">
      <div class="d-flex enable-title align-items-center">
        <label class="switch d-flex ">
          <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
          <span class="slider round"></span>
        </label>
        <h2 class="cashback-sub-title mb-0">Share with a friend</h2>
      </div>
      <p class="cashback-description">Increase customer loyalty with the help of this tool</p>
      <input class="cashback-input" style="width:40%">
    </div>


    <div class="radio-toolbar">
      <div class="d-flex align-items-center mr-4">
        <input type="radio" id="radioShopping" name="charge" value="apple" checked>
        <label for="radioShopping"></label>
        <span class="male">Charge at shopping</span>
      </div>
      <div class="d-flex align-items-center">
        <input type="radio" id="radioRegistration" name="charge" value="orange">
        <label for="radioRegistration"></label>
        <span class="maled">Charge at registration</span>
      </div>
    </div>
    <button class="save">Save</button>
  </div>


<!---------------------------- Right Side  ------------------------------------------>

  <div class="col-lg-5 cashback-right">
    <div class="marginBottom"><h2 class="cashback-title">Birthday Points</h2></div>
    <div class="d-flex enable-title">
      <div>
        <label class="switch">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
      <h3 class="cashback-sub-title">Auto push</h3>
    </div>
    <p class="cashback-description">Automatic accrual of points to the client on his birthday.</p>


    <div class="mb-3">
        <label class="sum-point">Sum of points</label><br>
        <input class="cashback-input mb-2">
        <p class="cashback-description ">If the number of points awarded is zero, the client will receive a regular text greeting</p>
    </div>
    <div class="mb-3">
        <p class="sum-point">Title</p>
        <input class="cashback-input" placeholder="Add title">
    </div>
    <div class="mb-3">
      <p class="sum-point">Conguratulations text</p>
      <textarea class="cashback-text-area" placeholder="For your soon birthday we give you 500 points for yournext purchase!"></textarea>
    </div>


    <div class="d-flex enable-title">
      <div>
        <label class="switch">
          <input type="checkbox" data-toggle="collapse" data-target="#collapse-limit" aria-expanded="true" aria-controls="collapse-limit">
          <span class="slider round"></span>
        </label>
      </div>
      <h3 class="cashback-sub-title">Limit the lifetime of points</h3>
    </div>
    <p class="cashback-description mb-4">The period is counted from the first accrual of points.
      At the end of the term, all customer points will be canceled</p>

    <div class="collapse"  id="collapse-limit">
      <label>Points expires after:</label><br>
      <input class="cashback-input" style="width:40%">
    </div>




  </div>

</div>
</template>

<script>

export default {
  name: "CashBack",

data(){
    return{
      data:0
    }
}
}
</script>

<style scoped>
.cashback-right .cashback-input{
  width: 100%;
}
.minimum-cashback{
  margin-bottom: 25px;
}
.minimum-cashback h3{
  margin-bottom: 15px;
}
.minimum-cashback .cashback-description{
  line-height: 20.8px;
}
.box-switches{
  margin-bottom: 30px;
}

.cashback{
  padding-bottom:60px;
}

.select-left{
  width: 70%;
  margin-right: 10px;
}
.select-left input{
  width: 100%;
}
.select-right{
  width: 30%;
}
.select-right input{
  width: 60%;
  margin-right: 10px;
}

.limit-points{
  margin-bottom: 15px;
}
.limit-input{
  margin-bottom: 40px;
}


</style>