<template>
<div class="container general">
    <div class="row">
      <div class="col-lg-6">
        <div class="general-left">
          <div class="form">

            <div class="mb-4">
              <p class="sum-point">Profile image</p>
             <div class="profile-img">
                  <img class="profile-logo" src="../../../assets/icons/profile-img.svg">
                  <input type="file" id="file" v-on:change="uploadPhoto">
                  <label class="addPhoto" for="file"><img src="../../../assets/icons/addBtn.svg"></label>
             </div>
            </div>
            <p class="sum-point">Name</p>
            <input class="form-input cashback-input mb-4" placeholder="Your name">
            <p class="sum-point">Name of company</p>
            <input class="form-input cashback-input mb-4" placeholder="Company">
            <p class="sum-point">Password</p>
            <div class="pswrd-input mb-4">
              <input id="show-password" type="password" placeholder="Password">
              <img class="hide-eye" @click="showPassword" src="../../../assets/icons/Hide.svg">
              <img class="show-eye"  @click="showPassword" src="../../../assets/icons/eye.svg">
            </div>
            <p class="sum-point">Repeat password</p>
            <div class="pswrd-input mb-4">
              <input id="show-repeat" type="password" placeholder="Password">
              <img id="hide-eye" @click="showRepeat" src="../../../assets/icons/Hide.svg">
              <img id="show-eye"  @click="showRepeat" src="../../../assets/icons/eye.svg">

            </div>
            <p class="sum-point">Description</p>
            <textarea class="general-area mb-4"></textarea>
            <p class="sum-point">Your branches</p>
            <textarea class="general-area mb-4"></textarea>
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
        </div>
      </div>
      <div class="col-lg-6">
        <div class="general-right">
          <div class="form">
            <p class="sum-point">Phone number</p>
            <div class="d-flex mb-4">
              <select class="form-control select-phone" aria-label="Default select example">
              <option>+996</option>
              <option>+792</option>
                <option>+996</option>
                <option>+792</option>
                <option>+996</option>
                <option>+792</option>
                <option>+996</option>
                <option>+792</option>
                <option>+996</option>
                <option>+792</option>

              </select>
              <input class="cashback-input">
            </div>
            <div class="mb-4">
              <p class="sum-point">Email</p>
              <input class="cashback-input">
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

            <div class="mb-4">
              <p class="sum-point">Your country</p>
              <select class=" form-control  form-control-lg mb-2" aria-label=".form-select-lg example">
                <option>Kyrgyzstan</option>
                <option>Russia</option>
                <option>USA</option>
                <option>Kyrgyzstan</option>
                <option>Russia</option>
                <option>USA</option>

                <option>Kyrgyzstan</option>
                <option>Russia</option>
                <option>USA</option>

              </select>
            </div>

            <div class=" color-p social-network mb-4 ">
                <div style="width:50%">
                  <p>Social network</p>

                  <button class="social-btn">Whatsapp</button>
                  <button class="social-btn">Telegram</button>
                  <button class="social-btn">Facebook</button>
                </div>
            </div>


            <div class="address">
              <p class="sum-point">Address</p>
              <input class="cashback-input">
            </div>

            <div class="additional-item mb-4">
              <div class="d-flex align-items-center mb-3">
                <label class="switch d-flex">
                  <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
                  <span class="slider round"><span class="enable">  Enable</span></span>
                </label>
              </div>
              <h3 class="cashback-sub-title">Your url from online catalog</h3>
              <p class="cashback-description">A one-time award of points to the client for joining the company.</p>
              <input class="cashback-input" placeholder="0" id="datepicker">
            </div>

          </div>
        </div>
      </div>
    </div>

</div>
</template>

<script>
import $ from "jquery";

export default {
name: "General",
  methods:{
    uploadPhoto(){
    const file = document.querySelector('#file');
    let chooseFiles = file.files[0];
    if(chooseFiles){
      const reader = new FileReader();

      reader.addEventListener('load', function(){
        const logo = document.querySelector('.profile-logo')
        logo.setAttribute('src', reader.result);
      })
      reader.readAsDataURL(chooseFiles)
    }
  },
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
    }
  },

}

</script>

<style scoped>
.address{
  margin-bottom: 100px;
}
.social-network .social-btn{
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  height: 35px;
  background: none;
  padding:0 20px;
  color:#8C94A5;
  display: block;
  margin-bottom: 10px;
  width: 50%;
  text-align: center;
}

label{
  margin-right:10px;
}
.select-phone{
  width:30%;
  margin-right: 10px;
 }

option{
  height:45px;
}
.general{
  padding: 20px 0;
}
.general-left, .general-right{
  padding-right:100px;
}
.form input{
  width: 100%;
}
.general-area{
  border: 1px solid #E3E3E3;
  border-radius: 5px;
  padding-left:10px;
  width:100%;
  resize: none;
  height: 125px;
}
.additional-item input{
  width: 100%;
}

.pswrd-input{
  border: 1px solid #E3E3E3;
  border-radius: 5px;
  padding:0 10px;
  height:45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pswrd-input input{
  border:none;
}
.show-pswrd{
  width: 20px;
  height: 20px;
}
.profile-img{
  width: 100px;
  height: 100px;
  position: relative;
 }
.profile-logo{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;

}
.profile-img input{
  display: none;
}
.addPhoto{
  position: absolute;
  bottom: -20px;
  right: -26px;
}


</style>