<template>
<div class="row catalog">
  <div class="col-lg-3 col-md-4">
    <div class="catalog-left">
    <h3 class="product-title"><img src="../../../assets/clients/Icon.svg">Products</h3>

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
  </div>
  <div class="col-lg-9 col-md-8">
    <ClientCatalogItem v-bind:catalog="filteredList"/>
  </div>
</div>

</template>

<script>
import $ from 'jquery';
import ClientCatalogItem from "@/client/components/ClientCatalog/ClientCatalogItem";

export default {
name: "Catalog",
  components:{
    ClientCatalogItem
  },
  data(){
  return{
    catalog:[],
    listCategory:[{_id:'', name:''}],
    filtered: 'all',
    from:0,
    to:0,

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
    },
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    }
  },
  methods: {
    getRangeValues() {
      const slider = $("#range-slider").data("ionRangeSlider");
      this.from = slider.result.from;
      this.to = slider.result.to;
    },
    rangeSlider() {
      $("#range-slider").ionRangeSlider({
        type: "double",
        min: 0,
        max: 1000,
        from: 0,
        to: 800,
        prefix: "$",
        onChange: (data) => {
          this.from = data.from;
          this.to = data.to
        }
      });
    },
    async  getProducts(){
      const options = {
        headers: {"x-client-url": this.currentCompanyCatalog}
      }
      await this.axios.get(this.url('getClientProducts'),options)
          .then((response) => {
            console.log(response,"rrrrrrrrrrrrrrrrrrrrrrr");
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
  mounted(){
    this.rangeSlider()
    this.getRangeValues()
    this.getCategories()
    this.getProducts()

}

}
</script>

<style scoped>

.catalog{
  color:#222222;
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



</style>