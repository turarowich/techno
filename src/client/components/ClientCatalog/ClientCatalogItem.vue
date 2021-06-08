<template>
  <div class="row ">
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 product-box" v-for="product in catalog" :key="product._id">
      <div class="product-img"  @click="selectProduct(cat._id)">
        <img src="../../../assets/clients/shirt.svg">
      </div>
      <div class="product-add">
        <h2>{{product.name}} </h2>
        <h3></h3>
        <span >{{product.price}}</span>
      </div>
      <button class="add-to-card" @click="addToCart(product._id)">Add to cart</button>
    </div>
  </div>

</template>

<script>
export default {
name: "ClientCatalogItem",
  props:['catalog'],

  methods:{
    addToCart(id){
      let cart_object = {
        product:{},
        quantity:1,
        promocode:'',
        discount_percent:0,
        discount_sum:0,
        current_price:0,
      }
      const order = this.catalog.filter((el)=>el._id === id);
      cart_object.product = order? order[0] : null;
      cart_object.current_price = order? order[0].price : 0;
      this.$store.dispatch('Orders/addToCart', cart_object)
    },
      selectProduct(id){
        this.$router.push('/home/catalog-detail/:'+id);
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
  font-size: 14px;
  border:none;
  padding: 0.3rem  2rem;
  background: #F4F4F4;
  border-radius: 10px;
}
.add-to-card:hover{
  color:#222;
  background: #e3e3e3;
  transition:.3s;
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