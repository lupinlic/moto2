// src/api/userApi.js
import axiosClient from './axiosClient';

const categoryApi = {
    getCategorybyPrarent(CategoryParentID) {
        return axiosClient.get(`category/${CategoryParentID}/category`);
    },
    getCategorybyID(id) {
        return axiosClient.get(`category/${id}`);
    },
    addCategory(category) {
        return axiosClient.post('category', category);
    },
    updateCategory(id, category) {
        return axiosClient.put(`category/${id}`, category);
    },
    deleteCategory(id) {
        return axiosClient.delete(`category/${id}`);
    },
    getCategory() {
        return axiosClient.get('category');
    },

};

export default categoryApi;

