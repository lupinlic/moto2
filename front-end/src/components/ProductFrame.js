import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import favoriteProductApi from '../api/favoriteProductApi';
import "../styles/productFrame.css"
import { useNavigate } from "react-router-dom";

const ProductFrame = ({ image, name, price, id, onUnfavorite }) => {
    const { fetchfavoriteCount } = useContext(CartContext);
    const user_Id = localStorage.getItem('user_id');
    const [message, setMessage] = useState("");
    const { favorites, setFavorites, userId } = useContext(CartContext);
    const [isFavorited, setIsFavorited] = useState(false);
    const navigate = useNavigate();

    const handleToProductDetails = () => {
        navigate(`/ProductDetails?product=${id}`);
    };
    useEffect(() => {
        // Kiểm tra xem sản phẩm đã yêu thích chưa khi component được render
        const isProductFavorited = favorites.some(item => item.ProductID === id);
        setIsFavorited(isProductFavorited);
    }, [favorites, id]);

    const handleToggleFavorite = async () => {
        if (!user_Id) {
            alert('Bạn cần đăng nhập để sử dụng tính năng này!');
            return;
        }

        try {
            // Gọi API để thêm/xóa sản phẩm khỏi yêu thích
            const response = await favoriteProductApi.togglefavorites(user_Id, id);
            console.log('Toggle response:', response);

            if (response.favorited) {
                setFavorites(prevFavorites => [...prevFavorites, { ProductID: id, name, price, image }]);
                setMessage("Đã thêm vào danh sách yêu thích");
            } else {
                setFavorites(prev => prev.filter(item => item.ProductID !== id));
                setMessage("Đã xóa khỏi danh sách yêu thích");
                if (onUnfavorite) {
                    onUnfavorite(id);
                }
            }
            setIsFavorited(response);
            await fetchfavoriteCount();
            console.log("Đã gọi fetchfavoriteCount");
        } catch (error) {
            console.error('Error toggling favorite', error);
        }
        setTimeout(() => setMessage(""), 2000);
    };

    return (
        <>
            <div className='product-card'>
                <div className='product-thumnail'>
                    <img className='' style={{ width: '100%', height: '155px' }} src={image} alt={name} />
                    <div className="half-circle">
                        <div>
                            <button onClick={handleToProductDetails} >Xem chi tiết</button>
                        </div>
                    </div>
                </div>
                <div className='product-info'>
                    <h4>{name}</h4>
                    <div className='price-box'>{Number(price).toLocaleString('vi-VN')}
                        <span className='line-under'>đ</span>
                    </div>
                </div>
                <div
                    className={`heart ${isFavorited ? "liked" : ""}`}
                    onClick={() => handleToggleFavorite()}>
                    {isFavorited ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
                </div>
                {message && <div style={{ padding: '8px', position: 'absolute', width: '200px', height: '70px', border: '1px solid red', background: '#fff', color: 'red', top: '50%', right: '50%', zIndex: '10' }}>
                    {message}
                </div>}
            </div>


        </>
    )
}

export default ProductFrame