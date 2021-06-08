<template>
  <div class="add-promo">
    <div class="notification-header"><img @click="$router.go(-1)" class="mr-2" src="../../assets/icons/xBlack.svg"><h3>Edit promocode</h3></div>
    <div class="container">
      <div class="row">
        <div class="col-11 m-auto">
          <div class="row">
            <div class="col-lg-8">
              <form  class="modal-form ">
                <div class="label-input">
                  <label class="promo-label">Name</label><br>
                  <input placeholder="Promocode for shoes" class="cashback-input promo-input"/>
                </div>

                <div class="d-flex disc-box">
                  <div style="width:50%" class="mr-3">
                    <label class="promo-label">Discount</label><br>
                    <input placeholder="0%" class="cashback-input promo-input">
                  </div>
                  <div style="width:50%">
                    <label class="promo-label">Fix price</label><br>
                    <input class="cashback-input promo-input">
                  </div>
                </div>

                <div class="period">
                  <label class="period-title">Validity period</label>
                  <div class="d-flex">
                    <div style="width:50%" class=" mr-2 d-flex align-items-center">
                      <label class="promo-label">From</label>
                      <div class="calendar-period d-flex align-items-center"><input id="demo-1"><img src="../../assets/icons/Calendar.svg"></div>
                    </div>
                    <div style="width:50%" class="d-flex align-items-center mr-0">
                      <label class="promo-label">To</label>
                      <div class=" calendar-period d-flex align-items-center"><input id="demo-2"><img src="../../assets/icons/Calendar.svg"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="valid-for">Valid for</label>
                  <div class="personal-btns">
                    <div class="btns-item active"><span class="btn-round"></span>services</div>
                    <div class="btns-item"><span class="btn-round"></span>products</div>
                    <div class="btns-item mr-0"><span class="btn-round"></span>on everything</div>
                  </div>
                </div>

                <div class="services">
                  <label class="promo-label">Select service</label><br>
                  <div class="d-flex">
                    <input placeholder="+ all services or category" class="cashback-input promo-input mr-2">
                    <button class="promo-btn"><img src="../../assets/icons/enable+.svg"></button>
                  </div>
                </div>

                <div class="promo-time d-flex  align-items-end">
                  <div style="width:25%" class="terms">
                    <label class="promo-label">Terms of use</label>
                    <div>1 human</div>
                  </div>
                  <div style="width:27%" class="time">
                    <label class="promo-label">Number of times</label>
                    <input class="cashback-input" placeholder="1">
                  </div>
                  <div style="width:50%">
                    <p class="time-text">
                      Enter how many times the promo code can be used by default this is one
                    </p>
                  </div>
                </div>

                <div class="modal-btn d-flex">
                  <button class="save">Save</button>
                  <button class="cancel">Cancel</button>
                </div>
              </form>
            </div>

            <div class="col-lg-4">
              <label class="promo-label">Code</label>
              <div class="reload-code mr-0 mb-4 d-flex align-items-center"><input><img src="../../assets/icons/Reload.svg"></div>

              <label class="promo-label">Promo code is valid</label><br>
              <input placeholder="minimum amount" class="cashback-input promo-input">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "EditPromo",

  methods:{
    selectDates(){
      new this.$lightpick({
        field: document.getElementById('demo-1'),
        onSelect: function(date){
          document.getElementById('demo-1').innerHTML = date.format('Do MMMM YYYY');
        }
      });
      new this.$lightpick({
        field: document.getElementById('demo-2'),
        onSelect: function(date){
          document.getElementById('demo-2').innerHTML = date.format('Do MMMM YYYY');
        }
      });
    },
    addActive(){
      $(document).ready(function() {
        $('.btns-item').click(function() {
          $('.btns-item.active').removeClass("active");
          $(this).addClass("active");
        });
      });
    }
  },
  mounted(){
    this.addActive()
    this.selectDates()
  }

}
</script>

<style scoped>

.add-promo{
  padding: 0 30px;
  padding-bottom: 50px;
}

.promo-input{
  width: 100%;
}
.label-input{
  margin-bottom: 25px;
}

.period-title{
  margin-bottom: 20px;
}
.disc-box{
  margin-bottom: 30px;
}
.calendar-period{
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  height:45px;
  padding:0 10px;
  width:100%
}
.period{
  margin-bottom: 38px;
}
.period .promo-label{
  margin-bottom: 0;
  margin-right: 10px;
}
.promo-label{
  margin-bottom: 8px;
}
.btns-item{
  width: 33.33%;
}
.valid-for{
  margin-bottom: 15px;
}
.personal-btns{
  margin-bottom: 40px;
}
.promo-btn{
  border: 1px solid #616CF5;
  border-radius: 5px;
  width: 44px;
  height: 44px;
  background: none;
}
.services{
  margin-bottom: 50px;
}
.promo-time input{
  width: 100%;
}
.terms,.time{
  margin-right: 25px;
}

.terms div{
  display: flex;
  align-items: center;
  font-size: 16px;
  height: 45px;
  border-bottom: 1px solid #D3D3D3;
}
.promo-time{
  margin-bottom: 100px;
}

.time-text{
  color:#B0B0B0;
  margin-bottom: 0;
}

</style>