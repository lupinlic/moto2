// src/api/userApi.js
import axiosClient from './axiosClient';

const fbAndggApi = {
    loginwithfabook() {
        return axiosClient.get('auth/facebook');
    },
    loginwithgoogle() {
        return axiosClient.get('auth/google');
    },
    getfacebookuser() {
        return axiosClient.get('auth/facebook/callback');
    },
    getgoogleuser() {
        return axiosClient.get('auth/google/callback');
    },
};

export default fbAndggApi;

