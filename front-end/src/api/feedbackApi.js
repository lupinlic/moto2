// src/api/userApi.js
import axiosClient from './axiosClient';

const feedbackApi = {
    sentfeedback(data) {
        return axiosClient.post('feedback', data);
    },
    getfeedback() {
        return axiosClient.get('feedback');
    },
    updatefeedback(id, data) {
        return axiosClient.put(`feedback/${id}`, data);
    },
    showfeedback(id) {
        return axiosClient.get(`feedback/${id}`);
    },
    showbycustomer(id) {
        return axiosClient.get(`feedback/customer/${id}`);
    }

};

export default feedbackApi;

