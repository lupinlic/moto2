import React, { useState, useEffect } from 'react'
import productApi from '../../../api/productApi';
import categoryParentApi from '../../../api/categoryParentApi';
import categoryApi from '../../../api/categoryApi';

const ProductForm = ({ id, onUpdate, onClose }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryparent, setCategoryParent] = useState([]);
    const [parentId, setParentId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [imageFile, setImageFile] = useState(null); // file ảnh mới chọn
    const [previewImage, setPreviewImage] = useState(null); // ảnh xem trước
    useEffect(() => {
        // Gọi tất cả category parent để populate dropdown
        categoryParentApi.getCategoryPrarent()
            .then((response) => {
                setCategoryParent(response.data);
            });

        if (id) {
            productApi.getproductbyID(id)
                .then((response) => {
                    const data = response;
                    console.log(data);
                    setProductName(data.ProductName);
                    setProductPrice(data.ProductPrice);
                    setParentId(data.category.CategoryParentID);
                    setCategoryId(data.CategoryID);
                    setPreviewImage(`http://localhost:8000/image/${data.category.parent.CategoryParentName}/${data.category.CategoryName}/${data.ProductName}/${data.thumbnail.split('/').pop()}`);
                    console.log(previewImage);
                })
                .catch((error) => {
                    console.error('Có lỗi khi lấy thông tin:', error);
                });
        } else {
            setProductName('');
            setProductPrice('');
            setParentId('');
        }
    }, [id]);

    useEffect(() => {
        if (parentId) {
            categoryApi.getCategorybyPrarent(parentId).then(res => {
                setCategories(res.data);
            });
        } else {
            setCategories([]);
        }
    }, [parentId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('ProductName', productName);
        formData.append('CategoryID', categoryId);
        formData.append('ProductPrice', productPrice);
        if (imageFile) {
            formData.append('thumbnail', imageFile); // key phải là 'thumbnail'
        }
        console.log(formData);
        try {
            if (id) {
                await productApi.updateProduct(id, formData); // PUT hoặc POST tùy API
            } else {
                await productApi.addProduct(formData); // POST
            }
            onUpdate();
            onClose();
        } catch (err) {
            console.error(err);
            alert('Lỗi khi lưu sản phẩm');
        }
    };


    return (
        <div className="form-popup111" style={{ width: '700px' }}>
            <form className="form-container" onSubmit={handleSubmit}>
                <h4 className='mt-3'>Thông tin loại xe</h4>
                <div className='mt-3 row'>
                    <div className='col-6'>
                        <div>
                            <label>Tên sản phẩm</label>
                            <input
                                type="text"
                                value={productName}
                                onChange={e => setProductName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label>Danh mục cha</label>
                            <select value={parentId} onChange={e => setParentId(e.target.value)} required>
                                <option value="">-- Chọn danh mục cha --</option>
                                {categoryparent.map(p => (
                                    <option key={p.CategoryParentID} value={p.CategoryParentID}>
                                        {p.CategoryParentName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Danh mục con</label>
                            <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
                                <option value="">-- Chọn danh mục con --</option>
                                {categories.map(c => (
                                    <option key={c.CategoryID} value={c.CategoryID}>
                                        {c.CategoryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Giá</label>
                            <input
                                type="text"
                                value={productPrice}
                                onChange={e => setProductPrice(e.target.value)}
                                required
                            />
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

                <div className='form-bt'>
                    <button type="submit" className="btn btn-primary">Lưu</button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm