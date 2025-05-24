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

    const openForm = (id = null) => {
        setSelectedOrderId(id);
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
    console.log(selectedOrder)
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingLeft: '4px' }}>
            <div className='container pt-4'>
                <h5>Đơn hàng</h5>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>PhoneNumber</th>
                            <th>Email</th>
                            <th>OrderDate</th>
                            <th>TotalPrice</th>
                            <th>Status</th>
                            <th>Address</th>
                            <th>PTTT</th>
                            <th>TTTT</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.customer.FullName}</td>
                                <td>{item.customer.PhoneNumber}</td>
                                <td>{item.customer.Email}</td>
                                <td>{item.OrderDate}</td>
                                <td>{item.TotalPrice}</td>
                                <td className=''>{item.status}<tr />
                                    {item.status === 'completed' ? <span className='text-success'>Hoàn thành</span> : <button style={{ width: '100px' }} onClick={() => openForm1(item.OrderID)} className='btn btn-warning btn-sm mr-2'>Cập nhật</button>}

                                </td>
                                <td>{item.address.SpecificAddress},{item.address.Wards},{item.address.Districts},{item.address.Provinces}</td>
                                <th>PTTT</th>
                                <td>Chưa TT</td>
                                <td className=''>
                                    <i title='Chi tiết' onClick={() => openForm(item.OrderID)} class="fa-solid fa-eye eye"></i>
                                    <i onClick={() => openForm2(item)} title='In hóa đơn' class="fa-solid fa-print eye"></i>
                                </td>
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