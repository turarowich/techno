<template>
<div class="row catalog">
  <div id="categories" class="pt-3 col-lg-3 col-md-4">
    <div class="catalog-left">
    <h3  class="product-title"><img src="../../../assets/clients/Icon.svg">Products</h3>

    <h3 class="price">Price:</h3>

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
<!--        <select class="new-product form-control long-form-control  form-control-lg" aria-label=".form-select-lg example">-->
<!--          <option>Jeans</option>-->
<!--          <option>Shoes</option>-->
<!--          <option>Clothes</option>-->
<!--        </select>-->
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
      <div class="paginationItem" v-if="currentPage>3"  @click="currentPage=1" style="cursor: pointer;">1</div>
      <div v-if="currentPage>3">
        ...
      </div>
      <div v-bind:class="{ activePage: currentPage===page2 }" class="paginationItem" v-for="page2 in numberOfPagesArray.filter(num => num < currentPage+3 && num > currentPage-3)" :key="page2" @click="setPage(page2)">
        {{page2}}
      </div>
      <div v-if="currentPage<numberOfPagesArray.length-2">
        ...
      </div>
      <div class="paginationItem" v-if="currentPage<numberOfPagesArray.length-2" @click="currentPage=numberOfPagesArray.slice(-1)[0]" style="cursor: pointer;">{{numberOfPagesArray.slice(-1)[0]}}</div>
      <div v-if="currentPage<numberOfPagesArray.length-2" @click="currentPage++" style="cursor: pointer;">
        <img src="../../../assets/icons/side-arrow.svg">
      </div>
    </div>
  </div>





<!--  <div class="parent-modal">-->
<!--    <div class="modal myModal fade" id="categoriess" tabindex="-1" role="dialog" aria-labelledby="add-points" aria-hidden="true">-->
<!--      <div class="modal-dialog" role="document">-->
<!--        <div class="modal-content category-content">-->
<!--          <div class="modal-header category-header align-items-center">-->
<!--            <h3 class="modal-title">Edit Category</h3>-->
<!--            <button type="button" data-dismiss="modal" aria-label="Close" class="close">-->
<!--              <span aria-hidden="true">-->
<!--                <img src="../../../assets/icons/xBlack.svg" alt="">-->
<!--              </span>-->
<!--            </button>-->
<!--          </div>-->
<!--          <div class="modal-body category-body">-->
<!--            <form class="modal-form">-->
<!--              <label>Name</label>-->
<!--              <input  class="form-input cashback-input mb-3"  placeholder="Enter a name">-->

<!--              <textarea class="general-area"></textarea>-->
<!--              <div class="d-flex justify-content-end">-->
<!--                <button  class="save">Save</button>-->
<!--              </div>-->
<!--            </form>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->

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
         })
    },
    async  getProductsForPrice(){
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
    from: {
      handler: function (num) {
        console.log(num,"FROM");
        this.getByPrice();
      },
    },
    to: {
      handler: function (num) {
        console.log(num,"TO");
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
  width:50%;
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
  position: sticky;
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