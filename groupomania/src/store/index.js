import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userToken: "",
        userFirstName: "",
        userLastName: "",
        userId: "",
        userJob: "",
        userMail: "",
        userPassword: "",
        userImg: ""
    },
    mutations: {
        createUserInfo: (state, userInfos) => {
            state.userId = userInfos.id;
            state.userToken = userInfos.token;
        },
        updateUserInfo: (state, userInfos) => {
            state.userJob = userInfos.poste;
            state.userLastName = userInfos.nom;
            state.userFirstName = userInfos.prenom;
            state.userMail = userInfos.email;
            state.userPassword = userInfos.password;
            state.userImg = userInfos.urlImg;
        },
        logOutUser: (state, userInfos) => {
            state.userId = userInfos.id;
            state.userToken = userInfos.token;
            state.userJob = userInfos.poste;
            state.userLastName = userInfos.nom;
            state.userFirstName = userInfos.prenom;
            state.userMail = userInfos.email;
            state.userPassword = userInfos.password;
            state.userImg = userInfos.urlImg;
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