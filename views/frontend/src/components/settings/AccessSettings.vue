<template>
<div class="access-settings">
  <div class="notification-header"><img @click="$router.go(-1)" class="mr-2" src="../../assets/icons/xBlack.svg"><h3>Access settings</h3></div>
  <div class="row">
    <div class="col-lg-4">
      <div class="settings-box d-flex align-items-center justify-content-between">
       <div class="d-flex align-items-center">
         <img class="settings-icon" src="../../assets/icons/setting-icon/Setting.svg">
         <div>
           <h4 class="settings-title">Access to company settings</h4>
           <div class="radio-toolbar">
             <div class="d-flex align-items-center mr-3">
               <input type="radio" id="setting-view" name="company"  checked>
               <label for="setting-view"></label>
               <span class="male">View only</span>
             </div>
             <div class="d-flex align-items-center">
               <input type="radio" id="setting-edit" name="company" >
               <label for="setting-edit"></label>
               <span class="male">Edit access</span>
             </div>
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
         <div class="radio-toolbar">
           <div class="d-flex align-items-center mr-3">
             <input type="radio" id="client-view" name="order">
             <label for="client-view"></label>
             <span class="male">View only</span>
           </div>
           <div class="d-flex align-items-center">
             <input type="radio" id="client-edit" name="order">
             <label for="client-edit"></label>
             <span class="male">Edit access</span>
           </div>
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
           <h4 class="settings-title ">Access to Analytics</h4>
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
           <div class="radio-toolbar">
             <div class="d-flex align-items-center mr-3">
               <input type="radio" id="order-view" name="client">
               <label for="order-view"></label>
               <span class="male">View only</span>
             </div>
             <div class="d-flex align-items-center">
               <input type="radio" id="order-edit" name="client">
               <label for="order-edit"></label>
               <span class="male">Edit access</span>
             </div>
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
           <div class="radio-toolbar">
             <div class="d-flex align-items-center mr-3">
               <input type="radio" id="news-view" name="news" >
               <label for="news-view"></label>
               <span class="male">View only</span>
             </div>
             <div class="d-flex align-items-center">
               <input type="radio" id="news-edit" name="news">
               <label for="news-edit"></label>
               <span class="male">Edit access</span>
             </div>
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
          <div class="radio-toolbar">
            <div class="d-flex align-items-center mr-3">
              <input type="radio" id="loyalty-view" name="catalog" >
              <label for="loyalty-view"></label>
              <span class="male">View only</span>
            </div>
            <div class="d-flex align-items-center">
              <input type="radio" id="loyalty-edit" name="catalog">
              <label for="loyalty-edit"></label>
              <span class="male">Edit access</span>
            </div>
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
           <div class="radio-toolbar">
             <div class="d-flex align-items-center mr-3">
               <input type="radio" id="analatycs-view" name="chat" >
               <label for="analatycs-view"></label>
               <span class="male">View only</span>
             </div>
             <div class="d-flex align-items-center">
               <input type="radio" id="analatycs-edit" name="chat">
               <label for="analatycs-edit"></label>
               <span class="male">Edit access</span>
             </div>
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
          <div class="radio-toolbar">
            <div class="d-flex align-items-center mr-3">
              <input type="radio" id="catalog-view" name="loyalty">
              <label for="catalog-view"></label>
              <span class="male">View only</span>
            </div>
            <div class="d-flex align-items-center">
              <input type="radio" id="catalog-edit" name="loyalty">
              <label for="catalog-edit"></label>
              <span class="male">Edit access</span>
            </div>
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
         <div class="radio-toolbar">
           <div class="d-flex align-items-center mr-3">
             <input type="radio" id="operation-view" name="operation" >
             <label for="operation-view"></label>
             <span class="male">View only</span>
           </div>
           <div class="d-flex align-items-center">
             <input type="radio" id="operation-edit" name="operation" >
             <label for="operation-edit"></label>
             <span class="male">Edit access</span>
           </div>
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
</div>
</template>

<script>
export default {
  name: "AccessSettings"
}
</script>

<style scoped>
.analytics{
  margin-left: -50px;
}
.cashback-sub-title{
  font-weight: 400;
}
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
  height: 45px;
}
.settings-icon{
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.settings-title{
  font-size: 16px;
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