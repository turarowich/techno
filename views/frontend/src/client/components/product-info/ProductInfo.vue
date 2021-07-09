<template>
<div>
  <h2 class="order-title">Order</h2>
  <p class="order-date">{{today}}</p>

  <div class="container">
    <div class="row">
      <div class="col-lg-10 col-md-12 m-auto">
        <div class="row mb-5">
          <div class="col-lg-6">
            <div class="info-order">
              <h3 class="info-title">Information about your order</h3>
              <p class="info-text">We will call you within an hour to clarify the details of the order</p>
              <div class="line"></div>
              <div class="d-flex justify-content-between">
                <span class="info-heading">Delivery type</span>
                <div>
                  <p class="pick-up">{{deliveryType.type || ''}}</p>

                  <span v-if="deliveryType.type==='Delivery service'" style="color:#8C94A5">
                 <span>{{deliveryType.object.name || ''}}</span><br>
                 <span>{{deliveryType.object.price || ''}} {{catalog_settings.currency}}</span><br>
                 <span>{{getAddress || ''}}</span>
               </span>
                  <span v-else style="color:#8C94A5">
                 <span>Address: </span>
                 <span>{{deliveryType.object.address || ''}}</span><br>
                 <span>Phone: </span>
                 <span>{{deliveryType.object.phone || ''}}</span>
               </span>
                </div>

              </div>
            </div>
          </div>
          <div class="col-lg-6">

            <div class="basket-hover">
              <div class="basket-header">
                <h5>Your order</h5>
              </div>
              <div class="line"></div>
              <div class="scroll-basket">
                <div v-for="cart_item in shoppingCart" :key="cart_item.product._id" class="order-item d-flex align-items-start">
                  <div  class="basket-img">
                    <img v-if="cart_item.product.img" :src="imgSrc+'/'+cart_item.product.img">
                    <img v-else src="../../../assets/icons/no-catalog.svg">
                  </div>
                  <div style="width:60%">
                    <h3 class="basket-title long-text">{{ cart_item.product.name }}</h3>
                    <div class="d-flex">
                      <span class="basket-code" style="flex: 3;">{{ cart_item.product.vendorCode }}</span>
                      <span class="basket-code" style="flex: 2;">{{ cart_item.quantity }}x</span>
                    </div>
                  </div>
                  <div class="basket-price " style="width:20%">{{cart_item.current_price}} {{catalog_settings.currency}}</div>
                </div>
              </div>
              <div class="mt-5">
                <div class="d-flex">
                  <div  style="flex: 1;">
                    Subtotal
                  </div>
                  <div>
                    <h5>{{getTotalPrice}} {{catalog_settings.currency}}</h5>
                  </div>
                </div>
                <div class="d-flex">
                  <div  style="flex: 1;">
                    Delivery
                  </div>
                  <div>
                    <h5>{{getDeliveryCost}} {{catalog_settings.currency}}</h5>
                  </div>
                </div>
                <div class="d-flex">
                  <div style="flex: 1; margin-bottom:15px;">
                    Points used
                  </div>
                  <div>
                    <h5 style="color:#007bff;">-{{getUsedPoints}} {{catalog_settings.currency}}</h5>
                  </div>
                </div>
                <div class="d-flex">
                  <div style="flex: 1;">
                    <h5>Total</h5>
                  </div>
                  <div>
                    <h4>{{getFinalSum}} {{catalog_settings.currency}}</h4>
                  </div>
                </div>
                <div class="d-flex">
                  <div v-if="futurePoints>0" style="flex: 1;color: #616CF5;">
                    <span v-if="clientAuth">You will receive {{futurePoints}} cashback points</span>
                    <span v-else>Login to receive {{futurePoints}} {{catalog_settings.currency}} cashback points</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

     <div class="container">
       <div class="row">
         <div class="col-lg-6 p-0 d-flex justify-content-center">
           <button @click="confirmNorder" class=" save final_order_btn">
             Confirm and order
           </button>
         </div>
       </div>
     </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "ProductInfo",
  data(){
    return{
      today: new Date().toLocaleDateString(),
      futurePoints:0,
      imgSrc:''
    }
  },
  computed:{
    catalog_settings(){
      return this.$store.getters['Catalog/getCatalog_settings'];
    },
    clientAuth() {
      return this.getClientAuth();
    },
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
    shoppingCart(){
      return this.$store.state.Orders.shoppingCart;
    },
    deliveryType(){
      return this.$store.getters['Orders/getDeliveryTypeObject'];
    },
    getTotalPrice(){
      // return this.$store.getters['Orders/getTotalPriceWithDelivery'];
      return this.$store.getters['Orders/getTotalPrice'];
    },
    getTotalPriceFull(){
      return this.$store.getters['Orders/getTotalPriceFull'];
    },
    getFinalSum(){
      return this.$store.getters['Orders/getFinalSum'];
    },
    getUsedPoints(){
      return this.$store.getters['Orders/getUsedPoints'];
    },
    getDeliveryCost(){
      return this.$store.getters['Orders/getDeliveryCost'];
    },
    getTotalDiscounts(){
      return this.$store.getters['Orders/getTotalDiscounts'];
    },
    user(){
      return this.$store.getters['Client/getUser'];
    },
    guest(){
      return this.$store.getters['Orders/getGuest'];
    },
    getPromocode(){
      return this.$store.getters['Orders/getPromocode'];
    },
    getAddress(){
      return this.$store.getters['Orders/getAddress'];
    },
  },
  methods:{
    confirmNorder(){
      let that=this;
      const options = {
        headers: {"x-client-url": this.currentCompanyCatalog}
      }
      let url = this.url('addOrderWeb');
      let products = this.shoppingCart.map(function (order){
        return {id:order.product._id,quantity:order.quantity}
      })
      let data = {
        guest:this.guest,
        client:this.user ? this.user._id  : null,
        points:this.getUsedPoints || 0,
        promoCode:this.getPromocode ? this.getPromocode._id : null,
        status:"In Progress",
        address:this.getAddress,
        deliveryType:this.deliveryType.type,
        notes:"notttttes",
        products:products,
        //
        deliveryPrice:this.deliveryType.object.price || 0,
        totalDiscount:this.getTotalDiscounts || 0,
        productsPrice:this.getTotalPriceFull || 0,
        totalPrice:this.getFinalSum || 0,
        products_full_data:this.shoppingCart,
      }
      if(this.deliveryType.type ==="Delivery service"){
        data.delivery = this.deliveryType.object._id;
      }else{
        data.branch = this.deliveryType.object._id;
      }
      this.axios.post(url,data,options).then(function (response) {
        console.log(response);
        that.$successAlert('Order sent');
        that.$store.dispatch('Orders/clearAll');
        that.$router.push({ path: `/${that.currentCompanyCatalog}`});
      }).catch(function(error){
        if (error.response) {
          that.$warningAlert(error.response.data);
        }
      });
    },
    getFuturePoints(){
      let that=this;
      const options = {
        headers: {"x-client-url": this.currentCompanyCatalog}
      }
      let url = this.url('getEarnedPoints');
      let data = {
        products_full_data:this.shoppingCart,
      }
      this.axios.post(url,data,options).then(function (response) {
        that.futurePoints = response.data;
      }).catch(function(error){
        if (error.response) {
          console.log(error.response);
          that.$warningAlert(Object.values(error.response.data.errors))
        }
      });
    },
  },
  mounted() {
    this.getFuturePoints();
    this.imgSrc = this.$server;
    console.log(this.shoppingCart, "FFFFFFFFFFFFFFFFFFFFFFFFF")
  }
}
</script>

<style scoped>
.scroll-basket{
  max-height: 350px;
  overflow-y: auto;
}
.long-text{
  width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}
.order-item{
  border-bottom: 1px solid #F4F4F4;
  margin-bottom: 20px;
}
.order-title{
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  margin-top: 39px;
}
.order-date{
  color:#999;
  text-align: center;
  font-size: 16px;
  margin-bottom: 47px;
}
.info-order{
  /*width: 80%;*/
}
.info-title{
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
}
.info-text{
  color:#999999;
  text-align: center;
  margin-bottom: 24px;
}
.info-heading{
  color:#8C94A5;
  font-weight: normal;
}
.pick-up{
  margin-bottom: 8px;
}
.basket-hover{

  border-radius: 10px;
  padding: 20px;
  padding-bottom:24px;
  background: #FCFCFF;

}


.basket-header{
  padding-bottom:10px;
}
.basket-header h5{
  color:#222;
  font-weight: 600;
  font-size: 20px;
}
.basket-img img{
  height:60px;
  width: 60px;
  object-fit: contain;
  border-radius:50%;
}
.basket-img{
  width: 20%;
}

.basket-title{
  font-size:16px;
  font-weight: normal;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.basket-code{
  color: #B0B0B0;
}
.basket-price{
  font-size: 18px;
  font-weight: normal;
}
.final_order_btn{
  height: 45px;
  background: #616CF5;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  width: 90%;
}
.final_order_btn:hover{
  background: #3B4DB3;
  transition:.3s;
}
@media(max-width:576px){
  .info-order, .basket-hover{
    width: 100%;
  }
  .basket-hover{
    margin-top: 50px;
    padding: 0;
    background: #fff;
  }
  .basket-price{
    font-size: 16px;
  }
  .long-text{
    width: 100px;
  }
  .final_order_btn{
    width: 100%;
  }

  .basket-img img{
    width: 60px;
    height: 60px;
  }

}
</style>