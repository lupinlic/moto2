import React, { useState, useEffect } from 'react';
import VehicleTypeForm from './VehicleTypeForm';
import categoryApi from '../../../api/categoryApi';

function VehicleType() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [category, setCategory] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const openForm = (id = null) => {
        setSelectedId(id);
        setIsFormVisible(true);
    };

    // Đóng form
    const closeForm = () => {
        setIsFormVisible(false);
    };
    const get_all = async () => {
        try {
            const response = await categoryApi.getCategory();
            setCategory(response.data);
            console.log(response.data);
            if (!searchTerm.trim()) {
                setFiltered(response.data);
            }
        } catch (error) {
            console.error('Có lỗi khi lấy danh sách :', error);
        }
    };
    const deletecate = async (id) => {
        try {
            await categoryApi.deleteCategory(id);
            get_all();
        } catch (error) {
            console.error('Có lỗi khi xóa hãng xe:', error);
        }
    }
    const handleSearch = () => {
        const lowerSearch = searchTerm.toLowerCase();
        const result = category.filter(u =>
            u.CategoryName.toLowerCase().includes(lowerSearch)
        );
        setFiltered(result);
    };

    const handleShowAll = () => {
        setSearchTerm('');
        setFiltered(category);
    };
    useEffect(() => {
        get_all();
    }, []);
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingLeft: '4px' }}>
            <div className="container supplier pt-3 d-flex justify-content-between align-items-center mb-3">
                <button type="button" class="btn btn-success " onClick={() => openForm()}>Thêm</button>
                {isFormVisible && (
                    <>
                        <div className="overLay"></div> {/* Lớp overlay */}
                        <VehicleTypeForm
                            id={selectedId}
                            onUpdate={get_all}
                            onClose={closeForm} /> {/* Form */}
                    </>
                )}
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

            <div className='container pt-4'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Hãng</th>
                            <th>Loại</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.parent.CategoryParentName}</td>
                                <td>{item.CategoryName}</td>

                                <td>
                                    <button
                                        className="btn btn-warning btn-sm mr-2"
                                        onClick={() => openForm(item.CategoryID)}

                                    >
                                        Sửa
                                    </button>
                                    <button
                                        style={{ marginLeft: '8px' }}
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deletecate(item.CategoryID)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default VehicleType