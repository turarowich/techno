<template>
  <div>

    <div class="row add-padding" >
      <div  class="col-lg-3 col-6  product-box"  v-for="(product) in catalog" :key="product._id" >
          <div v-if="product.quantity>0">
            <div class="product-img"  @click="selectProduct(product._id)">
              <img v-if="!product.error" :src="server+'/'+product.img" @error="product.error=true">
              <!--          <img v-else src="../../../assets/img/default.svg" >-->
              <img v-else src="../../../assets/icons/no-catalog.svg" >
              <!--        <img :src="server+'/'+product.img">-->
            </div>
            <div class="product-add">
              <h2 class="long-text"  style="overflow: hidden;text-overflow: ellipsis;">{{product.name}}</h2>
              <span v-if="checkDates(product.promoStart,product.promoEnd)">{{product.promoPrice}} сом</span>
              <br>
              <span :class="{lineThrough:checkDates(product.promoStart,product.promoEnd)}">{{product.price}} сом</span>
            </div>
            <button v-if="!catalog_settings.catalogMode" class="add-to-card" @click="addToCart(product._id)">Add to cart</button>
            <button v-else class="add-to-card" @click="selectProduct(product._id)">View</button>
          </div>


        </div>
    </div>


  </div>
</template>

<script>
export default {
name: "ClientCatalogItem",
  props:['catalog'],
  components:{

  },

  data(){
    return{
      today:new Date(),
      catalogList:[],
      page:1,
      noResult:false,
      message:""


    }
  },
  computed:{

    userDiscountStatus(){
      return this.$store.getters['Client/getUserDiscountStatus'];
    },
    company_url_basket(){
      return this.$store.getters['Orders/getCompany_url_basket'];
    },
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
    server(){
      return this.$server;
    },
    catalog_settings(){
      return this.$store.getters['Catalog/getCatalog_settings'];
    },
  },
  methods:{



    checkDates(start,end){
      let itsPromo = false;
      let startDate = new Date(start);
      let endDate = new Date(end);
      if(startDate<=this.today && endDate>=this.today){
        itsPromo = true;
      }
      return itsPromo;
    },
    addToCart(id){
      //check if its the same company
      console.log(this.company_url_basket,this.$route.params.bekon);
      if(this.company_url_basket !==this.$route.params.bekon){
        //clear local storage
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
      const order = this.catalog.filter((el)=>el._id === id);
      cart_object.product = order? order[0] : null;
      //promo price check
      let current_price = order? order[0].price : 0;
      let old_price = order? order[0].price : 0;
      if(this.checkDates(cart_object.product.promoStart,cart_object.product.promoEnd)){
        current_price = order? order[0].promoPrice : 0;
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
      selectProduct(id){
        this.$router.push({ path: `/${this.currentCompanyCatalog}/catalog-detail/${id}` });
      },
    },
  mounted(){

  }
}
</script>

<style scoped>
.add-padding{
  padding-right: 15px;
}

.long-text{
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}
.product-img {
  margin-bottom: 16px;
  height:176px;

}
.product-img img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
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
  width: 140px;
}
.add-to-card:hover{
  color:#222;
  background: #e3e3e3;
  transition:.3s;
}
.product-box{
  text-align: center;
  cursor:pointer;
  padding:15px;
  box-sizing: border-box;
  border: 0.5px solid transparent;
  padding-bottom: 20px;


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
.product-add h2{
  margin-bottom: 5px;
}
.product-add h2, .product-add h3{
  font-size: 14px;
}
.product-add h3{
  font-weight: normal;
  color:#b0b0b0;
  margin: 5px 0;
}
.lineThrough{
  text-decoration: line-through;
  font-size: 12px!important;
  font-weight: normal;
}
@media(max-width:576px){
  .product-box:hover{
    border:none;
  }
  .product-box{
    padding-right: 0;
  }
}

@media(max-width:380px){
  .product-img img{
    height: 163px;
  }
  .product-img{
    margin-bottom: 0;
  }
  .add-to-card{
    padding:0.3rem 30px;
  }
}
@media(max-width:330px){
  .product-img img{
    height: 138px;
  }

}
</style>