<template>
<div class="push-notification">
    <div class="notification-header"><img @click="$router.go(-1)" class="mr-2" src="../../assets/icons/xBlack.svg"><h3>Push notification</h3></div>

    <div class="row">
      <div class="col-lg-8">
        <div class="d-flex client-all justify-content-between">
          <h4 class="push-title">Manual selection of customers</h4>
          <div class="d-flex align-items-center">
            <div class="table-head "><label class="custom-checkbox mr-2 "><input type="checkbox"><span class="checkmark"></span></label></div>
            <span class="send-all">Send to all</span>
          </div>
        </div>

        <div class="main-search d-flex align-items-center ">
          <img src="../../assets/icons/search-icon.svg">
          <input class="main-input" type="text" placeholder="Search" v-model="search">
        </div>

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

      </div>

      <div class="col-lg-4 pb-5">
        <div class="choose-category">
          <h2 class="notification-title">Choose from category</h2>
          <input class="cashback-input" placeholder="Search">
          <ul class="p-0 m-0">
            <li class="category-list">Standart</li>
            <li class="category-list">Gold</li>
            <li class="category-list">Vip</li>
            <li class="category-list">Vip</li>
          </ul>
        </div>

        <h3 class="notification-title">Select by last purchase date</h3>
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

        <h3 class="notification-title">News</h3>
        <input class="cashback-input news-input" placeholder="Select news">

        <div class="sale d-flex align-items-center justify-content-between">
         <div style="width:100%">
           <h4 class="sale-title">New sales</h4>
           <input class="sale-input" placeholder="Only today there is a discount for...">
         </div>
          <img src="../../assets/icons/deleteClient.svg">
        </div>

        <h3 class="notification-title">Custom text</h3>
        <input class="cashback-input mb-3" placeholder="Title">
        <textarea class="general-area p-2" placeholder="Description"></textarea>

        <button class="save">Send</button>
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
    .save{
      width: 120px;
    }
    .general-area{
      margin-bottom: 20px;
    }
    .news-input{
      margin-bottom: 20px;
    }
    .sale{
      border-bottom: 1px solid #D3D3D3;
      padding-bottom: 14px;
      margin-bottom: 20px;
    }
    .sale-input{
      border:none;
      height: 100%;
      width: 100%;

    }
    .form-control{
      background: none;
    }
    .sale-title{
      font-size: 14px;
      font-weight: normal;
      margin-bottom: 3px;
    }
    .notification-title{
      font-size: 16px;
      font-weight: normal;
      margin-bottom: 12px;
    }
    .choose-category{
      background: #F8F9FB;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .choose-category .cashback-input{
      height: 35px;
      background: none;
      margin-bottom: 20px;
    }

    .cashback-input{
      width: 100%;
    }
    .push-notification{
      padding: 0 30px;
    }

    .push-title{
      font-size: 18px;
      font-weight: normal;
    }
    .client-all{
      margin-bottom: 21px;
    }
    .main-search{
      margin-bottom: 30px;
    }
    .category-list{
      list-style-type:none;
      margin-bottom: 10px;
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
</style>