<template>
  <div class="container myContainer">
    <div class="row">
      <div class="col-lg-10 m-auto">
        <div class="profile-info">
          <div class="d-flex align-items-center mobile-profile">
              <div class="client_avatar_container" style="position: relative;">
              <div class="client_avatar_with_back" v-if="!user.error && user.avatar!=undefined" @error="user.error=true" v-bind:style="{ backgroundImage: 'url(' + server+'/'+user.avatar + '?rand=' + rand+ ')' }">
              </div>
              <img v-else class="client-avatar" src="../../../assets/clients/clientProfile.svg">
              <input @change="uploadPhoto($event)" type="file" class="d-none" id="uploadClientImage">
              <label for="uploadClientImage" style="position: absolute;left: 50px;bottom: 0;margin-bottom: 0;">
                <img src="../../../assets/icons/addBtn.svg" style="height: 18px;width: 18px;">
              </label>
            </div>

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
        <div v-if="catalog_settings.share_points_status" class="d-flex mb-5 promo-check">
          <div v-if="!user.promocodeIsUsed" class="pr-5 mr-5" style="border-right:1px solid #f4f4f4" >
            <h3 class="cashback-sub-title mb-2">Enter promo</h3>
            <span class="mb-3 d-block" style="color:#8C94A5">If you have promo please enter here</span>
            <div class="d-flex align-items-center enterPromocodeClass justify-content-between">
              <input style="border:none;" v-model="enteredPromocode" type="text">
              <span @click="checkPromocode" class="checkPromocodeBtn"><img src="../../../assets/icons/bird.svg"></span>
            </div>
          </div>
          <div>
            <h3 class="cashback-sub-title mb-2">Share with friend</h3>
            <span class="mb-3 d-block" style="color:#8C94A5">Your Promocode that you can send to your friends</span>
            <div style="font-weight: bold; border-bottom:1px solid #d3d3d3; height:40px; padding-top:10px;">
              {{user.promocode || ''}}
            </div>
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
            <div class="d-flex main-content-header order">
              <div class="table-head" style="width: 10%;">Order #</div>
              <div class="table-head" style="width: 24%;">Deliver address</div>
              <div class="table-head table-link " @click="sortByDate" style="width: 10%;">Date<img class="date-pol" style="margin-left:10px" src="../../../assets/icons/polygon.svg"></div>
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
    enteredPromocode:'',
    rand: 1,
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
  computed:{
    catalog_settings(){
      return this.$store.getters['Catalog/getCatalog_settings'];
    },
    server(){
      return this.$server;
    },
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
    checkPromocode() {
      let that=this;
      const options = {
        headers: {
          "x-client-url": this.currentCompanyCatalog,
          "x-access-token": this.userToken,
        }
      }
      let url = this.url('checkPromocode');
      this.axios.post(url, {
        promocode:this.enteredPromocode,
        client:this.user._id,
      },options).then(function () {
        that.$successAlert("Received");
      }).catch(function(error){
        if (error.response) {
           that.$warningAlert(error.response.data.msg)
        }
      });
    },
    uploadPhoto(event){
      let valid = ["image/png", "image/jpg", "image/jpeg"];
      let that = this;
      if(event.target.files[0] && event.target.files[0].size > 1000000){
        that.$warningAlert('Image size exceed 3 mb');
      }else if(event.target.files[0] && !valid.includes(event.target.files[0].type)){
        that.$warningAlert('Image type can be jpg or png');
      }else{
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = e =>{
          //check
          let im = new Image;
          im.src = e.target.result;
          im.onload = function (){
            that.saveFile(e.target.result);
          }
        };
      }
    },
    saveFile(file){
      console.log("SAVING FILE");
      let that=this;
      const options = {
        headers: {
          "x-client-url": this.currentCompanyCatalog,
          "x-access-token": this.userToken,
        }
      }
      let url = this.url('saveAvatar');
      let formData = new FormData();
      formData.append('avatar', file);
      formData.append('client', this.user._id);
      this.axios.post(url, formData,options).then(function (response) {
        that.user.avatar = response.data.avatar;
        that.rand = Date.now();
      }).catch(function(error){
        if (error.response) {
          if(error.response.data && !error.response.data.errors){
            that.$warningAlert(error.response.data.msg)
          }
        }
      });
    },
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
.enterPromocodeClass{
  height: 35px;
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  width: 100%;
  padding: 0 5px;
}
.client_avatar_container{
  margin-right: 16px;
}
.checkPromocodeBtn{
  cursor:pointer;
  background: #616CF5;
  border-radius: 5px;
  width: 29px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 5px;
  color: white;
}
.disable-underline:hover{
  text-decoration: none;
}
.disable-underline.active .order-tab{
  opacity: 1;
}
.client_avatar_with_back{
  height:70px;
  width:70px;
  background-size: cover;
  border-radius: 50%;
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
.main-content-header{
  padding-right: 10px;
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
  height: 17px;
  background: #616CF5;
  border-radius: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;

}
@media(max-width:992px){
  .main-content-header{
    display: none !important;
  }
  .promo-check, .logout{
    display: none !important;
  }
  .mobile-profile{
    flex-direction:column;
    justify-content: center;
    text-align: center;
  }
  .profile-info{
    justify-content: center;
    margin-top: 0;
  }
  .profile-title{
    font-size: 22px;
  }
  .client_avatar_container{
    margin-right: 0;
    margin-bottom: 10px;
  }
  .orders-title{
    font-size: 16px;
    margin-right: 0;
  }
  .order-tab img{
    width: 24px;
    height: 24px;
  }
  .order-count{
    display: none;
  }
  .table-item{
    padding: 0;
  }
  .nav-tabs{
    margin-bottom: 30px !important;
  }
}
</style>