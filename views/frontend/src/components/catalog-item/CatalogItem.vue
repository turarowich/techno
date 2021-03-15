<template>
  <div>
    <div v-if="catalogList.length === 0" class="d-flex justify-content-center align-items-center">
          <div class="no-product">
            <img src="../../assets/img/noCatalog2.png">
            <p>There are no products in this category yet</p>
            <button class="save add-product" @click="addProduct">Add</button>
          </div>
    </div>

    <div v-else>
      <div   v-for="catalog in catalogList" class="catalog-item table-item d-flex align-items-center" :key="catalog.id">
        <div  style="width: 5%;"><label class="custom-checkbox"><input type="checkbox" :value="catalog" v-model="catalog.checked">
          <span class="checkmark"></span></label>
        </div>
        <div  class="d-flex align-items-center"  style="width: 42%;">
          <div class="table-img">
            <img src="../../assets/img/sneak.webp">
          </div>
          {{catalog.name}}
        </div>
        <div  style="width: 24%;">{{catalog.article}}</div>
        <div  style="width: 9%;">{{catalog.quantity}}</div>
        <div  style="width: 10%;">{{catalog.price}}</div>
        <div  style="width:8%;" class="see-catalog"><img @click="$emit('hideCatalog',catalog.id)" class="see-catalog" src="../../assets/icons/see.svg"><img class="nonsee-catalog" src="../../assets/icons/nonsee.svg"></div>
        <div  style="width:8%;">
          <div class="dropleft dropMenu">
            <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img  src="../../assets/icons/three-dots.svg"
                    class="three-dots">
            </div>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
              <ul class="list-group " >
                <li class="list-group-item">Done</li>
                <li class="list-group-item" data-toggle="modal" data-target="#edit" @click="$emit('editCatalog',catalog.id)">Edit</li>
                <li class="list-group-item">Cancel</li>
                <li class="list-group-item" v-on:click="$emit('deleteCatalog' ,catalog.id)">Delete</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
import $ from 'jquery';
export default {
  name: "CatalogItem",
  props:['catalogList'],
  methods:{
    addProduct(){
      $('#add-product').click()
    }
  }
}
</script>

<style scoped>
.see-catalog{
  cursor:pointer;
}
.nonsee-catalog{
  display: none;
}
.no-product{
  width: 300px;

  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
}
.no-product p{
  color: #8C94A5;
  padding:10px 0;
}

</style>