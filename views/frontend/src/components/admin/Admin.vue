<template>
<div class="d-flex">
  <div class="siding-bar">
    <AdminSideBar/>
  </div>
  <div class="admin-content">
    <div class="admin-header">
      <h3 class="company-title">Company</h3>
      <span class="total-company">Total company 13</span>
    </div>

    <div class="main-search d-flex align-items-center">
      <img src="../../assets/icons/search-icon.svg">
      <input class="main-input" type="text" placeholder="Search">
    </div>

    <div class="d-flex main-content-header">
      <div class="table-head" style="width: 5%;"><label class="custom-checkbox"><input id="parent-check" type="checkbox"><span class="checkmark"></span></label></div>
      <div class="table-head" style="width: 25%;">Name</div>
      <div class="table-head" style="width: 25%;">Client name</div>
      <div class="table-head" style="width: 17%;">Phone number</div>
      <div class="table-head table-link pr-3" style="width: 13%;">Clients<img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
      <div class="table-head table-link pr-3" style="width: 13%;">Orders<img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
      <div class="table-head table-link d-flex align-items-center pr-3" style="width: 15%;"><div class="status-header d-flex"><div>Status</div><img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div></div>
      <div class="table-head table-link pr-3" style="width: 20%;">Last purchase<img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
      <div class="table-head table-link pr-3" style="width: 13%;">Days left<img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
      <div class="table-head table-link pr-3" style="width: 5%;"></div>

    </div>
    <div class="table-content">
      <div  class="catalog-item table-item d-flex align-items-center" >
        <div><label class="custom-checkbox"><input type="checkbox" >
          <span class="checkmark"></span></label>
        </div>
        <div class="table-head" style="width: 25%;">OcOO Еролифт</div>
        <div class="table-head" style="width: 25%;">Bektemir Kudaiberdiev</div>
        <div class="table-head" style="width: 17%;">0500457834</div>
        <div class="table-head table-link pr-3" style="width: 13%;">23</div>
        <div class="table-head table-link pr-3" style="width: 13%;">2</div>
        <div class="table-head table-link pr-3" style="width: 15%;"><div class="status-admin active d-flex align-items-center"><div class="status-dot mr-2"></div>active</div></div>
        <div class="table-head table-link pr-3" style="width: 20%;">2021-23-09</div>
        <div class="table-head table-link pr-3" style="width: 13%;"><span class="days-left">123</span></div>
        <div  style="width:5%;">
          <div class="dropleft dropMenu">
            <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img  src="../../assets/icons/three-dots.svg"
                    class="three-dots">
            </div>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
              <ul class="list-group " >
                <li class="list-group-item">Edit</li>
                <li class="list-group-item">Block</li>
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
import AdminSideBar from "@/components/admin/AdminSideBar";
export default {
  name: "AdminPage",
  components:{
    AdminSideBar
  }
}
</script>

<style scoped>
.table-content{
  height: calc(100vh - 200px);
  overflow-y: auto;
}
.days-left{
  background: #F4F4F4;
  border-radius: 5px;
  color:#616cf5;
  padding:5px;
}
.status-header{
  background: #F4F4F4;
  border-radius: 5px;
  padding: 3px 15px;
}
.status-dot{
  height: 7px;
  width: 7px;
  border-radius: 50%;
  background: #fff;
}
.status-admin{
  padding: 3px 15px;
  border-radius:5px;
  color:#fff;
}
.status-admin.active{
  background: #51ae79;
}.status-admin.blocked{
   background: #DB4C4C;
 }
.table-item{
  height: 60px;
}
.main-search{
  margin-bottom: 30px;
}
.siding-bar{
  min-width: 250px;
  max-width: 250px;
  position: fixed;
  z-index:999;
}
.admin-header{
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 25px;
}
.company-title{
  font-size: 24px;
  font-weight: 700;
}
.total-company{
  color:#616cf5;
}
.main-content-header{
  padding-right: 10px;
}
.admin-content{
  width: calc(100% - 250px);
  margin-left: 250px;
  padding:0 30px;
}
</style>