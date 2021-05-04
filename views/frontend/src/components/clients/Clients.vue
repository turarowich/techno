<template>
<div class="client">
  <div class="searchAndButtons">
  <div class="d-flex justify-content-between app-buttons">
    <div class="d-flex align-items-center">
      <button class="app-buttons-item adding-btns" data-toggle="modal" data-target="#add-category"><span>+ Add category</span></button>
      <button class="app-buttons-item" @click="$router.push('/push-notification')"><img src="../../assets/icons/bgNotification.svg"><span>Push notification</span></button>
      <button class="app-buttons-item" @click="$router.push('/individual-push')"><img src="../../assets/icons/send-individual.svg"><span>Individual push</span></button>

    </div>
    <div class="d-flex align-items-center">
      <button class="app-buttons-item" @click="deleteAllClient"><img src="../../assets/icons/trash_empty.svg"><span>Remove</span></button>
      <button class="app-buttons-item"><img src="../../assets/icons/moveto.svg"><span>Move to</span></button>
      <button class="app-buttons-item" ><img src="../../assets/icons/import.svg"><span>Import</span></button>
      <div class="dropdown filter" >
        <button class="dropdown-toggle app-buttons-item mr-0" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="../../assets/icons/filter.svg"><span>Filter</span></button>
        <div class="dropdown-menu filter-box" aria-labelledby="dropdownMenuTotal">
          <form id="form" ref="filterForm" @submit.prevent="filterSubmit" >
              <div class="filter-header">
                <h3>Filters</h3>
              </div>

               <div class="row">
                  <div class="col-lg-6">
                    <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#register-collapse" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                        Registration date
                      <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="register-collapse">
                        <div class="filter-body d-flex">
                          <div class="d-flex align-items-center mr-2">
                            <label>From</label>
                            <div class="calendar d-flex align-items-center">
                              <input class="calendar-input"  id="from-date">
                              <img src="../../assets/icons/Calendar.svg">
                            </div>
                          </div>

                          <div class="d-flex align-items-center">
                            <label>To</label>
                            <div class="calendar d-flex align-items-center">
                              <input class="calendar-input" id="to-date">
                              <img src="../../assets/icons/Calendar.svg">
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#purchase-collapse" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                        Number of purchase
                        <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="purchase-collapse">
                        <div class="filter-body d-flex">
                            <div class="d-flex align-items-center mr-2">
                              <label>From</label>
                              <input class="cashback-input">
                            </div>

                            <div class="d-flex align-items-center">
                              <label>To</label>
                              <input class="cashback-input">
                            </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#category-collapse" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                        Category
                        <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="category-collapse">
                        <div class="filter-body">

                          <div class="radio-toolbar-category">
                            <div class="d-flex align-items-center mb-2 mr-5">
                              <input type="radio" id="radioStandart"  name="radioCategory" @click="category='standart'">
                              <label class="radio-checkbox" for="radioStandart"></label>
                              <span class="male">Standart</span>
                            </div>
                            <div class="d-flex align-items-center">
                              <input type="radio" id="radioVip" @click="category='vip'" name="radioCategory" >
                              <label class="radio-checkbox" for="radioVip"></label>
                              <span class="male">Vip</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#birthday-collapse" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                       Birthday
                        <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="birthday-collapse">
                        <div class="filter-body">
                          <div class="category"><label class="custom-checkbox"><input type="checkbox"><span class="checkmark"></span></label>Show only birthday people</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                      <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#recommendation-collapse" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                       Number of recommendations
                        <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="recommendation-collapse">
                        <div class="filter-body d-flex">
                          <div class="d-flex align-items-center mr-2">
                            <label>From</label>
                            <input class="cashback-input">
                          </div>

                          <div class="d-flex align-items-center">
                            <label>To</label>
                            <input class="cashback-input">
                          </div>
                        </div>
                      </div>
                    </div>
                      <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#gender-collapse" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                       Gender
                        <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="gender-collapse">
                        <div class="filter-body">
                          <div class="radio-toolbar-gender">
                            <div class="d-flex align-items-center mb-2 mr-5">
                              <input type="radio" id="radioApple" name="radioGender" @click="gender_client = 'male'">
                              <label for="radioApple"></label>
                              <span class="male">Male</span>
                            </div>
                            <div class="d-flex align-items-center">
                              <input type="radio" id="radioOrange" name="radioGender" @click="gender_client='female'">
                              <label for="radioOrange"></label>
                              <span class="male">Female</span>
                            </div>
                          </div>
                       </div>
                      </div>
                    </div>
                      <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#discount-collapse" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                        Discount
                        <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="discount-collapse">
                        <div class="filter-body">
                          <select class="filter-form  form-control long-form-control  form-control-lg" aria-label=".form-select-lg example">
                            <option>Select from categories</option>
                            <option>Russia</option>
                            <option>USA</option>
                            <option>Kyrgyzstan</option>
                          </select>
                        </div>
                      </div>
                    </div>
                      <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#last-collapse" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                        Last purchase
                        <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="last-collapse">
                        <div class="filter-body last-filter-body d-flex">
                          <div class="d-flex align-items-center mr-2">
                            <label>From</label>
                            <div class="calendar d-flex align-items-center">
                              <input class="calendar-input" id="from-purchase">
                              <img src="../../assets/icons/Calendar.svg">
                            </div>
                          </div>

                          <div class="d-flex align-items-center">
                            <label>to</label>
                            <div class="calendar d-flex align-items-center">
                              <input class="calendar-input" id="to-purchase">
                              <img src="../../assets/icons/Calendar.svg">
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
               </div>
              <div class="d-flex justify-content-end align-items-center">
                <div class="reset" @click="resetFilter"><img src="../../assets/icons/x.svg">Reset all</div>
                <button class="save" type="submit">Apply</button>
              </div>
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
      <div class="d-flex" style="width:97%">
        <div class="table-head" style="width: 3%;"><label class="custom-checkbox"><input type="checkbox"  @click="toggleSelect" :checked="selectAll"><span class="checkmark"></span></label></div>
        <div class="table-head" style="width: 30%;">Name </div>
        <div class="table-head" style="width: 14%;">Category</div>
        <div class="table-head" style="width: 12%;">Phone number</div>
        <div class="table-head table-link" style="width: 10%;" @click="sortByTotal">Total <img class="total-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
        <div class="table-head table-link" style="width: 10%;" @click="sortByBonus">Bonus <img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
        <div class="table-head" style="width: 18%;">Last purchase</div>
      </div>
      <div class="table-head" style="width:3%"></div>
    </div>
    <div class="table-content">
         <ClientItem  v-bind:clientList="clientToDisplay"
                v-on:deleteClient="deleteClient"
         />
    </div>

    <EditClient/>
    <div class="pagination d-fl<div>

                  </div>
ex justify-content-between align-items-center">
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
import ClientItem from "@/components/clients/ClientItem";
import EditClient from "@/modals/client/EditClient";

import Swal from "sweetalert2";
import $ from 'jquery'


export default {
  name: "Clients",
  components:{
    EditClient,
    ClientItem,

  },
  data(){
    return {
      clientList:[
       { id:1, name:"Tomas Levins" , category: 'vip' ,phone: '996550425563', total:'450 $' ,bonus:'120' ,last_purchase:'12.08.2020', birthDate:'2021-12-03' ,gender:'male'},
       { id:2, name:"Rihana" , category: 'standart' ,phone: '996550425563', total:'300 $' ,bonus:'340' ,last_purchase:'12.08.2020', birthDate:'2021-12-03',gender:'female'},
       { id:3, name:"Bektemir Kudiaberdiev" , category: 'standart' ,phone: '996550425563', total:'350 $' ,bonus:'13' ,last_purchase:'12.08.2020', birthDate:'2021-03-22',gender:'male'},
       { id:4, name:"Cristiano Ronaldo" , category: 'vip' ,phone: '996550425563', total:'100 $' ,bonus:'75' ,last_purchase:'12.08.2020', birthDate:'2021-03-22',gender:'male'},
       { id:5, name:"Dua Lipa" , category: 'standart' ,phone: '996550425563666', total:'200 $' ,bonus:'12000' ,last_purchase:'12-03-2020', birthDate:'2021-03-22',gender:'female'},
     ],
      search:'',
      sorting:true,
      perPage: 8,
      pageToOpen: 1,
      currentPage: 1,
      clientToDisplay:[],
      category:'',
      gender_client:''

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

    filterSubmit(){
         this.clientToDisplay = this.filteredList.filter((item)=>{
          return item.category === this.category && item.gender === this.gender_client

      })

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
    toggleSelect: function () {
      var select = this.selectAll;
      this.clientList.forEach(function (user) {
        user.checked = !select;
      });
      this.selectAll = !select;
    },
    sortByBonus() {
      this.clientToDisplay.sort((a, b) => this.sorting ? (parseInt(a.bonus) - parseInt(b.bonus)) : (parseInt(b.bonus) - parseInt(a.bonus)));
      this.sorting = !this.sorting;
      $('.date-pol').toggleClass('active')
      $('.total-pol').removeClass('active')
    },
    sortByTotal(){
      this.clientToDisplay.sort((a, b) => this.sorting? (parseInt(a.total) - parseInt(b.total)) : (parseInt(b.total) - parseInt(a.total)));
      this.sorting = !this.sorting;
      $('.total-pol').toggleClass('active')
      $('.date-pol').removeClass('active')
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
      $('.custom-checkbox input').prop('checked', false)
      this.renderPaginationList()
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
    new this.$lightpick({
      field: document.getElementById('from-date'),
      autoclose:false,
      footer:true,
    });
    new this.$lightpick({
      field: document.getElementById('to-date'),
      autoclose:false,
      footer:true,
    });
    new this.$lightpick({
      field: document.getElementById('from-purchase'),
      orientation:'top',
      autoclose:false,
      footer:true,
    });
    new this.$lightpick({
      field: document.getElementById('to-purchase'),
      orientation:'top',
      autoclose:false,
      footer:true,
    });
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

.last-filter-body{
  margin-bottom: 40px !important;
}

.filter-body{
  margin-bottom: 20px;
}
.filter-img{
  position: absolute;
  right: 0;
  top:18%;
}
.filter-list{
  font-weight: normal;
  font-size: 14px;
  border-bottom: 1px solid #F4F4F4;
  padding-bottom: 13px;
  position: relative;
  margin-bottom: 15px;

}

.client{
  margin: 0 30px;
  height: calc(100vh - 90px);
  overflow:hidden;
}
.adding-btns{
  background: #E9ECFF;
  color:#616CF5;
}

.filter-box{
  width: 662px;
  margin-right: 20px;
  margin-top: 10px;
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 23px;
  padding-bottom: 30px;
  height: auto;
  overflow-y: auto;
  transform: translate3d(-565px, 33px, 0px) !important;
  position: relative;
}
.save{
  width: 120px;

}
.filter-header h3{
  font-size: 16px;
}
.filter-header{
  margin-bottom: 30px;
}
.reset img{
  width: 18px;
  height: 18px;
}
.reset{
  margin-right: 30px;
  font-size: 14px;
  display: flex;
  align-items: center;
  color:#8C94A5;
  cursor:pointer;
}
.calendar{
  height: 27px;
  padding: 0 10px;
  margin-bottom: 0;
}
.calendar img{
  width: 14px;
  height: 14px;
}
.filter-body label{
  font-size: 12px;
  margin-bottom: 0;
  margin-right: 10px;
}
.calendar-input{
  font-size: 12px;
}
.cashback-input{
  height: 27px;
  width: 100%;
  font-size: 12px;
}
.category{
  font-size: 14px;
  display: flex;
  align-items: center;
}
.category:first-child{
  margin-bottom: 10px;
}
.filter-form{
  height: 27px;
  padding: 0 20px;
  font-size: 14px;
  background-position-y:50%;
  background-position-x:95%;;

}


/*=========radio button==========*/



.radio-toolbar-gender input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.radio-toolbar-gender label {
  display: inline-block;
  margin-bottom: 0;
  margin-right: 10px;
  width: 13px;
  height: 13px;
  border: 1px solid #E3E3E3;
  box-sizing: border-box;
  border-radius: 50%;
}

.radio-toolbar-gender input[type="radio"]:checked + label {
  background-color: #616cf5;
  border: none;
}
.male{
  font-size: 14px;
}

/*=====================Radio Toolbar Category=======================*/


.radio-toolbar-category input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.radio-toolbar-category label {
  display: inline-block;
  margin-bottom: 0;
  margin-right: 10px;
  width: 13px;
  height: 13px;
  border: 1px solid #E3E3E3;
  box-sizing: border-box;
  border-radius: 50%;
}

.radio-toolbar-category input[type="radio"]:checked + label {
  background-color: #616cf5;
  border: none;
}
.radio-toolbar-category .radio-checkbox{
  border-radius:3px;
}

</style>