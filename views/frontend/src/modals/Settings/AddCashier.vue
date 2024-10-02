<template>
  <div class="modal fade right"  id="add-cashier" tabindex="-1" role="dialog" aria-labelledby="add-cashier" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: 587px;" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header align-items-center">
          <h3 class="modal-title">Добавить менеджера</h3>
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
          </button>
        </div>
        <div class=" myModal-body">
          <form  class="modal-form addEmployee">

            <div class="user-img">
                <img class="image-preview" v-if="employee.avatar" :src="imagePreview">
                <img v-else src="../../assets/icons/clientUser.svg">
                <input class="d-none" type="file" name="" ref="uploadPhoto" accept="image/*" @change="uploadPhoto($event)">
                <img src="../../assets/icons/addBtn.svg" class="add-btn" @click="selectPhoto">
            </div>
            <input name="avatar" class="d-none">
            <label class="li-label">Имя</label><br>
            <input name="name" class="cashback-input" v-model="employee.name">

            <label class="li-label">Email</label><br>
            <input name="email" class="cashback-input" v-model="employee.email">

            <label class="li-label">Дата рождения</label><br>
            <input id="birthDate" name="birthDate" class="cashback-input calendar-input" v-model="employee.birthDate" readonly>
            
            <label class="li-label">Пароль</label><br>
            <input name="password" type="password" class="cashback-input" v-model="employee.password">

            <label class="li-label">Повторить пароль</label><br>
            <input type="password" class="cashback-input not-handle-error" v-model="employee.repeatPassword"  :class="comparePassword">

            <label class="li-label">Коментарий</label>
            <textarea class="general-area"  v-model="employee.comment"></textarea>
            
          </form>
          <div class="modal-btn d-flex">
              <button class="save" @click="addEmployee">Сохранить</button>
              <button class="cancel" @click="cancelAdd">Отмена</button>
            </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import $ from "jquery";
export default {
  name: "AddCashier",
    data(){
        return{
            employee:{
                name: "",
                email: "",
                password: "",
                repeatPassword: "",
                comment: "",
                birthDate: this.currentDate( -365 * 16),
                avatar: ""
            },
        }
    },
    computed:{
        imagePreview() {
            if(this.employee.avatar){
                return URL.createObjectURL(this.employee.avatar)      
            }
            return null
        },
        comparePassword(){
            if(this.employee.password && this.employee.password == this.employee.repeatPassword ){
                return "value-success"
            }

            if(this.employee.password){
                return "value-error"
            }

            return ""
        }
    },
    methods:{
        selectPhoto(){
            this.$refs.uploadPhoto.click();
        },
        uploadPhoto(event) {
            var valid = ["image/png", "image/jpg", "image/jpeg"];
            if(event.target.files[0] && event.target.files[0].size > 3000000){
                this.$warningAlert('Image size exceed 3 mb');
            }else if(event.target.files[0] && !valid.includes(event.target.files[0].type)){
                this.$warningAlert('Image type can be jpg or png');
            }else{
                this.employee.avatar = event.target.files[0]
            }
            this.$refs.uploadPhoto.value = ""
        },
        cancelAdd(){
            this.employee = {
                name: "",
                email: "",
                password: "",
                repeatPassword: "",
                birthDate: this.currentDate( -365 * 16),
                comment: "",
                avatar: ""
            }
            $('#add-cashier').modal("hide")
        },
        addEmployee(){
            if(this.comparePassword != "value-success"){
                this.$warningAlert('Passwords not the same');
                return;
            }
            let new_employee = this.employee;
            const form  = new FormData;

            if(new_employee.avatar){
                form.append('avatar', new_employee.avatar)
            }
            form.append('name', new_employee.name)
            form.append('email', new_employee.email)
            form.append('password', new_employee.password)
            form.append('comment', new_employee.comment)
            form.append('birthDate', new_employee.birthDate)

            this.axios.post(this.url('addEmployee'), form)
                .then(() => {
                    setTimeout(()=>{ 
                        this.$emit('getEmployees')
                        $('#add-cashier').modal("hide")
                    }, 500);
                    this.$successAlert('Employee has been added')
                    this.new_employee = {
                        name: '',
                        email:'',
                        password:'',
                        comment: '',
                        birthDate: this.currentDate( -365 * 16),
                        avatar:"",
                    }
                }).catch((error) => {
                    this.setErrors($('.addEmployee'), error)
                    console.log("fail", error.response)
                })
        }

    },
    mounted(){
        if(document.getElementById('birthDate')){
            new this.$lightpick({
                field: document.getElementById('birthDate'),
                format:'',
                lang:'en',
                minDate: "01 01 1900",
                maxDate: this.$moment().subtract(7, 'year'),
                selectBackward: true,
                onSelect:(date) => {
                    this.employee.birthDate = date.format().toString().slice(0,10)
                }
            });
        }
        
    }
}
</script>

<style scoped>
.li-label{
    margin-top: 20px;
}
.image-preview{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
.user-img{
  width: 80px;
  height: 80px;
  border-radius:50%;
  background: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
}
.cashback-input{
  width: 100%;
  height: 45px;
  border: 1px solid #d3d3d3;
}
.general-area{
  margin-bottom: 80px;
}
.add-btn{
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  bottom: 5px;
}
</style>