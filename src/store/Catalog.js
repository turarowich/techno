//not used since child components were merged
export const CatalogModule = {
    namespaced: true,

    state: {
        company_url: '',
    },

    // Mutations are functions that effect the STATE.
    mutations: {
        set_company_url(state, url) {
            state.company_url = url;
        },
    },

    // Actions are functions that you call throughout your application that call mutations.
    actions: {
        setCompany_url: function({commit},url){
            commit('set_company_url' ,url)
        },
    },

    getters:{
      getCompany_ur(state){
          return state.company_url
      }
    },
}