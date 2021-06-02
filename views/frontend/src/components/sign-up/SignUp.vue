<template>

  <div class="authorization">
    <div class="container-fluid">
      <div class="sign-in-header d-flex justify-content-between align-items-center">
        <img class="main-logo" src="../../assets/img/sign-logo.svg">
        <select class="form-control select-lang">
          <option>Eng</option>
          <option>Rus</option>
        </select>
      </div>

      <div class="sign-up">
          <h1 class="welcome-sign-up ">Growth for your<br>
            business with loy <span>Gift</span></h1>
      <form @submit.prevent="registerSubmit">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6">
              <label class="label">Your name</label>
              <input v-model="register.name" class="login-input" name="name">
              <label class="label">Email</label>
              <input v-model="register.email" class="login-input" name="password">
              <label class="label">Password</label>
              <div class="password d-flex justify-space-between align-items-center">
                <input v-model="register.password" id="show-password"  name="password" class="login-input" type="password">
                <img class="hide-eye" @click="showPassword" src="../../assets/icons/Hide.svg">
                <img class="show-eye"  @click="showPassword" src="../../assets/icons/eye.svg">
              </div>

            </div>
            <div class="col-lg-6">
              <label class="label">Phone number</label>
              <input v-model="register.phone" class="login-input" name="phone">
              <label class="label">Description</label>
              <input v-model="register.description" class="login-input" name="description">
              <label class="label">Repeat password</label>
              <div class=" password d-flex justify-space-between align-items-center">
                <input id="show-repeat"  class="login-input" type="password">
                <img id="hide-eye" @click="showRepeat" src="../../assets/icons/Hide.svg">
                <img id="show-eye"  @click="showRepeat" src="../../assets/icons/eye.svg">
              </div>

            </div>
          </div>
            <div class="policy">
              <div class="rules d-flex">
                <label class="custom-checkbox " ><input type="checkbox"><span class="checkmark"></span></label>
                <span>I have read the <a href="/">Privacy Policy </a> and accept its terms.</span>
              </div>
              <div class="rules d-flex">
                <label class="custom-checkbox " ><input type="checkbox"><span class="checkmark"></span></label>
                <span>I have read and accept the <a href="/">Terms of the offer</a></span>
              </div>
            </div>
          <div class="row align-items-center">
                   <div class="col-lg-6">
                     <button class="sign-in-btn">Continue</button>
                   </div>
                   <div class="col-lg-6">
                     <div class="have-account">Don't have an account? <a href="/">Sign in now</a></div>
                   </div>
                 </div>

        </div>
      </form>
      </div>
      <p class="footer-text">Cashback. Loyalty program. Client base. Offline cashback.
        Growing your business with one Mobile Application.</p>

    </div>
  </div>


</template>

<script>
import $ from "jquery";
export default {
name: "SignUp",
  data(){
    return {
      register:{
        name:'',
        password:'',
        email: '',
        description:'',
        phone:'',
      }

    }
  },
  methods:{
    showPassword() {
      var x = document.getElementById("show-password");
      if (x.type === "password") {
        x.type = "text";
        $('.hide-eye').css({'display':'none'})
        $('.show-eye').css({'display':'block'})
      } else {
        x.type = "password";
        $('.show-eye').css({'display':'none'})
        $('.hide-eye').css({'display':'block'})

      }
    },
    showRepeat() {
      var x = document.getElementById("show-repeat");
      if (x.type === "password") {
        x.type = "text";
        $('#hide-eye').css({'display':'none'})
        $('#show-eye').css({'display':'block'})
      } else {
        x.type = "password";
        $('#show-eye').css({'display':'none'})
        $('#hide-eye').css({'display':'block'})

      }
    },
    registerSubmit(){
      let that = this;
      const data = new FormData()
      data.append('name', this.register.name);
      data.append('email', this.register.email);
      data.append('phone', this.register.phone);
      data.append('description', this.register.description);
      data.append('password', this.register.password);
      this.axios.post(this.url('register'), data)
      .then(()=>{
        that.$router.push('/')
          // this.$index.push('/')
      })
      .catch((error)=>{
        that.$warningAlert(error);
      })
    this.register = ''
    }
  }
}
</script>

<style scoped>
form {
  text-align: left;
}

.sign-up{
  width: 823px;
  background: #FFFFFF;
  border: 1px solid #D3D3D3;
  box-sizing: border-box;
  border-radius:10px;
  margin:0 auto;
  padding:35px 100px;
  text-align: center;
  margin-bottom: 50px;
}
.label{
  color:#222;
  margin-bottom: 8px;
}
.rules label{
  margin-right: 10px;
}
.policy{
  margin-top:17px;
  margin-bottom: 32px;
  color: #858585;
}
.have-account{
  font-size: 16px;
  color:#b0b0b0;
}
a{
  color: #616CF5;
  text-decoration: none;
}
.select-lang{
  width: 73px;
  height: 30px;
  font-size: 13px;
  background-position-y: 12px;
  background-position-x:80%;
}
.welcome-sign-up{
  font-size:48px;
  font-weight: bold;
  color: #616CF5;
  line-height: 100%;
  margin-bottom: 40px;
}
.welcome-sign-up span{
  font-weight: 100;
}
</style>