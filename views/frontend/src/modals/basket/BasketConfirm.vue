<template>
  <div class="parent-modal">
    <div class="modal myModal fade pr-0" id="confirmAsGuest" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content add_branch_modal_content">
          <div class="modal-header">
            <div style="font-size: 20px;" class="modal-title">Continue as a guest?</div>
            <div style="font-size: 16px;margin:0;">Guests can't use or receive points</div>
          </div>
          <div class="modal-body">
            <div>
              <label class="label">Name</label>
              <input v-model="guest.name" class="login-input" placeholder="Your name">
              <label  class="label">Phone number</label>
              <input type="number" v-model="guest.phone" class="login-input" placeholder="Phone number">
              <label class="label">Email</label>
              <input type="email" v-model="guest.email" class="login-input" placeholder="Email address">
            </div>

            <div class="confirmAsGuestClass">
              <div @click="confirm">Continue</div>
              <div data-dismiss="modal" aria-label="Close" >Cancel</div>
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
  name: "ConfirmAsGuestModal",
  props:  {
    edit_delivery: Object,
  },
  data(){
    return{
      guest:{
        name: "",
        phone: "",
        email: "",
      },
    }
  },
  computed:{

  },
  methods:{
    confirm(){
      let text = '';
      if(this.guest.name===''){   text+="Fill in your name, "}
      if(this.guest.phone===''){   text+="Fill in your phone number, "}
      if(this.guest.email===''){   text+="Fill in your email, "}
      if(text != ""){
        this.$warningAlert(text);
        return;
      }
      $('#confirmAsGuest').modal('hide');
      this.$emit('continueAsGuest_child',this.guest);
    },

  },
  watch:{

  },
}
</script>

<style scoped>
.login-input{
  height: 40px;
}
.working-phones div{
  flex: 1;
}
.working-phones select{
  width: 70px;
}
.add_branch_modal_content{
  width: 452px;
  max-width: 452px;
  /*height: 340px;*/
  margin-top: 20%;
  border:none;
}

.modal-content{
  border-bottom: none;
  padding: 0px 60px;
  border-radius: 20px;
}
.modal-content .modal-header{
  margin-top: 50px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.confirmAsGuestClass{
  padding: 0;
  display: flex;
  align-items: center;
}
.modal-dialog {
  max-width: 452px;
  margin: 1.75rem auto;
}
.confirmAsGuestClass div{
  width: 160px;
  height: 35px;
  flex: 1;
  border-radius: 5px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 20px;
}
.confirmAsGuestClass div:first-child{
  color: #FFFFFF;
  background: #616CF5;
  margin-right: 5px;
}
.confirmAsGuestClass div:last-child{
  color: #616CF5;
  background: #E9ECFF;
  margin-left: 5px;
}
.modal-body {
  margin-bottom: 40px;
}
@media(max-width:576px){
  .add_branch_modal_content{
    width: 96%;
    padding: 0 20px;
    border-radius:10px;
    margin-left: 2%;


  }

}
</style>