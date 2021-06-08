<template>
  <div class="conversation-header d-flex align-items-center">
    <div class="d-flex align-items-center"  v-if="contact" style="height:100%">
      <img src="../../../assets/img/chat.jpg" >
      <h5>{{contact.firstName +' '+ contact.lastName}}</h5>
    </div>
      <h5 v-else>Select a contact</h5>
  </div>
</template>

<script>
export default {
  name: "ConversationHeader",
  props:{
    contact:{
      type:Object
    },
  }
}
</script>

<style scoped>
.conversation-header{
  border-bottom: 1px solid #e8e8e8;
  padding:0 20px;
  height: 40px
}
.conversation-header img{
  width: 25px;
  height: 25px;
  border-radius:50%;
  margin-right: 10px;
}
h5{
  margin: 0;
  font-size: 15px;
  font-weight: normal;
}
</style>