<template>
  <div class="authorization">
    <div class="container-fluid">
      <div class="login">
        <h1 class="welcome-sign-in">Log In</h1>
        <form >
          <label class="label">Email</label>
          <input v-model="email" name="email" class="login-input">
          <label class="label">Password</label>
          <div class="password d-flex justify-space-between align-items-center">
            <input v-model="password" name="password" id="password"  class="login-input" type="password">
            <img @click="showPassword" id="hide-eye"  src="../../assets/icons/Hide.svg">
            <img @click="showPassword" id="show-eye"  src="../../assets/icons/eye.svg">
          </div>

          <div class="remind d-flex justify-content-between align-item-center">
            <div class="d-flex ">
              <label class="custom-checkbox"><input type="checkbox"><span class="checkmark"></span></label>
              <span>Stay signed in</span>
            </div>
            <a href="/">Forgot your password?</a>
          </div>
          <button @click="login" class="sign-in-btn" type="button">Sign In</button>
        </form>

        <div class="have-account">Sign up with Social of fill the form to continue. </div>

        <div class="social-link d-flex justify-content-center">
        <div class="social-icons">  <img src="../../assets/icons/facebook.svg"></div>
        <div class="social-icons mr-0">  <img src="../../assets/icons/google.svg"></div>
        </div>

        <div class="main-or d-flex align-items-center justify-content-center">
          <div class="or-div"></div>
          <span class="or-text">or</span>
          <div class="or-div"></div>
        </div>
        <div class="have-account mb-0">Don't have an account? <router-link class="client-link" :to="`/${currentCompanyCatalog}/signup`">Sign up now</router-link></div>
      </div>

    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "SignIn",
  data(){
    return{
      email:'',
      password:'',
    }
  },
  computed:{
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    }
  },
  methods:{
    showPassword: function () {
      var x = document.getElementById("password");
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
    login(){
      let that=this;
      const options = {
        headers: {"x-client-url": this.currentCompanyCatalog}
      }
      console.log(this.currentCompanyCatalog,"currentCompanyCatalog");
      let url = this.url('loginClient');
      let data = {
        email:this.email,
        password:this.password,
      }
      this.axios.post(url,data,options).then(function (response) {
        console.log(response);
        that.$successAlert('Logged in!');
        that.$store.dispatch("Client/setUserAuth",response.data);
        localStorage.setItem('token', response.data.token);
        that.$router.push({ path: `/${that.currentCompanyCatalog}/client-account`});
        // that.$router.go(-1);
      }).catch(function(error){
        if (error.response) {
          // console.log(error.response.status);
          // console.log(error.response.headers);
          that.$successAlert(Object.values(error.response.data.errors).join(', '));
          console.log(Object.values(error.response.data.errors));
        }
      });
    },
  }
}
</script>

<style scoped>
.login{
  width: 586px;
  background: #FFFFFF;
  border: 1px solid #D3D3D3;
  box-sizing: border-box;
  border-radius: 10px;
  margin: 50px auto;
  padding:35px 90px;
  text-align: center;


}
.sign-in-btn{
  margin-bottom: 24px;
}
form{
  text-align: left;
}
.label{
  color:#222;
  margin-bottom: 8px;
  margin-right: 10px;
}
.remind{
  margin-bottom: 60px;
  color:#858585;
}
.remind a, .have-account a{
  color: #616CF5;
  text-decoration: none;
}
.remind label{
  margin-right: 10px;
}

.have-account{
  font-size: 14px;
  color:#b0b0b0;
  margin-bottom: 40px;
}
.social-link img{
  margin-right: 40px;
}
.social-link img:last-child{
  margin-right: 0;
}

.welcome-sign-in{
  font-size:48px;
  font-weight: bold;
  color: #616CF5;
  line-height: 100%;
  margin-bottom: 38px;
}
.welcome-sign-in span{
  font-weight: 100;
}

.or-div{
  height: 0;
  width: 130px;
  border-bottom:1px solid #b0b0b0;
}
.or-text{
  margin:0 20px;
  color:#b0b0b0;
  font-size:18px;

}
.main-or{
  margin-top:15px;
  margin-bottom: 15px;
}
@media(max-width:768px){
  .login{
    width: 100%;
  }
}
@media(max-width:660px){
  .login{
    padding: 30px 40px;
  }
}
@media(max-width:576px){
  .authorization{
    padding:23px 0;
  }
  .welcome-sign-in{
    font-size: 36px !important;
  }
}
@media(max-width:420px){
  .login{
    padding:30px 20px;
  }

}
</style>