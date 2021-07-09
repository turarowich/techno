<template>
  <div>

    <div class="client-table-item d-flex" v-for="item in shoppingCart" :key="item.product._id">
      <div style="overflow: hidden;text-overflow: ellipsis;" class="basket-name d-flex align-items-center">
        <div class="client-table-img">
          <img v-if="!item.product.error" :src="server+'/'+item.product.img" @error="item.product.error=true">
          <img v-else src="../../../assets/icons/no-catalog.svg" >
        </div>
        <div class="name-vendorCode">
          <h3 class="table-title">{{item.product.name}}</h3>
          <span style="color:#b0b0b0">{{item.product.vendorCode}}</span>
        </div>
      </div>
      <div style="width:30%" class="basket-amount">
        <div class="name-vendorCode mobile">
          <h3 class="table-title long-text">{{item.product.name}}</h3>
          <span style="color:#b0b0b0">{{item.product.vendorCode}}</span>
        </div>
        <button class="decrease mb-0" @click="decrease(item.product._id)">-</button>
        <span class="count">{{item.quantity}}</span>
        <button class="increase mb-0" @click="increase(item.product._id,item.product.quantity,item.quantity)">+</button>
      </div>
      <div style="width:30%;">
        <span>
          {{item.current_price}} {{catalog_settings.currency}}
        </span>
        <br>
        <div v-if="item.current_price<(item.product.price*item.quantity)" class="discounts_block">
          <span class="lineThrough mr-2">{{item.product.price*item.quantity}} {{catalog_settings.currency}}</span>
          <span style="color: #E94A4A;" v-if="item.isDiscounted">Discount <span class="break-discount">{{item.discount_sum}} {{catalog_settings.currency}}</span></span>
          <span style="color: #E94A4A;" v-else>Discount {{item.discount_percent_sum}} {{catalog_settings.currency}}</span>
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
    catalog_settings(){
      return this.$store.getters['Catalog/getCatalog_settings'];
    },
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
          html: 'Are you sure u want to remove<br> this item',
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
          popup: 'animate__animated animate__slideInDown'
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
    increase(id,stock_quant,basket_quant){
      if(stock_quant>basket_quant){
        this.$store.dispatch('Orders/increaseQuantity', id);
        this.$emit('checkPromocode_child',this.basket_promocode);
      }else{
        this.$warningAlert('Not enough stock');
      }
    },
    decrease(id){
      this.$store.dispatch('Orders/decreaseQuantity', id);
      this.$emit('checkPromocode_child',this.basket_promocode);
    }
  }
}
</script>

<style scoped>
.long-text{
  width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow:hidden;
}

.basket-name{
  width: 40%;
}
.name-vendorCode.mobile{
  display: none;
  margin-bottom: 10px;
}
.client-table-item{
  padding:14px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #E4E4E4;
}

.client-table-img img{
  height: 90px;
  width: 90px;
  border-radius: 5px;
  margin-right: 20px;
  object-fit: contain;
}

.basket-name{
  margin-right: 20px;
}
.table-title{
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}


.lineThrough{
  text-decoration: line-through;
  font-size: 13px!important;
  color: #B0B0B0;
}


@media(max-width:576px){
  .client-table-item{
    align-items: flex-start;
  }
  .basket-name{
    width: 30%;
  }
  .name-vendorCode{
    display:none;

  }
  .name-vendorCode.mobile{
    display: block;
  }
  .lineThrough{
    display:block;
  }
  .break-discount{
    display:block;
  }
}
@media(max-width:481px){

  .basket-amount{
    width: 40% !important;
  }
  .basket-name{
    margin-right: 0;
  }
  .count{
    width: 25px;
  }
  .client-table-img img{
    width: 70px;
    height: 70px;
  }
}
</style>