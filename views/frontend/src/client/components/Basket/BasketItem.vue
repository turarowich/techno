<template>
  <div>
    <div class="text-center empty-basket" v-if="shoppingList.length === 0">
      <img src="../../../assets/clients/box.png">
      <h4>Your shopping cart is empty please choose your product from out catalog</h4>

    </div>

    <div v-else class="client-table-item d-flex" v-for="cart in shoppingList" :key="cart.id">
      <div style="width:40%" class="d-flex align-items-center">
        <div class="client-table-img">
          <img :src="cart.image[0]">
        </div>
        <div>
          <h3 class="table-title">{{cart.name}}</h3>
          <p class="table-parag">{{cart.code}}</p>
        </div>
      </div>
      <div style="width:20%">
        <button class="decrease mb-0" @click="decrease(cart.id)">-</button>
        <span class="count">{{cart.count}}</span>
        <button class="increase mb-0" @click="increase(cart.id)">+</button>
      </div>
      <div style="width:14%">{{cart.discount}}</div>
      <div style="width:14%">{{cart.price}} $</div>
      <div style="width:12%" class="d-flex justify-content-end pr-3"><img @click="deleteFromCart(cart.id)" src="../../../assets/clients/x.svg"></div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
name: "BasketItem",
  props:['shoppingList','countTotalPrice'],

  methods: {
    ...mapMutations(["deleteFromCart"]),
    deleteFromCart(id) {
      this.$store.dispatch('deleteFromCart', id)
      this.countTotalPrice();

    },
    increase(id){
      this.shoppingList.map((item)=>{
        if(item.id === id){
            item.count+=1
        }
      })
      this.countTotalPrice();
    },
    decrease(id){
      this.shoppingList.map((item)=>{
        if(item.id === id){
          while(item.count !== 1){
             return item.count-=1
          }
        }
      })
      this.countTotalPrice()
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