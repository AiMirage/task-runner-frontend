import {WebApi, endpoints} from "@/web-service";
import Vue from 'vue'

const state = {

    tasks: [],

};

const getters = {

    tasks: state => {
        return state.tasks;
    }

};

const mutations = {

    SET_TASKS(state, projects) {
        state.tasks = projects;
    },

    RESET_TASKS(state) {
        state.tasks = [];
    }

};

const actions = {

    fetchAll(context, payload) {

        const url = endpoints.PROJECTS + '/' + payload + '/tasks';

        return new Promise((resolve, reject) => {
            WebApi.get(url)
                .then(response => {
                    Vue.notify({
                        group: 'loggedIn',
                        type: 'success',
                        text: response.data.message
                    });
                    context.commit('SET_TASKS', response.data.data);
                    resolve(response);
                }).catch(error => {
                Vue.notify({
                    group: 'loggedIn',
                    type: 'error',
                    text: error.data.message
                });
                reject(error);
            });
        })

    }

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}