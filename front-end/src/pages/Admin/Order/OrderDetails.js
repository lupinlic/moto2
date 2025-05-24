import React, { useState, useEffect } from 'react';
import orderApi from '../../../api/orderApi';

const OrderDetails = ({ id, onClose, data }) => {
    const [order, setOrder] = useState([]);
    const fetchOrder = async () => {
        try {
            const response = await orderApi.getOrderItemById(id);
            setOrder(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Có lỗi khi lấy danh sách tài khoản:', error);
        }
    };
    useEffect(() => {
        fetchOrder();
    }, []);
    return (
        <div className="form-popup111" style={{ width: '650px' }}>
            <form className="form-container">
                <h4 className='mt-3'>Thông tin đơn hàng</h4>

                <p>Tên khách hàng: {data.customerName}</p>
                <p>Số điện thoại: {data.customerPhone}</p>
                <p>Địa chỉ nhận hàng: {data.customerAddress}</p>
                <p>Ngày đặt: {data.date}</p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Phiên bản</th>
                            <th>Màu sắc</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.product.ProductName}</td>
                                <td>{item.product_color.ProductColorName}</td>
                                <td>{item.product_version.ProductVersionName}</td>
                                <td>{item.Quantity}</td>
                                <td>{item.product.ProductPrice}</td>

                            </tr>
                        ))}

                    </tbody>
                </table>
                <div className='form-bt'>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
                </div>
            </form>
        </div>
    )
}

export default OrderDetails