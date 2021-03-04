<template>
  <div  v-for="order in orderList" class="table-item d-flex align-items-center" :key="order.id">
    <div  style="width: 3%;"><label class="custom-checkbox"><input  type="checkbox" :value="order.id" v-model="order.checked"><span class="checkmark"></span></label></div>
    <div  class="d-flex align-items-center"  style="width: 20%;">
      <div class="table-img">
        <img src="../../assets/img/sneak.webp">
      </div>
      {{order.name}}
    </div>

    <div  style="width: 14%;">{{order.client}}</div>
    <div  style="width: 12%;">{{order.phone}}</div>
    <div  style="width: 10%;">{{order.total}}</div>
    <div  style="width: 10%;">{{order.date}}</div>
    <div  style="width: 18%;">{{order.notes}}</div>
    <div  style="width: 10%;"  :class="computedClass">
      <i class=" circle-status fas fa-circle"></i>
      {{order.status}}
    </div>
    <div  style="width:3%">
      <div class="dropleft dropMenu">
      <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img  src="../../assets/icons/three-dots.svg"
              class="three-dots">
      </div>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
        <ul class="list-group " >
          <li class="list-group-item" v-on:click="$emit('done',order.id)">Done</li>
          <li class="list-group-item">Edit</li>
          <li class="list-group-item">Cancel</li>
          <li class="list-group-item" v-on:click="$emit('deleteOrder',order.id)">Delete</li>
          <li class="list-group-item" v-on:click="$emit('inProgress',order.id)">In progress</li>
        </ul>
      </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "OrderItem",
  props: {
    orderList: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data(){
    return{
      count_order: 0,
    }
  },
  computed: {
    computedClass() {
      let className = 'redd'
      return className
    }
  }


}

</script>

<style scoped>

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
.redd{
  color:red;
}
.green{
  color:#5CBD85;
}
.orange{
  color:orange;
}
.status{
  color:#000;
}
</style>