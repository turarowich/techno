<template>
<div class="general">
  <form>
    <div class="row ">
      <div class="col-lg-5 mr-5">
        <label class="sum-point">Currency</label><br>
        <input v-model="currency" class="form-input cashback-input mb-2" placeholder="USD">

        <label class="sum-point">Your country</label>
        <select v-model="country" class="form-control long-form-control  form-control-lg mb-2" aria-label=".form-select-lg example">
          <option val="Kyrgyzstan">Kyrgyzstan</option>
          <option val="Russia">Russia</option>
          <option val="USA">USA</option>
        </select>
        <label class="sum-point">Name of the company</label><br>
        <input v-model="name" class="form-input cashback-input mb-2" placeholder="Company">
        <label class="sum-point">Email</label><br>
        <input v-model="email" class="form-input cashback-input mb-2" placeholder="Company email">
        <h2 class="cashback-title mt-3">
          Chat settings
        </h2>
        <div class="d-flex enable-title">
          <label class="switch d-flex">
            <input v-model="chat" type="checkbox" >
            <span class="slider round"></span>
          </label>
          <h2 class="cashback-sub-title">Chat</h2>
        </div>
        <p class="cashback-description mb-5">Disables the ability to write to you in the chat</p>
      </div>
      <div class="col-lg-5">
        <h2 class="cashback-title mt-3">
          Custom fields settings
        </h2>
        <div class="d-flex enable-title">
          <label class="switch d-flex">
            <input v-model="customFields" type="checkbox" >
            <span class="slider round"></span>
          </label>
          <h2 class="cashback-sub-title">Fields</h2>
        </div>
        <p class="cashback-description mb-5">Disables the ability to write to you in the chat</p>
        <h2 class="cashback-sub-title">First field</h2>
        <div class="d-flex flex-wrap ">
            <div class="col-9 pl-0 d-flex align-items-center my-2">
                <input v-model="custom_field_0.fieldName" class="form-input cashback-input  mr-2" placeholder="field name">
                <label class="switch d-flex">
                    <input v-model="custom_field_0.required" type="checkbox" >
                    <span class="slider round"></span>
                </label>
            </div>
            <div class="col-9 pl-0" v-for="(item, index) in custom_field_0.values" :key="index" >
                <div class="d-flex" v-if="custom_field_0.fieldName.length">
                    <input v-model="custom_field_0.values[index]" class="form-input cashback-input mb-2" placeholder="field value">
                    <button v-if="index == 0" type="button" @click="addNewVal('custom_field_0')" class="discount-btn ml-2"><img src="../../assets/icons/enable+.svg"></button>
                    <button v-if="index != 0" type="button" @click="removeVal('custom_field_0', index)" class="discount-btn ml-2"><img alt="x" src="../../assets/icons/x.svg"></button>
                </div>
            </div>
        </div>
        <h2 class="cashback-sub-title mt-3">Second field</h2>
        <div class="d-flex flex-wrap ">
            <div class="col-9 pl-0 d-flex align-items-center my-2">
                <input v-model="custom_field_1.fieldName" class="form-input cashback-input  mr-2" placeholder="field name">
                <label class="switch d-flex">
                    <input v-model="custom_field_1.required" type="checkbox" >
                    <span class="slider round"></span>
                </label>
            </div>
            <div class="col-9 pl-0" v-for="(item, index) in custom_field_1.values" :key="index" >
                <div class="d-flex" v-if="custom_field_1.fieldName.length">
                    <input v-model="custom_field_1.values[index]" class="form-input cashback-input mb-2" placeholder="field value">
                    <button v-if="index == 0" type="button" @click="addNewVal('custom_field_1')" class="discount-btn ml-2"><img src="../../assets/icons/enable+.svg"></button>
                    <button v-if="index != 0" type="button" @click="removeVal('custom_field_1', index)" class="discount-btn ml-2"><img alt="x" src="../../assets/icons/x.svg"></button>
                </div>
            </div>
        </div>
        <h2 class="cashback-sub-title mt-3">Third field</h2>
        <div class="d-flex flex-wrap ">
            <div class="col-9 pl-0 d-flex align-items-center my-2">
                <input v-model="custom_field_2.fieldName" class="form-input cashback-input  mr-2" placeholder="field name">
                <label class="switch d-flex">
                    <input v-model="custom_field_2.required" type="checkbox" >
                    <span class="slider round"></span>
                </label>
            </div>
            <div class="col-9 pl-0" v-for="(item, index) in custom_field_2.values" :key="index" >
                <div class="d-flex" v-if="custom_field_2.fieldName.length">
                    <input v-model="custom_field_2.values[index]" class="form-input cashback-input mb-2" placeholder="field value">
                    <button v-if="index == 0" type="button" @click="addNewVal('custom_field_2')" class="discount-btn ml-2"><img src="../../assets/icons/enable+.svg"></button>
                    <button v-if="index != 0" type="button" @click="removeVal('custom_field_2', index)" class="discount-btn ml-2"><img alt="x" src="../../assets/icons/x.svg"></button>
                </div>
            </div>
        </div>
      </div>
    </div>
    <button type="button" @click="updateSettings" class="save">Save</button>
  </form>
</div>
</template>

<script>

export default {
  name: "General",
  data(){
    return{
        currency:"",
        country:"",
        chat: false,
        name:'',
        email:'',
        customFields: false,
        custom_field_0:{
            required: false,
            fieldName: '',
            values: ['']
        },
        custom_field_1:{
            required: false,
            fieldName: '',
            values: ['']
        },
        custom_field_2:{
            required: false,
            fieldName: '',
            values: ['']
        },
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
      let url = this.url('updateSettings');
      this.axios.put(url, {
        currency:this.currency,
        country:this.country,
        chat:this.chat,
        name:this.name,
        email:this.email,
        customFields: this.customFields,
        custom_field_0: this.custom_field_0,
        custom_field_1: this.custom_field_1,
        custom_field_2: this.custom_field_2,
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
  },
  
  beforeCreate(){
    let that = this;
    this.axios
      .get(this.url('getSettings'))
      .then(function (response){
        let settings = response.data.object;
        that.currency = settings.currency || '';
        that.country = settings.country || '';
        that.chat = settings.chat || false;
        that.name = settings.name || '';
        that.email = settings.email || '';
        that.customFields = settings.customFields || false;
        that.custom_field_0 = settings.custom_field_0;
        that.custom_field_1 = settings.custom_field_1;
        that.custom_field_2 = settings.custom_field_2;
      })
  },
}

</script>

<style scoped>
.discount-btn{
  height: 45px;
  flex: 0 0 45px;
  border-radius:5px;
  background: none;
  border: none;
}
.cashback-input{
  width: 100%;
}
.save{
  width: 120px;
  position: absolute;
  bottom:50px;
}

.general{
  padding: 20px 0;
}
.form input{
  width: 100%;
}
.cashback-title{
  margin-bottom: 20px;
}

.help-settings .cashback-input{
  width: 100%;
  margin-bottom: 15px;
}
.rm-question{
  position: absolute;
  right: -18px;
  top: 45%;
}
.add-more{
  color:#616cf5;
  display: inline-block;
  margin-bottom: 30px;
}



/*




                            <div class="mb-4">
                              <p class="sum-point">Profile image</p>
                             <div class="profile-img">
                                  <img class="profile-logo" src="../../assets/icons/profile-img.svg">
                                  <input type="file" id="file" v-on:change="uploadPhoto">
                                  <label class="addPhoto" for="file"><img src="../../assets/icons/addBtn.svg"></label>
                             </div>
                            </div>



                <p class="sum-point">Working hours</p>
                <div class="d-flex mb-4">
                  <div style="width: 50%; margin-right:10px;" class="d-flex align-items-center">
                    <label>from:</label>
                    <select class="form-control form-control-lg " aria-label=".form-select-lg example">
                      <option value="01:00:00" selected="selected">01:00</option> <option value="01:15:00">01:15</option> <option value="01:30:00">01:30</option> <option value="01:45:00">01:45</option> <option value="02:00:00">02:00</option> <option value="02:15:00">02:15</option> <option value="02:30:00">02:30</option> <option value="02:45:00">02:45</option> <option value="03:00:00">03:00</option> <option value="03:15:00">03:15</option> <option value="03:30:00">03:30</option> <option value="03:45:00">03:45</option> <option value="04:00:00">04:00</option> <option value="04:15:00">04:15</option> <option value="04:30:00">04:30</option> <option value="04:45:00">04:45</option> <option value="05:00:00">05:00</option> <option value="05:15:00">05:15</option> <option value="05:30:00">05:30</option> <option value="05:45:00">05:45</option> <option value="06:00:00">06:00</option> <option value="06:15:00">06:15</option> <option value="06:30:00">06:30</option> <option value="06:45:00">06:45</option> <option value="07:00:00">07:00</option> <option value="07:15:00">07:15</option> <option value="07:30:00">07:30</option> <option value="07:45:00">07:45</option> <option value="08:00:00">08:00</option> <option value="08:15:00">08:15</option> <option value="08:30:00">08:30</option> <option value="08:45:00">08:45</option> <option value="09:00:00">09:00</option> <option value="09:15:00">09:15</option> <option value="09:30:00">09:30</option> <option value="09:45:00">09:45</option> <option value="10:00:00">10:00</option> <option value="10:15:00">10:15</option> <option value="10:30:00">10:30</option> <option value="10:45:00">10:45</option> <option value="11:00:00">11:00</option> <option value="11:15:00">11:15</option> <option value="11:30:00">11:30</option> <option value="11:45:00">11:45</option> <option value="12:00:00">12:00</option> <option value="12:15:00">12:15</option> <option value="12:30:00">12:30</option> <option value="12:45:00">12:45</option> <option value="13:00:00">13:00</option> <option value="13:15:00">13:15</option> <option value="13:30:00">13:30</option> <option value="13:45:00">13:45</option> <option value="14:00:00">14:00</option> <option value="14:15:00">14:15</option> <option value="14:30:00">14:30</option> <option value="14:45:00">14:45</option> <option value="15:00:00">15:00</option> <option value="15:15:00">15:15</option> <option value="15:30:00">15:30</option> <option value="15:45:00">15:45</option> <option value="16:00:00">16:00</option> <option value="16:15:00">16:15</option> <option value="16:30:00">16:30</option> <option value="16:45:00">16:45</option> <option value="17:00:00">17:00</option> <option value="17:15:00">17:15</option> <option value="17:30:00">17:30</option> <option value="17:45:00">17:45</option> <option value="18:00:00">18:00</option> <option value="18:15:00">18:15</option> <option value="18:30:00">18:30</option> <option value="18:45:00">18:45</option> <option value="19:00:00">19:00</option> <option value="19:15:00">19:15</option> <option value="19:30:00">19:30</option> <option value="19:45:00">19:45</option> <option value="20:00:00">20:00</option> <option value="20:15:00">20:15</option> <option value="20:30:00">20:30</option> <option value="20:45:00">20:45</option> <option value="21:00:00">21:00</option> <option value="21:15:00">21:15</option> <option value="21:30:00">21:30</option> <option value="21:45:00">21:45</option> <option value="22:00:00">22:00</option> <option value="22:15:00">22:15</option> <option value="22:30:00">22:30</option> <option value="22:45:00">22:45</option> <option value="23:00:00">23:00</option>
                    </select>
                  </div>

                  <div style="width: 50%;" class="d-flex align-items-center">
                    <label>to:</label>
                    <select class="form-control form-control-lg " aria-label=".form-select-lg example">
                      <option value="01:00:00" selected="selected">01:00</option> <option value="01:15:00">01:15</option> <option value="01:30:00">01:30</option> <option value="01:45:00">01:45</option> <option value="02:00:00">02:00</option> <option value="02:15:00">02:15</option> <option value="02:30:00">02:30</option> <option value="02:45:00">02:45</option> <option value="03:00:00">03:00</option> <option value="03:15:00">03:15</option> <option value="03:30:00">03:30</option> <option value="03:45:00">03:45</option> <option value="04:00:00">04:00</option> <option value="04:15:00">04:15</option> <option value="04:30:00">04:30</option> <option value="04:45:00">04:45</option> <option value="05:00:00">05:00</option> <option value="05:15:00">05:15</option> <option value="05:30:00">05:30</option> <option value="05:45:00">05:45</option> <option value="06:00:00">06:00</option> <option value="06:15:00">06:15</option> <option value="06:30:00">06:30</option> <option value="06:45:00">06:45</option> <option value="07:00:00">07:00</option> <option value="07:15:00">07:15</option> <option value="07:30:00">07:30</option> <option value="07:45:00">07:45</option> <option value="08:00:00">08:00</option> <option value="08:15:00">08:15</option> <option value="08:30:00">08:30</option> <option value="08:45:00">08:45</option> <option value="09:00:00">09:00</option> <option value="09:15:00">09:15</option> <option value="09:30:00">09:30</option> <option value="09:45:00">09:45</option> <option value="10:00:00">10:00</option> <option value="10:15:00">10:15</option> <option value="10:30:00">10:30</option> <option value="10:45:00">10:45</option> <option value="11:00:00">11:00</option> <option value="11:15:00">11:15</option> <option value="11:30:00">11:30</option> <option value="11:45:00">11:45</option> <option value="12:00:00">12:00</option> <option value="12:15:00">12:15</option> <option value="12:30:00">12:30</option> <option value="12:45:00">12:45</option> <option value="13:00:00">13:00</option> <option value="13:15:00">13:15</option> <option value="13:30:00">13:30</option> <option value="13:45:00">13:45</option> <option value="14:00:00">14:00</option> <option value="14:15:00">14:15</option> <option value="14:30:00">14:30</option> <option value="14:45:00">14:45</option> <option value="15:00:00">15:00</option> <option value="15:15:00">15:15</option> <option value="15:30:00">15:30</option> <option value="15:45:00">15:45</option> <option value="16:00:00">16:00</option> <option value="16:15:00">16:15</option> <option value="16:30:00">16:30</option> <option value="16:45:00">16:45</option> <option value="17:00:00">17:00</option> <option value="17:15:00">17:15</option> <option value="17:30:00">17:30</option> <option value="17:45:00">17:45</option> <option value="18:00:00">18:00</option> <option value="18:15:00">18:15</option> <option value="18:30:00">18:30</option> <option value="18:45:00">18:45</option> <option value="19:00:00">19:00</option> <option value="19:15:00">19:15</option> <option value="19:30:00">19:30</option> <option value="19:45:00">19:45</option> <option value="20:00:00">20:00</option> <option value="20:15:00">20:15</option> <option value="20:30:00">20:30</option> <option value="20:45:00">20:45</option> <option value="21:00:00">21:00</option> <option value="21:15:00">21:15</option> <option value="21:30:00">21:30</option> <option value="21:45:00">21:45</option> <option value="22:00:00">22:00</option> <option value="22:15:00">22:15</option> <option value="22:30:00">22:30</option> <option value="22:45:00">22:45</option> <option value="23:00:00">23:00</option>

                    </select>
                  </div>
                </div>







 <div class="addititon-settings">
                <div class="additional-item mb-4">
                  <div class="d-flex align-items-center mb-3">
                    <label class="switch d-flex">
                      <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
                      <span class="slider round"><span class="enable">  Enable</span></span>
                    </label>
                  </div>

                  <h3 class="cashback-sub-title">Welcome point</h3>
                  <p class="cashback-description">A one-time award of points to the client for joining the company.</p>
                  <input class="cashback-input" placeholder="0">
                </div>
                <div class="additional-item mb-4">
                  <div class="d-flex align-items-center mb-3">
                    <label class="switch d-flex">
                      <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
                      <span class="slider round"><span class="enable">  Enable</span></span>
                    </label>
                  </div>

                  <h3 class="cashback-sub-title">Share with a friend</h3>
                  <p class="cashback-description">Friends will share the link and receive a bonus on the account</p>
                  <input class="cashback-input" placeholder="0">
                </div>

                <div class="additional-item mb-4">
                  <div class="d-flex align-items-center mb-3">
                    <label class="switch d-flex">
                      <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
                      <span class="slider round"><span class="enable">  Enable</span></span>
                    </label>


                  </div>
                  <h3 class="cashback-sub-title">Settings Delivery</h3>
                  <p class="cashback-description">Add shipping methods or shipping options</p>
                  <textarea class="general-area mb-5"></textarea>
                </div>

                <button class="save">Save </button>


              </div>
*/

</style>