import { createStore } from 'vuex';
import {PromocodeModule} from "@/store/Promocode";

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        Promocode: PromocodeModule
    }
})