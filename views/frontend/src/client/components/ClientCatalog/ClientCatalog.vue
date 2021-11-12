<template>


<div class="row catalog">
  <div id="categories" class="pt-3 col-lg-3 col-md-4">
    <div class="catalog-left">
      <h3  class="product-title"><img src="../../../assets/clients/Icon.svg">Products</h3>
      <h3 class="price">Sort:</h3>

      <div class="selectWrapper" style="display:flex;flex-direction: column;position: relative">
        <div @click="showSortDrop=!showSortDrop" style="display: flex;justify-content: space-between">
          <div>{{sortBy}}</div>
          <div>
            <img v-bind:style="[showSortDrop? {transform:'rotate(180deg)'}:'']" src="../../../assets/img/select_arrow.svg">
          </div>
        </div>

        <div class="sortDropDown" v-if="showSortDrop">
          <div @click="showSortDrop=false;" style="float: right;margin-top:-5px;">x</div>
          <div @click="sortBy='ascendingName';getProducts();showSortDrop=false;">Name A-Z</div>
          <div @click="sortBy='descendingName';getProducts();showSortDrop=false;">Name Z-A</div>
          <div @click="sortBy='ascendingPrice';getProducts();showSortDrop=false;">Price 0-100</div>
          <div @click="sortBy='descendingPrice';getProducts();showSortDrop=false;">Price 100-0</div>
        </div>
      </div>
      <hr/>
      <h3 class="price">Price:</h3>
    <div class="d-flex mb-5">
      <div style="width:50%" class="mr-3">
        <label class="label-client">From</label>
        <input class="client-input" v-model="from" style="width:100%">
      </div>
      <div style="width:50%">
        <label class="label-client">To</label>
        <input class="client-input" v-model="to" style="width:100%">
      </div>
    </div>
    <input type="text" id="range-slider" name="example_name" value="" class="d-none"/>
    <div class="line"></div>
    <div class="sticked-categories" style="height: 300px;overflow: auto;">
      <h3 class="price">Categories:</h3>
      <ul class="list-group">
        <li v-for="category in listCategory" :key="category._id" :class="{active: category._id === selectedCategory}" class="catalog-list" @click="setCategory(category._id)">{{category.name}}</li>
      </ul>
    </div>
    </div>
    <div class="mobile-btns">
      <button  class="save" @click="showFilterCategory('category')" ><img class="list-icon" src="../../../assets/icons/list.svg"><span>Select categories</span></button>
      <div class="showCategory">
        <div class="mobile-header d-flex justify-content-between align-items-center" >
          <h3 class="filter-category">Categories</h3>
          <img @click="removeFilterCategory('category')" class="close-nav" src="../../../assets/icons/xBlack.svg">
        </div>
       <div style="height:calc(100% - 82px); overflow-y:auto">
         <ul class="list-group p-0">
           <li v-for="category in listCategory" :key="category._id" :class="{active: category._id === selectedCategory}" class="catalog-list" @click="setCategory(category._id)">{{category.name}}</li>
         </ul>
       </div>
      </div>
      <div class="d-flex mb-3">
        <button class="app-buttons-item" @click="showFilterCategory('filter')"><img src="../../../assets/icons/filter-btn.svg"><span>Filters</span></button>
      </div>
      <div class="showFilter" >
        <div class="mobile-header d-flex justify-content-between align-items-center" >
          <h3 class="filter-category">Filter</h3>
            <img @click="removeFilterCategory('filter')" class="close-nav" src="../../../assets/icons/xBlack.svg">
        </div>
        <div class="d-flex mb-5">
          <div style="width:40%" class="mr-3">
            <label class="label-client">From</label>
            <input class="client-input" v-model="from" style="width:100%">
          </div>
          <div style="width:40%">
            <label class="label-client">To</label>
            <input class="client-input" v-model="to" style="width:100%">
          </div>
        </div>
        <input class="d-none" type="text" id="range-slider2" name="example_name" value="" />
<!--        <button class=" show save" @click="removeFilterCategory('filter')">Show</button>-->
      </div>
      <div class="category-key">Category: <span class="category-value">{{showCategory}}</span></div>
      <div class="backdrop-filter"></div>
    </div>
  </div>

  <div  id="products" class="pt-3 col-lg-9 col-md-8">
    <div style="position: relative;">
      <div class="catalogSearchInputIcon">
        <img @click="catalogSearch" src="../../../assets/icons/search-icon.svg">
      </div>
      <input placeholder="search..." v-model="searchText" @keyup.enter="catalogSearch" class="catalogSearchInput" type="text">
      <div class="catalogSearchClearIcon" v-if="searchText!==''">
        <img @click="searchText='';getProducts()" src="../../../assets/icons/xBlack.svg">
      </div>
    </div>

    <div v-if="filteredList.length === 0 && searchText !=='' && searchStatus">
      <div style="display: flex;justify-content: center;align-items: center;">
        No results found for {{searchText}}
      </div>
    </div>

    <div v-if="filteredList.length !== 0 && searchText !=='' && searchStatus">
      <div style="display: flex;justify-content: center;align-items: center;">
        Results for: {{searchText}}
      </div>
    </div>

    <div v-if="spinner">
      <Spinner/>
    </div>
    <div v-else>
      <ClientCatalogItem v-bind:catalog="filteredList"/>
    </div>

    <div style="display: flex;height: 50px;width: 100%;justify-content: center;align-items: center;">
      <div v-if="currentPage>3"  @click="currentPage--" style="cursor: pointer;">
        <img src="../../../assets/icons/prevArrow.svg">
      </div>
      <div class="paginationItem" v-if="currentPage>3"  @click="currentPage=1;getProducts()" style="cursor: pointer;">1</div>
      <div v-if="currentPage>3">
        ...
      </div>
      <div v-bind:class="{ activePage: currentPage===page2 }" class="paginationItem" v-for="page2 in numberOfPagesArray.filter(num => num < currentPage+3 && num > currentPage-3)" :key="page2" @click="setPage(page2)">
        {{page2}}
      </div>
      <div v-if="currentPage<numberOfPagesArray.length-2">
        ...
      </div>
      <div class="paginationItem" v-if="currentPage<numberOfPagesArray.length-2" @click="currentPage=numberOfPagesArray.slice(-1)[0];getProducts()" style="cursor: pointer;">{{numberOfPagesArray.slice(-1)[0]}}</div>
      <div v-if="currentPage<numberOfPagesArray.length-2" @click="currentPage++" style="cursor: pointer;">
        <img src="../../../assets/icons/side-arrow.svg">
      </div>
    </div>
  </div>

</div>

</template>

<script>
import $ from 'jquery';
import ClientCatalogItem from "@/client/components/ClientCatalog/ClientCatalogItem";
import Spinner from "../../../components/Spinner";
const _ = require('lodash');
export default {
name: "Catalog",
  components:{
    ClientCatalogItem,
    Spinner
  },
  data(){
    return{
      showSortDrop:false,
      sortBy:"ascendingName",
      searchStatus:false,
      searchText:"",
      spinner:true,
      catalog:[],
      listCategory:[],
      filtered: 'all',
      selectedCategory:"all",
      from:0,
      to:0,
      showCategory:'All',
      currentPage:1,
      numberOfPagesArray:[],
    }
  },
  computed:{
    filteredList: function(){
      return  this.catalog
        // .filter(product => {
        //   if(this.filtered!=='all'){
        //     return product.category===this.filtered;
        //   }else{
        //     return product;
        //   }
        // })
        // .filter((product)=>{
        //   return product.price >= this.from && product.price <= this.to;
        // })
        // .filter((product)=>{
        //   return product.quantity > 0;
        // })
        // .filter((product)=>{
        //   return product.active === true;
        // })
    },
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
  },
  methods: {
    catalogSearch(){
      // this.selectedCategory = "all";
      this.currentPage = 1;
      this.getProducts();
      this.searchStatus = true;
    },
    setCategory(id){
      this.selectedCategory = id;
      this.currentPage = 1;
      this.getProducts();
    },
    setPage(page){
      console.log(page)
      this.currentPage = page;
      this.getProducts();
    },
    displayFiltered(id){
        this.filtered = id
        this.listCategory.map(i=>{
          if(i._id == id){
            this.showCategory = i.name
          }
        })
        $('.showCategory').removeClass('active')

        $('.backdrop-filter').removeClass('active')
      $('body').css({'overflow':'auto'})
      },
    showFilterCategory(item){
      console.log("showFilterCategory");
      if(item==='category'){
        $('.showCategory').addClass('active')
      }
      else{
        $('.showFilter').addClass('active')
      }
      $('.backdrop-filter').addClass('active')
      $('body').css({'overflow':'hidden'})
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    },

    removeFilterCategory(item){
      console.log("removeFilterCategory");
      if(item === 'category'){
        $('.showCategory').removeClass('active')

      }
      else{
        $('.showFilter').removeClass('active')
      }
      $('body').css({'overflow':'auto'})
      $('.backdrop-filter').removeClass('active')
      const scrollY = document.body.style.top;
      document.body.style.top = '';
      document.body.style.position = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);

    },
    getRangeValues() {
      const slider = $("#range-slider").data("ionRangeSlider");
      this.from = slider.result.from;
      this.to = slider.result.to;
    },
    rangeSlider() {
      $("#range-slider").ionRangeSlider({
        type: "double",
        min: 0,
        max: 9999,
        from: 0,
        to: 9999,
        prefix: "$",
        onChange: (data) => {
          this.from = data.from;
          this.to = data.to
        }
      });
      $("#range-slider2").ionRangeSlider({
        type: "double",
        min: 0,
        max: 9999,
        from: 0,
        to: 9999,
        prefix: "$",
        onChange: (data) => {
          this.from = data.from;
          this.to = data.to
        }
      });
    },
    async  getProducts(){
      this.spinner = true;
      const options = {
        headers: {"x-client-url": this.currentCompanyCatalog},
        params: {
          "page":this.currentPage,
          "categoryId":this.selectedCategory,
          "min":this.from,
          "max":this.to,
          "searchText":this.searchText,
          "sortBy":this.sortBy,
        },
      }
       await this.axios.get(this.url('getClientProducts'),options)
         .then((response) => {
           this.catalog = response.data.objects;
           this.numberOfPagesArray = Array.from({length: response.data.pagesCount || 0}, (_, i) => i + 1)  ;
           this.spinner = false;
         })
    },
    async  getProductsForPrice(){
      //yes its a copy of a function
      let that = this;
      const options = {
        headers: {"x-client-url": this.currentCompanyCatalog},
        params: {
          "page":this.currentPage,
          "categoryId":this.selectedCategory,
          "min":this.from,
          "max":this.to,
        },
      }
      await this.axios.get(this.url('getClientProducts'),options)
          .then((response) => {
            this.catalog = response.data.objects;
            this.numberOfPagesArray = Array.from({length: response.data.pagesCount || 0}, (_, i) => i + 1)  ;
            this.spinner = false;

            this.from = response.data.minPrice;
            this.to = response.data.maxPrice;

            let instance = $("#range-slider").data("ionRangeSlider");
            instance.update({
              from: that.from,
              to:that.to,
              max:that.to,
            });
            let instance2 = $("#range-slider2").data("ionRangeSlider");
            instance2.update({
              from: that.from,
              to:that.to,
              max:that.to,
            });

          })
    },

    async getCategories() {
      const options = {
        headers: {"x-client-url": this.currentCompanyCatalog}
      }
      await this.axios.get(this.url('getClientCategories')+'?type=product',options)
          .then((res) => {
            this.listCategory = res.data.objects;
            this.listCategory.unshift({_id: 'all', name: 'All'})
          })
    },
    getByPrice: _.debounce(function() {
      this.getProducts();
    }, 500),
  },
  watch:{
    searchText:{
      handler: function (text) {
        if(text.length===0){
          this.searchStatus = false;
          this.getProducts();
        }
      },
    },

    from: {
      handler: function () {
        this.getByPrice();
      },
    },
    to: {
      handler: function () {
        this.getByPrice();
      },
    },
  },
  mounted(){
    this.rangeSlider()
    this.getRangeValues()
    this.getCategories()
    this.getProducts()
    this.getProductsForPrice()
}

}
</script>

<style scoped>
.show {
  position: absolute !important;
  bottom: 10px;
  width: 93% !important;
  right:3.5%;

}
.mobile-btns{
  display:none;
}
@-webkit-keyframes fadeIn {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);}
}

.backdrop-filter.active{
  display: block;
}
.catalogSearchClearIcon{
  position: absolute;
  top: 12px;
  right: 28px;
}

.catalogSort{
  width: 100%;
  height: 30px;
  outline: none;
  border-style: none;
  padding: 0 16px;
  background: url("../../../assets/img/select_arrow.svg") no-repeat;
  -moz-appearance:none; /* Firefox */
  -webkit-appearance:none; /* Safari and Chrome */
  appearance:none;
  background-position-x: calc(100% - 15px);
  background-position-y: 7px;
  color: #606877;
  font-size: 14px;
}
.catalogSort:focus-visible{
  border-style: none;
  outline: none;
}
.sortDropDown div{
  cursor: pointer;
}
.sortDropDown div:hover{
  color:#616cf5!important;
}

.sortDropDown{
  position: absolute;
  width: 100%;
  background: #F4F4F4;
  border-radius: 5px;
  top: 35px;
  right: 0;
  padding: 10px;
}

.selectWrapper{
  padding: 0 16px;
  color: #606877;
  font-size: 14px;
  height: 30px;
  border-radius: 20px;
  background: #F4F4F4;
  justify-content: center;
}

.catalogSearchInputIcon{
  position: absolute;
  top: 12px;
  left: 15px;
}
.catalogSearchInput{
  width: calc(100% - 13px);
  font-size: 18px;
  line-height: 24px;
  color: black;
  padding: 10px 120px 10px 40px;
  border-radius: 50px;
  border:1px solid #D3D3D3;
  margin-bottom: 5px;
}

.paginationItem{
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

.activePage{
  background-color: #616cf5;
  color: #fff;
  font-weight: bold;
}

.backdrop-filter{
  display: none;
  width: 100%;
  height:100%;
  position: fixed;
  top:0;
  left: 0;
  background: #000;
  opacity:0.5;
  z-index:1040;
}
.showCategory.active, .showFilter.active{
  display:block;
  -webkit-animation: fadeIn 0.3s;
  animation-fill-mode:forwards;
}
.showCategory,.showFilter{
  position: fixed;
  width: 100vw;
  height: 100%;
  z-index:9999;
  top: 0;
  right:0;
  display: none;
  transition: .4s;
  background:#fff;
  padding:0 20px;

}

.filter-category{
  font-size: 20px;
  color:#222;
  font-weight: normal;
}
.catalog{
  color:#222222;
}
.category-key{
  color:#858585;
}
.category-value{
  color:#616cf5;
}
.save{
  width: 100%;
  margin-bottom: 15px;
  height: 45px;
  position: relative;
}
.list-icon{
  position: absolute;
  left:10px;
  background-size: contain;
}
.new-product, .app-buttons-item{
  height: 40px;
  width:100%;
}
.app-buttons-item{
  justify-content: center;
  color:#616cf5;
  position: relative;
}
.app-buttons-item img{
  position: absolute;
  left: 10px;
}
.catalog-left{
  padding-right:5px;
  /*position: sticky;*/
  top:40px;
  z-index: 1000;
  transition:0.3s;


}
.product-title{
  font-size: 20px;
  font-weight: bold;
}
.product-title img{
  margin-right: 10px;
}

.client-input{
  border: 1px solid #D3D3D3;
  border-radius: 3px;
  height: 30px;
  padding: 0 10px;
}
.label-client{
  color: #8C94A5;
}

.catalog-list{
  line-height: 1;
  box-sizing: border-box;
  list-style-type: none;
  border:none;
  height: 35px;
  color: #8C94A5;
  border-radius: 111.068px;
  padding:0 20px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
}
.catalog-list:hover{
  background: #EBEEFF;
  color: #616CF5;
  cursor:pointer;
}
.catalog-list.active{
  background: #EBEEFF;
  border-radius: 111.068px;
  color: #616CF5;
}
@media(max-width:481px){
  .catalog-left{
    display:none;
  }
  .mobile-btns{
    display: block;
  }

}


</style>