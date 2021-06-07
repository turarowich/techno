//not used since child components were merged
export const MessageModule = {
    namespaced: true,

    state: {
        messages: [],
    },

    // Mutations are functions that effect the STATE.
    mutations: {
        setMessages(state, msgs) {
            state.messages = msgs;
        },
    },

    // Actions are functions that you call throughout your application that call mutations.
    actions: {
        setMessages: function ({ commit }, msgs){
            commit('setMessages', msgs)
        },
    },

    getters:{
        getMessages(state){
            return state.messages
        }
    },
}