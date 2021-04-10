<template>
<div class="row news-detail">
  <div class="col-lg-9 m-auto">
    <div class="d-flex align-items-center justify-content-between path-box ">
      <div class="d-flex align-items-center">
        <img class="mr-3" src="../../../assets/clients/slide.svg">
        <h3 class="path-title">New promotion, buy with a 20% discount!!!</h3>
      </div>
      <span class="news-date">12 Dec 2021</span>
    </div>

    <div class="new-item">
      <img src="../../../assets/clients/mask3.svg">
    </div>
    <p class="client-paragraph">
      A light blue T-shirt from the spring-summer 2021 collection, as if faded in the sun,
      turned out to be as comfortable as possible. The cut of the loose model with a round neck and short sleeves does not restrict movement, and the soft cotton jersey is well-permeable and quickly removes moisture.
      The brand's ownership of the product was marked with a large white logo on the back.
    </p>
  </div>

</div>
</template>

<script>
export default {
name: "NewsDetail"
}
</script>

<style scoped>
.new-item{
  height: 300px;
  margin-bottom: 50px;
}
.new-item img{
  width: 100%;
  height: 100%;
  object-fit:cover;
  border-radius: 5px;
}
.news-detail{
  margin-top: 48px;
}
.path-box{
  margin-bottom: 38px;
}
.news-date{
  color: #858585;
}
</style>