import { createStore } from 'vuex';
import {PromocodeModule} from "@/store/Promocode";
import {OrdersModule} from "@/store/Orders";
import {LoyaltyModule} from "@/store/Loyalty";
import createPersistedState from "vuex-persistedstate";
import {CatalogModule} from "@/store/Catalog";
import {ClientModule} from "@/store/modules/Client";
import { MessageModule } from "@/store/Message";
// import * as Cookies from 'js-cookie';
export default createStore({
    modules: {
        Promocode: PromocodeModule,
        Orders: OrdersModule,
        Loyalty: LoyaltyModule,
        Catalog: CatalogModule,
        Client: ClientModule,
        Message :MessageModule
    },
    plugins: [createPersistedState()],
    state: {},
    mutations: {},
    actions: {},
    getters:{},

})