<template>
  <div class="orders">
    <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
        <button class="app-buttons-item" @click="deleteAllOrder"><img class="img-btn" src="../../assets/icons/trash_empty.svg" ><span>Remove</span></button>
        <button class="app-buttons-item" ><img class="img-btn" src="../../assets/icons/filter.svg"><span>Filter</span></button>
        <button class="app-buttons-item" ><img class="img-btn" src="../../assets/icons/set.svg"><span>Export to Excell </span></button>
      </div>
      <div>
        <button class="app-buttons-item" @click="showYesterday"><img src="../../assets/icons/yesterday.svg"><span>Yesterday</span></button>
        <button class="app-buttons-item" @click="showTodayData"><img src="../../assets/icons/yesterday.svg"><span>Today</span></button>
        <button class="app-buttons-item" @click="clickOnDate"><img src="../../assets/icons/yesterday.svg"><input  :value="filterByDate" placeholder="2021-12-03" class="date-pick" id="datepicker"></button>
      </div>
    </div>

    <div class="main-search d-flex align-items-center">
      <img src="../../assets/icons/search-icon.svg">
      <input class="main-input" type="text" placeholder="Search" v-model="search">
    </div>
    </div>
    <div class="d-flex main-content-header">
      <div class="table-head" style="width: 3%;"><label class="custom-checkbox"><input type="checkbox"  @click="toggleSelect" :checked="selectAll"><span class="checkmark"></span></label></div>
      <div class="table-head" style="width: 20%;">Name order</div>
      <div class="table-head" style="width: 14%;">Client</div>
      <div class="table-head" style="width: 12%;">Phone number</div>
      <div class="table-head table-link " style="width: 10%;" @click="sortByTotal()" >Total <img class="total-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
      <div class="table-head table-link" style="width: 10%; cursor: pointer" v-on:click="sortByDate" >Date <img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
      <div class="table-head" style="width: 18%; ">Notes</div>
      <div class="table-head" style="width: 10%;">Status</div>
      <div class="table-head" style="width:3%"></div>
      </div>
      <div class="table-content">
        <OrderItem
              v-bind:orderList="orderToDisplay"
              @countNewOrder="countNewOrder"
              v-on:deleteOrder="deleteOrder"
              v-on:inProgress="inProgress"
              v-on:done="done"
              v-on:canceled="canceled"
        />
      </div>

    <div class="pagination d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <span>Rows per page</span>
        <select class="form-control pagination-select" v-model='perPage'>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div class="d-flex align-items-center"><span>{{currentPage}}</span> <span class="mr-1 ml-1">of</span> <span class="mr-2">{{totalPages}}</span>
        <div v-show='showPrev' @click.stop.prevent='renderPaginationList(currentPage-1)' class=" pagination-btns prevBtn " ><img src="../../assets/icons/side-arrow.svg"></div>
        <div class=" pagination-btns" v-show='showNext' @click.stop.prevent='renderPaginationList(currentPage+1)'>  <img  src="../../assets/icons/side-arrow.svg"></div>
      </div>
    </div>

    </div>

</template>

<script>
import OrderItem from "@/components/order-item/OrderItem";
import Swal from "sweetalert2";




export default {
name: "Orders",

  components:{
    OrderItem,

  },
  data(){
    return{
      orderList:[
        {id:1,name:"Essential Shoes",client:"Tomas Levins", phone:"0550457834", total:"450 $",date:"2021-03-19T11:31:33.557+00:00",notes:"Please, can you sdfdsf sfs df sdfsdf sdfsdf sdf sdfsdfsd fsdf\n" + "do it quickly?",status:'New'},
        {id:3,name:"AirForces",client:"Tomas Levins", phone:"0775896542", total:"13 $",date:this.$moment().format('YYYY-MM-DD'),notes:"Please, can you \n" + "do it quickly?" ,status:'New'},
        {id:4,name:"Krosses",client:"Tomas Levins", phone:"0500687909", total:"120 $",date:this.$moment().format('YYYY-MM-DD'),notes:"Please, can you \n" + "do it quickly?",status:'New'},
        {id:5,name:"Essentialsss",client:"Tomas Levins", phone:"0500687909", total:"120 $",date:this.$moment().format('YYYY-MM-DD'),notes:"Please, can you \n" + "do it quickly?",status:'Done'},
        {id:6,name:"Ess",client:"Tomas Levins", phone:"0500687909", total:"120 $",date:"2021-03-19T11:31:33.557+00:00",notes:"Please, can you \n" + "do it quickly?",status:'Done'},
        {id:7,name:"Ess",client:"Tomas Levins", phone:"0500687909", total:"120 $",date:"2021-03-08T11:31:33.557+00:00",notes:"Please, can you \n" + "do it quickly?",status:'Done'},
        {id:8,name:"Ess",client:"Tomas Levins", phone:"0500687909", total:"120 $",date:"2021-03-05T11:31:33.557+00:00",notes:"Please, can you \n" + "do it quickly?",status:'Done'},
        {id:9,name:"Jeans and Jackets ",client:"Tomas Levins", phone:"0500687909", total:"120 $",date:this.$moment().format('YYYY-MM-DD'),notes:"Please, can you \n" + "do it quickly?",status:'Done'},
      ],
      sorting:true,
      search:'',
      new_orders:0,
      count_order:0,
      yesterdayDate: this.$moment().subtract(1, "days").format("YYYY-MM-DD"),
      todayDate:this.$moment().format("YYYY-MM-DD"),
      perPage: 8,
      pageToOpen: 1,
      currentPage: 1,
      orderToDisplay:[],
      filterByDate:'2021-03-01 to 2021-03-04',
      filtered:this.$moment().format("YYYY-MM-DD"),

    }
  },

  computed: {
    selectAll: function() {
      return this.orderList.every(function(user){
        return user.checked
      });
    },
    filteredList:function() {
      return this.orderList
          .filter(order => {
            return order.name.toLowerCase().includes(this.search.toLowerCase()) || order.phone.includes(this.search)
          })
          .filter(order=>{
            return !order.date.split('').slice(0,10).join('').indexOf(this.filtered)
            || (new Date(order.date).getTime() >= new Date(this.filtered.split('').slice(0,10).join('')).getTime() &&
                    new Date(order.date).getTime() < new Date(this.filtered.split('').slice(14,24).join('')).getTime())
          })
    },
    totalPages(){
      //calculate the total number of pages based on the number of items to show per page and the total items we got from server
      return this.filteredList.length && (this.filteredList.length > this.perPage) ? Math.ceil(this.filteredList.length/this.perPage) : 1;
    },
    start(){
      return (this.pageToOpen - 1) * this.perPage;
    },
    stop(){
      //stop at the end of the array if array length OR the items left are less than the number of items to show per page
      //do the calculation if otherwise
      if((this.filteredList.length - this.start) >= this.perPage){
        return (this.pageToOpen * this.perPage) - 1;
      }
      else{
        return this.filteredList.length - 1;
      }
    },
    showNext(){
      return this.currentPage < this.totalPages;
    },
    showPrev(){
      return this.currentPage > 1;
    }
  },
  methods: {
    clickOnDate(){
        this.$$('.date-pick').click()
    },
    showYesterday(){
        this.filtered = this.yesterdayDate
        this.renderPaginationList();

    },
    showTodayData(){
      this.filtered = this.todayDate;
      this.renderPaginationList()

    },
    filteredBetweenDate(){
      const value = this.$$('#datepicker').val();
      this.filtered = value
      this.filterByDate = value
      this.renderPaginationList()
    },
    renderPaginationList(pageNumber=1){
      //clear currently displayed list
      this.orderToDisplay = [];
      //set countries to display
      if(this.filteredList.length){
        let _this = this;
        return new Promise(function(res){
          //set the page to open to the pageNumber in the parameter in order to allow start and stop to update accordingly
          _this.pageToOpen = pageNumber;
          //add the necessary data to `countriesToDisplay` array
          for(let i = _this.start; i <= _this.stop; i++){
            _this.orderToDisplay.push(_this.filteredList[i]);
          }
          res();
        }).then(function(){
          //Now update the current page to the page we just loaded
          _this.currentPage = _this.pageToOpen;
        }).catch(function(){
          console.log('render err');
        });
      }
    },
    toggleSelect: function () {
      var select = this.selectAll;
      this.orderList.forEach(function (user) {
        user.checked = !select;
      });
      this.selectAll = !select;
    },
    deleteAllOrder() {
      if (this.selectAll) {
        this.orderList = [];
        this.$successAlert('All order have been removed')
      }
      else{
        this.orderList = this.filteredList.filter(catalog => !catalog.checked)


      }
      this.renderPaginationList()

      this.$$('.custom-checkbox input').prop('checked', false)
    },
    sortByDate() {
      if (this.orderList.length === 0) {
        return null;
      } else {
        this.orderList.sort((a, b) => {
          return this.sorting ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
        })
        this.renderPaginationList()
        this.sorting = !this.sorting;
       this.$$('.date-pol').toggleClass('active')
        this.$$('.total-pol').removeClass('active')
      }
    },
    sortByTotal() {
      if (this.orderList.length === 0) {
        return null;
      } else {
        this.orderList.sort((a, b) => this.sorting ? (parseInt(a.total) - parseInt(b.total)) : (parseInt(b.total) - parseInt(a.total)));
        this.renderPaginationList()
        this.sorting = !this.sorting;
        this.$$('.total-pol').toggleClass('active')
        this.$$('.date-pol').removeClass('active')
      }
    },
    countNewOrder() {
      let count = 0;
      this.orderList.map((order) => {
        if (order.status === 'New') {
          count++;
        }
      })
      this.count_order = count;
      this.$emit('countNewOrder', this.count_order)
    },
    totalOrders() {
      this.$emit("totalOrders", this.orderList.length)
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
          popup: 'animate__animated animate__zoomIn'
        },
        hideClass: {
          popup: 'animate__animated animate__zoomOut'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.orderList = this.orderList.filter(el => el.id !== id);
          this.renderPaginationList()
          Swal.fire({
                title:'Success',
                timer:1500,
                text:'Order has been removed',
                showConfirmButton:false,
                position: 'top-right',
                customClass:{
                  popup:'success-popup',
                  content:'success-content',
                  title:'success-title',
                  header:'success-header',
                  image:'success-img'
                },
                showClass:{
                  popup: 'animate__animated animate__zoomIn'
                },

              }
          )}
      })
      this.countNewOrder()
      this.totalOrders()
    },
    inProgress(id) {
      this.orderList.map((order) => {
        if (order.id === id) {
          order.status = 'In Progress';
          this.countNewOrder();
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
    getProducts() {
        console.log("here")
        this.axios.get(this.url('getProducts'))
            .then((response) => {
                console.log(response.data)
                console.log("here")
            })
    },
  },

  mounted(){
      this.totalOrders()
      this.getProducts()
      this.countNewOrder()
      this.renderPaginationList()

    new this.$lightpick({
      field: document.getElementById('datepicker'),
      singleDate: false,
      onSelect: (start,end)=>{
          var str = '';
          str += start ? start.format('YYYY-MM-DD') + ' to ' : '';
          str += end ? end.format('YYYY-MM-DD') : '...';
          document.getElementById('datepicker').value=str;
          this.filteredBetweenDate()
      }
    });
  },

  watch: {
    perPage: function(){
      this.renderPaginationList();
    },
    search: function (){
      this.renderPaginationList()
    },



  },

}

</script>

<style scoped>
.date-pick{
  width:182px;
  height: 20px;
  background: none;
  border:none;
  cursor:pointer;
  color:#606877;


}
.orders{
  margin: 0 30px;
  height:100%;
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
</style>