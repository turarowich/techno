<template>
  <div class="modal fade right"  id="add-push" tabindex="-1" role="dialog" aria-labelledby="add-promocode" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: calc(100% - 250px);" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header align-items-center">
          <h3 class="modal-title">Add push</h3>
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
          </button>
        </div>
        <div class=" myModal-body">
          <form  class="modal-form ">
            <div class="row">
              <div class="col-lg-6">
                <div class="d-flex client-all justify-content-between">
                  <h4 class="push-title">Clients</h4>
                  <div class="d-flex align-items-center">
                    <div class="table-head "><label class="custom-checkbox mr-2 "><input type="checkbox"><span class="checkmark"></span></label></div>
                    <span class="send-all">Send to all</span>
                  </div>
                </div>

                <div class="main-search d-flex align-items-center ">
                  <img src="../../assets/icons/search-icon.svg">
                  <input class="main-input" type="text" placeholder="Search" v-model="search_client">
                </div>
                <div class="parent-order-client">
                  <div v-if="search_client.length !==0" class="child-order-client">
                    <div v-if="filteredClients.length === 0">
                      <div class="pl-3">There is not clients</div>
                    </div>
                    <div v-else v-for="client in filteredClients" :key="client._id"  @click="selectClient(client)" class="table-child d-flex align-items-center">
                      <div class="table-img">
                        <img src="../../assets/img/sneak.webp">
                      </div>
                      <div>
                        <h4 class="general-title">{{client.name}}</h4>
                        <span class="client-phone-order">{{client.phone}}</span>
                      </div>
                    </div>

                  </div>
                </div>



               <div class="all-clients">
                 <div class="choosed-client d-flex justify-content-between align-items-center">
                   <div class="d-flex align-items-center">
                     <div class="category-logo d-flex justify-content-center align-items-center">V</div>
                     <div class="category">
                       <div class="category-name">Category vip</div>
                       <span class="category-people">45 people</span>
                     </div>
                   </div>


                   <img src="../../assets/icons/deleteClient.svg">
                 </div>
               </div>

                <div class="d-flex">
                  <button class="save mr-2" @click.prevent="close">Save</button>
                  <button class="cancel">Cancel</button>
                </div>
              </div>

<!-------------------------Right Side --------------------->

              <div class="col-lg-6">
                  <h3 class="push-title settings">Notification settings</h3>

                <div class="radio-toolbar">
                  <div class="d-flex align-items-center mr-4">
                    <input type="radio" id="radioWeek" @click="month_week = 'week'"  name="week"  >
                    <label for="radioWeek"></label>
                    <span class="male">By week</span>
                  </div>
                  <div class="d-flex align-items-center">
                    <input type="radio" id="radioMonth" @click="month_week = 'month'" name="week" >
                    <label for="radioMonth"></label>
                    <span class="maled">By month</span>
                  </div>
                </div>


                <div>
                  <div v-if="month_week === 'week'" class="week" >
                    <div class="days active d-flex justify-content-center align-items-center">MO</div>
                    <div class="days d-flex justify-content-center align-items-center">TU</div>
                    <div class="days d-flex justify-content-center align-items-center">WE</div>
                    <div class="days d-flex justify-content-center align-items-center">TH</div>
                    <div class="days d-flex justify-content-center align-items-center">FR</div>
                    <div class="days d-flex justify-content-center align-items-center">SA</div>
                    <div class="days d-flex justify-content-center align-items-center">SU</div>
                  </div>

                  <div>
                    <input id="push-date" class="cashback-input" placeholder="Select by month" style="width:100%">
                  </div>
                </div>

               <div class="d-flex mb-3">
                 <select class=" form-control long-form-control mr-2  form-control-lg" aria-label=".form-select-lg example">
                   <option>1 month</option>
                   <option>2 month</option>
                   <option>3 month</option>
                   <option>4 month</option>
                   <option>5 month</option>
                   <option>6 month</option>
                   <option>12 month</option>
                 </select>
               <button disabled="true" class=" check cash-btn"><img src="../../assets/icons/enable+.svg"></button>
               </div>

                <div class="titles">
                  <label>Title</label><br>
                  <input class="cashback-input"><br>

                  <label>Description</label><br>
                  <textarea class="general-area"></textarea>
                </div>

                <div class="d-flex mb-3">
                  <select class=" form-control long-form-control mr-2  form-control-lg" aria-label=".form-select-lg example">
                    <option>1 month</option>
                    <option>2 month</option>
                    <option>3 month</option>
                    <option>4 month</option>
                    <option>5 month</option>
                    <option>6 month</option>
                    <option>12 month</option>
                  </select>
                  <button disabled="true" class=" check cash-btn"><img src="../../assets/icons/enable+.svg"></button>
                </div>

                <div class="titles">
                  <label>Title</label><br>
                  <input class="cashback-input"><br>

                  <label>Description</label><br>
                  <textarea class="general-area"></textarea>
                </div>


              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  name: "AddPush",
  data(){
    return {
      clients:[],
      search_client:'',
      month_week:'week',
      clientCategory:[],
      pushData:{
        clients:[],
        category:'',
        by_month:''
      },
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
      this.pushData.clients.push(selected)
      this.search_client = ''
    },
  },
  mounted(){
    this.getCategories()
    this.getClients();
    new this.$lightpick({
      field: document.getElementById('push-date'),
      format:'',
      lang:'en',
      onSelect:(date)=>{
        this.pushData.by_month = date.format().toString().slice(0,16)


      }
    });
  }

}
</script>

<style scoped>
#push-date{
  margin-bottom: 20px;
}
.cashback-input,.form-control{
  height: 40px;
}
.form-control{
  background: none;
}

.cash-btn{
  height: 40px;
  width: 40px;
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
.days.active,.days:hover{
  background: #616cf5;
  transition: .3s;
  color:#fff;
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