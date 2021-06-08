<template>
  <div class="modal fade right"  id="add-promocode" tabindex="-1" role="dialog" aria-labelledby="add-promocode" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: 656px;" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header align-items-center">
          <h3 class="modal-title">Add Promocode</h3>
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
          </button>
        </div>
        <div class=" myModal-body">
          <form  class="modal-form ">
            <div class="label-input">
              <label class="promo-label">Name</label><br>
              <input placeholder="Promocode for shoes" class="cashback-input promo-input"/>
            </div>

            <div class="d-flex">
              <div style="width:50%">
                  <label class="promo-label">Code</label>
                  <div class="reload-code d-flex align-items-center"><input><img src="../../assets/icons/Reload.svg"></div>
              </div>
              <div style="width:50%">
                <label class="promo-label">Discount</label><br>
                <input placeholder="0%" class="cashback-input promo-input">
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
                <div class="btns-item"><span class="btn-round"></span>services</div>
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

            <div class="promo-time d-flex ">
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
      </div>
    </div>
  </div>

</template>

<script>
import $ from "jquery";

export default {
  name: "Promocode",
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
.promo-input{
  width: 100%;
}
.label-input{
  margin-bottom: 25px;
}

.period-title{
  margin-bottom: 25px;
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
  margin-bottom: 10px;
}
.btns-item{
  width: 33.33%;
}
.valid-for{
  margin-bottom: 20px;
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
  margin-top: 15px !important;
}















</style>