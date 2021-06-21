<template>

  <div class="modal fade right"  id="edit-client" tabindex="-1" role="dialog" aria-labelledby="edit-client" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: 580px" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header align-items-center">
          <h3 class="modal-title">Edit user</h3>
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
          </button>
        </div>
        <div class=" myModal-body">
          <form  class="modal-form ">

            <div class="client-profile-img">
                <img src="../../assets/icons/clientUser.svg">
                <img class="add-profile-img" src="../../assets/icons/addBtn.svg">
            </div>

            <label>Name</label><br>
            <input v-model="currentData.name" class="cashback-input">
            <label>Email</label><br>
            <input v-model="currentData.email" class="cashback-input margin-b">

            <label>Phone number</label>
            <div class="d-flex phones">
              <select class="form-control select-phone mr-2" aria-label="Default select example">
                <option>+996</option>
                <option>+792</option>
                <option>+996</option>

              </select>
              <input v-model="currentData.phone" class="cashback-input" style="width:80%">
            </div>

            <label>Birthday</label>
            <div class="calendar d-flex align-items-center">
              <input v-model="currentData.birthDate" class="calendar-input" id="calendar">
              <img class="calendar-img" src="../../assets/icons/Calendar.svg">
            </div>

            <label class="gender-label">Gender</label>

            <div class="radio-toolbar">
              <div class="d-flex align-items-center mr-4">
                <input type="radio" id="radioMale" name="radioFruit" value="apple" checked>
                <label for="radioMale"></label>
                <span class="male">Male</span>
              </div>
              <div class="d-flex align-items-center">
                <input type="radio" id="radioFemale" name="radioFruit" value="orange">
                <label for="radioFemale"></label>
                <span class="maled">Female</span>
              </div>
            </div>
            <div class="modal-btn d-flex">
              <button class="save" @click.prevent="onSubmit(currentData._id)">Save</button>
              <button class="remove">Remove</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "EditClient",
  props:['select_client', 'getClients'],
  data(){
    return{
      currentData:''
    }
  },
  methods:{

    onSubmit(id){
        this.axios.put(this.url('updateClient',id),{
              name:this.currentData.name,
              email:this.currentData.email,
              phone:this.currentData.phone,
              birthDate:this.currentData.birthDate
      })
      .then(()=>{
        this.$informationAlert("Change are saved")
        this.getClients()
        $('#edit-client').modal("hide")
      }).catch((error)=>{
            if(error.response && error.response.data){
                this.$warningAlert(error.response.data.msg)
            }
        });

    },
    selectDate(){
      new this.$lightpick({
        field: document.getElementById('calendar'),
        orientation:'top',
        format:'',
        autoclose:true,
        onSelect: function(date){
          this.currentData.birthDate = date.format()
        }
      });
    }
  },
  mounted(){
    this.selectDate()

  },
  watch:{
    select_client(newCat){
      this.currentData = Object.assign({}, newCat)
    }
  },
}
</script>

<style scoped>
.calendar-img{
  width: 20px;
  height: 20px;
}
.modal-form label{
  margin-bottom: 10px;
}
.modal.fade .modal-dialog{
  transform: translate3d(100vw, 0, 0);

}
.modal.fade:not(.in).right .modal-dialog {
  -webkit-transform: translate3d(0,0,0);
  transform: translate3d(0, 0, 0);
  transition:0.4s;
}
.phones{
  margin-bottom: 29px;
}
.phones .cashback-input{
  margin-bottom: 0;
}

.gender-label{
  margin-bottom: 25px;
}
.modal-header{
  padding: 30px 30px;
}
.myModal-body{
  padding: 0 30px;
}
.client-profile-img{
  width: 81px;
  height: 81px;
  border-radius:50%;
  background: #F4F4F4;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 28px;

}
.add-profile-img{
  width: 21px;
  height: 21px;
  position: absolute;
  bottom: 0;
  left: 65%;
}
.cashback-input{
  width: 100%;
  margin-bottom: 15px;
}
.select-phone{
  width: 20%;
  color:#222;
}
.margin-b{
  margin-bottom: 25px;
}
/*==============Radio Button==============*/


.radio-toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 80px;

}


.radio-toolbar input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.radio-toolbar label {
  display: inline-block;
  margin-bottom: 0;
  margin-right: 10px;
  width: 13px;
  height: 13px;
  border: 1px solid #E3E3E3;
  box-sizing: border-box;
  border-radius: 3px
}
.radio-toolbar input[type="radio"]:checked + label {
  background-color: #616cf5;
  border:none;

}

</style>