<template>
    <div class="alert">
        <div v-for="(message, index) in filteredMessage" class="notification d-flex mb-1" :ref="'notify-' + message.index"  :key="index">
            <div class="pl-1 d-flex flex-wrap align-items-center justify-content-center" style="width:55px;">
                <img class="user-picture m-0" v-if="message.client && message.client.avatar" :src="makeImg(message.client.avatar)" alt="">
                <img class="user-picture m-0" v-else src="../../assets/icons/chat.svg" alt="">
            </div>
            <div class="col px-1" style="max-width:225px; margin-top:12px">
                <p class="user-name mb-1">
                    {{ message.client.name }}
                </p>
                <p class="new-message of-ellipsis mb-0">
                    {{ message.index + '' +message.text }}
                </p>
            </div>
            <div class="col-1 px-0">
                <button class="close-alert mx-0 mt-2 p-0 d-flex">
                    <img class="m-0" src="../../assets/icons/greyX.svg" alt="">
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    name: "NewMessageAlert",
    data(){
        return{
            contactList: [],
            oldMessages: [],
            num: 0
        }
    },
    computed:{
        filteredMessage(){
            let messages = this.oldMessages
            return messages.sort(function(a, b){return b.index - a.index})
        }
    },
    methods:{
        init () {
            this.getClients()
        },
        makeImg(name){
            return this.img(name)
        },
        getClients(){
            this.axios.get(this.url('getClients')).
            then(result =>{
                this.contactList = result.data.objects
            });
        },
        removeElement(){
            let msg = this.oldMessages[this.oldMessages.length - 1]
            let that = this
            console.log(this.$refs)
            $(this.$refs['notify-'+msg.index]).animate({
                opacity: '0'
            }, 'slow', 'linear', function() {
                that.oldMessages.splice(that.oldMessages.length - 1, 1)
            });
        }
    },
    created() {
        let that = this
        this.socket.on("server message", function(data) {
            let index = that.contactList.findIndex(user => user._id === data.user );
            this.num += 1 
            setTimeout(function(){ 
                that.removeElement()
            }, 5000);
            that.oldMessages.push({index:this.num,client: that.contactList[index] , text:data.text, isIncoming: false, createdAt: new Date().toJSON(), new: true})
        })
        this.socket.emit('init_admin')
    },
    mounted: function () {
        this.init()
    }

}
</script>

<style scoped>
.notification:nth-child(1){
    opacity: 1;
}
.user-picture{
    width: 40px;
    height: 40px;
}
.user-name{
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #FFFFFF;
}
.new-message{
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #E3E3E3;
}
.notification{
    background: #8C94A5;
    border-radius: 13px;
    width: 305px;
    height: 70px;
    opacity: 0.75;
    /* padding: 11px 0; */
    
}
.close-alert{
    background: none;
    border: 0;
    width: 25px;
    height: 25px;
}
.close-alert img{
    width: 100%;
    height: 100%;
}
.alert{
    position: fixed;
    right: 0;
    top: 0;
    width: 305px;
    margin: 51px 29px 0 0;
    padding: 0;
}

</style>
