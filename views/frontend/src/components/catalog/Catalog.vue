<template>
  <div class="catalog">
    <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
        <button v-if="check()" class="app-buttons-item adding-btns" id="add-product" data-toggle="modal" data-target="#add-products"><span>+ Add product</span></button>
        <button v-if="check()" class="app-buttons-item adding-btns" @click="getProducts" data-toggle="modal" data-target="#add-service"><span>+ Add service</span></button>
        <button v-if="check()" class="app-buttons-item adding-btns"  data-toggle="modal" data-target="#add-category"><span>+ Add category </span></button>
      </div>
      <div class="d-flex align-items-center">
        <button v-if="check()" class="app-buttons-item" @click="deleteAllOrder"><img src="../../assets/icons/trash_empty.svg"><span>Remove</span></button>
        <div class="dropdown">
          <button v-if="check()" class="dropdown-toggle app-buttons-item" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="../../assets/icons/moveto.svg"><span>Move to</span>
          </button>

          <div class="move-category dropdown-menu" aria-labelledby="dropdownMenuTotal">
                <div class="move-category-item" v-for="cat in listCategory.slice(1)" :key="cat._id" @click="moveCategory(cat._id)">{{cat.name}}</div>
          </div>
        </div>
        <button v-if="check()" class="app-buttons-item" data-turbolinks="true"  data-toggle="modal" data-target="#import-client"><img src="../../assets/icons/import.svg"><span>Import</span></button>

        <div class="dropdown">
          <button class="app-buttons-item dropdown-toggle"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            <img class="img-btn" src="../../assets/icons/filter.svg"><span>Filter</span>
          </button>

          <div class="dropdown-menu general-dropdown" aria-labelledby="dropdownMenuButton">
            <form class="filter-product">
              <label>By price</label>
              <div class="d-flex">
                <input v-model="price_from" class="drop-input">
                <div class="d-flex">
                  <label class="mr-2 pl-2">to</label>
                  <input v-model="price_to" class="drop-input">
                </div>
              </div>

              <label>By quantity</label>
              <div class="d-flex">
                <input v-model="quantity_from" class="drop-input">
                <div class="d-flex">
                  <label class="mr-2 pl-2">to</label>
                  <input v-model="quantity_to" class="drop-input">
                </div>
              </div>

              <label>Auction goods</label>
              <div class="d-flex align-items-center mb-3">
                <label class="custom-checkbox mr-2"><input type="checkbox"><span class="checkmark"></span></label>
                <span style="font-size:14px">Show only auction items</span>
              </div>

              <label>By category</label>
                <select v-model="filtered" class="select-category form-control">
                  <option v-for="cat in listCategory" :key="cat._id" :value="cat._id">{{cat.name}}</option>
                </select>
            </form>
          </div>
        </div>

      </div>
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
            <li class="catalog-list" :id="category.name" :ref="'menu'+index"  v-for="(category,index) in listCategory" :key="category._id"  :class="{active: filtered === category._id}"  @click="filtered = category._id">
                <p class="category-text tool-tip" data-toggle="tooltip" data-placement="right" :title="category.name">
                  {{category.name}}
                </p>
                <div class="dropdown dropMenu">
                    <div class="dropdown-toggle" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img v-if="category._id !== '' && category._id !== null" src="../../assets/icons/three-dots.svg">
                </div>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu">
                    <ul class="list-group" >
                        <li class="list-group-item" data-toggle="modal" data-target="#edit-category" @click="selectCategory(category._id)">Edit</li>
                        <li class="list-group-item" @click.stop.prevent="deleteCategory(category._id)">Delete</li>
                    </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <ImportClient/>
        <AddCategory
            :listCategory="listCategory"
            :getCategories="getCategories"/>
        <EditCategory
            :listCategory="listCategory"
            :select_category="select_category"
            :getCategories="getCategories"
        />
        <AddProduct
            :listCategory="listCategory"
            :getProducts="getProducts"/>
        <EditProduct
           :listCategory="listCategory"
           :select_product="select_product"
           :getProducts="getProducts"

        />

        <div class="catalog-content" style="width:82%">
          <div class="d-flex main-content-header">
            <div class="table-head" style="width: 5%;"><label class="custom-checkbox"><input id="parent-check" type="checkbox"  @click="toggleSelect" v-model="selectAll"><span class="checkmark"></span></label></div>
            <div class="table-head" style="width: 36%;">Name</div>
            <div class="table-head" style="width: 24%;">Article</div>
            <div class="table-head table-link pr-3" style="width: 13%;" @click="sortByQunatity">Quantity<img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
            <div class="table-head table-link" style="width: 13%;" @click="sortByPrice">Price<img class="total-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
            <div class="table-head" style="width: 8%;"></div>
            <div class="table-head" style="width: 8%;"></div>
          </div>
          <div class="table-content" >
            <CatalogItem
                  ref="catalog_item"
                  v-on:unCheckAll="unCheckAll"
                  v-on:checkAll="checkAll"
                  v-on:selectProduct="selectProduct"
                  v-bind:catalogList="catalogToDisplay"
                  v-on:deleteProduct="deleteProduct"
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
              <img v-show='showPrev' @click.stop.prevent='currentPage-=1' class="prevBtn mr-3" src="../../assets/icons/side-arrow.svg">
              <img v-show='showNext' @click.stop.prevent='currentPage+=1' src="../../assets/icons/side-arrow.svg"></div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import EditProduct from "@/modals/catalog/edit-product/EditProduct";
import CatalogItem from "@/components/catalog/CatalogItem";
import AddCategory from "@/modals/catalog/add-category/AddCategory";
import AddProduct from "@/modals/catalog/add-product/AddProduct";
import EditCategory from "@/modals/catalog/add-category/EditCategory";
import ImportClient from "@/modals/client/ImportClient";
import Swal from 'sweetalert2';
import $ from 'jquery';
export default {
name: "Catalog",
  components:{
    CatalogItem,
    AddCategory,
    ImportClient,
    EditCategory,
    AddProduct,
    EditProduct
  },

  data(){
    return{
      listCategory:[{_id:'', name:'All'}],
      catalogList:[],
      deletedProducts:[],
      movedCategories:[],
      search:'',
      sorting:true,
      filtered: null,
      perPage: 8,
      currentPage: 1,
      selectAll:false,
      price_to:'',
      price_from:'',
      quantity_from:'',
      quantity_to:'',
      select_product:'',
      select_category:''
    }
  },
  computed:{
    filteredList: function(){
      return  this.catalogList
          .filter(catalog=>{
            if(this.price_to.length>0){
              return catalog.price >= this.price_from && catalog.price <= this.price_to
            }
            else if(this.price_to === ''){
              return catalog.price >=this.price_from;
            }
            else{
              return catalog
            }
          })
          .filter(catalog=>{
            if(this.quantity_to.length>0){
              return catalog.quantity >= this.quantity_from && catalog.quantity <= this.quantity_to
            }
            else if(this.quantity_to === ''){
              return catalog.quantity>=this.quantity_from;
            }
            else{
              return catalog
            }
          })
          .filter(catalog => {
            return catalog.name.toLowerCase().includes(this.search.toLowerCase())
          })
          .filter(product => {
            if(this.filtered){
              return product.category && product.category._id.includes(this.filtered);
            }
            return true;
          })
          .filter(product=>{
            if(this.filtered === ""){
              return product.category === null
            }
            return true
          })

    },
    catalogToDisplay: function(){
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

  },
  methods:{
    check(access="catalog", parametr="active", parametr2="canEdit"){
        return this.checkAccess(access, parametr, parametr2)
    },
    checkAll(item){
      this.selectAll = item
    },
    unCheckAll(item){
      this.selectAll = item
    },
    toggleSelect: function () {
      this.catalogList.forEach((user)=> {
        if(this.$refs.catalog_item.$refs[`select${user._id}`] !== undefined && this.$refs.catalog_item.$refs[`select${user._id}`] !== null){
          if(this.selectAll === false){
            this.$refs.catalog_item.$refs[`select${user._id}`].checked = true
          }
          else{
            this.$refs.catalog_item.$refs[`select${user._id}`].checked = false
          }
        }
      });
    },
    deleteAllOrder() {
      this.catalogList.forEach((user)=> {
        if(this.$refs.catalog_item.$refs[`select${user._id}`] !== undefined && this.$refs.catalog_item.$refs[`select${user._id}`] !== null){
          if(this.$refs.catalog_item.$refs[`select${user._id}`].checked === true){
            this.deletedProducts.push(user._id)
          }
        }
      });
    if(this.deletedProducts.length>0){
      Swal.fire({
        showConfirmButton: true,
        html: 'Are you sure to remove these<br>products',
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
          popup: 'animate__animated animate__slideInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }

      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(this.url('deleteProducts'),{data:{
              objects: this.deletedProducts
            }}).then(()=>{
                this.getProducts()
                this.deletedProducts = []
                $('#parent-check').prop('checked',false)
                this.$successAlert('All products have been removed')
            }).catch((error)=>{
                if(error.response && error.response.data){
                    this.$warningAlert(error.response.data.msg)
                }
            });
        }
        else{
          this.deletedProducts = []
        }
      })
    }

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
    selectCategory(id){
      this.listCategory.map((item)=>{
        if(item._id === id){
          this.select_category = item
        }
      })
    },
    selectProduct(id){
      this.catalogList.map((product)=>{
        if(product._id === id){
          this.select_product = product
        }
      })
    },
    deleteProduct(id){
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
          popup: 'animate__animated animate__slideInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }



      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(this.url('deleteProduct',id))
          .then(()=>{
            this.getProducts()
            Swal.fire({
                  title:'Success',
                  timer:800,
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
            )}).catch((error)=>{
                if(error.response && error.response.data){
                    this.$warningAlert(error.response.data.msg)
                }
            });
       }
      })
    },
    deleteCategory(id){


      Swal.fire({
        showConfirmButton: true,
        html: 'Are you sure to remove this <br>category',
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
          popup: 'animate__animated animate__slideInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(this.url('deleteCategory',id))
              .then(()=>{
                this.getCategories()
                const idx = this.listCategory.findIndex(el=>el._id === id);
                this.$refs[`menu${idx-1}`].click()
              })
                Swal.fire({
                      title:'Success',
                      timer:800,
                      text:'Category has been removed',
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
                )

        }
      })
    },
    getProducts(){
       this.axios.get(this.url('getProducts'))
          .then((response) => {
              this.catalogList = response.data.objects;
              console.log(this.catalogList)


  })
    },
    getCategories(){
       this.axios.get(this.url('getCategories')+'?type=product')
          .then((res)=>{
            this.listCategory = res.data.objects;
            this.listCategory.unshift({_id:"", name: 'Without category'})
            this.listCategory.unshift({_id:null, name: 'All'})

          })
    },
    moveCategory(id){
      this.catalogList.forEach((user)=> {
        if(this.$refs.catalog_item.$refs[`select${user._id}`] !== undefined && this.$refs.catalog_item.$refs[`select${user._id}`] !== null){
          if(this.$refs.catalog_item.$refs[`select${user._id}`].checked === true){
            this.movedCategories.push(user._id)
          }
        }
      });
    if(this.movedCategories.length === 0){
      this.$warningAlert("Please choose a product")
    }
    else{
      const submitObj = {
        objects:this.movedCategories,
        category:id
      }
      if(id === ""){
        submitObj['category'] = null;
      }

      this.axios.put(this.url('updateProductsCategory'), submitObj)
          .then(()=>{
            this.movedCategories = [];
            this.getProducts()
            this.$informationAlert("Change are saved")
          }).catch((error)=>{
            if(error.response && error.response.data){
                this.$warningAlert(error.response.data.msg)
            }
      });
    }
    }
  },


  mounted(){
    this.getCategories()
    this.getProducts()
  },

}
</script>￼




<style scoped>

.select-category{
  height: 35px;
  background-position-y: 50%;
  font-size: 14px;
}
.filter-product label{
  font-size: 15px;
}
.filter-product{
  padding: 20px;
}
.filter-product label{
  font-weight: normal;
}
.general-dropdown{
  width: 17rem;
  transform: translate3d(-167px, -10px, 0px) !important;
}
.catalog{
  margin: 0 30px;
  height: calc(100vh - 90px);
  overflow: hidden;
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

.catalog-menu{
  margin-right: 25px;
}
.adding-btns{
  background: #E9ECFF;
  color:#616CF5;
}

</style>