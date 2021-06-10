
//not used since child components were merged
export const MessageModule = {
    namespaced: true,

    state: {
        chats: [],
    },

    // Mutations are functions that effect the STATE.
    mutations: {
        setMessages(state, msgs) {
            state.chats = msgs;
        },
    },

    // Actions are functions that you call throughout your application that call mutations.
    actions: {
        setMessages: function ({ commit }, obj){
            obj.axios.post(obj.url, {
                client: '',
                isIncoming: false
            }).then(result => {
                let new_chats = []
                for (let object of result.data.objects){
                    if(!new_chats.includes(object.client)){
                        new_chats.push(object.client)
                    }
                }
                commit('setMessages', new_chats)
            });
        },
    },

    getters:{
        getMessages(state){
            let num =  state.chats.length ? state.chats.length : ''
            if(num != "" && num >= 100){
                num = "+99"
            }
            return num
        }
    },
}