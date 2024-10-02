<template>
  <div class="authorization">
    <div class="container-fluid">
      <div class="login">
        <h1 class="welcome-sign-in">Войти</h1>
        <form  class="loginEmployee">
          <label class="label">Email</label>
          <input v-model="email" name="email" class="login-input mb-0">
          <label class="label mt-2">Пароль</label>
          <div class="password d-flex justify-space-between align-items-center">
            <input name="password" v-model="password" id="password"  class="login-input" type="password">
            <img @click="showPassword" id="hide-eye"  src="../../assets/icons/Hide.svg">
            <img @click="showPassword" id="show-eye"  src="../../assets/icons/eye.svg">
          </div>
          <!-- <input type="hidden" > -->

          <div class="remind d-flex justify-content-between align-item-center">
            <div class="d-flex ">
              <label class="custom-checkbox"><input type="checkbox"><span class="checkmark"></span></label>
              <span>Оставаться в системе</span>
            </div>
          </div>
          <button @click="login" class="sign-in-btn" type="button">Войти</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "EmployeeLogin",
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
      const options = {
        headers: {"x-client-url": this.currentCompanyCatalog}
      }
      console.log(this.currentCompanyCatalog,"currentCompanyCatalog");
      let url = this.url_home('loginEmployee');
      let data = {
        email:this.email,
        password:this.password,
      }
      this.axios.post(url,data,options).then((resp)=> {
        localStorage.setItem('token', resp.data.token)
        localStorage.setItem('user',JSON.stringify(resp.data.object))
        this.changeToken();
        this.$router.push('/orders')
      }).catch((error)=>{
        if (error.response) {
            if(error.response.data){
                this.$warningAlert(error.response.data.msg)
            }
            this.setErrors($('.loginEmployee'), error)
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
  margin-bottom: 11px;
}

</style>