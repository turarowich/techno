<template>

  <div class="main-chat">
    <div class="notification">
      <button class="app-buttons-item"><img class="img-btn" src="../../assets/icons/ring.svg"><span>Push notification</span></button>
    </div>
    <div class="chat d-flex">
    <div class="overflow-hidden">
        <div class="d-flex align-items-center  search-chat">
            <img class="mr-3" src="../../assets/icons/search-icon.svg">
            <input type="text" placeholder="Search, user or chat" v-model="search">
        </div>
        <div class="list-people">
            <Contacts v-bind:contactList="filteredContact" @selected="startConversation" />
        </div>
    </div>
    <div class="conversation">
        <Conversation
           v-bind:contact="selectedContact"
            v-bind:messages="messages"
            v-on:message="sendMessage"
        />
    </div>
    <div class="people-info">
      <div class="chat-line"></div>
        <ChatProfile v-bind:contact="selectedContact"/>
    </div>
        </div>
  </div>

</template>

<script>
import Conversation from "@/components/chats/conversation/Conversation";
import Contacts from "@/components/chats/contacts/Contacts";
import ChatProfile from "@/components/chats/chat-profile/ChatProfile";
export default {
  name: "Chats",
  components:{
    Conversation,
    Contacts,
    ChatProfile
  },
  data(){
    return{
      contactList:[
      ],
      search:'',
      messages:[
      ],
      selectedContact: null
    }
  },
  computed:{
    filteredContact() {
        if(this.contactList){
            return this.contactList.filter(contact => {
                if(contact.name){
                    return contact.name.toLowerCase().includes(this.search.toLowerCase())
                }
            })
        }
        return []
    },
  },
  methods:{
    init () {
        this.getClients()
    },
    getClients(){
        this.axios.get(this.url('getClients')).
        then(result =>{
            this.contactList = result.data.objects
        });
    },
    startConversation(contact){
      this.selectedContact = contact
      this.messages = contact.messages
    },
    sendMessage(data){
        this.socket.emit('message', data)
        let message = {client:data.user, text:data.text, isIncoming: true, createdAt: new Date().toJSON(), new: false}
        let index = this.contactList.findIndex(user => user._id === data.user );
        if(index != undefined){
            this.contactList[index].messages.push(message)
            this.contactList[index].lastMessageAt = new Date()
        }
    },
  },
  created() {
        let that = this
        this.socket.on("server message", function(data) {
            let message = {client:data.user , text:data.text, isIncoming: false, createdAt: new Date().toJSON(), new: true}
            let index = that.contactList.findIndex(user => user._id === data.user );
            console.log(index);
            if(index != undefined){
                that.contactList[index].messages.push(message)
                that.contactList[index].lastMessageAt = new Date()
            }
        })
        this.socket.emit('init_admin')
  },
  mounted: function () {
    this.init()
 }

}
</script>

<style scoped>
.chat{
  height:calc(100vh - 169px)
}
.search-chat input{
  border:none;
  width:100%;
}
.search-chat{
  padding:0 15px;
  color:#e8e8e8;
  height:41px;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  
}
.conversation{
  width: 45%;
  border-top: 1px solid #e8e8e8;
}

.search-chat input:focus{
  outline:none;
}
.list-people{
  height:calc(100% - 40px);
  max-width: 333px;
  width: 100%;
  overflow-y: auto;
}

.people-info{
  width: 25%;
  border-top: 1px solid #e8e8e8;
}
.chat-line{
  height: 40px;
  border-bottom: 1px solid #e8e8e8;
}
.notification{
  margin-bottom: 30px;
  height: 39px;
}
.main-chat{
  padding-left:30px;
}



</style>