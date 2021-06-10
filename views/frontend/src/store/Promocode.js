export const PromocodeModule = {
    namespaced: true,
    state: {
        promocodes: '',
        seletected_objects:[],
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
        SET_PromocodesSelectedOjects(state, objects) {
            state.seletected_objects = objects;
        },
        SET_EditState(state, status) {
            state.editStatus = status;
        },
    },

    // Actions are functions that you call throughout your application that call mutations.
    actions: {
        setPromocodeAPI({ commit },object) {
            object.axios.get(object.url)
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
        setPromocodeSelectedObjects({ commit },obj){
            console.log('SET_PromocodesSelectedOjects');
            commit('SET_PromocodesSelectedOjects', obj);
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
        getSelectedObjects(state){
            return state.seletected_objects;
        },
        getEditState(state){
            return state.editStatus;
        },
    },
}