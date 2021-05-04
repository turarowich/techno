<template>
  <div class="container client-container">
    <div class="show-path"><img class="path-img" src="../../../assets/clients/path-img.svg"><div @click="$router.go(-1)" class="mr-1">Back </div> | <span > {{getProduct.name}}</span> </div>
  <div class="row mt-5 mb-5">
    <div class="col-10 m-auto">

      <div class="row">
        <div class="col-lg-7 detail-right">
          <div class="product-img" id="container">
            <img src="../../../assets/clients/hodie1.svg">
            <img src="../../../assets/clients/hodie2.svg">
            <img src="../../../assets/clients/hodie3.svg">
            <img src="../../../assets/clients/hodie4.svg">
          </div>

          <div class="multiple-items">
         <div class="slider-item"> <img src="../../../assets/clients/hodie1.svg"></div>
         <div class="slider-item"> <img src="../../../assets/clients/hodie2.svg"></div>
         <div class="slider-item"> <img src="../../../assets/clients/hodie3.svg"></div>
         <div class="slider-item"> <img src="../../../assets/clients/hodie4.svg"></div>
          </div>
        </div>
        <div class="col-lg-5">
          <h3 class="product-name">{{getProduct.name}}</h3>
          <h5 class="product-code">{{getProduct.code}}</h5>
          <h1 class="product-price">{{getProduct.price}} $</h1>


          <button class="decrease" @click="decrease(getProduct._id)">-</button>
          <span class="count">{{getProduct.quantity}}</span>
          <button class="increase" @click="increase(getProduct._id)">+</button>

          <h3 class="price mt-0">Description</h3>
          <p class="product-text">{{getProduct.description}}</p>
          <button class="catalog-btn" @click="addToCart"><a >Add to card +</a></button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: "CatalogDetail",
  data(){
    return{
      getProduct: ''
    }
  },
  methods: {

    increase(){
      this.getProduct.quantity+=1
    },
    decrease(id) {
      if (this.getProduct._id === id) {
          while (this.getProduct.quantity !== 1) {
            return this.getProduct.quantity -= 1
          }
        }
    },
    addToCart() {
      this.$store.dispatch('addToCart', this.getProduct)
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
      });
    },
  },
  mounted(){
    this.slide()
    this.axios.get(this.url('getProduct',this.$route.params.id.slice(1)))
        .then((res)=>{
          this.getProduct = res.data.object;
        })
  }

}
</script>

<style scoped>
.product-img{
  height: 440px;

}

.product-img img{
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  margin-bottom: 30px;
}
.product-text{
  color: #999999;
  margin-bottom: 30px;
}


</style>




