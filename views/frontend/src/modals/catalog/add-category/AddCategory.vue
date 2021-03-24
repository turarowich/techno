<template>

<div class="parent-modal">
  <div class="modal myModal fade" id="add-category" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content category-content">
        <div class="modal-header category-header align-items-center">
          <h3 class="modal-title">Add Category</h3>
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../../assets/icons/x.svg" alt="">
              </span>
          </button>
        </div>
        <div class="modal-body category-body">
          <form @submit.prevent="onSubmit" class="modal-form">
            <label>Name</label>
            <input class="form-input cashback-input mb-3" v-model="new_category.name" placeholder="Enter a name">

            <div>
              <label>Select category</label>
              <select class="form-control long-form-control modal-select mb-5">
                <option value="all">All</option>
                <option value="shoes">Shoes</option>
                <option value="clothes">Clothes</option>

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
name: "AddCategory",

  data(){
    return{
      new_category: {
        name: '',
        id: Math.random()
      }

    }
  },
  methods:{
    onSubmit(){
      const newCategory = this.new_category;
      this.$emit('addCategory', newCategory)
      this.new_category = {
        name: '',
        id: Math.random(),
      };
    }
  }
}
</script>

<style scoped>

.category-content{
  border:0;
  border-radius: 0;
  width: 562px;

  margin-top: 50%;
}
.parent-modal{
  display: flex;
}
.category-body{
  padding: 0 50px;
  padding-bottom: 34px;
}
.category-header{
  padding:34px 50px;
}
</style>