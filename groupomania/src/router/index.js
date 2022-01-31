import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import SocialGroup from '../views/SocialGroup.vue'



Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/Login', name: 'Login', component: Login },
    { path: '/Signup', name: 'Signup', component: Signup },
    { path: '/SocialGroup', name: 'SocialGroup', component: SocialGroup },


]

const router = new VueRouter({
    routes
})

export default router