<template>
  <div class="composer">
    <img src="../../../assets/img/emoji.svg" class="mr-3">
    <input class="text-area" v-model="message" v-on:keydown.enter="send" placeholder="Message">
    <button class="send-message"><img src="../../../assets/icons/sendMessage.svg"></button>
  </div>
</template>

<script>
export default {
name: "MessageComposer",
  data(){
      return {
        message:''
       }
  },
  methods:{
  send(){
    if(this.message === ''){
      return;
    }else{
      this.$emit('send' ,this.message)
      this.message = ''
    }
    }
  }
}
</script>

<style scoped>
.composer{
  display: flex;
  align-items: center;
  padding:0 10px;
  border-top: 1px solid #e8e8e8;

}
.text-area{
  width: 100%;
  border:none;
  resize: none;
  padding:15px 0;
}
.text-area:focus{
  outline:none;
}
.send-message{
  border:none;
  background: none;
}
</style>