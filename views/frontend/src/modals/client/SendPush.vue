<template>
  <div class="parent-modal">
    <div class="modal myModal fade" id="send-push" tabindex="-1" role="dialog" aria-labelledby="send-push" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content category-content" >
          <div class="modal-header category-header align-items-center">
            <h3 class="modal-title">Send push</h3>
              <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/xBlack.svg" alt="">
              </span>
            </button>
          </div>
          <div class="modal-body category-body">
            <form id="form" class="modal-form">
              <label>News</label><br>
              <input :disabled="sendPush.title !== '' || sendPush.description !== ''" :class="{disableInput: sendPush.title !=='' || sendPush.description!==''}"  v-if="sendPush.news === ''" v-model="search"  class="cashback-input mb-3"  placeholder="Select news">
              <div v-else class="cashback-input bg-transparent d-flex align-items-center mb-3">{{newsObj.name}}</div>
              <img v-if="sendPush.news !== ''"  @click="clearNews" class="delete-new" src="../../assets/icons/deleteClient.svg">
              <div class="parent-news">
                <div v-if="search!==''" class="news pt-3">
                  <div v-if="filteredNews.length>0">
                    <div @click="selectNew(news)" v-for="news in filteredNews" :key="news._id" class="news-item">
                      {{news.name}}
                    </div>
                  </div>
                  <div class="pl-3" v-else>
                    You have no news
                  </div>
                </div>
              </div>
              <label>Custom text</label><br>
              <input :disabled="sendPush.news!==''" v-model="sendPush.title" :class="{disableInput: sendPush.news!== ''}"  class="disables cashback-input mb-2"  placeholder="Title">
              <textarea :disabled="sendPush.news!==''" v-model="sendPush.description" :class="{disableInput: sendPush.news!== ''}"  class=" disables general-area p-2" placeholder="Description"></textarea>
              <button  class="save" @click.prevent="onSubmit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: "SendPush",
  props:['client'],
  data(){
    return{
      search:'',
      newsList:[],
      newsObj:'',
      sendPush:{
        clients:[],
        news:'',
        title:'',
        description:'',
        sendToAll:false,

      }
    }
  },
  computed:{
    filteredNews(){
      return this.newsList.filter((item)=>{
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods:{
    onSubmit(){
      const that = this;
      const new_data = this.sendPush;
      new_data.clients.push(this.client._id);
      const form = new FormData;

      if(new_data.news !== ''){
        form.append('news',new_data.news)
      }
      else{
        form.append('title',new_data.title);
        form.append('description',new_data.description);
      }
      form.append('sendToAll', new_data.sendToAll);
      form.append('clients',new_data.clients)
      this.axios.post(this.url('sendPushNotification'),form)
            .then(()=>{
              document.getElementById('form').reset();
              that.$successAlert('Push has been sent')
              $('#send-push').modal("hide")
              that.sendPush.news = '';

            })


    },
    clearNews(){
      this.sendPush.news = '';
      this.newsObj = ''
    },
    getNews(){
      this.axios.get(this.url('getNews'))
          .then((response) => {
            this.newsList = response.data.objects;
          })
    },
    selectNew(news){
      this.sendPush.news = news._id;
      this.newsObj = news;
      this.search = '';




    }
  },
  mounted(){
    this.getNews()
  }
}
</script>

<style scoped>

.parent-news{
  position: relative;
}
.delete-new{
  position: absolute;
  right: 65px;
  top: 42px;
}
.cashback-input{
  width: 100%;
}
.category-content{
  margin-top: 20%;
}
.news-item{
  padding:5px 0;
  cursor:pointer;
}
.general-area{
  margin-bottom: 30px;
  font-size: 14px;
}
.news{
  background: #fff;
  position: absolute;
  width: 100%;
  top:-15px;
  max-height:240px;
  overflow-y: auto;
  box-shadow: 2px 11px 35px rgba(0, 0, 0, 0.1);
  z-index: 99;
  padding:10px;
}
.save{
  width: 120px;
}
.under-title{
  color: #8C94A5;
  font-size: 16px;
}
</style>