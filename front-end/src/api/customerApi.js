import axiosClient from './axiosClient';

const customerApi = {
    getByIdUser(id) {
        return axiosClient.get(`/customer/${id}/customer`);
    },
    getOrderByIdUser(id) {
        return axiosClient.get(`customer/getorder/${id}`);
    },
    getAll() {
        return axiosClient.get('/customer');
    },
};

export default customerApi;