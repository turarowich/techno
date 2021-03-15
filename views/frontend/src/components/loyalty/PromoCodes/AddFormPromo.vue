<template>
  <form @submit.prevent="onSubmit">
    <div style="width: 80%">
      <div class="mb-10">
        <label>Name</label>
        <input class="cashback-input" required v-model="addPromo.name" placeholder="Promo code name" style="width: 100%">
      </div>

      <div class="d-flex generate-promo marginBottom">
        <div style="width: 50%" class="promo-block">
          <label>Code</label>
          <div class="input-box d-flex align-items-center"><input placeholder="Generate code"><img class="qr" src="../../../assets/img/qr.svg"></div>
        </div>
        <div style="width: 50%">
          <label>Sale</label>
          <div class="input-box"><input required v-model="addPromo.sale"  class="sale" placeholder="Enter the discount value"></div>
        </div>
      </div>


      <div class="marginBottom">
        <p class="color-p">Validity Period</p>
        <div class="d-flex validity-period">
          <div class="d-flex align-items-center from" style="width:50%">
            <label>From</label>
            <div style="width: 100%" class="input-box d-flex align-items-center"><input required v-model="addPromo.date" placeholder="Select a date"  type="date"></div>
          </div>

          <div class="d-flex align-items-center from" style="width:50%">
            <label>To</label>
            <div style="width: 100%" class="input-box d-flex align-items-center"><input placeholder="Select a date"  type="date"></div>
          </div>
        </div>
      </div>

      <div class="valid-for marginBottom">
        <p class="color-p">Valid for</p>
        <div class="d-flex">
          <div class="valid-btn"> <button>Services</button></div>
          <div  class="valid-btn"><button>Services</button></div>
          <div  class="valid-btn"><button>Services</button></div>
        </div>
      </div>

      <div class="select-service mb-5">
        <p class="color-p">Select Services</p>
        <select class="form-control long-form-control select-phone mb-3" style="width: 70%;" aria-label="Default select example">
          <option>+996834</option>
          <option>+996834</option>
          <option>+996834</option>
          <option>+996834</option>
          <option>+996834</option>
          <option>+996834</option>
          <option>+996834</option>
          <option>+996834</option>

        </select>
        <input class="cashback-input" style="width: 70%; margin-right:10px;" placeholder="+ add services or category">
        <button class="cash-btn text-center"><img src="../../../assets/icons/enable+.svg"></button>
      </div>
      <div class="d-flex">
        <button class="save" type="submit">Save</button>
        <button class="remove">Remove</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "AddFormPromo",
 props:{
    removePromo:{
      type:Function,
      required:true
    }
 },
  data(){
    return{
      addPromo:{
        name:'',
        sale:'',
        date:'',
        id:Date.now()
      }
    }
  },
  methods:{
    onSubmit(){
      const newPromo = this.addPromo
      this.$emit('submitPromo', newPromo)
      this.addPromo = {id:Date.now()
      }
    },

  }
}
</script>

<style scoped>
.input-box{
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  height: 45px;
  padding-left:20px;

}
.qr {
  margin-right: 5px;
  cursor:pointer;
}
.valid-btn{
  width: 33.33%;
  margin-right: 10px;
}
.mb-10{
  margin-bottom:10px;
}
.promo-block{
  margin-right: 10px;
}

.remove{
  background: none;
  border-radius: 5px;
  color:#d81919;
  height:37px;
  display: flex;
  align-items: center;
  border:1px solid #d81919;
  justify-content: center;;
  font-size: 16px;
  width: 120px;
}


.input-box input{
  width: 100%;
  height: 100%;
  border:none;


}

.validity-period label ,.from{
  margin-right: 10px;
  color:#8C94A5;

}
.sale{
  background: transparent;
}
label{
  margin-bottom: 5px;
}
.valid-for button{
  width: 100%;
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  height: 30px;
  background: none;
}
input[type="date"]{
  color:#b0b0b0;
}

</style>