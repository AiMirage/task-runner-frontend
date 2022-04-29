import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Auth from './modules/auth';
import Projects from './modules/projects';
import Tasks from './modules/tasks';

export default new Vuex.Store({
    modules: {
        Auth,
        Projects,
        Tasks,
    }
})