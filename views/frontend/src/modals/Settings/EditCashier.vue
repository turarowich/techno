<template>
  <div class="modal fade right"  id="edit-cashier" tabindex="-1" role="dialog" aria-labelledby="edit-cashier" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: 587px;" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header align-items-center">
          <h3 class="modal-title">Edit Cashier</h3>
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
          </button>
        </div>
        <div class=" myModal-body">
          <form  class="modal-form editEmployee">
            <div class="user-img">
                <img class="image-preview" v-if="newImage" :src="imagePreview">
                <img class="image-preview" v-else-if="employee.avatar" :src="makeImg(employee.avatar)">
                <img v-else src="../../assets/icons/clientUser.svg">

                <input class="d-none" type="file" name="" ref="uploadPhoto" accept="image/*" @change="uploadPhoto($event)">
                <img src="../../assets/icons/addBtn.svg" class="add-btn" @click="selectPhoto">
            </div>
            <input name="avatar" class="d-none">
            <label class="li-label">Name</label><br>
            <input name="name" class="cashback-input" v-model="employee.name">

            <label class="li-label">Email</label><br>
            <input name="email" class="cashback-input" v-model="employee.email">

            <label class="li-label">Birthday</label><br>
            <input id="birthDateEdit" name="birthDate" class="cashback-input calendar-input" v-model="employee.birthDate" readonly>
            
            <label class="li-label">Password</label><br>
            <input name="password" type="password" class="cashback-input" v-model="employee.password">

            <label class="li-label">Repeat password</label><br>
            <input type="password" class="cashback-input not-handle-error" v-model="employee.repeatPassword"  :class="comparePassword">

            <label class="li-label">Comment</label>
            <textarea class="general-area"  v-model="employee.comment"></textarea>
            
          </form>
          <div class="modal-btn d-flex">
              <button class="save" @click="addEmployee">Save</button>
              <button class="cancel" @click="cancelAdd">Cancel</button>
            </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import $ from "jquery";
export default {
  name: "EditCashier",
    props: ['selectedEmployee'],
    data(){
        return{
            employee:{},
            newImage: false
        }
    },
    watch: {
        selectedEmployee: function (val) {
            this.employee = Object.assign({}, val)
            if(this.employee.birthDate){
                this.employee.birthDate = this.employee.birthDate.slice(0, 10)
            }else{
                this.employee.birthDate = this.currentDate( -365 * 16)
            }
            this.newImage = false
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
                this.newImage = true
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
                birthDate: "",
                comment: "",
                avatar: ""
            }
            $('#add-cashier').modal("hide")
        },
        addEmployee(){
            if(this.comparePassword != "value-success" && this.password){
                this.$warningAlert('Passwords not the same');
                return;
            }
            let new_employee = this.employee;
            const form  = new FormData;

            if(new_employee.avatar){
                form.append('avatar', new_employee.avatar)
            }
            if(new_employee.password){
                form.append('password', new_employee.password)
            }

            form.append('name', new_employee.name)
            form.append('email', new_employee.email)
            form.append('comment', new_employee.comment)
            form.append('birthDate', new_employee.birthDate)

            this.axios.put(this.url('updateEmployee', new_employee._id), form)
                .then(() => {
                    setTimeout(()=>{ 
                        this.$emit('getEmployees')
                        $('#edit-cashier').modal("hide")    
                    }, 300);
                    this.$successAlert('Employee has been added')
                    this.new_employee = {
                        name: '',
                        email:'',
                        password:'',
                        comment: '',
                        birthDate: "",
                        avatar:"",
                    }
                }).catch((error) => {
                    this.setErrors($('.editEmployee'), error)
                    console.log("fail", error.response)
                })
        },
        makeImg(name){
            return this.img(name)
        }


    },
    mounted(){
        if(document.getElementById('birthDate')){
            new this.$lightpick({
                field: document.getElementById('birthDateEdit'),
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