import React, { useState, useEffect } from 'react';
import ProductVersionForm from './ProductVersionForm';
import productApi from '../../../api/productApi';

function ProductVersion() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [product, setProduct] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const openForm = (id = null) => {
        setSelectedId(id);
        setIsFormVisible(true);
    };

    // Đóng form
    const closeForm = () => {
        setIsFormVisible(false);
    };
    const get_all = async (page = 1) => {
        try {
            const response = await productApi.getVersion(page, 10);
            setProduct(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
            console.log(response.data.data);
        } catch (error) {
            console.error('Có lỗi khi lấy danh sách :', error);
        }
    };
    const deletecate = async (id) => {
        try {
            await productApi.deleteProductVersion(id);
            get_all();
        } catch (error) {
            console.error('Có lỗi khi xóa hãng xe:', error);
        }
    }
    useEffect(() => {
        get_all(currentPage);
    }, [currentPage]);
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingLeft: '4px' }}>
            <div className="container supplier pt-3">
                <button type="button" class="btn btn-success " onClick={() => openForm()}>Thêm</button>
                {isFormVisible && (
                    <>
                        <div className="overLay"></div> {/* Lớp overlay */}
                        <ProductVersionForm
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
                            <th>Sản phẩm</th>
                            <th>Phiên bản</th>
                            <th>Số lượng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <p>Đang tải...</p>
                        ) : (
                            product?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.product.ProductName}</td>
                                    <td>{item.ProductVersionName}</td>
                                    <td>{item.ProductVersionQuantity}</td>

                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm mr-2"
                                            onClick={() => openForm(item.ProductVersionID)}

                                        >
                                            Sửa
                                        </button>
                                        <button
                                            style={{ marginLeft: '8px' }}
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deletecate(item.ProductVersionID)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>
                </table>
            </div>
            <div className='d-flex align-items-center justify-content-center mt-4 mb-5'>


                <div className="pagination">
                    {[...Array(lastPage)].map((_, index) => (
                        <button
                            style={{ backgroundColor: currentPage === index + 1 ? 'yellow' : '#fff', color: '#000', margin: '0 5px', borderRadius: '5px' }}
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            disabled={currentPage === index + 1}

                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductVersion