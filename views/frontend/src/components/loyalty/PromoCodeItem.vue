<template>
 <div>
   <div v-for="promocode in promocodes" :key='promocode._id' class="table-item d-flex align-items-center" >
     <div  style="width: 3%;"><label class="custom-checkbox"><input  type="checkbox"  ><span class="checkmark"></span></label></div>
     <div  class="d-flex align-items-center"  style="width: 24%;">
       <div class="table-img">
         <img src="../../assets/img/sneak.webp">
       </div>
       {{promocode.name}}
     </div>

     <div  style="width: 12%;">25</div>
     <div  style="width: 13%;">{{promocode.percent}}</div>
     <div  style="width: 16%;">{{promocode.code}}</div>
     <div  style="width: 16%;">{{promocode.endDate.slice(0,10) }}</div>
     <div  style="width: 13%;" >
       <div class="history-btn" data-toggle="modal" data-target="#history-promocode">
         <img src="../../assets/icons/History.svg">
       </div>
     </div>
     <div  style="width:3%">
       <div class="dropleft dropMenu">
         <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           <img  src="../../assets/icons/three-dots.svg" class="three-dots">
         </div>
         <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
           <ul class="list-group " >
             <li class="list-group-item" @click="getEditPromocode(promocode._id)">Edit</li>
             <li class="list-group-item">Delete</li>
           </ul>
         </div>
       </div>
     </div>
   </div>

 </div>
</template>

<script>
export default {
  name: "PromoCodeItem",
  computed:{
    promocodes(){
      return this.$store.state.Promocode.promocodes;
    }
  },
  mounted() {
    this.$store.dispatch("Promocode/setPromocodeAPI",this.axios);
  },
  methods:{
    getEditPromocode(id){
      let that = this;
      this.axios.get('https://localhost:8443/api/getPromocode',{
        params: {
          "promocode":id,
        }
      }).then(function(response){
        that.$store.dispatch("Promocode/setPromocodeObject",response.data.object);
        that.$store.dispatch("Promocode/setEditState",true);
        console.log('setssss')
        that.$router.push('/add-promo-page');
      }).catch(function(error){
        console.log(error);
      });
    },
  },
}
</script>

<style scoped>
.no-item{
  position: absolute;
  top: 60%;
  left:50%;
  text-align: center;
}
.no-item{
  color:#8C94A5;
  font-size: 16px;
}
.history-btn{
  padding: 7px;
  background: #E9ECFF;
  border-radius:5px;
  width:34px;
  height: 34px;
}
</style>