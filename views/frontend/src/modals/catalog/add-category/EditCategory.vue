<template>

  <div class="parent-modal">
    <div class="modal myModal fade" id="edit-category" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content category-content">
          <div class="modal-header category-header align-items-center">
            <h3 class="modal-title">Edit Category</h3>
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../../assets/icons/x.svg" alt="">
              </span>
            </button>
          </div>
          <div class="modal-body category-body">
            <form @submit.prevent="onSubmit" class="modal-form">
              <label>Name</label><br>
              <input v-model="currentCategory.name" class="form-input cashback-input mb-3"  placeholder="Enter a name">
              <div>
                <label>Move to the Category</label>
                <select class="form-control long-form-control modal-select mb-5">
                  <option v-for="category in listCategory" :key="category._id">{{category._id}}</option>
                </select>
              </div>
              <div class="d-flex justify-content-end">
                <button  class="save">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditCategory",
  props:['edit_category', 'listCategory'],
  data(){
    return{
      currentCategory: ''

    }
  },
  methods:{
    onSubmit(){
          console.log(this.currentCategory)
    }
  },
  watch:{
    edit_category(newCat){
      this.currentCategory = Object.assign({}, newCat)
    }
  },
}
</script>

<style scoped>
.cashback-input{
  width: 100%;
}


</style>