import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'
import Cookies from 'js-cookie'

Vue.use(Notifications, {velocity});

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.path !== '/login') {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (Cookies.get('user') === null) {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
