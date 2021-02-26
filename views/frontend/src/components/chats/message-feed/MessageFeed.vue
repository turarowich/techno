<template>

   <ul  class="feed-list" v-if="contact">
     <li  v-for="message in messages" :class="`message${message.from === 'me' ? ' send' : ' received' }`" :key="message.id">
      <div class="text">
        {{message.text}}
        <i class="send-text fas fa-check"></i>
      </div>
     </li>

   </ul>



</template>

<script>
export default {
name: "MessageFeed",
  props:{
    contact:{
      type:Object,
    },
    messages:{
      type:Array,
      required: function () { return [] }

    }
  },

}
</script>

<style scoped>
.message{
  font-size: 16px;
  list-style-type: none;
  position: relative;

}
.feed-list{
  width: 100%;
  padding:0 10px;
  overflow-y: scroll;
  height: 100%;
}
.send-text{
  position: absolute;
  bottom: 15px;
  right: 5px;
  font-size: 10px;
}
.send{
  display: flex;
justify-content: flex-end;
}
.received{
  display: flex;
  justify-content: flex-start;
}
.received .send-text{
  display: none;
}
.received .text{
  background: #F1F3F5;
  border-radius: 5px;
  padding:10px 20px;
  margin-bottom: 10px;

}
.send .text{
  background: #616CF5;
  border-radius: 5px;
  padding:10px 20px;
  color:#fff;
  margin-bottom: 10px;
  max-width: 50%;


}
</style>