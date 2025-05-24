import React, { useEffect, useState } from 'react'
import Crumb from '../../components/Crumb'
import { Helmet } from "react-helmet-async";
import ProductFrame from '../../components/ProductFrame';
import favoriteProductApi from '../../api/favoriteProductApi';
import '../../styles/product.css'

function LikeProduct() {
    const userId = localStorage.getItem('user_id');
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const fetchfavoriteProducts = async () => {
        try {
            const response = await favoriteProductApi.getfavorites(userId);
            setFavoriteProducts(response.data);
        } catch (error) {
            console.error('Có lỗi khi lấy sản phẩm yêu thích:', error);
        }
    }
    useEffect(() => {
        fetchfavoriteProducts();
    }, [userId]);

    const handleUnfavorite = (productId) => {
        setFavoriteProducts(prev => prev.filter(product => product.ProductID !== productId));
    };
    return (
        <div>
            <Helmet>
                <title>Sản phẩm yêu thích</title>
            </Helmet>
            <Crumb
                name='Sản phẩm yêu thích' />
            <div className='container mt-5'>
                <div className='likeproduct' >
                    {favoriteProducts.length > 0 ? (
                        favoriteProducts.map((product) => (
                            <ProductFrame
                                id={product.ProductID}
                                name={product.ProductName}
                                image={`http://127.0.0.1:8000/image/${product.CategoryParentName}/${product.CategoryName}/${product.ProductName}/${product.thumbnail}`}
                                price={product.ProductPrice}
                                onUnfavorite={handleUnfavorite}
                            />

                        ))
                    ) : (
                        <p>Không có sản phẩm yêu thích nào.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LikeProduct