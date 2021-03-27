<template>
  <div class="catalog">
    <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
        <button class="app-buttons-item adding-btns" id="add-product" data-toggle="modal" data-target="#add-products"><span>+ Add product</span></button>
        <button class="app-buttons-item adding-btns" data-toggle="modal" data-target="#add-service"><span>+ Add service</span></button>
        <button class="app-buttons-item adding-btns"  data-toggle="modal" data-target="#add-category"><span>+ Add category </span></button>
      </div>
      <div class="d-flex align-items-center">
        <button class="app-buttons-item" @click="deleteAllOrder"><img src="../../assets/icons/trash_empty.svg"><span>Remove</span></button>

        <div class="dropdown">
          <button class=" dropdown-toggle app-buttons-item" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="../../assets/icons/moveto.svg"><span>Move to</span>
          </button>

          <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
            <ul class="list-group " >
              <li class="list-group-item">Select a category</li>
              <li v-for="cat in listCategory.slice(1)" :key="cat.id" class="list-group-item" @click="moveCategory(cat.name.toLowerCase())" >{{cat.name}}</li>
            </ul>
          </div>
        </div>
        <button class="app-buttons-item"><img src="../../assets/icons/import.svg"><span>Import</span></button>
        <button class="app-buttons-item"><img src="../../assets/icons/filter.svg"><span>Filter</span></button> </div>
    </div>
    <div class="main-search d-flex align-items-center">
      <img src="../../assets/icons/search-icon.svg">
      <input class="main-input" type="text" placeholder="Search" v-model="search">
    </div>
    </div>
    <div class="main-content">
      <div class="catalog-wrapper d-flex">
        <div class="catalog-menu" style="width:18%">
          <ul class="list-group" >
            <li class="catalog-list" :id="category.name" :ref="'menu'+index"  v-for="(category,index) in listCategory" :key="category.id"  :class="{active: filtered === category.name.toLowerCase()}"  @click="changeFilter(category.name.toLowerCase())">
              <span>{{category.name}}</span>
              <div class="dropleft dropMenu">
                <div class="dropdown-toggle" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="../../assets/icons/three-dots.svg">
                </div>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu">
                  <ul class="list-group" >
                    <li class="list-group-item" data-toggle="modal" data-target="#edit-category" @click="editCategory(category.id)">Edit</li>
                    <li class="list-group-item" @click.stop.prevent="deleteCategory(category.name, category.id)">Delete</li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="catalog-content" style="width:82%">
          <div class="d-flex main-content-header">
            <div class="table-head" style="width: 5%;"><label class="custom-checkbox"><input id="parent-check" type="checkbox"  @click="toggleSelect()" :checked="selectAll"><span class="checkmark"></span></label></div>
            <div class="table-head" style="width: 42%;">Name</div>
            <div class="table-head" style="width: 24%;">Article</div>
            <div class="table-head table-link pr-3" style="width: 10%;" @click="sortByQunatity">Quantity<img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
            <div class="table-head table-link" style="width: 10%;" @click="sortByPrice">Price<img class="total-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
            <div class="table-head" style="width: 8%;"></div>
            <div class="table-head" style="width: 8%;"></div>
          </div>
          <div class="table-content" >
              <CatalogItem
                  v-bind:catalogList="catalogToDisplay"
                  v-on:deleteCatalog="deleteCatalog"
                  v-on:editCatalog="editCatalog"
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
            <div><span>{{currentPage}}</span> of <span class="mr-3">{{totalPages}}</span>
              <img v-show='showPrev' @click.stop.prevent='renderPaginationList(currentPage-1)' class="prevBtn mr-3" src="../../assets/icons/side-arrow.svg">
              <img v-show='showNext' @click.stop.prevent='renderPaginationList(currentPage+1)' src="../../assets/icons/side-arrow.svg"></div>

          </div>
        </div>
      </div>
    </div>
    <AddService/>
    <Edit :edit_catalog="edit_catalog"
          :catalogList="catalogList"
          @editedCatalogSubmit="editedCatalogSubmit"
          :listCategory="listCategory"
    />
    <AddCategory v-on:addCategory="addCategory"
      :listCategory="listCategory"
    />
    <AddProduct
        @addNewProduct="addNewProduct"
        :listCategory="listCategory"/>

    <EditCategory
        :listCategory="listCategory"
        :edit_category="edit_category"/>
  </div>
</template>

<script>
import CatalogItem from "@/components/catalog-item/CatalogItem";
import AddProduct from "@/modals/catalog/add-product/AddProduct";
import AddService from "@/modals/catalog/add-service/AddService";
import Edit from "@/modals/catalog/edit/Edit";
import AddCategory from "@/modals/catalog/add-category/AddCategory";
import EditCategory from "@/modals/catalog/add-category/EditCategory";
import Swal from 'sweetalert2';

export default {
name: "Catalog",
  components:{
    CatalogItem,
    AddProduct,
    AddService,
    Edit,
    AddCategory,
    EditCategory
  },
  data(){
    return{
      catalogList:[
        {id:1,name:"Essential Shoes",article:"B3214PO", quantity:1, price: "450 $", category:'shoes'},
        {id:2,name:"Football boots",article:"B3214PO", quantity:5, price: "350 $", category:'shoes'},
        {id:3,name:"Sneakers",article:"B3214PO", quantity:4, price: "370 $", category:'shoes'},
        {id:6,name:"Shoues",article:"B3214PO", quantity:4, price: "370 $", category:'shoes'},
        {id:4,name:"T-shirts",article:"B3214PO", quantity:2, price: "220 $", category: 'clothes'},
        {id:5,name:"Jackets",article:"B3214PO", quantity:2, price: "220 $", category: 'clothes'},
      ],
      listCategory:[{id:2,name:''}],
      search:'',
      sorting:true,
      filtered: '',
      className:'',
      edit_catalog:'',
      edit_category:'',
      perPage: 8,
      pageToOpen: 1,
      currentPage: 1,
      catalogToDisplay:[],

    }
  },
  computed:{
    selectAll: function() {
        return this.catalogList.every(function(user){
          return user.checked
        });
      },
    filteredList: function(){
      return  this.catalogList
          .filter(catalog => {
            return catalog.name.toLowerCase().includes(this.search.toLowerCase())
          })
          .filter(product => {
            return !product.category.indexOf(this.filtered)
          })
    },
    totalPages(){
      //calculate the total number of pages based on the number of items to show per page and the total items we got from server
      console.log(this.filteredList.length)
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
  methods:{
    renderPaginationList(pageNumber=1){
      //clear currently displayed list
      this.catalogToDisplay = [];
      //set countries to display
      if(this.filteredList.length){
        let _this = this;
        return new Promise(function(res){
          //set the page to open to the pageNumber in the parameter in order to allow start and stop to update accordingly
          _this.pageToOpen = pageNumber;
          //add the necessary data to `countriesToDisplay` array
          for(let i = _this.start; i <= _this.stop; i++){
              _this.catalogToDisplay.push(_this.filteredList[i]);
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
    changeFilter(name){
      this.filtered = name;
      this.catalogList.forEach(catalog=>{
        return catalog.checked = false
      })
      this.$$('#parent-check').prop('checked',false)

    },
    moveCategory(value){
        let  move = this.catalogList.filter(catalog => catalog.checked)
        move.every(catalog=>catalog.category = value)
        move.map(cat=>cat.checked = false);
        this.renderPaginationList()
       this.$informationAlert('Category has been changed')

    },
    editCategory(id){
      this.edit_category = this.listCategory.find((category)=>category.id === id)
    },
    addCategory(newCategory){
      let user = this.listCategory.find(item=>item.name.toLowerCase() === newCategory.name.toLowerCase())
       if(user){
          this.$warningAlert('You already have category with this name',)
       }
       else{
         this.listCategory.push(newCategory)
        this.$successAlert('Category has been added')

       }
    },
    deleteCategory(name, id){
      const idx = this.listCategory.findIndex(el=>el.id === id);
      this.$refs[Object.keys(this.$refs)[idx-1]].click()
      this.listCategory = this.listCategory.filter(cate => cate.id !== id);
      this.catalogList = this.catalogList.filter(catalog=>catalog.category !== name.toLowerCase())
      this.$successAlert('Category has been removed')
    },
    addNewProduct(newProduct){
      this.catalogList.push(newProduct)
      this.renderPaginationList()
      this.$successAlert('Product has added')
    },
    editedCatalogSubmit(edited){
      var foundIndex = this.catalogList.findIndex(x => x.id === edited.id);
      this.catalogList[foundIndex] = edited;
      this.renderPaginationList()
      this.$successAlert('Changes are saved')
    },
    editCatalog(id){
     this.edit_catalog = this.catalogList.find((catalog)=>catalog.id === id)
    },
    deleteAllOrder() {
      if(this.selectAll){
        this.catalogList = []
        this.$successAlert('All products have been removed')
        this.$$('#parent-check').prop('checked', false)
      }
      else{
       this.catalogList = this.catalogList.filter(catalog => !catalog.checked)
      }

      this.renderPaginationList()
    },
    allCategory(){
      this.$$('.list-group .catalog-list').first().text('All')


    },
    toggleSelect: function() {
      let select = this.selectAll
      this.catalogList.filter((user)=> {
        if(this.filtered === '' || this.filtered === user.category){
          user.checked = !select
          console.log(user.checked)
        }
      });
    },
    sortByQunatity() {
      if(this.catalogToDisplay.length === 0){
        return null;
      }
      this.catalogToDisplay.sort((a, b) => this.sorting? (parseInt(a.quantity) - parseInt(b.quantity)) : (parseInt(b.quantity) - parseInt(a.quantity)));
      this.sorting = !this.sorting;
      this.$$('.date-pol').toggleClass('active')
      this.$$('.total-pol').removeClass('active')

    },
    sortByPrice(){
      if(this.catalogToDisplay.length === 0){
        return null;
      }
      this.catalogToDisplay.sort((a, b) => this.sorting? (parseInt(a.price) - parseInt(b.price)) : (parseInt(b.price) - parseInt(a.price)));
      this.sorting = !this.sorting;
      this.$$('.total-pol').toggleClass('active')
     this.$$('.date-pol').removeClass('active')

    },
    deleteCatalog(id){
      Swal.fire({
        showConfirmButton: true,
        html: 'Are you sure to remove this <br>product',
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
          this.catalogList = this.catalogList.filter(el=> el.id !== id);
          this.renderPaginationList()
          Swal.fire({
            title:'Success',
            timer:1500,
            text:'Product has been removed',
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
    // getProducts: function () {
    //     console.log("here")
    //     this.axios.get(this.url('getProducts'))
    //         .then((response) => {
    //             console.log(response.data)
    //             console.log("here")
    //             this.products = response.data
    //         })
    // },
  },
  mounted(){
    this.allCategory()

    this.renderPaginationList()
  },
  watch: {
    perPage: function(){
      this. renderPaginationList();
    },
    search: function (){
      this. renderPaginationList()
    },
    filtered:function(){
      this. renderPaginationList()
    },

  },
}
</script>￼




<style scoped>
.catalog{
  margin: 0 30px;
}
.catalog-list{
  list-style-type: none;
  border:none;
  height: 35px;
  border-radius: 5px;
  padding:0 20px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.catalog-list:hover{
  background: #EBEEFF;
  color: #616CF5;
  cursor:pointer;
}
.catalog-list.active{
  background: #EBEEFF;
  color: #616CF5;
}
.catalog-list img{
  width: 15px;
  height: 15px;
}
.catalog-menu{
  margin-right: 25px;
}
.adding-btns{
  background: #E9ECFF;
  color:#616CF5;
}

</style>