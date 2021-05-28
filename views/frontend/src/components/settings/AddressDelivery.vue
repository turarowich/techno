<template>
<div>
  <div class="row mb-5">
    <div class="col-lg-5">
      <h2 class="cashback-title address-titles">Address delivery</h2>
      <h4 class="circle-question">Address <img src="../../assets/icons/circlequestion.svg"></h4>
      <p class="cashback-description">Enter the address manually or indicate on the map</p>
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
           <div class="map-address margin-20">
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.5580245248984!2d74.60367225038095!3d42.88217200986009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb74559ed9e25%3A0x514fbb81abe4553e!2sOlolohausErkindik!5e0!3m2!1sen!2skg!4v1620191676519!5m2!1sen!2skg" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
           </div>
      <label>You phone number</label>
      <input class="phone-input cashback-input">
       <label class="working-hours">Working hours</label>
       <div class="week">
         <div @click="setDay('monday')" class="days active d-flex justify-content-center align-items-center">MO</div>
         <div @click="setDay('tuesday')" class="days d-flex justify-content-center align-items-center">TU</div>
         <div @click="setDay('wednesday')" class="days d-flex justify-content-center align-items-center">WE</div>
         <div @click="setDay('thursday')" class="days d-flex justify-content-center align-items-center">TH</div>
         <div @click="setDay('friday')" class="days d-flex justify-content-center align-items-center">FR</div>
         <div @click="setDay('saturday')" class="days d-flex justify-content-center align-items-center">SA</div>
         <div @click="setDay('sunday')" class="days d-flex justify-content-center align-items-center">SU</div>
       </div>
      <div class="d-flex working-phones">
          <div style="width:50%" class="mr-3 d-flex align-items-center">
            <label class="mb-0 mr-3 working-label">From</label>
            <select class="form-control " aria-label="Default select example">
              <option>+996500457834</option>
              <option>+996500457834</option>
              <option>+996500457834</option>
              <option>+996500457834</option>
              <option>+996500457834</option>
              <option>+996500457834</option>
              <option>+996500457834</option>
              <option>+996500457834</option>
              <option>+996500457834</option>
            </select>
          </div>
        <div style="width:50%" class="d-flex align-items-center">
          <label class="mb-0 mr-3 working-label">Till</label>
          <select class="form-control " aria-label="Default select example">
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>
            <option>+996500457834</option>

          </select>
        </div>
      </div>
      <hr>



      <div v-for="branch in branches" :key="branch._id" class="new_branch_block p-1" style="border: 1px solid #000000;border-radius: 2px;">
        <label>Branch Address {{ branch.address }}</label>
        <input v-model="branch.address" class="cashback-input company-input" placeholder="Enter the branch address">
        <label>Branch Phone number</label>
        <input v-model="branch.phone" class="phone-input cashback-input" placeholder="Enter the branch phone number">
        <label class="working-hours">Working hours</label>
        <div class="week">
          <div @click="setDay('monday')"  :class="{active: branch.monday.active}" class="days d-flex justify-content-center align-items-center">MO</div>
          <div @click="setDay('tuesday')" :class="{active: branch.tuesday.active}" class="days d-flex justify-content-center align-items-center">TU</div>
          <div @click="setDay('wednesday')" :class="{active: branch.wednesday.active}" class="days d-flex justify-content-center align-items-center">WE</div>
          <div @click="setDay('thursday')" :class="{active: branch.thursday.active}" class="days d-flex justify-content-center align-items-center">TH</div>
          <div @click="setDay('friday')" :class="{active: branch.friday.active}" class="days d-flex justify-content-center align-items-center">FR</div>
          <div @click="setDay('saturday')" :class="{active: branch.saturday.active}" class="days d-flex justify-content-center align-items-center">SA</div>
          <div @click="setDay('sunday')" :class="{active: branch.sunday.active}" class="days d-flex justify-content-center align-items-center">SU</div>
        </div>
        <div class="d-flex working-phones">
          <div style="width:50%" class="mr-3 d-flex align-items-center">
            <label class="mb-0 mr-3 working-label">From</label>
            <select class="form-control " v-model="branch.monday.start" aria-label="Default select example">
              <option v-for="(hour,index) in working_hours" :key="index" :value="hour">{{hour}}</option>
            </select>
          </div>
          <div style="width:50%" class="d-flex align-items-center">
            <label class="mb-0 mr-3 working-label">Till</label>
            <select class="form-control " v-model="branch.monday.end" aria-label="Default select example">
              <option v-for="(hour,index) in working_hours" :key="index" :value="hour">{{hour}}</option>
            </select>
          </div>
        </div>
      </div>

      <AddBranch/>

      <span class="add-branch" style="color:#616cf5" data-toggle="modal" data-target="#add_branch">+ Add branch</span>

      <button class="save">Save</button>
    </div>

    <div class="col-lg-5">
      <div class="d-flex margin-10">
        <label class="switch d-flex">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
        <h2 class="catalog-sub-title">Delivery</h2>
      </div>
      <p class="catalog-description margin-30">
        You can customize the delivery method
      </p>
      <h2 class="catalog-sub-title mb-2">Delivery description</h2>
      <p class="catalog-description margin-20">
        Describe the possible delivery options
      </p>
      <textarea class="general-area"></textarea>
      <h3 class="catalog-sub-title margin-20">Delivery options</h3>
      <div>
        <label>Name</label>
        <input class="cashback-input margin-20 ">
        <div class="d-flex margin-30">
          <div style="width:30%" class="mr-3">
            <label>Price</label>
            <input class="cashback-input">
          </div>
          <div style="width:70%">
            <label>Minimum order of amount</label>
            <input class="cashback-input">
          </div>
        </div>
      </div>
      <a class="add-branch" style="color:#616cf5" href="/">+ Add delivery option</a>
    </div>
  </div>
</div>
</template>

<script>
import AddBranch from "@/modals/client/AddBranch";
export default {
  name: "AddressDelivery",
  components:{
    AddBranch,
  },
  data(){
    return{
      branches:[],
      branch_object:{
        address: "",
        latitude: "",
        longitude: "",
        phone: "",
        phone2: "",
        monday: {active: true, start: "", end: ""},
        tuesday: {active: true, start: "", end: ""},
        wednesday: {active: true, start: "", end: ""},
        thursday: {active: true, start: "", end: ""},
        friday: {active: true, start: "", end: ""},
        saturday: {active: true, start: "", end: ""},
        sunday: {active: true, start: "", end: ""},
      }
    }
  },
  methods:{

  },
  beforeCreate(){
    let that = this;
    this.axios
        .get(this.base_url+'/api/getSettings')
        .then(function (response){
          let settings = response.data.object;
          that.id= settings._id || '';
          that.branches = response.data.branches || '';
        })
  },
}
</script>

<style scoped>

.catalog-description{
  font-size: 14px;
  color:#b0b0b0;
  margin-bottom: 0;
}
.save{
  width: 120px;
}
.catalog-sub-title{
  font-size: 16px;
  font-weight: normal;
}
.add-branch{
  display: inline-block;
  margin-bottom: 90px;
}
.cashback-description{
  font-size: 14px;
  margin-bottom: 15px;
}
.week{
  display: flex;
  margin-bottom: 20px;
}
.address-titles{
  margin-bottom:30px;
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
  height: 144px;
  border-radius: 10px;
  margin-bottom: 30px;
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
  margin-bottom:30px;
}
.working-hours{
  margin-bottom: 20px;
}
.working-phones{
  margin-bottom: 40px;
}
.margin-10{
  margin-bottom: 10px;
}
.margin-20{
  margin-bottom: 20px;
}
.margin-30{
  margin-bottom: 30px;
}
.general-area{
  height: 100px;
  margin-bottom: 30px;
}
</style>