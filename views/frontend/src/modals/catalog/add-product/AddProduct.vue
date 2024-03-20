<template>
  <div class="modal fade right "  id="add-products" tabindex="-1" role="dialog" aria-labelledby="add-products" aria-hidden="true">
      <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: calc(100% - 250px);" role="document" >
        <div id="modal-content" class="modal-content  myModal-content h-100" >
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
                          <option value="">Without category</option>
                          <option :value="cat._id" v-for="cat in listCategory.slice(1)"  :key="cat._id" >{{cat.name}}</option>
                        </select>
                      </div>
                    </div>

                    <div class="d-flex " style="margin-top:20px">
                      <div style="width:35%" class="mr-3" v-if="productCustomFields.productCustomFields">
                        <label class="product-label">{{ this.productCustomFields?.productCustomField1.name || 'Custom field 1' }}</label><br>
                        <input  v-model="newProduct.productCustomField1.value" style="width:100%" class="cashback-input">
                      </div>
                      <!-- <div style="width:35%" class="mr-3" v-if="!productCustomFields.productCustomFields">
                        <label class="product-label">{{ this.productCustomFields?.productCustomField1 || 'Custom field 1' }}</label><br>
                        <input disabled v-model="newProduct.productCustomField1" style="width:100%" class="cashback-input">
                      </div> -->
                      <div style="width:35%" class="quantity-category mr-3" v-if="productCustomFields.productCustomFields">
                        <label class="product-label">{{ this.productCustomFields?.productCustomField2.name  || 'Custom field 2' }}</label><br>
                        <input v-model="newProduct.productCustomField2.value" class="cashback-input">
                      </div>
                      <!-- <div style="width:35%" class="quantity-category mr-3" v-if="!productCustomFields.productCustomFields">
                        <label class="product-label">{{ this.productCustomFields?.productCustomField2  || 'Custom field 2'}}</label><br>
                        <input disabled v-model="newProduct.productCustomField2" class="cashback-input">
                      </div> -->
                      <div style="width:30%;">
                        <label class="product-label">Select colors</label><br>


                        <div v-if="productCustomFields.productCustomColors.required" id="customSelect" class="custom-select" @blur="blurred">
                          <div class="selected" @click="openColorSelect">
                            Select Colors
                          </div>
                          <div class="items" :class="{ selectHide: !open }">
                            <div
                              v-for="(option, i) in productCustomFields.productCustomColors.values" 
                              :key="i" 
                              @click=" 
                                selectedColors.productCustomColors.values[i].selected = !selectedColors.productCustomColors.values[i].selected
                              "
                              class="item"
                            >
                            
                            <div :style="{background: option.value.hex}" class="colorBox"> </div>
                              <div class="name">
                                <label>{{ option.name }}</label>
                              </div>
                              <div class="checkBox">
                                <label class="custom-checkbox">
                                  <input type="checkbox" v-model="selectedColors.productCustomColors.values[i].selected">
                                  <span class="checkmark">
                                </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <a @click="showRussian" class="add-russian">+ Add in russian</a>
                    <input id="name_ru"  v-model="newProduct.name_ru" name="name_ru" style="width:50%; display: none"  class="cashback-input mb-4 "><br>
                    <label>Description</label>
                    <textarea class="general-area mb-3" style="height:160px" v-model="newProduct.description"  name="description"></textarea>



                    <div class="d-flex mb-3">
                      <label class="custom-checkbox">
                        <input v-model="newProduct.hasMultipleTypes"   type="checkbox">
                        <span class="checkmark"></span>
                      </label>
                      <span>Has Sizes</span>
                    </div>
                    <div v-if="newProduct.hasMultipleTypes">
                      <div class="d-flex" style="justify-content: space-between;gap: 5px;">
                        <div style="flex: 1 1 0px">Size</div>
                        <div style="flex: 1 1 0px">Quantity</div>
                        <div style="flex: 1 1 0px">Price</div>
                        <div style="flex: 1 1 0px">VendorCode</div>
                        <div style="width: 22px;"></div>
                      </div>
                      <div v-for="(size, index) in newProduct.sizes" :key="index" class="d-flex" style="justify-content: space-between;gap: 5px;">
                        <div style="flex: 1 1 0px">{{ size.size }}</div>
                        <div style="flex: 1 1 0px">{{ size.quantity }}</div>
                        <div style="flex: 1 1 0px">{{ size.price }} </div>
                        <div style="flex: 1 1 0px">{{ size.vendorCode }}</div>
                        <div>
                          <img @click="removeSize(index)" style="cursor: pointer;" src="../../../assets/icons/greyX.svg">
                        </div>
                      </div>

                      <div class="mt-1">
                        <div class="d-flex newSizeBlock">
                          <div>
                            <input placeholder="Size" v-model="sizeObject.size" type="text" class="form-input cashback-input"  name="size_size">
                          </div>
                          <div>
                            <input placeholder="Quantity" v-model="sizeObject.quantity" type="text" class="form-input cashback-input"  name="size_quantity">
                          </div>
                          <div>
                            <input placeholder="Price" v-model="sizeObject.price" type="text"  class="form-input cashback-input"  name="size_price">
                          </div>
                          <div>
                            <input placeholder="VendorCode" v-model="sizeObject.vendorCode" type="text"  class="form-input cashback-input"  name="size_vendorCode">
                          </div>
                        </div>
                        <div class="fill-fields" v-if="addSizeError.length>0">
                          {{ addSizeError }}
                        </div>
                        <span class="save" style="cursor: pointer;width: 120px;" @click="addNewSize">Add Size</span>

                      </div>
                    </div>

                    <div class="d-flex ">
                      <div style=" width:33.33%; margin-right:8px;">
                        <label>Price</label>
                        <input :class="{errorInput: validatePrice === true}"  v-model="newProduct.price"  type="number" class="form-input cashback-input"  name="price">
                        <div class="fill-fields" v-if="validatePrice===true">Fill in the fields</div>
                      </div>
                      <div style="width:33.33%;">
                        <label>Vendor code</label>
                        <input   v-model="newProduct.vendorCode" class="form-input cashback-input mb-4"  placeholder="Vendor code"  name="vendorCode">
                      </div>
                    </div>
                    <div class="d-flex mb-3">
                      <label class="custom-checkbox">
                        <input v-model="showPrice" @change="checkDiscount" id="show-price" type="checkbox" >
                        <span class="checkmark"></span></label>
                      <span>Discount</span>
                    </div>

                    <div class="d-flex mb-4 ">
                      <div  v-if="showPrice" style="width:33.33%; margin-right:8px;">
                        <label>Promotional price</label>
                        <input :class="{errorInput: validatePromoPrice === true}" v-model="newProduct.promoPrice" class="form-input cashback-input" placeholder="Price">
                        <div class="fill-fields" v-if="validatePromoPrice===true">Fill in the fields</div>
                      </div>
                    </div>
                    <label class="valid-label">Period of action</label>
                    <div class=" product-calendar d-flex">
                      <div class="mr-2">
                        <label >From</label>
                        <div :class="{errorInput: validateFrom=== true}" class="calendar d-flex align-items-center">
                          <input  autocomplete="off" name="promoStart" v-model="newProduct.promoStart.formatted" class="calendar-input" id="promoStart">
                          <img src="../../../assets/icons/Calendar.svg">
                        </div>
                        <div class="fill-fields" v-if="validateFrom===true">Fill in the fields</div>
                      </div>
                      <div>
                        <label>To</label>
                        <div :class="{errorInput: validateTo === true}" class="calendar d-flex align-items-center">
                          <input  autocomplete="off" name="promoEnd" v-model="newProduct.promoEnd.formatted"  class="calendar-input" id="promoEnd">
                          <img src="../../../assets/icons/Calendar.svg">
                        </div>
                        <div class="fill-fields" v-if="validateTo===true">Fill in the fields</div>
                      </div>
                    </div>
                    <div class="d-flex mb-3">
                      <label class="custom-checkbox"><input v-model="newProduct.recommend"  type="checkbox" ><span class="checkmark"></span></label>
                      <span>Recommended</span>
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
/* eslint-disable */

import $ from "jquery";

export default {
name: "AddProduct",
props:['listCategory', 'getProducts', 'productCustomFields'],
  data(){
    return{
      open: false,
      addSizeError:"",
      sizeObject:{
        size:"",
        quantity:"",
        price:"",
        vendorCode:"",
      },
      today:this.$moment().format("YYYY-MM-DD"),
      validateFrom: false,
      validateTo: false,
      validateName:false,
      validateQuantity:false,
      validatePrice:false,
      validatePromoPrice:false,
      previewImage:[],
      showPrice:false,
      newProduct:{
        hasMultipleTypes:false,
        sizes:[],
        recommend:false,
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
        promoPrice:0,
        productCustomField1: { name: 'Custom field 1', value: ''},
        productCustomField2: { name:'Custom field 2', value: '' },
        productCustomColors: [],
      },
      customFields: {
        productCustomField1: '',
        productCustomField2: '',
        productCustomFields: false,
        productCustomColors:{
          required: false,
          values: [],
        },
      },

      selectedColors: this.productCustomFields,
    };
  },
  computed:{
  imagePreview(){
   return this.newProduct.imgArray.map((item)=>{
     return URL.createObjectURL(item)
   })
  },
  // setSelectedColors() {
  //     return this.productCustomFields.productCustomColors.values.map(field => {
  //       this.selectedColors.push({
  //         name: field.name,
  //         color: field.color,
  //         selected: false
  //       })
  //     });

  //   },
  },
  methods:{
    resetColors() {
      this.productCustomFields.productCustomColors.values.map(field => {
        this.selectedColors.push({
          name: field.name,
          color: field.color,
          selected: false
        })
      });
    },

    blurred() {
      this.open = false;
      console.log('blur')
    },
    openColorSelect() {
      console.log('clicked');
      this.open = !this.open;
    },
    fetchSettings(){
      this.axios.get(this.url('getSettings'))
        .then((response) => {
          if(response.data.productCustomFields) {
            this.productCustomField1 = response.data.productCustomField1
            this.productCustomField2 = response.data.productCustomField2
          }
          if(response.data.productCustomColors.required) {
            this.productCustomColors = response.data.productCustomColors
          }
        }).catch(function (error){
          if (error.response) {
            console.log('setCatalog_settings EERRRor',error.response)
          }
        })
    },
    isNumeric(str) {
      if (typeof str != "string") return false // we only process strings!
      return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    },
    removeSize(index){
      this.newProduct.sizes.splice(index,1);
    },
    addNewSize(){
      if(this.sizeObject.size.length<1){
        this.addSizeError = "Fill in size name";
        return;
      }

      if(this.sizeObject.quantity.length<1 || !this.isNumeric(this.sizeObject.quantity)){
        this.addSizeError = "Fill in size quantity with a numeral";
        return;
      }

      if(this.sizeObject.price.length<1 || !this.isNumeric(this.sizeObject.price)){
        this.addSizeError = "Fill in size price with a numeral";
        return;
      }

      this.newProduct.sizes.push({ ...this.sizeObject });

      for (const property in this.sizeObject) {
        this.sizeObject[property] = "";
      }
      this.addSizeError = "";
    },
    showRussian(){
      $('#name_ru').toggle();
    },
    cancel(){
      $('#add-products').modal("hide");
      this.newProduct = {
        hasMultipleTypes: false,
        sizes: [],
        name: '',
        price:'',
        quantity:'',
        category: '',
        img:'',
        imgArray: [],

      }
    },
    removeImage(idx){
    this.newProduct.imgArray = this.newProduct.imgArray.filter((item,index)=>{
      console.log(item);
      return index !== idx
    })
      console.log(this.newProduct.imgArray)
  },
    checkDiscount(){
      if(this.showPrice===false){
        this.newProduct.promoStart = {
              obj:'',
              formatted:'',
        }
        this.newProduct.promoEnd={
             obj:'',
              formatted:'',
        }
        this.newProduct.promoPrice = 0
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

      if(parseInt(new_product.promoPrice) > parseInt(new_product.price)){
        this.$warningAlert('Promotional price must be less than original price')
        return;
      }

      if(this.showPrice === true){
        if(new_product.promoPrice === 0){
          this.validatePromoPrice = true;
        }
        else{
          this.validatePromoPrice = false
        }
        if(new_product.promoStart.obj === ''){
          this.validateFrom = true;

        }
        else{
          this.validateFrom  = false
        }

        if(new_product.promoEnd.obj === ''){
          this.validateTo = true;
          return;
        }
        else{
          this.validateTo  = false
        }

      }
      else{
        this.validateFrom = false;
        this.validateTo = false;
        this.validatePromoPrice = false;
      }

      if((new Date(new_product.promoEnd.formatted).getTime() < new Date(this.today).getTime())){
        this.$warningAlert('End date must greater than todays date')
        return;
      }

      if(new_product.hasMultipleTypes && new_product.sizes.length<0){
        this.$warningAlert('Sizes list is empty')
        return;
      }
      const colors = [];
      if (this.selectedColors.productCustomColors.required) {
        this.selectedColors.productCustomColors.values.forEach(color => {
          if(color.selected) {
            colors.push({
              name: color.name,
              value: color.value
            }
          );
          }
          
        })
      }
      form.append('promoStart', new_product.promoStart.obj)
      form.append('promoEnd', new_product.promoEnd.obj)
      form.append('category', new_product.category)
      form.append('name', new_product.name)
      form.append('name_ru', new_product.name_ru)
      form.append('price', new_product.price)
      form.append('quantity', new_product.quantity)
      form.append('promoPrice', new_product.promoPrice)
      form.append('description', new_product.description)
      form.append('vendorCode', new_product.vendorCode)
      form.append('recommend',new_product.recommend)
      form.append('sizes',JSON.stringify(new_product.sizes))
      form.append('hasMultipleTypes',new_product.hasMultipleTypes)
      form.append('productCustomField1',new_product.productCustomField1)
      form.append('productCustomField2',new_product.productCustomField2)
      form.append('productCustomColors', JSON.stringify(colors))
      this.axios.post(this.url('addProduct'), form)
            .then(() => {
              this.getProducts()
              this.$successAlert('Product has been added');
              $('#add-products').modal("hide")
              this.newProduct = {
                hasMultipleTypes: false,
                sizes: [],
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
                promoPrice:0,
                recommend:false
              }
              this.validateQuantity = false;
              this.validateName = false;
              this.validatePrice = false;
              this.validateFrom = false;
              this.validateTo = false;
              this.showPrice = false;
              this.selectedColors.productCustomColors.values.forEach((field, i) => {
              this.selectedColors.productCustomColors.values[i].selected = false;
              });
            }).catch((error) => {
          console.log("fail", error)

        })

      $('#add-products').on('shown', function () {
        $("#modal-content").scrollTop(0);
      });
    },

  },
  mounted(){
    window.addEventListener( 'click', ( e ) => {
      if (!document.getElementById( 'customSelect' )?.contains( e.target )) {
        // showDropdown.value = !showD ropdown.value
        this.open = false;
      }
    } );
    let that = this;
    new this.$lightpick({
      field: document.getElementById('promoStart'),
      format:'',
      lang:'en',
      onSelect:(date)=>{
        // that.promoStart = date.format().toString().slice(0,16)
        that.newProduct.promoStart.obj = date;
        that.newProduct.promoStart.formatted = date.format('YYYY-MM-DD');
      }
    });

    new this.$lightpick({
      field: document.getElementById('promoEnd'),
      format:'',
      lang:'en',
      onSelect:(date)=>{
        that.newProduct.promoEnd.obj = date;
        that.newProduct.promoEnd.formatted = date.format('YYYY-MM-DD');
      }
    });
  }

}
</script>

<style scoped>
.items.closed {
  display: none;
}
.custom-select .selected.open {
  border: 1px solid #ad8225;
  border-radius: 6px 6px 0px 0px;
}

.custom-select .items .name {
  color: #000;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  height: 49px;
  padding-top: 14px;
}
.custom-select .items .name label {
  overflow: hidden;
  text-overflow: ellipsis; 
  max-width: 70px;
  white-space: nowrap;
}
.custom-select .items .item {
  display: flex; 
  align-items: center;
  padding: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  border-bottom: 1px solid #D3D3D3;
  
}
.custom-select .items .colorBox{
  min-width: 30px; 
  height: 30px;
  border-radius: 5px;
}
.custom-select .items .checkBox{
  margin-left: auto;
  margin-top: 5px;
  margin-right: -20px;
}

.custom-select .items {
  width: 100%;
  font-size: 16px;
  color: #767676;
  margin-top: 10px;
  overflow-y: scroll;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  background-color: white;  
  max-height: 250px;





  
  

}
.selected {}
.custom-select {
  font-size: 16px;
  color: #767676;
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 45px;
  padding-top: 10px;
}
.selectHide {
  display: none;
}
.newSizeBlock{
  gap: 5px;
  margin-bottom: 5px;
}
.newSizeBlock div{
  flex:1 0 0;

}
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

.product-calendar{
  margin-bottom: 40px;

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