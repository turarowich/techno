<template>
  <div class="parent-modal">
    <div class="modal myModal fade" id="add_branch" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content add_branch_modal_content">
          <div class="modal-header align-items-center">
            <h3 class="modal-title">Add Branch</h3>
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
            </button>
          </div>
          <div class="modal-body add_branch_modal_body d-flex">
            <div class="add_branch_block">
              <h4 class="circle-question">Address</h4>
              <input class="cashback-input company-input" placeholder="Enter your company address">
              <div class="d-flex atitude">
                <div class="mr-3">
                  <label>Longitude</label>
                  <input class="cashback-input">
                </div>
                <div>
                  <label>Latitude</label>
                  <input class="cashback-input">
                </div>
              </div>
              <label>Name</label>
              <input class="phone-input cashback-input">
              <label>Phone number</label>
              <input class="phone-input cashback-input" placeholder="Branch phone number">
              <input class="phone-input cashback-input" placeholder="Branch phone number">
              <label class="working-hours">Working hours</label>
              <div class="week">
                <div @click="setDay('monday')" :class="{active: branch_object.monday.active}" class="days active d-flex justify-content-center align-items-center">MO</div>
                <div @click="setDay('tuesday')" :class="{active: branch_object.tuesday.active}" class="days d-flex justify-content-center align-items-center">TU</div>
                <div @click="setDay('wednesday')" :class="{active: branch_object.wednesday.active}" class="days d-flex justify-content-center align-items-center">WE</div>
                <div @click="setDay('thursday')" :class="{active: branch_object.thursday.active}" class="days d-flex justify-content-center align-items-center">TH</div>
                <div @click="setDay('friday')" :class="{active: branch_object.friday.active}" class="days d-flex justify-content-center align-items-center">FR</div>
                <div @click="setDay('saturday')" :class="{active: branch_object.saturday.active}" class="days d-flex justify-content-center align-items-center">SA</div>
                <div @click="setDay('sunday')" :class="{active: branch_object.sunday.active}" class="days d-flex justify-content-center align-items-center">SU</div>
              </div>
              <div class="d-flex working-phones">
                <div class="mr-3 d-flex align-items-center">
                  <label class="mb-0 mr-3 working-label">From</label>
                  <select class="form-control" v-model="current_selected_day.start">
                    <option v-for="(hour,index) in working_hours" :key="index" :value="hour">{{hour}}</option>
                  </select>
                </div>
                <div class="d-flex align-items-center">
                  <label class="mb-0 mr-3 working-label">To</label>
                  <select class="form-control" v-model="current_selected_day.end" aria-label="Default select example">
                    <option v-for="(hour,index) in working_hours" :key="index" :value="hour">{{hour}}</option>
                  </select>
                </div>
                <div style="display: flex;justify-content: center;align-items: center;margin-left: 2px;flex: 1;">
                  <span>Is a work day</span>
                  <label class="switch d-flex">
                    <input v-model="current_selected_day.active" type="checkbox">
                    <span class="slider round"></span>
                  </label>
                </div>

              </div>
            </div>

            <div class="map-address margin-20">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.5580245248984!2d74.60367225038095!3d42.88217200986009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb74559ed9e25%3A0x514fbb81abe4553e!2sOlolohausErkindik!5e0!3m2!1sen!2skg!4v1620191676519!5m2!1sen!2skg" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>

          </div>
          <button class="save">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AddBranch",
  props:{

  },
  data(){
    return{
      working_hours:[
        '01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00',
        '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','00:00',
      ],
      current_selected_day:{
        day:'',
        active: true,
        start: "",
        end: "",
      },
      branch_object:{
        address: "",
        latitude: "",
        longitude: "",
        phone: "",
        phone2: "",
        monday: {active: true, start: "08:00", end: "17:00"},
        tuesday: {active: true, start: "08:00", end: "17:00"},
        wednesday: {active: true, start: "08:00", end: "17:00"},
        thursday: {active: true, start: "08:00", end: "17:00"},
        friday: {active: true, start: "08:00", end: "17:00"},
        saturday: {active: true, start: "08:00", end: "17:00"},
        sunday: {active: true, start: "08:00", end: "17:00"},
      },
    }
  },
  methods:{
    setDay(day){
      let day_obj = this.branch_object[day];
      this.current_selected_day=this.branch_object[day];
      this.current_selected_day.day = day;

      console.log(day_obj);
    },
  },
  watch:{
    current_selected_day: {
      handler(val, oldVal) {
        let day = val.day;
        delete val.day;
        this.branch_object[day]=val;
        console.log('selectedType list changed',val, oldVal)
      },
      deep: true
    },
  },
}
</script>

<style scoped>
.week{
  display: flex;
  margin-bottom: 20px;
}
.circle-question{
  font-size: 14px;
  margin-bottom: 8px;
}
.cashback-input{
  width: 100%;
}
.company-input{
  margin-bottom: 25px;
}
.atitude{
  margin-bottom: 30px;
}
.map-address{
  flex: 1;
  height: 500px;
  margin-left: 10px;
}
.add_branch_block{
  flex: 1;
  margin-right: 10px;
}
.days{
  background: #F8F9FB;
  border-radius: 4.64125px;
  width: 48px;
  height: 45px;
  color:#858585;
  cursor:pointer;
  margin-right: 10px;
}
.days.active,.days:hover{
  background: #616cf5;
  transition: .3s;
  color:#fff;
}
.phone-input{
  margin-bottom:12px;
}
.working-hours{
  margin-bottom: 20px;
}
.working-phones{
  margin-bottom: 40px;
}
.working-phones div{
  flex: 1;
}
.working-phones select{
  width: 70px;
}
.margin-20{
  margin-bottom: 20px;
}
.add_branch_modal_content{
  width: 856px;
  max-width: 856px;
}
.save{
  width: 120px;
}
.modal-content{
  border-bottom: none;
  padding: 18px 24px;
}
.modal-content .modal-header{
  padding: 0;
}
.add_branch_modal_body{
  padding: 0;
}
.selected_active{
  box-shadow: 0px -6px 61px -1px rgba(46,21,143,0.98);
  -webkit-box-shadow: 0px -6px 61px -1px rgba(46,21,143,0.98);
  -moz-box-shadow: 0px -6px 61px -1px rgba(46,21,143,0.98);
}
</style>