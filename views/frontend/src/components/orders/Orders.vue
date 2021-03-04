<template>
  <div class="orders">
    <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
        <button class="app-buttons-item"><img class="img-btn" src="../../assets/icons/trash_empty.svg"><span>Remove</span></button>
        <button class="app-buttons-item"><img class="img-btn" src="../../assets/icons/filter.svg"><span>Filter</span></button>
        <button class="app-buttons-item"><img class="img-btn" src="../../assets/icons/set.svg"><span>Export to Excell </span></button>
      </div>
      <div>
        <button class="app-buttons-item"><img src="../../assets/icons/yesterday.svg"><span>Yesterday</span></button>
        <button class="app-buttons-item"><img src="../../assets/icons/yesterday.svg"><span>Today</span></button>
        <button class="app-buttons-item"><img src="../../assets/icons/yesterday.svg"><span>1 Feb - 13 Feb</span></button>
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
      <div class="table-head table-link " style="width: 10%;" @click="sortByTotal" >Total <img class="total-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
      <div class="table-head table-link" style="width: 10%; cursor: pointer" v-on:click="sortByDate" >Date <img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
      <div class="table-head" style="width: 18%;">Notes</div>
      <div class="table-head" style="width: 10%;">Status</div>
      <div class="table-head" style="width:3%"></div>
      </div>
      <div class="table-content">
        <OrderItem
              v-bind:orderList="filteredList"
              @countNewOrder="countNewOrder"
              v-on:deleteOrder="deleteOrder"
              v-on:inProgress="inProgress"
              v-on:done="done"
        />
      </div>

    <div class="pagination d-flex justify-content-between align-items-center">
      <div>Rows per page <span>8</span> <img src="../../assets/icons/Line.svg"></div>
      <div><span>1-12</span> of <span>200</span><img class="prevBtn mr-3 ml-3" src="../../assets/icons/side-arrow.svg"><img src="../../assets/icons/side-arrow.svg"></div>
    </div>
    </div>

</template>

<script>
import OrderItem from "@/components/order-item/OrderItem";
import $ from 'jquery';

export default {
name: "Orders",
  data(){
    return{
      orderList:[
        {id:1,name:"Essential Shoes",client:"Tomas Levins", phone:"0550457834", total:"450 $",date:"14.02.2021",notes:"Please, can you \n" + "do it quickly?",status:'New'},
        {id:3,name:"AirForces",client:"Tomas Levins", phone:"0775896542", total:"13 $",date:"12.03.1998",notes:"Please, can you \n" + "do it quickly?" ,status:'New'},
        {id:4,name:"Krosses",client:"Tomas Levins", phone:"0500687909", total:"120 $",date:"16.01.1992",notes:"Please, can you \n" + "do it quickly?",status:'New'},
        {id:5,name:"Krosses",client:"Tomas Levins", phone:"0500687909", total:"120 $",date:"02.01.1961",notes:"Please, can you \n" + "do it quickly?",status:'Done'},
        {id:6,name:"Krosses",client:"Tomas Levins", phone:"0500687909", total:"120 $",date:"16.09.982",notes:"Please, can you \n" + "do it quickly?",status:'InProgress'},



      ],
      sorting:true,
      search:'',
      new_orders:0,
      count_order:0
    }
  },
  components:{
    OrderItem,
  },
  computed: {
    selectAll: function() {
      return this.orderList.every(function(user){
        return user.checked;
      });
    },
    filteredList() {
      return this.orderList.filter(order => {
          return order.name.toLowerCase().includes(this.search.toLowerCase()) || order.phone.includes(this.search)
        })
      },
  },
  methods: {
    toggleSelect: function() {
      var select = this.selectAll;
      this.orderList.forEach(function(user) {
        user.checked = !select;
      });
      this.selectAll = !select;
    },
    sortByDate() {
      this.orderList.sort((a, b) =>
          this.sorting ? (parseInt(a.date.split('.').reverse().join()) - parseInt(b.date.split('.').reverse().join()))
              : (parseInt(b.date.split('.').reverse().join()) - parseInt(a.date.split('.').reverse().join())));
      this.sorting = !this.sorting;
      $('.date-pol').toggleClass('active')
      $('.total-pol').removeClass('active')
    },
    sortByTotal(){
      this.orderList.sort((a, b) => this.sorting? (parseInt(a.total) - parseInt(b.total)) : (parseInt(b.total) - parseInt(a.total)));
      this.sorting = !this.sorting;
      $('.total-pol').toggleClass('active')
      $('.date-pol').removeClass('active')

    },
    countNewOrder(){
      let count = 0;
      this.orderList.map((order)=>{
        if(order.status === 'New'){
          count++;
        }
      })

      this.count_order = count;
      this.$emit('countNewOrder',this.count_order)
    },
    totalOrders() {
      this.$emit("totalOrders", this.orderList.length)
    },
    deleteOrder(id){
      this.orderList = this.orderList.filter(el=> el.id !== id);
      this.countNewOrder()
      this.totalOrders()
    },
    inProgress(id){
      this.orderList.map((order)=>{
        if(order.id === id){
          order.status = 'InProgress';
          this.countNewOrder();
        }
      })
    },
    done(id) {
      this.orderList.map((order) => {
        if (order.id === id) {
          order.status = 'Done';
          document.getElementsByClassName('status').classList.add('done')
        }
      })
    }
  },
  mounted(){
  this.totalOrders()
  this.countNewOrder()
  }
}
</script>

<style scoped>
.status.done{
  color:green;
}
.orders{
  margin: 0 30px;
  height:100%;
}
.total-order img, .date-order img{
  margin-left: 10px;
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