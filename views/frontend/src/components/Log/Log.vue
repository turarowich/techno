<template>
<div class="log">
  <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
       <div class="dropdown filter-drops">
          <button class="app-buttons-item dropdown-toggle"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            <img class="img-btn" src="../../assets/icons/filter.svg"><span>Filter</span>
          </button>

          <div class="dropdown-menu general-dropdown" aria-labelledby="dropdownMenuButton">
            <div class="filter-dropdown">
             <form>
               <div>
                 <div class="filter-list" data-toggle="collapse" data-target="#admins" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                   Admins
                   <img src="../../assets/icons/down.svg" class="filter-img">
                 </div>
                 <div class="collapse" id="admins">
                   <div class="filter-body">
                     <select class="filter-select form-control form-control-sm mb-2" aria-label=".form-select-lg example">
                       <option value="">All</option>
                       <option value="Done">Done</option>
                       <option value="In Progress">In process</option>
                       <option value="Canceled">Canceled</option>
                       <option value="New">New</option>
                     </select>
                   </div>
                 </div>
               </div>
               <div >
                 <div class="filter-list" data-toggle="collapse" data-target="#cashback" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                   Cash back
                   <img src="../../assets/icons/down.svg" class="filter-img">
                 </div>
                 <div class="collapse" id="cashback">
                   <div class="filter-body">
                     <div class="radio-toolbar-gender">
                       <div class="d-flex align-items-center mb-2 mr-5">
                         <input ref="client-filter" type="radio" id="radioMen" name="radioGender" @click="gender_client = 'men'">
                         <label for="radioMen"></label>
                         <span class="male">Added</span>
                       </div>
                       <div class="d-flex align-items-center mb-2">
                         <input ref="client-filter" type="radio" id="radioWoman" name="radioGender" @click="gender_client='woman'">
                         <label for="radioWoman"></label>
                         <span class="male">Edited</span>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div class="filter-list">Orders</div>
               <div class="order_users mb-2"><label class="custom-checkbox mr-2"><input ref="client-filter"   id="client-birthday" type="checkbox"><span class="checkmark"></span></label>Show only created orders</div>
               <div class="filter-list">Clients</div>
               <div class="order_users"><label class="custom-checkbox mr-2"><input ref="client-filter"   id="created" type="checkbox"><span class="checkmark"></span></label>Show only created users</div>

             </form>


            </div>
          </div>
        </div>
      </div>
      <div>
        <button class="app-buttons-item" @click="showYesterday"><img src="../../assets/icons/yesterday.svg"><span>Yesterday</span></button>
        <button class="app-buttons-item" @click="showTodayData"><img src="../../assets/icons/yesterday.svg"><span>Today</span></button>
        <button class="app-buttons-item" @click="clickOnDate"><img src="../../assets/icons/yesterday.svg"><input placeholder="2021-03-01 to 2021-03-04"  class="date-pick" id="datepicker"></button>
      </div>
    </div>
    <div class="main-search d-flex align-items-center">
      <img src="../../assets/icons/search-icon.svg">
      <input class="main-input" type="text" placeholder="Search" v-model="search">
    </div>
  </div>

  <div class="d-flex main-content-header justify-content-between align-items-center">
     <div class="table-head" style="width: 60%;">Operation name</div>
     <div class="table-head" style="width: 20%;">User</div>
     <div class="table-head" style="width: 20%;">Date and time</div>


  </div>
  <div class="table-content">
    <LogItem/>
  </div>

</div>
</template>

<script>
import LogItem from "@/components/Log/LogItem";
export default {
  name: "Log",
  components:{
    LogItem
  }
}
</script>

<style scoped>
.order_users{
  font-size: 14px;
}
.filter-list{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F4F4F4;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
.filter-select{
  height: 30px;
  font-size: 14px;

}
.general-dropdown{
  width: 19rem;
}
.filter-dropdown{
  padding: 17px;
  transform: translate3d(0px, -5px, 0px) !important;
}
.main-content-header{
  padding-right:10px;
}
.log{
  margin: 0 30px;
}
.date-pick::placeholder{
  color: #606877;
  opacity: 1;
}

.date-pick{

  width:182px;
  height: 20px;
  background: none;
  border:none;
  cursor:pointer;
  color:#606877;
}/*====================Radio  toolbaar baschback*/
.radio-toolbar-gender input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.radio-toolbar-gender label {
  display: inline-block;
  margin-bottom: 0;
  margin-right: 10px;
  width: 13px;
  height: 13px;
  border: 1px solid #E3E3E3;
  box-sizing: border-box;
  border-radius:3px;
}

.radio-toolbar-gender input[type="radio"]:checked + label {
  background-color: #616cf5;
  border: none;
}
.male{
  font-size: 14px;
}
</style>