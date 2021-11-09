<template>
  <div class="general">
    <span>1c 8* import settings, 1c has to have a website exchange module(Обмен с сайтом), don't edit these data,
      they are used to validate your 1c server connection</span>

    <div v-if="spinner"  style="height:65vh; " class="d-flex align-items-center">
      <Spinner/>
    </div>
    <div class="__mainContainer" style="display: flex">
      <div style="flex: 1;margin-right: 3px;margin-bottom: 10px;">
        <label class="sum-point">Api</label><br>
        <input v-model="oneCApiAddress" class="form-input cashback-input " placeholder="apiAddress">
        <label class="sum-point">User name</label><br>
        <input v-model="oneCApiLogin" class="form-input cashback-input " placeholder="apiLogin">
        <label class="sum-point">Password</label><br>
        <input v-model="oneCApiPassword" class="form-input cashback-input " placeholder="apiPassword">
      </div>
      <div style="flex: 1;margin-left: 3px;">

        <span style="margin-bottom: 10px;display: block;">
          The quantity, price, category of the products are updated by default on import
        </span>

        <div class="d-flex enable-title">
          <label class="switch d-flex">
            <input v-model="settings.groupItemsOnImport" type="checkbox" >
            <span class="slider round"></span>
          </label>
          <span style="margin-top: -5px;">Group items as one if they have same names but different properties/sizes. (Группировать одинаковые товары как один)</span>
        </div>

        <div class="d-flex enable-title">
          <label class="switch d-flex">
            <input v-model="settings.removeGhostsOnImport" type="checkbox" >
            <span class="slider round"></span>
          </label>
          <span style="margin-top: -5px;">Delete products that are not found in the new import. (Удалить товары с сайта, если их нет в новом импорте)</span>
        </div>

        <div class="d-none enable-title ">
          <label class="switch d-flex">
            <input v-model="settings.ignoreChangesOnImport" type="checkbox" >
            <span class="slider round"></span>
          </label>
          <span style="">Fully update products on each import/ignore changes that were made in CRM.(except for images)</span>
        </div>

        <div class="d-flex enable-title">
          <label class="switch d-flex">
            <input v-model="settings.ignoreImagesOnImport" type="checkbox" >
            <span class="slider round"></span>
          </label>
          <span style="">Do not update images of old products on import. (Не заменять изображения старых товаров, при импорте)</span>
        </div>
      </div>
    </div>
    <button type="button" @click="updateSettings();updateSettingsGeneral()"  class="save mt-3 mb-3">Save</button>
  </div>
</template>

<script>
import Spinner from "../Spinner";
export default {
  name: "General",
  components:{
    Spinner
  },
  data(){
    return{
      spinner:true,
      oneCApiAddress:"",
      oneCApiLogin:"",
      oneCApiPassword: "",
      id: "",
      settings:{},
    }
  },
  methods:{
    addNewVal(field){
      this[field].values.unshift('')
    },
    removeVal(field, index){
      this[field].values.splice(index, 1)
    },
    updateSettings(){
      let that=this;
      let url = this.url('updatePersonalSettings');
      this.axios.put(url, {
        _id:this.id,
        oneCApiAddress:this.oneCApiAddress,
        oneCApiLogin:this.oneCApiLogin,
        oneCApiPassword:this.oneCApiPassword,
      }).then(function (response) {
        console.log(response);
        that.$successAlert('Updated');
      }).catch(function(error){
        if (error.response) {
          if(error.response.data && !error.response.data.errors){
            that.$warningAlert(error.response.data.msg)
          }else{
            that.$warningAlert('Something went wrong');
          }
          that.$warningAlert(Object.values(error.response.data.errors),"Errors");
        }
      });
    },
    updateSettingsGeneral(){
      let that=this;
      let url = this.url('updateSettings');
      this.axios.put(url, this.settings).then(function (response) {
        console.log(response);
        that.$successAlert('Updated');
      }).catch(function(error){
        if (error.response) {
          if(error.response.data && !error.response.data.errors){
            that.$warningAlert(error.response.data.msg)
          }else{
            that.$warningAlert('Something went wrong');
          }

          that.$warningAlert(Object.values(error.response.data.errors),"Errors");
        }
      });
    },
  },

  beforeCreate(){
    let that = this;
    this.axios
        .get(this.url('getPersonalSettings'))
        .then(function (response){
          that.spinner = false;
          let settings = response.data.user;
          that.oneCApiAddress = settings.oneCApiAddress || '';
          that.oneCApiLogin = settings.oneCApiLogin || '';
          that.oneCApiPassword = settings.oneCApiPassword || '';
          that.id= settings._id || '';
        })

    this.axios
        .get(this.url('getSettings'))
        .then(function (response){
          that.spinner = false;
          let settings = response.data.object;
          that.settings = settings
          // that.country = settings.country || '';
          // that.chat = settings.chat || false;
          // that.name = settings.name || '';
          // that.email = settings.email || '';
        })
  },
}

</script>

<style scoped>

@media only screen and (max-width: 900px) {
  .__mainContainer {
    flex-direction: column;
  }
}

.switch{
  margin-right: 25px;
}

.slider.round{
  width: 39px;
}
.cashback-input{
  width: 100%;
}
.save{
  width: 120px;

}

.form input{
  width: 100%;
}


.help-settings .cashback-input{
  width: 100%;
  margin-bottom: 15px;
}

.left-general .cashback-input{
  margin-bottom: 20px;
}
</style>