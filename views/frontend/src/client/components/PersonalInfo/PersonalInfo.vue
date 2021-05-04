<template>
<div class="row">
  <div class="col-lg-5 col-md-8 col-sm-10 col-xs-12 m-auto">
      <div class="personal-info">
        <div class="d-flex align-items-center path-box mt-5 " @click="$router.go(-1)"><img class="mr-3" src="../../../assets/clients/slide.svg"><h3 class="path-title">Personal information</h3></div>

        <form>
              <label class="personal-label">Name</label><br>
              <input class="cashback-input" placeholder="Name">
              <label class="personal-label">Phone number</label><br>
              <input class="cashback-input" placeholder="Phone number">
              <label class="personal-label">Email address</label><br>
              <input class="cashback-input email" placeholder="Email address">

              <div class="personal-btns">
                <div class="btns-item"><span class="btn-round"></span>Delivery</div>
                <div class="btns-item"><span class="btn-round"></span>Pick-up service</div>
              </div>

              <label class="personal-label">Delivery service</label><br>
              <select class="personal-form form-control long-form-control  form-control-lg mb-3" aria-label=".form-select-lg example">
                <option>Kyrgyzstan</option>
                <option>Russia</option>
                <option>USA</option>
                <option>Kyrgyzstan</option>
                <option>Russia</option>
                <option>USA</option>
              </select>
              <label class="personal-label">Your country</label><br>
              <input class="cashback-input" placeholder="Your country">
              <label class="personal-label">Delivery address</label><br>
              <input class="cashback-input email" placeholder="Delivery address">


          <div class="d-flex align-items-center map-box">
                <img class="mr-2" src="../../../assets/clients/map.svg"> <span class="on-map">Specify on the map</span>
              </div>

              <div class="d-flex">
                <button class="cancel cancel-order">Cancel</button>
                <button class="save save-order" >Confirm order</button>
              </div>

            </form>
      </div>
  </div>

</div>
</template>

<script>
import $ from 'jquery'
export default {
name: "PersonalInfo",
  methods:{
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
  }
}
</script>

<style scoped>
.personal-info input{
  width: 100%;
  margin-bottom: 20px;
}
.personal-label{
  margin-bottom: 10px;
}
.email{
  margin-bottom: 41px !important;
}
.personal-info .personal-btns{
  margin-bottom: 27px;
}
.save-order,.cancel-order{
  width: 130px;
  padding:10px 10px;
}

</style>