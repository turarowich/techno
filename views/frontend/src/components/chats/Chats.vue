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
        {id:1, name:"Bektemir Kudaiberdiev", email:'example@.com', last_visit:"18:28",},
        {id:2, name:"Cristiano Ronaldo", email:'instance@.com',last_visit:"18:28",img_source:"https://akns-images.eonline.com/eol_images/Entire_Site/2020722/rs_634x1024-200822143134-634-Georgina-Rodriguez.cristiano-ronaldo.ct.082220.jpg?fit=around%7C634:1024&output-quality=90&crop=634:1024;center,top"},
        {id:3, name:"Lionel Messi", email:'instance@.com',last_visit:"18:28"},
        {id:4, name:"Neymar ", email:'instance@.com',last_visit:"18:28"},
        {id:5, name:"Marcelo", email:'instance@.com',last_visit:"18:28"},
        {id:5, name:"Marcelo", email:'instance@.com',last_visit:"18:28"},
        {id:5, name:"Marcelo", email:'instance@.com',last_visit:"18:28"},
        {id:5, name:"Marcelo", email:'instance@.com',last_visit:"18:28"},
        {id:5, name:"Marcelo", email:'instance@.com',last_visit:"18:28"},
        {id:5, name:"Marcelo", email:'instance@.com',last_visit:"18:28"},


      ],
      search:'',
      messages:[
        {id:1 , text:"hello" , from:'me'},
        {id:2 , text:"hi",from:'him'},
        {id:3 , text:"Hello, Milena , we are happy to try! We are waiting for your new orders",from:'me',},
        {id:4 , text:"sleeping",from:'him'},
        {id:5 , text:"ok",from:'me'},
        {id:1 , text:"hello" , from:'me'},
        {id:2 , text:"hi",from:'him'},
        {id:3 , text:"Hello, Milena , we are happy to try! We are waiting for your new orders",from:'me',},
        {id:4 , text:"sleeping",from:'him'},
        {id:5 , text:"ok",from:'me'},
        {id:1 , text:"hello" , from:'me'},
        {id:2 , text:"hi",from:'him'},
        {id:3 , text:"Hello, Milena , we are happy to try! We are waiting for your new orders",from:'me',},
        {id:4 , text:"sleeping",from:'him'},
        {id:5 , text:"ok",from:'me'},

      ],
      selectedContact: null
    }
  },
  computed:{
    filteredContact() {
      return this.contactList.filter(contact => {
        return contact.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods:{
    startConversation(contact){
      this.selectedContact = contact
    }
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