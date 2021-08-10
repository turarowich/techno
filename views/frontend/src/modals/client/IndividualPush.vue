<template>
  <div class="modal fade right "  id="individual-push" tabindex="-1" role="dialog" aria-labelledby="add-products" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: calc(100% - 250px);" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header justify-content-start align-items-center">
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/xBlack.svg" alt="">
              </span>
          </button>
          <h3 class="modal-title">Schedule push</h3>
        </div>
        <div class=" myModal-body">
          <span class="header-description">Configure Unique Push Notifications<br> to send to customers</span>

          <div class="d-flex align-items-center mb-4">
            <button class="app-buttons-item adding-btns mb-0"  data-toggle="modal" data-target="#add-push"><span>+ Add push</span></button>
            <button class="app-buttons-item" @click="deleteAllPushes"><img class="img-btn" src="../../assets/icons/trash_empty.svg" ><span>Remove</span></button>
          </div>

          <div class="d-flex main-content-header">
            <div class="table-head" style="width: 3%;"><label class="custom-checkbox"><input @click="toggleSelect" v-model="selectAll" type="checkbox"><span class="checkmark"></span></label></div>
            <div class="table-head" style="width: 43%;">Name</div>
            <div class="table-head" style="width: 30%;">Gap</div>
            <div class="table-head" style="width: 21%;">Action</div>
            <div class="table-head" style="width:3%"></div>
          </div>
          <div>
            <AddPush v-bind:getSchedulePushes="getSchedulePushes"/>
            <EditPush v-bind:edit_push="edit_push"/>
            <div class="table-content">
              <div class="table-item d-flex align-items-center" v-for="pushes in schedulePushes"  :key="pushes._id" >
                <div  style="width: 3%;"><label class="custom-checkbox"><input @click="checkMainSelect" :ref="'select'+pushes._id" type="checkbox"  ><span class="checkmark"></span></label></div>
                <div  class="d-flex flex-column justify-content-center"  style="width: 43%;">
                  <p class="mb-0">{{pushes.title}}</p>
                  <p class="mb-0" style="color:#858585">{{pushes.clients.length}} clients</p>
                </div>
                <div  style="width: 30%;">{{pushes.byWeek ? 'EveryWeek' : 'Everymonth'}}</div>
                <div  style="width: 21%;">
                  <label class="switch">
                    <input v-model="pushes.isActive" type="checkbox" data-toggle="collapse" data-target="#collapse-limit" aria-expanded="true" aria-controls="collapse-limit">
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
                        <li class="list-group-item"  data-toggle="modal" data-target="#edit-push" @click="edit_push = pushes">Edit</li>
                        <li class="list-group-item" @click="deletePush(pushes._id)">Delete</li>
                      </ul>
                    </div>
                  </div>
                </div>
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
import EditPush from "./EditPush";
import Swal from "sweetalert2";
import $ from "jquery";

export default {
  name: "Push notification",
  components:{
    AddPush,
    EditPush
  },
  data(){
    return{
      schedulePushes:[],
      deletedPushes:[],
      selectAll:false,
      edit_push:''
    }
  },
  computed:{
    countLength(){
      return this.schedulePushes.length;
    }
  },
  methods:{
    checkAll(item) {
      return  this.$refs[`select${item._id}`].checked === true
    },
    toggleSelect: function () {
      this.schedulePushes.forEach((user)=> {
        if(this.$refs[`select${user._id}`] !== undefined && this.$refs[`select${user._id}`] !== null){
          if(this.selectAll === false){
            this.$refs[`select${user._id}`].checked = true
          }
          else{
            this.$refs[`select${user._id}`].checked = false
          }
        }
      });
    },
    checkMainSelect() {
      if(this.schedulePushes.every(this.checkAll)){
        this.selectAll = true;

      }
      else{
        this.selectAll = false;
      }

    },
    getSchedulePushes(){
      this.axios.get(this.url('getSchedulePushes'))
      .then((res)=>{
          this.schedulePushes = res.data.objects;
      })
    },
    deletePush(id){
      Swal.fire({
        showConfirmButton: true,
        html: 'Are you sure to remove this <br>push',
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
          this.axios.delete(this.url('deleteSchedulePush', id))
              .then(()=>{
                this.getSchedulePushes()
                Swal.fire({
                      title:'Success',
                      timer:1500,
                      text:'Push has been removed',
                      showConfirmButton:false,
                      position: 'top-right',
                      customClass:{
                        popup:'success-popup',
                        content:'success-content',
                        title:'success-title',
                        header:'success-header',
                        image:'success-img'
                      },
                    }
                )
              }).catch((error)=>{
            if(error.response && error.response.data){
              this.$warningAlert(error.response.data.msg)
            }
          });
        }
      })
    },
    deleteAllPushes() {
      this.schedulePushes.forEach((user)=> {
        if(this.$refs[`select${user._id}`] !== undefined && this.$refs[`select${user._id}`] !== null){
          if(this.$refs[`select${user._id}`].checked === true){
            this.deletedPushes.push(user._id)
          }
        }
      });
      if(this.deletedPushes.length > 0){
        Swal.fire({
          showConfirmButton: true,
          html: 'Are you sure to remove these<br>pushes',
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
            this.axios.post(this.url('deleteSchedulePushes'),{objects: this.deletedPushes})
                .then(()=>{
                  this.deletedPushes = []
                  this.getSchedulePushes()
                  $('#parent-check').prop('checked',false)
                  this.$successAlert('All clients have been removed')
                }).catch((error)=>{
              if(error.response && error.response.data){
                this.$warningAlert(error.response.data.msg)
              }
            });
          }
          else{
            this.deletedPushes = []
          }

        })
      }
      else{
        this.$warningAlert('Choose pushes to delete')
      }







    },
  },
  mounted(){
    this.getSchedulePushes()

  }



}
</script>

<style scoped>

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

.switch{
  margin-top: .5rem;
  margin-bottom: .5rem;
}
</style>