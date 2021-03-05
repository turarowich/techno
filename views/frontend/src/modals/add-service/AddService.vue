<template>


  <div class="modal fade right" id="add-service" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: 587px;" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header align-items-center">
          <h3 class="modal-title">Add Service</h3>
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
          </button>
        </div>
        <div class=" myModal-body">
          <form class="modal-form">
            <label>Name</label>
            <input class="form-input cashback-input mb-3" placeholder="Enter a name">

            <label>Without category</label>
            <select class="form-control long-form-control modal-select mb-3">
                <option>Without category</option>
                <option>Without category</option>
                <option>Without category</option>
                <option>Without category</option>
            </select>

            <label>Description</label>
            <textarea class="general-area mb-3" style="height:160px"></textarea>

            <div class="d-flex mb-3 ">
              <label class="custom-checkbox mr-2"><input type="checkbox"><span class="checkmark"></span></label>
              <span>Discount</span>
            </div>

            <label>Price</label>
            <input class="form-input cashback-input mb-4" placeholder="Price">

            <div class="modal-img ">
              <label>Photos</label>
              <p class="cashback-description">You can upload 4 more JPG or PNG photos, the minimum resolution is 400*400px, the size is not more than 3 MB.</p>
              <img src="../../assets/img/modal-img.svg">
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
  name: "AddService"
}
</script>

<style scoped>


.modal.fade:not(.in).right .modal-dialog {
  -webkit-transform: translate3d(0,0,0);
  transform: translate3d(0, 0, 0);
}


.modal-form input{
  width: 100%;
  font-size: 16px;
}
.modal-form label{
  margin-bottom: 8px;
}
.modal-img{
  margin-bottom: 60px;
}
.modal-img p{
  margin-bottom: 15px;
}

</style>