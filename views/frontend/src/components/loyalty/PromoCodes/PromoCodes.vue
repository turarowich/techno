<template>

  <div>
    <div class="mb-3">
    <label class="switch">
      <input type="checkbox">
      <span class="slider round"></span>
    </label>
    <span class="enable">Enable</span>
    </div>
    <div  class="d-flex">
      <div class="add-promo">

      </div>

      <div class="register-promo">
          <div style="width: 80%">
            <div class="mb-10">
              <label>Name</label>
              <input class="cashback-input" placeholder="Promo code name" style="width: 100%">
            </div>

            <div class="d-flex generate-promo marginBottom">
              <div style="width: 50%" class="mr-3">
                <label>Name</label>
                <div class="input-box d-flex align-items-center"><input placeholder="Promo code name"><img class="qr" src="../../../assets/img/qr.svg"></div>
              </div>
              <div style="width: 50%">
                <label>Sale</label>
                <div class="input-box"><input placeholder="Enter the discount value"></div>
              </div>
            </div>


        <div class="marginBottom">
            <p >Validity Period</p>
            <div class="d-flex validity-period">
              <div class="d-flex align-items-center from" style="width:50%">
                <label>From</label>
                <div style="width: 100%" class="input-box d-flex align-items-center"><input placeholder="Promo code name"><img class="mr-2" src="../../../assets/icons/Calendar.svg"></div>
              </div>

              <div class="d-flex align-items-center" style="width:50%">
                <label>To</label>
                <div style="width: 100%" class="input-box d-flex align-items-center"><input placeholder="Promo code name"><img class="mr-2" src="../../../assets/icons/Calendar.svg"></div>
              </div>
            </div>
        </div>

            <div class="valid-for marginBottom">
              <p>Valid for</p>
              <div class="d-flex">
                <div class="valid-btn" ><button>Services</button></div>
                <div  class="valid-btn" ><button>Services</button></div>
                <div  class="valid-btn" ><button>Services</button></div>
              </div>
            </div>

            <div class="select-service mb-5">
              <p>Select Services</p>
              <input class="cashback-input mb-3" style="width: 70%;">
              <input class="cashback-input" style="width: 70%; margin-right:10px;" placeholder="+ add services or category">
              <button class="cash-btn text-center"><img src="../../../assets/icons/enable+.svg"></button>
            </div>

            <button class="save">Save</button>

          </div>
      </div>

    </div>

  </div>

</template>

<script>
export default {
name: "PromoCodes"
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
.register-promo{
  width: 70%;
  border: 1px solid #D3D3D3;
  box-sizing: border-box;
  border-radius: 5px;
  padding:30px;
  height:calc(100vh - 210px);
  overflow-y: auto;
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
}
.qr {
  margin-right: 5px;
  cursor:pointer;
}
.validity-period label ,.from{
  margin-right: 10px;
  color:#8C94A5;
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


</style>