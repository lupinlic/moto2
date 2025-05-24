// src/api/userApi.js
import axiosClient from './axiosClient';

const newsApi = {
    getNews() {
        return axiosClient.get('news');
    },
    getNewsbyID(id) {
        return axiosClient.get(`news/${id}`);
    },
    addNews(data) {
        return axiosClient.post('news', data);
    },
    updateNews(data) {
        return axiosClient.put(`news/${data.id}`, data);
    }
};

export default newsApi;

