<template>
  <div class="orders">
    <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
        <button class="app-buttons-item adding-btns" data-toggle="modal" data-target="#add-order"><span>+ Add order</span></button>
        <button class="app-buttons-item" @click="deleteAllOrder"><img class="img-btn" src="../../assets/icons/trash_empty.svg" ><span>Remove</span></button>
        <button class="app-buttons-item" @click="exportOrder"><img class="img-btn" src="../../assets/icons/set.svg"><span>Export to Excell </span></button>
        <div class="dropdown filter-drops">
          <button class="app-buttons-item dropdown-toggle"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            <img class="img-btn" src="../../assets/icons/filter.svg"><span>Filter</span>
          </button>

          <div class="dropdown-menu general-dropdown" aria-labelledby="dropdownMenuButton">
            <div class="filter-dropdown">
                <h3 class="drop-title">By price</h3>
                <div class="d-flex">
                  <input placeholder="0" v-model="price_from"  type="number" class="drop-input">
                  <div class="d-flex">
                    <label class="mr-2 pl-2">to</label>
                    <input placeholder="0" v-model="price_to" type="number"  class="drop-input">
                  </div>
                </div>
              <h3 class="drop-title">Sort by</h3>
              <select  v-model="filter_by_status" class="filter-select form-control form-control-sm mb-2" aria-label=".form-select-lg example">
                <option value="">All</option>
                <option value="Done">Done</option>
                <option value="In Progress">In process</option>
                <option value="Canceled">Canceled</option>
                <option value="New">New</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button class="app-buttons-item" @click="showYesterday"><img src="../../assets/icons/yesterday.svg"><span>Yesterday</span></button>
        <button class="app-buttons-item" @click="showTodayData"><img src="../../assets/icons/yesterday.svg"><span>Today</span></button>
        <button class="app-buttons-item" @click="clickOnDate"><img src="../../assets/icons/yesterday.svg"><input placeholder="2021-03-01 to 2021-03-04"  class="date-pick" id="datepicker"></button>
      </div>
    </div>
      <div class="main-search d-flex align-items-center">
      <img src="../../assets/icons/search-icon.svg">
      <input class="main-input" type="text" placeholder="Search" v-model="search">
    </div>
    </div>
    <div class="d-flex main-content-header justify-content-between align-items-center">
      <div class="table-head d-flex align-items-center" style="width: 18%;">
        <div><label class="custom-checkbox"><input type="checkbox"  @click="toggleSelect" v-model="selectAll"><span class="checkmark"></span></label></div>

        Name order</div>
      <div class="table-head" style="width: 30%;">Product</div>
      <div v-show="data_check.client_checked" class="table-head" style="width: 25%;">Client</div>
      <div v-show="data_check.phone_checked" class="table-head" style="width: 20%;">Phone number</div>
      <div class="table-head table-link d-flex align-items-center" style="width: 10%;" @click="sortByTotal()" >Total <img class="total-pol" style="margin-left:7px" src="../../assets/icons/polygon.svg"></div>
      <div v-if="data_check.date_checked" class="table-head table-link d-flex align-items-center" style="width: 15%; cursor: pointer" v-on:click="sortByDate" >Date <img class="date-pol" style="margin-left:7px" src="../../assets/icons/polygon.svg"></div>
      <div v-show="data_check.notes_checked" class="table-head" style="width: 10%;">Notes</div>
      <div class="table-head" style="width: 15%;">Status</div>
      <div style="width:3%" class="dropdown pl-3">
        <div class="table-head text-right dropdown-toggle"  id="dropdownBlue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:3%"><img src="../../assets/icons/BlueSetting.svg"></div>
        <div class="dropdown-menu general-dropdown settings-dropdown" aria-labelledby="dropdownBlue">
          <form>
            <div><label class="custom-checkbox"><input v-model="data_check.client_checked" type="checkbox" id="client" ><span class="checkmark"></span></label> <label class="show-field" for="client">Client</label></div>
            <div><label class="custom-checkbox"><input v-model="data_check.phone_checked" type="checkbox" id="phone"><span class="checkmark"></span></label> <label class="show-field" for="phone">Phone number</label></div>
            <div><label class="custom-checkbox"><input v-model="data_check.date_checked" type="checkbox" id="date" ><span class="checkmark"></span></label> <label class="show-field" for="date">Date</label></div>
            <div><label class="custom-checkbox"><input v-model="data_check.notes_checked" type="checkbox" id="notes" ><span class="checkmark"></span></label> <label class="show-field" for="notes">Notes</label></div>
       </form>
        </div>
      </div>
    </div>

    <div class="table-content">
        <OrderItem
             ref="order_item"
             v-on:selectOrder="selectOrder"
              v-on:unCheckAll="unCheckAll"
              v-on:checkAll="checkAll"
              v-bind:orderList="orderToDisplay"
              v-on:deleteOrder="deleteOrder"
              v-on:inProgress="inProgress"
              v-on:done="done"
              v-on:canceled="canceled"
              v-bind:data_check="data_check"
        />
    </div>
    <AddOrder
      :getOrders="getOrders"
    />
    <EditOrder
      :select_order="select_order"
    />
    <div class="pagination d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <span>Rows per page</span>
        <select class="form-control pagination-select" v-model='perPage'>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="32">32</option>
        </select>
        <img src="../../assets/icons/select.svg">
      </div>
      <div class="d-flex align-items-center"><span>{{currentPage}}</span> <span class="mr-1 ml-1">of</span> <span class="mr-2">{{totalPages}}</span>
        <div v-show='showPrev' @click.stop.prevent='currentPage-=1' class=" pagination-btns prevBtn " ><img src="../../assets/icons/side-arrow.svg"></div>
        <div class=" pagination-btns" v-show='showNext' @click.stop.prevent='currentPage+=1'>  <img  src="../../assets/icons/side-arrow.svg"></div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderItem from "@/components/orders/OrderItem";
import AddOrder from "@/modals/orders/AddOrder";
import EditOrder from "@/modals/orders/EditOrder";
import Swal from "sweetalert2";
import $ from 'jquery';
export default {
name: "Orders",

  components:{
    OrderItem,
    AddOrder,
    EditOrder

  },
  data(){
    return{
      orderList:[],
      select_order:'',
      data_check:{
        client_checked:true,
        phone_checked:false,
        date_checked:false,
        notes_checked:false
      },
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

    }
  },

  computed: {
    filteredList:function() {
      return this.orderList
          .filter(order => {
            return order.client_name && order.client_name.toLowerCase().includes(this.search.toLowerCase()) || order.client_phone.includes(this.search)
          })
          .filter(order=>{
            return order.status.includes(this.filter_by_status)
          })
          // .filter(order=>{
          //   if(this.price_to.length>0){
          //     return +order.total >= this.price_from && +order.total <= this.price_to
          //   }
          //   else if(this.price_to === ''){
          //     return +order.total >=this.price_from;
          //   }
          //   else{
          //     return order
          //   }
          // })
          .filter(order=>{
            return order.createdAt.slice(0,10).includes(this.filtered)
                || (new Date(order.createdAt).getTime() >= new Date(this.filtered.slice(0,10)).getTime() &&
                    new Date(order.createdAt).getTime() < new Date(this.filtered.slice(14,24)).getTime())

          })
    },
    orderToDisplay: function(){
      let start = (this.currentPage - 1) * this.perPage
      let end = this.currentPage * this.perPage
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
    selectOrder(id){
      this.orderList.map((item)=>{
        if(item._id === id) {
          this.select_order = item;
          this.addNewProperty(this.select_order.products, "_id", 0, 'product')
        }
      })
    },
    getOrders(){
      this.axios.get(this.url('getOrders'))
      .then((response)=>{
        this.orderList = response.data.objects;
        console.log(this.orderList)
      })
    },
    checkAll(item){
      this.selectAll = item
    },
    unCheckAll(item){
      this.selectAll = item
    },
    exportOrder(){
        this.axios.post(this.url('getOrderExcel'),{
            orders: ['608a5131405656e224436194', '608a5102405656e224436191']
        }).then((response)=>{
            const link = document.createElement('a');
            link.href = response.data.object;
            link.setAttribute('download', 'file.xlsx'); //any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
        .catch((error)=>{
            console.log("Error",error)
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
      const value = $('#datepicker').val();
      this.filtered = value
    },
    toggleSelect: function () {
      this.orderList.forEach((user)=> {
        if(this.$refs.order_item.$refs[`select${user._id}`] !== undefined && this.$refs.order_item.$refs[`select${user._id}`] !== null){
           if(this.selectAll === false){
              this.$refs.order_item.$refs[`select${user._id}`].checked = true
           }
           else{
             this.$refs.order_item.$refs[`select${user._id}`].checked = false
           }
         }
      });
    },
    deleteAllOrder() {
      if (this.selectAll) {
        this.orderList = [];
        this.$successAlert('All order have been removed')
      }
      else{
        this.orderList = this.filteredList.filter(catalog => !catalog.checked)
      }
      $('.custom-checkbox input').prop('checked', false)
    },
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

      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(this.url('deleteOrder',id))
          .then(()=>{
            this.getOrders()
            this.$successAlert("Order deleted")
          })
        }
      })
    },
    inProgress(id) {
      this.orderList.map((order) => {
        if (order.id === id) {
          order.status = 'In Progress';

        }
      })
    },
    done(id) {
      this.orderList.map((order) => {
        if (order.id === id) {
          order.status = 'Done';

        }
      })
    },
    canceled(id) {
      this.orderList.map((order) => {
        if (order.id === id) {
          order.status = 'Canceled';

        }
      })
    },
  },
  mounted(){
    this.getOrders();
    new this.$lightpick({
        field: document.getElementById('datepicker'),
        singleDate: false,
        numberOfMonths: 2,
        numberOfColumns:2,
        format:'YYYY-MM-DD',
        onSelect: (start,end)=>{
          var str = '';
          str += start ? start.format('YYYY-MM-DD') + ' to ' : '';
          str += end ? end.format('YYYY-MM-DD') : '...';
          document.getElementById('datepicker').value=str;
          this.filteredBetweenDate()
      }
    });
  },


}

</script>

<style scoped>
.pagination-select{
  background:none;
  padding-left:10px;
  width:32px;
  padding-right: 0;
}
.general-dropdown.settings-dropdown{
  transform: translate3d(-166px, -19px, 0px) !important;
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
.orders{
  margin: 0 30px;
  height:calc(100vh - 90px);
  overflow: hidden;
}
.total-order img, .date-order img{
  margin-left: 0;
}

.pagination{
  height: 90px;
  color: #8C94A5;
}
.pagination img{
  cursor:pointer;
}
.prevBtn{
  transform: rotate(180deg);
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

</style>