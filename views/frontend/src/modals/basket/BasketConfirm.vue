<template>
  <div class="parent-modal">
    <div class="modal myModal fade" id="confirmAsGuest" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content add_branch_modal_content">
          <div class="modal-header">
            <div style="font-size: 20px;" class="modal-title">Continue as a guest?</div>
            <div style="font-size: 16px;margin:0;">Guests can't use or receive points</div>
          </div>
          <div class="modal-body confirmAsGuestClass">
            <div @click="confirm" data-dismiss="modal" aria-label="Close">Continue</div>
            <div data-dismiss="modal" aria-label="Close" >Cancel</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmAsGuestModal",
  props:  {
    edit_delivery: Object,
  },
  data(){
    return{
      option_object:{
        name: "",
        price: "",
        minPrice: "",
      },
    }
  },
  computed:{

  },
  methods:{
    confirm(){
      this.$emit('continueAsGuest_child');
    },

  },
  watch:{

  },
}
</script>

<style scoped>
.working-phones div{
  flex: 1;
}
.working-phones select{
  width: 70px;
}
.add_branch_modal_content{
  width: 452px;
  max-width: 452px;
  height: 213px;
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
</style>