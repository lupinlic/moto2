import React, { useState, useEffect } from 'react';
import orderApi from '../../../api/orderApi';
import OrderDetails from './OrderDetails';
import ComfirmOrder from './ComfirmOrder';
import Bill from './Bill';

function Order() {
    const [order, setOrder] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormVisible1, setIsFormVisible1] = useState(false);
    const [isFormVisible2, setIsFormVisible2] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const fetchOrder = async () => {
        try {
            const response = await orderApi.getAll();
            setOrder(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Có lỗi khi lấy danh sách tài khoản:', error);
        }
    };
    useEffect(() => {
        fetchOrder();
    }, []);

    const openForm = (id = null, item) => {
        setSelectedOrderId(id);
        setSelectedOrder(item);
        setIsFormVisible(true);
    };

    // Đóng form
    const closeForm = () => {
        setIsFormVisible(false);
    };
    const openForm1 = (id = null) => {
        setSelectedOrderId(id);
        setIsFormVisible1(true);
    };

    // Đóng form
    const closeForm1 = () => {
        setIsFormVisible1(false);
    };
    const openForm2 = (item) => {
        setSelectedOrder(item);
        setIsFormVisible2(true);
    };

    // Đóng form
    const closeForm2 = () => {
        console.log('Đóng form 2');
        setIsFormVisible2(false);
    };
    const updateOrderStatus = (newStatus) => {
        setOrder((prevOrder) => ({
            ...prevOrder,
            status: newStatus,
        }));
    };
    const cancelOrder = async (id) => {
        try {
            await orderApi.cancelOrder(id);
            fetchOrder(); // Cập nhật danh sách đơn hàng sau khi hủy
        } catch (error) {
            console.error('Có lỗi khi hủy đơn hàng:', error);
        }
    };
    console.log(selectedOrder)
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingLeft: '4px' }}>
            <div className='container pt-4'>
                <h5>Đơn hàng</h5>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Ngày đặt</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Cập nhật</th>
                            <th>Phương thức TT</th>
                            <th>Trạng thái TT</th>
                            <th>Chi tiết</th>
                            <th>Hóa đơn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.OrderDate}</td>
                                <td>{item.TotalPrice}</td>
                                <td className=''>
                                    {item.status === 'pending'
                                        ? 'Chờ xác nhận'
                                        : item.status === 'processing'
                                            ? 'Đang giao hàng'
                                            : item.status === 'completed'
                                                ? 'Đã giao hàng'
                                                : item.status === 'canceled'
                                                    ? 'Đã hủy'
                                                    : 'Chưa xác định'}
                                </td>
                                <td className='d-flex flex-column ' style={{ minHeight: '60.7px' }}>
                                    {item.status === 'completed' ? (
                                        <span className='text-success'>Hoàn thành</span>
                                    ) : item.status === 'canceled' ? (
                                        <span className='text-danger'>Đã hủy</span>
                                    ) : (
                                        <button
                                            style={{ width: '100px' }}
                                            onClick={() => openForm1(item.OrderID)}
                                            className='btn btn-warning btn-sm mr-2'
                                        >
                                            Cập nhật
                                        </button>
                                    )}
                                    {item.status === 'pending' && (
                                        <button
                                            style={{ width: '100px' }}
                                            className='btn btn-danger btn-sm'
                                            onClick={() => cancelOrder(item.OrderID)}
                                        >
                                            Hủy đơn
                                        </button>
                                    )}
                                </td>
                                <td>{item.payment.Method === 'cod' ? <span>Thanh toán khi nhận hàng</span> : <span>Online</span>}</td>
                                <td>{item.payment.Status === 'pending' ? <span>Chưa thanh toán</span> : <span>Đã thanh toán</span>}</td>
                                <td className=''>
                                    <button title='Chi tiết' onClick={() => openForm(item.OrderID, item)} class="btn btn-warning btn-sm mr-2">Xem</button>
                                </td>
                                <td><button onClick={() => openForm2(item)} title='In hóa đơn' class="btn btn-warning btn-sm mr-2">In</button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            {isFormVisible && (
                <>
                    <div className="overLay"></div> {/* Lớp overlay */}
                    <OrderDetails
                        id={selectedOrderId}
                        data={{
                            customerName: selectedOrder.customer.FullName,
                            customerAddress: `${selectedOrder.address.SpecificAddress}, ${selectedOrder.address.Wards}, ${selectedOrder.address.Districts}, ${selectedOrder.address.Provinces}`,
                            total: selectedOrder.TotalPrice,
                            orderid: selectedOrder.OrderID,
                            date: selectedOrder.OrderDate,
                            customerPhone: selectedOrder.customer.PhoneNumber,

                        }}
                        onClose={closeForm}
                    // Truyền hàm fetchOrder vào props
                    />

                </>
            )}
            {isFormVisible1 && (
                <>
                    <div className="overLay"></div> {/* Lớp overlay */}
                    <ComfirmOrder
                        id={selectedOrderId}
                        onClose={closeForm1}
                        onUpdate={fetchOrder}
                    />
                </>
            )}
            {isFormVisible2 && (
                <>
                    <div className="overLay"></div>
                    <Bill
                        invoiceData={{
                            storeName: "EuroMotor",
                            storeAddress: "20 Tân Triều, Thanh Trì",
                            storePhone: "0328443736",
                            customerName: selectedOrder.customer.FullName,
                            customerAddress: `${selectedOrder.address.SpecificAddress}, ${selectedOrder.address.Wards}, ${selectedOrder.address.Districts}, ${selectedOrder.address.Provinces}`,
                            total: selectedOrder.TotalPrice,
                            orderid: selectedOrder.OrderID,
                            date: selectedOrder.OrderDate,
                            customerPhone: selectedOrder.customer.PhoneNumber,

                        }}
                        onClose={closeForm2}
                    />
                </>
            )}
        </div>
    )
}

export default Order