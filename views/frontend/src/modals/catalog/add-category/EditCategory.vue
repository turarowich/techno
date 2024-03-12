<template>

  <div class="parent-modal">
    <div class="modal myModal fade" id="edit-category" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
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
              <input v-model="currentCategory.name" class="form-input cashback-input mb-3" placeholder="Enter a name">
              <div>
                <label>Move to the Category</label>
                <select v-model="currentCategory.parent" class="form-control long-form-control modal-select mb-5">
                  <option value="">Without category</option>
                  <option v-for="category in listCategory" :value="category._id" :key="category._id">{{ category.name }}
                  </option>
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
import $ from "jquery";

export default {
  name: "EditCategory",
  props: ['select_category', 'getCategories', 'listCategory'],
  data() {
    return {
      currentCategory: {
        name: '',
        parent: '',
        type: 'product'
      }
    };
  },
  methods: {
    onSubmit(id) {
      this.axios.put(this.url('updateCategory', id), this.currentCategory)
        .then(() => {
          this.getCategories()
          this.$informationAlert('Category changed')
          $('#edit-category').modal("hide")
        })
    }
  },
  watch: {
    select_category(newCat) {
      this.currentCategory = Object.assign({}, newCat)
    }
  },
}
</script>

<style scoped>
.cashback-input {
  width: 100%;
}
</style>