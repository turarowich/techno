<template>
<div class="container general">
    <div class="row">
      <div class="col-lg-6">
        <div class="general-left">
          <div class="form">
            <p class="sum-point">Name</p>
            <input class="form-input cashback-input mb-4">
            <p class="sum-point">Name of company</p>
            <input class="form-input cashback-input mb-4">
            <p class="sum-point">Password</p>
            <div class="pswrd-input mb-4">
              <input>
              <img src="../../../assets/icons/eye.svg">
            </div>
            <p class="sum-point">Repeat password</p>
            <div class="pswrd-input mb-4">
              <input>
              <img src="../../../assets/icons/eye.svg">
            </div>
            <p class="sum-point">Description</p>
            <textarea class="general-area mb-4"></textarea>
            <p class="sum-point">Your branches</p>
            <textarea class="general-area mb-4"></textarea>
          </div>

          <div class="addititon-settings">
            <div class="additional-item mb-4">
              <label class="switch mb-3">
                <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
                <span class="slider round"></span>
              </label>
              <span class="enable">Enable</span>

              <h3 class="cashback-sub-title">Welcome point</h3>
              <p class="cashback-description">A one-time award of points to the client for joining the company.</p>
              <input class="cashback-input" placeholder="0">
            </div>
            <div class="additional-item mb-4">
              <label class="switch mb-3">
                <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
                <span class="slider round"></span>
              </label>
              <span class="enable">Enable</span>

              <h3 class="cashback-sub-title">Share with a friend</h3>
              <p class="cashback-description">Friends will share the link and receive a bonus on the account</p>
              <input class="cashback-input" placeholder="0">
            </div>

            <div class="additional-item mb-4">
              <label class="switch mb-3">
                <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
                <span class="slider round"></span>
              </label>
              <span class="enable">Delivery</span>

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
              <select class="select-phone">
                <option>+7900</option>
                <option>+7900</option>
                <option>+7900</option>
              </select>
              <input class="cashback-input">
            </div>
            <div class="mb-4">
              <p class="sum-point">Email</p>
              <input class="cashback-input">
            </div>

            <p class="sum-point">Working hours</p>
            <div class="d-flex mb-4">
              <div style="width: 50%;" class="d-flex align-items-center">
                <label>from:</label>
                <select class="select mr-2">
                  <option>English</option>
                  <option>English</option>
                  <option>English</option>
                </select>
              </div>

              <div style="width: 50%;" class="d-flex align-items-center">
                <label>to:</label>
                <select class="select">
                  <option>English</option>
                  <option>English</option>
                  <option>English</option>
                </select>
              </div>
            </div>

            <div class="mb-4">
              <p class="sum-point">Your country</p>
              <input class="cashback-input">
            </div>

            <div class="social-network mb-4 ">
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
              <label class="switch mb-3">
                <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
                <span class="slider round"></span>
              </label>
              <span class="enable">Enable</span>

              <h3 class="cashback-sub-title">Your url from online catalog</h3>
              <p class="cashback-description">A one-time award of points to the client for joining the company.</p>
              <input class="cashback-input" placeholder="0">
            </div>

          </div>
        </div>
      </div>
    </div>

</div>
</template>

<script>
export default {
name: "General"
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
.select{
  width: 100%;
  border: 1px solid #E3E3E3;
  border-radius: 5px;
  padding:0 10px;
  background: none;
  height:45px;
}
label{
  margin-right:10px;
}
.select-phone{
  border: 1px solid #E3E3E3;
  border-radius: 5px;
  padding:0 10px;
  background: none;
  height:45px;
  width:30%;
  margin-right: 10px;
}
.select:focus{
  outline:none;
}
option{
  height:45px;
}
.general{
  padding: 50px 0;
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
}
.pswrd-input input{
  border:none;
}

</style>