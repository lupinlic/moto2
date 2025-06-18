import React, { useState, useEffect } from 'react';
import productApi from '../../../api/productApi';

const ProductVersionForm = ({ id, onUpdate, onClose }) => {
    const [productVersionName, setProductVersionName] = useState(null);
    const [productVersionQuantity, setProductVersionQuantity] = useState(null);
    const [ProductID, setProductID] = useState(''); // ID sản phẩm
    const [product, setProduct] = useState([]);
    useEffect(() => {
        productApi.getAll()
            .then((response) => {
                setProduct(response);
                console.log(response);
            });
        if (id) {
            productApi.getVersionByID(id)
                .then((response) => {
                    const data = response.data;
                    setProductVersionName(data.ProductVersionName);
                    console.log(data);
                    setProductID(data.ProductID);
                    setProductVersionQuantity(data.ProductVersionQuantity);
                })
                .catch((error) => {
                    console.error('Có lỗi khi lấy thông tin:', error);
                });
        } else {
            // reset khi không phải edit
            setProductVersionName('');
            setProductVersionQuantity('');
            setProductID('');
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const version = {
            ProductVersionName: productVersionName,
            ProductVersionQuantity: productVersionQuantity,
            ProductID: ProductID
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
                <div>
                    <label>Sản phẩm</label>
                    <select value={ProductID} onChange={e => setProductID(e.target.value)} required>
                        <option value="">-- Chọn sản phẩm --</option>
                        {product?.map(c => (
                            <option key={c.ProductID} value={c.ProductID}>
                                {c.ProductName}
                            </option>
                        ))}
                    </select>
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