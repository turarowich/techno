<template>
<div>
  <form>
    <div class="row mb-5">
      <div class="col-lg-5">
        <label class="sum-point">Name</label>
        <input class="form-input cashback-input mb-4" placeholder="Your name">
        <label class="sum-point">Name of company</label>
        <input class="form-input cashback-input mb-4" placeholder="Company">
        <label class="sum-point">Password</label>
        <div class="pswrd-input mb-4">
          <input id="show-password" type="password" placeholder="Password">
          <img class="hide-eye" @click="showPassword" src="../../assets/icons/Hide.svg">
          <img class="show-eye"  @click="showPassword" src="../../assets/icons/eye.svg">
        </div>
        <label class="sum-point">Repeat password</label>
        <div class="pswrd-input">
          <input id="show-repeat" type="password" placeholder="Password">
          <img id="hide-eye" @click="showRepeat" src="../../assets/icons/Hide.svg">
          <img id="show-eye"  @click="showRepeat" src="../../assets/icons/eye.svg">
        </div>
      </div>

      <div class="col-lg-5">
        <label class="sum-point">Phone number</label>
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
        <label class="sum-point">Email</label>
        <input class="form-input cashback-input mb-4" placeholder="Email">
      </div>
    </div>

    <button class="save">Save</button>
  </form>
</div>
</template>

<script>
import $ from "jquery";

export default {
  name: "PersonalSettings",
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
    }
  },

}
</script>

<style scoped>
.save{
  width: 120px;

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
  width:100%;
  height:100%;
}
.select-phone{
  width:30%;
  margin-right: 10px;
}
.cashback-input{
  width: 100%;
}
</style>