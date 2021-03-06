<template>

  <div>
    <div class="mb-3">
      <label class="switch d-flex">
        <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
        <span class="slider round"><span class="enable">  Enable</span></span>
      </label>
    </div>
    <div  class="d-flex">
      <div class="add-promo p-2 ">
          <div class="promo-item mb-2 p-3">
            <p class="cashback-description sum-point">Name</p>
            <h3 class="cashback-sub-title mb-3">Promo Codes for shoes</h3>
            <div class="d-flex align-items-center">
              <div class=" add-promo-left d-flex align-items-center">
                <img class="promo-img" src="../../../assets/icons/Calendar.svg">
                <span class="promo-text">20%</span>
              </div>
              <div class=" d-flex align-items-center">
                <img class="promo-img" src="../../../assets/icons/Calendar.svg">
                <span  class="promo-text">21.12.2021</span>
              </div>
            </div>
          </div>

        <div class="add-promo-btn">
            + click to add promo code
        </div>
      </div>

      <div class="register-promo">
          <div style="width: 80%">
            <div class="mb-10">
              <label>Name</label>
              <input class="cashback-input" placeholder="Promo code name" style="width: 100%">
            </div>

            <div class="d-flex generate-promo marginBottom">
              <div style="width: 50%" class="promo-block">
                <label>Code</label>
                <div class="input-box d-flex align-items-center"><input placeholder="Generate code"><img class="qr" src="../../../assets/img/qr.svg"></div>
              </div>
              <div style="width: 50%">
                <label>Sale</label>
                <div class="input-box"><input placeholder="Enter the discount value"></div>
              </div>
            </div>


        <div class="marginBottom">
            <p class="color-p">Validity Period</p>
            <div class="d-flex validity-period">
              <div class="d-flex align-items-center from" style="width:50%">
                <label>From</label>
                <div style="width: 100%" class="input-box d-flex align-items-center"><input placeholder="Select a date"  type="date"></div>
              </div>

              <div class="d-flex align-items-center from" style="width:50%">
                <label>To</label>
                <div style="width: 100%" class="input-box d-flex align-items-center"><input placeholder="Select a date"  type="date"></div>
              </div>
            </div>
        </div>





            <div class="valid-for marginBottom">
              <p class="color-p">Valid for</p>
              <div class="d-flex">
                <div class="valid-btn"> <button>Services</button></div>
                <div  class="valid-btn"><button>Services</button></div>
                <div  class="valid-btn"><button>Services</button></div>
              </div>
            </div>


            <div class="select-service mb-5">
              <p class="color-p">Select Services</p>
              <select class="form-control long-form-control select-phone mb-3" style="width: 70%;" aria-label="Default select example">
                <option>+996834</option>
                <option>+996834</option>
                <option>+996834</option>
                <option>+996834</option>
                <option>+996834</option>
                <option>+996834</option>
                <option>+996834</option>
                <option>+996834</option>

              </select>
              <input class="cashback-input" style="width: 70%; margin-right:10px;" placeholder="+ add services or category">
              <button class="cash-btn text-center"><img src="../../../assets/icons/enable+.svg"></button>
            </div>
            <div class="d-flex">
              <button class="save">Save</button>
              <button class="remove">Remove</button>
            </div>
          </div>
      </div>

    </div>

  </div>

</template>

<script>


export default {


}
</script>

<style scoped>
.add-promo{
  width: 30%;
  background: #F1F2F6;
  border: 1px solid #E4E4E4;
  box-sizing: border-box;
  border-radius: 5px;
 height:calc(100vh - 210px);
  margin-right: 10px;
}
.promo-item{
  background: #fff;
  border: 1px solid #616CF5;
  border-radius: 5px;
}
.register-promo{
  width: 70%;
  border: 1px solid #D3D3D3;
  box-sizing: border-box;
  border-radius: 5px;
  padding:30px;
  height:calc(100vh - 210px);
  overflow-y: auto;
}
.promo-img{
  margin-right:5px;
}
.promo-text{
  color: #8C94A5;
}
.add-promo-btn{
  border: 1px solid #8C94A5;
  box-sizing: border-box;
  border-radius: 5px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#8C94A5;
  cursor:pointer;
}
.input-box{
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  height: 45px;
  padding-left:20px;
}
.input-box input{
  width: 100%;
  height: 100%;
  border:none;
  color:#b0b0b0;
}
.qr {
  margin-right: 5px;
  cursor:pointer;
}
.validity-period label ,.from{
  margin-right: 10px;
  color:#8C94A5;
}

label{
  margin-bottom: 5px;
}
.valid-for button{
  width: 100%;
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  height: 30px;
  background: none;
}
.valid-btn{
  width: 33.33%;
  margin-right: 10px;
}
.mb-10{
  margin-bottom:10px;
}
.promo-block{
  margin-right: 10px;
}
.remove{
  background: none;
  border-radius: 5px;
  color:#d81919;
  height:37px;
  display: flex;
  align-items: center;
  border:1px solid #d81919;
  justify-content: center;;
  font-size: 16px;
  width: 120px;
}
.add-promo-left{
  margin-right: 20px;
}


</style>