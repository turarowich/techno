<template>
  <div  v-for="client in clientList" class="table-item d-flex align-items-center" :key="client.id">
    <div  style="width: 3%;"><label class="custom-checkbox"><input  type="checkbox" :value="client.id" v-model="client.checked"><span class="checkmark"></span></label></div>
    <div  style="width: 18%;" class="d-flex align-items-center">
      <div class="table-img">
        <img src="../../assets/img/criw.jpg">
      </div>
      {{client.name}}
    </div>
    <div  style="width: 14%;">{{client.category}}</div>
    <div  style="width: 12%;">{{client.phone}}</div>
    <div  style="width: 10%;">{{client.total}}</div>
    <div  style="width: 10%;">{{client.bonus}}</div>
    <div  style="width: 18%;">{{client.last_purchase}}</div>
    <div  style="width: 12%;"></div>
    <div  style="width:3%">
      <div class="dropleft dropMenu">
        <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img  src="../../assets/icons/three-dots.svg"
                class="three-dots">
        </div>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
          <ul class="list-group" >
            <li class="list-group-item">Done</li>
            <li class="list-group-item">Edit</li>
            <li class="list-group-item">Cancel</li>
            <li class="list-group-item" v-on:click="$emit('deleteClient',client.id)">Delete</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "OrderItem",

props:{
    clientList:{
      type:Array,
      required:true
    }
}






}

</script>

<style scoped>
tr{
  cursor: pointer;
}
tr td{
  font-size: 14px;
  border-top:none;
  border-bottom:1px solid #dee2e6;
  vertical-align: middle;

}
tr:hover{
  background: #F8F9FF;

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
.name-info{
  display: flex;
  align-items: center;
}
.three-dots:hover{
  fill:red;
}

</style>