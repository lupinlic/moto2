// src/api/userApi.js
import axiosClient from './axiosClient';

const feedbackApi = {
    sentfeedback(data) {
        return axiosClient.post('feedback', data);
    },
    getfeedback() {
        return axiosClient.get('feedback');
    }
};

export default feedbackApi;

