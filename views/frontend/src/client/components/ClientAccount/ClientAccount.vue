<template>
  <div class="container myContainer">
    <div class="row">
      <div class="col-lg-10 m-auto">
        <div class="profile-info">
          <div class="d-flex align-items-center">
            <img class="client-avatar" src="../../../assets/clients/clientProfile.svg">
            <div v-if="user">
              <h1 class="profile-title">
                {{user.name}}
                <router-link :to="`/${currentCompanyCatalog}/edit-profile`">
                  <img src="../../../assets/clients/Edit.svg">
                </router-link>
              </h1>
              <span class="profile-phone">{{user.phone}}</span>
              <span class="user_status_class">{{userDiscountStatus.name || ''}} {{userDiscountStatus.discount_percentage || 0}}%</span>
            </div>
          </div>
          <div @click="logout" class="logout">
            Logout
            <img class="ml-2" src="../../../assets/clients/log-out.svg">
          </div>
        </div>

        <div class="bonus-notification">
          <div class=" bonus-title d-flex align-items-center">
            <img class="mr-2" src="../../../assets/clients/Discount.svg"> <span class="bonus-span" v-if="user">My bonuses: {{user.points}}</span>
          </div>
          <p @click="sendCLientEmit" class="client-paragraph mb-0">You can spend your current points or continue to accumulate them</p>
        </div>
        <ul class="nav nav-tabs mb-5">
          <li>
            <a class="disable-underline" data-toggle="tab" href="#menu1">
              <div class="order-tab d-flex align-items-center mr-4">
                <img src="../../../assets/clients/trash.svg">
                <h2 class="orders-title">Orders</h2>
                <div class="order-count">{{filterUserOrders.length}}</div>
              </div>
            </a>
          </li>
          <li>
            <a class="disable-underline" data-toggle="tab" href="#menu2">
              <div data-toggle="tab" class="order-tab d-flex align-items-center">
<!--                <img src="../../../assets/clients/DiscountBlack.svg">-->
                <h2 class="orders-title">Bonus history</h2>
              </div>
            </a>
          </li>
        </ul>

        <div class="tab-content">
          <div id="menu1" class="tab-pane fade">
            <div class="d-flex main-content-header">
              <div class="table-head" style="width: 14%;">Name order</div>
              <div class="table-head" style="width: 20%;">Deliver address</div>
              <div class="table-head table-link " @click="sortByDate" style="width: 14%;">Date<img class="date-pol" style="margin-left:10px" src="../../../assets/icons/polygon.svg"></div>
              <div class="table-head " style="width: 12%;" >Total quantity </div>
              <div class="table-head " style="width: 12%; cursor: pointer">Delivery price</div>
              <div class="table-head" style="width: 12%; ">Discount</div>
              <div class="table-head table-link" @click="sortByTotal" style="width: 11%;">Total <img class="total-pol" style="margin-left:10px" src="../../../assets/icons/polygon.svg"></div>
              <div class="table-head" style="width:10%">Status</div>
            </div>
            <OrdersItem :orderList="filterUserOrders"/>

          </div>
          <div id="menu2" class="tab-pane fade">
            <div class="d-flex main-content-header">
              <div class="table-head te" style="width:50%">Name</div>
              <div class="table-head table-link " @click="sortByDate" style="width: 30%;">Date<img class="date-pol" style="margin-left:10px" src="../../../assets/icons/polygon.svg"></div>
              <div class="table-head d-flex justify-content-end" style="width:20%">Quantity</div>
            </div>
            <HistoryBonus :orderList="userHistory"/>
          </div>
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
    sorting: true
  }
  },
  computed:{
    user(){
      return this.$store.getters['Client/getUser'];
    },
    userToken(){
      return this.$store.getters['Client/getUserToken'];
    },
    userOrders(){
      return this.$store.getters['Client/getUserOrders'];
    },
    userHistory(){
      return this.$store.getters['Client/getUserHistory'];
    },
    userDiscountStatus(){
      return this.$store.getters['Client/getUserDiscountStatus'];
    },
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
    filterUserOrders(){
      return this.userOrders.filter((order)=>{
        return order.status === 'Cancelled' || order.status === 'Done'
      })
    }
  },
  methods:{
    sortByDate() {
      if (this.userOrders.length === 0) {
        return null;
      } else {
        this.userOrders.sort((a, b) => {
          return this.sorting ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt)
        })
        this.sorting = !this.sorting;
        $('.date-pol').toggleClass('active')
        $('.total-pol').removeClass('active')
      }
    },
    sortByTotal() {
      if (this.userOrders.length === 0) {
        return null;
      } else {
        this.userOrders.sort((a, b) => this.sorting ? (parseInt(a.totalPrice) - parseInt(b.totalPrice)) : (parseInt(b.totalPrice) - parseInt(a.totalPrice)));
        this.sorting = !this.sorting;
        $('.total-pol').toggleClass('active')
        $('.date-pol').removeClass('active')
      }
    },
    logout(){
      this.$store.dispatch("Client/logout");
      this.$store.dispatch("Orders/clearAll");

      this.$router.push({ path: `/${this.currentCompanyCatalog}/signin`});
    },
    sendCLientEmit(){

      if(this.user){
        this.socket.io.opts.extraHeaders =  {
          token: localStorage.getItem('token')
        };
        console.log("EMITTING sendCLientEmit",this.socket);
        this.socket.emit('join_cat', {user: this.user._id});
      }
    },
  },
  mounted(){

    $('.nav-tabs a:first').click();
    const options = {
      headers: {
        "x-client-url": this.currentCompanyCatalog,
        "x-access-token": this.userToken,
      }
    }
    if(this.user){
      this.socket.io.opts.extraHeaders =  {
        token: localStorage.getItem('token')
      };
      this.$store.dispatch("Client/updateUserData",{axios:this.axios,url:this.url('getClient',this.user._id),options:options});
      console.log("EMITTING",this.socket);
      this.socket.emit('join_cat', {user: this.user._id});
    }

  },
  created() {

    // this.socket.on("sendingHey", function(data) {
    // this.socket.on("sendingHey", function(data) {
    //   console.log(data);
    //   $('#orderStatus').modal('show');
    //   let text = `Order #${data.code} is ${data.status}`;
    //   $('.orderStatusText').text(text);
    //   // alert(`This order ${data.code} is ${data.status}`);
    // });
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
.client-paragraph{
  font-size: 14px;
}
.nav-tabs{
  align-items:center;
}
.bonus-title{
  margin-bottom: 3px;
}
.profile-title{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}
.client-avatar{
  margin-right: 20px;
  width: 80px;
  height: 80px;
}
.profile-phone{
  color: #B0B0B0;
  margin-bottom: 5px;
  display: block;
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
  font-weight: 400;
  margin-left: 10px;
  margin-right: 20px;
  color:#222;
  cursor:pointer;

}
.table-item{
  height:70px;
}
.bonus-span{
  font-size: 16px;
  margin-bottom: 0;
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
.user_status_class{
  height: 23px;
  background: #616CF5;
  border-radius: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding:5px 25px;

}
</style>