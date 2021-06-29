//not used since child components were merged
export const CatalogModule = {
    namespaced: true,
    state: {
        company_url: '',
        catalog_settings: {
            name:'',
            catalogMode:'',
            email:'',
            banner:'',
            logo:'',
            description:'',
            welcome:'',
            delivery:'',
            deliveryDescription:'',
            telegram:'',
            facebook:'',
            instagram:'',
            whatsapp:'',
            website:'',
        },
        company_addresses:[],
        company_delivery_options:[],
    },

    // Mutations are functions that effect the STATE.
    mutations: {
        set_company_url(state, url) {
            state.company_url = url;
        },
        set_catalog_settings(state, obj) {
            state.catalog_settings = obj;
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
        setCatalog_settings: function({commit},obj){
            commit('set_catalog_settings' ,obj)
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
        getCatalog_settings(state){
            return state.catalog_settings;
        },
        getCompanyAddresses(state){
            return state.company_addresses;
        },
        getCompanyDeliveryOptions(state){
            return state.company_delivery_options;
        }
    },
}