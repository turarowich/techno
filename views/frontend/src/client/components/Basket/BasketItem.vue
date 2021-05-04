<template>
  <div>
    <div class="text-center empty-basket" v-if="shoppingList.length === 0">
      <img src="../../../assets/clients/box.png">
      <h4>Your shopping cart is empty please choose your product from out catalog</h4>
    </div>
    <div v-else class="client-table-item d-flex" v-for="cart in shoppingList" :key="cart.id">
      <div style="width:40%" class="d-flex align-items-center">
        <div class="client-table-img">
          <img src="../../../assets/clients/shirt.svg">
        </div>
        <div>
          <h3 class="table-title">{{cart.name}}</h3>
          <p class="table-parag">{{cart.code}}</p>
        </div>
      </div>
      <div style="width:20%">
        <button class="decrease mb-0" @click="decrease(cart._id)">-</button>
        <span class="count">{{cart.quantity}}</span>
        <button class="increase mb-0" @click="increase(cart._id)">+</button>
      </div>
      <div style="width:14%">50%</div>
      <div style="width:14%">{{cart.price}} $</div>
      <div style="width:12%" class="d-flex justify-content-end pr-3"><img @click="deleteFromCart(cart.id)" src="../../../assets/clients/x.svg"></div>
    </div>
  </div>
</template>

<script>
export default {
name: "BasketItem",
  props:['shoppingList',],
  methods: {
      deleteFromCart(id) {
          this.$store.dispatch('deleteFromCart', id);

      },
    increase(id){
      this.shoppingList.map((item)=>{
        if(item._id === id){
            item.quantity+=1
        }
      })

    },
    decrease(id){
      this.shoppingList.map((item)=>{
        if(item._id === id){
          while(item.quantity !== 1){
             return item.quantity-=1
          }
        }
      })


    }


  }
}
</script>

<style scoped>

.client-table-item{
  height: 100px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #E4E4E4;
}
.client-table-img{
  height: 70px;
  width: 70px;
  margin-right: 16px;
}
.client-table-img img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.table-title{
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}
.table-parag{
  color: #B0B0B0;
}
.empty-basket{
  height: 300px;
  border-radius:10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.empty-basket h4{
  color:#b0b0b0;
font-size:16px;
}
.empty-basket img{
  width:80px;
  margin-bottom: 20px;

}
</style>