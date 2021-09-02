import axios from 'axios';
import uuid from "uuid/v4";
import api from '../config/api';
import jwtDecode from 'jwt-decode';
import Roles from '../config/Roles';
import { isDefined } from '../helpers/utils';

function authenticate(credentials) {
    return api.post('/api/login_check', credentials)
                .then(response => response.data.token)
                .then(token => {
                    window.localStorage.setItem("authToken", token);
                    return true;
                })
}

function authenticateWithFacebook(credentials) {
    return api.post('/api/facebook_login', credentials)
                .then(response => response.data.token)
                .then(token => {
                    window.localStorage.setItem("authToken", token);
                    return true;
                })
}

function logout() {
    return api.get('/logout')
                .then(response => {
                    window.localStorage.removeItem("authToken");
                    return true;
                });
}

function setup() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { exp } = jwtDecode(token);
        if (exp * 1000 > new Date().getTime()) {
            return ;
        }
    }
    logout();
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { exp } = jwtDecode(token);
        if (exp * 1000 > new Date().getTime())
            return true;
    }
    return false;
}

function getCurrentUser() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { exp, id, name, roles, email, metas } = jwtDecode(token);
        if (exp * 1000 > new Date().getTime()) {
            return {id, email, name, roles: Roles.filterRoles(roles), metas, userId: uuid()} ;
        }
    }
    return getDefaultUser();
}

function getDefaultUser() {
    return {id:-1, name: "", email: "", roles: Roles.getDefaultRole(), metas: null, userId: uuid()};
}

function isDefaultUser(user) {
    const defaultUser = getDefaultUser();
    return defaultUser.id === user.id;
}

function setErrorHandler(setCurrentUser, setIsAuthenticated) {
    axios.defaults.withCredentials = true
    axios.interceptors.response.use(response => response, error => {
        if (error.response !== undefined) {
            if (error.response.status === 401) {
                logout().then(res => {
                    setIsAuthenticated(false);
                    setCurrentUser(getCurrentUser());
                    return ;
                })
            }
        }
        return Promise.reject(error);
    });
}

function getGeolocation() {
    const country = window.sessionStorage.getItem("country");
    return isDefined(country) ? new Promise((resolve, reject) => resolve(country)) :
        axios.get('https://freegeoip.app/json/')
            .then(response => {
                window.sessionStorage.setItem("country", response.data.country_code);
                return response.data.country_code;
            })
            .catch(error => "RE");
}

function getUserSettings() {
    return api.get('/api/groups')
              .then(response => {
                  const data = response.data['hydra:member'];
                  if (data.length > 1) {
                        const superAdmin = data.find(group => group.value === "ROLE_SUPER_ADMIN");
                        const admin = data.find(group => group.value === "ROLE_ADMIN");
                        return isDefined(superAdmin) ? superAdmin : admin;
                  } else {
                      return data[0];
                  }
                });
}

function updatePassword(user, passwords) {
    return api.post('/api/reset-password', {username: user.email, passwords})
              .then(response => response.data);
}

function deleteAccount(user, password) {
    return api.post('/api/delete-account', {username: user.email, password})
              .then(response => response.data);
}

function resetPassword(email) {
    return api.post('/api/forgot-password', {username: email})
              .then(response => response.data);
}

function refreshUser(user) {
    return ({...user, uuid: uuid()});
}

function findResetByToken(token) {
    return api.get('/api/reset_passwords?isUsed=false&token=' + token)
}

function resetAccountPassword(reset, password) {
    return api.post('/api/reset_account_password/' + reset.id, {password: password});
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated,
    getCurrentUser,
    isDefaultUser,
    setErrorHandler,
    getGeolocation,
    getUserSettings,
    updatePassword,
    deleteAccount,
    refreshUser,
    resetPassword,
    findResetByToken,
    resetAccountPassword,
    authenticateWithFacebook
}