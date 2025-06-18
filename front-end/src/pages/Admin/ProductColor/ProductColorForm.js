import React, { useEffect, useState } from 'react'
import ProductColor from './ProductColor';
import productApi from '../../../api/productApi';

const ProductColorForm = ({ id, onUpdate, onClose }) => {
    const [ProductColorName, setProductColorName] = useState(''); // màu sắc
    const [ProductID, setProductID] = useState(''); // ID sản phẩm
    const [product, setProduct] = useState([]);
    const [imageFile, setImageFile] = useState(null); // file ảnh mới chọn
    const [previewImage, setPreviewImage] = useState(null); // ảnh xem trước
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('ProductColorName', ProductColorName);
        formData.append('ProductID', ProductID);
        if (imageFile) {
            formData.append('ProductColorImg', imageFile); // key phải là 'thumbnail'
        }
        console.log(formData);
        try {
            if (id) {
                await productApi.updateProductColor(id, formData); // PUT hoặc POST tùy API
            } else {
                await productApi.addProductColor(formData); // POST
            }
            onUpdate();
            onClose();
        } catch (err) {
            console.error(err);
            alert('Lỗi khi lưu sản phẩm');
        }
    };
    useEffect(() => {
        // Gọi tất cả category parent để populate dropdown
        productApi.getAll()
            .then((response) => {
                setProduct(response);
                console.log(response);
            });

        if (id) {
            productApi.getProductColorByID(id)
                .then((response) => {
                    const data = response;
                    console.log(data);
                    setProductColorName(data.ProductColorName);
                    setProductID(data.ProductID);
                    setPreviewImage(`http://localhost:8000/image/${data.product.category.parent.CategoryParentName}/${data.product.category.CategoryName}/${data.product.ProductName}/${data.ProductColorImg}`);
                    console.log(previewImage);
                })
                .catch((error) => {
                    console.error('Có lỗi khi lấy thông tin:', error);
                });
        } else {
            setProductColorName('');
            setProductID('');
        }
    }, [id]);
    return (
        <div className="form-popup111" style={{ width: '500px', height: '400px' }}>
            <form className="form-container">
                <h5 className='mt-3'>Thông tin</h5>
                <div className='mt-3 row'>
                    <div className='col-6'>
                        <div>
                            <label>Màu sắc</label>
                            <input
                                type="text"
                                value={ProductColorName}
                                onChange={e => setProductColorName(e.target.value)}
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
                    </div>
                    <div className='col-6 d-flex flex-column align-items-center justify-content-center'>
                        {previewImage && (
                            <img src={previewImage} alt="Ảnh xem trước" style={{ width: 200, marginTop: 10 }} />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setImageFile(file);
                                    setPreviewImage(URL.createObjectURL(file)); // xem trước ảnh mới
                                }
                            }}
                        />


                    </div>

                </div>

                <div className='form-bt' >
                    <button type="submit" className="btn btn-primary">Lưu</button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
                </div>
            </form>
        </div>
    )
}

export default ProductColorForm