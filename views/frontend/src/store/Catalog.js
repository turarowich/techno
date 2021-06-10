//not used since child components were merged
export const CatalogModule = {
    namespaced: true,
    state: {
        company_url: '',
        company_addresses:[],
        company_delivery_options:[],
    },

    // Mutations are functions that effect the STATE.
    mutations: {
        set_company_url(state, url) {
            state.company_url = url;
        },
        set_company_addresses(state, addresses) {
            state.company_addresses = addresses;
        },
        company_delivery_options(state, options) {
            state.company_delivery_options = options;
        },
    },

    // Actions are functions that you call throughout your application that call mutations.
    actions: {
        setCompany_url: function({commit},url){
            commit('set_company_url' ,url)
        },
        setCompany_addresses: function({commit},addresses){
            commit('set_company_addresses' ,addresses)
        },
        setCompany_delivery_options: function({commit},options){
            commit('company_delivery_options' ,options)
        },
    },

    getters:{
        getCompany_ur(state){
            return state.company_url;
        },
        getCompanyAddresses(state){
            return state.company_addresses;
        },
        getCompanyDeliveryOptions(state){
            return state.company_delivery_options;
        }
    },
}