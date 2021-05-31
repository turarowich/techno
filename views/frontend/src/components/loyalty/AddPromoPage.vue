<template>
<div class="add-promo">
  <div class="notification-header">
    <router-link to="/loyalty/promocode">
      <img  class="mr-2" src="../../assets/icons/xBlack.svg">
    </router-link>
    <h3 v-if="editState">Edit promocode</h3>
    <h3 v-else>Add promocode</h3>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-11 m-auto">
        <div class="row">
          <div class="col-lg-8">
            <form  class="modal-form ">
              <div class="label-input">
                <label class="promo-label">Name {{name}}</label><br>
                <input v-model="name" placeholder="Promocode for shoes" class="cashback-input promo-input"/>
              </div>

              <div class="d-flex disc-box">
                <div style="width:50%" class="mr-3">
                  <label class="promo-label">Discount</label><br>
                  <input v-model="discount" type="number" min="0" max="100" placeholder="0%" class="cashback-input promo-input">
                </div>
                <div style="width:50%">
                  <label  class="promo-label">Fixed sum</label><br>
                  <input v-model="fixedSum" type="number" min="0" class="cashback-input promo-input">
                </div>
              </div>
              <div class="period">
                <label class="period-title">Validity period</label>
                <div class="d-flex">
                  <div style="width:50%" class=" mr-2 d-flex align-items-center">
                    <label class="promo-label">From</label>
                    <div class="calendar-period d-flex align-items-center">
                      <input v-model="fromDate.formatted" id="demo-1">
                      <img src="../../assets/icons/Calendar.svg">
                    </div>
                  </div>
                  <div style="width:50%" class="d-flex align-items-center mr-0">
                    <label class="promo-label">To</label>
                    <div class="calendar-period d-flex align-items-center">
                      <input v-model="toDate.formatted" id="demo-2">
                      <img src="../../assets/icons/Calendar.svg">
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label class="valid-for">Valid for</label>
                <div class="personal-btns">
                  <div type="Service" class="btns-item active"><span class="btn-round"></span>services</div>
                  <div type="Product" class="btns-item"><span class="btn-round"></span>products</div>
                  <div type="all" class="btns-item mr-0"><span class="btn-round"></span>on everything</div>
                </div>
              </div>
              <div class="services">
                <label class="promo-label">Select service</label><br>
                <div class="d-flex">
                  <div class="w-100 mr-2 position-relative">
                    <input v-model="searchText" @input="searchProdSer" placeholder="+ all services or category" class="cashback-input promo-input">
                    <div v-if="searchResult.length>0" class="resultList">
                      <div @click="setSelectedItem(prod.name,prod._id,prod.type)" v-for="prod in searchResult" :key="prod._id">
                        {{prod.name}}
                      </div>
                    </div>
                  </div>
                  <button @click="addSelectedItem" type="button" class="promo-btn"><img src="../../assets/icons/enable+.svg"></button>
                </div>
                <div class="mt-3">
                  <div class="selectedItems" v-for="item in selectedItemsList" :key="item._id">
                    <div class="selectedItems_TEXT">
                      <div>
                        {{item.name}}
                      </div>
                      <div>
                        {{item.type}}
                      </div>
                    </div>
                    <div @click="removeSelectedItem(item.id)" :this_id="item.id" class="selectedItems_remove" style="flex: 0 0 44px;">
                      <img alt="x" src="../../assets/icons/x.svg">
                    </div>
                  </div>
                </div>
              </div>
              <div class="promo-time d-flex  align-items-end">
                <div style="width:25%" class="terms">
                  <label class="promo-label">Terms of use</label>
                  <div>1 client</div>
                </div>
                <div style="width:27%" class="time">
                  <label class="promo-label">Number of times</label>
                  <input v-model="numberOfUses" type="number" min="0" class="cashback-input" placeholder="1">
                </div>
                <div style="width:50%">
                  <p class="time-text">
                    Enter how many times the promo code can be used by default this is one
                  </p>
                </div>
              </div>

              <div class="modal-btn d-flex">
                <button type="button" v-if="editState" @click="savePromocode" class="save">Update</button>
                <button type="button" v-else @click="savePromocode" class="save">Save</button>
                <router-link to="/loyalty/promocode"><button type="button" class="cancel">Cancel</button></router-link>
              </div>
            </form>
          </div>
          <div class="col-lg-4">
            <label class="promo-label">Code</label>
            <div class="reload-code mr-0 mb-4 d-flex align-items-center">
              <input type="text" v-model="generatedCode">
              <img @click="generateCode" src="../../assets/icons/Reload.svg">
            </div>
            <label class="promo-label">Promo code is valid</label><br>
            <input v-model="minSum" type="number" min="0" placeholder="minimum sum" class="cashback-input promo-input">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from "jquery";
export default {
  name: "AddPromoPage",
  data(){
    return{
      promocode_id:null,
      name:'',
      generatedCode:'',
      discount:0,
      fixedSum:0,
      minSum:0,
      fromDateLightpick:{},
      fromDate:{
        obj:'',
        formatted:'',
      },
      toDateLightpick:{},
      toDate:{
        obj:'',
        formatted:'',
      },
      selectedType:'service',
      numberOfUses:1,
      searchText:'',
      searchResult:[],
      currentSelectedItem:{
        type:'',
        name:'',
        id:'',
      },
      selectedItemsList:[],
    }
  },
  computed:{
    editState(){
      return this.$store.getters['Promocode/getEditState'];
    }
  },
  methods:{
    selectDates(){
      let that=this;
      this.fromDateLightpick = new this.$lightpick({
        field: document.getElementById('demo-1'),
        onSelect: function(date){
          that.fromDate.obj = date;
          that.fromDate.formatted = date.format('DD.MM.YYYY');
        }
      });
      this.toDateLightpick = new this.$lightpick({
        field: document.getElementById('demo-2'),
        onSelect: function(date){
          that.toDate.obj = date;
          that.toDate.formatted = date.format('DD.MM.YYYY');
        }
      });
    },
    addActive(){
      let that = this;
      $(document).ready(function() {
        $('.btns-item').click(function() {
          $('.btns-item.active').removeClass("active");
          $(this).addClass("active");
          that.selectedType = $(this).attr('type');
        });
      });
    },
    generateCode(){
      let length = 12;
      let result           = [];
      let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
      }
      this.generatedCode = result.join('');
    },
    searchProdSer(){
      let that = this;
      if(this.searchText.length ===0){
        that.searchResult = [];
        return;
      }
      this.axios.get(this.url('searchProductService'),{
        params: {
          "type":this.selectedType,
          "search":this.searchText,
        }
      }).then(function(response){
        that.searchResult = response.data.objects;
      });

    },
    setSelectedItem(name,id,type){
      this.searchText = name;
      this.currentSelectedItem.name = name;
      this.currentSelectedItem.id = id;
      this.currentSelectedItem.type = type;
      this.searchResult = [];
    },
    addSelectedItem(){
      let that = this;
      if(this.currentSelectedItem.id !=='' && this.currentSelectedItem.name !=='' && this.currentSelectedItem.type !==''){
        let copy = $.extend(true,{},this.currentSelectedItem);
        //check if its already has been selected
        let check = this.selectedItemsList.filter(function(e){
          return e.id == copy.id;
        })
        if(check.length > 0){
          that.$warningAlert('Already selected');
          return
        }
        this.selectedItemsList.push(copy)
      }else{
        that.$warningAlert('Select an item');
      }
    },
    removeSelectedItem(id){
      this.selectedItemsList = this.selectedItemsList.filter(function(e){
        return e.id !== id;
      })
    },
    savePromocode(){
      let messages = [];
      if(this.name.length<0){messages.push('Fill in Name')}
      if(this.generatedCode.length<0){messages.push('Fill in Code')}
      if(this.discount<=0 && this.fixedSum<=0){
        if(this.discount<=0){messages.push('Fill in Discount')}
        if(this.fixedSum<=0){messages.push('Fill in FixedSum')}
      }
      if(parseInt(this.discount)<0){messages.push('Only positive discount')}
      if(parseInt(this.discount)>100){messages.push('Discount cant be more than 100%')}
      if(this.minSum<=0){messages.push('Fill in MinSum')}
      if(this.fromDate.formatted.length<=0){messages.push('Fill in FromDate')}
      if(this.toDate.formatted.length<=0){messages.push('Fill in ToDate')}
      if(this.selectedType.length<=0){messages.push('Fill in SelectedType')}
      // if(this.selectedItemsList.length<=0){messages.push('Select Services or Products')}
      if(this.numberOfUses<=0){messages.push('NumberOfUses')}
      if(messages.length>=1){this.displayMessages(messages);return}
      let that=this;
      let product_service_ids = this.selectedItemsList.map(function(e){
        return e.id
      })
      let url = this.url('addPromocode');
      if(this.editState){
        url = this.url('updatePromocode');
      }
      this.axios.post(url, {
        'name': this.name,
        'code': this.generatedCode,
        'discount': this.discount,
        'fixed_sum': this.fixedSum,
        'min_sum': this.minSum,
        'startDate': this.fromDate.obj,
        'endDate': this.toDate.obj,
        'selected_type': this.selectedType,
        'selected_items_list': product_service_ids,
        'number_of_uses': this.numberOfUses,
        'promocode_id':this.promocode_id,
      }).then(function (response) {
        console.log(response);
        that.displayMessages(['Added']);
        that.$router.push('/loyalty/promocode')
      }).catch(function(error){
        if (error.response) {
          // console.log(error.response.status);
          // console.log(error.response.headers);
          that.displayMessages(Object.values(error.response.data.errors));
        }
      });
    },
    displayMessages(array){
      let message = '';
      array.forEach(item=>message+=`${item} `);
      this.$warningAlert(message);
    },
  },
  watch: {
    selectedType: {
      handler(val, oldVal) {
        console.log('selectedType list changed',val, oldVal)
      },
      deep: true
    },
    discount: {
      // eslint-disable-next-line no-unused-vars
      handler(val, oldVal) {
        if(val>0){
          this.fixedSum = 0;
        }
      },
      deep: true
    },
    fixedSum: {
      // eslint-disable-next-line no-unused-vars
      handler(val, oldVal) {
        if(val>0){
          this.discount = 0;
        }
      },
      deep: true
    },
  },
  mounted(){
    this.addActive()
    this.selectDates()
    let promocode = this.$store.getters['Promocode/getPromocode'];
    let selectedItemsList = this.$store.getters['Promocode/getSelectedObjects'];

    let selectedItemsList_objects = selectedItemsList.map(elem => (
        {
          id: elem._id,
          name: elem.name,
          type: elem.type
        }
    ));
    if(this.editState ===true && promocode){
      this.promocode_id=promocode._id;
      this.name=promocode.name;
      this.generatedCode=promocode.code;
      this.discount=promocode.percent;
      this.fixedSum=promocode.fixed_sum;
      this.minSum=promocode.min_sum;
      this.selectedType=promocode.selected_type;
      this.numberOfUses=promocode.numberOfUses;
      this.selectedItemsList=selectedItemsList_objects;
      this.fromDateLightpick.setDate(promocode.startDate);
      this.toDateLightpick.setDate(promocode.endDate);
      $('.btns-item.active').removeClass("active");
      $('.btns-item[type=' + this.selectedType + ']').addClass("active");
    }
  }

}
</script>

<style scoped>

.add-promo{
  padding: 0 30px;
  padding-bottom: 50px;
}

.promo-input{
  width: 100%;
}
.label-input{
  margin-bottom: 25px;
}

.period-title{
  margin-bottom: 20px;
}
.disc-box{
  margin-bottom: 30px;
}
.calendar-period{
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  height:45px;
  padding:0 10px;
  width:100%
}
.period{
  margin-bottom: 38px;
}
.period .promo-label{
  margin-bottom: 0;
  margin-right: 10px;
}
.promo-label{
  margin-bottom: 8px;
}
.btns-item{
  width: 33.33%;
}
.valid-for{
  margin-bottom: 15px;
}
.personal-btns{
  margin-bottom: 40px;
}
.promo-btn{
  border: 1px solid #616CF5;
  border-radius: 5px;
  width: 44px;
  height: 44px;
  background: none;
}
.services{
  margin-bottom: 50px;
}
.promo-time input{
  width: 100%;
}
.terms,.time{
  margin-right: 25px;
}

.terms div{
  display: flex;
  align-items: center;
  font-size: 16px;
  height: 45px;
  border-bottom: 1px solid #D3D3D3;
}
.promo-time{
  margin-bottom: 100px;
}

.time-text{
  color:#B0B0B0;
  margin-bottom: 0;
}
.resultList{
  position: absolute;
  background: white;
  width: 100%;
  padding:5px;
  border: 1px solid grey;
  border-radius: 5px;
  margin-top: 2px;
}
.resultList div{
  cursor: pointer;
}
.selectedItems{
  height: 45px;
  display: flex;
}
.selectedItems div{
  flex: 1;
}

.selectedItems_TEXT{
  border: 2px solid #252726;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-right: 6px;
  padding: 5px;
}
.selectedItems_remove{
  border: 2px solid #252726;
  border-radius: 5px;
  flex: 0 0 44px;
  display: flex;
  justify-content: center;
}
</style>