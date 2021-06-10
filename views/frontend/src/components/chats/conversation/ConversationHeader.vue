<template>
  <div class="conversation-header d-flex align-items-center">
    <div class="d-flex align-items-center"  v-if="contact" style="height:40px">
      <img class="user-picture" v-if="contact.avatar" :src="makeImg(contact.avatar)" alt="">
      <img class="user-picture" v-else src="../../../assets/icons/chat.svg" > 
      <h5>{{contact.name}}</h5>
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
  },
  methods:{
    makeImg(name){
        return this.img(name)
    }
  },
}
</script>

<style scoped>
.conversation-header{
  border-bottom: 1px solid #e8e8e8;
  padding:0 20px;
  height: 40px!important;
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