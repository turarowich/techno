<template>
<div class="client">
  <div class="searchAndButtons">
  <div class="d-flex justify-content-between app-buttons">
    <div class="d-flex align-items-center">
      <button class="app-buttons-item adding-btns" data-toggle="modal" data-target="#add-category"><span>+ Add category</span></button>
      <button class="app-buttons-item"><img src="../../assets/icons/birsday.svg"><span>Birthday</span></button>

    </div>
    <div class="d-flex align-items-center">
      <button class="app-buttons-item" @click="deleteAllClient"><img src="../../assets/icons/trash_empty.svg"><span>Remove</span></button>
      <button class="app-buttons-item"><img src="../../assets/icons/moveto.svg"><span>Move to</span></button>
      <button class="app-buttons-item"><img src="../../assets/icons/import.svg"><span>Import</span></button>
      <button class="app-buttons-item"><img src="../../assets/icons/filter.svg"><span>Filter</span></button>
    </div>
  </div>
  <div class="main-search d-flex align-items-center ">
    <img src="../../assets/icons/search-icon.svg">
    <input class="main-input" type="text" placeholder="Search" v-model="search">
  </div>
  </div>

  <div class="main-content">
    <div class="d-flex main-content-header">
      <div class="table-head" style="width: 3%;"><label class="custom-checkbox"><input type="checkbox"  @click="toggleSelect" :checked="selectAll"><span class="checkmark"></span></label></div>
      <div class="table-head" style="width: 18%;">Name </div>
      <div class="table-head" style="width: 14%;">Category</div>
      <div class="table-head" style="width: 12%;">Phone number</div>
      <div class="table-head table-link" style="width: 10%;" @click="sortByTotal" >Total <img class="total-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
      <div class="table-head table-link" style="width: 10%;" @click="sortByBonus">Bonus <img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
      <div class="table-head" style="width: 18%;">Last purchase</div>
      <div class="table-head" style="width: 12%;"></div>
      <div class="table-head" style="width:3%"></div>
    </div>
    <div class="table-content">
         <ClientItem  v-bind:clientList="filteredList"
                v-on:deleteClient="deleteClient"
         />
    </div>
  </div>
</div>
</template>


<script>
import ClientItem from "@/components/client-item/ClientItem";
import $ from "jquery";

export default {
  name: "Clients",
  components:{
    ClientItem,
  },
  data(){
    return {
     clientList:[
       { id:1, name:"Tomas Levins" , category: 'vip' ,phone: '996550425563', total:'450 $' ,bonus:'120' ,last_purchase:'12.08.2020'},
       { id:2, name:"Leo Messi" , category: 'vip' ,phone: '996550425563', total:'300 $' ,bonus:'340' ,last_purchase:'12.08.2020'},
       { id:3, name:"Bektemir Kudiaberdiev" , category: 'vip' ,phone: '996550425563', total:'350 $' ,bonus:'13' ,last_purchase:'12.08.2020'},
       { id:4, name:"Cristiano Ronaldo" , category: 'vip' ,phone: '996550425563', total:'100 $' ,bonus:'75' ,last_purchase:'12.08.2020'},
       { id:5, name:"Neymar" , category: 'vip' ,phone: '996550425563', total:'200 $' ,bonus:'12000' ,last_purchase:'12.08.2020'},
     ],
      search:'',
      sorting:true
    }
  },
  computed: {
    selectAll: function() {
      return this.clientList.every(function(user){
        return user.checked;
      });
    },
    filteredList() {
      return this.clientList.filter(client => {
        return client.name.toLowerCase().includes(this.search.toLowerCase()) || client.phone.includes(this.search)
      })
    },
  },
  methods: {
    toggleSelect: function() {
      var select = this.selectAll;
      this.clientList.forEach(function(user) {
        user.checked = !select;
      });
      this.selectAll = !select;
    },
    sortByBonus() {
      this.clientList.sort((a, b) => this.sorting? (parseInt(a.bonus) - parseInt(b.bonus)) : (parseInt(b.bonus) - parseInt(a.bonus)));
      this.sorting = !this.sorting;
      $('.date-pol').toggleClass('active')
      $('.total-pol').removeClass('active')
    },
    sortByTotal(){
      this.clientList.sort((a, b) => this.sorting? (parseInt(a.total) - parseInt(b.total)) : (parseInt(b.total) - parseInt(a.total)));
      this.sorting = !this.sorting;
      $('.total-pol').toggleClass('active')
      $('.date-pol').removeClass('active')

    },
    deleteClient(id){
      this.clientList = this.clientList.filter(el=> el.id !== id);
    },
    deleteAllClient() {
      if(this.selectAll){
        this.clientList = [];
      }
      $('.custom-checkbox input').prop('checked', false)
    },
  }

}
</script>

<style scoped>
.client{
  margin: 0 30px;
}
.adding-btns{
  background: #E9ECFF;
  color:#616CF5;
}
</style>