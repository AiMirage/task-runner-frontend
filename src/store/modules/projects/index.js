import {WebApi, endpoints} from "@/web-service";
import Vue from 'vue'

const state = {

    projects: [],

};

const getters = {

    projects: state => {
        return state.projects;
    }

};

const mutations = {

    SET_PROJECTS(state, projects) {
        state.projects = projects;
    },

    RESET_PROJECTS(state) {
        state.projects = [];
    }

};

const actions = {

    fetchAll(context) {

        return new Promise((resolve, reject) => {
            WebApi.get(endpoints.PROJECTS)
                .then(response => {
                    Vue.notify({
                        group: 'loggedIn',
                        type: 'success',
                        text: response.data.message
                    });
                    context.commit('SET_PROJECTS', response.data.data);
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