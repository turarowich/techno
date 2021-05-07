<template>
<div class="container client-container">
  <div class="show-path"><img class="path-img" src="../../../assets/clients/path-img.svg"><div @click="$router.go(-1)" class="mr-1">Back </div> | <span>Shopping cart</span>

  </div>
  <div class="d-flex align-items-center path-box" @click="$router.go(-1)"><img class="mr-2" src="../../../assets/clients/slide.svg"><h3 class="path-title">{{$route.name}}</h3></div>
  <div class="row">
    <div class="col-lg-9">

      <div class="client-table-header">
        <div class="client-table-head" style="width:40%">Products</div>
        <div class="client-table-head" style="width:20%">Amount</div>
        <div class="client-table-head" style="width:14%">Discount</div>
        <div class="client-table-head" style="width:14%">Price</div>
        <div class="client-table-head" style="width: 12%"></div>

      </div>
      <BasketItem
          :shoppingList="shoppingCart"
      />



    </div>

    <div class="col-lg-3">
        <div class="sales">
          <h3 class="cashback-sub-title">Sales</h3>
          <p class="sales-text">Take advantage of the points for additional discount</p>

            <div class="bonus-notification">
              <span class="bonus-span">My bonuses: 100</span>
              <h3 class="bonus-number">90</h3>
            </div>

          <div class="sales-input d-flex">
            <input class="cashback-input" placeholder="Enter a promocode">
            <img src="../../../assets/icons/Discount.svg">
          </div>

          <div class="delivery">
            <h3 class="cashback-sub-title">Delivery</h3>
            <div class="personal-btns">
              <div style="width:50%" class="btns-item"><span class="btn-round"></span>Delivery</div>
              <div style="width:50%" class="btns-item mr-0"><span class="btn-round"></span>Pick-up service</div>
            </div>

            <label class="cashback-label">Deliver address</label><br>
            <input type="text" class="cashback-input" placeholder="Enter your address"/>

            <div class="d-flex align-items-center map-box">
              <img class="mr-2" src="../../../assets/clients/map.svg"> <span class="on-map">Specify on the map</span>
            </div>

            <div class="line"></div>

            <div class="total">
              <div class=" discount d-flex justify-content-between">
                <h3>Discount</h3>
                <span>50 %</span>
              </div>

              <div class="delivery d-flex justify-content-between">
                <h3>Delivery</h3>
                <span style="color:#5CBD85;">Free</span>
              </div>
              <p>Order another 500$ for free shipping</p>
              <div class="d-flex justify-content-between">
                <h4>Total</h4>
                <h4>300 $</h4>
              </div>

              <div class="d-flex justify-content-between ">
                <button class="cancel">Continue shopping</button>
                <button class="save" @click="$router.push('/home/personal-info')">Confirm order</button>
              </div>
            </div>

          </div>

        </div>
    </div>
  </div>
  <div>
  </div>
</div>
</template>

<script>
import BasketItem from "@/client/components/Basket/BasketItem";
import {mapGetters} from 'vuex'
import $ from "jquery";

export default {
name: "Basket",
  components:{
    BasketItem,
  },



  computed:{
  ...mapGetters(["Orders/shoppingCart", ])
  },
  methods:{
    confirm(){
      if(this.shoppingCart.length === 0){
        this.$warningAlert("Your shopping is empty")
      }
      else{
        this.$router.push('/home/personal-info')
      }
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
    this.$store.dispatch('Orders/countOrders')
    this.addActive()
  }
}
</script>

<style scoped>
.sales .cashback-sub-title{
  margin-bottom: 10px;
}
.sales-text{
  color:#858585;
}
.bonus-number{
  color:#616CF5;
  font-size:24px;
  font-weight: normal;
}
.bonus-span{
  font-weight: normal;
}
.sales-input{
  border: 1px solid #E3E3E3;
  border-radius: 5px;
  height: 40px;
  padding:0 10px;
  margin-bottom: 42px;
}
.sales-input input{
  border:none;
  width: 100%;
  height: 100%;
}
.sales .bonus-notification{
  margin-bottom: 30px;
}
.delivery .cashback-sub-title{
  margin-bottom: 20px;
}
.delivery .cashback-input{
  width: 100%;
  height: 40px;
  margin-bottom: 27px;
}
.delivery .personal-btns{
  margin-bottom: 30px;
}
.delivery .map-box{
  margin-bottom: 48px;
}
.total h3{
  font-size: 18px;
  font-weight: normal;
  color:#484848;
}
.discount{
  margin-bottom: 10px;
}
.total .delivery{
  margin-bottom: 5px;
}
.discount span{
  font-size: 16px;
  font-weight: normal;
}
.total p{
  color:#858585;
  margin-bottom: 45px;
}
.total h4{
  font-size: 26px;
  font-weight: normal;
  margin-bottom: 25px;
}
.cancel{
  padding: 0 10px;
}

</style>