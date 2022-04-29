import axios from 'axios';
import Cookies from 'js-cookie'

const WebApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
    }
});

const endpoints = {
    LOGIN: 'login',
    PROJECTS: 'projects',
    TASKS: 'tasks',
};

/**
 * Add auth header if token exist
 */
(function () {
    let authToken = null;
    let user = Cookies.get("user");
    if (user) {
        authToken = JSON.parse(user).token
    }

    if (authToken === null) {
        // This means that there ISN'T JWT and no user is logged in.
        WebApi.defaults.headers.common.Authorization = null;
    } else {
        // This means that there IS a JWT so someone must be logged in.
        WebApi.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    }
})();

export {
    WebApi,
    endpoints
};