<template>
  <div class="orders">
    <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons" style="flex-wrap: wrap;">
      <div class="d-flex align-items-center" style="flex-wrap: wrap;">
        <button v-if="check()" class="app-buttons-item adding-btns" data-toggle="modal" @click="unSetSelectedOrder" data-target="#add-order" ><span>+ Добавить заказ</span></button>
        <button v-if="check()" class="app-buttons-item" @click="deleteAllOrder"><img class="img-btn" src="../../assets/icons/trash_empty.svg" ><span>Удалить</span></button>
        <div class="dropdown filter-drops">
          <button class="app-buttons-item dropdown-toggle"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            <img class="img-btn" src="../../assets/icons/filter.svg"><span>Фильтр</span>
          </button>

          <div class="dropdown-menu animate slideIn filter-orders general-dropdown" aria-labelledby="dropdownMenuButton">
            <form class="filter-dropdown">
                <h3 class="drop-title">По цене</h3>
                <div class="d-flex">
                  <input placeholder="0" v-model="price_from"  type="number" class="drop-input">
                  <div class="d-flex">
                    <label class="mr-2 pl-2">до</label>
                    <input placeholder="0" v-model="price_to" type="number"  class="drop-input">
                  </div>
                </div>
              <h3 class="drop-title">Сортировать по</h3>
              <select  v-model="filter_by_status" class="filter-select form-control form-control-sm mb-2" aria-label=".form-select-lg example">
                <option value="">Все статусы</option>
                <option v-for="statusItem, key in orderStatuses" :key="statusItem" :value="key">{{statusItem}}</option>
              </select>
            </form>
          </div>
        </div>
      </div>
      <div>
        <span class="d-none" @click="test">SERVER LOG ROOMS</span>
        <button class="app-buttons-item" @click="showYesterday"><img src="../../assets/icons/yesterday.svg"><span>Вчера</span></button>
        <button class="app-buttons-item" @click="showTodayData"><img src="../../assets/icons/yesterday.svg"><span>Сегодня</span></button>
        <button class="app-buttons-item" @click="clickOnDate"><img src="../../assets/icons/yesterday.svg"><input :value="between_value"  class="date-pick" id="datepicker"></button>
      </div>
    </div>
      <div class="main-search d-flex align-items-center">
      <img src="../../assets/icons/search-icon.svg">
      <input class="main-input" type="text" placeholder="Search" v-model="search">
    </div>
    </div>
    <div class="d-flex main-content-header justify-content-between align-items-center">
      <div class="table-head d-flex align-items-center" style="width: 18%;">
        <div>
          <label class="custom-checkbox"><input type="checkbox" id="parent-check"  v-model="selectAll"  @change="selectAllOrder"><span class="checkmark"></span></label></div>
        Название заказа</div>
      <div class="table-head" style="width: 25%;">Образец</div>
      <div v-show="data_check.client_checked" class="table-head" style="width: 20%;">Клиент</div>
      <div v-show="data_check.phone_checked" class="table-head" style="width: 18%;">Номер телефона</div>
      <div class="table-head table-link d-flex align-items-center" style="width: 10%;" @click="sortByQuantity()" >Количество <img class="total-pol" style="margin-left:7px" src="../../assets/icons/polygon.svg"></div>
      <div class="table-head table-link d-flex align-items-center" style="width: 10%;" @click="sortByTotal()" >Сумма <img class="total-pol" style="margin-left:7px" src="../../assets/icons/polygon.svg"></div>
      <div v-if="data_check.date_checked" class="table-head table-link d-flex align-items-center" style="width: 13%; cursor: pointer" v-on:click="sortByDate" >Date <img class="date-pol" style="margin-left:7px" src="../../assets/icons/polygon.svg"></div>
      <div v-show="data_check.notes_checked" class="table-head" style="width: 10%;">Примичание</div>
      <div class="table-head" style="width: 10%;">Статус</div>
      <div style="width:3%" class="dropdown pl-3">
        <div class="table-head text-right dropdown-toggle"  id="dropdownBlue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:3%"><img src="../../assets/icons/BlueSetting.svg"></div>
        <div class="dropdown-menu general-dropdown settings-dropdown" aria-labelledby="dropdownBlue">
          <form>
            <div><label class="custom-checkbox"><input v-model="data_check.client_checked" type="checkbox" id="client" ><span class="checkmark"></span></label> <label class="show-field" for="client">Клиент</label></div>
            <div><label class="custom-checkbox"><input v-model="data_check.phone_checked" type="checkbox" id="phone"><span class="checkmark"></span></label> <label class="show-field" for="phone">Номер телефона</label></div>
            <div><label class="custom-checkbox"><input v-model="data_check.date_checked" type="checkbox" id="date" ><span class="checkmark"></span></label> <label class="show-field" for="date">Дата</label></div>
            <div><label class="custom-checkbox"><input v-model="data_check.notes_checked" type="checkbox" id="notes" ><span class="checkmark"></span></label> <label class="show-field" for="notes">Примичание</label></div>
       </form>
        </div>
      </div>
    </div>

    <div class="table-content">
      <div v-if="spinner" style="height:100%; " class="d-flex align-items-center">
        <Spinner/>
      </div>
      <div v-else>
        <OrderItem
            :orderStatuses="orderStatuses"
            v-on:checkSelection="checkSelection"
            v-on:selectOrder="selectOrder"
            v-bind:orderList="orderToDisplay"
            v-on:deleteOrder="deleteOrder"
            v-bind:data_check="data_check"
        />
      </div>
    </div>
    <AddOrder
      :getOrders="getOrders"
      :selected_order="select_order"
    />
    <div class="pagination d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <span>Количество на странице</span>
        <select class="form-control pagination-select" v-model='perPage'>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="32">32</option>
        </select>
        <img src="../../assets/icons/select.svg">
      </div>
      <div class="d-flex align-items-center"><span>{{current_page}}</span> <span class="mr-1 ml-1">of</span> <span class="mr-2">{{totalPages}}</span>
        <div v-if='showPrev' @click.stop.prevent='currentPage-=1' class=" pagination-btns"><img class="pagination-img"  src="../../assets/icons/prevArrow.svg"></div>
        <div v-else class="pagination-btns " style="opacity: 0.5;"><img class="pagination-img"  src="../../assets/icons/prevArrow.svg"></div>
        <div class=" pagination-btns" v-if='showNext' @click.stop.prevent='currentPage+=1'>  <img class="pagination-img"  src="../../assets/icons/side-arrow.svg"></div>
        <div v-else class=" pagination-btns"  style="opacity: 0.5;">  <img class="pagination-img"   src="../../assets/icons/side-arrow.svg"></div>
      </div>
    </div>
  </div>



  <div class="parent-modal">
    <div class="modal myModal fade" id="clientInfoModal" tabindex="-1" role="dialog" aria-labelledby="clientInfoModal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button class="btn" @click="closeClientInfoModal">X</button>
           <div class="infoContent">
            <div class="infoContent_1">
              <!-- <div class="companyName">{{getCompanyName}}</div> -->

              <div v-if="clientInfoData.logo" class="clientlogo 1" v-bind:style="{ 'background-image': 'url(' + imgSrc+clientInfoData.logo + ')' }"></div>
              <div v-else class="clientlogo 2">
                <div class="companyName">{{getCompanyName}}</div>
              </div>



              <div class="line"></div>

              <div v-if="clientInfoData.img" class="clientImg 1" v-bind:style="{ 'background-image': 'url(' + imgSrc+clientInfoData.img + ')' }"></div>
              <div v-else class="clientImg 2">
                <img style="width: 100%;height: 100%;" src="../../assets/icons/chat.svg">
              </div>
                

              <div class="clientName">{{clientInfoData.name}}</div>
              <div class="clientPhone">{{clientInfoData.phone}}</div>
            </div>  
            <div class="infoContent_2">
              <div class="discountTitle">Скидка</div>
              <div class="discountPercentage">{{clientInfoData.discount_percentage}}%</div>
            </div> 
           </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Spinner from "../Spinner";
import OrderItem from "@/components/orders/OrderItem";
import AddOrder from "@/modals/orders/AddOrder";
import Swal from "sweetalert2";
import $ from 'jquery';
export default {
name: "Orders",
  components:{
    OrderItem,
    AddOrder,
    Spinner
  },

  data(){
    return{
      scannerStatus:false,
      imgSrc:'',
      clientInfoData:{
        name:"",
        phone:"",
        discount_percentage:"",
      },
      between_value:'',
      deletedOrders:[],
      orderList:[],
      select_order:'',
      data_check:{
          client_checked:false,
          phone_checked:false,
          date_checked:false,
          notes_checked:false,
      },
      spinner:true,
      filter_by_status: '',
      price_from:'',
      price_to:'',
      sorting:true,
      search:'',
      filtered:this.$moment().format("YYYY-MM-DD"),
      selectAll: false,
      currentPage:1,
      perPage:8,
      total_price:'',
      user: this.getUser(),
      isAdmin: this.isAdmin(),
      orderStatuses: []
    }
  },

  computed: {
    getCompanyName:function(){
      return  JSON.parse(localStorage.getItem('user')).name
    },

    filteredList:function() {
        
      let newOrders = this.orderList
          .filter(order => {
              if(this.search == "")
                return true
            return (order.client_name && order.client_name.toLowerCase().includes(this.search.toLowerCase())) || (order.client_phone && order.client_phone.includes(this.search))
          })
          .filter(order=>{
            if(!this.filter_by_status ) return order;
            return order.status.includes(this.filter_by_status);
          })
          .filter(order=>{
            if(this.price_to.length>0){
              return +order.totalPrice >= this.price_from && +order.totalPrice <= this.price_to
            }
            else if(this.price_to === ''){
              return +order.totalPrice >=this.price_from;
            }
            else{
              return order
            }
          })
          .filter(order=>{
            return order.createdAt.slice(0,10).includes(this.filtered)
                || (new Date(order.createdAt).getTime() >= new Date(this.filtered.slice(0,10)).getTime() &&
                    new Date(order.createdAt).getTime() <= new Date(this.filtered.slice(14,24)).getTime())

          })
          return newOrders
    },
    current_page(){
      if(this.currentPage> this.totalPages){
        return Math.ceil(this.filteredList.length / this.perPage)
      }
      return this.currentPage
    },

    orderToDisplay: function(){
      let start = (this.current_page - 1) * this.perPage
      let end = this.current_page * this.perPage
      this.filteredList.map((value, index) =>{
        value.index = index
        return value
      })
      return this.filteredList.slice(start, end)
    },
    totalPages:function(){
      return Math.ceil(this.filteredList.length / this.perPage)
    },
    showNext(){
      return this.currentPage < this.totalPages;
    },
    showPrev(){
      return this.currentPage > 1;
    },
  },
  methods: {
    closeClientInfoModal(){
      $('#clientInfoModal').modal('hide');
      this.clientInfoData = {
        name:"",
        phone:"",
        discount_percentage:"",
      }
    },
    selectAllOrder(){
      this.orderToDisplay.map(order=>order['selected'] = this.selectAll)
    },
    checkSelection(){
      let selected =  this.filteredList.filter(employee => {
        return employee.selected
      })
      this.selectAll = selected.length === this.filteredList.length
    },
    unSetSelectedOrder(){
      this.select_order = '';
    },
    test(){
      this.axios.post(this.url('socketRooms'), {status: 'Done'}).then(()=>{
      }).catch((error)=>{
        if(error.response && error.response.data){
          this.$warningAlert(error.response.data.msg)
        }
      });
    },
    check(access="orders", parametr="active", parametr2="canEdit"){
        return this.checkAccess(access, parametr, parametr2)
    },
    selectOrder(id){
      this.select_order = '';
      this.orderList.map((item)=>{
        if(item._id === id) {
          this.select_order = item;
          this.addNewProperty(this.select_order.products, "_id", 0, 'product')

        }
      })
    },
    getOrders(){
      this.axios.get(this.url('getOrdersAll')+'?populate=client')
      .then((response)=>{
        this.orderList = response.data.objects;
        this.spinner = false;

      })
    },
    clickOnDate(){
        $('.date-pick').click()
    },
    showYesterday(){
        this.filtered = this.$moment().subtract(1, "days").format("YYYY-MM-DD")

    },
    showTodayData(){
      this.filtered = this.$moment().format("YYYY-MM-DD")
    },
    filteredBetweenDate(){
      this.filtered = this.between_value
    },

    deleteAllOrder() {
      this.orderList.forEach((user)=> {
        if(user.selected){
          this.deletedOrders.push(user._id)
        }
      });

      if(this.deletedOrders.length > 0){
        Swal.fire({
          showConfirmButton: true,
          html: 'Are you sure to remove these<br>orders',
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: 'Delete',
          buttonsStyling:false,
          customClass:{
            popup: 'sweet-delete',
            confirmButton: 'confirm-btn',
            cancelButton:'cancel-btn',
            actions:'btn-group',
            content:'content-sweet',
            closeButton:'close-btn'
          },
          showClass: {
            popup: 'animate__animated animate__slideInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.axios.delete(this.url('deleteOrders'),{data:{objects: this.deletedOrders}})
                .then(()=>{
                  this.deletedOrders = []
                  this.getOrders()
                  $('#parent-check').prop('checked',false)
                  this.$successAlert('All orders have been removed')
                }).catch((error)=>{
                    if(error.response && error.response.data){
                        this.$warningAlert(error.response.data.msg)
                    }
                });
          }
          else{
            this.deletedOrders = []
          }
        })
      }
      else{
        this.$warningAlert('Choose orders to delete')
      }
    },
    sortByDate() {
      if (this.orderList.length === 0) {
        return null;
      } else {
        this.orderList.sort((a, b) => {
          return this.sorting ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt)
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
        this.orderList.sort((a, b) => this.sorting ? (parseInt(a.totalPrice) - parseInt(b.totalPrice)) : (parseInt(b.totalPrice) - parseInt(a.totalPrice)));
        this.sorting = !this.sorting;
        $('.total-pol').toggleClass('active')
        $('.date-pol').removeClass('active')
      }
    },
    sortByQuantity() {
      if (this.orderList.length === 0) {
        return null;
      } else {
        this.orderList.sort((a, b) => this.sorting ? (parseInt(a.quantity) - parseInt(b.quantity)) : (parseInt(b.quantity) - parseInt(a.quantity)));
        this.sorting = !this.sorting;
        $('.total-pol').toggleClass('active')
        $('.date-pol').removeClass('active')
      }
    },
    deleteOrder(id) {
      Swal.fire({
        showConfirmButton: true,
        html: 'Are you sure to remove this <br>order',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        buttonsStyling:false,
        customClass:{
          popup: 'sweet-delete',
          confirmButton: 'confirm-btn',
          cancelButton:'cancel-btn',
          actions:'btn-group',
          content:'content-sweet',
          closeButton:'close-btn'

        },
        showClass: {
          popup: 'animate__animated animate__slideInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(this.url('deleteOrder',id))
          .then(()=>{
            this.getOrders()
            this.$successAlert("Order deleted")
          }).catch((error)=>{
            if(error.response && error.response.data){
                this.$warningAlert(error.response.data.msg)
            }
          });
        }
      })
    },
    getSettings(){
      let that=this;
      this.axios.get(this.url('getSettings'))
        .then((response) => {
          if(response.data.clientsFilter){
            that.scannerStatus = response.data.scannerStatus;
          }
          that.orderStatuses = response.data.object.orderStatuses;
        }).catch(function (error){
          if (error.response) {
            console.log('setCatalog_settings EERRRor',error.response)
          }
        })
    },
  },
  mounted(){
    this.getSettings();
    this.imgSrc=this.$server+"/";
    this.getOrders();
    new this.$lightpick({
        field: document.getElementById('datepicker'),
        singleDate: false,
        numberOfMonths: 2,
        numberOfColumns:2,
        autoClose:true,
        format:'YYYY-MM-DD',
        onSelect: (start,end)=>{
          var str = '';
          str += start ? start.format('YYYY-MM-DD') + ' to ' : '';
          str += end ? end.format('YYYY-MM-DD') : '...';
          this.between_value = str;
          this.filteredBetweenDate()
      }
    });
    const to_date = this.$moment().subtract(1, "days").format("YYYY-MM-DD")
    const from_date = this.$moment().format('YYYY-MM-DD')
    this.between_value = to_date + ' to ' + from_date;
  },
}

</script>

<style scoped>
.date-pick::placeholder{
  color: #606877;
  opacity: 1;
}
.pagination-select{
  background:none;
  padding-left:10px;
  width:32px;
  padding-right: 0;
}
.general-dropdown.settings-dropdown{
  transform: translate3d(-141px, 25px, 0px) !important;
  width: 190px;
  padding: 20px;
  font-size: 14px;
  font-weight: normal;
}

.general-dropdown.settings-dropdown div{
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.general-dropdown.settings-dropdown .custom-checkbox{
  margin-right: 10px;
  width: 12px;
}
.filter-orders{
  margin-top: 44px;
}

.date-pick{
  width:182px;
  height: 20px;
  background: none;
  border:none;
  cursor:pointer;
  color:#606877;
}
.show-field{
  margin-bottom: 0;
  cursor:pointer;
}
.pagination{
  width: calc(100% - 310px);
  color: #8C94A5;
}
.orders{
  margin: 0 30px;
  height:calc(100vh - 90px);
  overflow: hidden;
}
.total-order img, .date-order img{
  margin-left: 0;
}
.pagination img{
  cursor:pointer;
}


.filter-drops .general-dropdown{
  width: 260px;
}
.filter-dropdown{
  padding: 20px;
}
.filter-select{
  height: 30px;
  background-position-y: 50%;
  padding: 0 10px;
  font-size: 14px;
  border: 1px solid #E3E3E3;
  border-radius:5px;
}
/* #clientInfoModal{
 display:block; 
 opacity: 1;
} */
@media (max-width: 550px) {
  #clientInfoModal .modal-dialog{
    margin: 0!important;
  }
}
#clientInfoModal{
    padding-left: 0px!important;
}

#clientInfoModal .modal-dialog,#clientInfoModal .modal-content,#clientInfoModal .infoContent{
  height: 100%;
}

#clientInfoModal .infoContent_2,#clientInfoModal .infoContent_1{
  flex: 1 0 0;
  width: 100%;
}

#clientInfoModal .infoContent_2{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#clientInfoModal .infoContent{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 65px;
}

.discountPercentage{
  color:#616CF5;
  font-weight: 700;
  font-size: 40px;
}
.discountTitle{
  font-weight: 600;
  font-size: 16px;
}
.clientImg{
  width: 152px;
  height: 152px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin: auto;
  border-radius: 50%;
  margin-bottom: 50px;
}
.clientPhone{
  font-weight: 400;
  font-size: 16px;
}
.clientName{
  font-weight: 500;
  font-size: 23px;
}
.companyName{
  color: red;
  font-size: 40px;
  font-weight: 700;
}

.clientlogo{
  height: 35px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-bottom: 25px;
}
</style>