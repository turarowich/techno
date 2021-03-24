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
              <li v-for="cat in listCategory" :key="cat.id" class="list-group-item" @click="moveCategory(cat.name.toLowerCase())" >{{cat.name}}</li>
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
            <li class="catalog-list" :id="category.name" :ref="'menu'+index"  v-for="(category,index) in listCategory" :key="category.id"  :class="{active: filtered === category.name.toLowerCase()}"  @click="changeFiltered(category.name)">
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
            <div class="table-head" style="width: 5%;"><label class="custom-checkbox"><input id="parent-check" type="checkbox"  @click="toggleSelect" :checked="selectAll"><span class="checkmark"></span></label></div>
            <div class="table-head" style="width: 42%;">Name</div>
            <div class="table-head" style="width: 24%;">Article</div>
            <div class="table-head table-link" style="width: 9%;" @click="sortByQunatity">Quantity <img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
            <div class="table-head table-link" style="width: 10%;" @click="sortByPrice">Price<img class="total-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
            <div class="table-head" style="width: 8%;"></div>
            <div class="table-head" style="width: 8%;"></div>
          </div>
          <div class="table-content">
              <CatalogItem
                  v-bind:catalogList="filteredList"
                  v-on:deleteCatalog="deleteCatalog"
                  v-on:editCatalog="editCatalog"
              />
          </div>
        </div>
      </div>
    </div>
    <AddService/>

    <Edit :edit_catalog="edit_catalog"
          :catalogList="catalogList"
          @editedData="editedData"
          :listCategory="listCategory"
    />
    <AddCategory v-on:addCategory="addCategory"/>
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
import 'sweetalert2/dist/sweetalert2.css';
import $ from "jquery";


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
        {id:4,name:"T-shirts",article:"B3214PO", quantity:2, price: "220 $", category: 'clothes'},
        {id:5,name:"Jackets",article:"B3214PO", quantity:3, price: "100 $", category: 'clothes'},

      ],
      listCategory:[{id:2,name:''}],
      search:'',
      sorting:true,
      filtered: '',
      className:'',
      edit_catalog:'',
      edit_category:''
    }
  },
  computed:{
    selectAll: function() {
        return this.catalogList.every(function(user){
          return user.checked
        });
      },
    filteredList() {
      return this.catalogList
      .filter(catalog => {
        return catalog.name.toLowerCase().includes(this.search.toLowerCase())
      })
      .filter(product => {
        return !product.category.indexOf(this.filtered)
      })

    },
  },
  methods:{

    moveCategory(value){
        let  move = this.catalogList.filter(catalog => catalog.checked)
        move.every(catalog=>catalog.category = value)
        move.map(cat=>cat.checked = false);
    },
    editCategory(id){
      this.edit_category = this.listCategory.find((category)=>category.id === id)
    },
    addCategory(newCategory){
      this.listCategory.push(newCategory);
      this.$swal( {
        text: 'Category has been added',
        showConfirmButton: false,
        timer: 1000,
        customClass: 'added',
        position:'top-right'
      });
    },

    deleteCategory(name, id){
      const idx = this.listCategory.findIndex(el=>el.id === id);
      this.$refs[Object.keys(this.$refs)[idx-1]].click()
      this.listCategory = this.listCategory.filter(cate => cate.id !== id);
      this.catalogList = this.catalogList.filter(catalog=>catalog.category !== name.toLowerCase())
      this.$swal( {
        text: 'Category has been deleted',
        showConfirmButton: false,
        timer: 1000,
        customClass: 'added',
        position:'top-right'
      });

    },

    changeFiltered(name){
      this.filtered = name.toLowerCase();
      console.log(this.filtered);


    },
    addNewProduct(newProduct){
        this.catalogList.push(newProduct)
        this.$swal( {
          text: 'Product has been added',
          showConfirmButton: false,
          timer: 2000,
          customClass: 'added',

      });
    },
    editedData(edited){
      var foundIndex = this.catalogList.findIndex(x => x.id === edited.id);
      this.catalogList[foundIndex] = edited;
    },
    editCatalog(id){
     this.edit_catalog = this.catalogList.find((catalog)=>catalog.id === id)
    },
    deleteAllOrder() {
      if(this.selectAll){
        this.catalogList = [];
        $('#parent-check').prop('checked', false)
      }
      else{
       this.catalogList = this.catalogList.filter(catalog => !catalog.checked)
      }
    },
    allCategory(){
      $('.list-group .catalog-list').first().text('All')

    },
    toggleSelect: function() {
      var select = this.selectAll;
      this.catalogList.forEach(function(user) {
        user.checked = !select;
      });
      this.selectAll = !select;
    },
    sortByQunatity() {
      if(this.catalogList.length === 0){
        return null;
      }
      this.catalogList.sort((a, b) => this.sorting? (parseInt(a.quantity) - parseInt(b.quantity)) : (parseInt(b.quantity) - parseInt(a.quantity)));
      this.sorting = !this.sorting;
      $('.date-pol').toggleClass('active')
      $('.total-pol').removeClass('active')
    },
    sortByPrice(){
      if(this.catalogList.length === 0){
        return null;
      }
      this.catalogList.sort((a, b) => this.sorting? (parseInt(a.price) - parseInt(b.price)) : (parseInt(b.price) - parseInt(a.price)));
      this.sorting = !this.sorting;
      $('.total-pol').toggleClass('active')
      $('.date-pol').removeClass('active')
    },
    deleteCatalog(id){
      this.$swal({
        showConfirmButton: true,
        text: 'Are you sure to remove this product',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        className:'delete-catalog'
     

      }).then((result) => {
        if (result.isConfirmed) {
          this.catalogList = this.catalogList.filter(el=> el.id !== id);
          this.$swal({
            text:'Product has been removed',
            timer: 2000,
            showConfirmButton:false,
            position: 'top-right'
          }
          )}
      })

    },
  },
  mounted(){
  this.allCategory()

  }
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

.swal2-popup.delete-catalog{
  background: red;
}

</style>