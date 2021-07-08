<template>
  <div class="parent-modal">
    <div class="modal myModal  pr-0 fade" id="add_branch" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" role="document"  style="max-width: calc(100% - 250px);">
        <div class="modal-content add_branch_modal_content h-100">
          <div class="modal-header justify-content-start align-items-center ">

          <img data-dismiss="modal" aria-label="Close" class="close"  src="../../assets/icons/xBlack.svg">

            <h3 v-if="edit" class="modal-title">Edit Branch</h3>
            <h3 v-else class="modal-title">Add Branch</h3>

          </div>
          <div class="modal-body add_branch_modal_body d-flex">
            <div class="add_branch_block">
              <h4 class="circle-question">Address</h4>
              <input v-model="branch_object.address" class="cashback-input company-input" placeholder="Enter your company address">
              <div class="d-flex atitude">
                <div class="mr-3" style="width:50%">
                  <label>Longitude</label>
                  <input v-model="branch_object.longitude" class="cashback-input">
                </div>
                <div style="width:50%">
                  <label>Latitude</label>
                  <input v-model="branch_object.latitude" class="cashback-input">
                </div>
              </div>
              <label>Name</label>
              <input v-model="branch_object.name" class="phone-input cashback-input">
              <label>Phone number</label>
              <input v-model="branch_object.phone"  class="phone-input cashback-input" placeholder="Branch phone number">
              <input v-model="branch_object.phone2"  class="phone-input mb-4 cashback-input" placeholder="Branch phone number">
              <label class="working-hours">Working hours</label>
              <div class="week">
                <div @click="setDay('monday')" :class="{active: branch_object.monday.active,selected_active:current_selected_day.day==='monday'}" class="days d-flex justify-content-center align-items-center">MO</div>
                <div @click="setDay('tuesday')" :class="{active: branch_object.tuesday.active,selected_active:current_selected_day.day==='tuesday'}" class="days d-flex justify-content-center align-items-center">TU</div>
                <div @click="setDay('wednesday')" :class="{active: branch_object.wednesday.active,selected_active:current_selected_day.day==='wednesday'}" class="days d-flex justify-content-center align-items-center">WE</div>
                <div @click="setDay('thursday')" :class="{active: branch_object.thursday.active,selected_active:current_selected_day.day==='thursday'}" class="days d-flex justify-content-center align-items-center">TH</div>
                <div @click="setDay('friday')" :class="{active: branch_object.friday.active,selected_active:current_selected_day.day==='friday'}" class="days d-flex justify-content-center align-items-center">FR</div>
                <div @click="setDay('saturday')" :class="{active: branch_object.saturday.active,selected_active:current_selected_day.day==='saturday'}" class="days d-flex justify-content-center align-items-center">SA</div>
                <div @click="setDay('sunday')" :class="{active: branch_object.sunday.active,selected_active:current_selected_day.day==='sunday'}" class="days d-flex justify-content-center align-items-center">SU</div>
              </div>
              <div v-if="current_selected_day.day !==''" class="d-flex working-phones">
                <div class="mr-3 d-flex align-items-center">
                  <label class="mb-0 mr-3 working-label">From</label>
                  <select class="form-control" v-model="current_selected_day.object.start">
                    <option v-for="(hour,index) in working_hours" :key="index" :value="hour">{{hour}}</option>
                  </select>
                </div>
                <div class="d-flex align-items-center">
                  <label class="mb-0 mr-3 working-label">To</label>
                  <select class="form-control" v-model="current_selected_day.object.end" aria-label="Default select example">
                    <option v-for="(hour,index) in working_hours" :key="index" :value="hour">{{hour}}</option>
                  </select>
                </div>
                <div style="display: flex;justify-content: center;align-items: center;margin-left: 2px;flex: 1;">
                  <span class="mr-2">Is a work day</span>
                  <label class="switch d-flex">
                    <input v-model="current_selected_day.object.active" type="checkbox">
                    <span class="slider round"></span>
                  </label>
                </div>

              </div>
            </div>

            <div class="map-address margin-20">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.5580245248984!2d74.60367225038095!3d42.88217200986009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb74559ed9e25%3A0x514fbb81abe4553e!2sOlolohausErkindik!5e0!3m2!1sen!2skg!4v1620191676519!5m2!1sen!2skg" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>

          </div>
          <div class="d-flex">
            <button @click="saveBranch" class="save">Save</button>
            <button v-if="edit" @click="removeBranch(branch_object._id)" class="remove_branch">Remove branch</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Swal from "sweetalert2";
export default {
  name: "AddBranch",
  props:  {
    edit_branch: Object,
  },
  data(){
    return{
      working_hours:[
        '01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00',
        '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','00:00',
      ],
      current_selected_day:{
        day:'',
        object:{
          active: true,
          start: "",
          end: "",
        },
      },
      branch_object:{
        address: "",
        name: "",
        latitude: "",
        longitude: "",
        phone: "",
        phone2: "",
        monday: {active: true, start: "08:00", end: "17:00"},
        tuesday: {active: true, start: "08:00", end: "17:00"},
        wednesday: {active: true, start: "08:00", end: "17:00"},
        thursday: {active: true, start: "08:00", end: "17:00"},
        friday: {active: true, start: "08:00", end: "17:00"},
        saturday: {active: true, start: "08:00", end: "17:00"},
        sunday: {active: true, start: "08:00", end: "17:00"},
      },
    }
  },
  computed:{
    edit(){
      return Object.keys(this.edit_branch).length !== 0;
    },
  },
  methods:{
    setDay(day){
      // let day_obj = this.branch_object[day];
      this.current_selected_day.object=this.branch_object[day];
      this.current_selected_day.day = day;
      // console.log(day_obj);
    },
    saveBranch(){
      //check
      let messages = [];
      let that = this;
      if(this.branch_object.address.length<1){messages.push('Fill in Address')}
      if(messages.length>0){
        messages.forEach(function (mess){
          that.$warningAlert(mess);
        })
        return;
      }

      let url = this.url('addBranch');
      let alert_text = "Added";
      if(this.edit){
        alert_text = 'Updated';
        url = this.url('updateBranch');
      }

      this.axios.post(url, {
        branch:this.branch_object,
      }).then(function (response) {
        that.$successAlert(alert_text);
        $('#add_branch').modal('hide');
        that.$emit('sendUpdate');
        console.log(response);
      }).catch(function(error){
        if (error.response) {
          // console.log(error.response.status);
          // console.log(error.response.headers);
          that.$warningAlert(Object.values(error.response.data.errors));
        }
      });
    },

    removeBranch(id){
      let that = this;
      let url = this.url('deleteBranch')+id;



      Swal.fire({
        showConfirmButton: true,
        html: 'Are you sure to remove this <br>branch',
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

      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(url).then(function () {
            that.$successAlert("Removed");
            $('#add_branch').modal('hide');
            that.$emit('sendUpdate');
          }).catch(function(error){
            if (error.response) {
              // console.log(error.response.status);
              // console.log(error.response.headers);
              that.$warningAlert(Object.values(error.response.data.errors));
            }
          });
        }
      })






    },
  },
  watch:{
    edit_branch:{
      handler(val, oldVal) {
        console.log('edit_branch list changed',val, oldVal)
        if(this.edit){
          let copy = $.extend(true,{},this.edit_branch);
          this.branch_object = copy;
        }else{
          //duplicate redo later
          this.branch_object ={
            address: "",
            name: "",
            latitude: "",
            longitude: "",
            phone: "",
            phone2: "",
            monday: {active: true, start: "08:00", end: "17:00"},
            tuesday: {active: true, start: "08:00", end: "17:00"},
            wednesday: {active: true, start: "08:00", end: "17:00"},
            thursday: {active: true, start: "08:00", end: "17:00"},
            friday: {active: true, start: "08:00", end: "17:00"},
            saturday: {active: true, start: "08:00", end: "17:00"},
            sunday: {active: true, start: "08:00", end: "17:00"},
          }
        }
      },
      deep: true
    },
    current_selected_day: {
      // eslint-disable-next-line no-unused-vars
      handler(val, oldVal) {
        let day = val.day;
        // delete val.day;
        this.branch_object[day]=val.object;
      },
      deep: true
    },
  },
}
</script>

<style scoped>

.week{
  display: flex;
  margin-bottom: 20px;
}
.circle-question{
  font-size: 14px;
  margin-bottom: 8px;
}
.cashback-input{
  width: 100%;
}
.company-input{
  margin-bottom: 25px;
}
.atitude{
  margin-bottom: 30px;
}
.map-address{
  flex: 1;
  height: 510px;
  margin-left: 10px;
}
.add_branch_block{
  flex: 1;
  margin-right: 10px;
}
.days{
  background: #F8F9FB;
  border-radius: 4.64125px;
  width: 48px;
  height: 45px;
  color:#858585;
  cursor:pointer;
  margin-right: 10px;
}
.days.active{
  background: #616cf5;
  color:white;
}
.days:hover{
  background: #7479b5;
  transition: .3s;
  color:#fff;
}
.phone-input{
  margin-bottom:12px;
}
.working-hours{
  margin-bottom: 20px;
}
.working-phones label{
  color:#858585;

}
.working-phones{
  margin-bottom: 40px;
  transition: 1s;
}
.working-phones div{
  flex: 1;
}
.working-phones select{
  width: 70%;
}
.margin-20{
  margin-bottom: 20px;
}
.add_branch_modal_content{
  border-radius:0;
  border:none;
}
.save{
  width: 120px;
  margin-bottom: 30px;
}
.remove_branch{
  background: #E9ECFF;
  border-radius: 5px;
  color: #616CF5;
  height: 37px;
  display: flex;
  align-items: center;
  font-size: 16px;
  transition: .3s;
  border: none;
  justify-content: center;
  margin-left: 20px;
  width: 170px;
}
.modal-content{
  border-bottom: none;
  padding: 18px 24px;
}
.modal-content .modal-header{
  padding:0;
  margin-bottom: 30px;
}
.add_branch_modal_body{
  padding: 0;
}
.selected_active{
  border:1px solid #000;
  transition: .3s;
  color:#000 !important;

}
</style>