<template>
    <div class="container-fluid">
      <div class="order_container_wrapper">

        <div class="order_container">
          <div class="top_fixed">
            <div class="d-flex">
              <div @click="openAdd" style="z-index: 1;">
                <img src="../../../assets/icons/blue_plus.svg">
              </div>
              <div class="order_title" style="flex: 1;margin-left: -37px;">
                Order
              </div>
            </div>
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="../../../assets/img/wave_line.svg">
            </div>
          </div>


          <div class="d-flex tempo_basket_item" v-for="(itemQ,index) in order" :key="itemQ.product._id"  v-for-callback="{key: index, array: order, callback: callback}">
            <div class="d-flex" style="width:100%;overflow: hidden;  padding: 13px 0;">
              <div class="d-flex" style="flex-direction: column;overflow: hidden;min-width: 180px;flex:3;">
                <span style="font-weight: bold;max-width: 135px;overflow: hidden;text-overflow: ellipsis;">{{itemQ.product.name}}</span>
                <div style="display: flex;">
                  <div style="color:#858585;text-overflow: ellipsis;overflow: hidden;max-width: 87px;">
                    {{itemQ.product.vendorCode}}</div>
                  <div style="display: flex;margin-left: auto;" class="basket-amount">
                    <button v-if="itemQ.quantity>1" @click="updateQuantity(itemQ.product._id,'decrease')" class="decrease mb-0">-</button>
                    <button v-else @click="removeProduct(itemQ.product._id)" class="decrease mb-0">x</button>
                    <span class="count">{{itemQ.quantity}}</span>
                    <button @click="updateQuantity(itemQ.product._id,'increase')" class="increase mb-0" >+</button>
                  </div>
                </div>
              </div>
              <div class="d-flex" style="margin-left: auto;flex-direction: column;flex: 2;">
                <span v-if="compareDates(itemQ.product.promoStart,itemQ.product.promoEnd)" style="text-align: right;">
                  {{itemQ.product.promoPrice}}$%
                </span>
                <span v-else style="text-align: right;">
                  {{itemQ.product.price}}$
                </span>
                <span style="text-align: right;">
                  <img src="../../../assets/icons/greyArrowLeft.svg">
                  <span style="color: #606877;font-size: 14px;margin-left: 5px;">Swipe left</span>
                </span>
              </div>
            </div>

            <div class="d-flex catalog_menu_hidden" >
              <div @click="removeProduct(itemQ.product._id)" style="background-color: #8C94A5;">
                <img src="../../../assets/icons/xWhite.svg">
              </div>
            </div>
          </div>

          <div class="confirm_container">
            <div class="confirm_container_total">
              <div>
                Total
              </div>
              <div>
                {{total}}$
              </div>
            </div>
            <div @click="confirm" class="confirm_btn">
              Confirm
            </div>
          </div>
        </div>
      </div>

      <!--Centered Modal-->
      <div class="parent-modal">
        <div class="modal myModal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModal" aria-hidden="true">
          <div class="modal-dialog" role="document" style="height: 100%;margin:auto;border: 1px solid grey;">
            <div class="modal-content QRCodeModalContent" style="height: calc(100% - 100px);margin-top: 100px;">
              <div class="modal-body">
                <div style="font-weight: 600;font-size: 24px;text-align: center;">
                  Add product
                </div>
                <div>
                  <div style="height: 45px;border-radius:5px;border: 1px solid #D3D3D3;width:100%;padding-left: 10px;display: flex;align-items: center;">
                    <img src="../../../assets/icons/searchGrey.svg">
                    <input @input="search" v-model="searchText" placeholder="Tap to search" type="text" style="border:none;width: 100%;padding-left: 10px;">
                  </div>
                  <div class="searchResult">
                    <div @click="addNewProduct(res._id);" v-for="res in searchResult" :key="res._id">
                      <div class="d-flex" style="flex-direction: column;justify-content: space-between">
                        <div>{{res.name}}</div>
                        <div style="font-size: 14px;color:  #8C94A5;">{{res.vendorCode}}</div>
                      </div>
                      <div style="font-weight: 600">{{res.price}}$</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import Hammer from "hammerjs"
import $ from "jquery";

export default {
  name: "Menu",
  data(){
    return{
      order:[],
      company:'',
      company_url:'',
      once:true,
      searchText:'',
      searchResult:[],
    }
  },
  computed:{
    server(){
      return this.$server;
    },
    total(){
      let that = this;
      let total = 0;
      this.order.forEach(function (item){
        if(that.compareDates(item.product.promoStart,item.product.promoEnd)){
          total=(parseFloat(total) + parseFloat(item.product.promoPrice) * parseFloat(item.quantity)).toFixed(2);
        }else{
          total=(parseFloat(total) + parseFloat(item.product.price)* parseFloat(item.quantity)).toFixed(2);
        }
      })
      return total;
    },
  },
  methods:{
    confirm(){
      let that = this;
      const options = {
        headers: {"x-client-url": this.company_url}
      }
      let products = this.order.map(function (ord){
        return {id:ord.product._id,quantity:ord.quantity}
      })

      let data = {
        status:"In Progress",//not ?
        products:products,
      }

      this.axios.post(this.url('addOrderWeb'),data,options).then(function (response) {
        console.log(response);
      }).catch(function(error){
        if (error.response) {
          that.$warningAlert(error.response.data);
        }
      });
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
    addNewProduct(id){
      let that = this;
      let match = this.order.filter(function(momo) {
        return momo.product._id === id;
      });
      if(match.length>0){
        this.$warningAlert("Product is already selected");
        return;
      }
      ///add
      this.axios.post(this.url('updateTempoOrder'),{
        'product':id,
        "order_url":this.$route.params.code,
        'db':this.company,
      }).then(function(response){
        that.order = response.data.object.order;
        $('#editModal').modal('hide');
      }).catch(function (e){
        console.log(e);
      });
    },
    removeProduct(id){
      let that = this;
      this.axios.post(this.url('removeProductTempoOrder'),{
        'product':id,
        "order_url":this.$route.params.code,
        'db':this.company,
      }).then(function(response){
        that.order = response.data.object.order;
      }).catch(function (e){
        console.log(e);
      });
    },
    updateQuantity(id,type){
      //type increase || decrease
      let that = this;
      this.axios.post(this.url('updateProductTempoOrder'),{
        'product':id,
        'type':type,
        "order_url":this.$route.params.code,
        'db':this.company,
      }).then(function(response){
        that.order = response.data.object.order;
      }).catch(function (e){
        console.log(e);
      });
    },
    search(){
      let that = this;
      if(this.searchText !==""){
        this.axios.get(this.url('searchProductWeb'),{
          params: {
            "search":this.searchText,
            "db":this.company,
          },
        }).then(function(response){
          that.searchResult = response.data.objects;
        }).catch(function (e){
          console.log(e);
        });
      }else{
        that.searchResult = [];
      }
    },
    openAdd(){
      $('#editModal').modal('show');
    },
    callback() {
      if(this.once){
        this.once = false;
        this.swipe_init();
      }
    },
    swipe_init(){
      $('.tempo_basket_item').each(function(){
        let order_item = new Hammer(this);
        let that = this;
        let width = 75;
        let time = 300;
        order_item.on("swipeleft", function() {
          let margin_left = $(that).css("marginLeft").replace('px', '');
          console.log('left',margin_left);

          if(margin_left>-width){
            $(that).animate({
              marginLeft: '-='+width+'px',
              marginRight: '+='+width+'px'
            }, time);
          }
        });
        order_item.on("swiperight", function() {
          let margin_left = $(that).css("marginLeft").replace('px', '');
          console.log('right margin_left',margin_left);
          if(margin_left<0){
            $(that).animate({
              marginLeft: '+='+width+'px',
              marginRight: '-='+width+'px'
            }, time);

          }
        });

      })
    },
  },

  directives: {
    forCallback(el, binding) {
      let element = binding.value
      var key = element.key
      var len = 0

      if (Array.isArray(element.array)) {
        len = element.array.length
      }

      else if (typeof element.array === 'object') {
        var keys = Object.keys(element.array)
        key = keys.indexOf(key)
        len = keys.length
      }

      if (key == len - 1) {
        if (typeof element.callback === 'function') {
          element.callback()
        }
      }
    }
  },

  beforeCreate() {
    (async () => {
      let that = this;
      await this.axios.get(this.url('getTempoOrder'),{
          params: {
            "order_url":this.$route.params.code,
          }
        }).then((response) => {
            console.log(response.data.object);
            that.order = response.data.object.order;
            that.company = response.data.object.company;
            that.company_url = response.data.object.company_url;
            that.once = true;
          }).catch(function (error){
            if (error.response) {
              console.log('setCatalog_settings EERRRor',error.response)
              let err_page = `
              <div>
                <marquee>
                  <span style="font-size: 30px">404</span>
                </marquee>
              </div>
              `
              $('.overlay_404').html(err_page).show();
            }
          })
    })().catch(err => {
      console.error(err,"menu EEEEERRR");
    });
  },
  created() {

  },
  watch:{

  }
}
</script>

<style scoped>
.order_container_wrapper{
  max-width: 400px;
  margin: auto;
  height: 100vh;
  position: relative;
  overflow-y: auto;
}
.order_container{
  /*max-width: 400px;*/
  /*margin: auto;*/
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 191px);
  margin-top: 87px;
  box-sizing: border-box!important;

}
.order_title{
  text-align: center;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
}
.tempo_basket_item{
  height: 75px;
  margin-right: -75px;
  /*border:1px solid rebeccapurple;*/
}
.tempo_basket_item:nth-child(odd){
  background-color: #F8F9FB;
}

.catalog_menu_hidden{
  width:75px;
  /*border:1px solid green;*/
  min-width: 75px;
}
.catalog_menu_hidden div{
  flex:1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top_fixed{
  position: absolute;
  top: 20px;
}
.confirm_container{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-bottom: 30px;
  border-top:1px solid #D3D3D3;
  background-color: white;

}
.confirm_container_total{
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
}
.confirm_btn{
  background: #616CF5;
  border-radius: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-size: 16px;
  color: white;
  cursor: pointer;
}
.modal-content{
  background: #FFFFFF;
  border-radius: 30px 30px 0px 0px;
}
.searchResult{
  margin-top: 30px;
  overflow: auto;
  max-height: calc(100vh - 250px);
}
.searchResult>div{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #D3D3D3;
  height: 62px;
  padding: 10px 0;
  font-size: 16px;
  cursor: pointer;
}
.decrease, .increase{
  padding-bottom: 5px;
}
</style>