import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userToken: String,
        userFirstName: String,
        userLastName: String,
        userId: Number,
        userJob: String,
        userMail: String,
        loggedIn: false,
    },
    mutations: {
        createUserInfo: (state, userInfos) => {
            state.userId = userInfos.id;
            state.userToken = userInfos.token;
            //state.loggedIn = userInfos.loggedIn;
        }
    },
    actions: {

    },
    getters: {
        completeUserName(state) {
            return `${state.userFirstName} ${state.userLastName}`
        }
    },
    modules: {},
    plugins: [createPersistedState()]
})