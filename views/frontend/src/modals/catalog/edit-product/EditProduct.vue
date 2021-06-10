<template>
  <div class="modal fade right "  id="edit-product" tabindex="-1" role="dialog" aria-labelledby="edit-product" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: 82%;" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header justify-content-start align-items-center">
          <button type="button" data-dismiss="modal" aria-label="Close" class="close mr-2">
              <span aria-hidden="true">
                <img src="../../../assets/icons/xBlack.svg" alt="">
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
                    <input name="name"  v-model="currentData.name" style="width:100%" class="cashback-input">
                  </div>

                  <div class="quantity-category mr-3">
                    <label class="product-label">Quantity</label><br>
                    <input name="quantity"  v-model="currentData.quantity" class="cashback-input">
                  </div>

                  <div style="width:25%;">
                    <label class="product-label">Select category</label><br>

                    <select name="category" v-model="currentData.category"  class="form-control mb-0 select-phone" >
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
                    <input name="price" v-model="currentData.price" class="form-input cashback-input mb-4" placeholder="Price"  >
                  </div>
                  <div :class="{active:isDiscount}" class="show-price" style="width:33.33%; margin-right:8px;">
                    <label>Promotional prices</label>
                    <input name="promoPrice" v-model="currentData.promoPrice" class="form-input cashback-input mb-4" placeholder="Price">
                  </div>
                  <div style="width:33.33%;">
                    <label>Vendor Code</label>
                    <input name="vendorCode" v-model="currentData.vendorCode"  class="form-input cashback-input mb-4" placeholder="Vendor code"  >
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

              <div class="d-flex">
                <label >
                  <img src="../../../assets/img/modal-img.svg">
                  <input @change="onFileChange($event)" ref="addImage" class="d-none" multiple id="imgsArray" type="file" name="imgArray">
                </label>
                <div  class="d-flex">
                  <img v-if="currentData.img !== ''" :src="imgSrc+'/'+currentData.img" class="show-images mr-2">
                    <div v-if="currentData.img !== ''" class="selected-overlay">
                      <img  @click="currentData.img = ''" class="remove-images" src="../../../assets/icons/deleteClient.svg">
                    </div>
                   <div v-for="(img, index) in imagePreview" :key="index" >
                      <div v-if="img !== ''" class="selected-images">
                        <img v-if="img.startsWith('images')" :src="imgSrc+'/'+img" class="show-images mr-2" />
                        <img v-else   :src="img" class="show-images mr-2" />
                        <div class="selected-overlay">
                          <img @click="removeImage(index)" class="remove-image"  src="../../../assets/icons/deleteClient.svg">
                        </div>
                      </div>
                    </div>
                </div>
              </div>
                </div>
                <div class="modal-btn d-flex">
                  <button @click.prevent="onSubmit" class="save">Save</button>
                  <button class="cancel" @click.prevent="close">Cancel</button>
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
      currentData:{
        img:'',
        imgArray:[]
      },
      imgSrc:'',
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
    imagePreview(){
    return  this.currentData.imgArray.map((item)=>{
            if(typeof item == 'object'){
              return URL.createObjectURL(item)
            }
            return item;
          })
        },
    isDiscount(){
      return this.currentData.promoPrice>0;
    },
  },
  methods:{
    removeImage(idx){
     this.currentData.imgArray.forEach((item,index)=>{
       if(index === idx){
         this.currentData.imgArray[index] = ""
       }
     })
      console.log(this.currentData.imgArray)
    },
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
    onFileChange() {
      $.each($("#imgsArray")[0].files, (i,file)=> {
        console.log(i)
        for (let j = 0; j <=this.currentData.imgArray.length; j++) {
          if(this.currentData.imgArray[j] === ""){
            this.currentData.imgArray[j] = file;
            break;
          }
          if(this.currentData.imgArray.length<3){
            this.currentData.imgArray.push(file)
            break;
          }

        }

      });
      console.log(this.currentData.imgArray, 'bektemir')
    },
    onSubmit(){
      const updatedProduct = this.currentData;
      const form = new FormData();

      for(let item in updatedProduct.imgArray){
        form.append('imgArray'+item, updatedProduct.imgArray[item])
        console.log("imgArray"+item, updatedProduct.imgArray[item])
      }

      form.append("name", updatedProduct.name)
      form.append("quantity", updatedProduct.quantity)
      form.append("category", updatedProduct.category)
      form.append("price", updatedProduct.price)
      form.append("description", updatedProduct.description)
      form.append("promoPrice", updatedProduct.promoPrice)
      form.append("vendorCode", updatedProduct.vendorCode)
      form.append("promoStart", this.promoStart.obj)
      form.append("promoEnd", this.promoEnd.obj)

      this.axios.put(this.url('updateProduct',updatedProduct._id),form)
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
    this.imgSrc = this.$server;
  }
}
</script>

<style scoped>
.selected-images:hover .remove-image{
  opacity: 1;
}

.remove-image{
  opacity:1;
  transition:.3s;
}
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