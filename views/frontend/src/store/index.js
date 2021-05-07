import { createStore } from 'vuex';
import {PromocodeModule} from "@/store/Promocode";
import {OrdersModule} from "@/store/Orders";
import {LoyaltyModule} from "@/store/Loyalty";

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        Promocode: PromocodeModule,
        Orders: OrdersModule,
        Loyalty: LoyaltyModule,
    }
})