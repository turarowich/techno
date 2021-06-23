<template>
<div class="conversation-chat">
  <ConversationHeader v-bind:contact="contact"/>
    <MessageFeed v-if="contact" v-bind:contact="contact" v-bind:messages="messages" />
    <div v-else class="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
        <img src="../../../assets/icons/chat-empty.svg" alt="">
        <p class="empty-chat-text mt-3">Chat is empty, no active chats </p>
    </div>
  <MessageComposer v-on:send="sendMessage"/>


</div>
</template>

<script>
import MessageComposer from "@/components/chats/message-composer/MessageComposer";
import MessageFeed from "@/components/chats/message-feed/MessageFeed";
import ConversationHeader from "@/components/chats/conversation/ConversationHeader";

export default {
name: "Conversation",
  components:{
    MessageFeed,
    MessageComposer,
    ConversationHeader
  },
  props:['contact', 'messages'],
  methods:{
    sendMessage(text){
        this.$emit('message', {user: this.contact._id, text: text, isIncoming: true })
    }
  }
}
</script>

<style scoped>
.empty-chat-text{
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #8C94A5;
}
.conversation-chat{
  display: flex;
  flex-direction: column;
  border:1px solid #e8e8e8;
  border-top: none;
  position: relative;
  border-bottom:none;
justify-content: space-between;
  height:100%;


}
.send-message{
  position: absolute;
  bottom: 0;
  width:100%;

}

</style>