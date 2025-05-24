// src/api/userApi.js
import axiosClient from './axiosClient';

const cartApi = {
    getCart(user_id) {
        return axiosClient.get(`cart/${user_id}`);
    },
    addtocart(data) {
        return axiosClient.post('cart/add', data);
    },
    removetocart(id) {
        return axiosClient.delete(`cart/remove/${id}`);
    },
    updateQuantitytocart(cartId, quantity) {
        return axiosClient.put('cart/updatequantity', {
            CartID: cartId,
            Quantity: quantity
        });
    },
};

export default cartApi;

