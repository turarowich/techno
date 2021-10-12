<template>
  <div class="modal fade right"  id="add-push" tabindex="-1" role="dialog" aria-labelledby="add-promocode" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: calc(100% - 250px);" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header justify-content-start align-items-center">

          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
          </button>
            <h3 class="modal-title">Add push</h3>
        </div>
        <div class=" myModal-body">
          <form  class="modal-form ">
            <div class="row">
              <div class="col-lg-6">
                <div class="d-flex client-all justify-content-between">
                  <h4 class="push-title">Clients</h4>
                  <div class="d-flex align-items-center">
                    <div class="table-head "><label class="custom-checkbox mr-2 "><input v-model="week.sendToAll" type="checkbox"><span class="checkmark"></span></label></div>
                    <span class="send-all">Send to all</span>
                  </div>
                </div>

                <div  :class="{errorInput: main_input === true}"  class="main-search d-flex align-items-center ">
                  <img src="../../assets/icons/search-icon.svg">
                  <input class="main-input bg-transparent" type="text" placeholder="Search" v-model="search_client">
                </div>
                <div class="parent-order-client">
                  <div v-if="search_client.length !==0" class="child-order-client">
                    <div v-if="filteredClients.length === 0">
                      <div class="p-3">There is not clients</div>
                    </div>
                    <div v-else v-for="client in filteredClients" :key="client._id"  @click="selectClient(client)" class="table-child d-flex align-items-center">
                      <div class="table-img">
                        <img v-if="client.avatar" :src="imgSrc+'/'+client.avatar">
                        <img v-else src="../../assets/icons/chat.svg">
                      </div>
                      <div>
                        <h4 class="general-title">{{client.name}}</h4>
                        <span class="client-phone-order">{{client.phone}}</span>
                      </div>
                    </div>

                  </div>
                </div>
               <div class="all-clients">
                 <div  v-for="selectedClient in selectedClients" :key="selectedClient._id" class="choosed-client d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                      <div class="table-img">
                        <img v-if="selectedClient.avatar" :src="imgSrc+'/'+selectedClient.avatar">
                        <img v-else src="../../assets/icons/chat.svg">
                      </div>
                     <div class="category">
                       <div class="category-name">{{selectedClient.name}}</div>
                       <span class="category-people" v-if="selectedClient.phone">Phone: <span style="color:#000; text-transform:capitalize">{{ selectedClient.phone}}</span></span>
                     </div>
                    </div>
                   <img @click="deleteClient(selectedClient)" src="../../assets/icons/deleteClient.svg">
                 </div>
               </div>
              </div>
            <!-------------------------Right Side --------------------->
              <div class="col-lg-6">
                  <h3 class="push-title settings">Notification settings</h3>
                <label>Push name</label>
                <input type="text"   v-model="week.title" style="font-size:14px" :class="{errorInput: push_title === true}"  name="week" class="push-title cashback-input w-100 mb-3" placeholder="Please set push name">
                <div class="radio-toolbar">
                  <div class="d-flex align-items-center mr-4">
                    <input type="radio" id="radioWeek" v-model="value" value="week"  name="week"  >
                    <label for="radioWeek"></label>
                    <span class="male">By week</span>
                  </div>
                  <div class="d-flex align-items-center">
                    <input type="radio" id="radioMonth" v-model="value" value="month" name="week" >
                    <label for="radioMonth"></label>
                    <span class="maled">By month</span>
                  </div>
                </div>

                <!-- By Month  -->

                <div v-show="value === 'month'" >

                  <div ref="monthDatesWrapper" class="monthDates" >
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('1')}" class="days d-flex justify-content-center align-items-center">1</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('2')}" class="days d-flex justify-content-center align-items-center">2</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('3')}" class="days d-flex justify-content-center align-items-center">3</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('4')}" class="days d-flex justify-content-center align-items-center">4</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('5')}" class="days d-flex justify-content-center align-items-center">5</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('6')}" class="days d-flex justify-content-center align-items-center">6</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('7')}" class="days d-flex justify-content-center align-items-center">7</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('8')}" class="days d-flex justify-content-center align-items-center">8</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('9')}" class="days d-flex justify-content-center align-items-center">9</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('10')}" class="days d-flex justify-content-center align-items-center">10</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('11')}" class="days d-flex justify-content-center align-items-center">11</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('12')}" class="days d-flex justify-content-center align-items-center">12</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('13')}" class="days d-flex justify-content-center align-items-center">13</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('14')}" class="days d-flex justify-content-center align-items-center">14</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('15')}" class="days d-flex justify-content-center align-items-center">15</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('16')}" class="days d-flex justify-content-center align-items-center">16</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('17')}" class="days d-flex justify-content-center align-items-center">17</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('18')}" class="days d-flex justify-content-center align-items-center">18</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('19')}" class="days d-flex justify-content-center align-items-center">19</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('20')}" class="days d-flex justify-content-center align-items-center">20</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('21')}" class="days d-flex justify-content-center align-items-center">21</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('22')}" class="days d-flex justify-content-center align-items-center">22</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('23')}" class="days d-flex justify-content-center align-items-center">23</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('24')}" class="days d-flex justify-content-center align-items-center">24</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('25')}" class="days d-flex justify-content-center align-items-center">25</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('26')}" class="days d-flex justify-content-center align-items-center">26</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('27')}" class="days d-flex justify-content-center align-items-center">27</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('28')}" class="days d-flex justify-content-center align-items-center">28</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('29')}" class="days d-flex justify-content-center align-items-center">29</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('30')}" class="days d-flex justify-content-center align-items-center">30</div>
                    <div :class="{active: listOfActiveMonthDatesNumbers.includes('31')}" class="days d-flex justify-content-center align-items-center">31</div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div class="d-flex align-items-center mb-4">
                      <label class="switch d-flex">
                        <input
                            @change="setMonthDateActive"
                            type="checkbox"
                            true-value="true"
                            false-value="false"
                            v-model="selectedMonthDate.isActive"
                            >
                        <span class="slider round"></span>
                      </label>
                      <h2 class="selected-day">{{selectedMonthDate.date}}</h2>
                    </div>
                    <span class="add-more" @click="addContentMonth">+ Add more</span>
                  </div>

                  <div v-for="(item,index) in selectedMonthDate.push" :key="index" >
                    <div class="d-flex mb-3">
                      <div style="width:25%" class="mr-3">
                        <label>Time</label><br>
                        <select v-model="item.time"  class=" form-control  mr-2  form-control-lg" aria-label=".form-select-lg example">
                          <option v-for="(hours,index) in working_hours" :key="index" :value="hours">{{hours}}</option>
                        </select>
                      </div>
                      <div class="titles" style="width:85%">
                        <label>Title</label><br>
                        <input v-model="item.title" class=" cashback-input">
                        <img v-show="index!==0" @click="removeContentMonth(index)" class="remove-content" style="width:18px;height:18px;" src="../../assets/icons/xx.svg">
                      </div>

                    </div>
                    <label >Description</label><br>
                    <textarea v-model="item.desc"  class="general-area"></textarea>
                  </div>

                </div>

              <!----- By week-- -->

              <div v-show="value ==='week'" >
                <div class="week"  >
                  <div  @click="setDay('monday')" :class="{is_active: selectedDay.name === 'monday',active: week.monday.isActive }"  class="days d-flex justify-content-center align-items-center">MO</div>
                  <div  @click="setDay('tuesday')" :class="{is_active: selectedDay.name === 'tuesday',active: week.tuesday.isActive }"  class="days d-flex justify-content-center align-items-center">TU</div>
                  <div  @click="setDay('wednesday')" :class="{is_active: selectedDay.name === 'wednesday',active: week.wednesday.isActive}"  class="days d-flex justify-content-center align-items-center">WE</div>
                  <div  @click="setDay('thirsday')" :class="{is_active: selectedDay.name === 'thirsday',active: week.thirsday.isActive}"  class="days d-flex justify-content-center align-items-center">TH</div>
                  <div  @click="setDay('friday')" :class="{is_active: selectedDay.name === 'friday',active: week.friday.isActive}"  class="days d-flex justify-content-center align-items-center">FR</div>
                  <div  @click="setDay('saturday')" :class="{is_active: selectedDay.name === 'saturday',active: week.saturday.isActive}"  class="days d-flex justify-content-center align-items-center">SA</div>
                  <div  @click="setDay('sunday')" :class="{is_active: selectedDay.name === 'sunday',active: week.sunday.isActive}"  class="days d-flex justify-content-center align-items-center">SU</div>
                </div>
                <div class=" d-flex align-items-center mb-4 justify-content-between">
                  <div class="d-flex pt-1 align-items-center ">
                    <label class="switch d-flex ">
                      <input v-model="selectedDay.isActive" type="checkbox">
                      <span class="slider round"></span>
                    </label>
                    <h2 class="selected-day">{{selectedDay.name}}</h2>
                  </div>
                  <span class="add-more" @click="addContent">+ Add more</span>
                </div>
              </div>

                <!---------Push Content------->

                <div v-for="(item,index) in selectedDay.push" :key="index" >
                  <div class="d-flex mb-3">
                    <div style="width:25%" class="mr-3">
                      <label>Time</label><br>
                      <select v-model="item.time"  class=" form-control  mr-2  form-control-lg" aria-label=".form-select-lg example">
                        <option v-for="(hours,index) in working_hours" :key="index" :value="hours">{{hours}}</option>
                      </select>
                    </div>
                    <div class="titles" style="width:85%">
                      <label>Title</label><br>
                      <input v-model="item.title" class=" cashback-input">
                      <img v-show="index!==0" @click="removeContent(index)" class="remove-content" style="width:18px;height:18px;" src="../../assets/icons/xx.svg">
                    </div>

                  </div>
                  <label >Description</label><br>
                  <textarea v-model="item.desc"  class="general-area"></textarea>
                </div>
              </div>
            </div>

            <div class="d-flex">
              <button class="save mr-2" @click.prevent="onSubmit">Save</button>
              <button class="cancel" @click.prevent="cancel">Cancel</button>
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
  name: "AddPush",
  props:['getSchedulePushes'],
  data(){
    return {
      listOfActiveMonthDates:[],
      listOfActiveMonthDatesNumbers:[],
      selectedMonthDate:{
        date:"",
        isActive:false,
        push:[]
      },
      working_hours:[
        '01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00',
        '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','00:00',
      ],
      push_title:false,
      main_input:false,
      selectedDay:'',
      clients:[],
      search_client:'',
      clientCategory:[],
      value:'week',
      selectedClients:[],
      week:{
        byWeek:this.value === "week",
        monday: {isActive:true, push:[{time:'',title: '',desc:''}],name:'monday'},
        tuesday:{isActive:true, push:[{time:'',title: '',desc:''}],name:'tuesday'},
        wednesday:{isActive:true, push:[{time:'',title: '',desc:''}],name:'wednesday'},
        thirsday:{isActive:true, push:[{time:'',title: '',desc:''}],name:'thirsday'},
        friday:{isActive:true, push:[{time:'',title: '',desc:''}],name:'friday'},
        saturday: {isActive:true, push:[{time:'',title: '',desc:''}],name:'saturday'},
        sunday: {isActive:true, push:[{time:'',title: '',desc:''}],name:'sunday'},
        sendToAll:false,
        clients:[],
        title: "",
        isActive:true
      }
    }
  },
  computed:{
    filteredClients(){
      return this.clients.filter((client)=>{
        return client.name.toLowerCase().includes(this.search_client.toLowerCase())
      })
    },

  },
  methods:{
    onSubmit(){
      this.week.monthDates = this.listOfActiveMonthDates;
      if(this.week.title === ''){
        this.push_title = true
      }
      if(this.week.clients.length === 0){
        this.main_input = true;
      }
      else{
        const that = this;
        this.axios.post(this.url('addSchedulePush'),this.week)
          .then(()=>{
            this.$successAlert('Push has been added')
            this.getSchedulePushes()
            $('#add-push').modal("hide");
            this.push_title = false
            that.week.clients = [];
            this.week.title = ''
          })
      }
    },
    setDay(day){
      this.selectedDay = day;
      for(let obj in this.week){
        if(obj === day){
          this.selectedDay = this.week[day]

        }
      }
    },
    addContent(){
      if(this.selectedDay.push.length<3){
      this.selectedDay.push.push({time:'',title: '',desc:''})
    }
    else{
      this.$warningAlert('Max is 3')
      }

    },
    addContentMonth(){
      if(this.selectedMonthDate.push.length<3){
        this.selectedMonthDate.push.push({time:'',title: '',desc:''})
      }
      else{
        this.$warningAlert('Max is 3')
      }
    },
    removeContent(el){
        this.selectedDay.push = this.selectedDay.push.filter((item,index)=>{
          console.log(item)
          return el!==index
        })

    },
    removeContentMonth(el){
      this.selectedMonthDate.push = this.selectedMonthDate.push.filter((item,index)=>{
        return el!==index
      })
    },
    cancel(){
      $('#add-push').modal("hide")
    },
    getClients(){
      this.axios.get(this.url('getClients'))
          .then((res)=>{
            this.clients = res.data.objects;
          })
    },
    getCategories(){
      this.axios.get(this.url('getCategories')+'?type=client')
          .then((response)=>{
            this.clientCategory = response.data.objects
            this.clientCategory.unshift({_id:'',name:'All'})
          })
    },
    selectClient(selected){
        for (let i = 0; i < this.selectedClients.length; i++) {
          if(this.selectedClients[i]._id === selected._id){
            this.$warningAlert("Client already added")
            selected = null;
            this.search_client = ''
            break;
          }
        }
        if(selected){
          this.selectedClients.push(selected)
          this.week.clients.push(selected._id)
        }
        this.main_input = false;
        this.search_client = ''
    },
    deleteClient(client){
      this.selectedClients = this.selectedClients.filter((item)=> item !== client)
      this.week.clients = this.week.clients.filter((item)=>item !== client._id)
    },
    setMonthDateActive(){
      let newDate = true;
      let isActive = this.selectedMonthDate.isActive
      this.listOfActiveMonthDates.forEach((date,index)=>{
        if(date.date === this.selectedMonthDate.date){
          if(isActive === "true"){
            date.isActive = isActive;
            newDate = false;
          }else{
            //remove
            this.listOfActiveMonthDates.splice(index,1)
            this.listOfActiveMonthDatesNumbers.splice(index,1)
          }
        }
      })
      if(newDate && isActive === "true"){
        this.listOfActiveMonthDates.push({
          date:this.selectedMonthDate.date,
          push:this.selectedMonthDate.push,
          isActive:isActive,
        })
        this.listOfActiveMonthDatesNumbers.push(this.selectedMonthDate.date)
      }
    },
    setMonthDate(date){
      function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
      }
      if(isNumeric(date)){
        this.selectedMonthDate.date = date;
        let newDate = true;
        this.listOfActiveMonthDates.forEach(date=>{
          if(date.date === this.selectedMonthDate.date){
            this.selectedMonthDate.isActive = date.isActive;
            this.selectedMonthDate.push = date.push
            newDate = false;
          }
        })
        if(newDate){
          this.selectedMonthDate.isActive = false;
          this.selectedMonthDate.push = [{time:'',title: '',desc:''}];
        }
      }
    },
    clickOnMonthDate(elem){
      if(elem.target.classList.contains("days")){
        this.setMonthDate(elem.target.innerText)
      }
    }
  },
  mounted(){
    this.getCategories()
    this.getClients();
    this.imgSrc=this.$server
    this.$refs.monthDatesWrapper.addEventListener('click', this.clickOnMonthDate);
  },
  unmounted() {
    if(this.$refs.monthDatesWrapper){
      this.$refs.monthDatesWrapper.removeEventListener('click', this.clickOnMonthDate);
    }
  }
}
</script>

<style scoped>
.monthDates{
  display: flex;
  flex-wrap: wrap;;
}
.monthDates .days{
  margin-bottom: 10px;
}
.is_active{
  color:#616cf5 !important;
}
.add-more{
  color:#616cf5;
  cursor:pointer;

}
.remove-content{
  position: absolute;
  right: -30px;
  top: 38px;
}
.selected-day{
  font-size: 16px;
  font-weight: normal;
  margin-left: 10px;
  text-transform: capitalize;

}
.cashback-input,.form-control{
  height: 40px;
}

.titles{
  position: relative;
}
.form-control{
  width: 100% !important;
  background-position-x: 85%;
}
.radio-toolbar{
  margin-bottom: 20px;
}
.all-clients{
  height:440px;
}
.general-area{
  height: 90px;
  margin-bottom: 20px;
}
.titles .cashback-input{
  width: 100%;
  margin-bottom: 10px;
}
.client-all, .settings{
  margin-bottom: 20px;
}
.save, .cancel{
  width: 120px;
}
.main-search{
  margin-bottom: 10px;
}
.push-title{
  font-size: 16px;
  font-weight: normal;
}

.week{
  display: flex;
  margin-bottom: 20px;
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
  margin-bottom: 20px;
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
.days.active{
  background: #616cf5;
  color:#fff !important;
}
.days:hover{
  color: #616cf5;
  transition: .3s;
  border:1px solid #616cf5;

}
.category-logo{
  width: 40px;
  height: 40px;
  border-radius:50%;
  background: #eee;
  margin-right: 10px;
}
.category-name{
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 5px;
}
.category-people{
  font-size: 14px;
  color:#858585;
}
.category{
  line-height: 15px;
}
.choosed-client{
  padding: 18px 0;
  border-bottom: 1px solid #e3e3e3;
}

</style>