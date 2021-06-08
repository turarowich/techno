<template>

  <div class="parent-modal">
    <div class="modal myModal fade" id="edit-client-category" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content category-content">
          <div class="modal-header category-header align-items-center">
            <h3 class="modal-title">Edit category</h3>
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
            </button>
          </div>
          <div class="modal-body category-body">
            <form @submit.prevent="onSubmit" class="modal-form">
              <label>Name</label>
              <input class="form-input cashback-input mb-3" v-model="currentCategory.name" name="name" placeholder="Enter a name">

              <div>
                <label>Select category</label>
                <select class="form-control long-form-control modal-select mb-5">
                  <option value="">Without category</option>
                  <option v-for="cat in listCategory" :key="cat._id"  :value="cat._id">{{cat.name}}</option>
                </select>
              </div>

              <div class="d-flex justify-content-end">
                <button @click.prevent="onSubmit(currentCategory._id)" class="save">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import $ from 'jquery'
export default {
  name: "AddCategory",
 props:['listCategory', 'getCategories','select_category'],
  data(){
    return{
      currentCategory:''
    }
  },
  methods:{
    onSubmit(id){
      this.axios.put(this.url('updateCategory',id),{
        name: this.currentCategory.name,
        type:'client'
      })
      .then(()=>{
        this.getCategories()
        $('#edit-client-category').modal("hide")
        this.$informationAlert('Category changed')
      })


    },
  },
  watch:{
    select_category(newCat){
      this.currentCategory = Object.assign({}, newCat)
    }
  },
}
</script>

<style scoped>

.category-content{
  border:0;
  border-radius: 0;
  width: 562px;
}
.parent-modal{
  display: flex;
}
.category-body{
  padding: 0 50px;
  padding-bottom: 34px;
}
.category-body input{
  width: 100%;
}
.category-header{
  padding:34px 50px;
}
</style>