<template>
    <div>
      <div v-if="clientList.length==0" class="d-flex align-items-center flex-column justify-content-center" style="height:calc(100vh - 350px)">
            <img style="width:70px; height:70px; margin-bottom:10px" src="../../assets/icons/clientbase.svg">
            <span style="color:#8C94A5">Не найдено</span>
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
        <div class="client-phone table-child pr-2" v-if="data_check.phone_checked"  style="width:14%" >{{client.phone}}</div>
        <div class="table-child" v-if="data_check.total_checked"  style="width: 8%;">{{client.balance.toFixed(0)}}</div>
        <div class="table-child" v-on:click="$emit('viewDetails',client.scans,client.name)" v-if="data_check.last_scan_checked && scannerStatus"  style="width: 5%;">View details</div>
        <div  style="width:3%" class="table-child dropleft dropMenu">
          <div v-if="check()" class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img  src="../../assets/icons/three-dots.svg" class="three-dots">
          </div>
          <div v-if="check()" class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
            <ul class="list-group" >
              <li class="list-group-item" data-toggle="modal" id="editUser" value="1beka" data-target="#edit-worker" @click="$emit('selectClient', client._id)">Изменить</li>
              <li class="list-group-item" v-on:click="$emit('deleteClient',client._id)">Удалить</li>
            </ul>
          </div>
        </div>
      </div>
  
    </div>
  
  </template>
  
  <script>
  export default {
    name: "WorkerItem",
    props: ['clientList', 'data_check','scannerStatus'],
    data(){
      return {
        imgSrc:''
      }
    },
    methods: {
      clientProfile(id){
        this.$router.push(`/edit-worker-page/${id}`);
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
  