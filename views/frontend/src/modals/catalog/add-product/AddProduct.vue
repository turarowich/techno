<template>
  <div class="modal fade right "  id="add-products" tabindex="-1" role="dialog" aria-labelledby="add-products" aria-hidden="true">
      <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: 580px;" role="document" >
        <div class="modal-content myModal-content h-100">
          <div class="modal-header align-items-center">
            <h3 class="modal-title">Add Product</h3>
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../../assets/icons/x.svg" alt="">
              </span>
            </button>
          </div>
          <div class=" myModal-body">
              <form  class="modal-form add-product">
                <label>Name</label>
                <input v-model="newProduct.name" class="form-input cashback-input mb-3" name="name" placeholder="Enter a name">

                <div class="d-flex align-items-center">
                  <div style="width: 50%; margin-right:8px;">
                    <label>Quantity</label>
                    <input v-model="newProduct.quantity" class="form-input cashback-input mb-3"  name="quantity" placeholder="Enter a quantity">

                  </div>
                  <div  style="width: 50%;">
                    <label>Without category</label>
                   <select v-model="newProduct.category" class="form-control mb-3" name="category">
                     <option value=''>Without category</option>
                     <option v-for="cat in listCategory.slice(1)" v-bind:value="cat.name.toLowerCase()" v-bind:key="cat.id">{{cat.name}}</option>
                   </select>
                  </div>
                </div>

                <label>Description</label>
                <textarea class="general-area mb-3" style="height:160px"  name="description"></textarea>

                <div class="d-flex mb-3">
                  <label class="custom-checkbox"><input data-toggle="collapse" data-target="#collapse-disc" aria-expanded="true" aria-controls="collapse-disc" type="checkbox" ><span class="checkmark"></span></label>
                  <span>Discount</span>
                </div>
                <div class="collapse" id="collapse-disc">
                  <label>Promotional price</label>
                  <input v-model="newProduct.promo" class="form-input cashback-input mb-3" placeholder="Promotional price"  name="promo">
                </div>


                <div class="d-flex ">
                  <div style=" width:50%; margin-right:8px;">
                    <label>Price</label>
                    <input v-model="newProduct.price" class="form-input cashback-input mb-4" placeholder="Price"  name="price">
                  </div>
                  <div class="promotion-disc" style="margin-right:8px;">
                    <label>Promotional prices</label>
                    <input class="form-input cashback-input mb-4" placeholder="Price">
                  </div>
                  <div style="width:50%;">
                    <label>Article number</label>
                    <input v-model="newProduct.article" class="form-input cashback-input mb-4" placeholder="Article number"  name="article">
                  </div>
                </div>

                <div class="modal-img ">
                  <label>Photos</label>
                  
                  <p class="cashback-description">You can upload 4 more JPG or PNG photos, the minimum resolution is 400*400px, the size is not more than 3 MB.</p>
                  
                  <label for="imgArray">
                      <img src="../../../assets/img/modal-img.svg">
                      <input class="d-none" multiple id="imgArray" type="file" name="">
                  </label>
                </div>

                <div class="modal-btn d-flex">
                  <button @click.prevent="onSubmit" class="save">Save</button>
                  <button class="cancel">Cancel</button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import $ from "jquery";

export default {
name: "AddProduct",
  props:['listCategory'],

  data(){
    return{
      newProduct:{
        name: '',
        price: '',
        quantity: '',
        category:'',

      },
    };
  },
  methods:{
  onSubmit(){
    const new_product = this.newProduct;
    const form  = new FormData;
    $.each($("#imgArray")[0].files, function(i, file) {
        form.append('imgArray'+i, file);
    });
    form.append('name', new_product.name)
    form.append('price', new_product.price)
    form.append('quantity', new_product.quantity)
    this.axios.post(this.url('addProduct'), form)
        .then((response) => {
            console.log("success", response)
        }).catch((error) => {
            console.log("fail", error)
        })
    $('#add-products').modal("hide")
    }
  },

}
</script>

<style scoped>

.modal.fade:not(.in).right .modal-dialog {
  -webkit-transform: translate3d(0,0,0);
  transform: translate3d(0, 0, 0);
}


.promotion-disc{
  display: none;

}
</style>