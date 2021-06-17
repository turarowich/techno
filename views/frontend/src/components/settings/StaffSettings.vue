<template>
<div>
  <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
        <button class="app-buttons-item adding-btns" data-toggle="modal" data-target="#add-cashier"><span>+ Add cashier</span></button>
      </div>
      <div class="d-flex align-items-center">
        <button class="app-buttons-item"><img src="../../assets/icons/trash_empty.svg"><span>Remove</span></button>
        <button class="app-buttons-item"><img src="../../assets/icons/setting-icon/Lock.svg"><span>Block</span></button>
        <button class="app-buttons-item"><img src="../../assets/icons/setting-icon/Unblock.svg"><span>Unblock</span></button>
      </div>
    </div>
    <div class="main-search d-flex align-items-center ">
      <img src="../../assets/icons/search-icon.svg">
      <input class="main-input" type="text" placeholder="Search" v-model="search">
    </div>
  </div>
<AddCashier/>
  <div class="d-flex main-content-header">
    <div class="table-head" style="width: 3%;"><label class="custom-checkbox"><input type="checkbox" ><span class="checkmark"></span></label></div>
    <div class="table-head" style="width: 36%;">Name</div>
    <div class="table-head" style="width: 22%;">Average check</div>
    <div class="table-head" style="width: 12%;">Total</div>
    <div class="table-head" style="width: 12%;">Date</div>
    <div class="table-head" style="width: 12%; ">Status</div>
    <div class="table-head" style="width:3%"></div>
  </div>

  <div class="table-content">
    <div  class="table-item d-flex align-items-center" >
        <div  style="width: 3%;"><label class="custom-checkbox"><input  type="checkbox" ><span class="checkmark"></span></label></div>
        <div  style="width: 36%;" class="d-flex align-items-center pr-3">
          <div class="table-img">
            <img src="../../assets/img/criw.jpg">
          </div>
          Bektemir Kudaiberdiev
        </div>
        <div  style="width: 22%;">Vip</div>
        <div  style="width: 12%;">0500457834</div>
        <div  style="width: 12%;">300</div>
        <div  style="width: 12%;">123</div>
        <div class="dropleft dropMenu">
          <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img  src="../../assets/icons/three-dots.svg"
                  class="three-dots">
          </div>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
            <ul class="list-group" >
              <li class="list-group-item" data-toggle="modal" data-target="#edit-client">Edit</li>
              <li class="list-group-item" data-toggle="modal" data-target="#edit-client">Block</li>
              <li class="list-group-item" @click="$router.push('/access-settings')">Access settings</li>
              <li class="list-group-item" >Delete</li>
            </ul>
          </div>
      </div>
    </div>
  </div>



</div>
</template>

<script>
import AddCashier from "@/modals/Settings/AddCashier";
export default {
  name: "PersonalSettings",
  components:{
    AddCashier
  },
    data(){
      return{
        employees:[],
      }
  },

  methods:{
    getStaff(){
      this.axios.get(this.url('getClients'))
      .then((res)=>{
        this.employees = res.data.objects
        console.log(this.clientList, '000000000000000000')
      })
    }
  },
}
</script>

<style scoped>

</style>