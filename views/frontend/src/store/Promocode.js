export const PromocodeModule = {
    namespaced: true,

    state: {
        promocodes: [],
    },

    // Mutations are functions that effect the STATE.
    mutations: {
        ADD_Promocode(state, promocode) {
            state.promocodes.push(promocode);
        },
        SET_PromocodesAPI(state, promocodes) {
            state.promocodes = promocodes;
        },
    },

    // Actions are functions that you call throughout your application that call mutations.
    actions: {
        addPromocode({ commit,dispatch }, obj) {
            obj.axios.post('https://localhost:8443/api/addPromocode',{
                "promocode":obj.promocode,
                })
                .then(response => {
                    // commit('SET_PromocodesAPI', response.data.object)
                    console.log(response.data.object,commit);
                    dispatch("setPromocodeAPI",obj.axios)
                })
        },
        setPromocodeAPI({ commit },axios) {
            axios.get('https://localhost:8443/api/getPromocodes')
                .then(response => {
                    commit('SET_PromocodesAPI', response.data.objects)
                })
        },
        setPromocodeFromSearch({ commit },array){
            commit('SET_PromocodesAPI', array)
        }
    },

    getters:{
      allPromocodes(state){
          return state.promocodes
      }
    },
}