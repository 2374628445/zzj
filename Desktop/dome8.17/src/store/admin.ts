import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
export default createStore({
    state: {
        company: [
            {
                'id': '64cded524fad2728558a91a5',
                'role': [
                    'admin',
                    'user'
                ],
                'name': 'CeMeta'
            },
            {
                'id': '64cdede34fad2728558a91c6',
                'role': [
                    'user',
                    'admin'
                ],
                'name': '美的'
            },
            {
                'id': '64d9c7b127cdc129400d39f8',
                'role': [
                    'user',
                    'admin'
                ],
                'name': 'Test-Com'
            }
        ],
        user: {
            'token': 'dfsNohmgFGdCSWwwOuJxyaEQAp2nTpd-JhfvcTIglqA',
            'user': {
                'id': '64cb7938f8f168bfcbf4b9c7',
                'companyId': '',
                'name': '18001194251',
                'phone': {
                    'number': '18001194251',
                    'verify': true
                },
                'email': {},
                'role': []
            }
        }
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {

    },
    plugins: [createPersistedState()]
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


// {
//     "token": "RUfiGuc34CC5UdrZ3w7sqyDlAoU-wY6SsvgGeIcbi70",
//         "user": {
//         "id": "64dddbf6d6ec9238b84af377",
//             "companyId": "",
//                 "name": "郑志杰",
//                     "phone": {
//             "number": "195****7486",
//                 "verify": true
//         },
//         "email": { },
//         "role": []
//     },
//     "company": [
//         {
//             "id": "64cded524fad2728558a91a5",
//             "role": [
//                 "user"
//             ],
//             "name": "CeMeta"
//         }
//     ]
// }