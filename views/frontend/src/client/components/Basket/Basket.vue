<template>
<div>
  <div class="show-path"><img class="path-img" src="../../../assets/clients/path-img.svg">Back | <span>Shopping cart</span>

  </div>
  <div class="d-flex align-items-center path-box"><img class="mr-2" src="../../../assets/clients/slide.svg"><h3 class="path-title">{{$route.name}}</h3></div>
  <div class="client-table-header">
    <div class="client-table-head" style="width:40%">Products</div>
    <div class="client-table-head" style="width:20%">Amount</div>
    <div class="client-table-head" style="width:14%">Discount</div>
    <div class="client-table-head" style="width:14%">Price</div>
    <div class="client-table-head" style="width: 12%"></div>

  </div>
  <BasketItem v-bind:shoppingList="shoppingList"/>

  <div>
    <div class="row confirm">
      <div class="col-lg-5">
        <h3 class="cashback-sub-title">Sales</h3>
        <div class="sales"><input><img src="../../../assets/icons/Discount.svg"></div>
      </div>
      <div class="col-lg-3"></div>
      <div class="col-lg-4">
        <div class="confirm-order">
          <h3>Discount</h3>
          <span class="discount">0%</span>
        </div>
        <div class="confirm-order">
          <h3>Delivery</h3>
          <span class="free">Free</span>
        </div>
        <p>Order another 500$ for free shopping</p>

        <div class="total d-flex justify-content-between mb-4">
          <h3>Total</h3>
          <h3>500$</h3>
        </div>
        <div class="confirm-btns d-flex justify-content-between">
          <button class="confirm-continue-btn">Continue shopping</button>
          <button class="confirm-order-btn" @click="confirm">Confirm order</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import BasketItem from "@/client/components/Basket/BasketItem";
export default {
name: "Basket",
  components:{
    BasketItem
  },
  data(){
    return{
      shoppingList:[
        {id:1, name:'Polo ralph lauren', code:'1617W11F', count:0, price:'250$'},
        {id:2, name:'Polo ralph lauren', code:'1617W11F', count:0, price:'250$'},
        {id:3, name:'Polo ralph lauren', code:'1617W11F', count:0, price:'250$'},
      ]
  }
  },
  methods:{
  confirm(){
    this.$router.push('/home/personal-info')
  }
  }
}
</script>

<style scoped>
.confirm-order{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.confirm-order h3{
  color: #484848;
  font-size: 18px;
}
.confirm-order{
  margin-bottom: 10px;
}
.confirm p{
  color: #858585;
  font-size: 14px;
  margin-bottom: 40px;
}
.confirm{
  margin-top: 40px;
  font-size:16px;
}
.confirm .discount{
  font-weight: bold;
  font-size: 16px;
}
.free{
  color: #5CBD85;
}
.confirm-order-btn{
  background: #616CF5;
  border-radius: 5px;
  color:#fff;
  height:37px;
  display: flex;
  align-items: center;
  padding:0 20px;
  font-size: 16px;
  transition: .3s;
  border:none;
  justify-content: center;
}
.confirm-continue-btn{
  border: 1px solid #D3D3D3;
  box-sizing: border-box;
  border-radius: 5px;
padding:0 20px;
  height:37px;
  font-size: 16px;
  color: #8C94A5;
  background: #fff;
  transition: .3s;
}
.total h3{
  font-size: 26px;
}
.confirm-btns{
  margin-bottom: 100px;
}
.sales{
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  height: 40px;
  width:220px;
  display: flex;
  justify-content: center;
  margin-top: 15px;
  align-items: center;
  padding:010px;
}
.sales img{
  width: 18px;
  height:18px;
}
.sales input{
  border:none;
  width: 100%;
  margin-right: 10px;

}
</style>