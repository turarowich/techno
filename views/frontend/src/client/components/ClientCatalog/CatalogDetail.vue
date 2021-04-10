<template>
  <div>
    <div class="show-path"><img class="path-img" src="../../../assets/clients/path-img.svg">Back | <span>Jacket / Polo ralph lauren</span> </div>
  <div class="row mt-5 mb-5">
    <div class="col-10 m-auto">

      <div class="row">
        <div class="col-lg-7 detail-right">
          <div class="product-img">
            <img src="../../../assets/clients/shirt.svg">
          </div>

          <div class="multiple-items">
            <div class="slider-item"><img src="../../../assets/clients/shirt.svg"></div>
            <div class="slider-item"><img src="../../../assets/clients/hodie3.svg"></div>
            <div class="slider-item"><img src="../../../assets/clients/hodie1.svg"></div>
            <div class="slider-item"><img src="../../../assets/clients/hodie2.svg"></div>
            <div class="slider-item"><img src="../../../assets/clients/hodie4.svg"></div>
            <div class="slider-item"><img src="../../../assets/clients/shirt.svg"></div>
            <div class="slider-item"><img src="../../../assets/clients/hodie3.svg"></div>
            <div class="slider-item"><img src="../../../assets/clients/hodie1.svg"></div>
            <div class="slider-item"><img src="../../../assets/clients/hodie2.svg"></div>
            <div class="slider-item"><img src="../../../assets/clients/hodie4.svg"></div>
          </div>
        </div>
        <div class="col-lg-5">
          <h3 class="product-name">Polo ralph lauren</h3>
          <h5 class="product-code">1617W11F</h5>
          <h1 class="product-price">15 $</h1>


          <button class="decrease" @click="count-=1">-</button>
          <span class="count">{{count}}</span>
          <button class="increase" @click="count+=1">+</button>

          <h3 class="price mt-0">Description</h3>
          <p class="product-text">A light blue T-shirt from the spring-summer 2021 collection, as if faded in the sun, turned out to be as comfortable as possible. The cut of the loose model with a round neck and short sleeves does not restrict movement, and the soft cotton jersey is well-permeable and quickly removes moisture.
            The brand's ownership of the product was marked with a large white logo on the back.</p>

          <button class="catalog-btn"><a >Add to card +</a></button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {

  name: "CatalogDetail",
  data() {
    return {
      count: 0
    }
  },
  methods: {

    slide() {
      $('.multiple-items').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,


      });
    }
  },
  mounted(){
    this.slide();
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




