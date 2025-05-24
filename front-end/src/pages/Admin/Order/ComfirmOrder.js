import React, { useState, useEffect } from 'react';
import orderApi from '../../../api/orderApi';
import {
    FaClock, FaShippingFast, FaCheckCircle
} from 'react-icons/fa';

const ComfirmOrder = ({ id, onClose, onUpdate }) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const statusSteps = [
        { key: "pending", label: "Chờ xác nhận", icon: <FaClock /> },
        { key: "processing", label: "Đang giao hàng", icon: <FaShippingFast /> },
        { key: "completed", label: "Hoàn tất", icon: <FaCheckCircle /> },
    ];

    const fetchOrder = async () => {
        try {
            const response = await orderApi.getById(id);
            setOrder(response.data);
        } catch (error) {
            console.error('Có lỗi khi lấy danh sách tài khoản:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const handleConfirmStep = async (nextStatus) => {
        try {
            const response = await orderApi.confirmOrder(id, nextStatus);

            // Cập nhật trạng thái đơn hàng trong state
            setOrder(prevOrder => ({
                ...prevOrder,
                status: nextStatus
            }));
            onUpdate();
            console.log(response);
        } catch (err) {
            alert("Không thể cập nhật trạng thái.");
            console.error(err);
        }
    };

    const currentIndex = order ? statusSteps.findIndex((s) => s.key === order.status) : -1;

    return (
        <div className="form-popup111" style={{ width: '650px' }}>
            <form className="form-container">
                <h4 className='mt-3'>Trạng thái đơn hàng</h4>

                <div className="d-flex  relative mb-8 mt-4">
                    {statusSteps.map((step, index) => {
                        const isActive = index <= currentIndex; // Kiểm tra nếu trạng thái hiện tại hoặc trước đó
                        return (
                            <React.Fragment key={step.key}>
                                <div className="d-flex flex-column align-items-center z-10 w-20">
                                    <div className={`d-flex align-items-center justify-content-center rounded-circle border
                                    ${isActive ? 'border-success text-success bg-white' : 'border-secondary text-secondary'}`} style={{ width: '40px', height: '40px' }}>
                                        {step.icon}
                                    </div>
                                    <span className={`mt-2 text-center ${isActive ? 'text-success font-weight-medium' : 'text-secondary'}`} style={{ fontSize: '0.875rem' }}>
                                        {step.label}
                                    </span>
                                    {index === currentIndex && currentIndex < statusSteps.length - 1 && (
                                        <div className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-warning btn-sm"
                                                onClick={() => handleConfirmStep(statusSteps[currentIndex + 1].key)}
                                            >
                                                Xác nhận
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {index < statusSteps.length - 1 && (
                                    <div className={`flex-grow-1 h-1 ${index < currentIndex ? 'bg-success' : 'bg-secondary'}`} style={{ width: '40px', height: '2px', marginTop: '20px' }}></div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Nút xác nhận bước tiếp theo */}


                <div className='form-bt' style={{ width: '100px', left: '90%' }}>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
                </div>
            </form>
        </div>
    )
}

export default ComfirmOrder;
