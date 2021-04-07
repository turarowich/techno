<template>
<div class="conversation-chat">
  <ConversationHeader v-bind:contact="contact"/>
  <MessageFeed v-bind:contact="contact" v-bind:messages="messages" />
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
  props:{
    contact:{
      type:Object
    },
    messages:{
      type:Array,
      default: function () { return [] }
    }

  },
  methods:{
    sendMessage(text){
        this.$emit('message', {user: this.contact.id, text: text})
    }
  }
}
</script>

<style scoped>

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