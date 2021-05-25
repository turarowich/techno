<template>
  <div>
    <div v-if="orderList.length === 0" class="text-center empty-box" >
      <img src="../../assets/icons/emptyOrder.svg">
      <p class="empty-page-text">You have no orders yet</p>
    </div>
    <div v-else v-for="order in orderList" class="table-item d-flex justify-content-between align-items-center" :key="order.id">

      <div class="table-child d-flex align-items-center"  style="width: 18%;">
        <div><label class="custom-checkbox"><input  type="checkbox"  @click="checkMainSelect"  :ref="'select'+order.id" :value="order.id" ><span class="checkmark"></span></label></div>

        34543</div>
      <div v-for="product in order.products"  :key="product._id" class="table-child d-flex align-items-center"  style="width: 30%;">
        <div class="table-img">
          <img src="../../assets/img/sneak.webp">
        </div>
        {{product.name}}
      </div>

      <div class="table-child" v-show="data_check.client_checked"  style="width: 25%;">{{order.client_name}}</div>
      <div class="table-child" v-show="data_check.phone_checked" style="width: 20%;">{{order.client_phone}}</div>
      <div v-for="price in order.products"  :key="price._id"  class="table-child" style="width: 10%;">{{price.price.toString().slice(1,4)}} $</div>
      <div class="table-child" v-show="data_check.date_checked"  style="width: 15%;">{{order.createdAt.split('').slice(0,10).join('')}}</div>
      <div class="table-child pr-3" v-show="data_check.notes_checked" style="width: 10%;" ><div>{{order.notes}}</div></div>
      <div class="table-child" style="width: 15%;"
            :class="[{red: order.status === 'Canceled'},
          {green: order.status === 'Done'},
          {orange: order.status === 'In Progress'},
          {new: order.status === 'New'}
          ]">

        <i class=" circle-status fas fa-circle"></i>
        {{order.status}}
      </div>
      <div class="table-child" style="width:3%">
        <div class="dropleft dropMenu">
          <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img  src="../../assets/icons/three-dots.svg"
                  class="three-dots">
          </div>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
            <ul class="list-group " >
              <li class="list-group-item" v-on:click="$emit('done',order.id)">Done</li>
              <li class="list-group-item" data-toggle="modal" data-target="#edit-order">Edit</li>
              <li class="list-group-item" @click="$emit('canceled' ,order.id)">Cancel</li>
              <li class="list-group-item" v-on:click="$emit('deleteOrder',order.id)">Delete</li>
              <li class="list-group-item" v-on:click="$emit('inProgress',order.id)">In progress</li>
            </ul>
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
    orderList: {
      type: Array,
      default: function () {
        return []
      },
    },
    data_check: {
      type: Object
    },


  },
  data() {
    return {
      newCheck: false
    }
  },
  methods: {
    checkAll(item) {
      return  this.$refs[`select${item.id}`].checked === true
    },
    checkMainSelect() {
      if(this.orderList.every(this.checkAll)){
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
.red{
  color:red;
}
.green{
  color:#5CBD85;
}
.orange{
  color:orange;
}
.new{
  color:#616CF5;
}
.status{
  color:#000;
}
.comment-width{

  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;

}
</style>