<template>
  <div class="modal fade right "  id="add-products" tabindex="-1" role="dialog" aria-labelledby="add-products" aria-hidden="true">
      <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: calc(100% - 250px);" role="document" >
        <div class="modal-content myModal-content h-100">
          <div class="modal-header justify-content-start align-items-center">
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../../assets/icons/xBlack.svg" alt="">
              </span>
            </button>
            <h3 class="modal-title">Add Product</h3>
          </div>
          <div class=" myModal-body">
                <div class="row">
                  <div class="col-11 m-auto">
                    <form @submit.prevent="onSubmit"  class="modal-form">
                      <div class="d-flex align-items-center">
                        <div style="width:50%" class="mr-3">
                          <label class="product-label">Name</label><i class="fas fa-asterisk"></i><br>
                          <input  v-model="newProduct.name" style="width:100%" required class="cashback-input">
                        </div>

                        <div class="quantity-category mr-3">
                          <label class="product-label">Quantity</label><i class="fas fa-asterisk"></i><br>
                          <input v-model="newProduct.quantity" required type="number"  class="cashback-input">
                        </div>

                        <div style="width:25%;">
                          <label class="product-label">Select category</label><i class="fas fa-asterisk"></i><br>
                          <select v-model="newProduct.category" required class="form-control mb-0 select-phone" aria-label="Default select example">
                            <option :value="cat._id" v-for="cat in listCategory" :key="cat._id">{{cat.name}}</option>
                          </select>
                        </div>
                      </div>

                      <a class="add-russian" href="/">+ Add in russian</a>
                      <label>Description</label>
                      <textarea class="general-area mb-3" style="height:160px" v-model="newProduct.description"  name="description"></textarea>

                      <div class="d-flex mb-3">
                        <label class="custom-checkbox"><input @click="showPrice" id="show-price" type="checkbox" ><span class="checkmark"></span></label>
                        <span>Discount</span>
                      </div>

                      <div class="d-flex ">
                        <div style=" width:33.33%; margin-right:8px;">
                          <label>Price</label><i class="fas fa-asterisk"></i>
                          <input required   v-model="newProduct.price"  type="number" class="form-input cashback-input mb-4" placeholder="Price"  name="price">
                        </div>
                        <div class="show-price" style="width:33.33%; margin-right:8px;">
                          <label>Promotional prices</label>
                          <input v-model="newProduct.promoPrice" class="form-input cashback-input mb-4" placeholder="Price">
                        </div>
                        <div style="width:33.33%;">
                          <label>Vendor code</label><i class="fas fa-asterisk"></i>
                          <input   v-model="newProduct.vendorCode" class="form-input cashback-input mb-4" required placeholder="Vendor code"  name="vendorCode">
                        </div>
                      </div>

                      <label class="valid-label">Period of action</label>
                      <div class=" product-calendar d-flex align-items-center ">
                        <div class="d-flex align-items-center mr-2">
                          <label >From</label>
                          <div class="calendar d-flex align-items-center">
                            <input  name="promoStart" v-model="newProduct.promoStart.formatted" class="calendar-input" id="promoStart">
                            <img src="../../../assets/icons/Calendar.svg">
                          </div>
                        </div>

                        <div class="d-flex align-items-center">
                          <label>to</label>
                          <div class="calendar d-flex align-items-center">
                            <input   name="promoEnd" v-model="newProduct.promoEnd.formatted"  class="calendar-input" id="promoEnd">
                            <img src="../../../assets/icons/Calendar.svg">
                          </div>
                        </div>

                      </div>


                      <div class="modal-img ">
                          <label> Photos</label>
                        <p>
                            You can upload 4 more JPG or PNG photos, the minimum resolution is 400*400px, the size is<br> not more than 3 MB. The first photo will be shown as the main one by default
                          </p>

                        <div class="d-flex">
                          <label>
                            <img src="../../../assets/img/modal-img.svg ">
                            <input @change="onFileChange" class="d-none" multiple id="imgArray" type="file" name="imgArray">
                          </label>
                          <div class="d-flex" v-if="newProduct.imgArray.length !==0">
                            <div  v-for="(img,index) in imagePreview" :key="index" class="selected-images">
                              <img id="choosed-img"  :src="img" class="show-images mr-2" />
                              <div class="selected-overlay">
                                <img @click="removeImage(index)" class="remove-image" src="../../../assets/icons/deleteClient.svg">
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                      <div class="modal-btn d-flex">
                        <button  type="submit" class="save">Save</button>
                        <div class="cancel" @click="cancel">Cancel</div>
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
name: "AddProduct",
props:['listCategory', 'getProducts'],
  data(){
    return{
      boolean:true,

      previewImage:[],
      newProduct:{
        imgArray: [],
        name: '',
        price: '',
        quantity: '',
        category:'',
        img: '',
        description:'',
        vendorCode:'',
        promoStart: {
          obj:{},
          formatted:'',
        },
        promoEnd: {
          obj:{},
          formatted:'',
        },
        promoPrice:''

      },
    };
  },
  computed:{
  imagePreview(){
   return this.newProduct.imgArray.map((item)=>{
     return URL.createObjectURL(item)
   })
  }
  },
  methods:{
  cancel(){
    $('#add-products').modal("hide");
    this.newProduct = {
      name: '',
      price:'',
      quantity:'',
      category: '',
      img:''
    }
  },
    removeImage(idx){
    this.newProduct.imgArray = this.newProduct.imgArray.filter((item,index)=>{
      console.log(item);
      return index !== idx
    })
      console.log(this.newProduct.imgArray)
  },
    showPrice(){
      if($('#show-price').prop('checked')){
        $('.show-price').addClass('active')
      }
      else{
        $('.show-price').removeClass('active')
      }
    },
    onFileChange() {
      $.each($("#imgArray")[0].files, (i,file)=> {
        console.log(i)
      if(this.newProduct.imgArray.length<4){
         this.newProduct.imgArray.push(file)
      }
      else{
         this.$warningAlert("Maximum amount of images is 4")
        }
      })
    },
    onSubmit(){
      let new_product = this.newProduct;
      const form  = new FormData;
      for(let item in new_product.imgArray){
          if(item<1){
           form.append('img', new_product.imgArray[item])
          }
         else{
           form.append('imgArray'+(item-1),new_product.imgArray[item])
          }
        }

      form.append('name', new_product.name)
      form.append('price', new_product.price)
      form.append('quantity', new_product.quantity)
      form.append('category', new_product.category)
      form.append('description', new_product.description)
      form.append('promoStart', new_product.promoStart.obj)
      form.append('promoPrice', new_product.promoPrice)
      form.append('promoEnd', new_product.promoEnd.obj)
      form.append('vendorCode', new_product.vendorCode)
      this.axios.post(this.url('addProduct'), form)
          .then(() => {
            this.getProducts()
            this.$successAlert('Product has been added')
          }).catch((error) => {
            console.log("fail", error)
          })

     $('#add-products').modal("hide")
    this.show_images = []
    this.previewImage= []
      this.newProduct = {
        name: '',
        price:'',
        quantity:'',
        category: '',
        img:''
      }
    },

  },
  mounted(){
    let that = this;
    new this.$lightpick({
      field: document.getElementById('promoStart'),
      format:'',
      lang:'en',
      onSelect:(date)=>{
        // that.promoStart = date.format().toString().slice(0,16)
        that.newProduct.promoStart.obj = date;
        that.newProduct.promoStart.formatted = date.format('DD.MM.YYYY');
      }
    });
    new this.$lightpick({
      field: document.getElementById('promoEnd'),
      format:'',
      lang:'en',
      onSelect:(date)=>{
        that.newProduct.promoEnd.obj = date;
        that.newProduct.promoEnd.formatted = date.format('DD.MM.YYYY');
      }
    });
  }

}
</script>

<style scoped>
.selected-images:hover .remove-image{
  opacity: 1;
}

.remove-image{
  opacity:0;
  transition:.3s;
}
.cancel{
  cursor:pointer;
}
.fa-asterisk{
  font-size: 8px;
  margin-bottom: 2px;
  color:red;
}

.modal.fade:not(.in).right .modal-dialog {
  -webkit-transform: translate3d(0,0,0);
  transform: translate3d(0, 0, 0);
}
.valid-label{
  margin-bottom: 22px !important;
}

.show-price{
  display:none;
}
.show-price.active{
  display: block;
}
.product-calendar{
  margin-bottom: 40px;
}
.product-calendar label{
  color: #8C94A5;
}
.calendar{
  margin-bottom: 0;
  padding: 0 10px;
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
.add-russian{
  display: block;
  margin: 20px 0;
  color:#616cf5;
}
.cashback-input{
  font-size: 16px;
}
</style>