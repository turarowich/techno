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
                .then((response) => {
                    commit('SET_PromocodesAPI', response.data.objects)
                }).catch((error) =>{
                    console.log(error,"oiooioi");
                    commit('SET_PromocodesAPI', []);
                })
        },
        setPromocodeFromSearch({ commit },array){
            commit('SET_PromocodesAPI', array)
        },
        setPromocodeObject({ commit },obj){
            commit('SET_PromocodesObject', obj);
            commit('SET_EditState', true);
        },
        setPromocodeSelectedObjects({ commit },obj){
            commit('SET_PromocodesSelectedOjects', obj);
        },
        setEditState({ commit },status){
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