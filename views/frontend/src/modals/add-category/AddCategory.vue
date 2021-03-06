<template>

<div class="parent-modal">
  <div class="modal myModal fade" id="add-category" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content category-content">
        <div class="modal-header align-items-center">
          <h3 class="modal-title">Add Category</h3>
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
          </button>
        </div>
        <div class="modal-body myModal-body">
          <form class="modal-form">
            <label>Name</label>
            <input class="form-input cashback-input mb-3" placeholder="Enter a name">

            <div>
              <label>Select category</label>
              <select class="form-control long-form-control modal-select mb-5">
                <option>Select Category</option>
                <option>Select Category</option>
                <option>Select Category</option>
                <option>Select Category</option>
              </select>
            </div>

            <div class="d-flex justify-content-end">
              <button class="save">Save</button>
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
name: "AddCategory"
}
</script>

<style scoped>

.category-content{
  border:0;
  border-radius: 0;
  width: 562px;
  height: 355px;
  margin-top: 50%;
}
.parent-modal{
  display: flex;
}
</style>