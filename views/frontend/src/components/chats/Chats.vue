<template>

  <div class="main-chat">
    <!-- <div class="notification">
      <button class="app-buttons-item"><img class="img-btn" src="../../assets/icons/ring.svg"><span>Push notification</span></button>
    </div> -->
    <div class="chat d-flex">
    <div class="overflow-hidden contacts-container">
        <div class="d-flex align-items-center  search-chat">
            <img class="mr-3" src="../../assets/icons/search-icon.svg">
            <input type="text" placeholder="Search, user or chat" v-model="search">
        </div>
        <div class="d-flex align-items-center justify-content-between search-chat pl-0 pr-1">
            <div class="pl-1" style="width: 100px;"><label class="custom-checkbox checkbox-text w-100 d-flex align-items-center"><input id="parent-check" type="checkbox"  v-model="selectAll" @change="selectAllContact"><span class="checkmark"></span><p class="mb-0 pl-1">Select all</p>  </label></div>
            <button class="clear-chat" @click="clearChats" v-if="selectedQuantity">
                <img src="../../assets/icons/redX.svg" alt="">
                Clear chat(s)
            </button>
        </div>
        <div class="list-people">
            <Contacts v-bind:contactList="filteredContact" @selected="startConversation" @checkSelection="checkSelection"/>
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
import Swal from 'sweetalert2';
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
      selectedContact: null,
      selectAll: false
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
    selectedQuantity() {
        if(this.contactList){
            let selected =  this.contactList.filter(contact => {
                return contact.selected 
            })
            if(selected.length){
                return true
            }
        }
        return false
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
            this.selectAll = false
        });
    },
    checkSelection(){
        let selected =  this.contactList.filter(contact => {
            return contact.selected 
        })
        this.selectAll = selected.length == this.contactList.length
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
    selectAllContact(){
        this.contactList.map((contact) => contact['selected'] = this.selectAll);
    },
    clearChats(){
        Swal.fire({
        showConfirmButton: true,
        html: 'Are you sure to remove this chats',
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

      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.post(this.url('clearMessages'),{
                clients: this.contactList.filter(contact => {
                    return contact.selected 
                })
            }).
            then(() =>{
                this.getClients()
                Swal.fire({
                    title:'Success',
                    timer:1500,
                    text:'Chats cleared',
                    showConfirmButton:false,
                    position: 'top-right',
                    customClass:{
                        popup:'success-popup',
                        content:'success-content',
                        title:'success-title',
                        header:'success-header',
                        image:'success-img'
                    },
                    showClass:{
                        popup: 'animate__animated animate__zoomIn'
                    },
                    }
                )
            });
       }
      })
        
    }
  },
  created() {
        let that = this
        this.socket.on("server message", function(data) {
            let message = {client:data.user , text:data.text, isIncoming: false, createdAt: new Date().toJSON(), new: true}
            let index = that.contactList.findIndex(user => user._id === data.user );
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
.clear-chat{
    background: none;
    border: 0;
    font-size: 14px;
    line-height: 17px;
    color: #E94A4A;
}
.contacts-container{
    width: 27%;
}
.checkmark{
    width: 12px;
}
.checkbox-text{
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #222222;   
    margin-bottom: 0;
}
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