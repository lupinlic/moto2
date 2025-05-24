import React, { useState, useEffect } from "react";
import Crumb from '../../components/Crumb'
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import cartApi from "../../api/cartApi";
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

function Cart() {
    const navigate = useNavigate();
    const { fetchCartCount } = useContext(CartContext);
    const handletocheckout = () => {
        const selectedProducts = cart.filter(item => selectedItems.includes(item.CartID));
        navigate('/Checkout', { state: { selectedProducts } }); // Chuyển sang trang success khi đặt hàng thành công
    };
    const userId = localStorage.getItem('user_id');
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const handleSelect = (cartid) => {
        setSelectedItems(prev => {
            const newSelectedItems = prev.includes(cartid)
                ? prev.filter(id => id !== cartid)
                : [...prev, cartid];

            // Kiểm tra nếu tất cả sản phẩm đã được chọn
            if (newSelectedItems.length === cart.length) {
                setSelectAll(true); // Nếu đã chọn hết, đánh dấu "Chọn tất cả"
            } else {
                setSelectAll(false); // Nếu chưa chọn hết, bỏ đánh dấu "Chọn tất cả"
            }

            return newSelectedItems;
        });
    };
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]); // Nếu đang chọn tất cả, bỏ chọn tất cả
        } else {
            setSelectedItems(cart.map(item => item.CartID)); // Chọn tất cả sản phẩm
        }
        setSelectAll(!selectAll); // Đảo ngược trạng thái của "Chọn tất cả"
    };
    const handleIncrease = async (cartId, currentQty) => {
        const newQty = currentQty + 1;
        try {
            await cartApi.updateQuantitytocart(cartId, newQty);
            fetchCart(); // Cập nhật lại giỏ hàng từ server
        } catch (err) {
            console.error("Lỗi khi tăng số lượng:", err);
        }
    };

    const handleDecrease = async (cartId, currentQty) => {
        if (currentQty <= 1) return;
        const newQty = currentQty - 1;
        try {
            await cartApi.updateQuantitytocart(cartId, newQty);
            fetchCart(); // Cập nhật lại giỏ hàng
        } catch (err) {
            console.error("Lỗi khi giảm số lượng:", err);
        }
    };
    const fetchCart = async () => {
        try {
            let res;
            res = await cartApi.getCart(userId);
            setCart(res.data);
            console.log(res.data);

        } catch (err) {
            console.error("Lỗi lấy sản phẩm:", err);
        }
    };


    useEffect(() => {

        fetchCart();
    }, [userId]);
    // xóa
    function handledelete(cartid) {
        cartApi.removetocart(cartid)
            .then(() => {
                console.log("Đã xóa sản phẩm thành công");
                return fetchCart();

            })
            .catch(error => {
                console.error("Lỗi khi xóa", error);
            });
        fetchCartCount();
    }
    // tổng tiền
    const totalAmount = cart
        .filter(item => selectedItems.includes(item.CartID))
        .reduce((total, item) => total + item.product.ProductPrice * item.Quantity, 0);

    return (
        <>
            <Helmet>
                <title>Giỏ hàng</title>
            </Helmet>
            <Crumb
                name='Giỏ hàng' />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-8">
                        <div style={{ border: '1px solid #cecccc' }}>
                            <div className="row w-100 m-0 pt-2 pb-2 d-none d-md-flex">
                                <div className="col-md-6">
                                    <b>Thông tin sản phẩm</b>
                                </div>
                                <div className="col-md-2">
                                    <b>Đơn giá</b>
                                </div>
                                <div className="col-md-2">
                                    <b>Số lượng</b>
                                </div>
                                <div className="col-md-2">
                                    <b>Thành tiền</b>
                                </div>
                            </div>
                            {/* sản phẩm */}
                            {cart.map((cart, index) => (
                                <div key={index} className="row w-100 m-0 align-items-center pt-2 pb-2" style={{ borderTop: '1px solid #cecccc' }}>
                                    <div className="col-md-6 d-flex align-items-center col-12">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(cart.CartID)}
                                            onChange={() => handleSelect(cart.CartID)}
                                            style={{ marginRight: "10px" }}
                                        />
                                        <img style={{ width: '108px', height: '72px' }}
                                            src={`http://127.0.0.1:8000/image/${cart.product.category?.parent?.CategoryParentName}/${cart.product.category?.CategoryName}/${cart.product.ProductName}/${cart.color.ProductColorImg}`}
                                            alt={cart.ProductID}
                                        />
                                        <div className="ms-3">
                                            <b>{cart.product.ProductName}</b>
                                            <p className="m-0">{cart.version.ProductVersionName} / {cart.color.ProductColorName}</p>
                                            <p className="delete" onClick={() => handledelete(cart.CartID)}>Xóa</p>
                                        </div>
                                    </div>
                                    <div className="col-md-2 d-none d-md-block">
                                        <b style={{ color: '#ec3d40' }}>{Number(cart.product.ProductPrice).toLocaleString('vi-VN')} đ</b>
                                    </div>
                                    <div className="col-md-2 col-6">
                                        <div className='input-number-product m-0'>
                                            <button onClick={() => handleDecrease(cart.CartID, cart.Quantity)}>-</button>
                                            <input type='number' readOnly value={cart.Quantity} />
                                            <button onClick={() => handleIncrease(cart.CartID, cart.Quantity)}>+</button>
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-6">
                                        <b style={{ color: '#ec3d40' }}>{Number(cart.product.ProductPrice * cart.Quantity).toLocaleString('vi-VN')} đ</b>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-9 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                    style={{ marginRight: "10px" }}
                                />
                                <p className="m-0">Chọn tất cả</p>
                            </div>
                            <div className="col-md-3">
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="m-0">Tổng tiền:</p>
                                    <b style={{ color: '#ec3d40' }}>{totalAmount.toLocaleString('vi-VN')} đ</b>
                                </div>
                                <button onClick={handletocheckout} className="bt-thanhtoan">Thanh toán</button>

                            </div>

                        </div>
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                        <h6>Chọn thời gian giao hàng</h6>
                        <div className="row">
                            <div className="col-md-6">
                                <input placeholder="chọn ngày" type="date" className="date-pick" />

                            </div>
                            <div className="col-md-6">
                                <select className="date-pick">
                                    <option>Chọn thời gian</option>
                                    <option>Sáng</option>
                                    <option>Chiều</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart