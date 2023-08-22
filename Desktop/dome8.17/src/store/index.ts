import { createStore } from 'vuex';
// import { RootState } from './stateModel';
// import getters from './getters';
import user from './user';
import comShow from './comShow';
import admin from './admin';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// const state: RootState = {
//     menuHidden: false
// };
import createPersistedState from "vuex-persistedstate"
export default createStore({
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        user, comShow, admin
},

    plugins: [createPersistedState({
        key: 'zzq',
        storage: window.sessionStorage,
        paths: ['user', 'comShow', 'admin']
    })]
    // mutations: {
    //     _toogleSideShrink(state: RootState, status?: boolean) {
    //         if (typeof status !== 'undefined') {
    //             state.menuHidden = status;
    //         } else {
    //             state.menuHidden = !state.menuHidden;
    //         }
    //     }
    // },
    // actions: {
    //     toogleSideShrink({ commit }, status?: boolean) {
    //         commit('_toogleSideShrink', status);
    //     }
    // }
   
});
