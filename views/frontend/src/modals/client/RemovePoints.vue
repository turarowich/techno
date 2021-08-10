<template>
  <div class="parent-modal">
    <div class="modal myModal fade" id="remove-points" tabindex="-1" role="dialog" aria-labelledby="remove-points" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content category-content">
          <div class="modal-header category-header align-items-center">
            <div>
              <h3 class="modal-title">Remove points</h3>
              <span class="under-title">Сurrent number of points {{client.points}}</span>
            </div>
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/xBlack.svg" alt="">
              </span>
            </button>
          </div>
          <div class="modal-body category-body">
            <form class="modal-form">
              <label>Quantity</label><br>
              <input type="number" v-model="points" class="cashback-input mb-3"  placeholder="Enter a quantity">

              <label>Comments</label><br>
              <textarea v-model="comments" placeholder="Description" class="p-2 general-area"></textarea>
              <button @click.prevent="onSubmit"  class="save">Write off</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "RemovePoints",
  props:['client','getClient'],
  data(){
    return{
      points:'',
      comments:'',
    }
  },
  methods:{
    onSubmit(){
      this.axios.post(this.url('deductPoints'),{
        client: this.client._id,
        points: this.points,
        comments: this.comments,
      })
          .then(()=>{
            this.$informationAlert("Point has been deleted")
            this.getClient()
            $('#remove-points').modal("hide")
            this.points = '';
            this.comments = ''
          }).catch((error)=>{
        if(error.response && error.response.data){
          this.$warningAlert(error.response.data.msg)
        }
      });

    },
  }

}
</script>

<style scoped>
.cashback-input{
  width: 100%;
}
.category-content{
  margin-top: 20%;
}
.general-area{
  margin-bottom: 30px;
  font-size: 14px;
}
.save{
  width: 120px;
}
.under-title{
  color: #8C94A5;
  font-size: 16px;
}
</style>