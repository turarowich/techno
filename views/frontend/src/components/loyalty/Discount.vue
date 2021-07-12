<template>
<div class="discount">
  <div class="row">
    <div class="col-lg-9">
      <div class="mb-2 d-flex">
        <label class="switch d-flex">
          <input @change="updateStatus" type="checkbox" v-model="status">
          <span class="slider round"></span>
        </label>
        <h2 class="cashback-title">Discount</h2>
      </div>
      <p class="mb-5 cashback-description">Increase customer loyalty with the help of this tool</p>

      <div class="discount-labels d-flex align-items-center">
        <div style="width:60%" class="cashback-sub-title">Discounting system</div>
        <div style="width:18%">Discount in %</div>
        <div style="width:18%">Min sum of purchases</div>
      </div>

      <div class="discount-inputs d-flex align-items-center">
        <input v-model="current_discount.name" style="width:65%" class="cashback-input">
        <input v-model="current_discount.percentage" min="0" type="number" style="width:18%" class="cashback-input">
        <input v-model="current_discount.min_sum" min="0" type="number" style="width:18%" class="cashback-input">
        <button @click="add" class="discount-btn"><img src="../../assets/icons/enable+.svg"></button>
      </div>
      <div class="selectedItems_list">
        <div class="selectedItem" v-for="item in list_of_discounts" :key="item._id">
          <div class="discount_list_item_name">{{item.name}}</div>
          <div class="discount_list_item_percentage">{{item.discount_percentage}}</div>
          <div class="discount_list_item_min_sum">{{item.min_sum_of_purchases}}</div>

          <div @click="removeDiscount(item._id)" :this_id="item.id" class="selectedItems_remove" style="flex: 0 0 44px;">
            <img alt="x" src="../../assets/icons/x.svg">
          </div>
        </div>
      </div>
<!--      <button class="save">Save</button>-->
    </div>
  </div>
</div>
</template>

<script>
import Swal from "sweetalert2";
import $ from "jquery";

export default {
  name: "Discount",
  data(){
    return {
      status:false,
      id:'',
      current_discount:{
        name:'',
        percentage: 0,
        min_sum: 0,
      },
      list_of_discounts:[],
    }
  },
  methods:{
    add(){
        let messages = [];
        if(this.current_discount.name===''){messages.push('Enter the name of the discount')}
        if(this.current_discount.percentage==='' || this.current_discount.percentage<=0){messages.push('Enter discount percentage')}
        if(this.current_discount.percentage>100){messages.push('Percentage cannot be more than 100')}
        if(this.current_discount.min_sum==='' || this.current_discount.min_sum<=0){messages.push('Enter discount min sum')}
        if(messages.length>=1){this.displayMessages(messages,"Errors");return}
        //if ok
        let copy = $.extend(true,{},this.current_discount);
        // let new_list_of_discounts = this.list_of_discounts
        // new_list_of_discounts.push(copy);

        let that=this;
        let url = this.base_url+'/api/addDiscount';
        this.axios.post(url,
            copy
        ).then((response)=> {
            this.list_of_discounts = response.data.discounts;
        }).catch((error)=>{
            if(error.response.data && !error.response.data.errors){
                this.$warningAlert(error.response.data.msg)
            }
            if (error.response) {
            // console.log(error.response.status);
            // console.log(error.response.headers);
            that.displayMessages(Object.values(error.response.data.errors),"Errors");
        }
      });

      this.current_discount.name = '';
      this.current_discount.percentage = 0;
      this.current_discount.min_sum = 0;
    },
    removeDiscount(id){
      let that = this;
      let url = this.base_url+'/api/deleteDiscount/'+id;
      this.axios.delete(url).then(function (response) {
        that.list_of_discounts = response.data.discounts;
        that.displayMessages(['Removed'],"Success");
      }).catch((error)=>{
            if(error.response.data && !error.response.data.errors){
                this.$warningAlert(error.response.data.msg)
            }
            if (error.response) {
            // console.log(error.response.status);
            // console.log(error.response.headers);

                that.displayMessages(Object.values(error.response.data.errors),"Errors");

            }
      });

    },
    updateStatus(){
      console.log('s')
      let that = this;
      let url = this.base_url+'/api/updateCashback/'+that.id;
      this.axios.post(url, {
        discounts_status:that.status,
      }).then(function (response) {
        console.log(response);
        that.displayMessages(['Updated'],"Success");
      }).catch((error)=>{
            if(error.response.data && !error.response.data.errors){
                that.status = !that.status
                this.$warningAlert(error.response.data.msg)
            }
            if (error.response) {
            // console.log(error.response.status);
            // console.log(error.response.headers);

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
  watch:{
  },
  beforeCreate(){
    let that = this;
    this.axios
      .get(this.base_url +'/api/getCashback')
      .then(function (response){
        let cashback = response.data.object;
        that.status = cashback.discounts_status;
        that.id= cashback._id;
      })
    this.axios
      .get(this.base_url +'/api/getDiscounts')
      .then(function (response){
        that.list_of_discounts = response.data.discounts;
      })
  },
}
</script>

<style scoped>
.save{
  width: 120px;
}
.discount-btn{
  height: 45px;
  flex: 0 0 45px;
  border-radius:5px;
  background: none;
  border:1px solid #616cf5;
}
.discount-inputs input{
  margin-right:10px;
}
.discount-inputs{
  margin-bottom: 14px;
}
.discount-labels{
  margin-bottom: 10px;
}
.save{
  margin-top: 50px;
}
.selectedItem{
  display: flex;
  margin-bottom: 3px;
}
.selectedItem div{
  height: 45px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
.discount_list_item_name{
  flex:65%;
  padding: 5px;
}
.discount_list_item_percentage{
  flex:18%;
  margin: 0 10px;
  padding: 5px;
}
.discount_list_item_min_sum{
  flex:18%;
  padding: 5px;
}
.selectedItems_remove{
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex:0 0 45px;
  border-radius: 5px;
  border: 1px solid black!important;
}
</style>