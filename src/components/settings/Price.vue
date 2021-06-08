<template>
<div class="price">
  <h3 class="cashback-sub-title mb-3">Choose tariff</h3>

  <div class="container-fluid pl-0">
    <div class="row">
      <div class="col-lg-3 pr-0">
        <div class="card-price"  id="one" @click="addClassFree">
          <div class="price-head d-flex align-items-center mb-4">
            <img class="price-img" src="../../assets/icons/start-setting.svg">
            <h1 class="price-title">Start</h1>
          </div>
          <div class="price-body">
            <ul class="price-menu">
              <li class="price-list"><span>Customer base</span><span>200</span></li>
              <li class="price-list"><span>Link to the site</span><img src="../../assets/icons/true.svg"></li>
              <li class="price-list"><span>Users</span><span>1</span></li>
              <li class="price-list"><span>Loyalty</span><img src="../../assets/icons/x.svg"></li>
              <li class="price-list"><span>Chats with clients</span><img src="../../assets/icons/true.svg"></li>
              <li class="price-list"><span>Push notification</span><img src="../../assets/icons/true.svg"></li>
              <li class="price-list"><span>Product catalog</span><img src="../../assets/icons/true.svg"></li>
              <li class="price-list"><span>Managing orders</span><img src="../../assets/icons/true.svg"></li>
              <li class="price-list"><span>Managing statuses</span><img src="../../assets/icons/true.svg"></li>
            </ul>
          </div>
          <div class="price-foot d-flex align-items-center">
            <h1>Free</h1>
          </div>
        </div>
      </div>
      <div  class="col-lg-3 pr-0">
        <div class="card-price"  @click="addClassStart" id="two">
          <div class="price-head d-flex align-items-end mb-4">
            <img class="price-img " src="../../assets/icons/pro.svg">
            <h1 class="price-title">Pro</h1>
          </div>
          <div class="price-body">
            <ul class="price-menu">
              <li class="price-list"><span>Customer base</span><span>unlimited</span></li>
              <li class="price-list"><span>Link to the site</span><img src="../../assets/icons/true.svg"></li>
              <li class="price-list"><span>Users</span><span>unlimited</span></li>
              <li class="price-list"><span>Loyalty</span><img src="../../assets/icons/true.svg"></li>
              <li class="price-list"><span>Chats with clients</span><img src="../../assets/icons/true.svg"></li>
              <li class="price-list"><span>Push notification</span><img src="../../assets/icons/true.svg"></li>
              <li class="price-list"><span>Product catalog</span><img src="../../assets/icons/true.svg"></li>
              <li class="price-list"><span>Managing orders</span><img src="../../assets/icons/true.svg"></li>
              <li class="price-list"><span>Managing statuses</span><img src="../../assets/icons/true.svg"></li>
            </ul>
          </div>
          <div class="price-foot d-flex align-items-center">
            <h1>10$</h1>
            <span>/month</span>
          </div>
        </div>
      </div>
      <div class="col-lg-3 pr-0">
        <div @click="addClassApp" id="three" class="card-price app d-flex align-items-center justify-content-center">
            <div class="text-center">
              <img class="mb-2 app-img" src="../../assets/icons/app.svg">
              <h3>+ App</h3>
              <p>With this tariff, you will have
                a unique mobile app
              </p>
            </div>
          <div class="price-foot app-foot d-flex align-items-end">
            <h1>299$</h1>
            <span>/first year</span>
          </div>
        </div>

      </div>
    </div>

    <h3 class="cashback-sub-title mb-4 mt-4">Select the validity period</h3>
    <div class="row month mb-4">
      <div class="col-3 pr-0"  v-for="price in prices" :key="price.id"  >
        <div class="validity-period">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="validity-title">{{price.month}} month</h3>
            <div class="round-price">
              <img src="../../assets/icons/bird.svg">
            </div>
          </div>
          <div class="valid-desc"><span class="valid-desc-price">{{price.price}}</span>$/month</div>
        </div>
      </div>
    </div>

    <h3 class="cashback-sub-title mb-3">Total</h3>
    <div class="total justify-content-between d-flex align-items-center">
        <div>
          <p class="valid-desc">To be paid:</p>
          <h3>{{tobePaid}}$</h3>
        </div>

        <div>
          <button class="save">Pay</button>
          </div>
        </div>

  </div>

</div>
</template>

<script>
import $ from 'jquery';
export default {
name: "Price",
  data(){
      return{
        prices:[
          {id:1 ,month:6, price:0},
          {id:2 ,month:9, price:0},
          {id:3 ,month:12, price:0},
          {id:4 ,month:24, price:0},
        ],
        checked:true,
        tobePaid:0
      }
  },

  methods:{
    addClassFree() {
    $('#two').removeClass('active');
    $('#three').removeClass('active');
    $('#one').addClass('active');
      this.prices.map(price=>{
        return price.price = 0
      })
    },
    addClassStart() {
      $('#one').removeClass('active');
      $('#three').removeClass('active');
      $('#two').addClass('active')
      this.prices.map(price=>{
       return price.price = price.month * 29
      })
    },
    addClassApp() {
      $('#two').removeClass('active');
      $('#one').removeClass('active');
      $('#three').addClass('active');
      this.prices.map(price=>{
        return price.price = price.month * 299;
      })
    },
    addActiveMonth(){
      $(document).ready(function() {
        $('.validity-period').click(function() {
          $('.validity-period.active').removeClass("active");
          $(this).addClass("active");
        });
      });
    }
  },
mounted(){
  this.addActiveMonth()
}



}
</script>

<style scoped>
.save{
  width: 120px;
}
.validity-period.active{
  border: 1px solid #616cf5;
  transition: .3s;

}
.validity-period.active .round-price{
  background: #616cf5;
  border:none;
}
.month{
  width: 76.6%;
}
.price{
  padding-bottom: 50px;
}
.price-img{
  width:22px;
  height: 22px;
  margin-right: 5px;
}
.card-price{
  padding:20px;
  border: 1px solid #D3D3D3;
  border-radius: 7px;
  height:370px;
  transition: .4s;
  cursor:pointer;
  font-size:14px;
}
.card-price:hover{
  border: 1px solid #616CF5;
}
.card-price.active{
  border: 1px solid #616CF5;
}
.app{
  background: #F0F2FF;
  position: relative;
}
.app h3{
  color: #616CF5;
  font-size: 20px;
  margin-bottom: 10px;
}
.app p{
  color: #8C94A5;
  font-size: 14px;
}
.app-foot{
  position: absolute;
  bottom: 20px;
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
  font-size: 14px;
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
  border-radius: 7px;
  cursor:pointer;
}
.validity-title{
  font-size: 20px;
}
.valid-desc{
  color: #B0B0B0;
  margin-bottom: 10px;
  font-size:14px;
}
.validity-period input{
  width:12px;
  height: 12px;
}

.total{
  border: 1px solid #D3D3D3;
  border-radius: 7px;
  padding: 10px 20px;
  width:75.5%;
}
.total-price h3{
  font-size: 24px;
}
.total-left{
  border-right: 1px solid #D3D3D3;
  margin-right: 50px;
  padding-right: 50px;
}
.round-price{
  width: 19px;
  height: 19px;
  background: #FFFFFF;
  border-radius:50%;
  display: flex;
  align-items:center;
  justify-content: center;
  border: 1px solid #D3D3D3;
}

</style>