<template>
<div class="add-product">
  <div class="notification-header"><img @click="$router.push('/catalog')" class="mr-2" src="../../assets/icons/xBlack.svg"><h3>Add product</h3></div>
  <div class="container">
    <div class="row">
      <div class="col-lg-11 m-auto">
          <form>
            <div class="d-flex align-items-center">
              <div style="width:50%" class="mr-3">
                <label class="product-label">Name</label><br>
                <input  v-model="newProduct.name" style="width:100%" class="cashback-input">
              </div>

              <div class="quantity-category mr-3">
                <label class="product-label">Quantity</label><br>
                <input v-model="newProduct.quantity" class="cashback-input">
              </div>

              <div style="width:25%;">
                <label class="product-label">Select category</label><br>
                <select v-model="newProduct.category"  class="form-control mb-0 select-phone" aria-label="Default select example">
                  <option :value="cat._id" v-for="cat in listCategory" :key="cat._id">{{cat.name}}</option>
                </select>
              </div>
            </div>

            <a class="add-russian" href="/">+ Add in russian</a>


            <div id="editor">
            </div>


            <div class="d-flex mb-3">
              <label class="custom-checkbox mr-2"><input @click="showPrice" id="show-price" type="checkbox" ><span class="checkmark"></span></label>
              <span>Discount</span>
            </div>

            <div class="d-flex prices-number ">
              <div style=" width:33.33%; margin-right:15px;">
                <label>Price</label>
                <input v-model="newProduct.price" class="form-input cashback-input" placeholder="Price"  name="price">
              </div>

              <div class="show-price" style="width:33.33%; margin-right:15px;">
                <label>Promotional price</label>
                <input  class="form-input cashback-input" placeholder="Promotional price"  name="promo">
              </div>

              <div style="width:33.33%; ">
                <label>Article number</label>
                <input  class="form-input cashback-input" placeholder="Article number"  name="article">
              </div>
            </div>

            <label class="valid-label">Period of action</label>
            <div class=" product-calendar d-flex align-items-center" >
              <div class="d-flex align-items-center mr-2" style="width:50%">
                <label >From</label>
                <div class="calendar d-flex align-items-center">
                  <input id="to-period" class="calendar-input" >
                  <img src="../../assets/icons/Calendar.svg">
                </div>
              </div>

              <div class="d-flex align-items-center" style="width:50%">
                <label>to</label>
                <div class="calendar d-flex align-items-center">
                  <input id="from-period" class="calendar-input" >
                  <img src="../../assets/icons/Calendar.svg">
                </div>
              </div>
            </div>

            <div class="modal-img ">
              <label>Photos</label>

              <p class="cashback-description">
                You can upload 4 more JPG or PNG photos, the minimum resolution is 400*400px, the size is
                <br>not more than 3 MB. The first photo will be shown as the main one by default
              </p>

              <label for="imgArray">
                <img src="../../assets/img/modal-img.svg">
                <input class="d-none" multiple id="imgArray" type="file" name="imgArray">
              </label>
            </div>

            <div class="modal-btn d-flex">
              <button  class="save" @click.prevent="onSubmit">Save</button>
              <button class="cancel">Cancel</button>
            </div>


          </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Quill from 'quill/dist/quill';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css'
import $ from 'jquery';
export default {
  name: "AddProductPage",
  data(){
    return{
      newProduct:{
        name: '',
        price: '',
        quantity: '',
        category:'',
        img: '',
        description:''

      },
    }
  },
  methods:{
    showPrice(){
      if($('#show-price').prop('checked')){
        $('.show-price').addClass('active')
      }
      else{
        $('.show-price').removeClass('active')
      }

    },
    async getCategories(){
      await this.axios.get(this.url('getCategories'))
          .then((res)=>{
            this.listCategory = res.data.objects;
            this.listCategory.unshift({_id:'', name: 'All'})

          })
    },
    onSubmit(){
      let new_product = this.newProduct;
      const form  = new FormData;
      $.each($("#imgArray")[0].files, function(i, file) {
        form.append('imgArray'+i, file);
      });
      form.append('name', new_product.name)
      form.append('price', new_product.price)
      form.append('quantity', new_product.quantity)
      form.append('category', new_product.category)
      form.append('description', new_product.description)
      console.log(this.description)
      this.axios.post('http://localhost:8080/api/addProduct/', form)
          .then((response) => {
            console.log("success", response)
          }).catch((error) => {
        console.log("fail", error)
      })
      this.$router.push('/catalog')
      this.newProduct = {
        name: '',
        price:'',
        quantity:'',
        category: '',
        img:'',
        description: ''
      }
    },
    update() {
      this.$emit('input', this.description.getText() ? this.description.root.innerHTML : '');
    }
  },
  mounted() {
    this.getCategories()

    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['image'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ];
    let quill = new Quill('#editor', {
      modules: { toolbar: toolbarOptions },
      theme: 'snow',

    });
    this.description = quill.getText()

    new this.$lightpick({
      field: document.getElementById('to-period'),
      format:'YYYY-MM-DD',
      onSelect:(date)=>{
        this.to_purchase_date = date.format('YYYY-MM-DD')
      }
    });
    new this.$lightpick({
      field: document.getElementById('from-period'),
      format:'YYYY-MM-DD',
        onSelect:(date)=>{
        this.to_purchase_date = date.format('YYYY-MM-DD')
      }
    });
  },
}
</script>

<style scoped>
#editor{
  height: 259px;
  margin-bottom: 20px;
}
.prices-number{
  margin-bottom: 40px;
}
.product-calendar label{
  margin-bottom: 0;
  margin-right: 10px;
}
.valid-label{
  margin-bottom: 15px;
}

.show-price.active{
  display: block;
}
.add-product{
  padding: 0 30px;
  padding-bottom: 50px;
}
.product-label{
  margin-bottom: 8px;
}
.cashback-input{
  width: 100%;
}
.quantity-category{
  width: 25%;
}
.add-russian{
  display: inline-block;
  margin: 20px 0;
}
.calendar{
  margin-bottom: 0;
}
.cashback-description{
  font-size: 12px;
  margin-bottom: 20px;
}
.product-calendar{
  width: 66%;
  margin-bottom: 40px;
}
.modal-img{
  margin-bottom: 50px;
}

</style>