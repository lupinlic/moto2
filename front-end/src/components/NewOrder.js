import React, { useEffect, useState, useRef } from 'react';
import orderApi from '../api/orderApi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function NewOrder() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const bellRef = useRef();

    useEffect(() => {
        fetchNewOrders();

        const interval = setInterval(fetchNewOrders, 10000); // mỗi 10s kiểm tra đơn mới
        return () => clearInterval(interval);
    }, []);

    const fetchNewOrders = async () => {
        try {
            const res = await orderApi.getNewOrders();
            setOrders(res.data);
        } catch (err) {
            console.error('Lỗi khi lấy đơn hàng mới:', err);
        }
    };

    const handleSingleMarkAsRead = async (id) => {
        console.log('Đánh dấu đơn hàng đã đọc:', id);
        try {
            await orderApi.markAsRead(id);
            // Tạo hiệu ứng mờ dần trước khi xoá khỏi danh sách
        } catch (err) {
            console.error('Lỗi khi đánh dấu đơn hàng:', err);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (bellRef.current && !bellRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="notification-bell1" ref={bellRef}>
            <div className="icon-wrapper1" onClick={toggleDropdown}>
                <i class="fas fa-bell" style={{ color: '#62677399' }}></i>
                {orders.length > 0 && <span className="badge1">{orders.length}</span>}
            </div>
            {showDropdown && (
                <div className="dropdown-box1">
                    <h6 className="dropdown-title1">Đơn hàng mới</h6>
                    {orders.length === 0 ? (
                        <p className="dropdown-empty1">Không có đơn hàng mới</p>
                    ) : (
                        <div>
                            <ul className="dropdown-list1">
                                {orders.map(order => (
                                    <li key={order.OrderID}>
                                        <Link onClick={(e) => {
                                            e.preventDefault(); // ngăn điều hướng ngay
                                            handleSingleMarkAsRead(order.OrderID);
                                            // sau khi hiệu ứng xong, bạn có thể chuyển trang nếu muốn
                                            setTimeout(() => {
                                                navigate('/Admin/Order')
                                            }, 500);
                                        }}>
                                            Đơn #{order.OrderID} - {new Date(order.OrderDate).toLocaleString()}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default NewOrder;
