<template>
  <div class="parent-modal">
  <div class="modal myModal fade" id="add-category" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
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
            <input class="form-input cashback-input mb-3" v-model="new_category.name" name="name" placeholder="Enter a name">

            <div>
              <label>Select category</label>
              <select v-model="new_category.parent" class="form-control long-form-control modal-select mb-5">
                <option value="">Without category</option>
                <option v-for="cat in listCategory" :key="cat.id"  :value="cat._id">{{cat.name}}</option>
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

import $ from 'jquery'
export default {
name: "AddCategory",
  props:{
    listCategory:{
      type:Array,
      required:true
    },
    getCategories:{
      type:Function,
    }
  },
  data(){
    return{
      new_category: {
        name: '',
        type: 'product',
        parent: ''
      }
    }
  },
  methods:{
    onSubmit(){
      const data = new FormData();
      data.append('name', this.new_category.name)
      data.append('type', this.new_category.type)
      data.append('parent', this.new_category.parent)

      this.axios.post(this.url('addCategory'),data)
            .then(()=>{
              this.$successAlert('Category has been added')
              this.getCategories()
            })
            .catch((error)=>{
              console.log("Error"+error)
            })

      $('#add-category').modal("hide")
      this.new_category.name = ''
      },
  }
}
</script>

<style scoped>
.modal-select{
  font-size: 14px;
}
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