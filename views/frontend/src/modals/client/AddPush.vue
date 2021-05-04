<template>
  <div class="modal fade right"  id="add-push" tabindex="-1" role="dialog" aria-labelledby="add-promocode" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: 933px;" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header align-items-center">
          <h3 class="modal-title">Add push</h3>
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
          </button>
        </div>
        <div class=" myModal-body">
          <form  class="modal-form ">
            <div class="row">
              <div class="col-lg-6">
                <div class="d-flex client-all justify-content-between">
                  <h4 class="push-title">Clients</h4>
                  <div class="d-flex align-items-center">
                    <div class="table-head "><label class="custom-checkbox mr-2 "><input type="checkbox"><span class="checkmark"></span></label></div>
                    <span class="send-all">Send to all</span>
                  </div>
                </div>

                <div class="main-search d-flex align-items-center ">
                  <img src="../../assets/icons/search-icon.svg">
                  <input class="main-input" type="text" placeholder="Search" v-model="search">
                </div>

                <div class="selects">
                  <select class=" form-control long-form-control  form-control-lg" aria-label=".form-select-lg example">
                    <option>1 month</option>
                    <option>2 month</option>
                    <option>3 month</option>
                    <option>4 month</option>
                    <option>5 month</option>
                    <option>6 month</option>
                    <option>12 month</option>
                  </select>
                </div>

                <div class="choosed-client">

                </div>

              </div>

<!-------------------------Right Side --------------------->

              <div class="col-lg-6">
                  <h3 class="push-title settings">Notification settings</h3>

                <div class="radio-toolbar">
                  <div class="d-flex align-items-center mr-4">
                    <input type="radio" id="radioShopping" name="charge" value="apple" checked>
                    <label for="radioShopping"></label>
                    <span class="male">By week</span>
                  </div>
                  <div class="d-flex align-items-center">
                    <input type="radio" id="radioRegistration" name="charge" value="orange">
                    <label for="radioRegistration"></label>
                    <span class="maled">By month</span>
                  </div>
                </div>

                <div class="week d-flex">
                  <div class="days active d-flex justify-content-center align-items-center">MO</div>
                  <div class="days d-flex justify-content-center align-items-center">TU</div>
                  <div class="days d-flex justify-content-center align-items-center">WE</div>
                  <div class="days d-flex justify-content-center align-items-center">TH</div>
                  <div class="days d-flex justify-content-center align-items-center">FR</div>
                  <div class="days d-flex justify-content-center align-items-center">SA</div>
                  <div class="days d-flex justify-content-center align-items-center">SU</div>
                </div>
              </div>
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
  name: "AddPush"
}
</script>

<style scoped>
.radio-toolbar{
  margin-bottom: 20px;
}
.client-all, .settings{
  margin-bottom: 20px;
}
.main-search{
  margin-bottom: 10px;
}
.push-title{
  font-size: 16px;
  font-weight: normal;
}
.form-control{
  background: #F8F9FB;
  border:1px solid #d3d3d3;
}
.selects:before{
  content:'';
  background: url("../../assets/icons/selectDown.svg") no-repeat;
  width:20px;
  height:20px;
  position: absolute;
  z-index:88;
  right: 20px;
  top:27%;
}
.selects{
  position: relative;
  margin-bottom: 20px;
}
.days{
  background: #F8F9FB;
  border-radius: 4.64125px;
  width: 48px;
  height: 45px;
  color:#858585;
  cursor:pointer;
  margin-right: 10px;
}
.days.active,.days:hover{
  background: #616cf5;
  transition: .3s;
  color:#fff;
}
</style>