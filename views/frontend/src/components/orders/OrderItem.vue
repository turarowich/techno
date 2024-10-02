<template>
  <div>
    <div v-if="orderList.length===0" class="text-center empty-box" >
      <img src="../../assets/icons/emptyOrder.svg">
      <p class="empty-page-text">За выбранный период заказов нет.</p>
    </div>
   <div v-else>
     <div  v-for="order in orderList" class="table-item d-flex justify-content-between align-items-center" :key="order._id">
       <div class="table-child d-flex align-items-center"  style="width: 18%;">
         <div><label class="custom-checkbox"><input  type="checkbox"  v-model="order.selected" @change="$emit('checkSelection')"><span class="checkmark"></span></label></div>
         {{order.sample.name}}
       </div>
       <div v-if="order.sample" class="table-child d-flex align-items-center"  style="width: 25%;">
         <div  class="table-img">
           <img  v-if="order.sample && order.sample.img" :src="imgSrc+'/'+order.sample.img">
           <img v-else src="../../assets/icons/no-catalog.svg">
         </div>
         <span style="overflow: hidden;text-overflow: ellipsis;">{{order.sample.name ? order.sample.name : 'empty'}}</span>
       </div>
       <div v-if="order.client" class="table-child" v-show="data_check.client_checked"  style="width: 20%;">
         {{order.client ? order.client.name : ''}}
       </div>
       <div v-else class="table-child" v-show="data_check.client_checked"  style="width: 25%;">
         Guest - {{order.client_name}}
       </div>

       <div class="table-child" v-show="data_check.phone_checked" style="width: 18%;">
         {{order.client_name ? order.client_phone : ''}}
       </div>
       <div  class="table-child"  style="width: 10%;">{{order.quantity}}</div>
       <div  class="table-child"  style="width: 10%;">{{order.totalPrice}} RUB</div>
       <div class="table-child" v-show="data_check.date_checked"  style="width: 13%;">{{order.createdAt.split('').slice(0,10).join('')}}</div>
       <div class="table-child  pr-3" v-show="data_check.notes_checked" style="width: 10%;" ><div class="long-text">{{order.notes}}</div></div>
       <div 
            class="table-child"
            style="width: 10%;"
            :class="[{red: order.status == 3},
                  {green: order.status == 2},
                  {orange: order.status == 1},
          ]">
         <i class="circle-status fas fa-circle"></i>
         {{orderStatuses[order.status]}}
       </div>
       <div class="table-child" style="width:3%">
         <div class="dropleft dropMenu">
           <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             <img  src="../../assets/icons/three-dots.svg"
                   class="three-dots">
           </div>
           <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
             <ul class="list-group " >
               <!--              <li v-if="!['Cancelled','Done'].includes(order.status) && check()" class="list-group-item" data-toggle="modal" data-target="#edit-order" @click="$emit('selectOrder',order._id)">Edit</li>-->
               <li v-if="check()" class="list-group-item" data-toggle="modal" data-target="#add-order" @click="$emit('selectOrder',order._id)">
                 <span v-if="![2].includes(order.status)">Изменить</span>
                 <span v-else>Посмотреть</span>
               </li>
               <li class="list-group-item" v-if="check()" v-on:click="$emit('deleteOrder',order._id)">Удалить</li>
               <li v-if="check('canChangeOrderStatus', null, null)" class="list-group-item" v-on:click="statusChange(order, +order.status+1)">{{ orderStatuses[+order.status + 1] }}</li>
             </ul>
           </div>
         </div>
       </div>
     </div>
   </div>
  </div>
</template>
<script>
export default {
  name: "OrderItem",
  props: {
    orderList: { },
    data_check: {
      type: Object
    },
    orderStatuses: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      newCheck: false,
      imgSrc:''
    }
  },
  computed:{
    catalog_settings(){
      return this.$store.getters['Catalog/getCatalog_settings'];
    },
  },
  methods: {
    onDecode (decodedString) {
      console.log(decodedString);
    },
    check(access="orders", parametr="active", parametr2="canEdit"){
        return this.checkAccess(access, parametr, parametr2)
    },
    statusChange(order,status){
        this.axios.put(this.url('updateOrderStatus',order._id), {status: status}).then(()=>{
            order.status = status;
        }).catch((error)=>{
                if(error.response && error.response.data){
                    this.$warningAlert(error.response.data.msg)
                }
        });
        //send push
        let pushable = [0,1,2]
        if(pushable.includes(status) && order.client){
          this.axios.post(this.url('updateOrderWeb'), {status: status,order:order._id,code:order.code,client:order.client._id}).then(()=>{
          }).catch((error)=>{
            if(error.response && error.response.data){
              this.$warningAlert(error.response.data.msg)
            }
          });
        }
    },

  }
,
mounted() {
  this.imgSrc = this.$server;

}
}

</script>

<style scoped>
.empty-box{
  left: 50%;
}
.empty-box img{
  width: 63px;
  height: 70px;
  margin-bottom: 20px;
}
.name-info span{
  width:30px;
  height:30px;
  border-radius:30px;
  background: #B2BDFD;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status{
  color:#000;
}
.long-text{
  width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.comment-width{

  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}
.red{
  color:#E94A4A;
}
.disabled {
  pointer-events: none;
  border:1px solid red;
}
</style>