import { createContext, useState, useEffect } from 'react';
import cartApi from '../api/cartApi';
import favoriteProductApi from '../api/favoriteProductApi';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem('user_id'));
    const [cartCount, setCartCount] = useState(0);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [favorites, setFavorites] = useState([]);

    const fetchCartCount = async () => {
        if (!userId) return setCartCount(0);
        try {
            const res = await cartApi.getCart(userId); // sửa theo API của bạn
            setCartCount(res.data.length); // hoặc res.data.totalQuantity tuỳ cấu trúc
        } catch (error) {
            console.error('Lỗi lấy số lượng giỏ hàng:', error);
        }


    };
    const fetchfavoriteCount = async () => {
        if (!userId) return setFavoriteCount(0);
        try {
            const res = await favoriteProductApi.getfavorites(userId); // sửa theo API của bạn
            setFavorites(res.data);
            setFavoriteCount(res.data.length); // hoặc res.data.totalQuantity tuỳ cấu trúc
        } catch (error) {
            console.error('Lỗi lấy số lượng sp yêu thích:', error);
        }


    };

    useEffect(() => {
        if (userId) {
            fetchCartCount();
            fetchfavoriteCount();
        }
    }, [userId]);

    useEffect(() => {
        const handleStorageChange = () => {
            setUserId(localStorage.getItem('user_id'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);


    return (
        <CartContext.Provider value={{
            cartCount, setCartCount,
            favoriteCount, setFavoriteCount,
            favorites, setFavorites, fetchCartCount,
            fetchfavoriteCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
