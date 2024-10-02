<template>
  <div class="conversation-header d-flex align-items-center">
    <div class="d-flex align-items-center"  v-if="contact" style="height:90px">
      <img class="user-picture" v-if="contact.avatar" :src="makeImg(contact.avatar)" alt="">
      <img class="user-picture" v-else src="../../../assets/icons/chat.svg" > 
      <h5 class="contact-name">{{contact.name}}</h5>
    </div>
      <h5 class="contact-name" v-else>Выберите контакт</h5>
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
  height: 41px!important;
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
  line-height: 38px;
  font-weight: normal;
  height: 41px;
}
</style>