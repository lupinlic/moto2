import React, { useEffect, useState } from 'react'
import Crumb from '../../components/Crumb'
import { Helmet } from "react-helmet-async";
import ChangePassword from '../../components/ChangePassword';
import AddressForm from '../../components/AddressForm';
import Address from '../../components/Address';
import authUser from '../../api/authUser';
import customerApi from '../../api/customerApi';
import addressApi from '../../api/addressApi';
import OrderDetails from '../Admin/Order/OrderDetails';

function Account() {
    const userId = localStorage.getItem('user_id');
    const [isFormVisible1, setIsFormVisible1] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const openForm1 = (id = null) => {
        setSelectedOrderId(id);
        setIsFormVisible1(true);
    };

    // Đóng form
    const closeForm1 = () => {
        setIsFormVisible1(false);
    };

    // tài khoản
    const [name, setName] = useState();
    // khách hàng

    const [fullname, setFullName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    // đơn hàng
    const [orders, setOrders] = useState([]);
    // hiện form địa chỉ
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedSection, setSelectedSection] = useState("info");
    const [addresses, setAddresses] = useState([]);
    const fetchAddresses = () => {
        addressApi.getbyUser(userId)
            .then(response => {
                setAddresses(response.data);
            })
            .catch(error => {
                console.error("Lỗi khi gọi API:", error);
            });
    };

    const openForm = () => {

        setIsFormVisible(true);
    };

    // Đóng form
    const closeForm = () => {
        setIsFormVisible(false);
    };
    // lấy tên tài khoản
    const getUserName = () => {
        authUser.get_user(userId)
            .then(response => {
                setName(response.data.name)
            })
            .catch(error => {
                console.error('Có lỗi khi lấy tên ' + error + '-' + error.response.data.message)
            })
    }

    // lấy khách hàng
    const getCustomer = () => {
        customerApi.getByIdUser(userId)
            .then(response => {
                setEmail(response.data.Email)
                setFullName(response.data.FullName)
                setPhone(response.data.PhoneNumber)
            }
            )
            .catch(error => {
                console.error('Có lỗi khi lấy khách hàng ' + error + '-' + error.response.data.message)
            })
    }

    // lấy đơn hàng
    const getOrder = () => {
        customerApi.getOrderByIdUser(userId)
            .then(response => {
                setOrders(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.error('Có lỗi khi lấy đơn hàng ' + error + '-' + error.response.data.message)
            })
    }
    useEffect(() => {
        getUserName();
        getCustomer();
        getOrder();
    }, [userId])


    return (
        <>
            <Helmet>
                <title>Tài khoản</title>
            </Helmet>
            <Crumb
                name='Tài khoản' />
            {isFormVisible1 && (
                <>
                    <div className="overLay"></div> {/* Lớp overlay */}
                    <OrderDetails
                        id={selectedOrderId}
                        onClose={closeForm1}
                    // Truyền hàm fetchOrder vào props
                    />

                </>
            )}
            <div className='container mt-5 accountpage'>
                <div className='row'>
                    <div className='col-md-3 '>
                        <p>TRANG TÀI KHOẢN</p>
                        <p>
                            <span>Xin chào,</span>
                            <span style={{ color: 'red' }}>{name}!</span>
                        </p>
                        <ul className="list-unstyled mt-3">
                            <li
                                className={selectedSection === "info" ? "active" : ""}
                                onClick={() => setSelectedSection("info")}
                            >
                                Thông tin tài khoản
                            </li>
                            <li
                                className={selectedSection === "orders" ? "active" : ""}
                                onClick={() => setSelectedSection("orders")}
                            >
                                Đơn hàng của bạn
                            </li>
                            <li
                                className={selectedSection === "password" ? "active" : ""}
                                onClick={() => setSelectedSection("password")}
                            >
                                Đổi mật khẩu
                            </li>
                            <li
                                className={selectedSection === "addresses" ? "active" : ""}
                                onClick={() => setSelectedSection("addresses")}
                            >
                                Số địa chỉ
                            </li>
                        </ul>
                    </div>
                    <div className='col-md-9'>
                        <div className="content">
                            {selectedSection === "info" && (
                                <div>
                                    <h5>THÔNG TIN TÀI KHOẢN</h5>
                                    <p><strong>Họ tên:</strong> {fullname}</p>
                                    <p><strong>Email:</strong> {email}</p>
                                    <p><strong>Số điện thoại:</strong> {phone}</p>
                                </div>
                            )}
                            {selectedSection === "orders" && (
                                <div>
                                    <h5>ĐƠN HÀNG CỦA BẠN</h5>
                                    <table bordered className="mt-3 w-100 orders-table">
                                        <thead>
                                            <tr className="text-white text-center" style={{ backgroundColor: "#FFA726" }}>
                                                <th>Mã đơn hàng</th>
                                                <th>Ngày</th>
                                                <th>Địa chỉ</th>
                                                <th>Giá trị đơn hàng</th>
                                                <th>PTTT</th>
                                                <th>TTTT</th>
                                                <th>TTĐH</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" className="text-center">Không có đơn hàng nào.</td>
                                                </tr>
                                            ) : (
                                                orders.map((order, index) => (
                                                    <tr key={index} className="text-center" style={{ borderBottom: '1px solid #FFA726' }}>
                                                        <td>{order.OrderID}</td>
                                                        <td>{order.OrderDate}</td>
                                                        <td>{order.AddressID}</td>
                                                        <td>{Number(order.TotalPrice).toLocaleString('vi-VN')} VNĐ</td>
                                                        <td>{order?.payment?.Method}</td>
                                                        <td>{order?.payment?.Status}</td>
                                                        <td>{order.status}</td>
                                                        <td><i onClick={() => openForm1(order.OrderID)} class="fa-solid fa-eye eye"></i></td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {selectedSection === "password" && (
                                <div>
                                    <ChangePassword />
                                </div>
                            )}
                            {selectedSection === "addresses" && (
                                <div>
                                    <p> ĐỊA CHỈ CỦA BẠN</p>
                                    <Address />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <style jsx>{`
                .accountpage   ul li {
          cursor: pointer;
          padding: 8px;
          transition: 0.3s;
        }
        .accountpage ul li:hover,
        .accountpage ul li.active {
          color: orange;
          font-weight: bold;
        }
        .orders-table {
  border-collapse: separate;
  border-spacing: 2px; /* Tạo khoảng trắng giữa các cột */
}

.orders-table thead tr {
  background-color: #FFA726;
}

.orders-table thead th {
  color: white;
  text-align: center;
}
.btadd{
    background: #ffb42e !important;
    border: 1px solid #ffb42e !important;
    color: #fff !important;
    padding: 0 16px !important;
    border-radius: 3px !important;
    font-size: 14px;
    height:40px
}
      `}</style>
            </div>
        </>
    )
}

export default Account