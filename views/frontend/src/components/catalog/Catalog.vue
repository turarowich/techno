<template>
  <div class="catalog">
    <div class="searchAndButtons">
      <div class="d-flex justify-content-between app-buttons">
        <div class="d-flex align-items-center">
          <button v-if="check()" class="app-buttons-item adding-btns" id="add-product" data-toggle="modal"
            data-target="#add-products"><span>+ Add product</span></button>
          <button v-if="check()" class="app-buttons-item adding-btns" @click="getProducts" data-toggle="modal"
            data-target="#add-service"><span>+ Add service</span></button>
          <button v-if="check()" class="app-buttons-item adding-btns" data-toggle="modal"
            data-target="#add-category"><span>+ Add category </span></button>
        </div>
        <div class="d-flex align-items-center">
          <div class="dropdown">
            <button class="app-buttons-item dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <img class="img-btn" src="../../assets/icons/filter.svg"><span>Filter</span>
            </button>

            <div class=" dropdown-menu filter-catalogs animate slideIn" aria-labelledby="dropdownMenuButton">
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
                <select v-model="selectedCategory" class="select-category form-control">
                  <option v-for="cat in listCategory" :key="cat._id" :value="cat._id">{{ cat.name }}</option>
                </select>

                <button @click="setFilters" type="button" class="app-buttons-item adding-btns"
                  style="width: 100%;margin-top: 5px;display: flex;justify-content: center;align-items: center;">
                  Filter
                </button>

                <button @click="clearFilters" type="button" class="app-buttons-item adding-btns"
                  style="width: 100%;margin-top: 5px;display: flex;justify-content: center;align-items: center;">
                  Clear filters
                </button>
              </form>
            </div>
          </div>
          <button v-if="check()" class="app-buttons-item" @click="deleteAllOrder"><img
              src="../../assets/icons/trash_empty.svg"><span>Remove</span></button>

          <div class="dropdown">
            <button v-if="check()" class="dropdown-toggle app-buttons-item" id="dropdownMenuTotal"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="../../assets/icons/moveto.svg"><span>Move to</span>
            </button>
            ..
            <div class="move-category animate slideIn dropdown-menu" aria-labelledby="dropdownMenuTotal">
              <div class="move-category-item" v-for="cat in listCategory.slice(1)" :key="cat._id"
                @click="moveCategory(cat._id)">{{ cat.name }}</div>
            </div>
          </div>
          <button v-if="check()" class="app-buttons-item" data-turbolinks="true" data-toggle="modal"
            data-target="#import-client"><img src="../../assets/icons/import.svg"><span>Import</span></button>
        </div>
      </div>
      <div class="main-search d-flex align-items-center">
        <img src="../../assets/icons/search-icon.svg" @click="catalogSearch">
        <input class="main-input" type="text" placeholder="Search" v-model="searchText" @keyup.enter="catalogSearch">
      </div>
    </div>
    <div class="main-content">
      <div class="catalog-wrapper d-flex">

        <div class="catalog-menu" style="width:18%;height: 300px;overflow: auto;">
          <ul class="list-group">
            <div v-for="(category, index) in navigateDisplayParentCategories" :key="category._id">
              <li class="catalog-list" :id="category.name" :ref="'menu' + index"
                :class="{ active: selectedCategory === category._id }" @click="setCategory(category._id)">
                <p class="category-text tool-tip" data-toggle="tooltip" data-placement="top" :title="category.name">
                  {{ category.name }}
                </p>

                <div class="dropdown dropMenu">
                  <div class="dropdown-toggle" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    <img v-if="category._id" src="../../assets/icons/three-dots.svg">
                  </div>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenu">
                    <ul class="list-group">
                      <li class="list-group-item" data-toggle="modal" data-target="#edit-category"
                        @click="selectCategory(category._id)">Edit</li>
                      <li class="list-group-item" @click.stop.prevent="deleteCategory(category._id)">Delete</li>
                    </ul>
                  </div>
                </div>
              </li>
              <div v-for="(child) in category.children" :key="child._id">
                <li :key="child._id" class="catalog-list catalog-list-child"
                  :id="child.name" :ref="'menu' + index" :class="{ active: selectedCategory === child._id }"
                  @click="setCategory(child._id)">
                  <p class="category-text tool-tip" data-toggle="tooltip" data-placement="top">
                    {{ child.name }}
                  </p>
                  <div class="dropdown dropMenu">
                    <div class="dropdown-toggle" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true"
                      aria-expanded="false">
                      <img v-if="child._id" src="../../assets/icons/three-dots.svg">
                    </div>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu">
                      <ul class="list-group">
                        <li class="list-group-item" data-toggle="modal" data-target="#edit-category"
                          @click="selectCategory(child._id)">Edit</li>
                        <li class="list-group-item" @click.stop.prevent="deleteCategory(child._id)">Delete</li>
                      </ul>
                    </div>
                  </div>
                </li>
                <div v-if="child.children">
                  <li v-for="(nestedChild) in child.children" :key="nestedChild._id" class="catalog-list catalog-list-child catalog-list-child-nested"
                    :id="nestedChild.name" :ref="'menu' + index" :class="{ active: selectedCategory === nestedChild._id }"
                    @click="setCategory(nestedChild._id)">
                    <p class="category-text tool-tip" data-toggle="tooltip" data-placement="top">
                      {{ nestedChild.name }}
                    </p>
                    <div class="dropdown dropMenu">
                      <div class="dropdown-toggle" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <img v-if="nestedChild._id" src="../../assets/icons/three-dots.svg">
                      </div>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenu">
                        <ul class="list-group">
                          <li class="list-group-item" data-toggle="modal" data-target="#edit-category"
                            @click="selectCategory(nestedChild._id)">Edit</li>
                          <li class="list-group-item" @click.stop.prevent="deleteCategory(nestedChild._id)"
                            >Delete</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </div>
              </div>
            </div>
          </ul>
        </div>



        <ImportClient />
        <AddCategory :listCategory="listCategory" :getCategories="reFetchCategories" />
        <EditCategory :listCategory="listCategory" :select_category="select_category"
          :getCategories="reFetchCategories" />
        <AddProduct :navigateDisplayParentCategories="navigateDisplayParentCategories" :listCategory="listCategory" :getProducts="getProducts" :productCustomFields="customFields"/>
        <EditProduct :listCategory="listCategory" :select_product="select_product" :getProducts="getProducts" :productCustomFields="customFields"/>

        <div class="catalog-content" style="width:82%">
          <div class="d-flex main-content-header">
            <div class="table-head" style="width: 5%;"><label class="custom-checkbox"><input id="parent-check"
                  type="checkbox" @change="selectAllProduct" v-model="selectAll"><span class="checkmark"></span></label>
            </div>
            <div class="table-head" style="width: 36%;">Name</div>
            <div class="table-head" style="width: 24%;">Article</div>
            <div class="table-head table-link pr-3" style="width: 13%;" @click="sortByQunatity">Quantity<img
                class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
            <div class="table-head table-link" style="width: 13%;" @click="sortByPrice">Price<img class="total-pol"
                style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
            <div class="table-head" style="width: 8%;"></div>
            <div class="table-head" style="width: 8%;"></div>
          </div>
          <div class="table-content">
            <div style="height:100%; " class="d-flex align-items-center" v-if="spinner">
              <Spinner />
            </div>
            <div v-else>
              <CatalogItem v-on:checkSelection="checkSelection" v-bind:getProducts="getProducts"
                v-on:selectProduct="selectProduct" v-bind:catalogList="catalogToDisplay"
                v-on:deleteProduct="deleteProduct" />
            </div>

          </div>
          <div class="pagination d-flex justify-content-between align-items-center">
            <!--            <div class="d-flex align-items-center">-->
            <!--              <span>Rows per page</span>-->
            <!--              <select class="form-control pagination-select" v-model='perPage'>-->
            <!--                <option value="8">8</option>-->
            <!--                <option value="16">16</option>-->
            <!--                <option value="32">32</option>-->
            <!--              </select>-->
            <!--            </div>-->
            <!--            <div class="d-flex align-items-center"><span>{{current_page}}</span> <span class="mr-1 ml-1">of</span> <span class="mr-2">{{totalPages}}</span>-->
            <!--              <div v-if='showPrev' @click.stop.prevent='currentPage-=1' class=" pagination-btns"><img class="pagination-img"  src="../../assets/icons/prevArrow.svg"></div>-->
            <!--              <div v-else class="pagination-btns " style="opacity: 0.5;"><img class="pagination-img"  src="../../assets/icons/prevArrow.svg"></div>-->
            <!--              <div class=" pagination-btns" v-if='showNext' @click.stop.prevent='currentPage+=1'>  <img class="pagination-img"  src="../../assets/icons/side-arrow.svg"></div>-->
            <!--              <div v-else class=" pagination-btns"  style="opacity: 0.5;">  <img class="pagination-img"   src="../../assets/icons/side-arrow.svg"></div>-->
            <!--            </div>-->

            <div style="display: flex;height: 50px;width: 100%;justify-content: center;align-items: center;">
              <div v-if="currentPage > 3" @click="currentPage--" style="cursor: pointer;">
                <img src="../../assets/icons/prevArrow.svg">
              </div>
              <div class="paginationItem" v-if="currentPage > 3" @click="currentPage = 1; getProducts()"
                style="cursor: pointer;">1</div>
              <div v-if="currentPage > 3">
                ...
              </div>
              <div v-bind:class="{ activePage: currentPage === page2 }" class="paginationItem"
                v-for="page2 in numberOfPagesArray.filter(num => num < currentPage + 3 && num > currentPage - 3)"
                :key="page2" @click="setPage(page2)">
                {{ page2 }}
              </div>
              <div v-if="currentPage < numberOfPagesArray.length - 2">
                ...
              </div>
              <div class="paginationItem" v-if="currentPage < numberOfPagesArray.length - 2"
                @click="currentPage = numberOfPagesArray.slice(-1)[0]; getProducts()" style="cursor: pointer;">
                {{ numberOfPagesArray.slice(-1)[0] }}</div>
              <div v-if="currentPage < numberOfPagesArray.length - 2" @click="currentPage++" style="cursor: pointer;">
                <img src="../../assets/icons/side-arrow.svg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  /* eslint-disable */

import Spinner from "../Spinner";
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
  components: {
    CatalogItem,
    AddCategory,
    ImportClient,
    EditCategory,
    AddProduct,
    EditProduct,
    Spinner
  },

  data() {
    return {
      spinner: true,
      listCategory: [{ _id: '', name: 'all' }],
      parentCategories: [{ _id: '', name: 'all' }],
      navigateDisplayParentCategories: [{ _id: '', name: 'all' }],
      catalogList: [],
      deletedProducts: [],
      movedCategories: [],
      searchText: '',
      sorting: true,
      selectedCategory: "all",
      perPage: 8,
      currentPage: 1,
      selectAll: false,
      price_to: '',
      price_from: '',
      quantity_from: '',
      quantity_to: '',
      select_product: '',
      select_category: '',
      customFields: {
        productCustomField1: {name: 'Custom field 1', value: ''},
        productCustomField2: {name:'Custom field 1', value: ''},
        productCustomFields: false,
        productCustomColors:{
          required: false,
          values: [],
        },
      },

      numberOfPagesArray: [],
    }
  },
  computed: {
    filteredList: function () {
      return this.catalogList
      // .filter(catalog=>{
      //   if(this.price_to.length>0){
      //     return catalog.price >= this.price_from && catalog.price <= this.price_to
      //   }
      //   else if(this.price_to === ''){
      //     return catalog.price >=this.price_from;
      //   }
      //   else{
      //     return catalog
      //   }
      // })
      // .filter(catalog=>{
      //   if(this.quantity_to.length>0){
      //     return catalog.quantity >= this.quantity_from && catalog.quantity <= this.quantity_to
      //   }
      //   else if(this.quantity_to === ''){
      //     return catalog.quantity>=this.quantity_from;
      //   }
      //   else{
      //     return catalog
      //   }
      // })
      // .filter(catalog => {
      //   return catalog.name.toLowerCase().includes(this.search.toLowerCase())
      // })
      // .filter(product => {
      //   if(this.selectedCategory){
      //     return product.category && product.category._id.includes(this.selectedCategory);
      //   }
      //   return true;
      // })
      // .filter(product=>{
      //   if(this.selectedCategory === ""){
      //     return product.category === null
      //   }
      //   return true
      // })
    },
    // current_page(){
    //   if(this.currentPage> this.totalPages){
    //     return Math.ceil(this.filteredList.length / this.perPage)
    //   }
    //
    //   return this.currentPage
    // },

    catalogToDisplay: function () {
      return this.filteredList;
      // let start = (this.current_page - 1) * this.perPage;
      // let end = this.current_page * this.perPage
      // this.filteredList.map((value, index) =>{
      //   value.index = index
      //   return value
      // })
      // return this.filteredList.slice(start, end)
    },
    // totalPages:function(){
    //   return Math.ceil(this.filteredList.length / this.perPage)
    // },

    // showNext(){
    //   return this.currentPage < this.totalPages;
    // },
    // showPrev(){
    //   return this.currentPage > 1;
    // },

  },
  methods: {
    fetchSettings(){
      this.axios.get(this.url('getSettings'))
        .then((response) => {
          if(response.data.object.productCustomFields) {
            this.customFields.productCustomField1 = response.data.object.productCustomField1
            this.customFields.productCustomField2 = response.data.object.productCustomField2
            this.customFields.productCustomFields = response.data.object.productCustomFields

          }
          if(response.data.object.productCustomColors.required) {
            this.customFields.productCustomColors = response.data.object.productCustomColors
          }
        }).catch(function (error){
          if (error.response) {
            console.log('setCatalog_settings EERRRor',error.response)
          }
        })
    },
    catalogSearch() {
      this.currentPage = 1;
      this.getProducts();
      this.searchStatus = true;
    },
    clearFilters() {
      this.selectedCategory = "all";
      this.price_from = '';
      this.price_to = '';
      this.quantity_from = '';
      this.quantity_to = '';
      this.currentPage = 1;
      this.getProducts();
    },
    setFilters() {
      this.currentPage = 1;
      this.getProducts();
    },
    setPage(page) {
      this.currentPage = page;
      this.getProducts();
    },
    setCategory(id) {
      this.selectedCategory = id;
      this.currentPage = 1;
      this.getProducts();
    },

    check(access = "catalog", parametr = "active", parametr2 = "canEdit") {
      return this.checkAccess(access, parametr, parametr2)
    },
    selectAllProduct() {
      this.catalogToDisplay.map(product => product['selected'] = this.selectAll)
    },
    checkSelection() {
      let selected = this.filteredList.filter(employee => {
        return employee.selected
      })
      this.selectAll = selected.length === this.filteredList.length
    },
    deleteAllOrder() {
      this.catalogList.forEach((user) => {
        if (user.selected) {
          this.deletedProducts.push(user._id);
        }
      });
      if (this.deletedProducts.length > 0) {
        Swal.fire({
          showConfirmButton: true,
          html: 'Are you sure to remove these<br>products',
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: 'Delete',
          buttonsStyling: false,
          customClass: {
            popup: 'sweet-delete',
            confirmButton: 'confirm-btn',
            cancelButton: 'cancel-btn',
            actions: 'btn-group',
            content: 'content-sweet',
            closeButton: 'close-btn'
          },
          showClass: {
            popup: 'animate__animated animate__slideInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }

        }).then((result) => {
          if (result.isConfirmed) {
            this.axios.delete(this.url('deleteProducts'), {
              data: {
                objects: this.deletedProducts
              }
            }).then(() => {
              this.getProducts()
              this.deletedProducts = []
              this.selectAll = false;
              this.$successAlert('All products have been removed')
            }).catch((error) => {
              if (error.response && error.response.data) {
                this.$warningAlert(error.response.data.msg)
              }
            });
          }
          else {
            this.deletedProducts = []
          }
        })
      }


    },
    sortByQunatity() {
      if (this.catalogList.length === 0) {
        return null;
      }
      this.catalogList.sort((a, b) => this.sorting ? (parseInt(a.quantity) - parseInt(b.quantity)) : (parseInt(b.quantity) - parseInt(a.quantity)));
      this.sorting = !this.sorting;
      $('.date-pol').toggleClass('active')
      $('.total-pol').removeClass('active')

    },
    sortByPrice() {
      if (this.catalogList.length === 0) {
        return null;
      }
      this.catalogList.sort((a, b) => this.sorting ? (parseInt(a.price) - parseInt(b.price)) : (parseInt(b.price) - parseInt(a.price)));
      this.sorting = !this.sorting;
      $('.total-pol').toggleClass('active')
      $('.date-pol').removeClass('active')
    },
    selectCategory(id) {
      this.listCategory.map((item) => {
        if (item._id === id) {
          this.select_category = item
          this.select_category.parent = item.parent ? item.parent._id : ''
        }
      })
    },
    selectProduct(id) {
      this.catalogList.map((product) => {
        if (product._id === id) {
          this.select_product = product;
        }
      })
    },
    deleteProduct(id) {
      Swal.fire({
        showConfirmButton: true,
        html: 'Are you sure to remove this <br>product',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        buttonsStyling: false,
        customClass: {
          popup: 'sweet-delete',
          confirmButton: 'confirm-btn',
          cancelButton: 'cancel-btn',
          actions: 'btn-group',
          content: 'content-sweet',
          closeButton: 'close-btn'
        },
        showClass: {
          popup: 'animate__animated animate__slideInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }

      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(this.url('deleteProduct', id))
            .then(() => {
              this.getProducts()
              Swal.fire({
                title: 'Success',
                timer: 800,
                text: 'Product has been removed',
                showConfirmButton: false,
                position: 'top-right',
                customClass: {
                  popup: 'success-popup',
                  content: 'success-content',
                  title: 'success-title',
                  header: 'success-header',
                  image: 'success-img'
                },
                showClass: {
                  popup: 'animate__animated animate__zoomIn'
                },

              }
              )
            }).catch((error) => {
              if (error.response && error.response.data) {
                this.$warningAlert(error.response.data.msg)
              }
            });
        }
      })
    },
    deleteCategory(id) {
      Swal.fire({
        showConfirmButton: true,
        html: 'Are you sure to remove this <br>category',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        buttonsStyling: false,
        customClass: {
          popup: 'sweet-delete',
          confirmButton: 'confirm-btn',
          cancelButton: 'cancel-btn',
          actions: 'btn-group',
          content: 'content-sweet',
          closeButton: 'close-btn'
        },
        showClass: {
          popup: 'animate__animated animate__slideInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(this.url('deleteCategory', id))
            .then(() => {
              this.reFetchCategories()
              const idx = this.listCategory.findIndex(el => el._id === id);
              this.$refs[`menu${idx - 1}`].click()
            })
          Swal.fire({
            title: 'Success',
            timer: 800,
            text: 'Category has been removed',
            showConfirmButton: false,
            position: 'top-right',
            customClass: {
              popup: 'success-popup',
              content: 'success-content',
              title: 'success-title',
              header: 'success-header',
              image: 'success-img'
            },
          }
          )
        }
      })
    },
    getProducts() {
      const options = {
        headers: { "x-client-url": this.currentCompanyCatalog },
        params: {
          "page": this.currentPage,
          "categoryId": this.selectedCategory,
          "min": this.price_from,
          "max": this.price_to,
          "minQuantity": this.quantity_from,
          "maxQuantity": this.quantity_to,
          "searchText": this.searchText,
        },
      }
      this.axios.get(this.url('getProducts'), options)
        .then((response) => {
          this.catalogList = response.data.objects;
          this.numberOfPagesArray = Array.from({ length: response.data.pagesCount || 0 }, (_, i) => i + 1);
          this.spinner = false;
        })
      this.axios.get(this.url('getCategoryPP')) 
      this.axios.get(this.url('getProductPP'))   
      this.axios.get(this.url('getCheckPP'))
    },
    reFetchCategories() {
      this.getCategories();
      this.getNestedCategories();
    },
    getCategories() {
      this.axios.get(this.url('getCategories') + '?type=product')
        .then((res) => {
          this.listCategory = res.data.objects;
          this.listCategory.unshift({ _id: "", name: 'Without category' });
          // eslint-disable-next-line
          // debugger
        })
    },
    getNestedCategories() {
      this.axios.get(this.url('getCategories/nested') + '?type=product')
        .then((res) => {
          console.log(res.data.objects);
          this.parentCategories = res.data.objects;
          this.navigateDisplayParentCategories = [...res.data.objects];
          this.navigateDisplayParentCategories.unshift({ _id: null, name: 'all' })
        })
    },
    moveCategory(id) {
      this.catalogList.forEach((user) => {
        if (user.selected) {
          this.movedCategories.push(user._id)
        }
      });
      if (this.movedCategories.length === 0) {
        this.$warningAlert("Please choose a product")
      }
      else {
        const submitObj = {
          objects: this.movedCategories,
          category: id
        }
        if (id === "") {
          submitObj['category'] = null;
        }

        this.axios.put(this.url('updateProductsCategory'), submitObj)
          .then(() => {
            this.movedCategories = [];
            this.selectAll = false;
            this.getProducts()
            this.$informationAlert("Change are saved")
          }).catch((error) => {
            if (error.response && error.response.data) {
              this.$warningAlert(error.response.data.msg)
            }
          });
      }
    }
  },

  mounted() {
    this.fetchSettings()
    this.getCategories()
    this.getNestedCategories()
    this.getProducts()
  },

}
</script>￼

<style scoped>
.paginationItem {
  width: 28px;
  min-width: 28px;
  height: 28px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
}

.activePage {
  background-color: #616cf5;
  color: #fff;
  font-weight: bold;
}

.select-category {
  height: 35px;
  background-position-y: 50%;
  font-size: 14px;
}

.filter-product label {
  font-size: 15px;
}

.pagination {
  width: calc(82% - 275px);
}

.filter-product {
  padding: 20px;
}

.filter-product label {
  font-weight: normal;
}

.filter-catalogs {
  width: 17rem;
  margin-top: 44px;

}

.catalog {
  margin: 0 30px;
  height: calc(100vh - 90px);
  overflow: hidden;
}

.catalog-list {
  list-style-type: none;
  border: none;
  height: 35px;
  border-radius: 5px;
  padding: 0 20px;
  padding-right: 0;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.catalog-list-child {
  background-color: #F4F4F4;
  margin-left: 20px;
  padding-left: 10px;
}

.catalog-list-child-nested {
  background-color: #D1D1D1;
  margin-left: 30px;
}

.catalog-menu {
  margin-right: 25px;
}

.adding-btns {
  background: #E9ECFF;
  color: #616CF5;
}
</style>