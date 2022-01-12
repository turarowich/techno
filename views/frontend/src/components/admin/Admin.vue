<template>
<div class="contentWrapper">
<!--    <div class="admin-header">-->
<!--      <div style="margin-right: 20px;">-->
<!--        <img src="../../assets/img/logoAdmin.svg">-->
<!--      </div>-->
<!--      <div style="display: flex;justify-content: space-between;flex-direction: column;">-->
<!--        <h3 class="company-title" @click="getCompanies">Superadmin panel</h3>-->
<!--        <span class="total-company">Companies-->
<!--          <span>-->
<!--            {{ companies.length }}-->
<!--          </span>-->
<!--        </span>-->
<!--      </div>-->

<!--      <div @click="logOut" class="d-flex justify-content-center align-items-center" style="margin-left: auto;cursor: pointer;">-->
<!--        <div>-->
<!--          <img src="../../assets/icons/log-out.svg" style="margin-bottom: 3px;">-->
<!--          <span class="total-company" style="margin-left: 8px;">Log out</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <div class="admin-content">
      <div class="d-flex">
        <div class="main-search d-flex align-items-center" style="width: 40%;">
          <img @click="getCompanies" src="../../assets/icons/search-icon.svg">
          <input v-model="searchText" @keyup.enter="getCompanies" class="main-input" type="text" placeholder="Search">

          <div class="catalogSearchClearIcon" v-if="searchText!==''">
            <img @click="searchText='';getCompanies()" src="../../assets/icons/xBlack.svg">
          </div>
        </div>

        <div class="d-flex enable-title" style="margin-left: auto;align-items: center;margin-right: 25px;">
          <label class="switch d-flex">
            <input @change="setAutoBlock" v-model="autoBlock" type="checkbox" >
            <span class="slider round"></span>
          </label>
          <h2 class="cashback-sub-title">Auto block based days left</h2>
        </div>
      </div>

    <div class="d-flex main-content-header">
      <div class="table-head" style="width: 25%;">Name</div>
      <div class="table-head" style="width: 15%;">Phone number</div>
      <div class="table-head" style="width: 10%;">Parser status</div>
      <div @click="setSort('clients')" v-bind:style="[sortBy === 'clients' ? {fontWeight:'bold'}:'']" class="table-head table-link pr-3" style="width: 10%;">
        Clients
        <img v-bind:style="[sortBy === 'clients' && sortOrder === 1 ? {transform:'rotate(180deg)'}:'']" class="date-pol" src="../../assets/icons/polygon.svg">
      </div>
      <div class="table-head table-link d-flex align-items-center pr-3" style="width: 10%;">
        <div @click="setSort('isBlocked')" v-bind:style="[sortBy === 'isBlocked' ? {fontWeight:'bold'}:'']" class="d-flex">
          <div>Status</div>
          <img v-bind:style="[sortBy === 'isBlocked' && sortOrder === 1 ? {transform:'rotate(180deg)'}:'']" class="date-pol"  src="../../assets/icons/polygon.svg">
        </div>
      </div>
      <div @click="setSort('lastLogged')" v-bind:style="[sortBy === 'lastLogged' ? {fontWeight:'bold'}:'']" class="table-head table-link pr-3" style="width: 15%;">
        Last active
        <img v-bind:style="[sortBy === 'lastLogged' && sortOrder === 1 ? {transform:'rotate(180deg)'}:'']" class="date-pol"  src="../../assets/icons/polygon.svg">
      </div>
      <div @click="setSort('daysLeft')" v-bind:style="[sortBy === 'daysLeft' ? {fontWeight:'bold'}:'']" class="table-head table-link pr-3" style="width: 10%;">
        Days left
        <img v-bind:style="[sortBy === 'daysLeft' && sortOrder === 1 ? {transform:'rotate(180deg)'}:'']" class="date-pol"  src="../../assets/icons/polygon.svg">
      </div>
      <div class="table-head table-link pr-3" style="width: 5%;"></div>
    </div>
    <div class="table-content">
      <div v-for="company in companies" :key="company._id"  class="catalog-item table-item d-flex align-items-center" >
        <div class="table-head" style="width: 25%;display: flex;flex-direction: column;">
          <div class="companyName">
            {{ company.companyName }}
          </div>
          <div class="userName">
            {{ company.name }}
          </div>
        </div>

        <div class="table-head" style="width: 15%;">{{company.phone}}</div>
        <div class="table-head" style="width: 10%;">
          <span v-if="company.catalogParserStatus">
            <img  src="../../assets/icons/greenCheck.svg">
          </span>
          <span v-else class="d-flex">
            <img  src="../../assets/icons/redXRound.svg">
          </span>

        </div>
        <div class="table-head table-link pr-3" style="width: 10%;">{{ company.clients }}</div>
        <div class="table-head table-link pr-3" style="width: 10%;">
          <div class="status-admin d-flex align-items-center">
            <span v-if="!company.isBlocked" class="d-flex">
              <span>
                <img  src="../../assets/icons/greenCheck.svg">
              </span>
              <span style="color: #51AE79;margin:1px 0 0 5px;">
                Active
              </span>
            </span>
            <span v-else class="d-flex">
              <span>
                <img  src="../../assets/icons/redXRound.svg">
              </span>
              <span style="color: #E94A4A;margin:1px 0 0 5px;">
                Blocked
              </span>
            </span>
          </div>
        </div>
        <div class="table-head table-link pr-3" style="width: 15%;">{{$moment(company.lastLogged).format('DD/MM/YYYY') }}</div>
        <div class="table-head table-link pr-3" style="width: 10%;"><span class="days-left">{{ company.daysLeft }}</span></div>
        <div  style="width:5%;">
          <div class="dropleft dropMenu">
            <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img  src="../../assets/icons/three-dots.svg"
                    class="three-dots">
            </div>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
              <ul class="list-group " >
                <li class="list-group-item" data-toggle="modal" data-target="#editCompanyModal" @click="selectedCompany=company" >Edit</li>
                <li v-if="!company.isBlocked" class="list-group-item" @click="updateCompanyAccess(company,'block')">Block</li>
                <li v-else class="list-group-item" @click="updateCompanyAccess(company,'unBlock')">Unblock</li>
<!--                <li class="list-group-item">Delete</li>-->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <EditCompany @childDoneEditing="doneEditing()" v-model:selectedCompany="selectedCompany" />
</template>

<script>
import EditCompany from "@/modals/admin/EditCompany";
import Swal from "sweetalert2";
export default {
  name: "AdminPage",
  data(){
    return{
      autoBlock:false,
      companies:[],
      selectedCompany:{},
      searchText:"",
      sortBy:"companyName",
      sortOrder:1,
    }
  },
  components:{
    EditCompany,
  },
  computed: {
    currentRouteName() {
      console.log(this.$route.name);
      return this.$route.name;
    },
  },
  methods:{
    doneEditing(){
      console.log("dd");
    },
    async setAutoBlock() {
      const options = {
        headers: {
          "x-admin": true,
          "x-admin-token": localStorage.getItem('tokenAdmin'),
        },
        params: {

        },
      }
      await this.axios.patch(this.url('updateAdminSettings'), {
        "autoBlock": this.autoBlock
      }, options)
          .then((res) => {
            console.log(res);
            this.getAdminSettings();
            this.$successAlert('Status has been changed')
          }).catch(() => {
            this.$warningAlert('Cant change status')
          })
    },
    logOut(){
      this.$router.push('/')
      localStorage.removeItem('token');
      localStorage.removeItem('tokenAdmin');
    },
    setSort(type){
      if(this.sortBy === type){
        this.sortOrder = this.sortOrder === 1 ? -1: 1;
      }else{
        this.sortBy = type;
        this.sortOrder = 1;
      }
      this.getCompanies();
    },
    async  getCompanies(){
      const options = {
        headers: {
          "x-admin": true,
          "x-admin-token": localStorage.getItem('tokenAdmin'),
        },
        params: {
          "searchText":this.searchText,
          "sortByProperty":this.sortBy,
          "sortOrder":this.sortOrder,
        },
      }
      await this.axios.get(this.url('getCompanies'),options)
        .then((response) => {
          console.log(response.data);
          this.companies = response.data.objects;
        })
    },
    async  getAdminSettings(){
      const options = {
        headers: {
          "x-admin": true,
          "x-admin-token": localStorage.getItem('tokenAdmin'),
          },
        params: {
        },
      }
      await this.axios.get(this.url('getAdminSettings'),options)
          .then((response) => {
            this.autoBlock = response.data.object.autoBlock;
          })
    },
    async updateCompanyAccess(company,type="block"){
      const options = {
        headers: {
          "x-admin": true,
          "x-admin-token": localStorage.getItem('tokenAdmin'),
        },
        params: {

        },
      }
      Swal.fire({
        showConfirmButton: true,
        html: `Are you sure u want to ${type}<br> ${company.name}`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Block',
        buttonsStyling:false,
        customClass:{
          popup: 'sweet-delete',
          confirmButton: 'confirm-btn',
          cancelButton:'cancel-btn',
          actions:'btn-group',
          content:'content-sweet',
          closeButton:'close-btn'
        },
        showClass: {
          popup: 'animate__animated animate__slideInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.axios.patch(this.url('updateCompanyAccess',company.id),{
            "type":type
          },options)
              .then((res)=>{
                console.log(res);
                this.getCompanies();
                this.$successAlert('Status has been changed')
              }).catch(()=>{
            this.$warningAlert('Cant change status')
          })
        }
      })
    },
  },
  mounted() {
    this.getCompanies();
    this.getAdminSettings();
  },

}
</script>

<style scoped>
.router-link-active{
  background: none;
}
.loyalty-menu{
  margin-bottom: 10px;
}
.loyalty-nav{
  border-bottom: 1px solid #D3D3D3;
  margin-bottom: 22px;
}
.loyalty-link{
  color:#999;
  text-decoration: none;
  padding-bottom: 11px;
  border-bottom: 3px solid transparent;
}
.loyalty-link.active{
  color:#222;
  border-bottom: 3px solid #616CF5;
  padding-bottom: 11px;

}

.loaylty-list{
  list-style-type:none;
  margin-right: 20px;
}
.companyName{
  font-size: 16px;
  line-height: 19px;
  color: #222222;
}
.userName{
  font-size: 14px;
  line-height: 17px;
  color: #858585;
}
.table-content{
  height: 100%;
  overflow-y: overlay;
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
.table-item{
  height: 60px;
  padding: 10px 25px;
}
.main-search{
  margin: 25px;

}
.admin-header{
  height: 60px;
  display: flex;
  justify-content: left;
  margin-bottom: 25px;
}
.company-title{
  font-size: 24px;
  font-weight: 700;
}
.total-company{
  font-size: 16px;
  color:#858585;
}
.main-content-header{
  padding: 10px 25px;
}
.admin-content{
  border:1px solid #D3D3D3;
  border-radius: 10px;
}

/*.contentWrapper{*/
/*  margin:30px 30px;*/
/*}*/
</style>