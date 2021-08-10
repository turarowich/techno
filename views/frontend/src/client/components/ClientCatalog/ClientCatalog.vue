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
    <input type="text" id="range-slider" name="example_name" value="" />
    <div class="line"></div>
      <h3 class="price">Categories:</h3>
    <ul class="list-group">
      <li v-for="category in listCategory" :key="category._id" :class="{active: category._id === filtered}" class="catalog-list" @click="filtered=category._id">{{category.name}}</li>
    </ul>
    </div>
    <div class="mobile-btns">
      <button class="save" @click="showFilterCategory('category')"><img class="list-icon" src="../../../assets/icons/list.svg"><span>Select categories</span></button>
      <div class="showCategory" >
        <div class="mobile-header d-flex justify-content-between align-items-center" >
          <h3 class="filter-category">Categories</h3>
          <img @click="removeFilterCategory('category')" class="close-nav" src="../../../assets/icons/xBlack.svg">
        </div>
        <ul class="list-group">
          <li v-for="category in listCategory" :key="category._id" :class="{active: category._id === filtered}" class="catalog-list" @click="displayFiltered(category._id)">{{category.name}}</li>
        </ul>

      </div>
      <div class="d-flex mb-3">
        <button class="app-buttons-item" @click="showFilterCategory('filter')"><img src="../../../assets/icons/filter-btn.svg"><span>Filters</span></button>
        <select class="new-product form-control long-form-control  form-control-lg" aria-label=".form-select-lg example">
          <option>Jeans</option>
          <option>Shoes</option>
          <option>Clothes</option>
        </select>
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
        <input type="text" id="range-slider2" name="example_name" value="" />
        <button class=" show save" @click="removeFilterCategory('filter')">Show</button>
      </div>
      <div class="category-key">Category: <span class="category-value">{{showCategory}}</span></div>
    </div>
  </div>
  <div id="products" class="pt-3 col-lg-9 col-md-8">

        <ClientCatalogItem v-bind:catalog="filteredList"/>

  </div>





  <div class="parent-modal">
    <div class="modal myModal fade" id="categoriess" tabindex="-1" role="dialog" aria-labelledby="add-points" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content category-content">
          <div class="modal-header category-header align-items-center">
            <h3 class="modal-title">Edit Category</h3>
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../../assets/icons/xBlack.svg" alt="">
              </span>
            </button>
          </div>
          <div class="modal-body category-body">
            <form class="modal-form">
              <label>Name</label>
              <input  class="form-input cashback-input mb-3"  placeholder="Enter a name">

              <textarea class="general-area"></textarea>
              <div class="d-flex justify-content-end">
                <button  class="save">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import $ from 'jquery';
import ClientCatalogItem from "@/client/components/ClientCatalog/ClientCatalogItem";

export default {
name: "Catalog",
  components:{
    ClientCatalogItem,
  },
  data(){
    return{
      catalog:[],
      listCategory:[{_id:'', name:'All'},{_id:'1', name:'clothes'},{_id:'2', name:'shoes'}],
      filtered: 'all',
      from:0,
      to:0,
      showCategory:'All',
    }
  },
  computed:{
    filteredList: function(){
      return  this.catalog
        .filter(product => {
          if(this.filtered!=='all'){
            return product.category===this.filtered;
          }else{
            return product;
          }
        })
        .filter((product)=>{
          return product.price >= this.from && product.price <= this.to;
        })
        .filter((product)=>{
          return product.quantity > 0;
        })
        .filter((product)=>{
          return product.active === true;
        })
    },
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
    minPrice(){
      let today = new Date();
      let nums = [];
      this.catalog.map(function (item){
        if(item.promoStart<=today && item.promoEnd>=today){
          nums.push(item.promoPrice);
        }else{
          nums.push(item.price);
        }
      });
      return nums.length>0 ? Math.min(...nums) : 0;
    },
    maxPrice(){
      let today = new Date();
      let nums = [];
      this.catalog.map(function (item){
        if(item.promoStart<=today && item.promoEnd>=today){
          nums.push(item.promoPrice);
        }else{
          nums.push(item.price);
        }
      });
      return Math.max(...nums);
    },
  },
  methods: {
    displayFiltered(id){
        this.filtered = id
        this.listCategory.map(i=>{
          if(i._id == id){
            this.showCategory = i.name
          }
        })
        $('.showCategory').removeClass('active')
      $('body').css({'overflow':'auto'})
      },
    showFilterCategory(item){
      if(item==='category'){
        $('.showCategory').addClass('active')
      }
      else{
        $('.showFilter').addClass('active')
      }
      $('body').css({'overflow':'hidden'})




    },
    removeFilterCategory(item){
      if(item === 'category'){
        $('.showCategory').removeClass('active')

      }
      else{
        $('.showFilter').removeClass('active')
      }
      $('body').css({'overflow':'auto'})


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
      }

       await this.axios.get(this.url('getClientProducts'),options)
         .then((response) => {
           this.catalog = response.data.objects;
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
  },
  watch:{
    catalog: {
      handler: function (list) {
        let that = this;
        let instance = $("#range-slider").data("ionRangeSlider");
        instance.update({
          from: that.minPrice,
          to:that.maxPrice,
          max:that.maxPrice,
        });
        let instance2 = $("#range-slider2").data("ionRangeSlider");
        instance2.update({
          from: that.minPrice,
          to:that.maxPrice,
          max:that.maxPrice,
        });
        that.from = that.minPrice;
        that.to = that.maxPrice;
        console.log(list,"NEEEEEEEEEEEEEEEEEEEEEE");
      },
    },
  },
  mounted(){
    this.rangeSlider()
    this.getRangeValues()
    this.getCategories()
    this.getProducts()
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


.showCategory.active,.showFilter.active{
  display: block;
  -webkit-animation: fadeIn 0.3s;
  animation-fill-mode:forwards;
}
.showCategory, .showFilter{
  position: fixed;
  width: 100vw;
  height: 100%;
  z-index:9999;
  top: 0;
  left:0;
  display: none;
  overflow-y: scroll;
  background:#fff;
  padding:0 20px;
  transition:.3s;
  -webkit-animation: fadeIn 0.3s;
  animation-fill-mode:forwards;
  animation-direction: reverse;

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
  padding-right:30px;
  position: sticky;
  top:40px;
  z-index: 1000;


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
  list-style-type: none;
  border:none;
  height: 35px;
  color: #8C94A5;
  border-radius: 111.068px;
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