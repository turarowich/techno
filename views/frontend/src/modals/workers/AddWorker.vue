<template>
  <div class="modal fade right" id="add-worker" tabindex="-1" role="dialog" aria-labelledby="add-worker"
    aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" 
 role="document">
      <div class="modal-content myModal-content h-100">
        <div class="modal-header align-items-center">
          <h3 class="modal-title">Добавить работника</h3>
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
          </button>
        </div>
        <div class="myModal-body add-worker">
          <div class="client-profile-img">
            <img class="img" v-if="typeof worker.avatar === 'string'" :src="imgSrc + '/' + worker.avatar">
            <img class="img" v-else-if="typeof worker.avatar === 'object'" :src="imagePreview">
            <img class="img" v-else src="@/assets/icons/chat.svg">
            <input @change="uploadPhoto($event)" type="file" class="d-none" id="add-user-img">
            <label for="add-user-img"><img class="add-profile-img" src="@/assets/icons/addBtn.svg"></label>
          </div>
          <label>Имя</label>
          <input v-model="worker.name" class="cashback-input"> 
          <label>Email</label>
          <input v-model="worker.email" class="cashback-input margin-b"> 
          <label>Номер телефона</label> 
          <input v-model="worker.phone" class="cashback-input" >
          <label>Роль</label> 
          <select v-model="worker.role" class="form-control long-form-control form-control-lg" >
            <option value="sewing">Шить</option>
            <option value="kroy">Крой</option>
            <option value="overlok">Оверлок</option>
            <option value="rasposhivalka">Распошивалка</option>
            <option value="iron">Утюжка</option>
            <option value="buttons">Пуговицы</option>
            <option value="otk">ОТК</option>
            <option value="package">Упаковка</option>
            <option value="technolog">Технолог</option>
          </select>
          <label>Коментарий</label> 
          <textarea v-model="worker.comment" name="" id="" cols="30" rows="10" class="form-control"></textarea>
          <div class="d-flex btns">
            <button class="save mr-2" @click="onSubmit">Добавить</button>
            <button data-dismiss="modal" aria-label="Close" class="cancel">Отмена</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import $ from "jquery";
export default {
  name: "AddWorker",
  data() {
    return {
      worker: {
        name: '',
        email: '',
        phone: '',
        role: '',
        comment: '',
        img: ''
      },
      imgSrc: ''
    };
  },
  computed: {
    imagePreview() {
      if (this.worker.img) {
        return URL.createObjectURL(this.worker.img)
      }
      return null
    }
  },
  methods: {
    uploadPhoto(event) {
      var valid = ["image/png", "image/jpg", "image/jpeg"];
      if (event.target.files[0] && event.target.files[0].size > 3000000) {
        this.$warningAlert('Image size exceed 3 mb');
      } else if (event.target.files[0] && !valid.includes(event.target.files[0].type)) {
        this.$warningAlert('Image type can be jpg or png');
      } else {
        this.worker.img = event.target.files[0]
      }
      // this.$refs.uploadPhoto.value = ""
    },
    onSubmit() {
      let worker = this.worker;
      const form = new FormData;
      
      if (!worker.role) {
          this.$warningAlert('Выберите роль!')
          return;
      }
      if (!worker.name) {
          this.$warningAlert('Напишите имя!')
          return;
      }
      if (!worker.email) {
          this.$warningAlert('Напишите Email!')
          return;
      }
      if (!worker.phone) {
          this.$warningAlert('Напишите номер телефоа!')
          return;
      }

      form.append('name', worker.name)
      form.append('comment', worker.comment)
      form.append('email', worker.email)
      form.append('phone', worker.phone)
      form.append('role', worker.role)
      form.append('avatar', worker.img)

      this.axios.post(this.url('addWorker'), form)
        .then(() => {
          setTimeout(() => {
            this.$emit('getWorkers')
            $('#add-worker').modal("hide")
            this.worker = {
              name: '',
              email: '',
              phone: '',
              role: '',
              comment: '',
              img: ''
            }
          }, 500);
          this.$successAlert('Работник успешно добавлен')
        }).catch((error) => {
          if (error.response && error.response.data) {
            this.$warningAlert(error.response.data.msg)
          }
        });

    },

  },
  mounted() {
    this.imgSrc = this.$server
    
  }

}
</script>

<style scoped>
.modal-header{
  padding: 30px;
}
.add-worker{
  display: flex;
  flex-direction: column;
}
.add-worker label {
  margin-top: 10px;
}
.btns{
  margin-top: 20px;
}
.modal.fade:not(.in).right .modal-dialog {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.valid-label {
  margin-bottom: 22px !important;
}

.image-preview .img-new {
  height: 192px;
  object-fit: cover;
}


.show-price {
  display: none;
}

.show-price.active {
  display: block;
}

.product-calendar {
  margin-bottom: 40px;
}

.product-calendar label {
  color: #8C94A5;
}

.calendar {
  margin-bottom: 0;
  padding: 0 10px;
}

.modal-form input {
  width: 100%;
  font-size: 16px;
}

.modal-form label {
  margin-right: 10px;
  margin-bottom: 8px;
}

.modal-img {
  margin-bottom: 60px;
}

.modal-img p {
  margin-bottom: 15px;
  color: #828282;
  font-size: 12px;
}

.add-russian {
  display: block;
  margin: 20px 0;
  color: #616cf5;
}

.parent {
  margin-bottom: 130px;
}

.save,
.cancel {
  width: 120px;
}

.add-worker {
  padding: 0 30px;
}

.news-title span {
  color: #b0b0b0;
}

.news-title {
  font-size: 14px;
  font-weight: normal;
}

.news-description {
  color: #858585;
  font-size: 14px;
}

.margin-bottom-10 {
  margin-bottom: 10px;
}

.margin-bottom-20 {
  margin-bottom: 20px;
}

.margin-bottom-30 {
  margin-bottom: 30px;
}

.upload-photo {
  background: none;
  border: 1px solid #616CF5;
  border-radius: 5px;
  padding: 10px 25px;
  color: #616cf5;
}

.selects .form-control {
  background: #F8F9FB;
  border: 1px solid #d3d3d3;
}

.selects:before {
  content: '';
  background: url("../../assets/icons/selectDown.svg") no-repeat;
  width: 20px;
  height: 20px;
  position: absolute;
  z-index: 88;
  right: 20px;
  top: 27%;
}

.selects {
  position: relative;
}

.calendar-period {
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  height: 45px;
  padding: 0 10px;
  width: 100%
}

.deleteImage img {
  opacity: 0;
  transition: 0.3s ease-in;
}

.deleteImage:hover img {
  opacity: 1;
  transition: 0.3s ease-out;
}

.deleteImage {
  width: 100%;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: none;
  border: none;
}
.client-profile-img{
  width: 81px;
  height: 81px;
  border-radius:50%;
  background: #F4F4F4;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 28px;
}
.client-profile-img img{
  object-fit: cover;
}
.add-profile-img{
  width: 21px;
  height: 21px;
  position: absolute;
  bottom: 0;
  left: 65%;
}
</style>