<template>
<div class="row cashback">
  <div class="col-lg-6">
    <div class="mb-4">
        <div class="d-flex enable-title">
          <label class="switch d-flex">
            <input type="checkbox" v-model="status">
            <span class="slider round"></span>
          </label>
          <h2 class="cashback-title">Cashback</h2>
        </div>
       <p class="cashback-description">Increase customer loyalty with the help of this tool</p>
    </div>

    <div class="minimum-cashback">
      <h3 class="cashback-sub-title">Default cashback %</h3>
      <div class="d-flex align-items-center">
        <input type="number" v-model="default_cashback" style="width:40%" class="cashback-input mr-3">
        <span style="width:40%" class="cashback-description mb-0">Если ничего не выбрано, кэшбэк действует на все товары и услуги</span>
      </div>
    </div>
    <div class="minimum-cashback">
      <h3 class="cashback-sub-title">Minimum cashback amount</h3>
      <div class="d-flex align-items-center">
        <input type="number" v-model="min_cashback" style="width:40%" class="cashback-input mr-3">
        <span style="width:40%" class="cashback-description mb-0">Enter the minimum amount to activate cashback</span>
      </div>
    </div>

    <div class="d-flex cashback-sub-title">
      <div class="search_product_input">Select product or service</div>
      <div class="cashback_percentage_input">%</div>
      <div class="cashback_fixed_input">or fixed</div>
      <div class="cashback_fixed_input" style="flex:0 0 45px;"></div>
    </div>
    <div class="d-flex search_n_add_block">
      <input v-model="searchText" @input="searchProdSer" class="search_product_input" type="text">
      <input v-model="current_percentage_cashback" class="cashback_percentage_input" type="number" min="0">
      <input v-model="current_fixed_cashback" class="cashback_fixed_input" type="number" min="0">
      <div @click="addSelectedItem" class="add_product_to_cashback">
        <img src="../../assets/icons/enable+.svg">
      </div>
    </div>
    <div v-if="searchResult &&(searchResult.length>0)" class="position-relative" style="margin-bottom: 30px">
      <div class="resultList">

        <div  class="result-item" @click="setSelectedItem(prod.name,prod._id)" v-for="prod in searchResult" :key="prod._id">
          {{prod.name}}
        </div>
<!--      <div @click="setSelectedItem(serve.name,serve._id,'service')" v-for="serve in searchResult.services" :key="serve._id">-->
<!--          {{serve.name}}-->
<!--        </div>-->
      </div>
    </div>


    <div class="selectedItems_list">
      <div class="selectedItem" v-for="item in selectedItemsList" :key="item._id">
        <div class="search_product_input">{{item.name}}</div>
        <div class="cashback_percentage_input">{{item.percentage_cashback}}</div>
        <div class="cashback_fixed_input">{{item.fixed_cashback}}</div>
        <div @click="removeSelectedItem(item.id)" :this_id="item.id" class="selectedItems_remove border-none" style="flex: 0 0 44px;">
          <img alt="x" src="../../assets/icons/x.svg">
        </div>
      </div>
    </div>

  <div class="box-switches">
      <div class="d-flex enable-title align-items-center">
        <label class="switch d-flex ">
          <input type="checkbox" v-model="welcome_points_status">
          <span class="slider round"></span>
        </label>
        <h2 class="cashback-sub-title mb-0">Welcome points</h2>
      </div>
      <p class="cashback-description">Increase customer loyalty with the help of this tool</p>
      <input type="number" v-model="welcome_points_quant" class="cashback-input" style="width:40%">
  </div>
    <div class="box-switches">
      <div class="d-flex enable-title align-items-center">
        <label class="switch d-flex ">
          <input type="checkbox" v-model="share_points_status">
          <span class="slider round"></span>
        </label>
        <h2 class="cashback-sub-title mb-0">Share with a friend</h2>
      </div>
      <p class="cashback-description">Increase customer loyalty with the help of this tool</p>
      <input type="number" v-model="share_points_quant" class="cashback-input" style="width:40%">
    </div>
    <div class="radio-toolbar">
      <div class="d-flex align-items-center mr-4">
        <input type="radio" id="radioShopping" name="charge" value="buy" v-model="grant_points_when" :checked="grant_points_when == 'buy'">
        <label for="radioShopping"></label>
        <span class="male">Charge at shopping</span>
      </div>
      <div class="d-flex align-items-center">
        <input type="radio" id="radioRegistration" name="charge" value="register" v-model="grant_points_when" :checked="grant_points_when == 'register'">
        <label for="radioRegistration"></label>
        <span class="maled">Charge at registration</span>
      </div>
    </div>
    <button @click="save" class="save">Save</button>
  </div>

<!---------------------------- Right Side  ------------------------------------------>

  <div class="col-lg-5 cashback-right">
    <div class="marginBottom"><h2 class="cashback-title">Birthday Points</h2></div>
    <div class="d-flex enable-title">
      <div>
        <label class="switch">
          <input type="checkbox" v-model="birthday_points_status">
          <span class="slider round"></span>
        </label>
      </div>
      <h3 class="cashback-sub-title">Auto push</h3>
    </div>
    <p class="cashback-description">Automatic accrual of points to the client on his birthday.</p>
    <div class="mb-3">
        <label class="sum-point">Sum of points</label><br>
        <input type="number" v-model="birthday_points_quant" class="cashback-input mb-2">
        <p class="cashback-description ">If the number of points awarded is zero, the client will receive a regular text greeting</p>
    </div>
    <div class="mb-3">
        <p class="sum-point">Title</p>
        <input v-model="bday_message_title" class="cashback-input" placeholder="Add title">
    </div>
    <div class="mb-3">
      <p class="sum-point">Conguratulations text</p>
      <textarea v-model="bday_message_body"  class="cashback-text-area" placeholder="For your soon birthday we give you 500 points for yournext purchase!"></textarea>
    </div>
    <div class="d-flex enable-title">
      <div>
        <label class="switch">
          <input type="checkbox" data-toggle="collapse"  v-model="points_lifetime_status">
          <span class="slider round"></span>
        </label>
      </div>
      <h3 class="cashback-sub-title">Limit the lifetime of points</h3>
    </div>
    <p class="cashback-description mb-4">The period is counted from the first accrual of points.
      At the end of the term, all customer points will be canceled</p>

    <div v-if="points_lifetime_status">
      <label>Points expires after days:</label><br>
      <input type="number" v-model="points_expiration_period" class="cashback-input" style="width:40%">
    </div>

  </div>

</div>
</template>

<script>

import Swal from "sweetalert2";
import $ from "jquery";

export default {
  name: "CashBack",
  data(){
      return{
        birthday_points_quant: 0,
        birthday_points_status: false,
        grant_points_when: "buy",
        default_cashback: 0,
        min_cashback: 0,
        points_expiration_period: 0,
        points_lifetime_status: false,
        share_points_quant: 0,
        share_points_status: false,
        status: false,
        welcome_points_quant: 0,
        welcome_points_status: false,
        bday_message_body: '',
        bday_message_title: '',
        id: '',
        current_percentage_cashback:0,
        current_fixed_cashback:0,
        searchText:'',
        searchResult:[],
        selectedItemsList:[],
        currentSelectedItem:{
          name:'',
          id:'',
          percentage_cashback:0,
          fixed_cashback:0,
        },
      }
  },
  methods: {
    searchProdSer(){
      let that = this;
      if(this.searchText.length ===0){
        that.searchResult = [];
        return;
      }
      this.axios.get(this.url('searchProductService'),{
        params: {
          "type":'all',
          "search":this.searchText,
        }
      }).then(function(response){
        console.log(response,"reponse");
        that.searchResult = response.data.objects;
      });

    },
    setSelectedItem(name,id){
      this.searchText = name;
      this.currentSelectedItem.name = name;
      this.currentSelectedItem.id = id;
      // this.currentSelectedItem.type = type;
      this.searchResult = [];
    },
    addSelectedItem(){
      if(parseFloat(this.current_fixed_cashback)+parseFloat(this.current_percentage_cashback)<1){
        Swal.fire({
          timer:1500,
          title:'Add item',
          text:"Set cashback",
          showConfirmButton:false,
          position: 'top-right',
          customClass:{
            popup:'success-popup information-popup',
            content:'success-content',
            title:'success-title',
            header:'success-header',
            image:'success-img'
          },
          showClass:{
            popup: 'animate__animated animate__zoomIn'
          }
        })
        return ;
      }
      this.currentSelectedItem.percentage_cashback = this.current_percentage_cashback;
      this.currentSelectedItem.fixed_cashback = this.current_fixed_cashback;

      if(this.currentSelectedItem.id !=='' && this.currentSelectedItem.name !==''){
        let copy = $.extend(true,{},this.currentSelectedItem);
        //check if its already has been selected
        let check = this.selectedItemsList.filter(function(e){
          return e.id == copy.id;
        })
        if(check.length > 0){
          Swal.fire({
            timer:1500,
            title:'Add item',
            text:"Already selected",
            showConfirmButton:false,
            position: 'top-right',
            customClass:{
              popup:'success-popup information-popup',
              content:'success-content',
              title:'success-title',
              header:'success-header',
              image:'success-img'
            },
            showClass:{
              popup: 'animate__animated animate__zoomIn'
            }
          })
          return
        }
        this.selectedItemsList.push(copy)
        //reset values
        this.searchText = '';
        this.current_fixed_cashback = 0;
        this.current_percentage_cashback = 0;
        this.currentSelectedItem.name = '';
        this.currentSelectedItem.id = '';
        this.currentSelectedItem.type = '';
        this.currentSelectedItem.fixed_cashback = 0;
        this.currentSelectedItem.percentage_cashback = 0;

      }else{
        Swal.fire({
          timer:1500,
          title:'Add item',
          text:"Select an item",
          showConfirmButton:false,
          position: 'top-right',
          customClass:{
            popup:'success-popup information-popup',
            content:'success-content',
            title:'success-title',
            header:'success-header',
            image:'success-img'
          },
          showClass:{
            popup: 'animate__animated animate__zoomIn'
          }
        })
      }

    },
    removeSelectedItem(id){
      this.selectedItemsList = this.selectedItemsList.filter(function(e){
        return e.id !== id;
      })
    },
    save() {
      let that = this;

      let messages = [];
      console.log(this.default_cashback);
      if(this.default_cashback<0){messages.push('Default cashback has to be a positive number')}
      if(this.default_cashback>100){messages.push('Percentage cannot be more than 100')}
      if(0>this.min_cashback){messages.push('Min cashback amount has to be a positive number')}
      if(0>this.welcome_points_quant){messages.push('Welcome points has to be a positive number')}
      if(0>this.share_points_quant){messages.push('Share points has to be a positive number')}
      if(0>this.birthday_points_quant){messages.push('Birthday points has to be a positive number')}

      if(messages.length>=1){this.displayMessages(messages,"Errors");return}

      let url = this.url('updateCashback',that.id);
      this.axios.post(url, {
        birthday_points_quant:that.birthday_points_quant || 0,
        birthday_points_status:that.birthday_points_status,
        grant_points_when:that.grant_points_when,
        default_cashback:that.default_cashback || 0,
        min_cashback:that.min_cashback || 0,
        points_expiration_period:that.points_expiration_period || 0,
        points_lifetime_status:that.points_lifetime_status,
        selectedItemsList:that.selectedItemsList,
        share_points_quant:that.share_points_quant || 0,
        share_points_status:that.share_points_status,
        status:that.status,
        welcome_points_quant:that.welcome_points_quant || 0,
        welcome_points_status:that.welcome_points_status,
        bday_message_body:that.bday_message_body,
        bday_message_title:that.bday_message_title,
      }).then(function (response) {
        console.log(response);
        that.displayMessages(['Updated'],"Success");
      }).catch((error)=>{
        if (error.response) {
          // console.log(error.response.status);
          // console.log(error.response.headers);
            if(error.response.data && !error.response.data.errors){
                this.$warningAlert(error.response.data.msg)
            }
            that.displayMessages(Object.values(error.response.data.errors),"Errors");
            
        }
      });
    },
    displayMessages(array,title){
      let message = '';
      array.forEach(item=>message+=`${item}<br>`)
      Swal.fire({
        timer:2000,
        title:title,
        showConfirmButton:false,
        html: message,
        position: 'top-right',
        customClass:{
          popup:'success-popup information-popup',
          content:'success-content',
          title:'success-title',
          header:'success-header',
          image:'success-img'
        },
        showClass:{
          popup: 'animate__animated animate__zoomIn'
        }
      })
    },
  },
  watch: {
    current_percentage_cashback: {
      // eslint-disable-next-line no-unused-vars
      handler(val, oldVal) {
        if(val>0){
          this.current_fixed_cashback = 0;
        }
      },
      deep: true,
      immediate: true
    },
    current_fixed_cashback: {
      // eslint-disable-next-line no-unused-vars
      handler(val, oldVal) {
        if(val>0){
          this.current_percentage_cashback = 0;
        }
      },
      deep: true,
      immediate: true
    },
  },
  beforeCreate(){
    let that = this;
    this.axios
        .get(this.url('getCashback'))
        .then(function (response){
          let cashback = response.data.cashback;
          console.log(cashback);
          that.status = cashback.status;
          that.birthday_points_quant = cashback.birthday_points_quant;
          that.birthday_points_status = cashback.birthday_points_status;
          that.grant_points_when = cashback.grant_points_when;
          that.min_cashback = cashback.min_cashback;
          that.default_cashback = cashback.default_cashback;
          that.points_expiration_period = cashback.points_expiration_period;
          that.points_lifetime_status = cashback.points_lifetime_status;
          that.selectedItemsList = cashback.selectedItemsList;
          that.share_points_quant = cashback.share_points_quant;
          that.share_points_status = cashback.share_points_status;
          that.welcome_points_quant = cashback.welcome_points_quant;
          that.welcome_points_status = cashback.welcome_points_status;
          that.bday_message_body= cashback.bday_message_body;
          that.bday_message_title= cashback.bday_message_title;
          that.id= cashback._id;
        })
  },
}
</script>

<style scoped>
.selectedItems_list{
  max-height: 300px;
  overflow-y: auto;
}

.result-item{
  padding:7px 10px;
}
.result-item:hover{
  background: #F8F9FF;
  transition:.3s;
}
.cashback-right .cashback-input{
  width: 100%;
}
.minimum-cashback{
  margin-bottom: 25px;
}
.minimum-cashback h3{
  margin-bottom: 15px;
}
.minimum-cashback .cashback-description{
  line-height: 20.8px;
}
.box-switches{
  margin-bottom: 30px;
}

.cashback{
  padding-bottom:60px;
}

.select-left{
  width: 70%;
  margin-right: 10px;
}
.select-left input{
  width: 100%;
}
.select-right{
  width: 30%;
}
.select-right input{
  width: 60%;
  margin-right: 10px;
}

.limit-points{
  margin-bottom: 15px;
}
.limit-input{
  margin-bottom: 40px;
}
.search_n_add_block{
  margin-bottom: 25px;
}
.search_n_add_block input{
  width: 100%;
  display: flex;
  height: 45px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
}
.search_product_input{
  flex:60%;
  padding: 5px;
}
.cashback_percentage_input{
  flex:15%;
  margin: 0 5px;
  padding: 5px;
}
.cashback_fixed_input{
  flex:15%;
  padding: 5px;
}
.add_product_to_cashback{
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex:0 0 45px;
  border-radius: 5px;
  border: 1px solid #616CF5;
}
.resultList{
  position: absolute;
  background: white;
  width: 100%;
  z-index: 2;
  box-shadow: 2px 11px 35px rgba(0, 0, 0, 0.1);



}
.resultList div{
  cursor: pointer;
}
.selectedItems_list{
  margin-bottom: 25px;
}
.selectedItem{
  display: flex;
  margin-bottom: 10px;
}
.selectedItem div{
  height: 45px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
.selectedItems_remove{
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex:0 0 45px;
  border-radius: 5px;
  border: none !important;
}
</style>