import axiosClient from './axiosClient';

const favoriteProductApi = {
    getfavorites(id) {
        return axiosClient.get(`favorite/byuser/${id}`);
    },
    togglefavorites(user_id, productid) {
        return axiosClient.post('/favorites', {
            UserID: user_id,
            ProductID: productid
        });
    }

};

export default favoriteProductApi;