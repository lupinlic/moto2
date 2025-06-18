import React from 'react'
import { useState, useEffect } from "react";
import AddressForm from './AddressForm';
import addressApi from '../api/addressApi';

const Address = () => {
    const userId = localStorage.getItem('user_id');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const openForm = (Id = null) => {
        setSelectedId(Id);
        setIsFormVisible(true);
    };

    // Đóng form
    const closeForm = () => {
        setIsFormVisible(false);
    };
    const fetchAddresses = () => {
        addressApi.getbyUser(userId)
            .then(response => {
                setAddresses(response.data);
            })
            .catch(error => {
                console.error("Lỗi khi gọi API:", error);
            });
    };
    useEffect(() => {
        fetchAddresses();
    }, []);
    function handlesetdefault(addressid) {
        addressApi.setDefaultAddress(userId, addressid)
            .then(() => {
                console.log("Đã cập nhật địa chỉ mặc định thành công");
                return addressApi.getbyUser(userId);
            })
            .then(response => {
                setAddresses(response.data);
            })
            .catch(error => {
                console.error("Lỗi khi cập nhật địa chỉ mặc định:", error);
            });
    }
    function handledelete(addressid) {
        addressApi.deleteAdress(addressid)
            .then(() => {
                console.log("Đã xóa địa chỉ thành công");
                return fetchAddresses();
            })
            .catch(error => {
                console.error("Lỗi khi xóa", error);
            });
    }

    return (
        <>
            <button className='btadd mt-2' onClick={() => openForm()}>Thêm địa chỉ</button>
            {addresses.map((item) => (
                <div key={item.AddressID} className='mt-3 pt-2 d-flex align-items-center justify-content-between' style={{ borderTop: '1px solid #ddd' }}>
                    <div>
                        <p>
                            <span style={{ fontWeight: '500' }}>Họ tên:</span>
                            <span>{item.FullName}</span>
                            {Number(item.isDefault) === 1 && (
                                <span style={{ color: '#27AE60', fontSize: '12px', marginLeft: '9px' }}>Địa chỉ mặc định</span>
                            )}
                        </p>
                        <p>
                            <span style={{ fontWeight: '500' }}>Địa chỉ:</span>
                            <span>{item.SpecificAddress},{item.Wards},{item.Districts},{item.Provinces}</span>
                        </p>
                        <p>
                            <span style={{ fontWeight: '500' }}>Số điện thoại:</span>
                            <span>{item.PhoneNumber}</span>
                        </p>
                    </div>
                    <div>
                        {Number(item.isDefault) === 0 && (
                            <p style={{ color: '#27AE60', cursor: 'pointer' }} onClick={() => handlesetdefault(item.AddressID)}>Đặt làm địa chỉ mặc định</p>
                        )}
                        <div className='d-flex '>
                            <p onClick={() => openForm(item.AddressID)} style={{ color: '#2D9CDB', cursor: 'pointer' }}>Chỉnh sửa địa chỉ</p>
                            <p style={{ color: 'red', cursor: 'pointer', marginLeft: '20px' }} onClick={() => handledelete(item.AddressID)}>Xóa</p>
                        </div>
                    </div>
                </div>

            ))}
            {isFormVisible && (
                <>
                    <div className="overlay"></div> {/* Lớp overlay */}
                    {isFormVisible && (
                        <AddressForm
                            id={selectedId}
                            onClose={closeForm}
                            onSuccess={fetchAddresses}// Gọi lại hàm fetchAddresses sau khi cập nhật
                        />
                    )}
                </>
            )}
        </>
    )
}

export default Address