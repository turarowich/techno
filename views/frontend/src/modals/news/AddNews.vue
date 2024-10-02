<template>
  <div class="modal fade right "  id="add-news" tabindex="-1" role="dialog" aria-labelledby="add-news" aria-hidden="true">
      <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: calc(100% - 250px);" role="document" >
        <div class="modal-content myModal-content h-100">
          <div class="modal-header justify-content-start align-items-center">
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/xBlack.svg" alt="">
              </span>
            </button>
            <h3 class="modal-title">Добавить новость</h3>
          </div>
          <div class=" myModal-body">
            <div class="row">
                <div class="col-lg-5  ">
                    <h3 class="news-title mb-1">Обложка <span>(Optional)</span></h3>
                    <p class="news-description margin-bottom-20">
                      Вы можете загрузить JPG или PNG, минимальное разрешение<br> 540*405 пикселей, размер не более 3 МБ.</p>
                    <button class="upload-photo margin-bottom-30" @click="selectPhoto">+ Загрузить фото</button><br>        
                    <input class="d-none" type="file" name="" ref="uploadPhoto" @change="uploadPhoto($event)" accept="image/*">
                    <div class="image-preview position-relative" v-if="news.img">
                        <img  :src="imagePreview" alt="" class="img-new w-100 d-block" accept="image/png, image/jpeg">
                        <button class="deleteImage" @click="clearInput">
                            <img src="../../assets/icons/deleteClient.svg">
                        </button>
                    </div>
                    
                </div>
                <div class="col-lg-6 parent">
                    <label>Название</label>
                    <input v-model="news.name" class="cashback-input margin-bottom-30" style="width:100%">
                    <label>Описангие</label>
                    <textarea v-model="news.desc"  name="" id="" cols="30" rows="10" class="form-control"></textarea>    
                    <div class="d-flex btns mt-3">
                        <button class="save mr-2" @click="onSubmit">Сохранить</button>
                        <button data-dismiss="modal" aria-label="Close" class="cancel">Отментить</button>
                    </div>
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
name: "AddNews",
  data(){
    return{
        news:{
            name: '',
            desc: '',
            category:false,
            img: '',
        }
    };
  },
  computed:{
        imagePreview() {
            if(this.news.img){
                return URL.createObjectURL(this.news.img)      
            }
            return null
        }
  },
  methods:{
    selectPhoto(){
        this.$refs.uploadPhoto.click();
    },
    showPrice(){
      if($('#show-price').prop('checked')){
        $('.show-price').addClass('active')
      }
      else{
        $('.show-price').removeClass('active')
      }

    },
    uploadPhoto(event) {
        var valid = ["image/png", "image/jpg", "image/jpeg"];
        if(event.target.files[0] && event.target.files[0].size > 3000000){
            this.$warningAlert('Image size exceed 3 mb');
        }else if(event.target.files[0] && !valid.includes(event.target.files[0].type)){
            this.$warningAlert('Image type can be jpg or png');
        }else{
            this.news.img = event.target.files[0]
        }
        this.$refs.uploadPhoto.value = ""
    },
    clearInput(){
        console.log("here")
        this.$refs.uploadPhoto.value = ""
        this.news.img = ""
    },
    onSubmit(){
        let news = this.news;
        const form  = new FormData;
        if (news.img){
            form.append('img', news.img)
        }

        form.append('category',news.category)
        form.append('name', news.name)
        form.append('desc', news.desc)


        this.axios.post(this.url('addNews'), form)
            .then(() => {
                setTimeout(()=>{ 
                    this.$emit('getNews')
                    $('#add-news').modal("hide")
                    this.news = {
                        name: '',
                        desc: '',
                        category:false,
                        img: '',
                    }
                 }, 500);
                this.$successAlert('News has been added')
            }).catch((error)=>{
                if(error.response && error.response.data){
                    this.$warningAlert(error.response.data.msg)
                }
            });
            
        },

  },
  mounted(){
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
.image-preview .img-new{
  height: 192px;
  object-fit: cover;
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
.deleteImage img{
    opacity: 0;
    transition: 0.3s ease-in;
}
.deleteImage:hover img{
    opacity: 1;
    transition: 0.3s ease-out;
}
.deleteImage{
    width: 100%;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: none;
    border: none;
}
</style>