<template>

  <div class="modal fade right"  id="edit-client" tabindex="-1" role="dialog" aria-labelledby="client" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: 580px;" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header align-items-center">
          <h3 class="modal-title">Edit user</h3>
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
          </button>
        </div>
        <div class=" myModal-body">
          <form  class="modal-form ">

            <div class="client-profile-img">
                <img src="../../assets/icons/clientUser.svg">
                <img class="add-profile-img" src="../../assets/icons/addBtn.svg">
            </div>

            <label>Name</label><br>
            <input class="cashback-input">
            <label>Email</label><br>
            <input class="cashback-input margin-b">

            <label>Phone number</label>
            <div class="d-flex phones">
              <select class="form-control select-phone mr-2" aria-label="Default select example">
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
              <input class="cashback-input" style="width:80%">
            </div>

            <label>Birthday</label>
            <div class="calendar d-flex">
              <input class="calendar-input" id="calendar">
              <img src="../../assets/icons/Calendar.svg">
            </div>

            <label class="gender-label">Gender</label>

            <div class="radio-toolbar">
              <div class="d-flex align-items-center mr-4">
                <input type="radio" id="radioApple" name="radioFruit" value="apple" checked>
                <label for="radioApple"></label>
                <span class="male">Male</span>
              </div>
              <div class="d-flex align-items-center">
                <input type="radio" id="radioOrange" name="radioFruit" value="orange">
                <label for="radioOrange"></label>
                <span class="male">Female</span>
              </div>
            </div>

            <div class="modal-btn d-flex">
              <button class="save">Save</button>
              <button class="remove">Remove</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditClient",
  methods:{
    selectDate(){
      new this.$lightpick({
        field: document.getElementById('calendar'),
        onSelect: function(date){
          document.getElementById('calendar').innerHTML = date.format('Do MMMM YYYY');
        }
      });
    }
  },
  mounted(){
    this.selectDate()
  }
}
</script>

<style scoped>
.modal-form label{
  margin-bottom: 13px;

}
.phones{
  margin-bottom: 29px;
}
.phones .cashback-input{
  margin-bottom: 0;
}
.calendar{
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  height:45px;
  padding:0 20px;
  width: 100%;
  margin-bottom: 35px;
}
.calendar-input{
  width: 100%;
  height: 100%;
  border:none;
}
.gender-label{
  margin-bottom: 25px;
}
.modal-header{
  padding: 30px 30px;
}
.myModal-body{
  padding: 0 30px;
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
.add-profile-img{
  width: 21px;
  height: 21px;
  position: absolute;
  bottom: 0;
  left: 65%;
}
.cashback-input{
  width: 100%;
  margin-bottom: 15px;
}
.select-phone{
  width: 20%;
}
.margin-b{
  margin-bottom: 36px;
}
/*==============Radio Button==============*/


.radio-toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 80px;

}


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