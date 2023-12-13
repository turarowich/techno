<template>
  <div>
    <div v-if="clientList.length==0" class="d-flex align-items-center flex-column justify-content-center" style="height:calc(100vh - 350px)">
          <img style="width:70px; height:70px; margin-bottom:10px" src="../../assets/icons/clientbase.svg">
          <span style="color:#8C94A5">Client base is empty</span>
    </div>

    <div v-else v-for="client in clientList" class="table-item d-flex align-items-center justify-content-between" :key="client._id">
      <div  class="client-names table-child d-flex align-items-center">
        <div><label class="custom-checkbox"><input  type="checkbox"  v-model="client.selected" @change="$emit('checkSelection')"><span class="checkmark"></span></label></div>
        <div class="d-flex align-items-center justify-content-between" @click="clientProfile(client._id)" style="cursor:pointer">
          <div class="table-img">
            <img v-if="!client.avatar" src="../../assets/icons/chat.svg">
            <img v-else :src="imgSrc+'/'+client.avatar">
          </div>
          <span>
           {{client.name}}
           </span>
        </div>
      </div>
      <div class="table-child" v-if="data_check.birthday_checked" style="width: 12%;">{{client.birthDate ? client.birthDate.slice(0,10) :  '' }}</div>
      <div class="table-child" v-show="data_check.discount_checked" style="width: 10%;">{{client.discount? client.discount : '0'}} %</div>
      <div class="table-child" v-if="data_check.category_checked" style="width: 14%;">
        {{ client.category ? client.category.name : "no category" }}
      </div>
      <div class="table-child" v-if="data_check.register_date_checked"  style="width: 18%;">{{ client.createdAt ? client.createdAt.slice(0,10) : ""}}</div>
      <div class="client-phone table-child pr-2" v-if="data_check.phone_checked"  style="width:14%" >{{client.phone}}</div>
      <div class="table-child" v-if="data_check.total_checked"  style="width: 8%;">{{client.total.toFixed(0)}}</div>
      <div class="table-child" v-show="data_check.bonus_checked"  style="width: 8%;">{{client.points}}</div>
      <div class="table-child" v-show="data_check.last_purchase_checked"  style="width: 6%;">{{client.last_purchase?JSON.stringify(client.last_purchase).slice(1,11):'-'}}</div>
      <div class="table-child" v-on:click="$emit('viewDetails',client.scans,client.name)" v-show="data_check.last_scan_checked"  style="width: 5%;">View details</div>
      <div class="table-child" v-show="data_check.number_of_scans_checked"  style="width: 5%;">{{client.scans.length}}</div>
      <div  style="width:3%" class="table-child dropleft dropMenu">
        <div v-if="check()" class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img  src="../../assets/icons/three-dots.svg" class="three-dots">
        </div>
        <div v-if="check()" class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
          <ul class="list-group" >
            <li class="list-group-item" data-toggle="modal" id="editUser" value="1beka" data-target="#edit-client" @click="$emit('selectClient', client._id)">Edit</li>
            <li class="list-group-item" v-on:click="$emit('deleteClient',client._id)">Delete</li>
          </ul>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "OrderItem",
  props: ['clientList', 'data_check',],
  data(){
    return {
      imgSrc:''
    }
  },
  methods: {
    clientProfile(id){
      this.$router.push(`/edit-client-page/${id}`);
    },

    check(access="clients", parametr="active", parametr2="canEdit"){
        return this.checkAccess(access, parametr, parametr2)
    },



  },
  mounted(){
    this.imgSrc=this.$server
  }
}
</script>

<style scoped>

.client-names{
  width: 33%;

}


</style>