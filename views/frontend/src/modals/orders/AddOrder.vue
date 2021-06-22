<template>
  <div class="modal fade right"  id="add-order" tabindex="-1" role="dialog" aria-labelledby="add-order" aria-hidden="true">
    <div class="modal-dialog  modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: calc(100vw - 250px);" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header justify-content-start align-items-start">
            <img data-dismiss="modal" aria-label="Close" class="close" src="../../assets/icons/x.svg" alt="">
          <div>
           <h3 class="modal-title">New order</h3>
           <span class="detail-date">{{new Date().toString()}}</span>
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
                        You don't have any products
                  </div>
                  <div  v-else v-for="product in filteredProducts" :key="product._id" @click="selectProduct(product)" class="product-order  d-flex align-items-center justify-content-between">
                    <div class="table-child d-flex align-items-center">
                      <div class="table-img">
                        <img v-if="product.img" :src="imgSrc+'/'+product.img">
                        <img v-else src="../../assets/icons/no-catalog.svg">
                      </div>
                      {{product.name}}
                    </div>
                    <div>
                      {{product.price}} $
                    </div>
                  </div>
                </div>
              </div>

              <div class="table">
                <div class="d-flex main-content-header">
                  <div class="table-head" style="width: 50%;">Product</div>
                  <div class="table-head" style="width: 20%;">Price</div>
                  <div class="table-head" style="width: 20%;">Quantity</div>
                  <div class="table-head" style="width: 15%;">Total</div>
                  <div class="table-head" style="width: 10%;"></div>
                </div>

                <div class="table-content">
                  <div v-if="new_order.products.length===0" class="d-flex align-items-center h-100 justify-content-center flex-column">
                    <img class="empty-img mb-2" src="../../assets/icons/no-catalog.svg">
                    <p class="empty-page-text">Add a product to start</p>
                  </div>

                  <div  v-else  v-for="order in new_order.products" :key="order._id" class="table-item d-flex align-items-center" >
                    <div  class="d-flex align-items-center"  style="width: 50%;">
                      <div class="table-img">
                        <img v-if="order.img" :src="imgSrc+'/'+order.img">
                        <img v-else src="../../assets/icons/no-catalog.svg">
                      </div>
                      {{order.name}}
                    </div>
                    <div style="width:20%">{{order.price}}$</div>
                    <div style="width:20%"><input type="number" min="1" class="quantity" v-model="order.quantity"></div>
                    <div style="width:15%">{{order.quantity*order.price}} $</div>
                    <div style="width:10%"><img @click="deleteFromOrder(order._id)" src="../../assets/icons/trash_empty.svg"></div>
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

              <div  class="client-box d-flex align-items-center">
                <div v-if="clientObj === ''"  class="client-search d-flex align-items-center">
                  <img src="../../assets/icons/search-icon.svg" class="search-client-icon">
                  <input v-model="search_client" placeholder="Enter clients name or number" class="search-client">
                </div>
                <div v-else class="d-flex align-items-center">
                  <img class="client-avatar" v-if="clientObj.avatar" :src="imgSrc+'/'+clientObj.avatar">
                  <img class="client-avatar" v-else src="../../assets/icons/chat.svg">
                  <div class="position-relative">
                    <h2 class="name-client">{{clientObj.name}}</h2>
                    <div class="category">
                      Category:
                      <span v-if="clientObj.category !== undefined">{{clientObj.category.name}}</span>
                      <span v-else>no </span>
                    </div>
                  </div>
                  <img @click="removeClient" class="close-client" src="../../assets/icons/deleteClient.svg">
                </div>
              </div>
             <div class="parent-order-client">
               <div v-if="search_client.length !==0" class="child-order-client">
                <div v-if="filteredClients.length === 0">
                  <div class="pl-3">There is not clients</div>
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
                <select v-model="new_order.deliveryType" class=" form-control long-form-control  form-control-lg" aria-label=".form-select-lg example">
                  <option value="self" >Self</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>

              <span class="category">
              {{new_order.client.address}}
              </span>

              <div class="line"></div>
              <h3 class="client-sub-title">Personal discount</h3>
              <input class="cashback-input" placeholder="Enter amount or percentage">
              <div class="reload-code pr-2 d-flex align-items-center mr-0"><input v-model="new_order.promoCode" placeholder="Enter a promocode"><button class="promo-btn"><img src="../../assets/icons/enable+.svg"></button></div>

              <div class="d-flex justify-content-between align-items-center">
                <div><label class="custom-checkbox mr-2"><input  type="checkbox"><span class="checkmark"></span></label>Use point</div>
                <h3 class="point-number">249</h3>
              </div>

              <div class="line"></div>

              <h3 class="client-sub-title">Payment upon receipt</h3>

              <ul class="p-0">
                <li class="payment-list d-flex justify-content-between">Inovoice amount<span>0 $</span></li>
                <li class="payment-list d-flex justify-content-between">Discount<span>0 $(0%)</span></li>
                <li class="payment-list d-flex justify-content-between">Personal discount<span>0%</span></li>
                <li class="payment-list d-flex justify-content-between">Promocode<span>0(0%)</span></li>
                <li class="payment-list d-flex justify-content-between">Points<span>0</span></li>
              </ul>

              <div class="line"></div>
              <div class="d-flex mb-5 justify-content-between align-items-center">
                <h3 class="total-price">Total</h3>
                <h3 class="total-price">{{totalPrice}} $</h3>
              </div>
            </div>
          </div>

          <div class="d-flex">
            <button class="save mr-2 mb-5" @click.prevent="onSubmit">Add order</button>
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
  props:['getOrders'],

  data(){
    return {
      imgSrc:'',
      products:[],
      clients:[],
      search_product:'',
      search_client:'',
      clientObj:'',
      new_order:{
        products:[],
        client:'',
        status:'New',
        deliveryType:'self',
        notes:'',
        promoCode:''

      }

    }
  },
  computed:{
    totalPrice(){
      let sum = 0;
      this.new_order.products.forEach((item)=>{
        sum+=item.price*item.quantity
      })
      return sum
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
    cancel(){
      $('#add-order').modal("hide")
      this.new_order = {
        products:[],
        client:'',
        status:'new',
        deliveryType:'self',
        notes:'',
        promoCode:''
      }
      this.clientObj = ''
    },
    onSubmit(){
      this.axios.post(this.url('addOrder'),this.new_order)
            .then(()=>{
              this.getOrders()
              this.$successAlert('Order has been added')
              $('#add-order').modal("hide");
              this.new_order = {
                products:[],
                client:'',
                status:'New',
                deliveryType:'self',
                notes:'',
                promoCode:''
              }
              this.clientObj = ''
            }).catch((error)=>{
                    if(error.response && error.response.data){
                        this.$warningAlert(error.response.data.msg)
                    }
            });

    },
    selectProduct(selected){

     if(this.new_order.products.length === 0){
       this.new_order.products.push(selected)
       selected.quantity = 1;
     }
     else{
       let product = null;
       for (let i = 0; i < this.new_order.products.length; i++) {
         if(this.new_order.products[i]._id === selected._id){
           this.new_order.products[i].quantity = +this.new_order.products[i].quantity+1
           product = null;
           break;
         }
         product = selected
       }
       if(product){
         product.quantity = 1;
         this.new_order.products.push(product)
       }
     }
      this.search_product = ''
    },
    selectClient(id){
      this.clients.filter((client)=>{
        if(client._id === id){
          this.new_order.client = client._id;
          this.clientObj = client
        }
      })
      this.search_client = ''
    },
    deleteFromOrder(id){
      this.new_order.products=this.new_order.products.filter((item)=>item._id !== id)

    },
    removeClient(){
      this.new_order.client = '';
      this.clientObj = ''
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
    }
  },

  mounted(){
    this.getProducts()
    this.getClients()
    this.imgSrc = this.$server

  }


}
</script>


<style scoped>
.general-title{
  margin-bottom: 3px;
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
.promo-btn img{
  width: 11px;
  height: 12px;
}
.enter-name-input::placeholder{
  color:#616cf5;
  opacity: 1;
}
.promo-btn{
  background: #F4F4F4;
  /* Stroke */
  width: 34px;
  height: 32px;
  border: 1px solid #D3D3D3;
  box-sizing: border-box;
  border-radius: 5px;
}
.notes{
  margin-bottom: 38px;
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
  padding: 5px 20px;
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
  width: 59px;
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
</style>