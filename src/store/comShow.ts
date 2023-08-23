import { MutationTree, Module } from 'vuex';

interface ShowItems {
    componentsShow:string|null,
}
const state: ShowItems = {
    componentsShow: 'Excess'
};
const mutations: MutationTree<ShowItems> = {
    upDataShow(state: ShowItems, val: string){
        state.componentsShow = val;
    }
};

const comShow= {
    namespaced: true,
    state,
    mutations
};

export default comShow;
