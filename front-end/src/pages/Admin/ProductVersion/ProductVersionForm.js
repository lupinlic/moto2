import React, { useState, useEffect } from 'react';
import productApi from '../../../api/productApi';

const ProductVersionForm = ({ id, onUpdate, onClose }) => {
    const [productVersionName, setProductVersionName] = useState(null);
    const [productVersionQuantity, setProductVersionQuantity] = useState(null);
    useEffect(() => {
        if (id) {
            productApi.getVersionByID(id)
                .then((response) => {
                    const data = response.data;
                    setProductVersionName(data.ProductVersionName);
                    console.log(data);
                    setProductVersionQuantity(data.ProductVersionQuantity);
                })
                .catch((error) => {
                    console.error('Có lỗi khi lấy thông tin:', error);
                });
        } else {
            // reset khi không phải edit
            setProductVersionName('');
            setProductVersionQuantity('');
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const version = {
            ProductVersionName: productVersionName,
            ProductVersionQuantity: productVersionQuantity,
        };
        try {
            if (id) {
                // Sửa tài khoản
                await productApi.updateProductVersion(id, version);

            } else {
                // Thêm tài khoản
                await productApi.addProductVersion(version);

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
                <h4 className='mt-3'>Thông tin phiên bản</h4>
                <div>
                    <label className="name">Tên phiên bản</label>
                    <input
                        type="text"
                        placeholder="Nhập phiên bản"
                        name="productVersionName"
                        value={productVersionName}
                        onChange={(e) => setProductVersionName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="name">Số lượng</label>
                    <input
                        type="text"
                        placeholder="Nhập số lượng"
                        name="productVersionQuantity"
                        value={productVersionQuantity}
                        onChange={(e) => setProductVersionQuantity(e.target.value)}
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

export default ProductVersionForm