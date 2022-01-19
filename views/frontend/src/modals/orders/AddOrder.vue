<template>
  <div class="modal fade right"  id="add-order" tabindex="-1" role="dialog" aria-labelledby="add-order" aria-hidden="true">
    <div class="modal-dialog  modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: calc(100vw - 250px);" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header justify-content-start align-items-start">
          <img data-dismiss="modal" aria-label="Close" class="close" src="../../assets/icons/x.svg" alt="">
          <div v-if="!['Cancelled','Done'].includes(selected_order.status)">
           <h3 v-if="!editState" class="modal-title">New order</h3>
           <h3 v-else class="modal-title">Edit order</h3>
           <span class="detail-date">{{today}}</span>
          </div>
          <div v-else>
            <h3  class="modal-title">View order</h3>
            <span class="detail-date">{{today}}</span>
          </div>
        </div>
        <div class=" myModal-body">
          <div class="row">
            <div class="col-lg-8 ">
              <h3 class="detail-product">Product</h3>
              <input v-model="search_product" class="enter-name-input" placeholder="+ Enter the name of product">
              <div class="left-order">
                <div v-if="search_product.length !==0" class="search-product ">
                  <div class="pl-4 pt-3 pb-3" v-if="filteredProducts.length === 0">
                      Not found
                  </div>
                  <div  v-else v-for="product in filteredProducts" :key="product._id"  class="product-order ">

                    <div v-if="!product.hasMultipleTypes" @click="selectProduct(product)" class="d-flex align-items-center justify-content-between">
                      <div class="table-child d-flex align-items-center">
                        <div class="table-img">
                          <img v-if="product.img" :src="imgSrc+'/'+product.img">
                          <img v-else src="../../assets/icons/no-catalog.svg">
                        </div>
                        {{product.name}}
                      </div>
                      <div>
                        <span v-if="compareDates(product.promoStart,product.promoEnd)">{{product.promoPrice}} $ %</span>
                        <span v-else>{{product.price}} $</span>
                      </div>
                    </div>

                    <div v-else  class="d-flex align-items-center">
                      <div class="table-child d-flex align-items-center" style="width: 50%;">
                        <div class="table-img">
                          <img v-if="product.img" :src="imgSrc+'/'+product.img">
                          <img v-else src="../../assets/icons/no-catalog.svg">
                        </div>
                        {{product.name}}
                      </div>
                      <div style="width: 25%;">
                        <span v-if="compareDates(product.promoStart,product.promoEnd)">{{product.promoPrice}} $ %</span>
                        <span v-else>{{product.price}} $</span>
                      </div>
                      <div style="width: 25%;text-align: right;">
                        <div class="dropdown">
                          <button class="btn btn-secondary dropdown-toggle" type="button" v-bind:id="product._id" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select size
                          </button>
                          <div class="dropdown-menu" v-bind:aria-labelledby="product._id" >
                            <div style="display: flex; flex-direction: column;">
                              <span @click="selectProduct(product,size)" style="border: 1px solid grey;padding: 2px;" v-for="size in product.sizes" :key="size._id" v-bind:value="size._id">Size:{{size.size}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="table">
                <div class="d-flex main-content-header">
                  <div class="table-head" style="width: 40%;">Product</div>
                  <div class="table-head" style="width: 20%;">Price</div>
                  <div class="table-head" style="width: 10%;">Quantity</div>
                  <div class="table-head" style="width: 10%;"></div>
                  <div class="table-head" style="width: 15%;">Total</div>
                  <div class="table-head" style="width: 5%;"></div>
                </div>

                <div class="table-content">
                  <div v-if="new_order.items.length===0" class="d-flex align-items-center h-100 justify-content-center flex-column">
                    <img class="empty-img mb-2" src="../../assets/img/emp-product.svg">
                    <p class="empty-page-text">Add a product to start</p>
                  </div>

                  <div  v-else  v-for="item in new_order.items" :key="item.product._id" class="table-item d-flex align-items-center" >
                    <div  class="d-flex align-items-center"  style="width: 40%;">
                      <div class="table-img">
                        <img v-if="item.product.img" :src="imgSrc+'/'+item.product.img">
                        <img v-else src="../../assets/icons/no-catalog.svg">
                      </div>
                      <div style="overflow: hidden;text-overflow: ellipsis;">
                        <div style="display: flex;flex-direction: column;">
                          <span>{{item.product.name}}</span>
                          <span style="color: grey;">{{item.size ? item.size.vendorCode : ""}}</span>
                        </div>
                      </div>
                    </div>

                    <div style="width:20%">
                      <span v-if="item.discounted" style="display: flex;flex-direction: column;">
                        <span>{{item.current_price}}{{currency}}</span>
                        <span class="lineThrough">
<!--                          {{item.product.price}}-->
<!--                          {{currency}}                          -->
                          {{item.old_price}}
                          {{currency}}
                        </span>
                      </span>
                      <span v-else >
                        {{item.current_price}}{{currency}}
                      </span>
                    </div>
                    <div style="width:10%" class="quantity">
                      <input type="number" min="1" style="width: 100%;border: none;" v-model="item.quantity">
                    </div>
                    <div style="width:10%">
                      <span v-if="item.discountType==='promocode'" style="display: flex;justify-content: center;align-items: center;">
                        <img src="../../assets/icons/promo_discount.svg">
                      </span>
                    </div>
                    <div style="width:15%">
                      {{item.quantity * item.current_price}}{{currency}}
                    </div>
                    <div style="width:5%">
                      <img @click="deleteFromOrder(item.product._id)" src="../../assets/icons/trash_empty.svg">
                    </div>
                  </div>

                </div>
              </div>
              <div class="notes">
                <h3 class="detail-product">Notes</h3>
                <input class="cashback-input" v-model="new_order.notes">
              </div>
            </div>
<!------------------------------------------Right Side-------------------------->
            <div class="col-lg-4">
              <h3 class="client-sub-title">Client</h3>

              <div class="d-flex guest-name">
                <label class="switch d-flex">
                  <input v-model="guestMode" type="checkbox">
                  <span class="slider round"></span>
                </label>
                <span>Guest</span>
              </div>

              <div v-if="!guestMode" class="client-box d-flex align-items-center">
                <div v-if="Object.keys(client.clientObj).length === 0"  class="client-search d-flex align-items-center">
                  <img src="../../assets/icons/search-icon.svg" class="search-client-icon">
                  <input v-model="search_client" placeholder="Enter clients name or number" class="search-client">
                </div>
                <div v-else class="d-flex align-items-center">
                  <img class="client-avatar" v-if="client.clientObj.avatar" :src="imgSrc+'/'+client.clientObj.avatar">
                  <img class="client-avatar" v-else src="../../assets/icons/chat.svg">
                  <div class="position-relative">
                    <h2 class="name-client">{{client.clientObj.name}}</h2>
                    <div class="category">
                      {{ client.client_status_name ? client.client_status_name : 'Discount' }}:
                      <span>
                        {{client.client_status_discount}}%
                      </span>

                    </div>
                  </div>
                  <img @click="removeClient" class="close-client" src="../../assets/icons/deleteClient.svg">
                </div>
              </div>
              <div v-else>
                  <label>Name</label>
                  <input class="cashback-input" v-model="guest.name">
                  <label>Phone</label>
                  <input class="cashback-input" v-model="guest.phone">
              </div>

              <div class="parent-order-client">
               <div v-if="search_client.length !==0" class="child-order-client">
                <div v-if="filteredClients.length === 0">
                  <div class="pl-3">Not found</div>
                </div>
                 <div v-else v-for="client in filteredClients" :key="client._id"  @click="selectClient(client._id)" class="table-child d-flex align-items-center">
                   <div class="table-img">
                     <img v-if="client.avatar" :src="imgSrc+'/'+client.avatar">
                     <img v-else src="../../assets/icons/chat.svg">
                   </div>
                   <div>
                     <h4 class="general-title">{{client.name}}</h4>
                     <span class="client-phone-order">{{client.phone}}</span>
                   </div>
                 </div>

               </div>
             </div>
              <h3 class="client-sub-title">Delivery method</h3>
              <div class="selects">
                <select @change="checkMinimumSum" v-model="new_order.deliveryType" class=" form-control long-form-control  form-control-lg" aria-label=".form-select-lg example">
                  <option value="self" >Pick up</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>

              <div v-if="new_order.deliveryType == 'self'">
                <label>Select address where order will be taken</label>
                <div @click="setBranch(branch)" v-for="branch in all_branches" :key="branch._id"   :class="{active_branch:branch._id===selectedBranchObject._id}" class="d-flex pick_up_block_item">
                  <div>
                    <img src="../../assets/icons/location.svg" class="mr-2">
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
              <div  v-else style="position: relative;">
                <label class="cashback-label">Delivery address</label><br>
                <input v-model="new_order.address" type="text" class="cashback-input" placeholder="Enter delivery address"/>
                <label class="cashback-label">Delivery service</label><br>
                <div class="selected_delivery_option w-100 d-flex" @click="showDeliveryOption= !showDeliveryOption">
                  <div style="flex: 1;">
                    {{selectedDeliveryOptionObject.name}}
                  </div>
                  <div>
                    {{selectedDeliveryOptionObject.price}}
                  </div>
                </div>
                <div v-if="showDeliveryOption" class="delivery_option_wrapper_class" >
                 <div v-if="delivery_options.length">
                   <div @click="setSelectedDeliveryOption(opt)"  v-for="opt in delivery_options" :key="opt._id" class="d-flex delivery_option_class">
                     <div style="flex:1;">{{opt.name}}</div>
                     <div>{{opt.price}}{{currency}}</div>
                   </div>
                 </div>
                  <div v-else class="delivery_option_class">
                    Your purchase is not enough to use delivery option
                  </div>
                </div>

              </div>

              <div class="line"></div>
              <h3 class="client-sub-title">Personal discount</h3>
              <div style="margin-bottom: 12px; display:flex">

                <span  class="cashback-input  d-flex align-items-center mr-3" style="width: 28%">
                  <input class="numb"  style="border: none;width: 100%;height: 100%;" type="number" min="0" max="100" v-model="new_order.personalDiscount.sum" placeholder="Enter amount or percentage">
                  <span v-if="new_order.personalDiscount.sum" style="margin-right: 11px;">
                    <img @click="unSetPersonalDiscount" src="../../assets/icons/x_round_grey.svg" style="cursor: pointer;margin-top: -4px;">
                  </span>
                </span>

                <div>
                <div  style="display: flex;flex:1; margin-bottom:3px">
                  <label class="custom-checkbox mr-2">
                    <input  v-model="new_order.personalDiscount.percent" type="checkbox">
                    <span class="checkmark">
                    </span>

                  </label>
                  <span>Entry to %</span>
                </div>
                  <span style="color:#8C94A5">Check if input is in percentage</span>
                </div>
              </div>

              <div class="reload-code pr-2 d-flex align-items-center mr-0">
                <input v-model="searchPromoText" placeholder="Enter a promocode">
                <span @click="searchPromocode">
                  <img src="../../assets/icons/check_blue.svg">
                </span>
                <button @click="removePromocode" class="promo-btn" style="margin-left: 5px">
                  <img src="../../assets/icons/enable+.svg" style="margin-top: -4px;transform: rotate(45deg);">
                </button>
              </div>

              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <label class="custom-checkbox mr-2">
                    <input v-model="client.points.used" type="checkbox"  :disabled="client.clientObj.points <0">
                    <span class="checkmark">
                    </span>
                  </label>Use point
                </div>
                <h3 class="point-number">{{client.clientObj.points || 0}}</h3>
              </div>

              <div class="line"></div>

              <h3 class="client-sub-title">Payment upon receipt</h3>

              <ul class="p-0">
                <li class="payment-list d-flex justify-content-between">Subtotal<span>{{totalNonDiscounted}}{{currency}}</span></li>
                <li class="payment-list d-flex justify-content-between">Discount<span>{{totalDiscount}}{{currency}}</span></li>
                <li class="payment-list d-flex justify-content-between">
                  <span style="color:#606877">Personal discount</span>
                  <span>
                    <span>{{new_order.personalDiscount.sum}}</span>
                    <span v-if="new_order.personalDiscount.percent">%</span>
                    <span v-else>{{currency}}</span>
                  </span>

                </li>
                <li class="payment-list d-flex justify-content-between">
                  Promocode
                  <span>
                    <span v-if="promocode.object.fixed_sum>0">{{promocode.object.fixed_sum || 0}}{{currency}}</span>
                    <span v-else>{{promocode.object.discount ||0}}%</span>
                  </span>
                </li>
                <li class="payment-list d-flex justify-content-between">Points<span>{{client.points.quantity}}{{currency}}</span></li>
              </ul>

              <div class="line"></div>
              <div class="d-flex mb-5 justify-content-between align-items-center">
                <h3 class="total-price">Total</h3>
                <h3 class="total-price">{{totalPrice}} {{currency}}</h3>
              </div>
            </div>
          </div>

          <div class="d-flex">
            <button v-if="!['Cancelled','Done'].includes(selected_order.status)" class="save mr-2 mb-5" type="button" @click="save">
              <span v-if="!editState">Add order</span>
              <span v-else>Update order</span>
            </button>
            <button class="cancel" @click="cancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import $ from "jquery";

export default {
  name: "AddOrder",
  props:['getOrders','selected_order'],

  data(){
    return {
      guestMode:false,
      guest:{
        name:'',
        phone:''
      },
      editOrderId:'',
      editState:false,
      totalNonDiscounted: 0,
      totalDiscount: 0,
      promocode:{
        object:{},
        validItems:[],
      },
      client:{
        clientObj:{},
        client_status_discount:0,
        client_status_name:"",
        points:{
          used:false,
          quantity:0,
        },
      },
      selectedBranchObject:{},
      showDeliveryOption:false,
      selectedDeliveryOptionObject:{
        name:'',
        price:0,
      },
      all_delivery_options:[],
      all_branches:[],
      currency:'',
      imgSrc:'',
      products:[],
      clients:[],
      searchPromoText:'',
      search_product:'',
      search_client:'',
      new_order:{
        address:'',
        items:[],
        client:'',
        status:'New',
        deliveryType:'self',
        notes:'',
        personalDiscount:{
          percent:true,
          sum:0,
        }
      }
    }
  },
  computed:{
    today(){
      let date = new Date();
      return this.$moment(String(date)).format('MMMM Do YYYY, h:mm');
    },
    delivery_options(){
      let that = this;
      let options = this.all_delivery_options.filter(function (option){
        return option.minPrice<=that.totalPrice || 0;
      })
      return options;
    },
    totalPrice(){
      console.log("Recalc total");
      //products own discount
      //promocode discount
      //clients status discount
      //delivery cost
      //client points if used
      //personal discount entered as % or fixed sum --- new
      let that = this;
      let subArray = [];
      this.new_order.items.forEach((item)=>{
        let obj_ = {
          discounted:false,
          price:0,
          quantity:0,
          oldPrice:0,
          discountType:'',
        }
        //check if product has multiple types
        let itemPrice = item.product.price;
        if(item.product.hasMultipleTypes && item.size){
          itemPrice = item.size.price;
        }
        if(this.compareDates(item.product.promoStart,item.product.promoEnd)){
          obj_.price = item.product.promoPrice;
          obj_.quantity = item.quantity;
          obj_.oldPrice = itemPrice;
          obj_.discounted = true;

          item.discountType = "own";
          item.discounted = true;
          item.current_price = item.product.promoPrice;
        }else{
          obj_.price = itemPrice;
          obj_.quantity = item.quantity;
          obj_.oldPrice = itemPrice;
          obj_.discounted = false;
          item.discountType = "";
          item.discounted = false;
          item.current_price = itemPrice;
        }
        if(!obj_.discounted){
          if(that.promocode.validItems.length>0 && that.promocode.validItems.includes(item.product._id)){
            let sum =  obj_.price - obj_.price * (that.promocode.object.discount/100)-that.promocode.object.fixed_sum;
            obj_.price = sum>0 ? sum.toFixed(2) : 0;
            obj_.discounted = true;

            item.discountType = "promocode";
            item.discounted = true;
            item.current_price =  sum>0 ? sum.toFixed(2) : 0;
          }
        }
        if(!obj_.discounted){
          if(that.client.client_status_discount){
            let sum =  obj_.price - obj_.price * (that.client.client_status_discount/100);
            obj_.price = sum>0 ? sum.toFixed(2) : 0;
            obj_.discounted = true;

            item.discountType = "clientStatus";
            item.discounted = true;
            item.current_price =  sum>0 ? sum.toFixed(2) : 0;
          }
        }
        subArray.push(obj_);
      })
      let subTotal = subArray.reduce(function (total,current){
        total = parseFloat(total) + parseFloat(current.price) * parseFloat(current.quantity) ;
        return total;
      },0);
      let nonDiscountedTotal = subArray.reduce(function (totalN,currentN){
        totalN = parseFloat(totalN) + parseFloat(currentN.oldPrice) * parseFloat(currentN.quantity) ;
        return totalN;
      },0);
      this.setTotalNonDiscounted(nonDiscountedTotal);
      let subDiscount = subArray.reduce(function (totalD,currentD){
        totalD = parseFloat(totalD) + (parseFloat(currentD.oldPrice) - parseFloat(currentD.price)) * parseFloat(currentD.quantity) ;
        return totalD;
      },0);

      //delivery
      if(['Delivery service','delivery'].includes(this.new_order.deliveryType)){
        let delivery  = this.selectedDeliveryOptionObject.price || 0;
        subTotal = (subTotal + parseFloat(delivery));
      }
      //clients points
      if(this.client.points.used){
        let points = this.client.clientObj.points || 0;
        if(points>=subTotal){
          this.setUsedPoints(subTotal);
          subTotal = 0;
        }else{
          subTotal = subTotal - parseFloat(points);
          this.setUsedPoints(points);
        }

      }else{
        this.unSetUsedPoints();
      }
      //personal discount
      let personalDiscountSum = parseFloat(this.new_order.personalDiscount.sum || 0);
      if(this.new_order.personalDiscount.percent){
        let discount = subTotal * personalDiscountSum / 100;
        subTotal = subTotal - discount;
        subDiscount = subDiscount + discount;
      }else{
        let discount = personalDiscountSum;
        subTotal = subTotal - discount;
        subDiscount = subDiscount + discount;
      }
      this.setTotalDiscount(subDiscount);
      return subTotal.toFixed(2);//type string
    },
    filteredProducts(){
     return this.products.filter((product)=>{
        return product.name.toLowerCase().includes(this.search_product.toLowerCase())
      })
    },
    filteredClients(){
      return this.clients.filter((client)=>{
        return client.name.toLowerCase().includes(this.search_client.toLowerCase())
      })
    },
  },
  methods:{
    unSetPersonalDiscount(){
      this.new_order.personalDiscount={
        percent:true,
        sum:0,
      }
    },
    setTotalNonDiscounted(totalNonDiscounted){
      this.totalNonDiscounted = totalNonDiscounted.toFixed(2);
    },
    setTotalDiscount(discount){
      this.totalDiscount = discount.toFixed(2);
    },
    setUsedPoints(points){
      this.client.points.quantity = points.toFixed(2);
    },
    unSetUsedPoints(){
      this.client.points.quantity = 0;
    },
    removePromocode() {
      this.promocode.object = {};
      this.promocode.validItems = [];
      this.searchPromoText = '';
    },
    searchPromocode(){
      let that = this;
      this.axios.get(this.url('searchPromocodeByCodeApi'),{
        params: {
          "search":this.searchPromoText,
          "date":new Date(),
          "sum": this.totalPrice,
        },
      }).then(function(response){
        let data = response.data.object;
        if(data){
          that.$successAlert(response.data.msg);
          that.checkPromocode(data);
        }else{
          that.$warningAlert(response.data.msg);
        }
      });
    },
    checkPromocode(promocode){
      if(!promocode){return }
      let promocode_type = promocode.selected_type;
      let product_ids = [];
      if(promocode.code !=='' && promocode.selected_items_list.length===0){
        //if promocode exists and does not have selected items --> applicable to all products
        //check type
        if(promocode_type==='all'){
          product_ids = this.new_order.items.map(function (item){
            return item.product._id;
          })
        }else if(promocode_type==='Service'){
          this.new_order.items.map(function (item){
            if(item.model_type ==='Service' ){
              product_ids.push(item.product._id);
            }
          })
        }else if(promocode_type==='Product'){
          this.new_order.items.map(function (item){
            if(item.model_type ==='Product' ){
              product_ids.push(item.product._id);
            }
          })
        }
      }else if(promocode.selected_items_list.length>0){
        let ids = promocode.selected_items_list;
        //check if products in basket match the promo products
        this.new_order.items.forEach(function (item){
          if(ids.includes(item.product._id)){
            product_ids.push(item.product._id);
          }
        });
      }
      //result
      this.promocode.object=promocode;
      this.promocode.validItems = product_ids;
    },
    setBranch(obj){
      if(obj){
        this.selectedBranchObject = obj;
      }
    },
    setSelectedDeliveryOption(obj){
      if(obj){
        this.selectedDeliveryOptionObject = obj;
        this.showDeliveryOption = false;
      }
    },
    unSetSelectedDeliveryOption(){
        this.selectedDeliveryOptionObject = {};
        this.showDeliveryOption = false;
    },
    compareDates(dateStart_,dateEnd_){
      if(!dateStart_ || !dateEnd_){
        return false;
      }
      let today = this.$moment();
      let dateStart = this.$moment(dateStart_);
      let dateEnd = this.$moment(dateEnd_);
      //(start<=today<=end)
      return(dateStart.isSameOrBefore(today,'day') && dateEnd.isSameOrAfter(today,'day'))
    },
    cancel(){
      $('#add-order').modal("hide")
      this.resetData();
    },
    save(){
      //validate
      if(this.new_order.items.length<1){
        this.$warningAlert('Select products');
        return;
      }
      if((Object.keys(this.client.clientObj).length === 0) && (!this.guestMode)){
        this.$warningAlert('Select client');
        return;
      }
      if(this.new_order.deliveryType === "self"){
        if(Object.keys(this.selectedBranchObject).length === 0){
        this.$warningAlert('Select branch');
          return;
        }
      }else{
        if(Object.keys(this.selectedDeliveryOptionObject).length < 3){
          this.$warningAlert('Select delivery option');
          return;
        }
        if(this.new_order.address.length<1){
          this.$warningAlert('Enter address');
          return;
        }
      }

      let products = this.new_order.items.map(function (item){
        return {
          id:item.product._id,
          quantity:item.quantity,
          size:item.size,
        }
      })

      if(this.editState){
        let order = this.selected_order;
        //static unafected by changes:
        //clients status discount
        //promocode
        //delivery
        //if ids are the same use old objets
        let data = {
          client:this.client.clientObj._id,
          promoCode:this.promocode.object._id,
          delivery:this.selectedDeliveryOptionObject._id,
          products:products,
          points:this.client.points.quantity,
          status:"In Progress",
          address:this.new_order.address,
          deliveryType:this.new_order.deliveryType,
          notes:this.new_order.notes,
          branch:this.selectedBranchObject._id,
          personalDiscount:this.new_order.personalDiscount,
          old_order:order,
          guest:this.guest,
        }

        this.axios.put(this.url('updateOrder',this.editOrderId),data)
          .then(()=>{
            this.getOrders();
            this.$successAlert('Order has been added');
            $('#add-order').modal("hide");
            this.resetData();
          }).catch((error)=>{
          console.log(error);
          if(error.response && error.response.data){
            this.$warningAlert(error.response.data.msg)
          }
        });
      }else{
        let data = {
          client:this.client.clientObj._id,
          promoCode:this.promocode.object._id,
          delivery:this.selectedDeliveryOptionObject._id,
          products:products,
          points:this.client.points.quantity,
          status:"In Progress",
          address:this.new_order.address,
          deliveryType:this.new_order.deliveryType,
          notes:this.new_order.notes,
          branch:this.selectedBranchObject._id,
          personalDiscount:this.new_order.personalDiscount,
          guest:this.guest,
        }

        this.axios.post(this.url('addOrder'),data)
            .then(()=>{
              this.getOrders();
              this.$successAlert('Order has been added');
              $('#add-order').modal("hide");
              this.resetData();
            }).catch((error)=>{
          console.log(error);
          if(error.response && error.response.data){
            this.$warningAlert(error.response.data.msg)
          }
        });
      }

    },
    resetData(){
      this.guestMode = false;
      this.guest = {
        name:'',
        phone:''
      };
      this.editOrderId = '';
      this.editState = false;
      this.totalNonDiscounted = 0;
      this.totalDiscount = 0;
      this.promocode={
        object:{},
        validItems:[],
      };
      this.client={
        clientObj:{},
        client_status_discount:0,
        client_status_name:"",
        points:{
          used:false,
          quantity:0,
        },
      };
      this.selectedBranchObject={};
      this.showDeliveryOption=false;
      this.selectedDeliveryOptionObject={
        name:'',
        price:0,
      };
      this.new_order={
        address:'',
        items:[],
        client:'',
        status:'New',
        deliveryType:'self',
        notes:'',
        personalDiscount:{
          percent:true,
          sum:0,
        }
      }
    },
    selectProduct(selected,size=null){
      let obj = {
        quantity:1,
        current_price:0,
        discounted:false,
        discountType:'',
        product:selected,
        size:size
      }
      let checkOld = [];

      if(!selected.hasMultipleTypes){
        checkOld = this.new_order.items.filter(function (order){
          return order.product._id.toString() == selected._id.toString();
        })
      }else{
        checkOld = this.new_order.items.filter(function (order){
          return order.product._id.toString() == selected._id.toString() && order.size._id.toString() == size._id;
        })
      }

      if(checkOld.length>0){
        this.$warningAlert('Already selected');
        return;
      }
      this.new_order.items.push(obj);
      this.search_product = '';
    },
    selectClient(id){
      let that = this;
      this.clients.filter((client)=>{
        if(client._id === id){
          // that.new_order.client = client._id;
          that.client.clientObj = client;
        }
      })
      this.search_client = '';
      ///
      let url = this.url('getClient',id);

      this.axios.get(url).then(function (response) {
        if(response.data.discount){
          that.client.client_status_discount = response.data.discount.discount_percentage || 0;
          that.client.client_status_name = response.data.discount.name || '';
        }else{
          that.client.client_status_discount = 0;
          that.client.client_status_name = '';
        }
      }).catch(function(error){
        if (error.response) {
          that.$warningAlert(Object.values(error.response.data.errors))
        }
      });

      ///
    },
    deleteFromOrder(id){
      this.new_order.items=this.new_order.items.filter((item)=>item.product._id !== id)
    },
    removeClient(){
      // this.new_order.client = {};
      this.client.clientObj = {};
      this.client.client_status_discount =  0;
      this.client.client_status_name =  '';
    },
    getProducts(){
      this.axios.get(this.url('getProducts'))
      .then((res)=>{
        this.products = res.data.objects;
      })

    },
    getClients(){
      this.axios.get(this.url('getClients'))
          .then((res)=>{
            this.clients = res.data.objects;
          })
    },
    getSettings(){
      let that=this;
      this.axios.get(this.url('getSettings'))
        .then((response) => {
          that.all_delivery_options = response.data.deliveries;
          that.all_branches = response.data.branches;
          that.currency = response.data.object.currency;
        }).catch(function (error){
          if (error.response) {
            console.log('setCatalog_settings EERRRor',error.response)
          }
        })
    }
  },
  watch: {
    selected_order: {
      handler(val) {
        //Check if products,delivery,branch still exist
        let that = this;
        if(val!==''){
          this.editOrderId = val._id;
          this.editState = true;
          that.new_order.items = val.productsDetails;
          that.new_order.notes = val.notes;
          that.new_order.personalDiscount = val.personalDiscount ? val.personalDiscount : {percent:true,sum:0,};
          that.checkPromocode(val.promoCodeObject);
          that.searchPromoText = val.promoCodeObject ? val.promoCodeObject.code : '';
          that.setBranch(val.branchObject);
          let deliveryType = val.deliveryType;
          if(deliveryType=="Pick-up"){
            deliveryType = "self";
          }
          that.new_order.deliveryType = deliveryType;
          that.setSelectedDeliveryOption(val.deliveryObject);
          that.new_order.address = val.address;
          that.guest.name = val.client_name;
          that.guest.phone = val.client_phone;

          if(val.client){
            // that.new_order.client = val.client._id;
            that.client.clientObj = val.client;
            that.client.client_status_discount = val.statusDiscount.discount_percentage || 0;
            that.client.client_status_name = val.statusDiscount.name || '';
            that.client.points.used = !!val.points;
            that.client.clientObj.points += val.points || 0;
          }else{
            that.guestMode = true;
          }

        }else{
          this.editState = false;
          this.resetData();
        }
      },
      // deep: true,
      immediate: true,
    },
    totalPrice: {
      handler(val, old) {
        if(val<old){
          this.unSetSelectedDeliveryOption()
        }
      },
      // deep: true,
      immediate: true,
    },
    guestMode: {
      handler(val) {
          if(val){
            this.client={
              clientObj:{},
              client_status_discount:0,
              client_status_name:"",
              points:{
                used:false,
                quantity:0,
              },
            };
          }
        },
      immediate: true,
    }
  },
  mounted(){
    this.getProducts();
    this.getClients();
    this.getSettings();
    this.imgSrc = this.$server

  },
  beforeCreate() {

  }
}
</script>


<style scoped>

.btn-secondary {
  color: #0c0c0c;
  background-color: #f3f6f8;
  border-color: #6c757d;
}

.table-item{
  padding: 10px 5px;
}
.lineThrough{
  text-decoration: line-through;
  font-size: 10px!important;
  color: #B0B0B0;
}

.general-title{
  margin-bottom: 3px;
}
.active_branch{
  border-color: #616CF5!important;
}
.pick_up_block_item{
  border-radius: 7px;
  padding: 15px;
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
  margin-bottom: 5px;
}
.empty_delivery{
  border-color:red;
}
.delivery_option_class:hover{
  color:#616cf5
}
.delivery_option_wrapper_class{
  position:absolute;
  border: 1px solid #d3d3d3;
  width:100%;
  background-color: white;
  border-top: none;
  padding: 10px;
  max-height:300px;
  overflow-y: auto;
}
.pick_up_block_item_wh{
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #8C94A5;
  line-height: 1;


}
.selected_delivery_option{
  display: flex;
  align-items: center;
  height: 40px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

}
.delivery_option_class{
  cursor: pointer;
  height: 35px;
}
.modal-header .close{
  margin: 0;
  padding: 0;
  margin-top: 7px;
  margin-right: 8px;
}
.client-search{
  width: 100%;
}
.client-search input{
  width: 100%;
  border:none;
  background: none;
}
.search-client-icon{
  margin-right: 10px;
  opacity: 0.5;
}
.empty-img{
  width: 67px;
  height: 54px;
}
.close-client{
  position: absolute;
  right:30px;
}
.dropup .dropdown-toggle::after{
  display:none;
}
.selects:before{
  content:'';
  background: url("../../assets/clients/slideRight.svg") no-repeat;
  width:20px;
  height:20px;
  position: absolute;
  z-index:88;
  right: 10px;
  transform: rotate(90deg);
  top:25%;

}
.selects{
  position: relative;

}

.form-control{
  margin-bottom: 15px;
  background: #F8F9FB;
  border:none;

}
/*.promo-btn img{*/
/*  width: 11px;*/
/*  height: 12px;*/
/*}*/
.enter-name-input::placeholder{
  color:#616cf5;
  opacity: 1;
}
.promo-btn{
  background: #F4F4F4;
  /* Stroke */
  width: 40px;
  height: 33px;
  border: 1px solid #D3D3D3;
  box-sizing: border-box;
  border-radius: 5px;
}
.notes{
  margin-bottom: 38px;
}
.guest-name{
  margin-bottom: 15px;
}
.client-sub-title{
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 15px;
}
.point-number{
  font-size: 16px;
  color:#616cf5;
  font-weight: normal;
}
.detail-status span{
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius:50%;
  background: #F19C4B;
  margin-right: 5px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.detail-date{
  color: #8C94A5;
  font-size: 14px;

}
.detail-product{
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 24px;
}
.enter-name-input{
  border: 1px solid #616CF5;
  border-radius: 5px;
  height: 45px;
  width: 100%;
  padding: 0 30px;
  margin-bottom: 20px;

}
.main-content-header{
  padding: 5px 5px;
}
.table{
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  padding:20px 30px;
  margin-bottom: 13px;
}
.quantity{
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  height: 36px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.table-content{
  height: calc(100vh - 320px);

}
.cancel{
  width: 120px;
}
.client-box{
  padding: 0 20px;
  background: #F8F9FF;
  border-radius: 5px;
  margin-bottom: 19px;
  height: 80px;
}
.client-avatar{
  width: 50px;
  height: 50px;
  border-radius:50%;
  object-fit: cover;
  margin-right: 13px;
}
.name-client{
  font-size: 18px;
  font-weight:  normal;
  margin-bottom: 5px;
}
.category{
  color: #8C94A5;
}
.category span{
  color:#000;
  text-transform: capitalize;

}

.line{
  margin: 18px 0;
}
.cashback-input{
  width: 100%;
  margin-bottom: 12px;
}

.payment-list{
  color:#606877;
  margin-bottom: 5px;
}
.payment-list span{
  color:#000;
}
.total-price{
  font-size: 16px;
  font-weight: 600;
}
.reload-code{
  margin-bottom: 20px;
}
@media (max-width: 992px) {
  .modal-dialog{
    width: 100%;
    max-width: 100%!important;
  }
}
</style>