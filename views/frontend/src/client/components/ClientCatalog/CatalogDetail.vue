<template>
  <div>
    <div class="show-path"><img class="path-img" src="../../../assets/clients/path-img.svg"><div @click="$router.go(-1)" class="mr-1">Back </div> | <span>{{productDetail.category}} / {{productDetail.name}}</span> </div>
  <div class="row mt-5 mb-5">
    <div class="col-10 m-auto">

      <div class="row">
        <div class="col-lg-7 detail-right">
          <div class="product-img" id="container">
            <img :src="productDetail.image[0]">
            <img :src="productDetail.image[1]">
            <img :src="productDetail.image[2]">
            <img :src="productDetail.image[3]">
            <img :src="productDetail.image[4]">

          </div>

          <div class="multiple-items">
            <div class="slider-item"><img :src="productDetail.image[0]"></div>
            <div class="slider-item"><img :src="productDetail.image[1]"></div>
            <div class="slider-item"><img :src="productDetail.image[2]"></div>
            <div class="slider-item"><img :src="productDetail.image[3]"></div>
            <div class="slider-item"><img :src="productDetail.image[4]"></div>
          </div>
        </div>
        <div class="col-lg-5">
          <h3 class="product-name">{{productDetail.name}}</h3>
          <h5 class="product-code">{{productDetail.code}}</h5>
          <h1 class="product-price">{{productDetail.price}} $</h1>


          <button class="decrease" @click="decrease">-</button>
          <span class="count">{{productDetail.count}}</span>
          <button class="increase" @click="productDetail.count+=1">+</button>

          <h3 class="price mt-0">Description</h3>
          <p class="product-text">A light blue T-shirt from the spring-summer 2021 collection, as if faded in the sun, turned out to be as comfortable as possible. The cut of the loose model with a round neck and short sleeves does not restrict movement, and the soft cotton jersey is well-permeable and quickly removes moisture.
            The brand's ownership of the product was marked with a large white logo on the back.</p>
          <button class="catalog-btn" @click="addToCart"><a >Add to card +</a></button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import $ from 'jquery';
import {mapGetters} from 'vuex'
export default {
  name: "CatalogDetail",
  computed:{
    ...mapGetters(["productDetail",'listCategory']),

  },
  methods: {
    addToCart() {
      this.$store.dispatch('addToCart', this.productDetail)
    },
    decrease(){
      if(this.productDetail.count === 0){
        this.productDetail.count = 0
      }
      else{
        this.productDetail.count-=1
      }
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




