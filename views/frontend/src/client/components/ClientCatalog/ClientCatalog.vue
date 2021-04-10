<template>
<div class="row catalog">
  <div class="col-lg-3  ">
    <div class="catalog-left">
    <h3 class="product-title"><img src="../../../assets/clients/Icon.svg">Products</h3>

    <h3 class="price">Price:</h3>

    <div class="d-flex mb-5">
      <div style="width:40%" class="mr-3">
        <label class="label-client">From</label>
        <input class="client-input" style="width:100%">
      </div>
      <div style="width:40%">
        <label class="label-client">To</label>
        <input class="client-input" style="width:100%">
      </div>
    </div>
    <input type="text" id="range-slider" name="example_name" value="" />
    <div class="line"></div>

    <h3 class="price">Categories:</h3>
    <ul class="list-group">

      <li class="catalog-list active" @click="filtered=''">All</li>
      <li class="catalog-list"  @click="filtered='shoes'">Shoes</li>
      <li class="catalog-list"  @click="filtered='clothes'">Clothes</li>
    </ul>
    </div>
  </div>
  <div class="col-lg-9">
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
    catalog:[
      {id:1, name:'Shoes', code:'1617W11F', price:'15 $',category:'shoes'},
      {id:2, name:'Shoes', code:'1617W11F', price:'15 $',category:'shoes'},
      {id:3, name:'Shoes', code:'1617W11F', price:'15 $',category:'shoes'},
      {id:4, name:'Shoes', code:'1617W11F', price:'15 $',category:'shoes'},
      {id:10, name:'Shoes', code:'1617W11F', price:'15 $',category:'shoes'},
      {id:5, name:'Clothes', code:'1617W11F', price:'15 $',category:'clothes'},
      {id:6, name:'Clothes', code:'1617W11F', price:'15 $',category:'clothes'},
      {id:7, name:'Clothes', code:'1617W11F', price:'15 $',category:'clothes'},
      {id:8, name:'Clothes', code:'1617W11F', price:'15 $',category:'clothes'},
      {id:9, name:'Clothes', code:'1617W11F', price:'15 $',category:'clothes'},
    ],
    filtered: ''
  }
  },
  computed:{
    filteredList: function(){
      return  this.catalog
          .filter(product => {
            return !product.category.indexOf(this.filtered)
          })
    },
  },
  methods:{

    rangeSlider(){
      $("#range-slider").ionRangeSlider({
        type: "double",
        min: 0,
        max: 1000,
        from: 10,
        to: 800,
        prefix: "$"
      });
    },
    addClassToScroll(){
      $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        //>=, not <=
        if (scroll >= 500) {
          //clearHeader, not clearheader - caps H
          $(".catalog-list").addClass("bektemir");
        }
      })
    }
  },
  mounted(){
    this.rangeSlider()
    this.addClassToScroll()
  }

}
</script>

<style scoped>

.catalog{
  color:#222222;
}
.catalog-list.bektemir{
  color:red;
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