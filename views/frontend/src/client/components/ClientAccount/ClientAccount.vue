<template>
<div class="row">
  <div class="col-lg-10 m-auto">
    <div class="profile-info">
      <div class="d-flex align-items-center">
        <img class="client-avatar" src="../../../assets/clients/clientProfile.svg">
        <div>
          <h1 class="profile-title">Afsar Hossen <img src="../../../assets/clients/Edit.svg"></h1>
          <span class="profile-phone">+1812 546 28 53</span>
        </div>
      </div>
      <div class="logout">Logout <img class="ml-2" src="../../../assets/clients/log-out.svg"></div>
    </div>

    <div class="bonus-notification">
        <div class="d-flex align-items-center">
           <img class="mr-2" src="../../../assets/clients/Discount.svg"> <span class="bonus-span mb-0">My bonuses: 100</span>
        </div>
      <p class="client-paragraph mb-0">You can spend your current points or continue to accumulate them</p>
    </div>

    <ul class="nav nav-tabs mb-5">
      <li>
        <a class="disable-underline" data-toggle="tab" href="#menu1">
        <div class="order-tab d-flex align-items-center mr-4">
          <img src="../../../assets/clients/trash.svg">
          <h2 class="orders-title">Orders</h2>
          <div class="order-count">2</div>
        </div>
      </a>
      </li>
      <li>
        <a class="disable-underline" data-toggle="tab" href="#menu2">
        <div data-toggle="tab" class="order-tab d-flex align-items-center">
          <img src="../../../assets/clients/DiscountBlack.svg">
          <h2 class="orders-title">Bonus history</h2>
        </div>
      </a>
      </li>
    </ul>

    <div class="tab-content">
      <div id="menu1" class="tab-pane fade">
        <div class="d-flex main-content-header">
          <div class="table-head" style="width: 20%;">Name order</div>
          <div class="table-head" style="width: 14%;">Deliver address</div>
          <div class="table-head table-link " @click="sortByDate" style="width: 10%;">Date<img class="date-pol" style="margin-left:10px" src="../../../assets/icons/polygon.svg"></div>
          <div class="table-head " style="width: 12%;" >Total quantity </div>
          <div class="table-head " style="width: 12%; cursor: pointer">Delivery price</div>
          <div class="table-head" style="width: 12%; ">Discount</div>
          <div class="table-head table-link" @click="sortByTotal" style="width: 11%;">Total <img class="total-pol" style="margin-left:10px" src="../../../assets/icons/polygon.svg"></div>
          <div class="table-head" style="width:10%">Status</div>
        </div>
        <OrdersItem :orderList="orderList"/>

      </div>
      <div id="menu2" class="tab-pane fade">
         <div class="d-flex main-content-header">
          <div class="table-head te" style="width:50%">Name</div>
           <div class="table-head table-link " @click="sortByDate" style="width: 30%;">Date<img class="date-pol" style="margin-left:10px" src="../../../assets/icons/polygon.svg"></div>
           <div class="table-head d-flex justify-content-end" style="width:20%">Quantity</div>
         </div>
        <HistoryBonus :orderList="orderList"/>
      </div>
    </div>





  </div>
</div>
</template>

<script>
import HistoryBonus from "@/client/components/ClientAccount/HistoryBonus";
import OrdersItem from "@/client/components/ClientAccount/OrdersItem";
import $ from "jquery";
export default {
name: "ClientAccount",
  components:{
    OrdersItem,
    HistoryBonus
  },
  data(){
  return{
    orderList:[
      {id:1,name:"Essential Shoes",client:"Tomas Levins", phone:"0550457834", total:"450 $",date:"T2021-03-19",notes:"Please",status:'New'},
      {id:3,name:"AirForces",client:"Tomas Levins", phone:"0775896542", total:"13 $",date:"2021-03-19",notes:"Please" ,status:'New'},
      {id:4,name:"Krosses",client:"Tomas Levins", phone:"0500687909", total:"120 $",date:"2021-03-19",notes:"Please,",status:'New'},
      {id:5,name:"Essentialsss",client:"Tomas Levins", phone:"050068", total:"120 $",date:"2021-03-19",notes:"Please,",status:'Done'},
      {id:6,name:"Ess",client:"Tomas Levins", phone:"0500687909", total:"120 $",date:"2021-03-19",notes:"Please,",status:'Done'},
     ],
    sorting: true
  }
  },
  methods:{
    sortByDate() {
      if (this.orderList.length === 0) {
        return null;
      } else {
        this.orderList.sort((a, b) => {
          return this.sorting ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
        })
        this.sorting = !this.sorting;
        $('.date-pol').toggleClass('active')
        $('.total-pol').removeClass('active')
      }
    },
    sortByTotal() {
      if (this.orderList.length === 0) {
        return null;
      } else {
        this.orderList.sort((a, b) => this.sorting ? (parseInt(a.total) - parseInt(b.total)) : (parseInt(b.total) - parseInt(a.total)));
        this.sorting = !this.sorting;
        $('.total-pol').toggleClass('active')
        $('.date-pol').removeClass('active')
      }
    },
  },
  mounted(){
    $('.nav-tabs a:first').click();
  }
}
</script>

<style scoped>
.disable-underline:hover{
  text-decoration: none;
}
.disable-underline.active .order-tab{
  opacity: 1;
}
.logout{
  font-size: 16px;
  color:#B0B0B0;
  cursor:pointer;
  font-weight: 600;
}
.profile-title{
  font-size: 20px;
  font-weight: bold;
}
.client-avatar{
  margin-right: 10px;
}
.profile-phone{
  color: #B0B0B0;
}
.profile-info{
  margin-bottom: 34px;
  margin-top: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.orders-title{
  font-size: 20px;
  font-weight: bold;
  margin: 0 20px;
  color:#222;
  cursor:pointer;

}
.order-tab{
  opacity:0.5;
}
.order-count{
  background: #F8F9FF;
  border-radius: 5px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#616CF5;
}
</style>