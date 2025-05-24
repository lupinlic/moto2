import React, { useRef, useState, useEffect } from "react";
import orderApi from "../../../api/orderApi";

function Bill({ invoiceData, onClose }) {
    const printRef = useRef();
    const [order, setOrder] = useState([]);
    const fetchOrder = async () => {
        try {
            const response = await orderApi.getOrderItemById(invoiceData.orderid);
            setOrder(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Có lỗi khi lấy danh sách tài khoản:', error);
        }
    };
    useEffect(() => {
        fetchOrder();
    }, []);

    const handlePrint = () => {
        const printContent = printRef.current.innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); // reload lại app
    };
    console.log(invoiceData);

    return (
        <div className="form-popup111" style={{ width: '650px', paddingBottom: '50px' }}>
            <div className=" d-flex align-items-center justify-content-between">
                <button className="btn btn-warning btn-sm mr-2" onClick={handlePrint}>🖨 In hóa đơn</button>
                <button className="border-0" onClick={onClose}>❌ Đóng</button>
            </div>


            <div ref={printRef} style={{ padding: "20px", fontFamily: "serif" }}>
                <div style={{ textAlign: "center", fontWeight: "bold" }}>
                    HÓA ĐƠN BÁN HÀNG
                </div>
                <div>
                    <p>Tên cửa hàng: {invoiceData.storeName}</p>
                    <p>Địa chỉ cửa hàng: {invoiceData.storeAddress}</p>
                    <p>Điện thoại: {invoiceData.storePhone}</p>
                </div>
                <p>Tên khách hàng: {invoiceData.customerName}</p>
                <p>Số điện thoại: {invoiceData.customerPhone}</p>
                <p>Địa chỉ nhận hàng: {invoiceData.customerAddress}</p>
                <p>Ngày đặt: {invoiceData.date}</p>

                <table border="1" cellPadding="5" width="100%" style={{ borderCollapse: "collapse" }}>
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

                <p className="mt-2"><strong>Phí vận chuyển: </strong>40.000 VND</p>
                <p><strong>Thành tiền: </strong>{invoiceData.total} VND</p>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
                    <div>Khách hàng</div>
                    <div>Người bán hàng</div>
                </div>
            </div>
        </div>
    );
}

export default Bill;
