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
                <img  class="img"  v-if="typeof currentData.avatar === 'string'" :src="imgSrc+'/'+currentData.avatar">
                <img  class="img" v-else-if="typeof currentData.avatar === 'object'" :src="imagePreview">
                <img  class="img" v-else src="../../assets/icons/chat.svg">
                <input @change="uploadPhoto($event)" type="file" class="d-none" id="add-user-img">
                <label for="add-user-img"><img class="add-profile-img" src="../../assets/icons/addBtn.svg"></label>
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
              <input v-model="currentData.birthDate" class="calendar-input" id="birthDate">
              <img class="calendar-img" src="../../assets/icons/Calendar.svg">
            </div>

            <label class="gender-label">Gender</label>

            <div class="radio-toolbar">
              <div class="d-flex align-items-center mr-4">
                <input  type="radio" id="radioMale" :checked="currentData.gender === 'men'" @click="currentData.gender = 'men'" name="gender" value="apple" >
                <label for="radioMale"></label>
                <span class="male">Male</span>
              </div>
              <div class="d-flex align-items-center">
                <input  type="radio" id="radioFemale" :checked="currentData.gender === 'woman'"  @click="currentData.gender = 'woman'" name="gender" value="orange">
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
  props:['select_client', 'getClients','getClient'],
  data(){
    return{

      currentData:{
        avatar:''
      },
      imgSrc:''
    }
  },
  computed:{
    imagePreview() {
      if(this.currentData.avatar){
        return URL.createObjectURL(this.currentData.avatar)
      }
      return null
    }
  },
  methods:{
    uploadPhoto(event){
      var valid = ["image/png", "image/jpg", "image/jpeg"];
      if(event.target.files[0] && event.target.files[0].size > 3000000){
        this.$warningAlert('Image size exceed 3 mb');
      }else if(event.target.files[0] && !valid.includes(event.target.files[0].type)){
        this.$warningAlert('Image type can be jpg or png');
      }else{
        this.currentData.avatar = event.target.files[0]
      }
    },
 onSubmit(id){
      const updatedData = this.currentData;
      let form = new FormData;
      if(updatedData.avatar){
        form.append('avatar', updatedData.avatar)
      }

      if(!updatedData.birthDate){
        updatedData.birthDate = new Date.now()
      }

      form.append('birthDate', updatedData.birthDate)
      form.append('gender',updatedData.gender)
      form.append('name', updatedData.name);
      form.append('email',updatedData.email);
      form.append('phone',updatedData.phone);

      this.axios.put(this.url('updateClient',id),form)
      .then(()=>{
        if(this.$route.path.startsWith('/edit-client-page')){
          this.getClient()
        }
        else{
          this.getClients()
        }
        this.$informationAlert("Change are saved")
        $('#edit-client').modal("hide")
      }).catch((error)=>{
            if(error.response && error.response.data){
                this.$warningAlert(error.response.data.msg)
            }
        });

    },
    selectDate(){
      new this.$lightpick({
        field: document.getElementById('birthDate'),
        orientation:'top',
        format:'',
        onSelect: date=>{
          this.currentData.birthDate = date.format('YYYY-MM-DD')
        }
      });
    }
  },
  mounted(){
    this.selectDate();
    this.imgSrc = this.$server;


  },
  watch:{
    select_client(newCat){
      this.currentData = Object.assign({}, newCat)
      if(this.currentData.birthDate){
        this.currentData.birthDate = this.currentData.birthDate.slice(0,10)
      }
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
.client-profile-img .img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius:50%;
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