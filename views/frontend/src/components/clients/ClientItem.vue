<template>
  <div v-for="client in clientList" class="table-item d-flex align-items-center justify-content-between" :key="client._id">
      <div  class="client-names table-child d-flex align-items-center">
          <div><label class="custom-checkbox"><input  type="checkbox"  @click="checkMainSelect" :ref="`select`+client._id"><span class="checkmark"></span></label></div>

         <div class="d-flex align-items-center justify-content-between" @click="$router.push('/edit-client-page')" style="cursor:pointer">
           <div class="table-img">
             <img src="../../assets/img/criw.jpg">
           </div>
           <span>
           {{client.name}}
           </span>
         </div>
      </div>
      <div class="table-child" v-show="data_check.birthday_checked" style="width: 12%;">{{client.birthDate}}</div>
      <div class="table-child" v-show="data_check.discount_checked" style="width: 10%;">10%</div>
      <div class="table-child" v-if="client.category !== undefined"  style="width: 14%;">{{client.category.name}}</div>
      <div class="table-child" v-show="data_check.register_date_checked"  style="width: 18%;">{{client.createdAt}}</div>
      <div class="client-phone table-child" style="width:14%" >{{client.phone}}</div>
      <div class="table-child"  style="width: 8%;">{{client.total}}</div>
      <div class="table-child" v-show="data_check.bonus_checked"  style="width: 8%;">{{client.bonus}}</div>
      <div class="table-child" v-show="data_check.last_purchase_checked"  style="width: 16%;">{{client.last_purchase}}</div>
      <div  style="width:3%" class="table-child dropleft dropMenu">
      <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img  src="../../assets/icons/three-dots.svg"
              class="three-dots">
      </div>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
        <ul class="list-group" >
          <li class="list-group-item" data-toggle="modal" data-target="#edit-client" @click="$emit('selectClient', client._id)">Edit</li>
          <li class="list-group-item" v-on:click="$emit('deleteClient',client._id)">Delete</li>
        </ul>
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
      newCheck: false
    }
  },
  methods: {
    checkAll(item) {
      return  this.$refs[`select${item._id}`].checked === true
    },
    checkMainSelect() {
      if(this.clientList.every(this.checkAll)){
          this.newCheck = true;
          this.$emit('checkAll', this.newCheck)
      }
      else{
          this.newCheck = false;
          this.$emit('unCheckAll', this.newCheck)
      }

    }

  }
}
</script>

<style scoped>

.client-names{
  width: 33%;

}


</style>