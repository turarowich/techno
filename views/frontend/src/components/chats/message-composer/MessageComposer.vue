<template>
  <div class="composer">
    <button class="emoji-picker mr-3">
        <img src="../../../assets/img/emoji.svg" class="w-100">
    </button>
    <input class="text-area" v-model="message" v-on:keydown.enter="send" placeholder="Message">
    <button class="send-message"><img src="../../../assets/icons/sendMessage.svg"></button>
  </div>
</template>

<script>
import { EmojiButton } from '@joeattardi/emoji-button';

const picker = new EmojiButton({
  autoHide: false
});

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
  }, 
  mounted(){
    const trigger = document.querySelector('.emoji-picker');
    var textArea = document.querySelector('.text-area');
    var pos = 0
    picker.on('emoji', selection => {
        
        if(pos == 0){
            pos = textArea.selectionStart
        }
        let output = [textArea.value.slice(0, pos), selection.emoji, textArea.value.slice(pos)].join('');
        
        textArea.value = output
        pos += 2
    });
    picker.on('hidden', () => {
        pos = 0
    });
    trigger.addEventListener('click', () => picker.togglePicker(trigger));
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
.emoji-picker{
    width: 25px;
    height: 25px;
    /* margin: 0; */
    padding: 0;
    border: 0;
}
</style>