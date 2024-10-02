<template>
    <div class="h-100 overflow-auto">  
        <li v-for="(contact,index) in filteredContact" :key="contact.id" :class="{'selected' : index === selected}" class="w-100 pr-1 pl-0">
            <div class="contact-list d-flex align-items-center w-100">
                <div class="pl-1"  style="width: 28px;"><label class="custom-checkbox mb-0"><input type="checkbox" v-model="contact.selected" @change="checkSelection">
                    <span class="checkmark"></span></label>
                </div>
                <div  class="overflow-hidden" @click="selectContact(index, contact)">
                    <img class="user-picture" v-if="contact.avatar" :src="makeImg(contact.avatar)" alt="">
                    <img class="user-picture" v-else src="../../../assets/icons/chat.svg" > 
                </div>
            <div class="info overflow-hidden" @click="selectContact(index, contact)">
                <p class="contact-name m-0 of-ellipsis">{{contact.name}}</p>
                <div class="d-flex justify-content-between w-100">
                    <p class="contact-date m-0">{{lastMsgDate(contact.messages)}}</p>
                    <div v-if="countNewMessages(contact.messages)">
                        <div class="newMessage" >{{countNewMessages(contact.messages)}}</div>
                    </div>
                </div>
                
                <p  class="contact-span m-0 of-ellipsis">
                    <span class="msg-sender">{{lastMsgSender(contact.messages)}}</span>
                    {{lastMsgText(contact.messages)}}
                </p>
            </div>
            </div>
            <div>
            <span class="contact-span">{{contact.last_visit}}</span>
            </div>
      </li>
    </div>
</template>

<script>
export default {
  name: "Contact",
  data(){
    return{
      selected: 0,
      filteredContact: []
    }
  },
  methods:{
    selectContact(index,contact){
        this.selected = index;
        this.$emit('selected',contact)
    },
    checkSelection(){
        this.$emit('checkSelection')
    },
    makeImg(name){
        return this.img(name)
    },
    countNewMessages(messages){
        let val = ""
        if (messages.length){
            val = messages.filter(msg => msg.new && !msg.isIncoming ).length 
            if (val == 0){
                val = ""
            }
        }
        return val
    },
    lastMsgDate(messages){
        let val = ""
        if (messages.length){
            val = messages[messages.length - 1]
            val = this.$moment(val.createdAt).format("MMM D");   
        }
        return val
    },
    lastMsgText(messages){
        let val = ""
        if (messages.length){
            val = messages[messages.length - 1]
            val = val.text
        }
        return val
    },
    lastMsgSender(messages){
        let val = ""
        if (messages.length){
            val = messages[messages.length - 1]
            if(val.isIncoming){
                val = "Вы: "
            }else{
                val = "Клиент: "
            }
        }
        return val
    }

  },
  watch: {
        contactList: {
            handler: function (contacts) {
                this.filteredContact = contacts.sort((a, b) =>  new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
            },
            deep: true
        },
  },
  
  props:{
  contactList:{
    type:Array,
    default: function () { return [] }
  }
  }
}
</script>

<style scoped>
.newMessage{
    background: #4257D0;
    border-radius: 50%;
    width: 21px;
    height: 21px;
    font-size: 10px;
    line-height: 12px;
    color: #FFFFFF;
    text-align: center;
    vertical-align: middle;
    line-height: 21px; 
}
.msg-sender{
    font-size: 14px;
    line-height: 17px;
    color: #000000;
}
.info{
    width: calc(100% - 70px)
}
li{
  list-style-type: none;
  border-bottom:1px solid #e8e8e8;
  padding:0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 81px;
}
.contact-date{
    font-size: 12px;
    color: #8C94A5;
}
li:hover{

  background: #F6F6F6;
  transition: .3s;
  cursor: pointer;
}
.avatar{
  width: 50px;
  height: 50px;
  border-radius:50%;
}
.contact-name{
  font-size: 15px;
  font-weight: normal;
 }
.contact-span{
  color: #8C94A5;
}


</style>