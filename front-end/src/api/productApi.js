// src/api/userApi.js
import axiosClient from './axiosClient';

const productApi = {
    getproductbyCategory(CategoryID) {
        return axiosClient.get(`/products/bycategory/${CategoryID}`);
    },
    getproductbyCategoryparent(CategoryID) {
        return axiosClient.get(`/products/bycategoryparent/${CategoryID}`);
    },
    getproductbyID(CategoryID) {
        return axiosClient.get(`/products/${CategoryID}`);
    },
    getAll() {
        return axiosClient.get('/products');
    },
    getProductVersionByID(ProductID) {
        return axiosClient.get(`productversion/byproduct/${ProductID}`);
    },
    getProductColorByID(ProductID) {
        return axiosClient.get(`productcolor/byproduct/${ProductID}`);
    },
    addProduct(data) {
        return axiosClient.post('/products', data);
    },
    updateProduct(id, data) {
        return axiosClient.put(`/products/${id}`, data);
    },
    deleteProduct(id) {
        return axiosClient.delete(`/products/${id}`);
    },
    getVersionByID(id) {
        return axiosClient.get(`productversion/${id}`);
    },
    addProductVersion(data) {
        return axiosClient.post('/productversion', data);
    },
    updateProductVersion(id, data) {
        return axiosClient.put(`/productversion/${id}`, data);
    },
    deleteProductVersion(id) {
        return axiosClient.delete(`/productversion/${id}`);
    },
    addProductColor(data) {
        return axiosClient.post('/productcolor', data);
    },
    updateProductColor(id, data) {
        return axiosClient.put(`/productcolor/${id}`, data);
    },
    deleteProductColor(id) {
        return axiosClient.delete(`/productcolor/${id}`);
    },
    getVersion: (page = 1, perPage = 5) => {
        return axiosClient.get('/productversion', {
            params: { page, per_page: perPage }
        });
    },
    getColor: (page = 1, perPage = 5) => {
        return axiosClient.get('/productcolor', {
            params: { page, per_page: perPage }
        });
    },
};

export default productApi;

