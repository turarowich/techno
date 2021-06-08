<template>
<div class="access-settings">
  <div class="notification-header"><img @click="$router.go(-1)" class="mr-2" src="../../assets/icons/xBlack.svg"><h3>Access settings</h3></div>
  <div class="row">
    <div class="col-lg-4">
      <div class="settings-box d-flex align-items-center justify-content-between">
        <img class="settings-icon" src="../../assets/icons/setting-icon/Setting.svg">

        <div>
          <h4 class="settings-title">Access to company settings</h4>
          <div class="radio-toolbar">
            <div class="d-flex align-items-center mr-3">
              <input type="radio" id="setting-view" name="radioFruit" value="apple" checked>
              <label for="setting-view"></label>
              <span class="male">View only</span>
            </div>
            <div class="d-flex align-items-center">
              <input type="radio" id="setting-edit" name="radioFruit" value="orange">
              <label for="setting-edit"></label>
              <span class="male">Edit access</span>
            </div>
          </div>
        </div>

        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>

      </div>
    </div>
    <div class="col-lg-4">
      <div class="settings-box d-flex align-items-center justify-content-between">
        <img class="settings-icon" src="../../assets/icons/setting-icon/Setting.svg">

        <div>
          <h4 class="settings-title">Access to company settings</h4>
          <div class="radio-toolbar">
            <div class="d-flex align-items-center mr-3">
              <input type="radio" id="client-view" name="radioFruit" value="apple" checked>
              <label for="client-view"></label>
              <span class="male">View only</span>
            </div>
            <div class="d-flex align-items-center">
              <input type="radio" id="client-edit" name="radioFruit" value="orange">
              <label for="client-edit"></label>
              <span class="male">Edit access</span>
            </div>
          </div>
        </div>

        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>

      </div>
    </div>
    <div class="col-lg-4">
      <div class="settings-box d-flex align-items-center justify-content-between">
        <img class="settings-icon" src="../../assets/icons/setting-icon/Setting.svg">

        <div>
          <h4 class="settings-title">Access to company settings</h4>
          <div class="radio-toolbar">
            <div class="d-flex align-items-center mr-3">
              <input type="radio" id="chat-view" name="radioFruit" value="apple" checked>
              <label for="chat-view"></label>
              <span class="male">View only</span>
            </div>
            <div class="d-flex align-items-center">
              <input type="radio" id="chat-edit" name="radioFruit" value="orange">
              <label for="chat-edit"></label>
              <span class="male">Edit access</span>
            </div>
          </div>
        </div>

        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>

      </div>
    </div>
    <div class="col-lg-4">
      <div class="settings-box d-flex align-items-center justify-content-between">
        <img class="settings-icon" src="../../assets/icons/setting-icon/Setting.svg">

        <div>
          <h4 class="settings-title">Access to company settings</h4>
          <div class="radio-toolbar">
            <div class="d-flex align-items-center mr-3">
              <input type="radio" id="order-view" name="radioFruit" value="apple" checked>
              <label for="order-view"></label>
              <span class="male">View only</span>
            </div>
            <div class="d-flex align-items-center">
              <input type="radio" id="order-edit" name="radioFruit" value="orange">
              <label for="order-edit"></label>
              <span class="male">Edit access</span>
            </div>
          </div>
        </div>

        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>

      </div>
    </div>
    <div class="col-lg-4">
      <div class="settings-box d-flex align-items-center justify-content-between">
        <img class="settings-icon" src="../../assets/icons/setting-icon/Setting.svg">

        <div>
          <h4 class="settings-title">Access to company settings</h4>
          <div class="radio-toolbar">
            <div class="d-flex align-items-center mr-3">
              <input type="radio" id="news-view" name="radioFruit" value="apple" checked>
              <label for="news-view"></label>
              <span class="male">View only</span>
            </div>
            <div class="d-flex align-items-center">
              <input type="radio" id="news-edit" name="radioFruit" value="orange">
              <label for="news-edit"></label>
              <span class="male">Edit access</span>
            </div>
          </div>
        </div>

        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>

      </div>
    </div>
    <div class="col-lg-4">
      <div class="settings-box d-flex align-items-center justify-content-between">
        <img class="settings-icon" src="../../assets/icons/setting-icon/Setting.svg">

        <div>
          <h4 class="settings-title">Access to company settings</h4>
          <div class="radio-toolbar">
            <div class="d-flex align-items-center mr-3">
              <input type="radio" id="loyalty-view" name="radioFruit" value="apple" checked>
              <label for="loyalty-view"></label>
              <span class="male">View only</span>
            </div>
            <div class="d-flex align-items-center">
              <input type="radio" id="loyalty-edit" name="radioFruit" value="orange">
              <label for="loyalty-edit"></label>
              <span class="male">Edit access</span>
            </div>
          </div>
        </div>

        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>

      </div>
    </div>
    <div class="col-lg-4">
      <div class="settings-box d-flex align-items-center justify-content-between">
        <img class="settings-icon" src="../../assets/icons/setting-icon/Setting.svg">

        <div>
          <h4 class="settings-title">Access to company settings</h4>
          <div class="radio-toolbar">
            <div class="d-flex align-items-center mr-3">
              <input type="radio" id="analatycs-view" name="radioFruit" value="apple" checked>
              <label for="analatycs-view"></label>
              <span class="male">View only</span>
            </div>
            <div class="d-flex align-items-center">
              <input type="radio" id="analatycs-edit" name="radioFruit" value="orange">
              <label for="analatycs-edit"></label>
              <span class="male">Edit access</span>
            </div>
          </div>
        </div>

        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>

      </div>
    </div>
    <div class="col-lg-4">
      <div class="settings-box d-flex align-items-center justify-content-between">
        <img class="settings-icon" src="../../assets/icons/setting-icon/Setting.svg">

        <div>
          <h4 class="settings-title">Access to company settings</h4>
          <div class="radio-toolbar">
            <div class="d-flex align-items-center mr-3">
              <input type="radio" id="catalog-view" name="radioFruit" value="apple" checked>
              <label for="catalog-view"></label>
              <span class="male">View only</span>
            </div>
            <div class="d-flex align-items-center">
              <input type="radio" id="catalog-edit" name="radioFruit" value="orange">
              <label for="catalog-edit"></label>
              <span class="male">Edit access</span>
            </div>
          </div>
        </div>

        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>

      </div>
    </div>
    <div class="col-lg-4">
      <div class="settings-box d-flex align-items-center justify-content-between">
        <img class="settings-icon" src="../../assets/icons/setting-icon/Setting.svg">
        <div>
          <h4 class="settings-title">Access to company settings</h4>
          <div class="radio-toolbar">
            <div class="d-flex align-items-center mr-3">
              <input type="radio" id="operation-view" name="radioFruit" value="apple" checked>
              <label for="operation-view"></label>
              <span class="male">View only</span>
            </div>
            <div class="d-flex align-items-center">
              <input type="radio" id="operation-edit" name="radioFruit" value="orange">
              <label for="operation-edit"></label>
              <span class="male">Edit access</span>
            </div>
          </div>
        </div>

        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>

      </div>
    </div>
  </div>

  <h2 class="cashback-sub-title mt-3 mb-3">Loyalty settings</h2>

  <div class="row">
    <div class="col-lg-4">
      <div class="loyalty-box d-flex justify-content-around align-items-center">
        <h3 class="cashback-sub-title">Accruals of points</h3>
        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="loyalty-box d-flex justify-content-around align-items-center">
        <h3 class="cashback-sub-title">Accruals of points</h3>
        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="loyalty-box d-flex justify-content-around align-items-center">
        <h3 class="cashback-sub-title">Accruals of points</h3>
        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="loyalty-box d-flex justify-content-around align-items-center">
        <h3 class="cashback-sub-title">Accruals of points</h3>
        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="loyalty-box d-flex justify-content-around align-items-center">
        <h3 class="cashback-sub-title">Accruals of points</h3>
        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "AccessSettings"
}
</script>

<style scoped>
.access-settings{
  padding: 0 30px;
}
.radio-toolbar{
  margin-bottom: 0;
}
.settings-box, .loyalty-box{
  padding: 15px;
  border: 1.5px solid #D3D3D3;
  border-radius:10px;
  margin-bottom: 15px;
}
.loyalty-box{
  height: 80px;
}
.settings-icon{
  width: 30px;
  height: 30px;
}
.settings-title{
  font-size: 15px;
  margin-bottom: 7px;
}
.male{
  color:#999;
}
.radio-toolbar label{
  width: 12px;
  height: 12px;
}
</style>