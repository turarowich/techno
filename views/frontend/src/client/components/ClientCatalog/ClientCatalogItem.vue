<template>
  <div class="row ">
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 product-box" v-for="cat in catalog" :key="cat.id" @click="selectProduct(cat.id)">
      <div class="product-img">
        <img :src="cat.image[0]">
      </div>
      <div class="product-add">
        <h2>{{cat.name}} </h2>
        <h3> {{cat.code}} </h3>
        <span >{{cat.price}}</span>
      </div>
      <button class="add-to-card mr-2">Add to cart</button>
    </div>
  </div>

</template>

<script>

export default {
name: "ClientCatalogItem",
  props:['catalog'],
  methods:{
    selectProduct(id){
    const newCatalog = this.catalog.filter((el)=>el.id === id)[0];
      localStorage.setItem('detail', JSON.stringify(newCatalog));
      this.$store.dispatch('getDetail')
      this.$router.push('/home/catalog-detail');
    },
  },
}
</script>

<style scoped>
.product-img {
  height: 225px;
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
}
.product-img img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.product-add{
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  margin-bottom: 15px;
}

.add-to-card{
  color: #898989;
  font-size: 16px;
  border:none;
  padding: 5px 25px;
  background: #F4F4F4;
  border-radius: 10px;
}

.product-box{
  margin-bottom: 50px;
  text-align: center;
  cursor:pointer;
  padding:20px;
  box-sizing: border-box;

  border: 0.5px solid transparent;


}
.product-box:hover{
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 10px;
  transition:0.3s;
  /*transform:scale(1.1,1.1)*/
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