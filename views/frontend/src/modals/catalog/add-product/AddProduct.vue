<template>
  <div class="modal fade right "  id="add-products" tabindex="-1" role="dialog" aria-labelledby="add-products" aria-hidden="true">
      <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: calc(100% - 250px);" role="document" >
        <div id="modal-content" class="modal-content  myModal-content h-100">
          <div class="modal-header justify-content-start align-items-center">
            <img  data-dismiss="modal" aria-label="Close" class="close" src="../../../assets/icons/xBlack.svg" alt="">
            <h3 class="modal-title">Add Product</h3>
          </div>
          <div class="myModal-body">
                <div class="row">
                  <div class="col-11 m-auto">
                    <form id="myForm" @submit.prevent="onSubmit"  class="modal-form">
                      <div class="d-flex ">
                        <div style="width:50%" class="mr-3">
                          <label class="product-label">Name</label><br>
                          <input  v-model="newProduct.name" style="width:100%" :class="{errorInput: validateName === true}"  class="cashback-input">
                          <div class="fill-fields" v-if="validateName === true">Fill in the fields</div>
                        </div>

                        <div class="quantity-category mr-3">
                          <label class="product-label">Quantity</label><br>
                          <input v-model="newProduct.quantity" :class="{errorInput: validateQuantity === true}" type="number" min="1"  class="cashback-input">
                          <div class="fill-fields" v-if="validateQuantity === true">Fill in the fields</div>
                        </div>

                        <div style="width:25%;">
                          <label class="product-label">Select category</label><br>
                          <select v-model="newProduct.category" class="form-control mb-0 select-phone" aria-label="Default select example">
                            <option :value="cat._id" v-for="cat in listCategory.slice(1)"  :key="cat._id" >{{cat.name}}</option>
                          </select>
                        </div>
                      </div>

                      <a @click="showRussian" class="add-russian">+ Add in russian</a>
                      <input id="name_ru"  v-model="newProduct.name_ru" name="name_ru" style="width:50%; display: none"  class="cashback-input mb-4 "><br>
                      <label>Description</label>
                      <textarea class="general-area mb-3" style="height:160px" v-model="newProduct.description"  name="description"></textarea>

                      <div class="d-flex mb-3">
                        <label class="custom-checkbox"><input @click="showPrice" id="show-price" type="checkbox" ><span class="checkmark"></span></label>
                        <span>Discount</span>
                      </div>

                      <div class="d-flex mb-4 ">
                        <div style=" width:33.33%; margin-right:8px;">
                          <label>Price</label>
                          <input :class="{errorInput: validatePrice === true}"  v-model="newProduct.price"  type="number" class="form-input cashback-input"  name="price">
                          <div class="fill-fields" v-if="validatePrice===true">Fill in the fields</div>
                        </div>
                        <div class="show-price" style="width:33.33%; margin-right:8px;">
                          <label>Promotional prices</label>
                          <input v-model="newProduct.promoPrice" class="form-input cashback-input mb-4" placeholder="Price">
                        </div>
                        <div style="width:33.33%;">
                          <label>Vendor code</label>
                          <input   v-model="newProduct.vendorCode" class="form-input cashback-input mb-4"  placeholder="Vendor code"  name="vendorCode">
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
                            <input @change="onFileChange($event)" class="d-none" ref="uploadPhoto" accept="image/*" multiple id="imgArray" type="file" name="imgArray">
                          </label>
                          <div class="d-flex" v-if="newProduct.imgArray.length !==0">
                            <div  v-for="(img,index) in imagePreview" :key="index" class="selected-images">
                              <img id="choosed-img" :src="img" class="show-images mr-2" />
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
      validateName:false,
      validateQuantity:false,
      validatePrice:false,
      previewImage:[],
      newProduct:{
        name_ru:'',
        imgArray: [],
        name: '',
        price: '',
        quantity: '',
        category:'',
        img: '',
        description:'',
        vendorCode:'',
        promoStart: {
          obj:'',
          formatted:'',
        },
        promoEnd: {
          obj:'',
          formatted:'',
        },
        promoPrice:0

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
    showRussian(){
    $('#name_ru').toggle();
  },
    cancel(){
    $('#add-products').modal("hide");
    this.newProduct = {
      name: '',
      price:'',
      quantity:'',
      category: '',
      img:'',
      imgArray: []
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
      var valid = ["image/png", "image/jpg", "image/jpeg", "image/svg"];
      $.each($("#imgArray")[0].files, (i,file)=> {
        console.log(i)
      if(this.newProduct.imgArray.length<4){
         if(file && file.size > 3000000){
            this.$warningAlert('Image size exceeds 3 mb ')
         }
         else if(file && !valid.includes(file.type)){
            this.$warningAlert('Image type not png or jpg')
         }
        else{
           this.newProduct.imgArray.push(file)
         }
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





      if(new_product.promoStart.obj !== ""){
        form.append('promoStart', new_product.promoStart.obj)

      }
      if(new_product.promoEnd !== ""){
        form.append('promoEnd', new_product.promoEnd.obj)
      }
      if(new_product.name === ""){
        this.validateName = true
      }
      else{
        this.validateName = false
      }
      if(new_product.quantity === ""){
        this.validateQuantity = true
      }
      else{
        this.validateQuantity = false
      }
      if(new_product.price === ""){
        this.validatePrice = true
      }
      else{
        this.validatePrice = false
      }

      form.append('category', new_product.category)
      form.append('name', new_product.name)
      form.append('name_ru', new_product.name_ru)
      form.append('price', new_product.price)
      form.append('quantity', new_product.quantity)
      form.append('promoPrice', new_product.promoPrice)
      form.append('description', new_product.description)
      form.append('vendorCode', new_product.vendorCode)


      if(new_product.promoPrice > new_product.price){
        this.$warningAlert("Promotional price must be < original price")
      }
      else{
        this.axios.post(this.url('addProduct'), form)
            .then(() => {
              this.getProducts()
              this.$successAlert('Product has been added');
              $('#add-products').modal("hide")
              this.newProduct = {
                name: '',
                price:'',
                quantity:'',
                category: '',
                img:'',
                name_ru:'',
                imgArray: [],
                description:'',
                vendorCode:'',
                promoStart: {
                  obj:"",
                  formatted:'',
                },
                promoEnd: {
                  obj:"",
                  formatted:'',
                },
                promoPrice:0
              }
              this.validateQuantity = false;
              this.validateName = false;
              this.validatePrice = false;
            }).catch((error) => {
          console.log("fail", error)

        })
      }

      $('#add-products').on('shown', function () {
        $("#modal-content").scrollTop(0);
      });




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
        that.newProduct.promoStart.formatted = date.format('DD-MM-YYYY');
      }
    });
    new this.$lightpick({
      field: document.getElementById('promoEnd'),
      format:'',
      lang:'en',
      onSelect:(date)=>{
        that.newProduct.promoEnd.obj = date;
        that.newProduct.promoEnd.formatted = date.format('DD-MM-YYYY');
      }
    });
  }

}
</script>

<style scoped>
.selected-images:hover .remove-image{
  opacity: 1;
}
.show-images{
  object-fit: contain;
}
.remove-image{
  opacity:0;
  transition:.3s;
}
.cancel{
  cursor:pointer;
}
.fill-fields{
  color:#E94A4A;
  margin-top: 5px;

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
  cursor:pointer;
}
.add-russian:hover{
  color: #3B4DB3;
}
.cashback-input{
  font-size: 16px;
}
</style>