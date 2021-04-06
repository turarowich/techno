<template>
  <div class="row ">
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 product-box" v-for="cat in catalog" :key="cat.id" @click="openDetail">
      <div class="product-img">
        <img src="../../../assets/clients/hodie1.svg">
      </div>
      <div class="product-add">
        <h2>{{cat.name}} </h2>
        <h3> {{cat.code}} </h3>
        <span >{{cat.price}}</span>
      </div>

      <div class="text-center"><a class=" add-to-card mr-2" href="/">Add to card</a><span class="plus"><i class="fas fa-plus"></i></span></div>
    </div>
  </div>

</template>

<script>
export default {
name: "ClientCatalogItem",
  props:['catalog'],
  methods:{
  openDetail(){
    this.$router.push('/home/catalog-detail')
  }
  }
}
</script>

<style scoped>
.product-img {
  height: 225px;
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
}
.product-add{
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  margin-bottom: 15px;
}

.add-to-card, .add-to-card:hover{
  color: #616CF5;
  font-size: 16px;
  text-decoration: none;
}
.plus{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: #616CF5;
  color:#fff;
  font-size: 10px;
  border-radius:5px;
}
.product-box{
  margin-bottom: 50px;
}

.product-add  span{
  font-size: 16px;
}
.product-add h2, .product-add h3{
  font-size: 14px;
}
.product-add h3{
  font-weight: normal;
  color:#b0b0b0;
  margin: 5px 0;
}
</style>