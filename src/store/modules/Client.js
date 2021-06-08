//not used since child components were merged
export const ClientModule = {
    namespaced: true,
    state: {
        user:{},
    },

    // Mutations are functions that effect the STATE.
    mutations: {
        set_user(state, user) {
            state.user = user;
        },
        log_out(state) {
            state.user = {};
        },
    },

    // Actions are functions that you call throughout your application that call mutations.
    actions: {
        setUser: function({commit},user){
            commit('set_user' ,user)
        },
        logout: function({commit}){
            commit('log_out')
        },
    },

    getters:{
        getUserStatus(state){
            return state.user.auth
        },
        getUser(state){
            return state.user.object
        }
    },
}