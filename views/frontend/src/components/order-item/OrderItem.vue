<template>
  <tr>
    <td><input type="checkbox"/></td>
    <td><div  class="name-info"><span>{{order.name[0]}}</span><div>{{order.name}}</div></div></td>
    <td>{{order.phone}}</td>
    <td>{{order.category}}</td>
    <td>{{order.last_visit}}</td>
    <td>{{order.bonus}}</td>
    <td>{{order.spent_money}}</td>
  </tr>
  </template>

<script>

export default {
  name: "OrderItem",
  props:{
    order:{
      type:Object
    }
  }





}
</script>

<style scoped>
tr td{
  font-size: 14px;
  border-top:none;
  border-bottom:1px solid #dee2e6;
  vertical-align: middle;
}
tr:hover{
  background: #F8F9FF;

}
.name-info span{
  width:30px;
  height:30px;
  border-radius:30px;
  background: #B2BDFD;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

}
.name-info{
  display: flex;
  align-items: center;

}

</style>