<template>
<div>
  <div class="searchAndButtons">
    <div class="d-flex justify-content-between app-buttons">
      <div class="d-flex align-items-center">
        <button v-if="check()" class="app-buttons-item adding-btns" @click="getAddPromocode"><span>+ Add promocode</span></button>

        <button v-if="check()" @click="deleteAllPromocode" class="app-buttons-item"><img src="../../assets/icons/trash_empty.svg"><span>Remove</span></button>
      </div>
    </div>
    <div class="main-search d-flex align-items-center ">
      <img src="../../assets/icons/search-icon.svg">
      <input @input="searchPromocode" class="main-input" type="text" placeholder="Search" v-model="searchText">
    </div>
  </div>
  <div class="d-flex main-content-header">
    <div class="table-head" style="width: 3%;"><label class="custom-checkbox"><input type="checkbox" v-model="selectAll" @change="selectAllPromocode"  ><span class="checkmark"></span></label></div>
    <div class="table-head" style="width: 24%;">Name</div>
    <div class="table-head" style="width: 12%;">User amount</div>
    <div class="table-head" style="width: 13%;">Discount</div>
    <div class="table-head" style="width: 16%;">Code</div>
    <div class="table-head" style="width: 16%; ">Valid until</div>
    <div class="table-head" style="width: 13%;">History</div>
    <div class="table-head" style="width:3%"></div>
  </div>
  <div class="table-content tytyty">
    <div v-for="promocode in promocodes" :key='promocode._id' class="table-item d-flex align-items-center" >
      <div  style="width: 3%;"><label class="custom-checkbox"><input  type="checkbox" v-model="promocode.selected"  @change="checkSelection"><span class="checkmark"></span></label></div>
      <div  class="d-flex align-items-center"  style="width: 24%;">
        {{promocode.name}}
      </div>

      <div  style="width: 12%;">25</div>
      <div  style="width: 13%;">{{promocode.percent}}</div>
      <div  style="width: 16%;">{{promocode.code}}</div>
      <div  style="width: 16%;">{{promocode.endDate.slice(0,10) }}</div>
      <div  style="width: 13%;" >
        <div  v-if="check()" @click="getHistory(promocode.usedBy,promocode.name)" class="history-btn" data-toggle="modal" data-target="#history-promocode">
          <img src="../../assets/icons/History.svg">
        </div>
      </div>
      <div  style="width:3%">
        <div v-if="check()" class="dropleft dropMenu">
          <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img  src="../../assets/icons/three-dots.svg" class="three-dots">
          </div>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
            <ul class="list-group " >
              <li class="list-group-item" @click="getEditPromocode(promocode._id)">Edit</li>
              <li @click="removeAddPromocode(promocode._id)" class="list-group-item">Delete</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
  <AddPromocode/>
  <HistoryPromocode/>


</div>
</template>

<script>
import $ from 'jquery';
import Swal from "sweetalert2";
import AddPromocode from '@/modals/Promocode/AddPromocode'
import HistoryPromocode from "@/modals/Promocode/HistoryPromocode";
export default {
  name: "Promocode",
  data(){
    return{
      searchText:'',
      searchResult:[],
      selectAll:'',
      deletedPromocodes:[]
    }
  },
  components:{
    AddPromocode,
    HistoryPromocode
  },
  computed:{
    promocodes(){
      return this.$store.state.Promocode.promocodes;
    }
  },
  methods:{
    selectAllPromocode(){
      this.promocodes.map(promo=>promo['selected'] = this.selectAll)
    },
    checkSelection(){
      let selected =  this.promocodes.filter(employee => {
        return employee.selected
      })
      this.selectAll = selected.length === this.promocodes.length
    },
    check(access="loyalty", parametr="active", parametr2="canEdit"){
        return this.checkAccess(access, parametr, parametr2)
    },
    getAddPromocode(){
      this.$router.push('/add-promo-page');
      this.$store.dispatch("Promocode/setEditState",false);
    },
    searchPromocode(){
      let that = this;
      if(this.searchText.length ===0){
        this.$store.dispatch("Promocode/setPromocodeAPI",{axios:this.axios,url:this.url('getPromocodes')});
        return;
      }
      this.axios.get(this.url('searchPromocode'),{
        params: {
          "search":this.searchText,
        }
      }).then(function(response){
        that.$store.dispatch("Promocode/setPromocodeFromSearch",response.data.objects);
      });
    },

    getHistory(list,promo_name){
      let that = this;
      let content = '';
      list.forEach(function (item){
        let name = "Guest";
        if(item.user){
          name = item.name;
        }
        let text = `
        <div class="table-item d-flex align-items-center">
          <div  class="d-flex align-items-center"  style="width: 50%;">
            <span class="mr-3">1</span>
            ${name}
          </div>
          <div style="width:40%">
            ${that.$moment(item.date).format('YYYY-MM-DD')}
            </div>
          <div style="width:10%">
            ${item.quantity}
          </div>
        </div>
      `
        content+=text;
      })

      $('#promoHistoryTitle').html(promo_name);
      $('.promoHistoryContent').html(content);
    },
    getEditPromocode(id){
      let that = this;
      this.axios.get(this.url('getPromocode'),{
        params: {
          "promocode":id,
        }
      }).then(function(response){
        that.$store.dispatch("Promocode/setPromocodeObject",response.data.object);
        that.$store.dispatch("Promocode/setPromocodeSelectedObjects",response.data.products);
        that.$store.dispatch("Promocode/setEditState",true);
        that.$router.push('/add-promo-page');
      }).catch((error)=>{
        if(error.response.data && !error.response.data.errors){
          that.$warningAlert(error.response.data.msg)
        }
        console.log(error);
      });
    },
    deleteAllPromocode() {
      this.promocodes.forEach((user)=> {
        if(user.selected){
          this.deletedPromocodes.push(user._id);
        }
      });
      if(this.deletedPromocodes.length>0){
        Swal.fire({
          showConfirmButton: true,
          html: 'Are you sure to remove these<br>promocodes',
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: 'Delete',
          buttonsStyling:false,
          customClass:{
            popup: 'sweet-delete',
            confirmButton: 'confirm-btn',
            cancelButton:'cancel-btn',
            actions:'btn-group',
            content:'content-sweet',
            closeButton:'close-btn'
          },
          showClass: {
            popup: 'animate__animated animate__slideInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }

        }).then((result) => {
          if (result.isConfirmed) {
            this.axios.delete(this.url('deletePromocodes'),{data:{
                objects: this.deletedPromocodes
              }}).then(()=>{
              this.$store.dispatch("Promocode/setPromocodeAPI",{axios:this.axios,url:this.url('getPromocodes')});
              this.deletedPromocodes = []
              this.selectAll = false;
              this.$successAlert('All products have been removed')
            }).catch((error)=>{
              if(error.response && error.response.data){
                this.$warningAlert(error.response.data.msg)
              }
            });
          }
          else{
            this.deletedPromocodes = []
          }
        })
      }


    },
    removeAddPromocode(id){
      Swal.fire({
        showConfirmButton: true,
        html: 'Are you sure to remove this <br>promocode',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        buttonsStyling:false,
        customClass:{
          popup: 'sweet-delete',
          confirmButton: 'confirm-btn',
          cancelButton:'cancel-btn',
          actions:'btn-group',
          content:'content-sweet',
          closeButton:'close-btn'

        },
        showClass: {
          popup: 'animate__animated animate__slideInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }

      }).then((result) => {
        if (result.isConfirmed) {
          let that = this;
          let url = this.url('deletePromocode/'+id);
          this.axios.delete(url).then(function (response) {
            console.log(response);
            that.$store.dispatch("Promocode/setPromocodeAPI",{axios:that.axios,url:that.url('getPromocodes')});
          }).catch((error)=>{
            if (error.response) {
              if(error.response.data && !error.response.data.errors){
                this.$warningAlert(error.response.data.msg)
              }
            }
          });
        }
      })



    },
  },

  mounted() {
    this.$store.dispatch("Promocode/setPromocodeAPI",{axios:this.axios,url:this.url('getPromocodes')});
  },
}
</script>

<style scoped>

.no-item{
  position: absolute;
  top: 60%;
  left:50%;
  text-align: center;
}
.no-item{
  color:#8C94A5;
  font-size: 16px;
}
.history-btn{
  display: flex;
  justify-content: center;
  background: #E9ECFF;
  border-radius:5px;
  width:34px;
  height: 34px;
}
</style>