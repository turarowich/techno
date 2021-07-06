<template>
<div>
  <div class="row mb-5">
    <div class="col-lg-5">
      <h2 class="cashback-title address-titles">Address delivery</h2>
      <div class="d-flex margin-10">
        <label class="switch d-flex">
          <input v-model="delivery_status" type="checkbox">
          <span class="slider round"></span>
        </label>
        <h2 class="catalog-sub-title">Delivery</h2>
      </div>
      <p class="catalog-description margin-30">
        You can customize the delivery method
      </p>
      <h2 class="catalog-sub-title mb-2">Delivery description</h2>
      <p class="catalog-description margin-20">
        Describe the possible delivery options
      </p>
      <textarea v-model="deliveryDescription" class="general-area"></textarea>

      <div v-for="option in deliveryOptions" :key="option._id">
        <div class="catalog-sub-title">
          {{option.name}}
        </div>
        <div class="d-flex branch_list_item">
          <div class="branch_list_item_number">{{option.minPrice}}</div>
          <div @click="getEditDeliveryOption(option._id)" style="color:#616cf5;cursor: pointer">Edit</div>
          <div @click="removeDeliveryOption(option._id)" style="margin-left:20px;cursor: pointer">
            <img src="../../assets/icons/greyX.svg">
          </div>
        </div>
      </div>

      <span @click="clearEditDelivery" class="add-branch" style="color:#616cf5;cursor: pointer;" data-toggle="modal" data-target="#add_delivery_option">+ Add delivery option</span>
      <button @click="save" type="button" class="save">Save</button>
    </div>

    <div class="col-lg-5">
      <div v-for="branch in branches" :key="branch._id">
        <div class="catalog-sub-title">
          {{branch.address}}
        </div>
        <div class="d-flex branch_list_item">
          <div class="branch_list_item_number">{{branch.phone}}</div>
          <div @click="getEdit(branch._id)" style="color:#616cf5;cursor: pointer">Edit</div>
        </div>
      </div>

      <span @click="clearEdit" class="add-branch" style="color:#616cf5;cursor: pointer" data-toggle="modal" data-target="#add_branch">+ Add branch</span>
      <AddBranch :edit_branch="edit_branch"  v-on:sendUpdate="updateData"/>
      <AddDeliveryOption :edit_delivery="edit_delivery" v-on:sendUpdate="updateData"/>
    </div>

  </div>
</div>
</template>

<script>
import AddBranch from "@/modals/client/AddBranch";
import AddDeliveryOption from "@/modals/client/AddDeliveryOption";
import $ from "jquery";
import Swal from "sweetalert2";
export default {
  name: "AddressDelivery",
  components:{
    AddBranch,
    AddDeliveryOption,
  },
  data(){
    return{
      branches:[],
      deliveryOptions:[],
      edit_branch:{},
      edit_delivery:{},
      delivery_status:false,
      deliveryDescription:'',
    }
  },
  methods:{
    getEdit(id){
      let that=this;
      this.axios.get(this.url('getBranch'),{
        params: {
            "branch":id,
          }
        })
        .then(function (response){
          that.edit_branch = response.data.object;
          $('#add_branch').modal('show');
          console.log(response);
        }).catch((error)=>{
                if(error.response.data && !error.response.data.errors){
                    that.$warningAlert(error.response.data.msg)
                }
                console.log(error);
        });
    },
    getEditDeliveryOption(id){
      let that=this;
      this.axios.get(this.url('getDeliveryOption'),{
        params: {
          "delivery":id,
        }
      })
      .then(function (response){
        that.edit_delivery = response.data.object;
        $('#add_delivery_option').modal('show');
      }).catch((error)=>{
            if(error.response.data && !error.response.data.errors){
                that.$warningAlert(error.response.data.msg)
            }
            console.log(error);
      });
    },
    clearEdit(){
      this.edit_branch = {};
    },
    clearEditDelivery(){
      this.edit_delivery= {};
    },
    removeDeliveryOption(id){
      let that = this;
      let url = this.url('deleteDelivery')+id;

      Swal.fire({
        showConfirmButton: true,
        html: 'Are you sure to remove this <br>option',
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
          this.axios.delete(url).then(function () {
            that.$successAlert("Removed");
            that.updateData();
          }).catch(function(error){
            if(error.response.data && !error.response.data.errors){
                that.$warningAlert(error.response.data.msg)
            }
            if (error.response) {
              // console.log(error.response.status);
              // console.log(error.response.headers);
              that.$warningAlert(Object.values(error.response.data.errors));
            }
          });
        }
      })





    },
    updateData(){
      console.log('got emit');
      let that = this;
      this.axios.get(this.url('getSettings'))
        .then(function (response){
          let settings = response.data.object;
          that.id= settings._id || '';
          that.branches = response.data.branches || [];
          that.deliveryOptions = response.data.deliveries || [];
        })
    },
    save(){
      let that=this;
      let url = this.url('updateSettings');
      this.axios.put(url, {
        delivery:this.delivery_status,
        deliveryDescription:this.deliveryDescription,
      }).then(function (response) {
        console.log(response);
        that.$successAlert('Updated');
      }).catch(function(error){
        if (error.response) {
          // console.log(error.response.status);
          // console.log(error.response.headers);
          that.$warningAlert(Object.values(error.response.data.errors),"Errors");
        }
      });
    },
  },
  beforeCreate(){
    let that = this;
    this.axios.get(this.url('getSettings'))
        .then(function (response){
          let settings = response.data.object;
          that.id= settings._id || '';
          that.delivery_status= settings.delivery || false;
          that.deliveryDescription= settings.deliveryDescription || '';
          that.branches = response.data.branches || [];
          that.deliveryOptions = response.data.deliveries || [];
        })
  },
}
</script>

<style scoped>

.catalog-description{
  font-size: 14px;
  color:#b0b0b0;
  margin-bottom: 0;
}
.save{
  width: 120px;
}
.catalog-sub-title{
  font-size: 16px;
  font-weight: normal;
}
.add-branch{
  display: inline-block;
  margin-bottom: 90px;
}
.address-titles{
  margin-bottom:30px;
}
.margin-10{
  margin-bottom: 10px;
}
.margin-20{
  margin-bottom: 20px;
}
.margin-30{
  margin-bottom: 30px;
}
.general-area{
  height: 100px;
  margin-bottom: 30px;
}
.branch_list_item {
  border-bottom: 1px solid #D3D3D3;
  margin-bottom: 22px;
  padding-bottom: 10px;
}
.branch_list_item_number {
  flex: 1;
}
</style>