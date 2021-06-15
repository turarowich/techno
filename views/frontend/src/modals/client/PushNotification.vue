<template>
  <div class="modal fade right "  id="push-notification" tabindex="-1" role="dialog" aria-labelledby="add-products" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: calc(100% - 250px);" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header justify-content-start align-items-center">
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/xBlack.svg" alt="">
              </span>
          </button>
          <h3 class="modal-title">Push notification</h3>
        </div>
        <div class=" myModal-body">
          <div class="row">
            <div class="col-lg-8">
              <div class="d-flex client-all justify-content-between">
                <h4 class="push-title">Manual selection of customers</h4>
                <div class="d-flex align-items-center">
                  <div class="table-head "><label class="custom-checkbox mr-2 "><input  v-model="selectAll" @click="toggleSelect" type="checkbox"><span class="checkmark"></span></label></div>
                  <span class="send-all">Send to all</span>
                </div>
              </div>

              <div class="main-search d-flex align-items-center ">
                <img src="../../assets/icons/search-icon.svg">
                <input class="main-input" type="text" placeholder="Search" v-model="search_client">
              </div>

              <div class="d-flex main-content-header">
                <div class="table-head" style="width: 52%;">Name</div>
                <div class="table-head" style="width:35%">Category</div>
                <div class="table-head" style="width:13%">Bonus</div>
              </div>

              <div class="table-content">
                <div v-for="client in filteredClients" :key="client._id" class="table-item d-flex align-items-center">
                  <div class="table-head" style="width: 5%;"><label class="custom-checkbox"><input @click="checkMainSelect" type="checkbox"  :ref="`select${client._id}`"><span class="checkmark"></span></label></div>
                  <div  class="d-flex align-items-center"  style="width: 47%;">
                    <div class="table-img">
                      <img src="../../assets/img/sneak.webp">
                    </div>
                    {{client.name}}
                  </div>
                  <div style="width:35%">{{client.category ? client.category.name : "No cat" }}</div>
                  <div style="width:13%">{{client.bonus}}</div>
                </div>


              </div>

            </div>

            <div class="col-lg-4 pb-5">
              <div class="choose-category">
                <h2 class="notification-title">Choose from category</h2>
                <input class="cashback-input" placeholder="Search" v-model="search_category">
                <ul style="height:120px" class="push-cat p-0 m-0">
                  <li v-if="filteredCategories.length>0" class="category-list"><div v-for="category in filteredCategories" :key="category._id" @click="filterClient = category._id">{{category.name}}</div></li>
                  <li v-else class="category-list">You have no categories</li>
                </ul>
              </div>

              <h3 class="notification-title">Select by last purchase date</h3>
              <div class="selects">
                <select v-model="newData.last_pruchase" class=" form-control long-form-control  form-control-lg" aria-label=".form-select-lg example">
                  <option value="1">1 month</option>
                  <option value="2">2 month</option>
                  <option value="3">3 month</option>
                  <option value="4">4 month</option>
                  <option value="5">5 month</option>
                  <option value="6">6 month</option>
                  <option value="12">12 month</option>
                </select>
              </div>

              <h3 class="notification-title">News</h3>
              <input class="cashback-input news-input" placeholder="Select news" v-model="search_news">

            <div class="parent-news">
              <div v-if="search_news!==''" class="news pt-3">
                <div v-if="filteredNews.length>0">
                  <div @click="selectedNews(news)" class="news-title d-flex justify-content-between align-items-center pr-3 pl-3" v-for="news in filteredNews" :key="news._id">
                    {{news.name}}
                  </div>
                </div>
                <div class="pl-3" v-else>
                  You have no news
                </div>
              </div>
            </div>

              <div v-if="newData.news !== ''" class="sale d-flex align-items-center justify-content-between">
                <div style="width:100%">
                  <h4 class="sale-title">{{newData.news.name}}</h4>
                  <span class="news-desc">{{newData.news.desc}}</span>
                </div>
                <img @click="newData.news = ''" src="../../assets/icons/deleteClient.svg">
              </div>

              <h3 class="notification-title">Custom text</h3>
              <input v-model="newData.title" class="cashback-input mb-3" placeholder="Title">
              <textarea v-model="newData.description" class="general-area p-2" placeholder="Description"></textarea>
              <button class="save" @click.prevent="onSubmit">Send</button>
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
  name: "Push notification",
  data(){
    return{
      clients:[],
      search_client:'',
      clientCategory:[],
      search_category:'',
      selectAll:false,
      newsList:[],
      search_news:'',
      filterClient:'',
      newData:{
        client:[],
        news:'',
        title:'',
        description:'',
        last_pruchase:''

      }
    }
  },
  computed:{
    filteredClients(){

      return this.clients
          .filter((item)=>{
            return item.name.toLowerCase().includes(this.search_client.toLowerCase())
          })
      .filter((item)=>{
        if(item.category){
          return item.category._id.includes(this.filterClient);
        }else{
          return item;
        }
      })


    },
    filteredCategories(){
      return this.clientCategory.filter((item)=>{
        return item.name.toLowerCase().includes(this.search_category.toLowerCase())
      })
    },
    filteredNews(){
      return this.newsList.filter((item)=>{
        return item.name.toLowerCase().includes(this.search_news.toLowerCase())
      })
    },

  },
  methods:{
    selectedNews(selected){
      this.newData.news = selected
      this.search_news = ''
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
    toggleSelect(){
      this.clients.forEach((client)=>{
        if(this.$refs[`select${client._id}`]!==undefined && this.$refs[`select${client._id}`] !== null){
          if(this.selectAll === false){
            this.$refs[`select${client._id}`].checked = true

          }
          else{
            this.$refs[`select${client._id}`].checked = false
          }
        }
      })
    },
    checkAll(item) {
      if(this.$refs[`select${item._id}`] !== null){
        return  this.$refs[`select${item._id}`].checked === true
      }

    },
    checkMainSelect() {
      if(this.clients.every(this.checkAll)){
        this.selectAll = true
      }
      else{
        this.selectAll = false;

      }

    },
    getNews(){
      this.axios.get(this.url('getNews'))
          .then((response) => {
            this.newsList = response.data.objects;
          })
    },
    onSubmit(){
      this.clients.forEach((client)=>{
        if(this.$refs[`select${client._id}`]!==undefined && this.$refs[`select${client._id}`] !== null){
          if(this.$refs[`select${client._id}`].checked === true){
            this.newData.client.push(client._id)
          }
        }
      })
      console.log(this.newData)
      $('#push-notification').modal("hide")
    },

  },
  mounted(){
    this.getClients()
    this.getCategories()
    this.getNews()
  }




}
</script>

<style scoped>
.news-title{
  font-size:14px;
  padding:7px 0;
  cursor:pointer;
}
.news-title:hover{
  background: #fafafa;
}
.parent-news{
  position: relative;
}
.news-desc{
  color:#8C94A5;
  font-size: 14px;
}
.news{
  height:100px;
  background: #fff;
  position: absolute;
  width: 100%;
  top:-15px;
  max-height:200px;
  overflow-y: auto;
  box-shadow: 2px 11px 35px rgba(0, 0, 0, 0.1);
  z-index: 99;
}
.push-cat{
  overflow-y:auto;
}
.save{
  width: 120px;
}
.general-area{
  margin-bottom: 20px;
}
.news-input{
  margin-bottom: 20px;
}
.sale{
  border-bottom: 1px solid #D3D3D3;
  padding-bottom: 14px;
  margin-bottom: 20px;
}
.sale-input{
  border:none;
  height: 100%;
  width: 100%;

}
.form-control{
  background: none;
}
.sale-title{
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 3px;
}
.notification-title{
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 12px;
}
.choose-category{
  background: #F8F9FB;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}
.choose-category .cashback-input{
  height: 35px;
  background: none;
  margin-bottom: 20px;
}

.cashback-input{
  width: 100%;
}
.push-notification{
  padding: 0 30px;
}

.push-title{
  font-size: 18px;
  font-weight: normal;
}
.client-all{
  margin-bottom: 21px;
}
.main-search{
  margin-bottom: 30px;
}
.category-list{
  list-style-type:none;
  margin-bottom: 10px;
  cursor:pointer;
}
.category-list div{
  margin-bottom: 10px;
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
</style>