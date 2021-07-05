<template>
  <div class="modal fade right "  id="individual-push" tabindex="-1" role="dialog" aria-labelledby="add-products" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: calc(100% - 250px);" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header justify-content-start align-items-center">
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/xBlack.svg" alt="">
              </span>
          </button>
          <h3 class="modal-title">Individual push</h3>
        </div>
        <div class=" myModal-body">
          <span class="header-description">Configure Unique Push Notifications<br> to send to customers</span>

          <div>
            <button class="app-buttons-item adding-btns"  data-toggle="modal" data-target="#add-push"><span>+ Add push</span></button>
          </div>

          <div class="d-flex main-content-header">
            <div class="table-head" style="width: 3%;"><label class="custom-checkbox"><input type="checkbox"><span class="checkmark"></span></label></div>
            <div class="table-head" style="width: 43%;">Name</div>
            <div class="table-head" style="width: 30%;">Gap</div>
            <div class="table-head" style="width: 21%;">Action</div>
            <div class="table-head" style="width:3%"></div>
          </div>
          <div>
            <AddPush/>
            <div class="table-content">
              <div class="table-item d-flex align-items-center" >
                <div  style="width: 3%;"><label class="custom-checkbox"><input  type="checkbox"  ><span class="checkmark"></span></label></div>
                <div  class="d-flex flex-column justify-content-center"  style="width: 43%;">
                  <p class="mb-0">All clients</p>
                  <p class="mb-0">9</p>
                </div>
                <div  style="width: 30%;">Everyweek</div>
                <div  style="width: 21%;">
                  <label class="switch">
                    <input type="checkbox" data-toggle="collapse" data-target="#collapse-limit" aria-expanded="true" aria-controls="collapse-limit">
                    <span class="slider round"></span>
                  </label>
                </div>
                <div  style="width:3%">
                  <div class="dropleft dropMenu">
                    <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <img  src="../../assets/icons/three-dots.svg"
                            class="three-dots">
                    </div>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
                      <ul class="list-group " >
                        <li class="list-group-item">Edit</li>
                        <li class="list-group-item">Delete</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>


        </div>
      </div>
    </div>
  </div>

</template>

<script>
import AddPush from "@/modals/client/AddPush";

export default {
  name: "Push notification",
  components:{
    AddPush
  }



}
</script>

<style scoped>

.header-description{
  font-size: 14px;
  color:#b0b0b0;
  line-height: 17px;
  display: inline-block;
  margin-bottom: 30px;
}
.adding-btns{
  margin-bottom: 30px;
}

</style>