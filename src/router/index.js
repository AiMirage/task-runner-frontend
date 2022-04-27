import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Projects',
        component: () => import('../views/Projects')
    },
    {
        path: '/projects',
        name: 'Projects',
        component: () => import('../views/Projects')
    },
    {
        path: '/project/:id',
        name: 'Project',
        component: () => import('../views/Project')
    }
]

const router = new VueRouter({
    routes
})

export default router
