import React, { useState, useEffect } from 'react';
import customerApi from '../../../api/customerApi';

function Customer() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [customer, setCustomer] = useState([]);
    const fetchCustomer = async () => {
        try {
            const response = await customerApi.getAll();
            setCustomer(response.data);
            console.log(response.data);
            if (!searchTerm.trim()) {
                setFiltered(response.data);
            }
        } catch (error) {
            console.error('Có lỗi khi lấy danh sách tài khoản:', error);
        }
    };
    const handleSearch = () => {
        const lowerSearch = searchTerm.toLowerCase();
        const result = customer.filter(u =>
            u.FullName.toLowerCase().includes(lowerSearch) ||
            u.PhoneNumber.toLowerCase().includes(lowerSearch) ||
            u.Email.toLowerCase().includes(lowerSearch)
        );
        setFiltered(result);
    };

    const handleShowAll = () => {
        setSearchTerm('');
        setFiltered(customer);
    };
    useEffect(() => {
        fetchCustomer();
    }, []);
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingLeft: '4px' }}>
            <div className='container pt-4'>
                <div className="container supplier pt-3 d-flex justify-content-between align-items-center mb-3">
                    <h5>Danh sách khách hàng</h5>

                    <div className="d-flex align-items-center justify-content-between" style={{ height: '50px' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập từ khóa tìm kiếm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>Tìm</button>
                        <button className="btn btn-secondary" onClick={handleShowAll} style={{ width: '100px' }}>Tất cả</button>
                    </div>
                </div>

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
                        {filtered?.map((item, index) => (
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