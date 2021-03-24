<template>


  <div class="modal fade right "  id="edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: 580px;" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header align-items-center">
          <h3 class="modal-title">Edit</h3>
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../../assets/icons/x.svg" alt="">
              </span>
          </button>
        </div>
        <div class="myModal-body">
          <form  @submit.prevent="onSubmit"  class="modal-form">
            <label>Name</label>
            <input  v-model="currentData.name"  class="form-input cashback-input mb-3" placeholder="Enter a name">

            <div>
              <label>Select category</label>
              <select v-model="currentData.category" class="form-control modal-select long-form-control mb-3">
                <option disabled>Select a category</option>
                <option v-for="category in listCategory" :value="category.name.toLowerCase()" :key="category.id">{{category.name}}</option>
              </select>
            </div>

            <label>Quantity</label>
            <input  v-model="currentData.quantity" class="form-input cashback-input mb-3" placeholder="10">

            <label>Description</label>
            <textarea class="general-area mb-3" style="height:160px"></textarea>


            <div class="d-flex ">
              <div style=" width:50%; margin-right:8px;">
                <label>Price</label>
                <input  v-model="currentData.price" class="form-input cashback-input mb-4" placeholder="Price">
              </div>
              <div class="promotion-disc" style="margin-right:8px;">
                <label>Promotional prices</label>
                <input class="form-input cashback-input mb-4" placeholder="Price">
              </div>
              <div style="width:50%;">
                <label>Article number</label>
                <input v-model="currentData.article" class="form-input cashback-input mb-4" placeholder="Article number">
              </div>
            </div>

            <div class="modal-img ">
              <label>Photos</label>
              <p class="cashback-description">You can upload 4 more JPG or PNG photos, the minimum resolution is 400*400px, the size is not more than 3 MB.</p>
              <img src="../../../assets/img/modal-img.svg">
            </div>
            <div class="modal-btn d-flex">
              <button class="save">Save</button>
              <button class="cancel">Cancel</button>
           </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Edit",
  props: ['edit_catalog', 'listCategory'],

  data(){
    return {
      currentData: '',


    }
  },
  methods: {

    onSubmit() {
      this.$emit('editedData', this.currentData);



    },


  },
  watch:{
    edit_catalog(newCat){
      this.currentData = Object.assign({}, newCat)
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