import React, { useState, useEffect } from 'react';
import categoryApi from '../../../api/categoryApi';
import categoryParentApi from '../../../api/categoryParentApi';


const VehicleTypeForm = ({ id, onUpdate, onClose }) => {
    const [categoryParentName, setCategoryParentName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [parentId, setParentId] = useState('');
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        // Gọi tất cả category parent để populate dropdown
        categoryParentApi.getCategoryPrarent()
            .then((response) => {
                setCategories(response.data);
            });

        if (id) {
            categoryApi.getCategorybyID(id)
                .then((response) => {
                    const data = response.data[0];
                    setCategoryName(data.CategoryName);
                    setParentId(data.CategoryParentID); // Gán đúng ID
                })
                .catch((error) => {
                    console.error('Có lỗi khi lấy thông tin:', error);
                });
        } else {
            // reset khi thêm mới
            setCategoryName('');
            setParentId('');
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const category = {
            CategoryParentID: parentId,
            CategoryName: categoryName,
        };
        try {
            if (id) {
                // Sửa tài khoản
                await categoryApi.updateCategory(id, category);

            } else {
                // Thêm tài khoản
                await categoryApi.addCategory(category);

            }
            onUpdate(); // reload danh sách hoặc đóng form
            onClose();
        } catch (err) {
            console.error(err);
            alert('Có lỗi xảy ra khi lưu .');
        }
    }
    return (
        <div className="form-popup111">
            <form className="form-container" onSubmit={handleSubmit}>
                <h4 className='mt-3'>Thông tin loại xe</h4>
                <div>
                    <label className="name">Hãng</label>
                    <select
                        style={{ marginLeft: '12px', width: '160px', height: '35px', borderRadius: '5px' }}
                        required
                        value={parentId}
                        onChange={(e) => setParentId(e.target.value)}
                    >
                        <option value="">-- Chọn hãng xe --</option>
                        {categories.map((cat) => (
                            <option key={cat.CategoryParentID} value={cat.CategoryParentID}>
                                {cat.CategoryParentName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="name">Loại</label>
                    <input
                        type="text"
                        placeholder="Nhập hãng"
                        name="CategoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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

export default VehicleTypeForm