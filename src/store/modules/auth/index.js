import {WebApi, endpoints} from "@/web-service";
import Vue from 'vue'
import Cookies from 'js-cookie'

const state = {
    user: {},
};

const getters = {

    getUser: state => {
        return state.user;
    },
};

const mutations = {

    SET_USER(state, user) {
        Cookies.set('user', JSON.stringify(user));
    },

};

const actions = {

    login(context, payload) {
        return new Promise((resolve, reject) => {
            WebApi.post(endpoints.LOGIN, payload)
                .then(response => {
                    console.log(response.data.data);
                    Vue.notify({
                        group: 'loggedIn',
                        type: 'success',
                        text: response.data.message
                    });
                    context.commit('SET_USER', response.data.data);
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