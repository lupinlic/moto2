import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../../styles/product.css"
import Crumb from '../../components/Crumb'
import { Helmet } from "react-helmet-async";
import ProductFrame from "../../components/ProductFrame";
import { useSearchParams } from 'react-router-dom';
import productApi from '../../api/productApi';

function Product() {
    const [searchParams] = useSearchParams();
    const parentId = searchParams.get("parent");
    const categoryId = searchParams.get("category");
    const [products, setProducts] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [sortOption, setSortOption] = useState("");
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let res;
                if (categoryId) {
                    // Lọc theo category con
                    res = await productApi.getproductbyCategory(categoryId);
                    // setProducts(res.data);
                } else if (parentId) {
                    // Lọc theo category cha
                    res = await productApi.getproductbyCategoryparent(parentId);
                    // setProducts(res.data);
                } else {
                    // Không có lọc gì
                    res = await productApi.getAll();
                    // setProducts(res);
                }

                let filtered = res.data || res;
                // Lọc theo mức giá
                if (selectedPrices.length > 0 && !selectedPrices.includes("all")) {
                    filtered = filtered.filter(product => {
                        const price = product.ProductPrice;
                        return selectedPrices.some(priceRange => {
                            if (priceRange === 'under1') return price < 1000000;
                            if (priceRange === '1to10') return price >= 1000000 && price <= 10000000;
                            if (priceRange === '10to20') return price > 10000000 && price <= 20000000;
                            if (priceRange === '20to50') return price > 20000000 && price <= 50000000;
                            if (priceRange === 'above50') return price > 50000000;
                            return false;
                        });
                    });
                }
                // Sắp xếp
                if (sortOption) {
                    filtered = [...filtered].sort((a, b) => {
                        switch (sortOption) {
                            case 'name_asc':
                                return a.ProductName.localeCompare(b.ProductName);
                            case 'name_desc':
                                return b.ProductName.localeCompare(a.ProductName);
                            case 'price_asc':
                                return a.ProductPrice - b.ProductPrice;
                            case 'price_desc':
                                return b.ProductPrice - a.ProductPrice;
                            default:
                                return 0;
                        }
                    });
                }
                setProducts(filtered);
            } catch (err) {
                console.error("Lỗi lấy sản phẩm:", err);
            }
        };

        fetchProducts();
    }, [parentId, categoryId, selectedPrices, sortOption]);
    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setSelectedPrices(prev => [...prev, value]);
        } else {
            setSelectedPrices(prev => prev.filter(v => v !== value));
        }
    };
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };
    return (
        <div>
            <Helmet>
                <title>Sản phẩm</title>
            </Helmet>
            <Crumb
                name='Sản phẩm' />
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-2'>
                        <div className='content-menu d-flex flex-column'>
                            <h5 style={{ color: '#d71920', fontSize: '18px' }}>Danh mục sản phẩm</h5>
                            <Link>Xe ga</Link>
                            <Link>Xe côn tay</Link>
                            <Link>Xe số</Link>
                        </div>
                        <div className='content-menu mt-3'>
                            <h5 style={{ color: '#d71920', fontSize: '18px' }}>Chọn mức giá</h5>
                            <div className="form-check m-2 chose-price">
                                <input className="form-check-input custom-checkbox" type="checkbox" value="under1" onChange={handlePriceChange} />
                                <label className="form-check-label" htmlFor="checkbox1" style={{ fontSize: '17px', margin: '0' }}>
                                    Dưới 1 triệu
                                </label>
                            </div>
                            <div className="form-check m-2 chose-price">
                                <input className="form-check-input custom-checkbox" type="checkbox" value="1to10" onChange={handlePriceChange} />
                                <label className="form-check-label" htmlFor="checkbox1" style={{ fontSize: '17px', margin: '0' }}>
                                    1 triệu đến 10 triệu
                                </label>
                            </div>
                            <div className="form-check m-2 chose-price">
                                <input className="form-check-input custom-checkbox" type="checkbox" value="10to20" onChange={handlePriceChange} />
                                <label className="form-check-label" htmlFor="checkbox1" style={{ fontSize: '17px', margin: '0' }}>
                                    10 triệu đến 20 triệu
                                </label>
                            </div>
                            <div className="form-check m-2 chose-price">
                                <input className="form-check-input custom-checkbox" type="checkbox" value="20to50" onChange={handlePriceChange} />
                                <label className="form-check-label" htmlFor="checkbox1" style={{ fontSize: '17px', margin: '0' }}>
                                    20 triệu đến 50 triệu
                                </label>
                            </div>
                            <div className="form-check m-2 chose-price">
                                <input className="form-check-input custom-checkbox" type="checkbox" value="above50" onChange={handlePriceChange} />
                                <label className="form-check-label" htmlFor="checkbox1" style={{ fontSize: '17px', margin: '0' }}>
                                    Trên 50 triệu
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className='col-md-10 mt-2 mt-md-0'>
                        <div className='row'>
                            <div className='col-md-6 image-hover1'>
                                <img style={{ width: '100%', height: '200px' }} src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/banner_col_1.png?1741709416058' />
                            </div>
                            <div className='col-md-6 image-hover1 d-none d-md-block'>
                                <img style={{ width: '100%', height: '200px' }} src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/banner_col_2.png?1741709416058' />
                            </div>
                        </div>
                        <div className='mt-3 d-flex align-items-center'>
                            <p className='m-0'>Xếp theo:</p>
                            <div className='d-md-flex align-items-center d-none'>
                                <div
                                    className={`arrange ${sortOption === '' ? 'activefilter' : ''}`}
                                    onClick={() => setSortOption('')}
                                >
                                    Mặc định
                                </div>
                                <div
                                    className={`arrange ${sortOption === 'name_asc' ? 'activefilter' : ''}`}
                                    onClick={() => setSortOption('name_asc')}
                                >
                                    Tên A-Z
                                </div>
                                <div
                                    className={`arrange ${sortOption === 'name_desc' ? 'activefilter' : ''}`}
                                    onClick={() => setSortOption('name_desc')}
                                >
                                    Tên Z-A
                                </div>
                                <div
                                    className={`arrange ${sortOption === 'price_asc' ? 'activefilter' : ''}`}
                                    onClick={() => setSortOption('price_asc')}
                                >
                                    Giá thấp đến cao
                                </div>
                                <div
                                    className={`arrange ${sortOption === 'price_desc' ? 'activefilter' : ''}`}
                                    onClick={() => setSortOption('price_desc')}
                                >
                                    Giá cao đến thấp
                                </div>
                            </div>
                            <select className='d-block d-md-none'
                                style={{ border: '1px solid #d71920', borderRadius: '5px', padding: '5px', marginLeft: '10px' }}
                            >
                                <option value="default">Mặc định</option>
                                <option value="name_asc">Tên A-Z</option>
                                <option value="name_desc">Tên Z-A</option>
                                <option value="price_asc">Giá thấp đến cao</option>
                                <option value="price_desc">Giá cao đến thấp</option>
                            </select>


                        </div>
                        <div className='d-flex likeproduct mt-3' >
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductFrame
                                        id={product.ProductID}
                                        name={product.ProductName}
                                        image={`http://127.0.0.1:8000/image/${product.category?.parent?.CategoryParentName}/${product.category?.CategoryName}/${product.ProductName}/${product.thumbnail}`}
                                        price={product.ProductPrice}
                                    />
                                ))
                            ) : (
                                <p>Không có sản phẩm nào.</p>
                            )}

                        </div>
                        {/* phân trang */}
                        <div className='d-flex align-items-center justify-content-center pagination mt-3'>
                            <Link>1</Link>
                            <Link>2</Link>
                            <Link>{">>"}</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Product