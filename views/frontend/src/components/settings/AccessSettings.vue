<template>
<div class="access-settings">
  <div class="notification-header"><img @click="$router.go(-1)" class="mr-2" src="../../assets/icons/xBlack.svg"><h3>Access settings</h3></div>
  <p class="warning-text">
    Влючив данные опции вы даете
    доступ только к<br> просматриванию разделов. Если хотите дать полный доступ<br> отметьте галочку ”разрешить редактирование”
  </p>
  <div class="row">
    <div class="col-lg-4">
      <div class="settings-box d-flex align-items-center justify-content-between">
       <div class="d-flex align-items-center">
         <img class="settings-icon" src="../../assets/icons/setting-icon/Setting.svg">
         <div>
           <h4 class="settings-title">Access to company settings</h4>
          <div class="d-flex">
            <label class="custom-checkbox mr-2"><input type="checkbox"><span class="checkmark"></span></label>
            <div class="edit-access">Edit access</div>
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
     <div class="d-flex align-items-center">
       <img class="settings-icon" src="../../assets/icons/setting-icon/Plus.svg">

       <div>
         <h4 class="settings-title">Access to order</h4>
         <div class="d-flex">
           <label class="custom-checkbox mr-2"><input type="checkbox"><span class="checkmark"></span></label>
           <div class="edit-access">Edit access</div>
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
       <div class="d-flex align-items-center">
         <img class="settings-icon" src="../../assets/icons/setting-icon/Chart.svg">
         <div>
           <h4 class="settings-title mb-0 ">Access to Analytics</h4>
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
       <div class="d-flex align-items-center">
         <img class="settings-icon" src="../../assets/icons/setting-icon/Document.svg">

         <div>
           <h4 class="settings-title">Access to the clients base</h4>
           <div class="d-flex">
             <label class="custom-checkbox mr-2"><input type="checkbox"><span class="checkmark"></span></label>
             <div class="edit-access">Edit access</div>
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
       <div class="d-flex align-items-center">
         <img class="settings-icon" src="../../assets/icons/setting-icon/VolumeUp.svg">
         <div>
           <h4 class="settings-title">Access to news</h4>
           <div class="d-flex">
             <label class="custom-checkbox mr-2"><input type="checkbox"><span class="checkmark"></span></label>
             <div class="edit-access">Edit access</div>
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
      <div class="d-flex align-items-center">
        <img class="settings-icon" src="../../assets/icons/setting-icon/Discovery.svg">

        <div>
          <h4 class="settings-title">Catalog Access</h4>
          <div class="d-flex">
            <label class="custom-checkbox mr-2"><input type="checkbox"><span class="checkmark"></span></label>
            <div class="edit-access">Edit access</div>
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
       <div class="d-flex align-items-center">
         <img class="settings-icon" src="../../assets/icons/setting-icon/MoreSquare.svg">

         <div>
           <h4 class="settings-title">Chat access</h4>
           <div class="d-flex">
             <label class="custom-checkbox mr-2"><input type="checkbox"><span class="checkmark"></span></label>
             <div class="edit-access">Edit access</div>
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
      <div class="d-flex align-items-center">
        <img class="settings-icon" src="../../assets/icons/setting-icon/Game.svg">

        <div>
          <h4 class="settings-title">Access to loyalty programs</h4>
          <div class="d-flex">
            <label class="custom-checkbox mr-2"><input type="checkbox"><span class="checkmark"></span></label>
            <div class="edit-access">Edit access</div>
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
     <div class="d-flex align-items-center">
       <img class="settings-icon" src="../../assets/icons/setting-icon/paper.svg">
       <div>
         <h4 class="settings-title">Access to operations</h4>
         <div class="d-flex">
           <label class="custom-checkbox mr-2"><input type="checkbox"><span class="checkmark"></span></label>
           <div class="edit-access">Edit access</div>
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

  <div class="row mb-5">
    <div class="col-lg-4">
      <div class="loyalty-box d-flex justify-content-between align-items-center">
        <h3 class="cashback-sub-title">Accruals of points</h3>
        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="loyalty-box d-flex justify-content-between align-items-center">
        <h3 class="cashback-sub-title">Writing off money</h3>
        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="loyalty-box d-flex justify-content-between align-items-center">
        <h3 class="cashback-sub-title">Change status order</h3>
        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="loyalty-box d-flex justify-content-between align-items-center">
        <h3 class="cashback-sub-title">Push notification</h3>
        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="loyalty-box d-flex justify-content-between align-items-center">
        <h3 class="cashback-sub-title">Scan QR</h3>
        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </div>

  <button class="save mb-5">Save</button>
</div>
</template>

<script>
export default {
  name: "AccessSettings"
}
</script>

<style scoped>
.save{
  width: 120px;
}
.warning-text{
  font-size: 14px;
  color:#858585;
  margin-bottom: 24px;
}

.cashback-sub-title{
  font-weight: 400;
  font-size: 15px;
}
.access-settings{
  padding: 0 30px;
}

.settings-box, .loyalty-box{
  padding: 15px;
  border: 1.5px solid #D3D3D3;
  border-radius:10px;
  margin-bottom: 15px;
}
.settings-box{
  height: 80px;
}
.loyalty-box{
  height: 45px;
}
.settings-icon{
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.settings-title{
  font-size: 15px;
  margin-bottom: 7px;
}
.edit-access{
  color:#999;
}

</style>