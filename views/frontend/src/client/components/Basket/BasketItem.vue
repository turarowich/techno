<template>
  <div>
    <div class="text-center empty-basket" v-if="shoppingCart.length === 0">
      <img src="../../../assets/clients/box.png">
      <h4>Your shopping cart is empty please choose your product from out catalog</h4>
    </div>
    <div v-else class="client-table-item d-flex" v-for="item in shoppingCart" :key="item.product._id">
      <div style="width:40%;overflow: hidden;text-overflow: ellipsis;" class="basket-name d-flex align-items-center">
        <div class="client-table-img">
          <img v-if="!item.product.error" :src="server+'/'+item.product.img" @error="item.product.error=true">
          <img v-else src="../../../assets/icons/no-catalog.svg" >
        </div>
        <div>
          <h3 class="table-title">{{item.product.name}}</h3>
        </div>
      </div>
      <div style="width:20%" class="basket-amount">
        <button class="decrease mb-0" @click="decrease(item.product._id)">-</button>
        <span class="count">{{item.quantity}}</span>
        <button class="increase mb-0" @click="increase(item.product._id)">+</button>
      </div>
      <div style="width:30%;" class="hide">
        <span>
          {{item.current_price}} $
        </span>
        <br>
        <div v-if="item.current_price<(item.product.price*item.quantity)" class="discounts_block">
          <span class="lineThrough">{{item.product.price*item.quantity}}$ </span>
          <span style="color: #E94A4A;" v-if="item.isDiscounted">Discount {{item.discount_sum}}$</span>
          <span style="color: #E94A4A;" v-else>Discount {{item.discount_percent_sum}}$</span>
        </div>
      </div>
      <div style="width:10%" class="d-flex justify-content-end pr-3"><img @click="removeFromBasket(item.product._id)" src="../../../assets/clients/x.svg"></div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "BasketItem",
  data(){
    return{
      today:new Date(),
    }
  },
  computed:{
    company_url_basket(){
      return this.$store.getters['Orders/getCompany_url_basket'];
    },
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
    shoppingCart(){
      if(this.currentCompanyCatalog!==this.company_url_basket){
        return [];
      }
      return this.$store.state.Orders.shoppingCart;
    },
    basket_promocode(){
      return this.$store.getters['Orders/getBasketPromocode'];
    },
    server(){
      return this.$server;
    },
  },
  methods: {
    checkDates(start,end){
      let itsPromo = false;
      let startDate = new Date(start);
      let endDate = new Date(end);
      if(startDate<=this.today && endDate>=this.today){
        itsPromo = true;
      }
      return itsPromo;
    },
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
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
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
  margin-right: 16px;
}
.client-table-img img{
  height: 70px;
  width: 100px;
  max-width: 100px;
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
.lineThrough{
  text-decoration: line-through;
  font-size: 13px!important;
  color: #B0B0B0;
}
@media(max-width:481px){
  .hide{
    display:none;
  }
  .basket-name{
    width: 70% !important;
  }
  .basket-amount{
    width: 40% !important;
  }
  .client-table-img{
    margin-right: 0;
  }
  .count{
    width: 25px;
  }
}
</style>