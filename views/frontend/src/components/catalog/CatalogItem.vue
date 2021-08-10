<template>

  <div>
    <div v-if="catalogList.length === 0" class="d-flex justify-content-center align-items-center">
          <div class="no-product">
            <img src="../../assets/img/emp-product.svg">
            <p>There are no products in this category yet</p>
            <button class="save add-product" @click="addProduct">Add product</button>
          </div>
    </div>

    <div v-else>
      <div  v-for="catalog in  catalogList" :class="{isVisible:!catalog.active}" class="catalog-item table-item d-flex align-items-center" :key="catalog._id">
        <div  style="width: 5%;"><label class="custom-checkbox"><input type="checkbox" v-model="catalog.selected" @change="$emit('checkSelection')">
          <span class="checkmark"></span></label>
        </div>

        <div  class="d-flex align-items-center"  style="width: 36%;">
          <div :class="{imgVisible: !catalog.active}" class="table-img">
            <img v-if="catalog.img"  :src="imgSrc+'/'+catalog.img">
            <img v-else  src="../../assets/icons/no-catalog.svg">

          </div>
          <div>{{catalog.name}}
            <div v-if="!catalog.active" class="d-flex align-items-center" style="color:#8C94A5;font-size:12px;"><img style="width:12px; height:12px; margin-right:5px" src="../../assets/icons/isVisible.svg">Product is hidden</div>
          </div>
        </div>
        <div  style="width: 24%;"><div class="long-text">{{catalog.description}}</div></div>
        <div  style="width: 13%;">{{catalog.quantity > 0?catalog.quantity:'-'}}</div>
        <div  style="width: 13%;">{{catalog.price}}</div>
        <div  style="width:8%;" class="see-catalog"><img @click="hideProduct(catalog,isFalse)"  v-if="catalog.active" class="see-catalog" src="../../assets/icons/see.svg"><img v-else @click="hideProduct(catalog ,isTrue)"  class="nonsee-catalog" src="../../assets/icons/nonsee.svg"></div>
        <div  style="width:8%;">
          <div v-if="check()" class="dropleft dropMenu">

            <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img  src="../../assets/icons/three-dots.svg"
                    class="three-dots">
            </div>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
              <ul class="list-group " >
                <li class="list-group-item"  data-toggle="modal" data-target="#edit-product" @click="$emit('selectProduct', catalog._id)">Edit</li>
                <li class="list-group-item" v-on:click="$emit('deleteProduct' ,catalog._id)">Delete</li>
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
  props:['catalogList', 'displayList','getProducts'],
  data(){
    return {
      newCheck:false,
      imgSrc:'',
      isTrue:true,
      isFalse:false,
    }
  },

  methods:{
    hideProduct(product,active){

      this.axios.put(this.url('updateProduct',product._id), {active:active})
          .then(()=>{
            product.active = active
          })

    },
    check(access="catalog", parametr="active", parametr2="canEdit"){
        return this.checkAccess(access, parametr, parametr2)
    },
    addProduct(){
      $('#add-product').click()
    },
    checkAll(item) {
      return  this.$refs[`select${item._id}`].checked === true
    },
    checkMainSelect() {
      if(this.catalogList.every(this.checkAll)){
        this.newCheck = true;
        this.$emit('checkAll', this.newCheck)
      }
      else{
        this.newCheck = false;
        this.$emit('unCheckAll', this.newCheck)
      }

    }

  },
  mounted(){
    this.imgSrc = this.$server
  }
}
</script>

<style scoped>
.see-catalog{
  cursor:pointer;
}
.imgVisible{
  opacity: 0.5;
}
.no-img-product{
  background: #F4F4F4;
  border-radius:50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.no-img-product img{
  width:30px;
  height:30px;
  object-fit: contain;
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
.long-text{
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}
.isVisible{
  background: #F8F9FF;
  color:#8C94A5;

}

</style>


