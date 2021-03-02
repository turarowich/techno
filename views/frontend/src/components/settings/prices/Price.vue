<template>
<div class="price">
  <h3 class="cashback-sub-title mb-3">Choose tariff</h3>

  <div class="container-fluid pl-0">
    <div class="row">
      <div class="col-lg-4">
        <div class="card-price">
          <div class="price-head d-flex align-items-center mb-4">
            <img class="price-img mr-2" src="../../../assets/icons/start-setting.svg">
            <h1 class="price-title">Start</h1>
          </div>
          <div class="price-body">
            <ul class="price-menu">
              <li class="price-list"><a href="#">Customer base</a><span>200</span></li>
              <li class="price-list"><a href="#">Link to the site</a><img src="../../../assets/icons/true.svg"></li>
              <li class="price-list"><a href="#">Users</a><span>1</span></li>
              <li class="price-list"><a href="#">Loyalty</a><img src="../../../assets/icons/x.svg"></li>
              <li class="price-list"><a href="#">Chats with clients</a><img src="../../../assets/icons/true.svg"></li>
              <li class="price-list"><a href="#">Push notification</a><img src="../../../assets/icons/true.svg"></li>
              <li class="price-list"><a href="#">Product catalog</a><img src="../../../assets/icons/true.svg"></li>
              <li class="price-list"><a href="#">Managing orders</a><img src="../../../assets/icons/true.svg"></li>
              <li class="price-list"><a href="#">Managing statuses</a><img src="../../../assets/icons/true.svg"></li>
            </ul>
          </div>
          <div class="price-foot d-flex align-items-center">
            <h1>19$</h1>
            <span>/month</span>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card-price">
          <div class="price-head d-flex align-items-center mb-4">
            <img class="mr-2 price-img " src="../../../assets/icons/pro.svg">
            <h1 class="price-title">Pro</h1>
          </div>
          <div class="price-body">
            <ul class="price-menu">
              <li class="price-list"><a href="#">Customer base</a><span>unlimited</span></li>
              <li class="price-list"><a href="#">Link to the site</a><img src="../../../assets/icons/true.svg"></li>
              <li class="price-list"><a href="#">Users</a><span>unlimited</span></li>
              <li class="price-list"><a href="#">Loyalty</a><img src="../../../assets/icons/true.svg"></li>
              <li class="price-list"><a href="#">Chats with clients</a><img src="../../../assets/icons/true.svg"></li>
              <li class="price-list"><a href="#">Push notification</a><img src="../../../assets/icons/true.svg"></li>
              <li class="price-list"><a href="#">Product catalog</a><img src="../../../assets/icons/true.svg"></li>
              <li class="price-list"><a href="#">Managing orders</a><img src="../../../assets/icons/true.svg"></li>
              <li class="price-list"><a href="#">Managing statuses</a><img src="../../../assets/icons/true.svg"></li>
            </ul>
          </div>
          <div class="price-foot d-flex align-items-center">
            <h1>29$</h1>
            <span>/month</span>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card-price app d-flex align-items-center justify-content-center">
            <div class="text-center">
              <img class="mb-2 app-img" src="../../../assets/icons/app.svg">
              <h3>+ App</h3>
              <p>With this tariff, you will have
                a unique mobile app
              </p>
            </div>
          <div class="price-foot app-foot d-flex align-items-center">
            <h1>29$</h1>
            <span>/month</span>
          </div>
        </div>

      </div>
    </div>

    <h3 class="cashback-sub-title mb-4 mt-4">Select the validity period</h3>
    <div class="row">
      <div class="col-3">
        <div class="validity-period">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="validity-title">3 month</h3>
            <div class="round">
              <input type="checkbox" id="checkbox" />
              <label for="checkbox"></label>
          </div>
          </div>
          <div class="valid-desc">19$/month</div>
        </div>
      </div>

      <div class="col-3">
        <div class="validity-period">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="validity-title">6 month</h3>
            <div class="round">
              <input type="checkbox" id="checkbox2" />
              <label for="checkbox2"></label>
            </div>
          </div>
          <div class="valid-desc">19$/month</div>
        </div>
      </div>

      <div class="col-3">
        <div class="validity-period">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="validity-title">9 month</h3>
            <div class="round">
              <input type="checkbox" id="checkbox3" />
              <label for="checkbox3"></label>
            </div>
          </div>
          <div class="valid-desc">19$/month</div>
        </div>
      </div>

      <div class="col-3">
        <div class="validity-period mb-4 " v-on:click="checkBlock">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="validity-title">12 month</h3>
            <div class="round">
              <input type="checkbox" id="checkbox4" />
              <label for="checkbox4"></label>
            </div>
          </div>
          <div class="valid-desc">19$/month</div>
        </div>
      </div>
    </div>

      <h3 class="cashback-sub-title">Total</h3>
      <div class="total justify-content-between d-flex align-items-center">
        <div class="total-price d-flex ">
          <div class="pr-5 mr-5 total-left">
            <p class="valid-desc">Benefits:</p>
            <h3>0$</h3>
          </div>
          <div>
            <p class="valid-desc">To be paid:</p>
            <h3>57$</h3>
          </div>
        </div>
        <div>
          <button class="save">Pay</button>
        </div>
      </div>
  </div>

</div>
</template>

<script>

export default {
name: "Price",

}
</script>

<style scoped>
.price{
  width: 60%;
  padding-bottom: 50px;
}
.price-img{
  width:22px;
  height: 22px;
}
.card-price{
  padding:20px;
  border: 1px solid #D3D3D3;
  border-radius: 7px;
  height:360px;
  transition: .4s;
}
.card-price:hover{
  border: 1px solid #616CF5;

}
.app{
  background: #F0F2FF;
}
.app h3{
  color: #616CF5;
  font-size: 20px;
}
.app p{
  color: #8C94A5;
}
.app-foot{
  position: absolute;
  bottom: 10px;
}
.app-img{
  width: 56px;
  height: 56px;
}
.price-title{
  color: #606877;
  font-size: 20px;
  margin-bottom: 0;
}
.price-menu{
  padding: 0;
  margin-bottom:20px;
}
.price-list{
  list-style-type: none;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-list a, .price-list{
  color: #8C94A5;
  text-decoration: none;
}
.price-list a:hover{
  color: #616CF5;
}
.price-foot h1{
  color: #616CF5;
  font-size: 26px;
  margin-right: 5px;
}
.price-foot span{
  color: #B0B0B0;
}
.validity-period{
  padding: 10px;
  border: 1px solid #D3D3D3;
  border-radius: 7px
}
.validity-title{
  font-size: 20px;
}
.valid-desc{
  color: #B0B0B0;
  margin-bottom: 10px;
}
.validity-period input{
  width:12px;
  height: 12px;
}
.round {
  position: relative;
}

.round label {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: 20px;
  right: 0;
  position: absolute;
  top: -5px;
  width:20px;
}

.round label:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: "";
  height: 6px;
  left: 4px;
  opacity: 0;
  position: absolute;
  top: 4px;
  transform: rotate(-45deg);
  width: 10px;
}
.round input[type="checkbox"] {
  visibility: hidden;
}
.round input[type="checkbox"]:checked + label {
  background-color: #616CF5;
  border-color: #616CF5;
}
.round input[type="checkbox"]:checked + label:after {
  opacity: 1;
}
.total{
  border: 1px solid #D3D3D3;
  border-radius: 7px;
  padding: 10px 20px;
}
.total-price h3{
  font-size: 24px;
}
.total-left{
  border-right: 1px solid #D3D3D3;
}


</style>