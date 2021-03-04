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
          <h1 class="welcome-sign-up ">Growth for your
            business with loy <span>Gift</span></h1>
      <form>
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6">
              <label class="label">Your name</label>
              <input class="login-input">
              <label class="label">Email</label>
              <input class="login-input">
              <label class="label">Password</label>
              <div class="password d-flex justify-space-between align-items-center">
                <input id="show-password"  class="login-input" type="password">
                <img class="hide-eye" @click="showPassword" src="../../assets/icons/Hide.svg">
                <img class="show-eye"  @click="showPassword" src="../../assets/icons/eye.svg">
              </div>

            </div>
            <div class="col-lg-6">
              <label class="label">Phone number</label>
              <input class="login-input">
              <label class="label">Country</label>
              <input class="login-input">
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
  }
}
</script>

<style scoped>
form {
  text-align: left;
}

.sign-up{
  width: 723px;
  background: #FFFFFF;
  border: 1px solid #D3D3D3;
  box-sizing: border-box;
  border-radius:10px;
  margin:0 auto;
  padding:32px 60px;
  text-align: center;
  margin-bottom: 78px;
}
.label{
  color:#222;
  margin-bottom: 5px;
}
.rules label{
  margin-right: 10px;
}
.rules{
  margin-bottom: 5px;
}
.policy{
  margin-top: 15px;
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
}
.welcome-sign-up{
  font-size:50px;
  font-weight: bold;
  color: #616CF5;
  line-height: 100%;
  margin-bottom: 50px;
}
.welcome-sign-up span{
  font-weight: 100;
}
</style>