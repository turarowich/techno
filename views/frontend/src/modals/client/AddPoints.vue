<template>
  <div class="parent-modal">
    <div class="modal myModal fade" id="add-points" tabindex="-1" role="dialog" aria-labelledby="add-points" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content category-content">
          <div class="modal-header category-header align-items-center">
           <div>
             <h3 class="modal-title">Add points</h3>
             <span class="under-title">Сurrent number of points 20</span>
           </div>
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/xBlack.svg" alt="">
              </span>
            </button>
          </div>
          <div class="modal-body category-body">
            <!-- <form class="modal-form"> -->
              <label>Quantity</label><br>
              <input  class="cashback-input mb-3"  placeholder="Enter a quantity">

              <label>Comments</label><br>
              <textarea class="general-area p-2" placeholder="Description"></textarea>
              <button  class="save">Add</button>
            <!-- </form> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
    name: "AddPoints",
    data(){
        return{
            points: 0,
            comment: 0,
        }
    },
    methods:{

        onSubmit(){
            this.axios.post(this.url('addPoints'),{
                // client: this.client._id,
                points: this.points,
                comment: this.comment,
            })
            .then(()=>{
                this.$informationAlert("Successfull")
                this.getClients()
                $('#add-points').modal("hide")
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
}
.save{
  width: 120px;
}
.under-title{
  color: #8C94A5;
  font-size: 16px;
}
</style>