<template>
<div>
  <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
        <button class="app-buttons-item adding-btns" data-toggle="modal" data-target="#add-cashier"><span>+ Add cashier</span></button>
      </div>
      <div class="d-flex align-items-center">
        <button class="app-buttons-item" @click="removeSelected"><img src="../../assets/icons/trash_empty.svg"><span>Remove</span></button>
        <button class="app-buttons-item" @click="changeStatus(true)"><img src="../../assets/icons/setting-icon/Lock.svg"><span>Block</span></button>
        <button class="app-buttons-item" @click="changeStatus(false)"><img src="../../assets/icons/setting-icon/Unblock.svg"><span>Unblock</span></button>
      </div>
    </div>
    <div class="main-search d-flex align-items-center ">
      <img src="../../assets/icons/search-icon.svg">
      <input class="main-input" type="text" placeholder="Search" v-model="search" @input="checkSelection">
    </div>
  </div>
    <AddCashier  v-on:getEmployees="getEmployees"/>
    <EditCashier v-bind:selectedEmployee="selectedEmployee"  v-on:getEmployees="getEmployees"/>
    <AccessSettings v-bind:selectedEmployee="selectedEmployee"  v-on:getEmployees="getEmployees"/>
  <div class="d-flex main-content-header">
    <div class="table-head" style="width: 3%;"><label class="custom-checkbox"><input type="checkbox" v-model="selectAll" @change="selectAllEmployees"><span class="checkmark"></span></label></div>
    <div class="table-head" style="width: 36%;">Name</div>
    <div class="table-head" style="width: 22%;">Average check</div>
    <div class="table-head" style="width: 12%;">Total</div>
    <div class="table-head" style="width: 12%;">Date</div>
    <div class="table-head" style="width: 12%; ">Status</div>
    <div class="table-head" style="width:3%"></div>
  </div>

  <div class="table-content">
    <div class="table-item d-flex align-items-center"  v-for="employee in  filteredEmployees" :key="employee._id">
        <div  style="width: 3%;"><label class="custom-checkbox"><input  type="checkbox"  v-model="employee.selected" @change="checkSelection"><span class="checkmark"></span></label></div>
        <div  style="width: 36%;" class="d-flex align-items-center pr-3">
          <div class="table-img">
            <div v-if="employee.avatar">
                <img  class="image-preview" :src="makeImg(employee.avatar)">    
            </div>
            <div v-else class="first-letter"> {{ employee.name.slice(0, 1) }}</div>
          </div>
          {{employee.name}}
        </div>
        <div  style="width: 22%;">{{employee.averageCheck}}</div>
        <div  style="width: 12%;"></div>
        <div  style="width: 12%;">{{ employee.birthDate ? employee.birthDate.slice(0, 10) : '' }}</div>
        <div  style="width: 12%;">{{ employee.isBlocked ? 'blocked' : 'active'}}</div>
        <div class="dropleft dropMenu">
          <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img  src="../../assets/icons/three-dots.svg"
                  class="three-dots">
          </div>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
            <ul class="list-group" >
              <li class="list-group-item" data-toggle="modal" data-target="#edit-cashier" @click="selectEmployee(employee)">Edit</li>
              <li class="list-group-item" v-if="employee.isBlocked" @click="changeStatus(false, employee)">Unblock</li>
              <li class="list-group-item" v-else @click="changeStatus(true, employee)">Block</li>
              <li class="list-group-item" data-toggle="modal" data-target="#edit-access-settings" @click="selectEmployee(employee)">Access settings</li>
              <li class="list-group-item"  @click="removeSelected(employee)">Delete</li>
            </ul>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import AddCashier from "@/modals/Settings/AddCashier";
import EditCashier from "@/modals/Settings/EditCashier";
import AccessSettings from "@/modals/Settings/AccessSettings";
import Swal from 'sweetalert2';
export default {
    name: "PersonalSettings",
    components:{
        AddCashier,
        EditCashier,
        AccessSettings
    },
    data(){
        return{
            employees:[],
            selectedEmployee:{},
            selectAll: false,
            search: ""
        }
    },
    computed:{
        filteredEmployees(){
            if(this.employees){
                return this.employees.filter(employee => {
                    if(employee.name){
                        return employee.name.toLowerCase().includes(this.search.toLowerCase())
                    }
                })
            }
            return []
        }
    },
    methods:{
        selectAllEmployees(){
            this.filteredEmployees.map((employee) => employee['selected'] = this.selectAll);

        },
        checkSelection(){
            let selected =  this.filteredEmployees.filter(employee => {
                return employee.selected 
            })
            this.selectAll = selected.length == this.filteredEmployees.length
        },
        removeSelected(onlyOne=null){

            let selected =  this.filteredEmployees.filter(employee => {
                return employee.selected 
            })  
            if(onlyOne){
                selected = [onlyOne]
            }
            if(selected.length){
                Swal.fire({
                    showConfirmButton: true,
                    html: 'Are you sure to remove this employee',
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
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



                }).then((result) => {
                        if (result.isConfirmed) {
                            this.axios.post(this.url('deleteEmployees'),{
                                objects: selected
                            })
                            .then((res)=>{
                                this.employees = res.data.objects;

                                this.$successAlert('Cashier has been deleted')
                            }).catch((err)=>{
                                this.$warningAlert('Something went wrong')
                                console.log(err)
                            })
                        }
                    })
            }else{
                this.$warningAlert('Need to selecte at least 1')
            }
        },
        changeStatus(isBlocked, onlyOne=null){
            let selected =  this.filteredEmployees.filter(employee => {
                return employee.selected 
            })
            if(onlyOne){
                selected = [onlyOne]
            }
            if(selected.length){
                console.log(isBlocked)
                this.axios.put(this.url('updateEmployees'),{
                    objects: selected,
                    isBlocked: isBlocked
                })
                .then((res)=>{
                    this.employees = res.data.objects
                    this.$successAlert('Status has been changed')
                }).catch(()=>{
                    this.$warningAlert('Cant change status')
                })
            }else{
                this.$warningAlert('Need to selecte at least 1')
            }
            
        },
        getEmployees(){
            this.axios.get(this.url('getEmployees'))
            .then((res)=>{
                this.employees = res.data.objects
                console.log(this.employees)
            })
        },
        makeImg(name){
            return this.img(name)
        },
        selectEmployee(employee){
            this.selectedEmployee = employee
        },
    },
    mounted(){
        this.getEmployees()
    },
}
</script>

<style scoped>
.first-letter{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #EEEEEE;
    font-weight: 500;
    font-size: 16px;
    color: #606877;
    line-height: 39px;
    text-align: center;
}
.image-preview{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

</style>