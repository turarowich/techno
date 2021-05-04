<template>
<div class="individual-push">
  <div class="notification-header">
    <img class="mr-2" src="../../assets/icons/xBlack.svg"><h3>Individual push</h3>
  </div>
  <span class="header-description">Configure Unique Push Notifications<br> to send to customers</span>

  <div>
    <button class="app-buttons-item adding-btns" data-toggle="modal" data-target="#add-push"><span>+ Add push</span></button>
  </div>

  <div class="d-flex main-content-header">
    <div class="table-head" style="width: 3%;"><label class="custom-checkbox"><input type="checkbox"><span class="checkmark"></span></label></div>
    <div class="table-head" style="width: 43%;">Name</div>
    <div class="table-head" style="width: 25%;">Category</div>
    <div class="table-head" style="width: 18%;">Gap</div>
    <div class="table-head" style="width: 8%;"></div>
    <div class="table-head" style="width:3%"></div>
  </div>

  <div>
<!--    <div class="text-center empty-box" >-->
<!--      <img src="../../assets/icons/emptyOrder.svg">-->
<!--      <p class="empty-page-text">You have no orders yet</p>-->
<!--    </div>-->
    <AddPush/>
   <div class="table-content">
     <div class="table-item d-flex align-items-center" >
       <div  style="width: 3%;"><label class="custom-checkbox"><input  type="checkbox"  ><span class="checkmark"></span></label></div>
       <div  class="d-flex align-items-center"  style="width: 43%;">
         <div class="table-img">
           <img src="../../assets/img/sneak.webp">
         </div>
         All clients
       </div>

       <div  style="width: 25%;">vip</div>
       <div  style="width: 18%;">Everyweek</div>
       <div  style="width: 8%;">
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

</template>

<script>
import AddPush from "@/modals/client/AddPush";
export default {
  name: "IndividualPush",
  components:{
    AddPush
  }
}
</script>

<style scoped>

.individual-push{
  padding: 0 30px;
}
.notification-header{
  height:inherit;
  padding-top:40px;
  padding-bottom: 10px;
}
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