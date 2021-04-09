<template>

  <div class="main-chat">
    <div class="notification">
      <button class="app-buttons-item"><img class="img-btn" src="../../assets/icons/ring.svg"><span>Push notification</span></button>
    </div>
      <div class="chat d-flex">


    <div class="list-people">
      <div class="search-chat d-flex align-items-center">
        <img class="mr-3" src="../../assets/icons/search-icon.svg">
        <input type="text" placeholder="Search, user or chat" v-model="search">
      </div>

      <ul class="list-group">
        <Contacts v-bind:contactList="filteredContact"
        @selected="startConversation"
        />
      </ul>

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
        <ChatProfile/>
    </div>
        </div>
  </div>

</template>

<script>
import Conversation from "@/components/chats/conversation/Conversation";
import Contacts from "@/components/chats/contacts/Contacts";
import ChatProfile from "@/components/chats/chat-profile/ChatProfile";
import io from "socket.io-client"
const socket = io("http://localhost:8080",{
    extraHeaders: {
        token: localStorage.getItem('token')
    }
})
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
      return this.contactList.filter(contact => {
        return contact.firstName.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods:{
    init () {
        this.getClients()
    },
    getClients(){
        console.log('got here')
        this.axios.get(this.url('/getClients')).
        then(result =>{
            this.contactList = result.data.objects
        });
    },
    startConversation(contact){
      this.selectedContact = contact
      this.messages = contact.messages
      socket.emit('init', contact._id)
    },
    sendMessage(data){
        socket.emit('message', data)
        let message = {client:data.user, text:data.text, isIncoming: true}
        
        let index = this.contactList.findIndex(user => user._id === data.user );
        if(index != undefined){
            this.contactList[index].messages.push(message)
        }

        this.scrollToBottom("chatToBottom")
    },
  },
  created() {
        let that = this
        socket.on("server message", function(data) {
            let message = {client:data.user , text:data.text, isIncoming: false}
            let index = that.contactList.findIndex(user => user._id === data.user );
            console.log(index);
            if(index != undefined){
                console.log(that.contactList[index].messages)
                that.contactList[index].messages.push(message)
                console.log(that.contactList[index].messages)
            }
            if(that.selectedContact._id == data.user){
                that.messages  = that.contactList[index].messages
            }
            
            that.scrollToBottom("chatToBottom")
        })
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
  height:40px;
  border-bottom: 1px solid #e8e8e8;
  opacity: 0.5;
}
.conversation{
  width: 45%;
  border-top: 1px solid #e8e8e8;
}

.search-chat input:focus{
  outline:none;
}
.list-people{
  width: 30%;
  border-top: 1px solid #e8e8e8;
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