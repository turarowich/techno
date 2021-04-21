<template>
<div class="d-flex cashback">
  <div class="cashback-left" style="width:55%">
    <div>
        <div class="marginBottom">
          <label class="switch d-flex">
            <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
            <span class="slider round"><span class="enable">  Enable</span></span>
          </label>
        </div>

        <div class="marginBottom">
          <h2 class="cashback-title">Cashback</h2>
          <p class="cashback-description">Increase customer loyalty with the help of this tool</p>
        </div>

          <div class="cashback-work marginBottom">
            <h3 class="cashback-sub-title">How will it work</h3>
            <div class="mb-2"><label class="custom-checkbox work-checkbox"><input type="checkbox"><span class="checkmark"></span></label><span>Percentage of receipt or product</span></div>
            <div><label class="custom-checkbox work-checkbox"><input type="checkbox"  @click="toggleSelect" :checked="selectAll"><span class="checkmark"></span></label><span>Fixed amount</span></div>
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

      </div>
      <div class="select-right">
        <h3 class="cashback-sub-title mb-3">% or total</h3>
        <input class="cashback-input mb-2"  placeholder="0" ><button disabled="true" class=" check cash-btn"><img src="../../assets/icons/enable+.svg"></button>
      </div>
    </div>

    <div class="marginBottom">
      <h3 class="cashback-sub-title ">Welcome points</h3>
      <p class="cashback-description mb-3">A  one-time award of points to the client for joining the company.</p>
      <input class="cashback-input" placeholder="0">
    </div>

    <div class="d-flex">
      <div>
        <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
      </label>
      </div>

      <div class="limit-points">
        <h3 class="cashback-sub-title">Limit the lifetime of points</h3>
        <p class="cashback-description">The period is counted from the first accrual of points.
        At the end of the term, all customer points will be canceled</p>
      </div>
    </div>
    <button class="save">Save</button>
  </div>

  <div class="cashback-right" style="width:45%">
    <div class="marginBottom"><h2 class="cashback-title">Birthday Points</h2></div>

    <div class="d-flex mb-3 ">
      <div>
        <label class="switch">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>

      <div>
        <h3 class="cashback-sub-title">Automatic mailing</h3>
        <p class="cashback-description">Automatic accrual of points to the client on his birthday.</p>
      </div>
    </div>


      <div class="mb-3">
        <p class="sum-point">Sum of points</p>
        <input class="cashback-input">
      </div>
      <div class="mb-3">
        <p class="sum-point">Send for</p>
        <input class="cashback-input">
      </div>
    <div class="mb-3">
      <p class="sum-point">Conguratulations text</p>
      <textarea class="cashback-text-area" placeholder="For your soon birthday we give you 500 points for your
next purchase!"></textarea>
    </div>

    <h2 class="cashback-title marginBottom">Security</h2>

    <div class="d-flex mb-3">
      <div>
        <label class="switch">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>

      <div>
        <h3 class="cashback-sub-title">Track suspicious customers</h3>
        <p class="cashback-description">We'll notify you if a customer makes too many purchases.</p>
      </div>
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
  width: 40%;
  margin-right: 10px;
}

.limit-points{
  margin-bottom: 90px;
}
.cashback-right{
  padding-right:90px;
}
.work-checkbox{
  margin-right: 10px;
}
.cashback-work h3{
  margin-bottom: 14px;
}

</style>