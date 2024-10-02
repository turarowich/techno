<template>
    <div class="main-chat">
        <div v-if="spinner">
        </div>
        <div v-else class="chat">
            <div class="conversation">
                <Conversation v-bind:contact="selectedContact" v-bind:messages="messages" v-on:message="sendMessage" />
            </div>
        </div>
    </div>
</template>

<script>
import Conversation from "@/client/components/Basket/conversation/Conversation";

export default {
    name: "Chats",
    components: {
        Conversation,
    },
    data() {
        return {
            spinner: false,
            contactList: [],
            messages: [
            ],
            selectedContact: null,
        }
    },
    methods: {
        init() {
            this.getClients()
        },
        getClients() {
            this.axios.get(this.url('getClientMessages')).
                then(result => {
                    this.spinner = false;
                    this.startConversation(result.data.objects)
                });
        },
        startConversation(contact) {
            console.log(contact)
            this.selectedContact = contact
            this.messages = contact.messages

        },
        sendMessage(data) {
            this.socket.emit('message', data)
            let message = { client: data.user, text: data.text, isIncoming: false, createdAt: new Date().toJSON(), new: false }
            this.selectedContact.messages.push(message)
            this.selectedContact.lastMessageAt = new Date()
        },

    },
    created() {
        let that = this
        this.socket.on("server message", function (data) {
            let message = { client: data.user, text: data.text, isIncoming: data.isIncoming, createdAt: new Date().toJSON(), new: true }
            that.messages.push(message)
            that.selectedContact.lastMessageAt = new Date()
        })
        this.socket.on("warning message", (data) => {
            this.$warningAlert(data)
        })
        this.socket.emit('init_admin')
    },
    mounted: function () {
        this.init()
    }

}
</script>

<style scoped>
.clear-chat {
    background: none;
    border: 0;
    font-size: 14px;
    line-height: 17px;
    color: #E94A4A;
}

.contacts-container {
    width: 27%;
}

.checkmark {
    width: 12px;
}

.checkbox-text {
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #222222;
    margin-bottom: 0;
}

.bbnone {
    border-bottom: none !important;
}

.chat {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 111500;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.search-chat input {
    border: none;
    width: 100%;
}

.search-chat {
    padding: 0 15px;
    color: #e8e8e8;
    height: 41px;
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;

}

.conversation {
    width: 45%;
    border-top: 1px solid #e8e8e8;
    height: 100%;
}
@media (max-width: 990px) {
    .conversation{
        width: 100%;
    }
}

.search-chat input:focus {
    outline: none;
}

.list-people {
    height: calc(100% - 82px);
    width: 100%;
    overflow-y: auto;
}

.people-info {
    width: 25%;
    border-top: 1px solid #e8e8e8;
}

.chat-line {
    height: 40px;
    border-bottom: 1px solid #e8e8e8;
}

.notification {
    margin-bottom: 30px;
    height: 39px;
}

.main-chat {
    padding-left: 30px;
}
</style>