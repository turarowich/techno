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
        addPromocode({ commit }, promocode) {
            commit('ADD_Promocode', promocode);
        },
        setPromocodeAPI({ commit },axios) {
            axios.get('https://localhost:8443/api/getPromocodes')
                .then(response => {
                    commit('SET_PromocodesAPI', response.data.objects)
                })
        }
    },

    getters:{
      allPromocodes(state){
          return state.promocodes
      }
    },
}