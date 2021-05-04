<template>
<div class="order-detail">
  <div class="order-detail-header">
    <div class="d-flex align-items-center mb-1">
      <img class="mr-1" src="../../assets/icons/xBlack.svg">
      <h3 class="order-detail-title">Order 343224</h3>
      <div class="detail-status"><span></span>In process</div>
    </div>
    <span class="detail-date">Created 23 Apr 2021, 13:37</span>
  </div>

  <div class="row">
    <div class="col-lg-8">
      <h3 class="detail-product">Product</h3>
      <input class="enter-name-input" placeholder="+ Enter the name of product">
      <div class="table">
          <div class="d-flex main-content-header">
             <div class="table-head" style="width: 50%;">Product</div>
              <div class="table-head" style="width: 20%;">Price</div>
              <div class="table-head" style="width: 20%;">Quantity</div>
              <div class="table-head" style="width: 10%;">Total</div>
              <div class="table-head" style="width: 10%;"></div>
          </div>

        <div class="table-content">
            <div class="d-flex align-items-center h-100 justify-content-center flex-column" v-if="order_detail.length === 0">
                  <img class="empty-img" src="../../assets/icons/emptyOrder.svg">
                  <p class="empty-page-text">Add a product to start</p>
            </div>

          <div v-else class="table-item d-flex align-items-center" v-for="detail in order_detail" :key="detail.id">
            <div  class="d-flex align-items-center"  style="width: 50%;">
              <div class="table-img">
                <img src="../../assets/img/sneak.webp">
              </div>
              {{detail.name}}
            </div>
            <div style="width:20%">{{detail.price}} $</div>
            <div style="width:20%"><div class="quantity">{{detail.quantity}}</div></div>
            <div style="width:10%">{{detail.total}} $</div>
            <div style="width:10%"><img src="../../assets/icons/trash_empty.svg"></div>
          </div>

        </div>
      </div>
      <div class="notes">
        <h3 class="detail-product">Notes</h3>
        <input class="cashback-input">
      </div>

      <div class="d-flex">

        <div class="dropup ">
          <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <button class="save mr-2 ">Edit order</button>
          </div>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
            <ul class="list-group " >
              <li class="list-group-item">Done</li>
              <li class="list-group-item" >Cancel</li>
              <li class="list-group-item">Delete</li>
              <li class="list-group-item">In progress</li>
            </ul>
          </div>
        </div>
        <button class="cancel">Close</button>
      </div>
    </div>

<!------------------------------Right Side---------------------------------------------------------->

    <div class="col-lg-4">
      <h3 class="client-sub-title">Client</h3>

      <div  class="client-box d-flex align-items-center">
          <div v-if="order_detail.length === 0" class="client-search d-flex align-items-center">
              <img src="../../assets/icons/search-icon.svg" class="search-client-icon">
             <input placeholder="Enter clients name or phone number" class="search-client">
          </div>
        <div v-else class=" d-flex align-items-center">
          <img class="client-avatar" src="../../assets/img/criw.jpg">
          <div class="position-relative">
            <h2 class="name-client">Tomas Levins</h2>
            <div class="category">Category: <span>Vip</span> Points: <span>200</span></div>
          </div>
          <img class="close-client" src="../../assets/icons/deleteClient.svg">
        </div>
      </div>

      <h3 class="client-sub-title">Delivery method</h3>
      <div class="selects">
        <select class=" form-control long-form-control  form-control-lg" aria-label=".form-select-lg example">
          <option>Pick up</option>
          <option>Russia</option>
          <option>USA</option>
          <option>Kyrgyzstan</option>
        </select>
      </div>

      <span class="category">
        Branch: Manezhnaya pl., 1, bldg. 2, Bishkek, Kyrgyzystan, 125009
      </span>

      <div class="line"></div>
      <h3 class="client-sub-title">Personal discount</h3>
      <input class="cashback-input" placeholder="Enter amount or percentage">
      <div class="reload-code pr-2 d-flex align-items-center mr-0"><input placeholder="Enter a promocode"><button class="promo-btn"><img src="../../assets/icons/enable+.svg"></button></div>

     <div class="d-flex justify-content-between align-items-center">
       <div><label class="custom-checkbox mr-2"><input  type="checkbox"><span class="checkmark"></span></label>Use point</div>
        <h3 class="point-number">249</h3>
     </div>

      <div class="line"></div>

      <h3 class="client-sub-title">Payment upon receipt</h3>

      <ul class="p-0">
        <li class="payment-list d-flex justify-content-between">Inovoice amount<span>30 000 $</span></li>
        <li class="payment-list d-flex justify-content-between">Discount<span>300 $(5%)</span></li>
        <li class="payment-list d-flex justify-content-between">Personal discount<span>5%</span></li>
        <li class="payment-list d-flex justify-content-between">Promocode<span>100(5%)</span></li>
        <li class="payment-list d-flex justify-content-between">Points<span>100</span></li>
      </ul>

      <div class="line"></div>

      <div class="d-flex mb-5 justify-content-between align-items-center">
        <h3 class="total-price">Total</h3>
        <h3 class="total-price">29 700 $</h3>
      </div>


    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "OrdersDetail",
  data(){
    return{
      order_detail:[
        {id:1, name: 'Oliver twins', price: '200', quantity:23, total:'30000'},
        {id:2, name: 'Oliver twins', price: '200', quantity:23, total:'30000'},
        {id:3, name: 'Oliver twins', price: '200', quantity:23, total:'30000'},
        {id:4, name: 'Oliver twins', price: '200', quantity:23, total:'30000'},
        {id:5, name: 'Oliver twins', price: '200', quantity:23, total:'30000'},
        {id:6, name: 'Oliver twins', price: '200', quantity:23, total:'30000'},
      ]
    }
  }
}
</script>

<style scoped>
.client-search{
  width: 100%;
}
.client-search input{
  width: 100%;
  border:none;
  background: none;
}
.search-client-icon{
  margin-right: 10px;
  opacity: 0.5;
}
.empty-img{
  width: 67px;
  height: 54px;
}
.close-client{
  position: absolute;
  right:30px;
}
.dropup .dropdown-toggle::after{
  display:none;
}
.selects:before{
  content:'';
  background: url("../../assets/clients/slideRight.svg") no-repeat;
  width:20px;
  height:20px;
  position: absolute;
  z-index:88;
  right: 10px;
  transform: rotate(90deg);
  top:25%;

}
.selects{
  position: relative;

}

.form-control{
  margin-bottom: 15px;
  background: #F8F9FB;
  border:none;

}
.promo-btn img{
  width: 11px;
  height: 12px;
}
.enter-name-input::placeholder{
  color:#616cf5;
}
.promo-btn{
  background: #F4F4F4;
  /* Stroke */
  width: 34px;
  height: 32px;
  border: 1px solid #D3D3D3;
  box-sizing: border-box;
  border-radius: 5px;
}
.notes{
  margin-bottom: 38px;
}
.order-detail{
  padding: 0 30px;
}
.order-detail-header{
  padding: 30px 0;
}
.order-detail-title{
  color: #616CF5;
  font-weight: 600;
  font-size: 21px;
  margin-right: 20px;
}
.client-sub-title{
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 15px;
}
.point-number{
  font-size: 16px;
  color:#616cf5;
  font-weight: normal;
}
.detail-status span{
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius:50%;
  background: #F19C4B;
  margin-right: 5px;
}
.detail-status{
  color:#F19C4B;
}
.detail-date{
  color: #8C94A5;
  font-size: 14px;
  margin-left: 25px;
}
.detail-product{
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 24px;
}
.enter-name-input{
  border: 1px solid #616CF5;
  border-radius: 5px;
  height: 45px;
  width: 100%;
  padding: 0 30px;
  margin-bottom: 20px;
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
.quantity{
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  width: 59px;
  height: 36px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.table-content{
  height: calc(100vh - 520px);

}
.cancel{
  width: 120px;
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
  text-transform: uppercase;
}

.line{
  margin: 18px 0;
}
.cashback-input{
  width: 100%;
  margin-bottom: 12px;
}

.payment-list{
    color:#606877;
    margin-bottom: 5px;
}
.payment-list span{
  color:#000;
}
.total-price{
  font-size: 16px;
  font-weight: 600;
}
.reload-code{
  margin-bottom: 20px;
}
</style>