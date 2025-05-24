// src/api/userApi.js
import axiosClient from './axiosClient';

const categoryParentApi = {
    getCategoryPrarent() {
        return axiosClient.get('category_parent');
    },
    getCategoryParentbyID(id) {
        return axiosClient.get(`category_parent/${id}`);
    },
    addCategoryParent(data) {
        return axiosClient.post('category_parent', data);
    },
    updateCategoryParent(id, data) {
        return axiosClient.put(`category_parent/${id}`, data);
    },
    deleteCategoryParent(id) {
        return axiosClient.delete(`category_parent/${id}`);
    },
};

export default categoryParentApi;

