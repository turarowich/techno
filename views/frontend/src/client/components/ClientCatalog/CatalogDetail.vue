<template>
 <div>
  <div v-if="!getProduct.name"><Spinner/></div>
   <div v-else class="container client-container" >
     <div class="show-path"><img class="path-img" src="../../../assets/clients/path-img.svg"><div @click="$router.go(-1)"  class="mr-1">Back </div> | <span > {{getProduct.name}}</span> </div>
     <div class="row  mb-5" >
       <div class="col-lg-10  m-auto">
         <div class="row">
           <div class="col-lg-7 detail-right">

             <div class="product-img" :class="{active: getProduct.imgArray.length===0}" id="container">
               <!--            <img :src="server+'/'+getProduct.img">-->
               <img v-if="!getProduct.error" :src="server+'/'+getProduct.img" @error="getProduct.error=true">
               <img v-else src="../../../assets/icons/noProd.png" >
               <img v-for="(img,index) in getProduct.imgArray" :key="index" :src="server+'/'+img">
             </div>
             <div v-if="getProduct.imgArray.length>0" class="multiple-items">
               <div class="slider-item">
                 <img v-if="!getProduct.error" :src="server+'/'+getProduct.img" @error="getProduct.error=true">
               </div>
               <div v-for="(img,index) in getProduct.imgArray" :key="index" class="slider-item">
                 <img :src="server+'/'+img">
               </div>
             </div>
           </div>
           <div class="col-lg-5 detail-left" :class="{active: getProduct.imgArray.length===0}">
             <h3 class="product-name">{{getProduct.name}}</h3>
             <h5 class="product-code">{{getProduct.code}}</h5>
             <h1 v-if="checkDates(getProduct.promoStart,getProduct.promoEnd)" class="product-price">{{getProduct.promoPrice}} {{catalog_settings.currency}}</h1>
             <h3 :class="{lineThrough:checkDates(getProduct.promoStart,getProduct.promoEnd)}" class="product-price">{{getProduct.price}} {{catalog_settings.currency}}</h3>
             <br>

             <div v-if="!catalog_settings.catalogMode">
               <button class="decrease" @click="decrease(getProduct._id)">-</button>
               <span v-if="getProductFromStore" class="count">{{getProductFromStore.quantity}}</span>
               <span v-else class="count">0</span>
               <button class="increase" @click="addToCart">+</button>
             </div>

             <h3 class="price mt-0">Description</h3>
             <p class="product-text">{{getProduct.description}}</p>
             <button v-if="!catalog_settings.catalogMode" class="catalog-btn" @click="addToCart()"><a >Add to card +</a></button>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import Spinner from "../../../components/Spinner";
import $ from 'jquery';
export default {
  name: "CatalogDetail",
  components:{
    Spinner
  },
  data(){
    return{
      today:new Date(),
      getProduct: {
        imgArray:[],
      },
    }
  },
  computed:{
    catalog_settings(){
      return this.$store.getters['Catalog/getCatalog_settings'];
    },
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
    userDiscountStatus(){
      return this.$store.getters['Client/getUserDiscountStatus'];
    },
    getProductFromStore(){
      return this.$store.getters['Orders/getProduct'](this.getProduct._id)[0];
    },
    shoppingCart(){
      return this.$store.state.Orders.shoppingCart;
    },
    server(){
      return this.$server;
    },
    company_url_basket(){
      return this.$store.getters['Orders/getCompany_url_basket'];
    },
  },
  methods: {
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
    },
    checkDates(start,end){
      let itsPromo = false;
      let startDate = new Date(start);
      let endDate = new Date(end);
      if(startDate<=this.today && endDate>=this.today){
        itsPromo = true;
      }
      console.log(itsPromo,"itsPromoitsPromoitsPromo");
      return itsPromo;
    },
    addToCart(){
      //check if its the same company
      console.log(this.company_url_basket,this.$route.params.bekon,"STORAGE CHECK");
      if(this.company_url_basket !==this.$route.params.bekon){
        //clear local storage
        console.log('clear');
        this.$store.dispatch("Orders/clearAll");
      }
      let that = this;
      let cart_object = {
        client_status_discount:this.userDiscountStatus.discount_percentage || 0,
        product:{},
        isDiscounted:false,
        quantity:1,
        promocode:'',
        discount_percent:0,
        discount_percent_sum:0,
        discount_sum:0,
        current_price:0,
      }
      cart_object.product = this.getProduct;
      //promo price check
      let current_price = this.getProduct.price || 0;
      let old_price = this.getProduct.price || 0;
      if(this.checkDates(cart_object.product.promoStart,cart_object.product.promoEnd)){
        current_price = this.getProduct.promoPrice || 0;
        let discount_sum = old_price - current_price;
        cart_object.discount_sum = discount_sum>0? discount_sum:0;
        cart_object.isDiscounted = true;
      }else if(cart_object.client_status_discount>0){
        let disc = (current_price*(cart_object.client_status_discount/100)).toFixed(2);
        current_price = (current_price-disc).toFixed(2);
        cart_object.discount_percent_sum =disc;
      }
      //
      cart_object.current_price = current_price;
      this.$store.dispatch('Orders/addToCart', cart_object);
      this.$store.dispatch('Orders/setCompany_url_basket', that.$route.params.bekon);
      //update/set storage version
      let version = new Date();
      this.$store.dispatch("Orders/setVersion",version);
    },
    slide() {
      $('.product-img').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.multiple-items'
      });
      $('.multiple-items').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.product-img',
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
        ]
      });
    },
    async  getOneProduct(){
      const options = {
        headers: {"x-client-url": this.currentCompanyCatalog}
      }
      await this.axios.get(this.url('getProductWeb',this.$route.params.id),options)
          .then((response) => {
            console.log(response);
            this.getProduct = response.data.object;

          })
      this.slide()
    },




  },
  mounted(){

    this.getOneProduct();



  }
}
</script>

<style scoped>
.product-img{
  height: 440px;
  margin-bottom: 40px;
}

.lineThrough{
  text-decoration: line-through;
  font-size: 20px!important;
  font-weight: normal !important;

}
.product-img img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 5px;
}
.product-name{
  font-weight: 600;
  font-size: 24px;
}
.product-code{
  color: #B0B0B0;
  font-size: 16px;
  margin: 10px 0;
}
.product-price{
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}
.product-text{
  color: #999999;
  margin-bottom: 50px;
}
@media(min-width:1200px){
  .client-container{
    width: calc(100vw - 240px);
  }
}
@media(max-width:992px){
  .product-img{
    height: 400px;
  }
  .multiple-items{
    margin-bottom: 0;
  }
}
@media(max-width:481px) {
  .product-img {
    width: 100%;
    height: 100%;
    margin-bottom: 0
  }


  .detail-right{
    margin-bottom: 60px;
  }

  .product-img.active {
    height: 100%;
  }


}

</style>




