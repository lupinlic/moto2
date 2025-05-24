import React, { useState, useEffect } from 'react';
import categoryParentApi from '../../../api/categoryParentApi';

const CarCompanyForm = ({ id, onUpdate, onClose }) => {
    const [categoryparentName, setCategoryParentName] = useState('');
    useEffect(() => {
        if (id) {
            categoryParentApi.getCategoryParentbyID(id)
                .then((response) => {
                    const data = response.data;
                    setCategoryParentName(data.CategoryParentName);
                })
                .catch((error) => {
                    console.error('Có lỗi khi lấy thông tin:', error);
                });
        } else {
            // reset khi không phải edit
            setCategoryParentName('');
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const category_parent = {
            CategoryParentName: categoryparentName,
        };
        try {
            if (id) {
                // Sửa tài khoản
                await categoryParentApi.updateCategoryParent(id, category_parent);

            } else {
                // Thêm tài khoản
                await categoryParentApi.addCategoryParent(category_parent);

            }
            onUpdate();
            onClose();
        } catch (err) {
            console.error(err);
            alert('Có lỗi xảy ra khi lưu .');
        }
    }
    return (
        <div className="form-popup111">
            <form className="form-container" onSubmit={handleSubmit}>
                <h4 className='mt-3'>Thông tin hãng</h4>
                <div>
                    <label className="name">Hãng</label>
                    <input
                        type="text"
                        placeholder="Nhập hãng"
                        name="CategoryParentName"
                        value={categoryparentName}
                        onChange={(e) => setCategoryParentName(e.target.value)}
                        required
                    />
                </div>
                <div className='form-bt'>
                    <button type="submit" className="btn btn-primary">Lưu</button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
                </div>
            </form>
        </div>
    )
}

export default CarCompanyForm