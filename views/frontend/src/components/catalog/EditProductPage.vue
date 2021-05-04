<template>
  <div class="add-product">
    <div class="notification-header"><img @click="$router.push('/catalog')" class="mr-2" src="../../assets/icons/xBlack.svg"><h3>Edit product</h3></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-11 m-auto">
          <form>
            <div class="d-flex align-items-center">
              <div style="width:50%" class="mr-3">
                <label class="product-label">Name</label><br>
                <input  style="width:100%" class="cashback-input">
              </div>

              <div class="quantity-category mr-3">
                <label class="product-label">Quantity</label><br>
                <input class="cashback-input">
              </div>

              <div style="width:25%;">
                <label class="product-label">Select category</label><br>
                <select  class="form-control mb-0 select-phone" aria-label="Default select example">
                  <option>+996</option>
                  <option>+792</option>
                  <option>+996</option>
                  <option>+792</option>
                  <option>+996</option>
                  <option>+792</option>
                  <option>+996</option>
                  <option>+792</option>
                  <option>+996</option>
                  <option>+792</option>
                </select>
              </div>
            </div>

            <div style="width:48.5%" class="mr-5 name-russian">
              <label class="product-label">Name in russian</label><br>
              <input  style="width:100%" class="cashback-input">
            </div>


            <label>Description</label>
            <div id="editor-english"></div>

            <label>Description in russian</label>
            <div id="editor-russian"></div>

            <div class="d-flex mb-3">
              <label class="custom-checkbox mr-2"><input @click="showPrice" id="show-price" type="checkbox" ><span class="checkmark"></span></label>
              <span>Discount</span>
            </div>

            <div class="d-flex prices-number ">
              <div style=" width:33.33%; margin-right:15px;">
                <label>Price</label>
                <input class="form-input cashback-input" placeholder="Price"  name="price">
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
                  <input class="calendar-input" id="from-purchase">
                  <img src="../../assets/icons/Calendar.svg">
                </div>
              </div>

              <div class="d-flex align-items-center" style="width:50%">
                <label>to</label>
                <div class="calendar d-flex align-items-center">
                  <input class="calendar-input" id="to-purchase">
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
              <button  class="save">Save</button>
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
  name: "EditProductPage",
  methods:{
    showPrice(){
      if($('#show-price').prop('checked')){
        $('.show-price').addClass('active')
      }
      else{
        $('.show-price').removeClass('active')
      }

    }
  },
  mounted() {
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

    new Quill('#editor-english', {
      modules: { toolbar: toolbarOptions },
      theme: 'snow'
    });

    new Quill('#editor-russian', {
      modules: { toolbar: toolbarOptions },
      theme: 'snow'
    });
  }
}
</script>

<style scoped>
#editor-english, #editor-russian{
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
.show-price{
  display:none;
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
.name-russian{
  margin: 23px 0;
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