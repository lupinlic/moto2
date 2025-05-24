import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import productApi from '../../../api/productApi';

function Product() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [product, setProduct] = useState(null);
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
            const response = await productApi.getAll();
            setProduct(response);
            console.log(response);
        } catch (error) {
            console.error('Có lỗi khi lấy danh sách :', error);
        }
    };
    const deletecate = async (id) => {
        try {
            await productApi.deleteProduct(id);
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
                        <ProductForm
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
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Loại xe</th>
                            <th>Ảnh</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {product?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.ProductName}</td>
                                <td>{item.ProductPrice}</td>
                                <td>{item.category.CategoryName}</td>
                                <td>
                                    <img src={`http://127.0.0.1:8000/image/${item.category?.parent?.CategoryParentName}/${item.category?.CategoryName}/${item.ProductName}/${item.thumbnail}`}
                                        alt="Product" style={{ width: '50px', height: '50px' }} />
                                </td>

                                <td>
                                    <button
                                        className="btn btn-warning btn-sm mr-2"
                                        onClick={() => openForm(item.ProductID)}

                                    >
                                        Sửa
                                    </button>
                                    <button
                                        style={{ marginLeft: '8px' }}
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deletecate(item.ProductID)}
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

export default Product