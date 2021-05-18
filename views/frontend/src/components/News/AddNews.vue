<template>
<div class="add-news">
  <div class="notification-header">
    <img class="mr-2" src="../../assets/icons/xBlack.svg"><h3>Add news</h3>
  </div>
  <div class="row">
    <div class="col-lg-5  parent">
      <h3 class="news-title mb-1">Cover Art <span>(Optional)</span></h3>
      <p class="news-description margin-bottom-20">You can upload JPG or PNG, the minimum resolution is<br> 540*405 px, the size is not more than 3 MB.</p>

      <button class="upload-photo margin-bottom-30">+ Upload photo</button><br>

      <label>Category</label>
      <div class="selects margin-bottom-30">
        <select class=" form-control long-form-control  form-control-lg" aria-label=".form-select-lg example">
          <option>1 month</option>
          <option>2 month</option>
          <option>3 month</option>
          <option>4 month</option>
          <option>5 month</option>
          <option>6 month</option>
          <option>12 month</option>
        </select>
      </div>

      <label class="mb-1"> PROMO Completion date</label>
      <p class="news-description margin-bottom-30">Set the end time for creating a special offer</p>

      <div class="d-flex">
        <div style="width:70%" class="calendar-period d-flex align-items-center mr-2"><input id="demo-1"><img src="../../assets/icons/Calendar.svg"></div>
        <input style="width:30%" class="cashback-input">
      </div>
    </div>
    <div class="col-lg-6">
        <label>Name</label>
        <input class="cashback-input margin-bottom-30" style="width:100%">
      <label>Description</label>
      <div id="editor"></div>
    </div>

    <div class="d-flex btns">
      <button class="save mr-2">Save</button>
      <button class="cancel">Cancel</button>
    </div>

  </div>
</div>
</template>

<script>

import Quill from 'quill/dist/quill';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css'
export default {
  name: "AddNews",
  mounted(){
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

    new Quill('#editor', {
      modules: { toolbar: toolbarOptions },
      theme: 'snow'
    });
  }

}
</script>

<style scoped>
#editor{
  height: 200px !important;

}
.parent{
  margin-bottom: 130px;
}
.save,.cancel{
  width: 120px;
}
.add-news{
  padding: 0 30px;
}
.news-title span{
  color:#b0b0b0;
}
.news-title{
  font-size: 14px;
  font-weight: normal;
}
.news-description{
  color:#858585;
  font-size: 14px;
}
.margin-bottom-10{
  margin-bottom: 10px;
}

.margin-bottom-20{
  margin-bottom: 20px;
}
.margin-bottom-30{
  margin-bottom: 30px;
}
.upload-photo{
  background: none;
  border: 1px solid #616CF5;
  border-radius: 5px;
  padding: 10px 25px;
  color:#616cf5;
}
.selects .form-control{
  background: #F8F9FB;
  border:1px solid #d3d3d3;
}
.selects:before{
  content:'';
  background: url("../../assets/icons/selectDown.svg") no-repeat;
  width:20px;
  height:20px;
  position: absolute;
  z-index:88;
  right: 20px;
  top:27%;
}
.selects{
  position: relative;
}
.calendar-period{
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  height:45px;
  padding:0 10px;
  width:100%
}
</style>