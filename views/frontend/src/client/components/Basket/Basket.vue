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
<!--        <div class="client-table-head" style="width:14%">Discount%</div>-->
<!--        <div class="client-table-head" style="width:14%">DiscountSum</div>-->
        <div class="client-table-head" style="width:30%">Price</div>
        <div class="client-table-head" style="width:10%"></div>

      </div>
      <BasketItem @checkPromocode_child="checkPromocode" />
    </div>

    <div class="col-lg-3">
        <div class="sales">

          <div v-if="!clientAuth">
            <h3 class="cashback-sub-title" style="color:#616CF5;">Log In or register, to receive points and/or use them</h3>
            <div  class="auth_btns_wrapper">
              <router-link style="flex: 1;" :to="`/shop/${currentCompanyCatalog}/signin`"><span>Log In</span></router-link>
              <router-link style="flex: 1;" :to="`/shop/${currentCompanyCatalog}/signup`"><span>Register</span></router-link>
            </div>
          </div>
          <div v-else>
            <span class="client_points_title">User your points for an additional discount</span>
            <div class="d-flex mb-2 client_points_block" style="align-items: center;">

              <div class="d-flex" style="flex: 1;">
                <label class="custom-checkbox">
                  <input v-model="usePointsStatus" type="checkbox" >
                  <span class="checkmark">
                </span>
                </label>
                <span>Use points</span>
              </div>
              <div>
                <span class="client_points">
                  {{user.points}} --{{userDiscountStatus.discount_percentage || 0}}%
                </span>
              </div>
            </div>
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
              <div>Discount %: {{basket_promocode.discount}}</div>
              <div>Discount fix: {{basket_promocode.fixed_sum}}</div>
              <div v-if="basket_promocode == null" style="color: red;font-weight: bold;">Promocode is not applicable</div>
          </div>
          <div class="delivery">
            <h3 class="cashback-sub-title">Delivery</h3>
            <div class="personal-btns">
              <div style="width:50%" @click="setDeliveryType('delivery')" :class="{active:deliveryService}" class="btns-item"><span class="btn-round"></span>Delivery</div>
              <div style="width:50%" @click="setDeliveryType('pick_up')" :class="{active:pickUp}" class="btns-item mr-0"><span class="btn-round"></span>Pick-up</div>
            </div>

            <div v-if="deliveryService" class="delivery_block position-relative">
              <label class="cashback-label">Delivery address</label><br>
              <input v-model="deliveryAddress" type="text" class="cashback-input" placeholder="Enter your address"/>



              <label class="cashback-label">Delivery service</label><br>
              <div class="selected_delivery_option w-100 d-flex" @click="showDeliveryOption= !showDeliveryOption">
                <div style="flex: 1;">
                  {{selectedDeliveryType.object.name}}
                </div>
                <div>
                  {{selectedDeliveryType.object.price}}
                </div>
              </div>
              <div class="delivery_option_wrapper_class" v-if="showDeliveryOption">
                <div @click="setSelectedDeliveryOption(opt)" v-for="opt in delivery_options" :key="opt._id" class="d-flex delivery_option_class">
                  <div style="flex:1;">{{opt.name}}</div>
                  <div>{{opt.price}}$</div>
                </div>
              </div>
            </div>
            <div v-if="pickUp" class="pick_up_block">
            <span>Select address where u would like to pick up ur order</span>
              <div @click="setBranch(branch)" v-for="branch in branches" :key="branch._id" :class="{active_branch:branch._id===selectedBranchObject._id}" class="d-flex pick_up_block_item">
                <div>
                  <img src="../../../assets/icons/location.svg">
                </div>
                <div>
                  <div class="pick_up_block_item_address">
                    {{branch.address}}
                  </div>
                  <div class="pick_up_block_item_wh">
                    Mn-Fr 08:00 - 19:00
                  </div>
                </div>
              </div>
            </div>

            <div class="line"></div>

            <div class="total">

              <div class=" discount d-flex justify-content-between">
                <h3>Products</h3>
                <span>{{total_price_full}} $</span>
              </div>

              <div class=" discount d-flex justify-content-between">
                <h3>Discount</h3>
                <span>-{{ total_discounts }} $</span>
              </div>

              <div v-if="deliveryService" class="delivery d-flex justify-content-between">
                <h3>Delivery</h3>
                <span style="color:#5CBD85;">{{delivery_cost}} $</span>
              </div>

              <div class="d-flex justify-content-between">
                <h4>Total</h4>
                <h4>{{total_price_discount_delivery}} $</h4>
              </div>

              <div class="d-flex justify-content-between ">
                <button @click="$router.push({ path: `/shop/${currentCompanyCatalog}` })" class="cancel">Continue shopping</button>
                <button @click="checkNcontinue()" class="save">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  <div>
    <BasketConfirm @continueAsGuest_child="continueAsGuest" />
  </div>
</div>
</template>

<script>
import BasketItem from "@/client/components/Basket/BasketItem";
import BasketConfirm from "@/modals/basket/BasketConfirm";
import $ from "jquery";
// import Swal from "sweetalert2";
export default {
name: "Basket",
  components:{
    BasketItem,
    BasketConfirm,
  },
  data(){
    return {
      searchText:'',
      pickUp:false,
      deliveryService:true,
      selectedBranchObject:{},
      selectedDeliveryOptionObject:{},
      showDeliveryOption:false,
      usePointsStatus:false,
      // usePoints:false,
      deliveryAddress:'',
      selectedDeliveryType:{
        type:'Delivery service',
        object:{
          price:0,
        },
      }
    }
  },
  computed:{
    clientAuth(){
      return this.getClientAuth()
    },
    branches(){
      return this.$store.getters['Catalog/getCompanyAddresses'];
    },
    delivery_options(){
      let that = this;
      let all_options = this.$store.getters['Catalog/getCompanyDeliveryOptions'];
      let options = all_options.filter(function (option){
        return option.minPrice<=that.total_price;
      })
      return options;
    },
    shoppingCart(){
      return this.$store.state.Orders.shoppingCart;
    },
    total_discounts(){
      return this.$store.getters['Orders/getTotalDiscounts'];
    },
    total_price(){
      return this.$store.getters['Orders/getTotalPrice'];
    },
    usableUserPoints(){
      let points = 0;
      if(this.get_usePointsStatus){
        points = this.user_points;
      }
      let usable_points = points;
      let check = this.get_store_totalPriceWithDelivery - points;
      if(check<0){
        usable_points = this.get_store_totalPriceWithDelivery;
      }
      return usable_points;
    },
    total_price_discount_delivery(){
      ///get this into storage
      return (parseFloat(this.total_price)+parseFloat(this.delivery_cost)-parseFloat(this.usableUserPoints)).toFixed(2);
    },
    total_price_full(){
      return this.$store.getters['Orders/getTotalPriceFull'];
    },
    delivery_cost(){
      return this.$store.getters['Orders/getDeliveryCost'];
    },
    deliveryTypeObject(){
      return this.$store.getters['Orders/getDeliveryTypeObject'];
    },
    get_store_totalPriceWithDelivery(){
      return this.$store.getters['Orders/getTotalPriceWithDelivery'];
    },
    get_usePointsStatus(){
      return this.$store.getters['Orders/getUsePointsStatus'];
    },
    get_Address(){
      return this.$store.getters['Orders/getAddress'];
    },
    user(){
      return this.$store.getters['Client/getUser'];
    },
    user_points(){
      return this.user ? this.user.points : 0;
    },
    userDiscountStatus(){
      return this.$store.getters['Client/getUserDiscountStatus'];
    },
    basket_promocode(){
      return this.$store.getters['Orders/getBasketPromocode'];
    },
    currentCompanyCatalog() {
      return this.$route.params.bekon;
    },
  },
  methods:{
    setSelectedDeliveryOption(obj){
      this.selectedDeliveryOptionObject = obj;
      this.showDeliveryOption = false;
    },
    setDeliveryType(type){
      //redo later
      this.selectedDeliveryType.type = type;
      this.selectedDeliveryType.object = {};
      this.selectedBranchObject = {};
      this.$store.dispatch('Orders/setDeliveryCost', 0);
      if(type === 'delivery'){
        this.deliveryService = true;
        this.pickUp = false;
      }else{
        this.deliveryService = false;
        this.pickUp = true;
      }
    },
    setBranch(obj){
      this.selectedBranchObject = obj;
      this.selectedDeliveryType.object = obj;
      let delivery_type_object = {
        type:"Pick-up",
        object: obj,
      }
      this.$store.dispatch('Orders/setSelectedDeliveryType', delivery_type_object);
      this.$store.dispatch('Orders/setDeliveryCost', 0);
    },
    confirm(){
      if(this.shoppingCart.length === 0){
        this.$warningAlert("Your shopping is empty")
      }
      else{
        this.$router.push('/home/personal-info')
      }
      },
    searchPromocode(){
      let that = this;
      this.axios.get(this.url('searchPromocodeByCode'),{
        params: {
          "search":this.searchText,
          "date":new Date(),
          "sum": this.total_price,
        },
        headers: {"company_url": this.currentCompanyCatalog}
      }).then(function(response){
        let data = response.data.object;
        if(data){
          that.$successAlert(response.data.msg);
          that.checkPromocode(data);
        }else{
          that.$warningAlert(response.data.msg);
          console.log('nein');
        }
      });
    },
    checkPromocode(promocode){
      console.log(promocode,"FOUND PROMOCODE");
      if(!promocode){return }
      let promocode_type = promocode.selected_type;
      let product_ids = [];
      this.promocode=promocode;
      let that = this;
      if(promocode.code !=='' && promocode.selected_items_list.length===0){
        //if promocode exists and does not have selected items --> applicable to all products
        //check type
        if(promocode_type==='all'){
          product_ids = this.shoppingCart.map(function (item){
            item.product._id;
          })
        }else if(promocode_type==='Service'){
          this.shoppingCart.map(function (item){
            if(item.product.model_type ==='Service' ){
              product_ids.push(item.product._id);
            }
          })
        }else if(promocode_type==='Product'){
          this.shoppingCart.map(function (item){
            if(item.product.model_type ==='Product' ){
              product_ids.push(item.product._id);
            }
          })
        }
      }else if(promocode.selected_items_list.length>0){
        let ids = promocode.selected_items_list;
        //check if products in basket match the promo products
        this.shoppingCart.forEach(function (item){
          if(ids.includes(item.product._id)){
            product_ids.push(item.product._id);
          }
        });
      }
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
    continueAsGuest(guest){
      this.$store.dispatch('Orders/setGuest', guest);
      this.$router.push({ path: `/shop/${this.currentCompanyCatalog}/product-info` })
    },
    checkNcontinue(){
      let text = '';
      if(this.deliveryAddress === '' && this.selectedDeliveryType.type ==="Delivery service"){
        this.$warningAlert("Enter the delivery address");
        return ;
      }

      if(Object.keys(this.selectedDeliveryType.object).length === 0){
        text = "Select where you would like to pick up yor order";
        if(this.selectedDeliveryType.type ==="Delivery service"){
          text = "Select delivery option";
        }
        this.$warningAlert(text);
      }else{
        console.log(this.clientAuth,"getClientAuth");
        if(this.clientAuth){
          this.continueAsGuest();
        }else{
          //for now only auth
          $('#confirmAsGuest').modal('show');
          // this.$warningAlert("В данный момент только после авторизации");
        }
      }
    },
  },
  watch:{
    total_price:{
      handler(val,old) {
        if(old>val){
          this.selectedDeliveryType.object = {};
        }
        console.log(val,"total_price CHANGE TO STORE",old);
      },
      deep: true,
      immediate:true,
    },
    selectedDeliveryOptionObject:{
      handler(val) {
        console.log(val,"selectedDeliveryOptionObject TO STORE");
        // this.selectedDeliveryType.object = val;
        let delivery_type_object = {
          type:"Delivery service",
          object: val,
        }
        this.$store.dispatch('Orders/setSelectedDeliveryType', delivery_type_object);
        this.$store.dispatch('Orders/setDeliveryCost', val.price || 0);
      },
      deep: true
    },
    deliveryTypeObject:{
      handler(val) {
        console.log(val,"deliveryTypeObject FROM STORE");
        if(val.type=="Delivery service" ||val.type=="Delivery" ||val.type=="delivery"){
          this.deliveryService = true;
          this.pickUp = false;
        }else{
          this.deliveryService = false;
          this.pickUp = true;
          this.selectedBranchObject = val.object;
        }
        this.selectedDeliveryType=val;
      },
      immediate: true,
    },
    usableUserPoints:{
      handler(val) {
        this.$store.dispatch('Orders/setUsedPoints', val || 0);
      },
      deep: true
    },
    usePointsStatus:{
      handler(val) {
        this.$store.dispatch('Orders/setUsePointsStatus', val || false);
      },
      deep: true
    },
    get_usePointsStatus:{
      handler(val) {
        this.usePointsStatus = val;
      },
      immediate: true,
    },
    get_Address:{
      handler(val) {
        this.deliveryAddress = val;
      },
      immediate: true,
    },
    deliveryAddress:{
      handler(val) {
        console.log(val,"ssss___ss");
        this.$store.dispatch('Orders/setAddress', val || '');
      },
      deep: true
    },
  },
  mounted(){

  }
}
</script>

<style scoped>
.sales .cashback-sub-title{
  margin-bottom: 10px;
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
  font-size: 15px;
  font-weight: normal;
  color:#484848;
}
.discount{
  margin-bottom: 0;
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
.pick_up_block_item{
  border-radius: 7px;
  padding: 9px;
  margin-bottom: 10px;
  background: #F8F9FF;
  cursor: pointer;
  border: 1px solid #f0f0f0;
}
.pick_up_block_item_address{
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #616CF5;
  line-height: 1;
}
.pick_up_block_item_wh{
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #8C94A5;
  line-height: 1;

}
.active_branch{
  border-color: #616CF5;
}
.client_points{
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #616CF5;
}

.custom-checkbox{
  margin-top:1px;
  margin-right: 5px;
}
.client_points_title{
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #858585;
}
.delivery_option_wrapper_class{
  position:absolute;
  border: 1px solid black;
  width:100%;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
}
.delivery_option_class{
  cursor: pointer;
  height: 35px;
}
.selected_delivery_option{
  display: flex;
  align-items: center;
  height: 40px;
  border:1px solid black;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}
</style>