<template>
<div class="log">
  <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
       <div class="dropdown filter-drops">
          <button class="app-buttons-item dropdown-toggle"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            <img class="img-btn" src="../../assets/icons/filter.svg"><span>Filter</span>
          </button>

          <div class="dropdown-menu general-dropdown animate slideIn log-filter" aria-labelledby="dropdownMenuButton">
            <div class="filter-dropdown">
             <form>
               <div>
                <div class="filter-list" data-toggle="collapse" data-target="#admins" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                   Admins
                   <img src="../../assets/icons/down.svg" class="filter-img">
                </div>
                <div class="collapse" id="admins">
                    <div class="filter-body">
                        <select class="filter-select form-control form-control-sm mb-2" aria-label=".form-select-lg example" v-model="selectedEmployee">
                            <option value="">All</option>
                            <option v-for="employee, index in employees" :key="index"  :value="employee._id">
                            {{employee.name}}
                            </option>
                        </select>
                    </div>
                </div>
               </div>
               <div >
                 <div class="filter-list" data-toggle="collapse" data-target="#cashback" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                   Cash back
                   <img src="../../assets/icons/down.svg" class="filter-img">
                 </div>
                 <div class="collapse" id="cashback">
                   <div class="filter-body">
                     <div class="radio-toolbar-gender">
                       <div class="d-flex align-items-center mb-2 mr-5">
                         <input ref="client-filter" type="radio" id="radioMen" name="sortLogs" value="cashback_created" v-model="sortBy">
                         <label for="radioMen"></label>
                         <span class="male">Added</span>
                       </div>
                       <div class="d-flex align-items-center mb-2">
                         <input ref="client-filter" type="radio" id="radioWoman" name="sortLogs" value="cashback_updated" v-model="sortBy">
                         <label for="radioWoman"></label>
                         <span class="male">Edited</span>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div class="filter-list">Orders</div>
               <div class="order_users mb-2"><label class="custom-checkbox mr-2"><input ref="client-filter" name="sortLogs"  id="client-birthday" type="radio" value="order_created"  v-model="sortBy"><span class="checkmark"></span></label>Show only created orders</div>
               <div class="filter-list">Clients</div>
               <div class="order_users"><label class="custom-checkbox mr-2"><input ref="client-filter" name="sortLogs"   id="created" type="radio" value="client_deleted clients_deleted"  v-model="sortBy"><span class="checkmark"></span></label>Show only deleted clients</div>
             </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button class="app-buttons-item" @click="selectDate(new Date(), -1)"><img src="../../assets/icons/yesterday.svg"><span>Yesterday</span></button>
        <button class="app-buttons-item" @click="selectDate(new Date())"><img src="../../assets/icons/yesterday.svg"><span>Today</span></button>
        <button class="app-buttons-item"><img src="../../assets/icons/yesterday.svg"><input :value="between_value"  class="date-pick" id="datepicker" readonly></button>
      </div>
    </div>
    <div class="main-search d-flex align-items-center">
      <img src="../../assets/icons/search-icon.svg">
      <input class="main-input" type="text" placeholder="Search" v-model="search">
    </div>
  </div>

  <div class="d-flex main-content-header justify-content-between align-items-center">
     <div class="table-head" style="width: 60%;">Operation name</div>
     <div class="table-head" style="width: 20%;">User</div>
     <div class="table-head" style="width: 20%;">Date and time</div>
  </div>
  <div class="table-content">
    <LogItem v-bind:logs="logsList"/>
  </div>

</div>
</template>

<script>
import LogItem from "@/components/Log/LogItem";
export default {
  name: "Log",
  components:{
    LogItem
  },
  data(){
    return{
        logs:[],
        between_value:'',
        startDate:'',
        endDate:'',
        search:"",
        employees:[],
        selectedEmployee: '',
        sortBy: ""
    }
  },
  computed:{
        logsList() {
            return this.logs.filter((log) =>{
                if(log.title.toLowerCase().includes(this.search.toLowerCase()) || log.user.toLowerCase().includes(this.search.toLowerCase())){
                    
                    if(this.selectedEmployee && (this.selectedEmployee != log.user_id)){
                        return false;
                    }
                    if(this.sortBy && !this.sortBy.includes(log.type)){
                        return false;
                    }

                    return log
                }
                return false;
            });
        }
  },
  methods:{
        changeTitle(objects){
            return objects.map((log) =>{
                log.title = this.replaceText(log.type + ' ' +log.title)
                return log
            });
        },
        replaceText(text){
            return this.replaceTxt(text, "en")
        },
        getLogs(){
            this.axios.get(this.url('getLogs'),{ 
                params: {
                    start: this.startDate,
                    end: this.endDate
                }
            }).then((response) => {
                this.logs = this.changeTitle(response.data.objects);
            })
        },
        getEmployees(){
            this.axios.get(this.url('getEmployees')).
            then((response) => {
                this.employees = response.data.objects;
            })
        },
        selectDate(date, add_day=0){
            this.startDate = this.$moment(date).add(add_day, "days").format("YYYY-MM-DD")
            this.endDate = this.$moment(date).add(add_day, "days").format("YYYY-MM-DD")
            this.between_value = this.startDate + ' to ' + this.endDate;
            this.getLogs()
        }
  },
  mounted(){
      
      new this.$lightpick({
        field: document.getElementById('datepicker'),
        singleDate: false,
        numberOfMonths: 2,
        numberOfColumns:2,
        format:'YYYY-MM-DD',
        onSelect: (start,end)=>{
          var str = '';
          str += start ? start.format('YYYY-MM-DD') + ' to ' : '';
          str += end ? end.format('YYYY-MM-DD') : '...';
          this.between_value = str;
          
          this.startDate = start.format('YYYY-MM-DD')
          if(start && end){
              this.endDate = end.format('YYYY-MM-DD')
              this.getLogs()
          }
      }
    });
    let to_date = this.$moment().subtract(1, "days").format("YYYY-MM-DD")
    let from_date = this.$moment().format('YYYY-MM-DD')
    this.between_value = to_date + ' to ' + from_date;
    this.startDate = to_date
    this.endDate = from_date
    this.getLogs()
    this.getEmployees()
  }
}
</script>

<style scoped>
.log-filter{
  margin-top: 44px;
}
.order_users{
  font-size: 14px;
}
.filter-list{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F4F4F4;
  padding-bottom: 5px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 400;
}
.filter-select{
  height: 30px;
  font-size: 14px;

}

.general-dropdown{
  width: 19rem;
}
.filter-dropdown{
  padding: 17px;
}
.main-content-header{
  padding-right:10px;
}
.log{
  margin: 0 30px;
}
.date-pick::placeholder{
  color: #606877;
  opacity: 1;
}

.date-pick{

  width:182px;
  height: 20px;
  background: none;
  border:none;
  cursor:pointer;
  color:#606877;
}/*====================Radio  toolbaar baschback*/
.radio-toolbar-gender input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.radio-toolbar-gender label {
  display: inline-block;
  margin-bottom: 0;
  margin-right: 10px;
  width: 13px;
  height: 13px;
  border: 1px solid #E3E3E3;
  box-sizing: border-box;
  border-radius:3px;
}

.radio-toolbar-gender input[type="radio"]:checked + label {
  background-color: #616cf5;
  border: none;
}
.male{
  font-size: 14px;
}
</style>