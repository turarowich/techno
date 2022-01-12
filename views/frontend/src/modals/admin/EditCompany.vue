<template>

  <div class="modal fade right"  id="editCompanyModal" tabindex="-1" role="dialog" aria-labelledby="edit-client" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: 440px" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header align-items-center justify-content-end">
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
          </button>
        </div>
        <div class=" myModal-body">
          <form  class="modal-form ">
            <label>Name</label><br>
            <input v-model="company.companyName" class="cashback-input">
            <label>Email</label><br>
            <input v-model="company.email" class="cashback-input margin-b">

            <label>Phone number</label>
            <input v-model="company.phone" class="cashback-input">

            <label>Password</label>
            <input v-model="company.password" class="cashback-input">

            <label>Country</label>
            <input v-model="company.country" class="cashback-input">


            <div class="d-flex ">
              <div style="margin-right: 8px;">
                <label>Expiration date</label>
                <div class="calendar d-flex align-items-center">
                  <input v-model="expirationDate" class="calendar-input" id="expirationDate">
                  <img class="calendar-img" src="../../assets/icons/Calendar.svg">
                </div>
              </div>
              <div style="margin-left: 8px;">
                <label>Days left</label>
                <input v-model="daysLeft" class="cashback-input">
              </div>
            </div>

            <div class="d-flex enable-title" style="margin-left: auto;align-items: center;margin-right: 25px;">
              <label class="switch d-flex">
                <input v-model="company.catalogParserStatus" type="checkbox" >
                <span class="slider round"></span>
              </label>
              <h2 class="cashback-sub-title">catalogParserStatus</h2>
            </div>

            <div class="modal-btn d-flex">
              <button @click="save" type="button" class="save">Save</button>
              <button data-dismiss="modal" type="button" aria-label="Close" class="closeBtn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "EditCompany",
  props:['selectedCompany',],
  data(){
    return{
      daysLeft:0,
      company: {},
      expirationDateLightpick:{},
      expirationDate:"",
      expirationDateObj: {},
    }
  },
  computed:{

  },
  methods:{
    async save() {
      const options = {
        headers: {
          "x-admin": true,
          "x-admin-token": localStorage.getItem('tokenAdmin'),
          },
        params: {},
      }
      await this.axios.patch(this.url('updateCompany', this.company.id), {company:this.company,expirationDate:this.expirationDateObj}, options)
          .then((res) => {
            console.log(res);
            this.$emit('childDoneEditing');
            $('#editCompanyModal').modal('hide');
            // this.getCompanies();
            this.$successAlert('Status has been changed')
          }).catch(() => {
            this.$warningAlert('Cant change status')
          })

    },
    selectDate(){
      this.expirationDateLightpick = new this.$lightpick({
        field: document.getElementById('expirationDate'),
        orientation:'top',
        format:'YYYY-MM-DD',
        onSelect: date=>{
          this.expirationDate = date.format('YYYY-MM-DD');
          this.expirationDateObj = date;
          this.getDaysLeft(date);
        }
      });
    },
    getDaysLeft(selectedDate){
      let today = this.$moment();
      let start = this.$moment(selectedDate).startOf('day');
      let end = this.$moment(today).startOf('day');
      this.daysLeft = start.diff(end, 'days',true);
    }
  },

  mounted(){
    this.selectDate();
    this.imgSrc = this.$server;
  },
  watch:{
    selectedCompany: {
      immediate: true,
      handler(val) {
        this.company = val;
        if(val.expires){
          this.expirationDateLightpick.setDate(val.expires);
        }
      }
    },
  }
}
</script>

<style scoped>
.closeBtn:hover{
  background-color: #fae4e4;
}
.closeBtn{
  border: 1px solid #E94A4A;
  border-radius: 5px;
  height: 37px;
  font-size: 16px;
  color: #E94A4A;
  width:120px;
  background-color: white;
}

.calendar-img{
  width: 20px;
  height: 20px;
}
.modal-form label{
  margin-bottom: 10px;
}
.modal.fade .modal-dialog{
  transform: translate3d(100vw, 0, 0);

}
.modal.fade:not(.in).right .modal-dialog {
  -webkit-transform: translate3d(0,0,0);
  transform: translate3d(0, 0, 0);
  transition:0.4s;
}

.phones .cashback-input{
  margin-bottom: 0;
}


.modal-header{
  padding: 30px 30px;
}
.myModal-body{
  padding: 0 30px;
}

.client-profile-img .img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius:50%;
}

.cashback-input{
  width: 100%;
  margin-bottom: 15px;
}

.margin-b{
  margin-bottom: 25px;
}
/*==============Radio Button==============*/

.radio-toolbar input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.radio-toolbar label {
  display: inline-block;
  margin-bottom: 0;
  margin-right: 10px;
  width: 13px;
  height: 13px;
  border: 1px solid #E3E3E3;
  box-sizing: border-box;
  border-radius: 3px
}
.radio-toolbar input[type="radio"]:checked + label {
  background-color: #616cf5;
  border:none;

}

</style>