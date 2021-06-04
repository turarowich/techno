<template>
   <div id="chatToBottom" class="feed-list" v-if="contact">
     <div class="w-100">
          <div v-if="messages.length > show">
            <button class="load-more" @click="show += 8">
                load more
            </button>
          </div>
      </div>
      <div  v-for="(msgs, date) in filteredMessages"  :key="date">
        <div class="message-date my-1">
            {{date}}
        </div>
        <div  v-for="message in msgs" :class="`message${message.isIncoming ? ' send' : ' received' }`" :key="message.id">
            <div class="text my-1">
                {{message.text}}
                <i class="send-text fas fa-check"></i>
            </div> 
        </div>
     </div>
   </div>
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
    watch: {
        messages: function (msgs) {
            this.filteredMessages = msgs.slice(Math.max(msgs.length - this.show, 1)).reduce((groups, msg) => {
                const date = msg.createdAt.split('T')[0];
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(msg);
                return groups;
            }, {});
            this.show = 8
        },
        show: function (len) {
            this.filteredMessages = this.messages.slice(Math.max(this.messages.length - len, 1)).reduce((groups, msg) => {
                const date = msg.createdAt.split('T')[0];
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(msg);
                return groups;
            }, {});
        },
    },
    data(){
        return{
            show: 8,
            filteredMessages: []
        }
    },

}
</script>

<style scoped>
.message-date{
    font-size: 14px;
    line-height: 17px;
    color: #8C94A5;
    width: 100%;
    text-align: center;
}
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
  max-width: calc(100% - 50px);
  word-break: break-word;
}
.send .text{
  background: #616CF5;
  border-radius: 5px;
  padding:10px 20px;
  color:#fff;
  margin-bottom: 10px;
  max-width: 50%;
}
.emptySpace{
    display: flex;
    height: 50px;
}
.load-more{
    background: 0;
    border: 0;
    width: 100%;
    height: 40px;
    font-size: 16px;
    text-align: center;
    color: #9ea8e6;
    transition: 0.3s;
}
.load-more:hover{
    color: #616CF5;
    transition: 0.3s;
}
</style>