<template>

  <div>
    <div class="mb-3">
      <label class="switch d-flex">
        <input type="checkbox" @click="disabled = (disabled + 1) % 2" >
        <span class="slider round"><span class="enable">  Enable</span></span>
      </label>
    </div>
    <div  class="d-flex">
      <div class="add-promo p-2 ">

          <AddPromo v-bind:promocodes="promocodes"
              v-on:removePromo="removePromo"
          />
      </div>

      <div class="register-promo">
            <AddFormPromo v-on:submitPromo="submitPromo"
                          :removePromo="removePromo"

              />

      </div>

    </div>

  </div>

</template>

<script>
import AddPromo from "@/components/loyalty/PromoCodes/AddPromo";
import AddFormPromo from "@/components/loyalty/PromoCodes/AddFormPromo";
export default {
  name: "PromoCodes",
  components:{
    AddPromo,
    AddFormPromo
  },
  data(){
    return{
      promocodes:[],
    }
  },
  methods:{
    submitPromo(newPromo){
      this.promocodes.push(newPromo)

    },
    removePromo(id){
      alert("id selected "+ id)
      this.promocodes.filter(promo=>id !== promo.id)
    }
  }


}
</script>

<style scoped>
.add-promo{
  width: 30%;
  background: #F1F2F6;
  border: 1px solid #E4E4E4;
  box-sizing: border-box;
  border-radius: 5px;
 height:calc(100vh - 210px);
  margin-right: 10px;
  overflow: hidden;
  overflow-y: auto;
}

.register-promo{
  width: 70%;
  border: 1px solid #D3D3D3;
  box-sizing: border-box;
  border-radius: 5px;
  padding:30px;
  height:calc(100vh - 210px);
  overflow-y: auto;
}


.add-promo-btn{
  border: 1px solid #8C94A5;
  box-sizing: border-box;
  border-radius: 5px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#8C94A5;
  cursor:pointer;
}


</style>