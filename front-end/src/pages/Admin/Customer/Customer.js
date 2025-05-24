import React, { useState, useEffect } from 'react';
import customerApi from '../../../api/customerApi';

function Customer() {
    const [customer, setCustomer] = useState([]);
    const fetchCustomer = async () => {
        try {
            const response = await customerApi.getAll();
            setCustomer(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Có lỗi khi lấy danh sách tài khoản:', error);
        }
    };
    useEffect(() => {
        fetchCustomer();
    }, []);
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingLeft: '4px' }}>
            <div className='container pt-4'>
                <h5>Danh sách khách hàng</h5>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>FullName</th>
                            <th>PhoneNumber</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.FullName}</td>
                                <td>{item.PhoneNumber}</td>
                                <td>{item.Email}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Customer