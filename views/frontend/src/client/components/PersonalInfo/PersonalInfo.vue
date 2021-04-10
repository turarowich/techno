<template>
<div class="row">
  <div class="col-lg-5 col-md-8 col-sm-10 col-xs-12 m-auto">
      <div class="personal-info">
        <div class="d-flex align-items-center path-box mt-5 "><img class="mr-3" src="../../../assets/clients/slide.svg"><h3 class="path-title">Personal information</h3></div>

        <form>
              <label class="personal-label">Name</label><br>
              <input class="cashback-input" placeholder="Name">
              <label class="personal-label">Phone number</label><br>
              <input class="cashback-input" placeholder="Phone number">
              <label class="personal-label">Email address</label><br>
              <input class="cashback-input email" placeholder="Email address">

              <div class="personal-btns">
                <button class="btns-item">Delivery</button>
                <button class="btns-item">Pick-up service</button>
              </div>

              <label class="personal-label">Delivery address</label><br>
              <input class="cashback-input email" placeholder="Enter your address">

              <div class="d-flex align-items-center map-box">
                <img class="mr-2" src="../../../assets/clients/map.svg"> <span class="on-map">Specify on the map</span>
              </div>

              <div class="d-flex">
                  <button class="save save-order">Confirm order</button>
                  <button class="cancel cancel-order">Cancel</button>
              </div>

            </form>
      </div>
  </div>

</div>
</template>

<script>
export default {
name: "PersonalInfo"
}
</script>

<style scoped>
.personal-info input{
  width: 100%;
  margin-bottom: 20px;
}
.btns-item{
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  width: 150px;
  height: 30px;
  background: none;
  margin-right: 10px;
}
.personal-btns{
  margin-bottom: 21px;
}
.personal-label{
  margin-bottom: 10px;
}
.email{
  margin-bottom: 41px !important;
}
.on-map{
  font-size: 16px;
  color:#616cf5;
  font-weight: 600;
}
.map-box{
  margin-bottom: 56px;
}
.save-order,.cancel-order{
  width: 130px;
  padding:10px 10px;
}
</style>