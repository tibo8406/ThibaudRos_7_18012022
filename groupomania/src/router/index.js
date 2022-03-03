import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import SocialGroup from '../views/SocialGroup.vue'
import Authentification from '../views/Authentification.vue'
import Post from '../components/Post.vue'
import UserAccount from '../views/UserAccount.vue'
import postView from '../components/postView.vue'
import commentPost from '../components/commentPost.vue'







Vue.use(VueRouter)

const routes = [
    { path: '/', component: App, redirect: 'Login' },
    { path: '/Auth', component: Authentification, redirect: 'Login' },
    { path: '/Login', component: Login },
    { path: '/Signup', component: Signup, },
    {
        path: '/SocialGroup',
        component: SocialGroup,
        children: [
            { path: 'Post', component: Post, },
            { path: 'commentPost', component: commentPost, },
            { path: 'postView', component: postView, }
        ]
    },
    { path: '/useraccount', component: UserAccount, },


    /*{path: '/',
    name: 'App',
    component: App,
    children: [{
        path: '/auth',
        component: Authentification,
        children: [
            { path: '', redirect: 'Login' },
            { path: 'Login', component: Login },
            { path: 'SocialGroup', component: SocialGroup },
            { path: 'Signup', component: Signup },
            { path: 'Post', component: Post }
        ]
    }*/
]

const router = new VueRouter({
    routes
})

export default router