<template>
<div class="client">

<!--  <div>-->
<!--      <div><input type="checkbox" class="mr-3" @click="testingRef" v-model="bektemirCheck">Main Checkbox</div>-->
<!--      <div v-for="i in 3"><input type="checkbox"  :id="'name'+i" class="mr-3"  :ref="'bektemir'+i">{{i}}</div>-->
<!--  </div>-->

  <div class="searchAndButtons">
  <div class="d-flex justify-content-between app-buttons">
    <div class="d-flex align-items-center">
      <button class="app-buttons-item adding-btns" data-toggle="modal" data-target="#add-client-category"><span>+ Add category</span></button>
      <button class="app-buttons-item" @click="$router.push('/push-notification')"><img src="../../assets/icons/bgNotification.svg"><span>Push notification</span></button>
      <button class="app-buttons-item" @click="$router.push('/individual-push')"><img src="../../assets/icons/send-individual.svg"><span>Individual push</span></button>

    </div>
    <div class="d-flex align-items-center">
      <button class="app-buttons-item" @click="deleteAllClient"><img src="../../assets/icons/trash_empty.svg"><span>Remove</span></button>
      <button class="app-buttons-item"><img src="../../assets/icons/moveto.svg"><span>Move to</span></button>
      <button class="app-buttons-item" ><img src="../../assets/icons/import.svg"><span>Import</span></button>
      <div class="dropdown filter">
        <button class="dropdown-toggle app-buttons-item mr-0" id="dropdownFilterClient" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="../../assets/icons/filter.svg"><span>Filter</span></button>
        <div class="dropdown-menu filter-box" aria-labelledby="dropdownFilterClient">
          <form id="form"   >
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
                              <input v-model="from_number_purchase" class="cashback-input">
                            </div>

                            <div class="d-flex align-items-center">
                              <label>To</label>
                              <input class="cashback-input" v-model="to_number_purchase">
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
                              <input ref="client-filter" type="radio" id="radioStandart"  name="radioCategory" @click="category='standart'">
                              <label class="radio-checkbox" for="radioStandart"></label>
                              <span class="male">Standart</span>
                            </div>
                            <div class="d-flex align-items-center">
                              <input ref="client-filter" type="radio" id="radioVip" @click="category='vip'" name="radioCategory" >
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
                          <div class="category"><label class="custom-checkbox"><input ref="client-filter" @click="selectBirthday"  id="client-birthday" type="checkbox"><span class="checkmark"></span></label>Show only birthday people</div>
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
                            <input v-model="from_number_purchase" class="cashback-input">
                          </div>

                          <div class="d-flex align-items-center">
                            <label>To</label>
                            <input v-model="to_number_purchase" class="cashback-input">
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
                              <input ref="client-filter" type="radio" id="radioMen" name="radioGender" @click="gender_client = 'men'">
                              <label for="radioMen"></label>
                              <span class="male">Male</span>
                            </div>
                            <div class="d-flex align-items-center">
                              <input ref="client-filter" type="radio" id="radioWoman" name="radioGender" @click="gender_client='woman'">
                              <label for="radioWoman"></label>
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
                          <select v-model="discount" class="filter-form  form-control long-form-control  form-control-lg" aria-label=".form-select-lg example">
                            <option value="vip">vip</option>
                            <option value="standart">standart</option>
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
                <div @click="resetFilter()" class="reset" :class="addResetClass">Reset all</div>
                <button class="save" @click.prevent="filterSubmit" type="submit">Apply</button>
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
  <div class="d-flex">
    <div class="client-category-menu" style="width:24%">

      <div class="category-box">
        <h3 class="category-title">Client category</h3>
        <input v-model="search_category" placeholder="Search" style="height:35px; margin-bottom:15px" class="cashback-input">

        <ul class="list-group" >
          <li class="catalog-list"  v-for="category in filterCategory" :key="category.id"  @click="f_category = category.name.toLowerCase()">
            <span>{{category.name}}</span>
            <div class="dropdown dropMenu">
              <div class="dropdown-toggle" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="../../assets/icons/three-dots.svg">
              </div>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu">
                <ul class="list-group" >
                  <li class="list-group-item" data-toggle="modal" data-target="#edit-category">Edit</li>
                  <li class="list-group-item">Delete</li>
                </ul>
              </div>
            </div>
          </li>


        </ul>
      </div>
    </div>
    <div class="client-content" style="width:76%">
      <div class="main-content">
        <div class="d-flex main-content-header justify-content-between">
          <div class="table-head d-flex align-items-center client-names">
            <div class="table-head"><label class="custom-checkbox"><input type="checkbox"  @click="toggleSelect" class="main_select" v-model="selectAll"><span class="checkmark"></span></label></div>
            Name
          </div>
          <div v-if="data_check.birthday_checked" class="table-head" style="width: 12%;">Birthday</div>
          <div v-if="data_check.discount_checked" class="table-head" style="width: 10%;">Discount</div>
          <div class="table-head" style="width: 14%;">Category</div>
          <div v-if="data_check.register_date_checked" class="table-head" style="width: 18%;">Registration date</div>
          <div class="table-head client-phone" style="width:14%">Phone number</div>
          <div class="table-head table-link d-flex align-item-center" style="width: 8%;" @click="sortByTotal">Total <img class="total-pol" style="margin-left:5px" src="../../assets/icons/polygon.svg"></div>
          <div v-if="data_check.bonus_checked" class="table-head table-link d-flex align-items-center" style="width: 8%;" @click="sortByBonus">Bonus <img class="date-pol" style="margin-left:5px" src="../../assets/icons/polygon.svg"></div>
          <div v-if="data_check.last_purchase_checked" class="table-head" style="width: 16%;">Last purchase</div>
          <div style="width:3%" class="dropdown dropdown-settings pl-3">

            <div class="table-head text-right dropdown-toggle"  id="dropdownBlue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:5%"><img src="../../assets/icons/BlueSetting.svg"></div>

            <div class="dropdown-menu general-dropdown settings-dropdown" aria-labelledby="#dropdownBlue">
              <form>
                <div><label class="custom-checkbox"><input v-model="data_check.last_purchase_checked" type="checkbox"><span class="checkmark"></span></label> <span>Last purchase</span></div>
                <div><label class="custom-checkbox"><input v-model="data_check.bonus_checked" type="checkbox" id="show-bonus" ><span class="checkmark"></span></label> <span>Bonus</span></div>
                <div><label class="custom-checkbox"><input v-model="data_check.register_date_checked" type="checkbox" ><span class="checkmark"></span></label> <span>Registration date</span></div>
                <div><label class="custom-checkbox"><input v-model="data_check.discount_checked" type="checkbox" ><span class="checkmark"></span></label> <span>Discount</span></div>
                <div class="mb-0"><label class="custom-checkbox"><input v-model="data_check.birthday_checked" type="checkbox" ><span class="checkmark"></span></label> <span>Birthday</span></div>
              </form>
            </div>
          </div>

        </div>
        <div class="table-content">
          <ClientItem
              v-on:checkAll="checkAll"
              v-on:unCheckAll="unCheckAll"
              ref="client_item"
              :clientList="clientToDisplay"
              :data_check="data_check"

          />

        </div>

        <EditClient/>
        <AddCategory/>
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
            <div v-show='showPrev' @click.stop.prevent='currentPage-=1' class=" pagination-btns prevBtn " ><img src="../../assets/icons/side-arrow.svg"></div>
            <div class=" pagination-btns" v-show='showNext' @click.stop.prevent='currentPage+=1'> <img  src="../../assets/icons/side-arrow.svg"></div>
          </div>
        </div>

      </div>
    </div>
  </div>

</div>
</template>


<script>
import ClientItem from "@/components/clients/ClientItem";
import EditClient from "@/modals/client/EditClient";
import AddCategory from "@/modals/client/AddCategory";

import Swal from "sweetalert2";
import $ from 'jquery'


export default {
  name: "Clients",
  components:{
    EditClient,
    ClientItem,
    AddCategory
  },

  data(){
    return {
      clientList:[],
     //  clientList:[
     //   {register_date:'2021-03-14', number_of_purchase:'0', id:1, name:"Bektemir Kudaiberdiev Azzamkulovich ",  category: 'vip' ,phone: '996550425563', total:'450 $' ,bonus:'120' ,last_purchase:'2021-02-02', birthDate:this.$moment().format("YYYY-MM-DD") ,gender:'men'},
     //   {register_date:'2021-03-14', number_of_purchase:'10', id:15, name:"Tomas Levins Birthday" , category: 'vip' ,phone: '996550425563', total:'450 $' ,bonus:'120' ,last_purchase:'2021-02-02', birthDate:this.$moment().format("YYYY-MM-DD") ,gender:'men'},
     //   {register_date:'2021-04-12',number_of_purchase:'11', id:16, name:"Tomas Levins" , category: 'vip' ,phone: '996550425563', total:'450 $' ,bonus:'120' ,last_purchase:'2021-01-02', birthDate:'2021-12-03' ,gender:'men'},
     //   {register_date:'2021-01-12',number_of_purchase:'3', id:17, name:"Tomas Levins" , category: 'vip' ,phone: '996550425563', total:'450 $' ,bonus:'120' ,last_purchase:'2021-05-10', birthDate:'2021-12-03' ,gender:'men'},
     //   {register_date:'2021-03-10',number_of_purchase:'9', id:18, name:"Tomas Levins" , category: 'vip' ,phone: '996550425563', total:'450 $' ,bonus:'120' ,last_purchase:'2021-05-02', birthDate:'2021-12-03' ,gender:'men'},
     //   {register_date:'2021-03-10',number_of_purchase:'13', id:19, name:"Tomas Levins" , category: 'vip' ,phone: '996550425563', total:'450 $' ,bonus:'120' ,last_purchase:'2021-04-22', birthDate:'2021-12-03' ,gender:'men'},
     //   {register_date:'2021-03-10',number_of_purchase:'8', id:20, name:"Tomas Levins" , category: 'vip' ,phone: '996550425563', total:'450 $' ,bonus:'120' ,last_purchase:'2021-04-03', birthDate:'2021-12-03' ,gender:'men'},
     //   {register_date:'2021-03-12',number_of_purchase:'2', id:2, name:"Rihana" , category: 'standart' ,phone: '996550425563', total:'300 $' ,bonus:'340' ,last_purchase:'2021-04-02', birthDate:'2021-12-03',gender:'woman'},
     //   {register_date:'2021-04-12',number_of_purchase:'4', id:3, name:"Bektemir Kudiaberdiev" , category: 'standart' ,phone: '996550425563', total:'350 $' ,bonus:'13' ,last_purchase:'2021-03-16', birthDate:'2021-03-22',gender:'men'},
     //   {register_date:'2021-04-08',number_of_purchase:'1', id:4, name:"Cristiano Ronaldo" , category: 'vip' ,phone: '996550425563', total:'100 $' ,bonus:'75' ,last_purchase:'2021-03-22', birthDate:'2021-03-22',gender:'men'},
     //   {register_date:'2021-04-08',number_of_purchase:'5', id:5, name:"Dua Lipa Birthday" , category: 'standart' ,phone: '996550425563666', total:'200 $' ,bonus:'12000' ,last_purchase:'2021-03-02', birthDate:this.$moment().format("YYYY-MM-DD"),gender:'woman'},
     // ],
      data_check:{
       bonus_checked: false,
       last_purchase_checked: false,
       register_date_checked: false,
       birthday_checked:false,
       discount_checked:false,
     },
      clientCategory:[
          {id:1, name:'Standart'},
          {id:2, name:'Vip'},
          {id:3, name:'Gold'},
      ],
      selectAll:false,
      search:'',
      sorting:true,
      search_category:'',

      /*---------Sumbit values after choosing then ------------*/

      gender_client:'',
      birthday:'',
      category:'',
      discount:'',
      from_register_date:'2000-01-01',
      to_register_date:'',
      from_purchase_date:'2000-01-01',
      to_purchase_date:'',
      from_number_purchase:'',
      to_number_purchase:'',

      /*-------- initial values filtered first--------*/

      f_category:'',
      f_gender_client:'',
      f_birthday:'',
      f_from_register_date:'2000-01-01',
      f_to_register_date:'',
      f_from_purchase_date:'2000-01-01',
      f_to_purchase_date:'',
      f_from_number_purchase:'',
      f_to_number_purchase:'',
      currentPage:1,
      perPage:8,



    }
  },
  computed: {
    filteredList() {
      return this.clientList
          .filter(client => {
            return client.firstName.toLowerCase().includes(this.search.toLowerCase()) || client.phone.includes(this.search)
          })
          .filter(client =>{
            return(
                client.category.includes(this.f_category) &&
                client.birthDate.includes(this.f_birthday)
            )
          })
          // .filter(client=>{
          //   if(this.f_to_register_date.length > 0){
          //     return (new Date(client.register_date).getTime() >= new Date(this.f_from_register_date).getTime() &&
          //         new Date(client.register_date).getTime() <= new Date(this.f_to_register_date).getTime())
          //   }
          //   else if(this.f_to_register_date === ''){
          //     return new Date(client.register_date).getTime() >= new Date(this.f_from_register_date).getTime()
          //   }
          //   else{
          //     return client
          //   }
          // })
          // .filter(client=>{
          //   if(this.f_to_number_purchase.length>0){
          //     return +client.number_of_purchase >= this.f_from_number_purchase && +client.number_of_purchase <= this.f_to_number_purchase
          //   }
          //   else if(this.f_to_number_purchase === ''){
          //     return +client.number_of_purchase >=this.f_from_number_purchase;
          //   }
          //   else{
          //     return client
          //   }
          // })
          // .filter(client=>{
          //   if(this.f_to_purchase_date.length > 0){
          //     return (new Date(client.last_purchase).getTime() >= new Date(this.f_from_purchase_date).getTime() &&
          //         new Date(client.last_purchase).getTime() <= new Date(this.f_to_purchase_date).getTime())
          //   }
          //   else if(this.f_to_purchase_date === ''){
          //     return new Date(client.last_purchase).getTime() >= new Date(this.f_from_purchase_date).getTime()
          //   }
          //   else{
          //     return client
          //   }
          // })

    },
    filterCategory(){
      return this.clientCategory.filter((cat)=>{
        return cat.name.toLowerCase().includes(this.search_category.toLowerCase())
      })
    },
    clientToDisplay: function(){
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
    addResetClass: function(){
      return {
        red: this.category.length >0 || this.gender_client.length >0 || this.birthday.length>0
        || this.from_number_purchase.length >0 || this.to_number_purchase.length >0 || this.from_purchase_date !== '2000-01-01'
        || this.to_purchase_date.length >0 || this.from_register_date !== '2000-01-01' || this.to_register_date.length>0
      }
    },


  },

  methods: {
    checkAll(item){
      this.selectAll = item
    },
    unCheckAll(item){
      this.selectAll = item
    },
    toggleSelect(){
    this.clientList.forEach((client)=>{
    if(this.$refs.client_item.$refs[`select${client.id}`]!==undefined && this.$refs.client_item.$refs[`select${client.id}`] !== null){
      if(this.selectAll === false){
        this.$refs.client_item.$refs[`select${client.id}`].checked = true

      }
      else{
        this.$refs.client_item.$refs[`select${client.id}`].checked = false
      }
    }
    })
  },
    resetFilter(){
      this.category = '';
      this.birthday = '';
      this.gender_client = '';
      this.from_purchase_date = '2000-01-01';
      this.to_purchase_date='';
      this.from_register_date='2000-01-01';
      this.to_register_date = '';
      this.from_number_purchase='';
      this.to_number_purchase=''
      document.getElementById('form').reset()

    },
    filterSubmit(){
        this.f_category = this.category;
        this.f_gender_client = this.gender_client;
        this.f_birthday = this.birthday;
        this.f_to_register_date = this.to_register_date;
        this.f_from_register_date = this.from_register_date
        this.f_from_purchase_date = this.from_purchase_date;
        this.f_to_purchase_date = this.to_purchase_date;
        this.f_from_number_purchase = this.from_number_purchase;
        this.f_to_number_purchase = this.to_number_purchase;
        $('.filter-box').removeClass('show')
    },
    selectBirthday(){
      if(document.getElementById('client-birthday').checked){
        this.birthday=this.$moment().format('YYYY-MM-DD')
      }
      else{
        this.birthday = ''
      }
    },
    sortByBonus() {
      this.clientList.sort((a, b) => this.sorting ? (parseInt(a.bonus) - parseInt(b.bonus)) : (parseInt(b.bonus) - parseInt(a.bonus)));
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
          this.clientLient = this.clientList.filter(el=> el.id !== id);
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
      this.clientList = this.clientList.filter(client => {
        // if(this.$refs.client_item.$refs[`select${client.id}`]!==undefined && this.$refs.client_item.$refs[`select${client.id}`] !== null){
          return this.$refs.client_item.$refs[`select${client.id}`].checked !== true;
        // }
      })
      this.$successAlert("Clients have been removed")




    },
    getClients(){
      this.axios.get(this.url('getClients'))
      .then((res)=>{
        this.clientList = res.data.objects

      })
    }

  },
   mounted(){

    this.getClients()
    new this.$lightpick({
      field: document.getElementById('from-date'),
      format:'YYYY-MM-DD',
      autoclose:false,
      onSelect:(date)=>{
        this.from_register_date = date.format('YYYY-MM-DD')
      }

    });
    new this.$lightpick({
      field: document.getElementById('to-date'),
      format:'YYYY-MM-DD',
      autoclose:false,
      onSelect:(date)=>{
        this.to_register_date = date.format('YYYY-MM-DD')
      }
    });
    new this.$lightpick({
      field: document.getElementById('from-purchase'),
      orientation:'top',
      format:'YYYY-MM-DD',
      autoclose:false,
      onSelect:(date)=>{
        this.from_purchase_date = date.format('YYYY-MM-DD')
      }
    });
    new this.$lightpick({
      field: document.getElementById('to-purchase'),
      orientation:'top',
      format:'YYYY-MM-DD',
      autoclose:false,
      onSelect:(date)=>{
        this.to_purchase_date = date.format('YYYY-MM-DD')
      }
    });
   },


}
</script>

<style scoped>
.client-names{
  width: 33%;
}
.category-box{
  border: 1px solid #E3E3E3;
  box-sizing: border-box;
  border-radius: 5px;
  padding:20px 15px;
  margin-right: 20px;
}
.category-title{
  font-size:  16px;
  font-weight: normal;
  margin-bottom:10px;
}

.catalog-list{
  list-style-type: none;
  border:none;
  height: 35px;

  padding:0 10px;
  border-radius:5px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.reset.red{
  color:#E94A4A;
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