import { MutationTree, ActionTree, Module } from 'vuex';
import Api from '@/api';
import router from '../router';
import { ElMessage } from 'element-plus';
import { RootState, UserState } from './stateModel';
// import router from '../router';

const state: UserState = {

};
const mutations: MutationTree<UserState> = {

    _login(state: UserState, user: UserState) {
        state.token = user.token;
        state.user = user.user;
        state.company = user.company;
        router.replace({
            path: '/'
        });

        if (user.token && user.user?.companyId) {

            localStorage.setItem('cemeta_admin_token', user.token);
            localStorage.setItem('cemeta_admin_company', user.user?.companyId);
            // router.replace({
            //     path: '/index'
            // });
        }
    },
    _logout(state: UserState) {
        localStorage.removeItem('cemeta_admin_token');
        localStorage.removeItem('cemeta_admin_company');
        state.company = undefined;
        state.token = undefined;
        state.user = undefined;
        router.replace({
            path: '/excess'
        });
    }
};
const actions: ActionTree<UserState, RootState> = {
    async login({ commit }, option: { type: 'code' | 'resume', phone?: string, code?: string, companyId?: string }) {
        
        const { type, phone, code, companyId } = option;

     
        let user: ApiResult = {};

        if (type === 'code') {
            if (!phone || !code) {
                return;
            }
            user = await Api.Application.login('code', { phone, code, companyId });
        }
        // const token = localStorage.getItem('zzq')
        // console.log(token)
        // if (type === 'resume') {
        //     const token = sessionStorage.getItem('zzq')
        //     console.log(token)
        //     const companyId = localStorage.getItem('cemeta_admin_company');
        //     if (!token || !companyId) {
        //         router.replace({
        //             path: '/login'
        //         });
        //         return;
        //     }
        //     user = await Api.Application.login('resume', token);
        // }

        if (user.data) {
            return commit('_login', user.data);
        } else {
            if (type !== 'resume') {
                ElMessage({
                    message: '登陆失败！',
                    type: 'error',
                })
            }
            router.replace({
                path: '/'
            });
            return;
        }
    },
    logout({ commit }) {
        return commit('_logout');
    }
    //存储数据 user数据
};
const user: Module<UserState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions
};



export default user;



