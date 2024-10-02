<template>
  <div class="edit-client">
    <div>
      <div class="edit-header d-flex justify-content-between align-items-center">
        <img class="close-edit" src="../../assets/icons/xBlack.svg" @click="$router.go(-1)">
        <div class="edit-header-left d-flex align-items-center">
          <div class="d-flex align-items-center edit-header-item">
            <img v-if="client.avatar" class="edit-img" :src="imgSrc+'/'+client.avatar">
            <img v-else class="edit-img" src="../../assets/icons/editUserAvatar.svg">
            <div>
              <h3 class="edit-name">{{client.name !== undefined ? client.name : ''}}</h3>
              <!-- <div  class="edit-category">Category: <span>{{client.category && client.category!== null ? client.category.name : 'No category'}}</span></div> -->
              <span class="edit-user"  data-toggle="modal"  data-target="#edit-worker" >Изменить работника</span>
            </div>
          </div>
        </div>
  
        <div class="edit-header-right d-flex align-items-center">
          <!-- <div class="selects">
  
            <select @change="changeDiscount(client._id)" id="change-discount" class=" form-control long-form-control  form-control-lg" aria-label=".form-select-lg example">
              <option value='0' selected>no discount</option>
              <option v-for="discount in discountList" :key="discount._id" :selected="client.discount == discount.discount_percentage" :value="discount.min_sum_of_purchases">{{discount.name}} {{discount.discount_percentage}} %</option>
            </select>
  
          </div> -->
          <!-- <div class="d-flex align-items-center" data-toggle="modal" data-target="#send-push"><img src="../../assets/icons/roundPlus.svg"><span>Send push</span></div> -->
          <!-- <div class="d-flex align-items-center edit-btn" data-toggle="modal" data-target="#add-work"><img src="../../assets/icons/roundPlus.svg"><span>Оплатить ЗП</span></div> -->
          <div class="d-flex align-items-center edit-btn" data-toggle="modal" data-target="#add-prepay"><img src="../../assets/icons/roundPlus.svg"><span>Аванс / ЗП</span></div>
          <div class="d-flex align-items-center edit-btn" data-toggle="modal" data-target="#add-work"><img src="../../assets/icons/roundPlus.svg"><span>Работа</span></div>
        </div>
      </div>
  
      <div class="line"></div>
  
      <OrderDetail
          :orderDetail="orderDetail"
      />
      <AddWorkHistory
          :client="client"
          :getClient="getClient"
      />
      <AddPrePay
          :client="client"
          :getClient="getClient"
      />
      <!-- <RemovePoints
          :client="client"
          :getClient="getClient"
      /> -->
      
      <EditClient v-bind:select_client="client"
        :getClient="getClient"
      />
  <!-------------------------End of Header --------------------------------------- - -->
  
      <div class="row client-number-row">
        <div class="col-lg-2 client-number-box">
          <span class="client-number-label">Остаток</span>
          <h5 class="client-number" style="color:#616cf5">{{client.balance}}</h5>
        </div>
        <div class="col-lg-2 client-number-box">
          <span class="client-number-label">Всего оплачено</span>
          <h5 class="client-number">{{totalPaid}}</h5>
        </div>
        <div class="col-lg-8">
          <span class="client-number-label">Коментарий</span>
          <div>{{client.comment}}</div>
        </div>
      </div>
  
      <div class="d-flex align-items-center nav-buttons justify-content-between">
        <ul class="nav nav-tabs">
          <li>
            <a  class="disable-underline purchase"  data-toggle="tab" href="#menu1">
              <div class="order-tab d-flex align-items-center mr-4">
                <h2 class="history-title">История работы</h2>
              </div>
            </a>
          </li>
          <li>
            <a class="disable-underline bonus" data-toggle="tab" href="#bonuses">
              <div data-toggle="tab" class="order-tab d-flex align-items-center">
                <h2 class="history-title">Авансы / ЗП</h2>
              </div>
            </a>
          </li>
        </ul>
  
        <!-- <button @click="clickOnDate" class="app-buttons-item"><img src="../../assets/icons/yesterday.svg"><input :value="between_value"  class="date-pick" id="datepicker" readonly></button>
   -->
      </div>
  
      <div class="tab-content">
        <div id="menu1" class="tab-pane fade">
          <div class="d-flex main-content-header">
            <div class="table-head" style="width: 10%;">ID заказа</div>
            <div class="table-head" style="width: 35%;">Название заказа</div>
            <div class="table-head table-link" @click="sortByDate(purchaseHistory)" style="width: 25%;">Дата<img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
            <div class="table-head " style="width: 25%;" >Всего </div>
            <div class="table-head " style="width: 5%;" ></div>
          </div>
  
          <div class="table-content">
            <div v-if="works.length ===0" class="text-center mt-5">
                <img src="../../assets/icons/emptyOrder.svg" class="mb-3" style="width:60px; height:60px">
                <p class="client-paragraph">Здесь будет история работы.</p>
              </div>
            <div v-else v-for="work in works"  :key="work._id" class="table-item d-flex align-items-center">
              <div style="width:10%" class="d-flex align-items-center">
                  {{work.order.code}}
                </div>
                <div style="width:35%" class="d-flex align-items-center">
                  {{work.sample.name}}
                </div>
                <div style="width:25%"> {{work.createdAt ? work.createdAt.slice(0,10) : ''}}</div>
                <div style="width:25%">{{work.sample.details[0][client.role] * work.count}}</div>
                <!-- <div style="width:5%;" class="detail"  data-toggle="modal" data-target="#order-detail" @click="orderDetail = order">details</div> -->
            </div>
          </div>
        </div>
        <div id="bonuses" class="tab-pane fade">
          <div class="d-flex main-content-header">
            <div class="table-head table-link" @click="sortByDate(historyBonus)" style="width: 30%;">Дата<img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
            <div class="table-head " style="width: 30%;" >Коментарий </div>
            <div class="table-head " style="width: 30%;" >Сумма </div>
  
          </div>
          <div class="table-content">
            <div v-for="prepay in prepays" :key="prepay._id" class="table-item d-flex align-items-center">
              <div style="width:30%" class="d-flex align-items-center">
                {{prepay.createdAt.slice(0,10)}}
              </div>
              <div style="width:30%" class="pr-3">{{prepay.comment?bonus.comment:'-'}}</div>
              <div style="width:30%" class="removed">-{{prepay.sum}} </div>
            </div>
          </div>
        </div>
      </div>
  
  
  
    </div>
  </div>
  </template>
  
  <script>
  import $ from "jquery";
  import AddWorkHistory from "@/modals/workers/AddWorkHistory";
  import AddPrePay from "@/modals/workers/AddPrePay";
  // import RemovePoints from "@/modals/client/RemovePoints";
  import EditClient from "../../modals/workers/EditWorker";
  import OrderDetail from "../../modals/client/OrderDetail";
  export default {
    name: "EditClientPage",
    components: {
      AddWorkHistory,
      AddPrePay,
      // RemovePoints,
      EditClient,
      OrderDetail
  
    },
    data() {
      return {
        client: {},
        imgSrc: '',
        works:[],
        orderDetail: '',
        sorting: false,
        discountList: [],
        prepays:  [],
        between_value:'',
        filtered:'',
      }
    },
    computed:{
      totalPaid(){
        return this.prepays.reduce((acc,item)=>acc+(+item.sum), 0)
      },
      filteredPurchaseHistory(){
        return this.works.filter((order)=>{
          return (new Date(order.createdAt) >= new Date(this.filtered.slice(0,10)) &&
              new Date(order.createdAt) <= new Date(this.filtered.slice(14,24)))
        })
      },
      filteredBonusHistory(){
         return this.prepays.filter((order)=>{
          return (new Date(order.createdAt).getTime() >= new Date(this.filtered.slice(0,10)).getTime() &&
              new Date(order.createdAt).getTime() <= new Date(this.filtered.slice(14,24)).getTime()  )
        })
      }
    },
  
    methods: {
      changeDiscount(id){
        const newClient = this.client;
        if(!newClient.birthDate){
            newClient.birthDate = this.$moment()
        }
        const val = +document.getElementById('change-discount').value;
        newClient.balance = val;
        this.axios.put(this.url('updateClient',id),newClient)
        .then(()=>{
          this.$successAlert("Discount has been changed")
        })
        .catch(()=>{
          this.$warningAlert('Something went wrong please try again')
        })
      },
      sortByDate(array) {
        if (array.length === 0) {
          return null;
        } else {
          array.sort((a, b) => {
            return this.sorting ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt)
          })
          this.sorting = !this.sorting;
          $('.date-pol').toggleClass('active')
          $('.total-pol').removeClass('active')
        }
      },
      getClient() {
        this.axios.get(this.url('getWorker', this.$route.params.id))
            .then((res) => {
              this.client = res.data.object;
            })
      },
      getWorks() {
        this.axios.get(this.url('getWorks', this.$route.params.id))
            .then((res) => {
              this.works = res.data.objects.reverse();
            })
      },
      getPrepays() {
        this.axios.get(this.url('getPrepay', this.$route.params.id))
            .then((res) => {
              this.prepays = res.data.objects.reverse();
            })
      },
      filteredBetweenDate(){
        this.filtered = this.between_value
      },
      clickOnDate(){
        $('.date-pick').click()
      },
  
    },
    mounted() {
      this.getClient();
      this.getWorks();
      this.getPrepays();
      $('.nav-tabs a:first').click();
      this.imgSrc = this.$server;
    }
  }
  
  </script>
  
  <style scoped>
  .edit-btn{
    border: 1px solid #616cf5;
    padding: 10px 20px;
    border-radius: 10px;
  }
  .date-pick{
    width:182px;
    height: 20px;
    background: none;
    border:none;
    cursor:pointer;
    color:#606877;
  }
  .close-edit{
    position: absolute;
    top: 25%;
    left: -30px;
  }
  .table-content{
    height: 245px;
  }
  .edit-header{
    position: relative;
  }
  .edit-client{
    padding: 0 60px;
  }
  .used{
    color:orange;
  }
  .removed{
    color:red;
  }
  .received{
    color:green;
  }
  .detail{
    color:#616cf5;
    cursor:pointer;
  }
  .table-item{
    height: 60px;
  }
  .order-tab{
    opacity:0.5;
    border-bottom:1px solid transparent;
    padding-bottom: 6px;
  }
  .order-tab:hover{
    opacity: 1;
    transition: .3s;
    border-bottom: 1px solid #616CF5;
    padding-bottom: 6px;
  }
  .disable-underline.active .order-tab{
    opacity: 1;
    border-bottom:1px solid #616cf5;
  }
  .line{
    margin-bottom: 30px;
  }
  .client-number-row{
    margin-bottom: 60px;
  }
  .client-number{
    font-size: 20px;
  }
  .client-number-box{
    border-right: 1px solid #E3E3E3;
  }
  .client-number-box:last-child{
    border-right: none;
  }
  .client-number-label{
    color: #B0B0B0;
    font-size: 14px;
    margin-bottom: 10px;
    display: inline-block;
  }
  .selects:before{
    content:'';
    background: url("../../assets/icons/down.svg") no-repeat;
    width:20px;
    height:20px;
    position: absolute;
    z-index:88;
    right: 0;
    top:42%;
  
  }
  .selects{
    position: relative;
  }
  .form-control{
    background: #F8F9FB;
    border:none;
    height: 36px;
    padding-right: 30px;
  
  }
  
  .edit-user{
    color:#616CF5;
    font-size: 14px;
    cursor:pointer;
  }
  .history-title{
    font-size: 16px;
    color:#000;
  }
  .nav-buttons{
    margin-bottom: 30px;
  }
  .edit-header{
    height: 140px;
  }
  .edit-img{
    width: 80px;
    height: 80px;
    border-radius:50%;
    margin-right: 10px;
    object-fit: contain;
  }
  .edit-name{
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 5px;
  }
  .edit-category{
    color:#8C94A5;
    margin-bottom: 5px;
  
  }
  .edit-category span{
    color:#000;
    text-transform: capitalize;
  }
  
  
  .edit-header-item{
    margin-right: 40px;
  }
  .edit-header-right{
    color:#616cf5;
    font-size: 16px;
    font-weight: normal;
    cursor:pointer;
  }
  .edit-header-right img{
    margin-right: 10px;
  }
  .edit-header-right div{
    margin-right: 26px;
  }
  </style>