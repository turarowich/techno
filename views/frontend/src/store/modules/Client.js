//not used since child components were merged
export const ClientModule = {
    namespaced: true,
    state: {
        user:{},
        userDiscountStatus:{},
        orders:[],
        history:[],
    },

    // Mutations are functions that effect the STATE.
    mutations: {
        set_user_auth(state, user) {
            state.user = user;
        },
        set_user_orders(state, orders) {
            state.orders = orders;
        },
        set_user_history(state, history) {
            state.history = history;
        },
        set_user_status(state, obj) {
            state.userDiscountStatus = obj;
        },
        set_user_object(state, object) {
            if(state.user.object){
                state.user.object = object;
            }
        },
        log_out(state) {
            state.user = {};
            state.userDiscountStatus={};
            state.orders=[];
            state.history=[];
        },
    },

    // Actions are functions that you call throughout your application that call mutations.
    actions: {
        setUserAuth: function({commit},user){
            commit('set_user_auth' ,user)
        },
        logout: function({commit}){
            commit('log_out')
        },
        updateUserData:function ({commit},obj){
            obj.axios.get(obj.url,obj.options)
                .then(response => {
                    console.log(response);
                    commit('set_user_object' ,response.data.object);
                    commit('set_user_orders' ,response.data.orders);
                    commit('set_user_history' ,response.data.history);
                    commit('set_user_status' ,response.data.discount || {name:'',discount_percentage:0});
                })
        },
    },

    getters:{
        getUserStatus(state){
            return state.user.auth;
        },
        getUser(state){
            return state.user.object;
        },
        getUserToken(state){
            return state.user.token;
        },
        getUserOrders(state){
            return state.orders;
        },
        getUserHistory(state){
            return state.history;
        },
        getUserDiscountStatus(state){
            return state.userDiscountStatus;
        },
    },
}