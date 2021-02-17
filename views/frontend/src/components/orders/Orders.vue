<template>
  <div class="orders">
    <div class="filter-box">
      <h5 class="m-0">Orders</h5>
      <p class="m-0 filtering">
        <img src="../../assets/icons/filter.svg">
        Filter
      </p>
    </div>

    <div class="orders-content">
      <table class="table">
        <tr>
          <th><input type="checkbox"/></th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Category</th>
          <th>Last visit</th>
          <th>Bonus</th>
          <th>Spend money</th>
        </tr>
        <OrderItem
            v-for:="order of orderList" :key="order"
            v-bind:order="order"
         />

      </table>
    </div>
  </div>
</template>

<script>
import OrderItem from "@/components/order-item/OrderItem";

export default {
name: "Orders",
  data(){
    return{
      orderList:[
        {name:"Bektemir Kudaiberdiev",phone:99654, category:"VIP", last_visit:"19.01.2021",bonus:998999,spent_money:9997343},
        {name:"Jason Statham",phone:99654, category:"VIP", last_visit:"19.01.2021",bonus:998999,spent_money:9997343},
        {name:"John Doe",phone:99654, category:"VIP", last_visit:"19.01.2021",bonus:998999,spent_money:9997343},
        {name:"John Doe",phone:99654, category:"VIP", last_visit:"19.01.2021",bonus:998999,spent_money:9997343},
        {name:"John Doe",phone:99654, category:"VIP", last_visit:"19.01.2021",bonus:998999,spent_money:9997343},
        {name:"John Doe",phone:99654, category:"VIP", last_visit:"19.01.2021",bonus:998999,spent_money:9997343},
        {name:"John Doe",phone:99654, category:"VIP", last_visit:"19.01.2021",bonus:998999,spent_money:9997343},
        {name:"John Doe",phone:99654, category:"VIP", last_visit:"19.01.2021",bonus:998999,spent_money:9997343},
        {name:"John Doe",phone:99654, category:"VIP", last_visit:"19.01.2021",bonus:998999,spent_money:9997343},
        {name:"John Doe",phone:99654, category:"VIP", last_visit:"19.01.2021",bonus:998999,spent_money:9997343},
        {name:"John Doe",phone:99654, category:"VIP", last_visit:"19.01.2021",bonus:998999,spent_money:9997343},
        {name:"John Doe",phone:99654, category:"VIP", last_visit:"19.01.2021",bonus:998999,spent_money:9997343},
      ]
    }
  },
  components:{
    OrderItem
  }
}
</script>

<style scoped>

.orders-content{
  border-radius: 5px;
  background: #fff;
  padding:10px;
}
table{
  width: 100%;
}
.table th{
  font-size: 14px;
  color: #787878;
  font-weight: lighter;
  border-top:none;
  border-bottom:1px solid #dee2e6;
}
.filter-box{
  background: #fff;
  margin-bottom: 10px;
  height:50px;
  padding:0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.filter-box{
  border-radius: 5px;
}
.filter-box h5{
  font-weight: 600;
}
.filtering{
  cursor: pointer;
}
</style>