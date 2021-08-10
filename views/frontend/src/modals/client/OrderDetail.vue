<template>
  <div class="modal fade right"  id="order-detail" tabindex="-1" role="dialog" aria-labelledby="add-promocode" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width:calc(100% - 250px);" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header justify-content-start">

          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
          </button>
          <div>
            <h3 class="modal-title d-flex align-items-center">
              Order 33422
              <div class="green ml-4 d-flex align-items-center  detail-status">
                <i class=" circle-status fas fa-circle"></i>
                Done
              </div>
            </h3>
            <span  class="detail-date">Created  {{orderDetail.createdAt?orderDetail.createdAt.slice(0,10): ''}}</span>
          </div>

        </div>
        <div class=" myModal-body">
          <div class="row">
            <div class="col-lg-8 ">
              <h3 class="detail-product">Products</h3>

              <div class="table">
                <div class="d-flex main-content-header">
                  <div class="table-head" style="width: 50%;">Product</div>
                  <div class="table-head" style="width: 20%;">Price</div>
                  <div class="table-head" style="width: 20%;">Quantity</div>
                  <div class="table-head" style="width: 15%;">Total</div>

                </div>

                <div class="table-content">
                  <div  v-for="order in orderDetail.products" :key="order._id" class="table-item d-flex align-items-center" >
                    <div  class="d-flex align-items-center"  style="width: 50%;">
                      <div class="table-img">
                        <img v-if="order.img" :src="imgSrc+'/'+order.img">
                        <img v-else src="../../assets/icons/no-catalog.svg">
                      </div>
                      {{order.name}}
                    </div>
                    <div style="width:20%">{{order.price}}$</div>
                    <div style="width:20%" ><div class="quantity">{{order.quantity}}</div></div>
                    <div style="width:15%">{{order.quantity*order.price}} $</div>

                  </div>

                </div>
              </div>


            </div>


            <!------------------------------------------Right Side-------------------------->
            <div class="col-lg-4">
              <h3 class="client-sub-title">Client</h3>
              <div  class="client-box d-flex align-items-center">
                <div  class="d-flex align-items-center">
                  <img class="client-avatar" v-if="orderDetail.avatar" :src="imgSrc+'/'+orderDetail.avatar">
                  <img class="client-avatar" v-else src="../../assets/icons/chat.svg">
                  <div>
                    <h2 class="name-client">{{orderDetail.client_name}}</h2>
                    <div class="category">
                      Category:
                      <span v-if="orderDetail.category !== undefined">{{orderDetail.category.name}}</span>
                      <span v-else>no </span>
                    </div>
                  </div>
                </div>
              </div>
              <h3 class="client-sub-title">Delivery method</h3>
              <span class="deliveryType">{{orderDetail.deliveryType}}</span>
              <span class="category">
              {{orderDetail.address}}
              </span>

              <div class="line"></div>
              <h3 class="client-sub-title">Payment upon receipt</h3>

              <ul class="p-0">
                <li class="payment-list d-flex justify-content-between">Subtotal <span>{{subTotal}} $</span></li>
                <li class="payment-list d-flex justify-content-between">Discount<span>{{orderDetail.totalDiscount}} $</span></li>
                <li class="payment-list d-flex justify-content-between">Personal discount<span>0%</span></li>
                <li class="payment-list d-flex justify-content-between">Promocode<span>0(0%)</span></li>
                <li class="payment-list d-flex justify-content-between">Points<span>{{orderDetail.points}}</span></li>
              </ul>

              <div class="line"></div>
              <div class="d-flex mb-5 justify-content-between align-items-center">
                <h3 class="total-price">Total</h3>
                <h3 class="total-price">{{orderDetail.totalPrice}} $</h3>
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
  name: "OrderDetail",
  props:['orderDetail'],
  data(){
    return{
      imgSrc:''
    }
  },
  computed:{
    subTotal(){
     if(this.orderDetail.products){
       let sum = 0;
       this.orderDetail.products.forEach((item)=>{
         sum+=item.price*item.quantity
       })
       return sum
     }
     return false;
    }
  },
  mounted(){
    this.imgSrc = this.$server;
  }
}
</script>

<style scoped>
.detail-status{
  font-weight: normal;
  font-size: 14px;

}
.client-sub-title{
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 15px;
}
.quantity{
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  width: 59px;
  height: 36px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.detail-date{
  color: #8C94A5;
  font-size: 14px;

}
.detail-product{
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 24px;
}
.main-content-header{
  padding: 5px 20px;
}
.table{
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  padding:20px 30px;
  margin-bottom: 13px;
}
.table-content{
  height: calc(100vh - 320px);

}
.client-box{
  padding: 0 20px;
  background: #F8F9FF;
  border-radius: 5px;
  margin-bottom: 19px;
  height: 80px;
}
.client-avatar{
  width: 50px;
  height: 50px;
  border-radius:50%;
  object-fit: cover;
  margin-right: 13px;
}
.name-client{
  font-size: 18px;
  font-weight:  normal;
  margin-bottom: 5px;
}
.category{
  color: #8C94A5;
}
.category span{
  color:#000;
  text-transform: capitalize;

}
.deliveryType{
  background: #F8F9FB;
  height: 45px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-radius:5px;
}
.line{
  margin: 18px 0;
}
.payment-list{
  margin-bottom: 10px;
}
</style>