//not used since child components were merged
export const LoyaltyModule = {
    namespaced: true,

    state: {
        tab: '',
    },

    // Mutations are functions that effect the STATE.
    mutations: {
        set_tab(state, type) {
            state.type = type;
        },
    },

    // Actions are functions that you call throughout your application that call mutations.
    actions: {
        setTab: function({commit},type){
            commit('set_tab' ,type)
        },
    },

    getters:{
      getTab(state){
          return state.tab
      }
    },
}