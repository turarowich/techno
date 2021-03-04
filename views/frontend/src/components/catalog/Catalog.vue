<template>
  <div class="catalog">
    <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
        <button class="app-buttons-item"><span>+ Add product</span></button>
        <button class="app-buttons-item"><span>+ Add service</span></button>
        <button class="app-buttons-item"><span>+ Add category </span></button>
      </div>
      <div class="d-flex align-items-center">
        <button class="app-buttons-item"><img src="../../assets/icons/trash_empty.svg"><span>Remove</span></button>
        <button class="app-buttons-item"><img src="../../assets/icons/moveto.svg"><span>Move to</span></button>
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
          <ul class="list-group">
            <li class="catalog-list active">
              All
              <div class="dropleft dropMenu">
                <div class="dropdown-toggle" id="dropdownMenuAll" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="../../assets/icons/three-dots.svg">
                </div>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuAll">
                  <ul class="list-group " >
                    <li class="list-group-item">Edit</li>
                    <li class="list-group-item">Delete</li>

                  </ul>
                </div>
              </div>
            </li>
            <li class="catalog-list">
              Shoes
              <div class="dropleft dropMenu">
                <div class="dropdown-toggle" id="dropdownMenuShoes" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="../../assets/icons/three-dots.svg">
                </div>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuShoes">
                  <ul class="list-group " >
                    <li class="list-group-item">Edit</li>
                    <li class="list-group-item">Delete</li>

                  </ul>
                </div>
              </div>
            </li>
            <li class="catalog-list">
              Clothes
              <div class="dropleft dropMenu">
                <div class="dropdown-toggle" id="dropdownMenuClothes" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="../../assets/icons/three-dots.svg">
                </div>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuClothes">
                  <ul class="list-group " >
                    <li class="list-group-item">Edit</li>
                    <li class="list-group-item">Delete</li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="catalog-content" style="width:82%">
          <div class="d-flex main-content-header">
            <div class="table-head" style="width: 5%;"><label class="custom-checkbox"><input type="checkbox"  @click="toggleSelect" :checked="selectAll"><span class="checkmark"></span></label></div>
            <div class="table-head" style="width: 42%;">Name</div>
            <div class="table-head" style="width: 27%;">Article</div>
            <div class="table-head table-link" style="width: 12%;" @click="sortByQunatity">Quantity <img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
            <div class="table-head table-link" style="width: 10%;" @click="sortByPrice">Price<img class="total-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
            <div class="table-head" style="width: 5%;"></div>
            <div class="table-head" style="width: 5%;"></div>
          </div>
          <div class="table-content">
              <CatalogItem
                  v-bind:catalogList="filteredList"
                  v-on:deleteCatalog="deleteCatalog"
                  v-on:hideCatalog="hideCatalog"
              />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import CatalogItem from "@/components/catalog-item/CatalogItem";
import $ from "jquery";


export default {
name: "Catalog",
  data(){
    return{
      catalogList:[
        {id:1,name:"Essential Shoes",article:"B3214PO", quantity:1, price: "450 $"},
        {id:2,name:"Bektemir ",article:"B3214PO", quantity:5, price: "350 $"},
        {id:3,name:"Neymar Shoes",article:"B3214PO", quantity:4, price: "370 $"},
        {id:4,name:"ronaldo Shoes",article:"B3214PO", quantity:2, price: "220 $"},
        {id:5,name:"Messi Shoes",article:"B3214PO", quantity:3, price: "100 $"},
      ],
      search:'',
      sorting:true
    }
  },
  components:{
    CatalogItem,
  },

  computed:{
    selectAll: function() {
      return this.catalogList.every(function(user){
        return user.checked;
      });
    },
    filteredList() {
      return this.catalogList.filter(catalog => {
        return catalog.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },

  methods:{
    toggleSelect: function() {
      var select = this.selectAll;
      this.catalogList.forEach(function(user) {
        user.checked = !select;
      });
      this.selectAll = !select;
    },
    sortByQunatity() {
      this.catalogList.sort((a, b) => this.sorting? (parseInt(a.quantity) - parseInt(b.quantity)) : (parseInt(b.quantity) - parseInt(a.quantity)));
      this.sorting = !this.sorting;
      $('.date-pol').toggleClass('active')
      $('.total-pol').removeClass('active')
    },
    sortByPrice(){
      this.catalogList.sort((a, b) => this.sorting? (parseInt(a.price) - parseInt(b.price)) : (parseInt(b.price) - parseInt(a.price)));
      this.sorting = !this.sorting;
      $('.total-pol').toggleClass('active')
      $('.date-pol').removeClass('active')
    },
    deleteCatalog(id){
      this.catalogList = this.catalogList.filter(el=> el.id !== id);

    },
    activeCatalog(){
      $('.catalog-list').click(function(){
        $('.catalog-list').removeClass("active");
        $(this).addClass("active");
      });
    }
  },
  mounted(){
  this.activeCatalog()
  }
}
</script>

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
</style>