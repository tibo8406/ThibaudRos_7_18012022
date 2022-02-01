import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import SocialGroup from '../views/SocialGroup.vue'
import Authentification from '../views/Authentification.vue'




Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        children: [{
                path: '/auth',
                component: Authentification,
                children: [
                    { path: '', redirect: 'Login' },
                    { path: 'Login', component: Login },
                    { path: 'Signup', component: Signup }
                ]
            },


        ]
    },

    { path: '/SocialGroup', name: 'SocialGroup', component: SocialGroup },


]

const router = new VueRouter({
    routes
})

export default router