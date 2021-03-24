<template>
<div class="client">
  <div class="searchAndButtons">
  <div class="d-flex justify-content-between app-buttons">
    <div class="d-flex align-items-center">
      <button class="app-buttons-item adding-btns" data-toggle="modal" data-target="#add-category"><span>+ Add category</span></button>
      <button class="app-buttons-item" @click="selectBirthDate"><img src="../../assets/icons/birsday.svg"><span>Birthday</span></button>

    </div>
    <div class="d-flex align-items-center">
      <button class="app-buttons-item" @click="deleteAllClient"><img src="../../assets/icons/trash_empty.svg"><span>Remove</span></button>
      <button class="app-buttons-item"><img src="../../assets/icons/moveto.svg"><span>Move to</span></button>
      <button class="app-buttons-item"><img src="../../assets/icons/import.svg"><span>Import</span></button>
      <div class="dropdown filter">
        <button class="dropdown-toggle app-buttons-item mr-0" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="../../assets/icons/filter.svg"><span>Filter</span></button>
        <div class="dropdown-menu filter-box" aria-labelledby="dropdownMenuTotal">
          <form id="form" ref="filterForm" @submit.prevent="filterSubmit">
          <div class="filter-header d-flex justify-content-between align-items-center">
            <h3>Filters</h3>
            <div @click="resetFilter"><img src="../../assets/icons/redX.svg">Reset all</div>
          </div>

           <div class="accordion" id="accordion-filter">
             <div data-toggle="collapse" class="filter-list" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">Last purchase <img class="filter-img" src="../../assets/icons/down.svg"></div>
             <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion-filter">
                <input ref="forms" v-model="lastPurchase" class="cashback-input" placeholder="Last-purchase">
             </div>

             <div class="filter-list" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseOne">Bonus <img class="filter-img" src="../../assets/icons/down.svg"></div>
             <div id="collapseTwo" class="collapse" aria-labelledby="headingOne" data-parent="#accordion-filter">
               <input ref="forms" v-model="bonuss" class="cashback-input" placeholder="Bonus">
             </div>

             <div data-toggle="collapse" class="filter-list" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseOne">Category <img class="filter-img" src="../../assets/icons/down.svg"></div>
             <div id="collapseThree" class="collapse" aria-labelledby="headingOne" data-parent="#accordion-filter">
                  <select ref="forms" v-model="category" class="form-control-sm filter-select">
                    <option value="" disabled selected>Select category</option>
                    <option value="vip">vip</option>
                    <option value="standart">standart</option>
                  </select>
             </div>

             <div data-toggle="collapse" class="filter-list" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseOne">Total <img class="filter-img" src="../../assets/icons/down.svg"></div>
             <div id="collapseFour" class="collapse" aria-labelledby="headingOne" data-parent="#accordion-filter">
               <input ref="forms" v-model="total" class="cashback-input" placeholder="Total">
             </div>
           </div>
            <button class="filter-submit">Submit</button>
          </form>
        </div>
      </div>
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
      <div class="table-head table-link" style="width: 10%;" @click="sortByTotal">Total <img class="total-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
      <div class="table-head table-link" style="width: 10%;" @click="sortByBonus">Bonus <img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
      <div class="table-head" style="width: 18%;">Last purchase</div>
      <div class="table-head" style="width: 12%;"></div>
      <div class="table-head" style="width:3%"></div>
    </div>
    <div class="table-content">
         <ClientItem  v-bind:clientList="clientToDisplay"
                v-on:deleteClient="deleteClient"
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
</div>
</template>


<script>
import ClientItem from "@/components/client-item/ClientItem";
import Swal from "sweetalert2";


export default {
  name: "Clients",
  components:{
    ClientItem,
  },
  data(){
    return {
     clientList:[
       { id:1, name:"Tomas Levins" , category: 'vip' ,phone: '996550425563', total:'450 $' ,bonus:'120' ,last_purchase:'12.08.2020', birthDate:'2021-12-03' },
       { id:2, name:"Leo Messi" , category: 'standart' ,phone: '996550425563', total:'300 $' ,bonus:'340' ,last_purchase:'12.08.2020', birthDate:'2021-12-03'},
       { id:3, name:"Bektemir Kudiaberdiev" , category: 'standart' ,phone: '996550425563', total:'350 $' ,bonus:'13' ,last_purchase:'12.08.2020', birthDate:'2021-03-22'},
       { id:4, name:"Cristiano Ronaldo" , category: 'vip' ,phone: '996550425563', total:'100 $' ,bonus:'75' ,last_purchase:'12.08.2020', birthDate:'2021-03-22'},
       { id:5, name:"Neymar" , category: 'standart' ,phone: '996550425563666', total:'200 $' ,bonus:'12000' ,last_purchase:'12-03-2020', birthDate:'2021-03-22'},
     ],
      search:'',
      sorting:true,
      perPage: 8,
      pageToOpen: 1,
      currentPage: 1,
      clientToDisplay:[],
      filtered:'',
      category:'',
      bonuss:'',
      lastPurchase:'',
      total:''
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
      .filter(client=>{
        return client.birthDate.includes(this.filtered)
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
    selectBirthDate(){
      if(this.sorting){
        this.filtered = this.$moment().format('YYYY-MM-DD')
      }
      else{
        this.filtered = ''
      }
      this.sorting = !this.sorting;
      this.renderPaginationList()
    },
    renderPaginationList(pageNumber=1){
      //clear currently displayed list
      this.clientToDisplay = [];
      //set countries to display
      if(this.filteredList.length){
        let _this = this;
        return new Promise(function(res){
          //set the page to open to the pageNumber in the parameter in order to allow start and stop to update accordingly
          _this.pageToOpen = pageNumber;
          //add the necessary data to `countriesToDisplay` array
          for(let i = _this.start; i <= _this.stop; i++){
            _this.clientToDisplay.push(_this.filteredList[i]);
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
    toggleSelect: function() {
      var select = this.selectAll;
      this.clientList.forEach(function(user) {
        user.checked = !select;
      });
      this.selectAll = !select;
    },
    sortByBonus() {
      this.clientToDisplay.sort((a, b) => this.sorting ? (parseInt(a.bonus) - parseInt(b.bonus)) : (parseInt(b.bonus) - parseInt(a.bonus)));
      this.sorting = !this.sorting;
      this.$$('.date-pol').toggleClass('active')
      this.$$('.total-pol').removeClass('active')
    },
    sortByTotal(){
      this.clientToDisplay.sort((a, b) => this.sorting? (parseInt(a.total) - parseInt(b.total)) : (parseInt(b.total) - parseInt(a.total)));
      this.sorting = !this.sorting;
      this.$$('.total-pol').toggleClass('active')
      this.$$('.date-pol').removeClass('active')
    },
    deleteClient(id){
      Swal.fire({
        showConfirmButton: true,
        html: 'Are you sure to remove this <br>client',
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
          this.clientList = this.clientList.filter(el=> el.id !== id);
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
     },
    deleteAllClient() {
      if(this.selectAll){
        this.clientList = [];
        this.$successAlert("All clients have been removed")
      }
      else{
        this.clientList = this.clientList.filter(catalog => !catalog.checked)
      }
      this.$$('.custom-checkbox input').prop('checked', false)
      this.renderPaginationList()
    },
    uncloseDropDown(){
      this.$$(document).click(function() {
        this.$$(".dropdown").removeClass('open');

      });


    },
    filterSubmit(){
      this.clientToDisplay =  this.filteredList.filter(client=>{
        return client.bonus.includes(this.bonuss) && client.total.includes(this.total) && client.category.includes(this.category)
        && client.last_purchase.includes(this.lastPurchase)
      })
      this.bonuss = '';
      this.total = '';
      this.category= '';
      this.lastPurchase= ''


    },
    resetFilter(){
      this.bonuss = '';
      this.total = '';
      this.category= '';
      this.lastPurchase= ''
    }
  },
  mounted(){
    this.renderPaginationList()
    this.uncloseDropDown()
  },
  watch: {
    perPage: function () {
      this.renderPaginationList();
    },
    search: function () {
      this.renderPaginationList()
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

.filter-box{
  width: 230px;
  /*height: 265px;*/
  margin-right: 20px;
  margin-top: 10px;
  padding:15px;
}
.filter-header h3{
  font-size: 16px;
}
.filter-header{
  margin-bottom: 30px;
}
.filter-header div{
  font-size: 14px;
  display: flex;
  align-items: center;
  color:#D81919;
  cursor:pointer;
}
.filter-list{
  padding:3px 0;
  border-bottom:none;
  color:#222;
  background: #fff;
  position: relative;
  cursor:pointer;
  font-size:14px;
}
.filter-img{
  position: absolute;
  right: 0;
  top: 10px;
}
.filter-submit{
  border:none;
  font-size: 14px;
  background: none;
  padding: 0;
  color:#616CF5;
  text-align: right;
  margin-top: 10px;
}
.accordion .cashback-input{
  height: 30px;
  font-size: 14px;
  margin:5px 0;
  width: 100%;
}
.filter-select{
  border: 1px solid #E3E3E3;
  border-radius: 5px;
  height:30px;
  padding-left:10px;
  margin: 5px 0;
  width: 100%;
  appearance: none;
  background: #fff;
  outline:none;
}


</style>