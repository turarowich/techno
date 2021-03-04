<template>
  <div  v-for="catalog in catalogList" class="table-item d-flex align-items-center" :key="catalog.id">
    <div  style="width: 5%;"><label class="custom-checkbox"><input  type="checkbox" :value="catalog.id" v-model="catalog.checked"><span class="checkmark"></span></label></div>
    <div  class="d-flex align-items-center"  style="width: 42%;">
      <div class="table-img">
        <img src="../../assets/img/sneak.webp">
      </div>
      {{catalog.name}}
    </div>
    <div  style="width: 27%;">{{catalog.article}}</div>
    <div  style="width: 12%;">{{catalog.quantity}}</div>
    <div  style="width: 10%;">{{catalog.price}}</div>
    <div  style="width:5%;" class="see-catalog"><img @click="$emit('hideCatalog',catalog.id)" class="see-catalog" src="../../assets/icons/see.svg"><img class="nonsee-catalog" src="../../assets/icons/nonsee.svg"></div>
    <div  style="width:5%;">
      <div class="dropleft dropMenu">
        <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img  src="../../assets/icons/three-dots.svg"
                class="three-dots">
        </div>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
          <ul class="list-group " >
            <li class="list-group-item">Done</li>
            <li class="list-group-item">Edit</li>
            <li class="list-group-item">Cancel</li>
            <li class="list-group-item" v-on:click="$emit('deleteCatalog' ,catalog.id)">Delete</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatalogItem",
  props:{
    catalogList:{
      type:Array,

    }
  },
  methods:{
    hideCatalog(){

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

</style>