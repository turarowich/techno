<template>
  <div>
    <div class="text-center empty-basket" v-if="shoppingCart.length === 0">
      <img src="../../../assets/clients/box.png">
      <h4>Your shopping cart is empty please choose your product from out catalog</h4>
    </div>
    <div v-else class="client-table-item d-flex" v-for="item in shoppingCart" :key="item.product._id">
      <div style="width:40%" class="d-flex align-items-center">
        <div class="client-table-img">
          <img src="../../../assets/clients/shirt.svg">
        </div>
        <div>
          <h3 class="table-title">{{item.product.name}}</h3>
          <p class="table-parag">{{item.product.article}}</p>
        </div>
      </div>
      <div style="width:20%">
        <button class="decrease mb-0" @click="decrease(item.product._id)">-</button>
        <span class="count">{{item.quantity}}</span>
        <button class="increase mb-0" @click="increase(item.product._id)">+</button>
      </div>
      <div style="width:14%">{{item.discount_percent}}%</div>
      <div style="width:14%">{{item.discount_sum}}</div>
      <div style="width:14%">{{item.current_price}} $</div>
      <div style="width:12%" class="d-flex justify-content-end pr-3"><img @click="removeFromBasket(item.product._id)" src="../../../assets/clients/x.svg"></div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "BasketItem",
  computed:{
    shoppingCart(){
      return this.$store.state.Orders.shoppingCart;
    },
    basket_promocode(){
      return this.$store.getters['Orders/getBasketPromocode'];
    },
  },
  methods: {
    removeFromBasket(id) {
      Swal.fire({
          showConfirmButton: true,
          html: 'Are you sure u want to remove this <br>item',
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: 'Remove',
          buttonsStyling:false,
          customClass:{
              popup: 'sweet-delete',
              confirmButton: 'confirm-btn',
              cancelButton:'cancel-btn',
              actions:'btn-group',
              content:'content-sweet',
              closeButton:'close-btn'
          },
      }).then((result) => {
          if (result.isConfirmed) {
              this.$store.dispatch('Orders/removeFromBasket', id);
              this.$emit('checkPromocode_child',this.basket_promocode);
              Swal.fire({
                  timer:1500,
                  title:'Removed',
                  text:"You have removed this product from your cart",
                  showConfirmButton:false,
                  position: 'top-right',
                  customClass:{
                      popup:'success-popup information-popup',
                      content:'success-content',
                      title:'success-title',
                      header:'success-header',
                      image:'success-img'
                  },
              })
          }
      })
    },
    increase(id){
        this.$store.dispatch('Orders/increaseQuantity', id);
        this.$emit('checkPromocode_child',this.basket_promocode);
    },
    decrease(id){
        this.$store.dispatch('Orders/decreaseQuantity', id);
        this.$emit('checkPromocode_child',this.basket_promocode);
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