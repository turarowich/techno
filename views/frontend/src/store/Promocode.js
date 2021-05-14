export const PromocodeModule = {
    namespaced: true,
    state: {
        promocodes: '',
        promocode: {},
        editStatus:false,
    },

    // Mutations are functions that effect the STATE.
    mutations: {
        SET_PromocodesAPI(state, promocodes) {
            state.promocodes = promocodes;
        },
        SET_PromocodesObject(state, promocode) {
            state.promocode = promocode;
        },
        SET_EditState(state, status) {
            console.log('ssssss',status)
            state.editStatus = status;
        },
    },

    // Actions are functions that you call throughout your application that call mutations.
    actions: {
        setPromocodeAPI({ commit },axios) {
            axios.get('https://localhost:8443/api/getPromocodes')
                .then(response => {
                    commit('SET_PromocodesAPI', response.data.objects)
                })
        },
        setPromocodeFromSearch({ commit },array){
            console.log('setPromocodeFromSearch');
            commit('SET_PromocodesAPI', array)
        },
        setPromocodeObject({ commit },obj){
            console.log('SET_PromocodesObject');
            commit('SET_PromocodesObject', obj);
            commit('SET_EditState', true);
        },
        setEditState({ commit },status){
            console.log('SET_EditState',status);
            commit('SET_EditState', status)
        }
    },

    getters:{
        getPromocode(state){
            return state.promocode;
        },
        getEditState(state){
            return state.editStatus;
        },
    },
}