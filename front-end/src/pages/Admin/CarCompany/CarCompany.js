import React, { useState, useEffect } from 'react';
import categoryParentApi from '../../../api/categoryParentApi';
import CarCompanyForm from './CarCompanyForm';

function CarCompany() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [carCompany, setCarCompany] = useState(null);
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
            const response = await categoryParentApi.getCategoryPrarent();
            setCarCompany(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Có lỗi khi lấy danh sách :', error);
        }
    };
    const deletecate = async (id) => {
        try {
            await categoryParentApi.deleteCategoryParent(id);
            get_all();
        } catch (error) {
            console.error('Có lỗi khi xóa hãng xe:', error);
        }
    }
    useEffect(() => {
        get_all();
    }, []);
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingLeft: '4px' }}>
            <div className="container supplier pt-3">
                <button type="button" class="btn btn-success " onClick={() => openForm()}>Thêm</button>
                {isFormVisible && (
                    <>
                        <div className="overLay"></div> {/* Lớp overlay */}
                        <CarCompanyForm
                            id={selectedId}
                            onUpdate={get_all}
                            onClose={closeForm} /> {/* Form */}
                    </>
                )}
            </div>

            <div className='container pt-4'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Hãng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carCompany?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.CategoryParentName}</td>

                                <td>
                                    <button
                                        className="btn btn-warning btn-sm mr-2"
                                        onClick={() => openForm(item.CategoryParentID)}

                                    >
                                        Sửa
                                    </button>
                                    <button
                                        style={{ marginLeft: '8px' }}
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deletecate(item.CategoryParentID)}
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

export default CarCompany