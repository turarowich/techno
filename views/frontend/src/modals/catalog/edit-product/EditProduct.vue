<template>
  <div class="modal fade right "  id="edit-product" tabindex="-1" role="dialog" aria-labelledby="edit-product" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: 82%;" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header justify-content-start align-items-center">
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../../assets/icons/x.svg" alt="">
              </span>
          </button>
          <h3 class="modal-title">Edit</h3>
        </div>
        <div class="myModal-body">
          <div class="row">
            <div class="col-11 m-auto">
              <form  class="modal-form">
                <div class="d-flex align-items-center mb-3">
                  <div style="width:50%" class="mr-3">
                    <label class="product-label">Name</label><br>
                    <input  v-model="currentData.name" style="width:100%" class="cashback-input">
                  </div>

                  <div class="quantity-category mr-3">
                    <label class="product-label">Quantity</label><br>
                    <input  v-model="currentData.quantity" class="cashback-input">
                  </div>

                  <div style="width:25%;">
                    <label class="product-label">Select category</label><br>

                    <select v-model="currentData.category"  class="form-control mb-0 select-phone" >
                      <option :value="cat._id" v-for="cat in listCategory" :key="cat._id">{{cat.name}}</option>
                    </select>
                  </div>
                </div>

                <label>Name in russian</label><br>
                <input class="cashback-input mb-3" style="width:50%"><br>
                <label>Description</label>
                <textarea v-model="currentData.description" class="general-area p-3 mb-3" style="height:160px"   name="description"></textarea>

                <div class="d-flex mb-3">
                  <label class="custom-checkbox">
                    <input @click="editShowPrice()"  id="edit-show-price" type="checkbox" :checked="isDiscount">
                    <span class="checkmark"></span>
                  </label>
                  <span>Discount</span>
                </div>

                <div class="d-flex ">
                  <div style=" width:33.33%; margin-right:8px;">
                    <label>Price</label>
                    <input v-model="currentData.price" class="form-input cashback-input mb-4" placeholder="Price"  name="price">
                  </div>
                  <div :class="{active:isDiscount}" class="show-price" style="width:33.33%; margin-right:8px;">
                    <label>Promotional prices</label>
                    <input v-model="currentData.promoPrice" class="form-input cashback-input mb-4" placeholder="Price">
                  </div>
                  <div style="width:33.33%;">
                    <label>Vendor Code</label>
                    <input v-model="currentData.vendorCode"  class="form-input cashback-input mb-4" placeholder="Vendor code"  name="vendorCode">
                  </div>
                </div>

                <label class="valid-label">Period of action</label>
                <div class=" product-calendar d-flex align-items-center ">
                  <div class="d-flex align-items-center mr-2">
                    <label >From</label>
                    <div class="calendar d-flex align-items-center">
                      <input v-model="promoStart.formatted" id="promoStart_input" class="calendar-input">
                      <img src="../../../assets/icons/Calendar.svg">
                    </div>
                  </div>

                  <div class="d-flex align-items-center">
                    <label>to</label>
                    <div class="calendar d-flex align-items-center">
                      <input v-model="promoEnd.formatted" id="promoEnd_input" class="calendar-input">
                      <img src="../../../assets/icons/Calendar.svg">
                    </div>
                  </div>

                </div>

                <div class="modal-img ">
                  <label>Photos</label>

                  <p>
                    You can upload 4 more JPG or PNG photos, the minimum resolution is 400*400px, the size is<br>
                    not more than 3 MB. The first photo will be shown as the main one by default .</p>

                  <label >
                    <img src="../../../assets/img/modal-img.svg">
                    <input class="d-none" type="file" name="imgArray">
                  </label>
                </div>

                <div class="modal-btn d-flex">
                  <button @click.prevent="onSubmit(currentData._id)" class="save">Save</button>
                  <button class="cancel">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>


import $ from "jquery";

export default {
  name: "EditProduct",
  props: ['listCategory','select_product','getProducts'],
  data(){
    return{
      currentData:{},
      promoStartLightpick:{},
      promoEndLightpick:{},
      promoStart: {
        obj:{},
        formatted:'',
      },
      promoEnd: {
        obj:{},
        formatted:'',
      },
    }
  },
  computed:{
    isDiscount(){
      return this.currentData.promoPrice>0;
    },
  },
  methods:{
    editShowPrice(){
      if($('#edit-show-price').prop('checked')){
        $('.show-price').addClass('active')

      }
      else{
        $('.show-price').removeClass('active')
      }

    },
    selectDates(){
      let that=this;
      this.promoStartLightpick = new this.$lightpick({
        field: document.getElementById('promoStart_input'),
        onSelect: function(date){
          that.promoStart.obj = date;
          that.promoStart.formatted = date.format('DD.MM.YYYY');
        }
      });
      this.promoEndLightpick = new this.$lightpick({
        field: document.getElementById('promoEnd_input'),
        onSelect: function(date){
          that.promoEnd.obj = date;
          that.promoEnd.formatted = date.format('DD.MM.YYYY');
        }
      });
    },
    onSubmit(id){
      this.axios.put(this.url('updateProduct',id),{
        name: this.currentData.name,
        quantity:this.currentData.quantity,
        category:this.currentData.category,
        price:this.currentData.price,
        description:this.currentData.description,
        promoPrice: this.currentData.promoPrice,
        vendorCode: this.currentData.vendorCode,
        promoStart:this.promoStart.obj,
        promoEnd:this.promoEnd.obj,
      })
      .then(()=>{
        this.getProducts()
      })
      this.$informationAlert('Changes are saved')
      $('#edit-product').modal("hide")
    }
  },

  watch:{
    select_product(newCat){
      this.currentData = Object.assign({}, newCat);
      // this.promoStart.obj = this.currentData.promoStart;
      this.promoStartLightpick.setDate(this.currentData.promoStart);
      // this.promoEnd.obj = this.currentData.promoEnd;
      this.promoEndLightpick.setDate(this.currentData.promoEnd);
    }
  },
  mounted() {
    this.selectDates();
  }
}
</script>

<style scoped>

.modal.fade:not(.in).right .modal-dialog {
  -webkit-transform: translate3d(0,0,0);
  transform: translate3d(0, 0, 0);
}
.valid-label{
  margin-bottom: 22px !important;
}
.modal-header .close{
  margin: 0;
}
.show-price{
  display:none;
}
.show-price.active{
  display:block;
}
.product-calendar{
  margin-bottom: 40px;
}
.product-calendar label{
  color: #8C94A5;
}
.calendar{
  margin-bottom: 0;
}
.modal-form input{
  width: 100%;
  font-size: 16px;
}
.modal-form label{
  margin-right: 10px;
  margin-bottom: 8px;
}
.modal-img{
  margin-bottom: 60px;
}
.modal-img p{
  margin-bottom: 15px;
  color: #828282;
  font-size: 12px;
}


</style>