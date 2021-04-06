<template>
<div class="row catalog">
  <div class="col-lg-3 catalog-left">
    <h3 class="product-title"><img src="../../../assets/clients/Icon.svg">Products</h3>

    <h3 class="price">Price:</h3>

    <div class="d-flex">
      <div style="width:40%" class="mr-3">
        <label class="label-client">From</label>
        <input class="client-input" style="width:100%">
      </div>
      <div style="width:40%">
        <label class="label-client">To</label>
        <input class="client-input" style="width:100%">
      </div>
    </div>

    <div class="line"></div>

    <h3 class="price">Categories:</h3>
    <ul class="list-group">

      <li class="catalog-list active">All</li>
      <li class="catalog-list">Shoes</li>
      <li class="catalog-list">Clothes</li>
    </ul>

  </div>
  <div class="col-lg-9">
      <ClientCatalogItem v-bind:catalog="catalog"/>
  </div>
</div>

</template>

<script>
import ClientCatalogItem from "@/client/components/ClientCatalog/ClientCatalogItem";
export default {
name: "Catalog",
  components:{
    ClientCatalogItem
  },
  data(){
  return{
    catalog:[
      {id:1, name:'Polo ralph lauren', code:'1617W11F', price:'15 $'},
      {id:2, name:'Polo ralph lauren', code:'1617W11F', price:'15 $'},
      {id:3, name:'Polo ralph lauren', code:'1617W11F', price:'15 $'},
      {id:4, name:'Polo ralph lauren', code:'1617W11F', price:'15 $'},
      {id:5, name:'Polo ralph lauren', code:'1617W11F', price:'15 $'},
      {id:6, name:'Polo ralph lauren', code:'1617W11F', price:'15 $'},
      {id:7, name:'Polo ralph lauren', code:'1617W11F', price:'15 $'},
      {id:8, name:'Polo ralph lauren', code:'1617W11F', price:'15 $'},
    ]
  }
  }

}
</script>

<style scoped>

.catalog{
  color:#222222;
}

.catalog-left{
  padding-right:30px;
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