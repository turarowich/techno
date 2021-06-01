<template>
  <div class="parent-modal">
    <div class="modal myModal fade" id="add_delivery_option" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content add_branch_modal_content">
          <div class="modal-header align-items-center">
            <h3 v-if="edit" class="modal-title">Edit Delivery option</h3>
            <h3 v-else class="modal-title">Add Delivery option</h3>
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
            </button>
          </div>
          <div class="modal-body add_branch_modal_body d-flex">
            <div class="add_branch_block">
              <input v-model="option_object.name" class="cashback-input company-input" placeholder="Name of the option">
              <div class="d-flex atitude">
                <div style="margin-right: 3px;flex: 1;">
                  <label>Cost</label>
                  <input v-model="option_object.price" class="cashback-input">
                </div>
                <div style="margin-left: 3px;flex: 1;">
                  <label>Minimum order sum</label>
                  <input v-model="option_object.minPrice" class="cashback-input">
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex">
            <button @click="saveOption" class="save">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "AddDeliveryOption",
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
    edit(){
      return Object.keys(this.edit_delivery).length !== 0;
    },
  },
  methods:{
    saveOption(){
      //check
      let messages = [];
      let that = this;
      if(this.option_object.name.length<1){messages.push('Fill in name')}
      if(this.option_object.price.length<1){messages.push('Fill in cost')}
      if(this.option_object.price < 0){messages.push('Cost cant be less than 0')}
      if(this.option_object.minPrice.length<1){messages.push('Fill in minimum sum')}
      if(this.option_object.minPrice < 0){messages.push('Minimum sum cant be less than 0')}
      if(messages.length>0){
        messages.forEach(function (mess){
          that.$warningAlert(mess);
        })
        return;
      }

      let url = this.url('addDeliveryOption');
      let alert_text = "Added";
      if(this.edit){
        alert_text = 'Updated';
        url = this.url('updateDeliveryOption');
      }

      this.axios.post(url, {
        option:this.option_object,
      }).then(function (response) {
        that.$successAlert(alert_text);
        $('#add_delivery_option').modal('hide');
        that.$emit('sendUpdate');
        console.log(response);
      }).catch(function(error){
        if (error.response) {
          // console.log(error.response.status);
          // console.log(error.response.headers);
          that.$warningAlert(Object.values(error.response.data.errors));
        }
      });
    },

  },
  watch:{
    edit_delivery:{
      handler(val, oldVal) {
        console.log('edit_delry list changed',val, oldVal)
        if(this.edit){
          let copy = $.extend(true,{},this.edit_delivery);
          this.option_object = copy;
        }else{
          //duplicate redo later
          this.option_object ={
            name: "",
            price: "",
            minPrice: "",
          }
        }
      },
      deep: true
    },
  },
}
</script>

<style scoped>
.circle-question{
  font-size: 14px;
  margin-bottom: 8px;
}
.cashback-input{
  width: 100%;
}
.company-input{
  margin-bottom: 25px;
}
.atitude{
  margin-bottom: 30px;
}
.add_branch_block{
  flex: 1;
}
.working-phones div{
  flex: 1;
}
.working-phones select{
  width: 70px;
}
.add_branch_modal_content{
  width: 500px;
  max-width: 500px;
}
.save{
  width: 120px;
}

.modal-content{
  border-bottom: none;
  padding: 18px 24px;
}
.modal-content .modal-header{
  padding: 0;
}
.add_branch_modal_body{
  padding: 0;
}
</style>