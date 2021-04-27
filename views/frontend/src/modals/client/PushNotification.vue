<template>
  <div class="parent-modal">
    <div class="modal myModal fade" id="push-notification" tabindex="-1" role="dialog" aria-labelledby="push-notification" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content category-content">
          <div class="modal-header category-header">
            <div class="d-flex justify-content-between" style="width:100%">
              <h3 class="modal-title">Push notification</h3>
              <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
              </button>
            </div>
          </div>

          <div class="modal-body category-body">
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

            <select class=" form-control long-form-control  form-control-lg" aria-label=".form-select-lg example">
              <option>Select from categories</option>
              <option>Russia</option>
              <option>USA</option>
              <option>Kyrgyzstan</option>
            </select>

            <div class="d-flex main-content-header">
             <div class="table-head" style="width: 52%;">Name</div>
              <div class="table-head" style="width:35%">Category</div>
              <div class="table-head" style="width:13%">Bonus</div>
            </div>

            <div class="table-content">
              <div class="table-item d-flex align-items-center">
                <div class="table-head" style="width: 5%;"><label class="custom-checkbox"><input type="checkbox"  @click="toggleSelect" :checked="selectAll"><span class="checkmark"></span></label></div>
                <div  class="d-flex align-items-center"  style="width: 47%;">
                  <div class="table-img">
                    <img src="../../assets/img/sneak.webp">
                  </div>
                  Olivia Robert
                </div>
                <div style="width:35%">Vip</div>
                <div style="width:13%">3900</div>
              </div>
              <div class="table-item d-flex align-items-center">
                <div class="table-head" style="width: 5%;"><label class="custom-checkbox"><input type="checkbox"  @click="toggleSelect" :checked="selectAll"><span class="checkmark"></span></label></div>
                <div  class="d-flex align-items-center"  style="width: 47%;">
                  <div class="table-img">
                    <img src="../../assets/img/sneak.webp">
                  </div>
                  Olivia Robert
                </div>
                <div style="width:35%">Vip</div>
                <div style="width:13%">3900</div>
              </div>
              <div class="table-item d-flex align-items-center">
                <div class="table-head" style="width: 5%;"><label class="custom-checkbox"><input type="checkbox"  @click="toggleSelect" :checked="selectAll"><span class="checkmark"></span></label></div>
                <div  class="d-flex align-items-center"  style="width: 47%;">
                  <div class="table-img">
                    <img src="../../assets/img/sneak.webp">
                  </div>
                  Olivia Robert
                </div>
                <div style="width:35%">Vip</div>
                <div style="width:13%">3900</div>
              </div>
              <div class="table-item d-flex align-items-center">
                <div class="table-head" style="width: 5%;"><label class="custom-checkbox"><input type="checkbox"  @click="toggleSelect" :checked="selectAll"><span class="checkmark"></span></label></div>
                <div  class="d-flex align-items-center"  style="width: 47%;">
                  <div class="table-img">
                    <img src="../../assets/img/sneak.webp">
                  </div>
                  Olivia Robert
                </div>
                <div style="width:35%">Vip</div>
                <div style="width:13%">3900</div>
              </div>
              <div class="table-item d-flex align-items-center">
                <div class="table-head" style="width: 5%;"><label class="custom-checkbox"><input type="checkbox"  @click="toggleSelect" :checked="selectAll"><span class="checkmark"></span></label></div>
                <div  class="d-flex align-items-center"  style="width: 47%;">
                  <div class="table-img">
                    <img src="../../assets/img/sneak.webp">
                  </div>
                  Olivia Robert
                </div>
                <div style="width:35%">Vip</div>
                <div style="width:13%">3900</div>
              </div>
              <div class="table-item d-flex align-items-center">
                <div class="table-head" style="width: 5%;"><label class="custom-checkbox"><input type="checkbox"  @click="toggleSelect" :checked="selectAll"><span class="checkmark"></span></label></div>
                <div  class="d-flex align-items-center"  style="width: 47%;">
                  <div class="table-img">
                    <img src="../../assets/img/sneak.webp">
                  </div>
                  Olivia Robert
                </div>
                <div style="width:35%">Vip</div>
                <div style="width:13%">3900</div>
              </div>
            </div>

            <input placeholder="Title" class="push-input cashback-input">
            <textarea class="general-area p-2" placeholder="Description"></textarea>

            <div class="d-flex align-items-center">
                <button class="modal-btn save mr-3">Send</button>
              <span class="push-description">Customers selected: 1000 out of 1000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PushNotification"
}
</script>

<style scoped>
.general-area{
  margin-bottom: 27px;
}
.push-description{
  color: #8C94A5;
  font-size: 16px;
}
.main-content-header{
  padding-bottom: 9px;
}
.table-item{
  height: 50px;
}
.send-all{
  font-size: 16px;
  margin-bottom: 5px;
}
.modal-dialog{
  max-width: 600px !important;
  height: 836px;
}
.client-all{
  margin-bottom: 10px;
}
.category-body{
  padding:0 30px;
}
.category-content{
  height: 100%;
  border:0;
  border-radius: 0;
}
.modal-header{
  padding: 27px 30px;
}
.push-title{
  font-weight: normal;
  font-size: 18px;
}
.modal-btn.save{
  width: 120px;
}

.custom-checkbox {
  margin-bottom: 0;
}
.client-all .custom-checkbox{
  width: 14px;
  height: 14px;
}

.main-search{
  height: 35px;
  margin-bottom: 11px;
}
.form-control{
  height: 35px;
  padding: 0 20px;
  font-size: 14px;
  background-position-y:50%;
  background-position-x:96%;
  border:none;
  background: #F4F4F4;
  margin-bottom: 25px;
}
.push-input{
  height: 35px;
  width: 100%;
  margin-bottom: 10px;
}
.table-content{
  height: 260px;
  margin-bottom: 30px;
}
.table-img{
  height: 30px;
  width: 30px;
}
</style>