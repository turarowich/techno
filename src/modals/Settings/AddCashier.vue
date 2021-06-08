<template>
  <div class="modal fade right"  id="add-cashier" tabindex="-1" role="dialog" aria-labelledby="add-cashier" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: 587px;" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header align-items-center">
          <h3 class="modal-title">Add Cashier</h3>
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
          </button>
        </div>
        <div class=" myModal-body">
          <form  class="modal-form ">

            <div class="user-img">
              <img src="../../assets/icons/clientUser.svg">
              <img src="../../assets/icons/addBtn.svg" class="add-btn">
            </div>

            <label>Name</label><br>
            <input class="cashback-input">

            <label>Email</label><br>
            <input class="cashback-input">

            <label>Password</label><br>
            <input class="cashback-input">

            <label>Repeat password</label><br>
            <input class="cashback-input">

            <label>Comment</label>
            <textarea class="general-area"></textarea>
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
  name: "AddCashier"
}
</script>

<style scoped>
.user-img{
  width: 80px;
  height: 80px;
  border-radius:50%;
  background: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
}
.cashback-input{
  width: 100%;
  margin-bottom: 20px;
}
.general-area{
  margin-bottom: 80px;
}
.add-btn{
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  bottom: 5px;
}
</style>