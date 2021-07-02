<template>
<div class="log">
  <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
       <div class="dropdown filter-drops">
          <button class="app-buttons-item dropdown-toggle"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            <img class="img-btn" src="../../assets/icons/filter.svg"><span>Filter</span>
          </button>

          <div class="dropdown-menu general-dropdown" aria-labelledby="dropdownMenuButton">
            <div class="filter-dropdown">
              <h3 class="drop-title">By price</h3>
              <div class="d-flex">
                <input placeholder="0" v-model="price_from"  type="number" class="drop-input">
                <div class="d-flex">
                  <label class="mr-2 pl-2">to</label>
                  <input placeholder="0" v-model="price_to" type="number"  class="drop-input">
                </div>
              </div>
              <h3 class="drop-title">Sort by</h3>
              <select  v-model="filter_by_status" class="filter-select form-control form-control-sm mb-2" aria-label=".form-select-lg example">
                <option value="">All</option>
                <option value="Done">Done</option>
                <option value="In Progress">In process</option>
                <option value="Canceled">Canceled</option>
                <option value="New">New</option>
              </select>
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
         search:""
    }
  },
  computed:{
        logsList() {
            return this.logs.filter((log) =>{
                if(log.title.toLowerCase().includes(this.search.toLowerCase()) || log.user.toLowerCase().includes(this.search.toLowerCase())){
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
  }
}
</script>

<style scoped>
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
}
</style>