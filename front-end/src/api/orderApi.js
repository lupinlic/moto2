import axiosClient from './axiosClient';

const orderApi = {
    addOrder(data) {
        return axiosClient.post('/order/place', data);
    },
    getAll() {
        return axiosClient.get('/order');
    },
    getById(id) {
        return axiosClient.get(`/order/${id}`);
    },
    getOrderItemById(id) {
        return axiosClient.get(`/orderItem/${id}`);
    },
    getAdvancedStatistics(params) {
        // params: { from_date: "2025-04-01", to_date: "2025-04-30", type: "month" }
        return axiosClient.get("/statistics", { params });
    },
    confirmOrder(id, status) {
        return axiosClient.put(`/orders/${id}/update-status`, {
            status: status,
        });
    },
    getNewOrders() {
        return axiosClient.get('/admin/orders/new');
    },
    markAsRead(id) {
        return axiosClient.post('/admin/orders/mark-notified', { id });
    },
    cancelOrder(id) {
        return axiosClient.post(`/orders/${id}/cancel`);
    },
    getpayUrl(Total, cartid, payload) {
        return axiosClient.post('momo-payment', { Total: Total, cartid: cartid, payload: payload });
    }




};

export default orderApi;