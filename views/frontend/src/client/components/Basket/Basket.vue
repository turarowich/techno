<template>
<div class="container client-container">
  <div class="show-path"><img class="path-img" src="../../../assets/clients/path-img.svg"><div @click="$router.go(-1)" class="mr-1">Back </div> | <span>Shopping cart</span>

  </div>
  <div class="d-flex align-items-center path-box" @click="$router.go(-1)"><img class="mr-2" src="../../../assets/clients/slide.svg"><h3 class="path-title">{{$route.name}}</h3></div>
  <div class="row">
    <div class="col-lg-9">

      <div class="client-table-header">
        <div class="client-table-head" style="width:40%">Products</div>
        <div class="client-table-head" style="width:20%">Amount</div>
        <div class="client-table-head" style="width:14%">Discount %</div>
        <div class="client-table-head" style="width:14%">Discount sum</div>
        <div class="client-table-head" style="width:14%">Price</div>
        <div class="client-table-head" style="width: 12%"></div>

      </div>
      <BasketItem @checkPromocode_child="checkPromocode" />

    </div>

    <div class="col-lg-3">
        <div class="sales">
<!--          <h3 class="cashback-sub-title">Sales</h3>-->
<!--          <p class="sales-text">Take advantage of the points for additional discount</p>-->
<!--            <div class="bonus-notification">-->
<!--              <span class="bonus-span">My bonuses: 100</span>-->
<!--              <h3 class="bonus-number">90</h3>-->
<!--            </div>-->
          <h3 class="cashback-sub-title" style="color:#616CF5;">Log In or register, to receive points and/or use them</h3>
          <div class="auth_btns_wrapper">
              <span>Log In</span>
              <span>Register</span>
          </div>
          <div class="mb-1 sales-input d-flex">
            <input v-model="searchText" class="cashback-input" placeholder="Enter a promocode">
            <img @click="searchPromocode" class="promocodeCheckBtn" src="../../../assets/icons/check_mark.svg">
          </div>
          <div v-if="basket_promocode != null" class="promocode_result">
              <div class="d-flex">
                <div>
                  Name: {{basket_promocode.name}}
                </div>
                <div @click="removePromocode" class="remove_promocode_basket" style="flex: 0 0 33px">
                  <img alt="x" src="../../../assets/icons/x.svg">
                </div>
              </div>
              <div>Discount %: {{basket_promocode.percent}}</div>
              <div>Discount fix: {{basket_promocode.fixed_sum}}</div>
              <div v-if="basket_promocode == null" style="color: red;font-weight: bold;">Promocode is not applicable</div>
          </div>
          <div class="delivery">
            <h3 class="cashback-sub-title">Delivery</h3>
            <div class="personal-btns">
              <div style="width:50%" class="btns-item"><span class="btn-round"></span>Delivery</div>
              <div style="width:50%" class="btns-item mr-0"><span class="btn-round"></span>Pick-up service</div>
            </div>
            <label class="cashback-label">Delivery address</label><br>
            <input type="text" class="cashback-input" placeholder="Enter your address"/>
            <label class="cashback-label">Delivery service</label><br>

            <select class="delivery_service" name="delivery_service" >
              <option selected disabled value="volvo">Select service</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
<!--            <input type="text" class="cashback-input" placeholder="Enter your address"/>-->
<!--            <div class="d-flex align-items-center map-box">-->
<!--              <img class="mr-2" src="../../../assets/clients/map.svg"> <span class="on-map">Specify on the map</span>-->
<!--            </div>-->

            <div class="line"></div>

            <div class="total">
              <div class=" discount d-flex justify-content-between">
                <h3>Discount</h3>
                <span>50 %</span>
              </div>

              <div class="delivery d-flex justify-content-between">
                <h3>Delivery</h3>
                <span style="color:#5CBD85;">Free</span>
              </div>
              <p>Order another 500$ for free shipping</p>
              <div class="d-flex justify-content-between">
                <h4>Total</h4>
                <h4>{{total_price}} $</h4>
              </div>

              <div class="d-flex justify-content-between ">
                <button class="cancel">Continue shopping</button>
                <button class="save" @click="$router.push({ path: `/shop/${currentCompanyCatalog}/personal-info` })">Continue</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  <div>
  </div>
</div>
</template>

<script>
import BasketItem from "@/client/components/Basket/BasketItem";
import $ from "jquery";
import Swal from "sweetalert2";
export default {
name: "Basket",
  components:{
    BasketItem,
  },
  data(){
    return {
      searchText:'',
    }
  },
  computed:{
    shoppingCart(){
      return this.$store.state.Orders.shoppingCart;
    },
    total_price(){
      return this.$store.getters['Orders/getTotalPrice'];
    },
    total_price_full(){
      return this.$store.getters['Orders/getTotalPriceFull'];
    },
    basket_promocode(){
      return this.$store.getters['Orders/getBasketPromocode'];
    },
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
  },
  methods:{
    confirm(){
      if(this.shoppingCart.length === 0){
        this.$warningAlert("Your shopping is empty")
      }
      else{
        this.$router.push('/home/personal-info')
      }
      },
    addActive(){
      $(document).ready(function() {
        $('.btns-item').click(function() {
          $('.btns-item.active').removeClass("active");
          $(this).addClass("active");
        });
      });
    },
    searchPromocode(){
      let that = this;
      this.axios.get('https://localhost:8443/api/searchPromocodeByCode',{
        params: {
          "search":this.searchText,
        }
      }).then(function(response){
        let data = response.data.object;
        if(data){
          that.checkPromocode(data);
          console.log(data,"sssssssss");
        }else{
          console.log('nein');
        }

      });
    },
    checkPromocode(promocode){
      //check for dates
      //check for minSum
      //check if there any products in promo
      //if not check the type
      //but if there products
      //check if there is any product match
      console.log(promocode,"checkPromocode");
      if(!promocode){return }
      let promocode_type = promocode.selected_type;
      let product_ids = [];
      this.promocode=promocode;
      let that = this;

      //check dates
      let today = new Date();
      let startDate = new Date(promocode.startDate);
      let endDate = new Date(promocode.endDate);
      if(startDate>=today || endDate<=today){
        that.$store.dispatch('Orders/unsetPromocode');
        Swal.fire({
          timer:1500,
          title:'Added to cart',
          text:"Promocode has expired or is not valid yet",
          showConfirmButton:false,
          position: 'top-right',
          customClass:{
            popup:'success-popup information-popup',
            content:'success-content',
            title:'success-title',
            header:'success-header',
            image:'success-img'
          },
          showClass:{
            popup: 'animate__animated animate__zoomIn'
          }
        })
        //get back
        return;
      }
      //check if total non discounted price is more then promos min price
      console.log(this.total_price_full,promocode.min_sum,"oppopop");
      if(this.total_price_full<promocode.min_sum){
        that.$store.dispatch('Orders/unsetPromocode');
        Swal.fire({
          timer:1500,
          title:'Added to cart',
          text:`This promocode is applicable only if total items price is more than ${promocode.min_sum}`,
          showConfirmButton:false,
          position: 'top-right',
          customClass:{
            popup:'success-popup information-popup',
            content:'success-content',
            title:'success-title',
            header:'success-header',
            image:'success-img'
          },
          showClass:{
            popup: 'animate__animated animate__zoomIn'
          }
        })
        //get back
        return;
      }

      if(promocode.code !=='' && promocode.selected_items_list.length===0){
        //if promocode exists and does not have selected items --> applicable to all products
        //check type
        if(promocode_type==='all'){
          product_ids = this.shoppingCart.map(function (item){
            item.product._id;
          })
        }else if(promocode_type==='Service'){
          product_ids = this.shoppingCart.map(function (item){
            if(item.product.model_type ==='Service' ){
              product_ids.push(item.product._id);
            }
          })
        }else if(promocode_type==='Product'){
          product_ids = this.shoppingCart.map(function (item){
            if(item.product.model_type ==='Product' ){
              product_ids.push(item.product._id);
            }
          })
        }
        console.log(product_ids,promocode_type);
        // this.$store.dispatch('Orders/setPromocodeToAll', promocode);
      }else if(promocode.selected_items_list.length>0){
        let ids = promocode.selected_items_list.map(item=>item.id);
        //check if products in basket match the promo products
        this.shoppingCart.forEach(function (item){
          if(ids.includes(item.product._id)){
            product_ids.push(item.product._id);
          }
        });
        console.log(product_ids,"90909999");
      }
      console.log(this.shoppingCart,'cart');

      //result
      if(product_ids.length>0){
        let parameter={
          promocode:promocode,
          ids:product_ids,
        };
        that.$store.dispatch('Orders/setPromocodeForItems', parameter);
      }else{
        that.$store.dispatch('Orders/unsetPromocode');
      }
    },
    removePromocode(){
      this.$store.dispatch('Orders/unsetPromocode');
    },
  },
  mounted(){
    this.addActive()
  }
}
</script>

<style scoped>
.sales .cashback-sub-title{
  margin-bottom: 10px;
}
.sales-text{
  color:#858585;
}
.bonus-number{
  color:#616CF5;
  font-size:24px;
  font-weight: normal;
}
.bonus-span{
  font-weight: normal;
}
.sales-input{
  border: 1px solid #E3E3E3;
  border-radius: 5px;
  height: 40px;
  padding:0 6px;
  /*margin-bottom: 42px;*/
  align-items: center;
}
.sales-input input{
  border:none;
  width: 100%;
  height: 100%;
}
.sales .bonus-notification{
  margin-bottom: 30px;
}
.delivery .cashback-sub-title{
  margin-bottom: 20px;
}
.delivery .cashback-input{
  width: 100%;
  height: 40px;
  margin-bottom: 27px;
}
.delivery .personal-btns{
  margin-bottom: 30px;
}
.delivery .map-box{
  margin-bottom: 48px;
}
.total h3{
  font-size: 18px;
  font-weight: normal;
  color:#484848;
}
.discount{
  margin-bottom: 10px;
}
.total .delivery{
  margin-bottom: 5px;
}
.discount span{
  font-size: 16px;
  font-weight: normal;
}
.total p{
  color:#858585;
  margin-bottom: 45px;
}
.total h4{
  font-size: 26px;
  font-weight: normal;
  margin-bottom: 25px;
}
.cancel{
  padding: 0 10px;
}
.promocodeCheckBtn{
  width: 33px;
  height: 33px;
  border-radius: 5px;
  border: 1px solid #D3D3D3;
}
.promocode_result{
  border:1px solid #d3d3d3;
  border-radius:5px;
  margin-top: 30px;
  align-items: center;
  padding: 5px;
}
.promocode_result div{
  flex: 1;
  height: 33px;
}
.remove_promocode_basket{
  border: 1px solid grey;
  border-radius: 5px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.auth_btns_wrapper{
  display: flex;
  width: 100%;
  margin-bottom: 30px;
}
.auth_btns_wrapper span:first-child{
  margin-right: 3px;
}
.auth_btns_wrapper span:last-child{
  margin-left: 3px;
}
.auth_btns_wrapper span{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border: 1px solid #616CF5;
  border-radius: 5px;
  color: #616CF5;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  cursor: pointer;
}
.delivery_service{
  width: 100%;
  height: 40px;
  border: 1px solid #E3E3E3;
  box-sizing: border-box;
  border-radius: 5px;
  padding-left: 10px;
}
</style>