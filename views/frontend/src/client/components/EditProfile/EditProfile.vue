<template>
<div class="container container-profile">
  <div class="profile-content">
    <div class="d-flex align-items-center path-box mt-5" @click="$router.go(-1)"><img class="mr-3" src="../../../assets/clients/slide.svg"><h3 class="path-title">Edit profile</h3></div>


    <form class="edit-form">
         <div class="row">
           <div class="col-lg-6">
             <label class="personal-label">Name</label><br>
             <input v-model="user.name" class="edit-input cashback-input" placeholder="Name">
             <label class="personal-label">Email</label><br>
             <input  v-model="user.email"  class="edit-input cashback-input email" placeholder="Your email">
            <span class="gender">Gender</span>

             <div class="radio-toolbar">
               <div class="d-flex align-items-center mr-5">
                 <input type="radio" id="radioApple" v-model="user.gender" name="radioFruit" value="male">
                 <label for="radioApple"></label>
                 <span class="male">Male</span>
               </div>
               <div class="d-flex align-items-center">
                 <input type="radio" id="radioOrange" v-model="user.gender" name="radioFruit" value="female">
                 <label for="radioOrange"></label>
                 <span class="male">Female</span>
               </div>
             </div>

             <div class="d-flex">
               <button type="button" @click="save" class="save mr-2">Save</button>
               <button class="cancel">Cancel</button>
             </div>
           </div>

           <div class="col-lg-6">
             <label class="personal-label">Phone number</label><br>
             <input v-model="user.phone" class="edit-input cashback-input" placeholder="Phone number">
             <label class="personal-label">Birthday</label><br>
             <input id="clientBirthDay" v-model="clientBirthDay.formatted" class="edit-input cashback-input" placeholder="Select a date">

           </div>
         </div>
        </form>
  </div>
</div>
</template>

<script>
export default {
  name: "EditProfile",
  data(){
    return{
      fromDateLightpick:{},
      clientBirthDay:{
        obj:'',
        formatted:'',
      },
    }
  },
  computed:{
    user(){
      return this.$store.getters['Client/getUser'];
    },
    userToken(){
      return this.$store.getters['Client/getUserToken'];
    },
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
  },
  methods:{
    selectDates(){
      let that=this;
      this.fromDateLightpick = new this.$lightpick({
        field: document.getElementById('clientBirthDay'),
        onSelect: function(date){
          that.clientBirthDay.obj = date;
          that.clientBirthDay.formatted = date.format('DD.MM.YYYY');
        }
      });
    },
    save(){
      let that=this;
      const options = {
        headers: {
          "company_url": this.currentCompanyCatalog,
          "x-access-token": this.userToken,
        }

      }
      let url = this.url('updateClient',this.user._id);

      let data = {
        name:this.user.name,
        email:this.user.email,
        phone:this.user.phone,
        gender:this.user.gender,
        birthDate:this.clientBirthDay.obj,
      }
      this.axios.put(url,data,options).then(function (response) {
        console.log(response);
        that.$successAlert('Updated');
        that.$router.push({ path: `/shop/${that.currentCompanyCatalog}/client-account`});
      }).catch(function(error){
        if (error.response) {
          console.log(error.response);
          that.$warningAlert(Object.values(error.response.data.errors))
        }
      });

    }
  },
  watch: {
  },
  mounted() {
    this.selectDates();
    this.fromDateLightpick.setDate(this.user.birthDate);
  }
}
</script>

<style scoped>
.edit-input{
  width: 100%;
  margin-bottom: 20px;
}
.male{
  font-size: 16px;
}
.email{
  margin-bottom: 43px !important;
}
.gender{
  margin-bottom: 23px;
  display: inline-block;
}

@media(min-width:1200px){
  .container-profile{
    max-width:1000px
  }
}

/*=========radio button==========*/
.radio-toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 43px;

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
  width: 22px;
  height: 22px;
  border: 1px solid #E3E3E3;
  box-sizing: border-box;
  border-radius: 5px
}

.radio-toolbar label:hover {
  background-color: #616cf5;
}
.radio-toolbar input[type="radio"]:checked + label {
  background-color: #616cf5;
  border:none;

}

</style>