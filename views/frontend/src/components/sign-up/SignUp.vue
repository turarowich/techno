<template>

  <div class="authorization">
    <div class="container-fluid">
      <div class="sign-in-header">
        <!-- <img class="main-logo" src="../../assets/img/sign-logo.svg">
        <select class="form-control select-lang">
          <option>Eng</option>
          <option>Rus</option>
        </select> -->
      </div>

      <div class="sign-up">
          <h1 class="welcome-sign-up ">Начните свой <br>
            бизнес с <br class="br"> Techno <span>.</span></h1>
      <form @submit.prevent="registerSubmit">

          <div class="row">
            <div class="col-lg-6">
              <label class="label">Имя</label>
              <input :class="{errorInput: validateName === true}" v-model="register.name" class="login-input" name="name">
              <p class="fill-fields" v-if="validateName===true">Enter your name</p>
              <label class="label">Email</label>
              <input :class="{errorInput: validateEmail === true}" v-model="register.email" class="login-input" name="password">
              <p class="fill-fields" v-if="validateEmail===true">Enter your email</p>
              <label class="label">Пароль</label>
              <div  :class="{errorInput: validatePassword === true}" class="password d-flex justify-space-between align-items-center">
                <input  v-model="register.password" id="show-password"  name="password" class="login-input bg-transparent" type="password">
                <img class="hide-eye" @click="showPassword" src="../../assets/icons/Hide.svg">
                <img class="show-eye"  @click="showPassword" src="../../assets/icons/eye.svg">
              </div>
              <p class="fill-fields" v-if="validatePassword===true">Enter your password</p>

            </div>
            <div class="col-lg-6">
              <label class="label">Номер телефона</label>
              <input :class="{errorInput: validatePhone === true}" v-model="register.phone" class="login-input" name="phone">
              <p class="fill-fields" v-if="validatePhone===true">Enter your phone number</p>
              <label class="label">Описание</label>
              <input v-model="register.description" class="login-input" name="description">
              <label class="label">Повторить пароль</label>
              <div   class=" password d-flex justify-space-between align-items-center">
                <input id="show-repeat"  class="login-input" type="password">
                <img id="hide-eye" @click="showRepeat" src="../../assets/icons/Hide.svg">
                <img id="show-eye"  @click="showRepeat" src="../../assets/icons/eye.svg">
              </div>

            </div>
          </div>
            <div class="policy">
              <div class="rules d-flex">
               <div> <label class="custom-checkbox " ><input type="checkbox"><span class="checkmark"></span></label></div>
                <span>Я прочитал<a href="#"> Политику конфиденциальности </a> и принимаю ее условия. </span>
              </div>
              <div class="rules d-flex">
                <div><label class="custom-checkbox " ><input type="checkbox"><span class="checkmark"></span></label></div>
                <span>Я прочитал и принимаю <a href="#">Условия предложения</a></span>
              </div>
            </div>
          <div class="row align-items-center">
                   <div class="col-lg-6">
                     <button class="sign-in-btn">Продолжить</button>
                   </div>
                   <div class="col-lg-6">
                     <div class="have-account">У вас уже есть аккаунт? <a style="color:#616cf5; cursor:pointer;" @click="$router.push('/')">Войти</a></div>
                   </div>
                 </div>



      </form>
      </div>
      <!-- <p class="footer-text">Cashback. Loyalty program. Client base. Offline cashback.
        Growing your business with one Mobile Application.</p> -->

    </div>
  </div>


</template>

<script>
import $ from "jquery";
export default {
name: "SignUp",
  data(){
    return {
      validatePhone:false,
      validateName:false,
      validatePassword:false,
      validateEmail:false,
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

      if(this.register.name === ""){
        this.validateName = true
      }
      else{
        this.validateName = false
      }

      if(this.register.email === ""){
        this.validateEmail = true
      }
      else{
        this.validateEmail = false
      }

      if(this.register.phone === ""){
        this.validatePhone = true
      }
      else{
        this.validatePhone = false
      }
      if(this.register.password === ""){
        this.validatePassword = true
      }
      else{
        this.validatePassword = false
      }

      data.append('name', this.register.name);
      data.append('email', this.register.email);
      data.append('phone', this.register.phone);
      data.append('description', this.register.description);
      data.append('password', this.register.password);
      this.axios.post(this.url('register'), data)
      .then((res)=>{
        that.$router.push('/orders')
        localStorage.setItem(JSON.stringify(res.data.object))

        this.register = {
          name:'',
          password:'',
          email: '',
          description:'',
          phone:'',
        };
      })
      .catch((error)=>{
        console.log(error);
        
      })

    }
}
}
</script>

<style scoped>
.br{
  display:none;
}
.fill-fields{
  margin-top: -10px;
  font-size:14px;
  color:#E94A4A;
}

form {
  text-align: left;
}
.sign-in-header{
  display: flex;
  justify-content: space-between;
  align-items:center;
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
@media(max-width:768px){
  .br{
    display: block;
  }
  .sign-in-header{
    justify-content: center;
  }
  .select-lang{
    display:none;
  }
  .sign-up{
    width: 100%;
    padding: 0;
    border:none;
  }
  .authorization{
    background: #fff;
    padding: 0;
  }
  .have-account{
    text-align:center;
  }
  .sign-in-btn{
    margin-bottom: 20px;
  }
  .or-div{
    width: 130px;
  }
}

@media(max-width:576px){
  .authorization{
    padding:23px 0;
  }
  .welcome-sign-up{
    font-size: 36px !important;
  }
}
</style>