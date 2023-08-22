import { createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import ExcessView from '../views/ExcessView.vue';
import { nextTick } from 'vue';
import ErrorView from '../views/ErrorView.vue';
import store from '../store';

const router = createRouter({
    history: process.env.NODE_ENV === 'development' ? createWebHashHistory(process.env.BASE_URL) : createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: HomeView,
            meta: {
                AuthRouter: true
            }

        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
            meta: {
                AuthRouter: true
            }
        },
        {
            path: '/',
            name: 'login',
            component: LoginView

        }, {
            path: '/excess',
            name: 'excess',
            component: ExcessView,
            meta: {
                AuthRouter: true
            }
        },
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: ErrorView
        }
    ]
});

router.beforeEach((to, from, next) => {
    let token = store.state.user.token
    // 检查路由元信息中是否要求认证
    if (to.meta.AuthRouter && !token) {
        next('/');
    } else {
        // 否则，继续导航
        next();
    }
});
export default router;
