import { createStore } from 'vuex';
import {PromocodeModule} from "@/store/Promocode";
import {OrdersModule} from "@/store/Orders";
import {LoyaltyModule} from "@/store/Loyalty";
import createPersistedState from "vuex-persistedstate";
// import * as Cookies from 'js-cookie';
export default createStore({
    modules: {
        Promocode: PromocodeModule,
        Orders: OrdersModule,
        Loyalty: LoyaltyModule,
    },
    // plugins: [createPersistedState({
    //     storage: {
    //         getItem: key => Cookies.get(key),
    //         setItem: (key, value) => Cookies.set(key, value, { expires: 1, secure: false }),
    //         removeItem: key => Cookies.remove(key)
    //     }
    // })],
    plugins: [createPersistedState()],
    state: {},
    mutations: {},
    actions: {},
    getters:{},

})