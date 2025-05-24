import React, { useEffect } from 'react'
import "../../styles/productdetails.css"
import Crumb from '../../components/Crumb'
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import ProductFrame from '../../components/ProductFrame';
import Title from '../../components/Title';
import { useSearchParams } from 'react-router-dom';
import productApi from '../../api/productApi';
import cartApi from '../../api/cartApi';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

function ProductDetails() {
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');
    const [searchParams] = useSearchParams();
    const productID = searchParams.get("product");
    const [products, setProducts] = useState([]);
    const [productall, setProductall] = useState([]);
    const [color, setColor] = useState([]);
    const [version, setVersion] = useState([]);
    const [selectedVersion, setSelectedVersion] = useState();
    const [selectedColor, setSelectedColor] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [loai, setLoai] = useState('');
    const [thuonghieu, setThuonghieu] = useState('');
    const [masp, setMasp] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { fetchCartCount } = useContext(CartContext);
    const handleBuyNow = (product) => {
        if (!selectedColor || !selectedVersion) {
            alert("Vui lòng chọn màu sắc và phiên bản!");
            return;
        }

        const selectedProduct = [{

            product: product,
            ProductID: product.ProductID,
            Quantity: quantity,
            CartID: null,
            ProductColorID: selectedColor?.ProductColorID,
            ProductVersionID: selectedVersion?.ProductVersionID
        }];

        navigate('/Checkout', { state: { selectedProducts: selectedProduct } });
    };

    const increaseQuantity = () => {
        if (quantity < selectedVersion?.ProductVersionQuantity) {
            setQuantity(prev => prev + 1);
        } else {
            alert("Vượt quá số lượng hiện có!");
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const buildImageUrl = (item) => {
        return `http://127.0.0.1:8000/image/${item.product.category.parent.CategoryParentName}/${item.product.category.CategoryName}/${item.product.ProductName}/${item.ProductColorImg}`;
    };

    const fetchProducts = () => {
        productApi.getproductbyID(productID)
            .then((res) => {
                setProducts(res);
            })
            .catch((err) => {
                console.error("Lỗi lấy sản phẩm:", err);
            })

        productApi.getProductVersionByID(productID)
            .then((res) => {
                setVersion(res.data);
                const total = res.data.reduce((sum, version) => sum + version.ProductVersionQuantity, 0);
                setTotalQuantity(total);
            })

        productApi.getProductColorByID(productID)
            .then((res) => {
                setColor(res.data);
                if (res.data.length > 0) {
                    setSelectedImage(buildImageUrl(res.data[0]));
                    setLoai(res.data[0].product.category.CategoryName);
                    setThuonghieu(res.data[0].product.category.parent.CategoryParentName);
                    setMasp(res.data[0].product.ProductID);
                }
            })
        productApi.getAll()
            .then((res) => {
                setProductall(res);
            })
            .catch((err) => {
                console.error("Lỗi lấy sản phẩm:", err);
            })

    };
    const isAvailable = totalQuantity > 0;
    useEffect(() => {
        if (productID) {
            fetchProducts();
        }


    }, [productID]);
    const tabs = [
        { id: "description", label: "Mô tả sản phẩm", content: "Nội dung mô tả sản phẩm..." },
        { id: "specs", label: "Thông số kỹ thuật", content: "Nội dung thông số kỹ thuật..." },
        { id: "guide", label: "Hướng dẫn mua hàng", content: "Nội dung hướng dẫn mua hàng..." },
        { id: "reviews", label: "Đánh giá sản phẩm", content: "Nội dung đánh giá sản phẩm..." },
    ];
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const limitedProducts = productall.slice(0, 5);
    // console.log("version", selectedVersion.ProductVersionID);

    // add to cart
    const datacart = {
        UserID: userId,
        ProductID: productID,
        ProductColorID: selectedColor?.ProductColorID,
        ProductVersionID: selectedVersion?.ProductVersionID,
        Quantity: quantity,
    }
    const handleAddToCart = async () => {
        if (!selectedColor || !selectedVersion) {
            alert("Vui lòng chọn màu sắc và phiên bản!");
            return;
        }
        try {
            cartApi.addtocart(datacart)
            fetchCartCount();
            alert("Đã thêm vào giỏ hàng thành công!");
        } catch (error) {
            console.error("Lỗi thêm vào giỏ:", error);
            alert("Có lỗi xảy ra khi thêm vào giỏ hàng.");
        }
    };


    return (
        <>
            <Helmet>
                <title>Sản phẩm</title>
            </Helmet>
            <Crumb
                name='Sản phẩm' />
            <div className='container mt-5'>
                <h4>{products.ProductName}</h4>
                <div className='row mt-3' style={{ borderBottom: '1px solid #D71920', fontSize: '16px', fontWeight: '600' }}>
                    <div className='col-md-3'>
                        <p>
                            <span style={{ color: '#D71920', marginRight: '8px' }}>Loại:</span>
                            <span>{loai}</span>
                        </p>
                    </div>
                    <div className='col-md-3'>
                        <p>
                            <span style={{ color: '#D71920', marginRight: '8px' }}>Thương hiệu:</span>
                            <span>{thuonghieu}</span>
                        </p>
                    </div>
                    <div className='col-md-3'>
                        <p>
                            <span style={{ color: '#D71920', marginRight: '8px' }}>Tình trạng:</span>
                            {totalQuantity > 0 ? <span>Còn hàng</span> : <span>Hết hàng</span>}
                        </p>
                    </div>
                    <div className='col-md-3'>
                        <p>
                            <span style={{ color: '#D71920', marginRight: '8px' }}>Mã sản phẩm:</span>
                            <span>XM{masp}</span>
                        </p>
                    </div>
                </div>
                <div className='mt-4 row'>
                    <div className='col-md-5'>
                        <div className='d-flex align-items-center' style={{ border: '2px solid #D71920', borderRadius: '10px', height: '526px', width: '100%' }}>
                            <img src={selectedImage} alt="Selected" width="100%" />
                        </div>
                        <div className='row mt-3'>
                            {color.map((img, index) => (

                                <div className='col-md-3 col-3 mt-1'>

                                    <div key={index} className='d-flex align-items-center' style={{ border: selectedImage === buildImageUrl(img) ? "2px solid #D71920" : "2px solid #d8d7d7", height: '113px', borderRadius: '5px', cursor: 'pointer' }}>
                                        <img src={buildImageUrl(img)}
                                            alt={`Option ${index}`} width="100%"
                                            onClick={() => setSelectedImage(buildImageUrl(img))}
                                        />
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <p style={{ fontWeight: '600' }}>Giá bán:</p>
                        <div className='price-box'>{Number(products.ProductPrice).toLocaleString('vi-VN')}
                            <span className='line-under'>đ</span>
                        </div>
                        <p style={{ fontWeight: '600' }}>Phiên bản:</p>
                        <div className="d-flex flex-wrap gap-2">
                            {version.map((version, index) => (
                                <div
                                    key={index}
                                    variant="outline-dark"
                                    className='d-flex align-items-center border-2 '
                                    style={{ border: selectedVersion === version ? "2px solid #D71920" : "2px solid #d8d7d7", borderRadius: '5px', cursor: 'pointer', padding: '4px' }}
                                    onClick={() => setSelectedVersion(version)}
                                >
                                    {version.ProductVersionName}
                                </div>
                            ))}
                        </div>
                        <p style={{ fontWeight: '600', marginTop: '12px' }}>Màu sắc:</p>
                        <div className="d-flex flex-wrap gap-2">
                            {color.map((color, index) => (
                                <div
                                    key={index}
                                    variant="outline-dark"
                                    className='d-flex align-items-center border-2 '
                                    style={{ border: selectedColor === color ? "2px solid #D71920" : "2px solid #d8d7d7", borderRadius: '5px', cursor: 'pointer', padding: '4px' }}
                                    onClick={() => setSelectedColor(color)}
                                >
                                    {color.ProductColorName}
                                </div>
                            ))}
                        </div>
                        <div className='d-flex align-items-center mt-2'>
                            <p className='m-0' style={{ fontWeight: '600' }}>Số lượng:</p>
                            <div className='input-number-product'>
                                <button onClick={decreaseQuantity}>-</button>
                                <input type='number' value={quantity} />
                                <button onClick={increaseQuantity}>+</button>

                            </div>
                            <button onClick={handleAddToCart} className='addtocart' style={{
                                cursor: isAvailable ? 'pointer' : 'not-allowed',
                            }}>Thêm vào giỏ hàng</button>

                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <button
                                onClick={() => handleBuyNow(products)}
                                className='buynow' style={{
                                    cursor: isAvailable ? 'pointer' : 'not-allowed',
                                }}>Mua ngay</button>
                            <button className='buynow'>Liên hệ</button>
                        </div>
                        <div className='service-pro mt-4'>
                            <div className='title'>
                                Danh sách khuyến mãi
                            </div>
                            <div className='d-flex align-items-center p-2' style={{ fontSize: '13px' }}>
                                <img src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/km_product1.png?1741709416058' alt='' />
                                <p className='m-0'>Áp dụng Phiếu quà tặng/ Mã giảm giá theo sản phẩm</p>
                            </div>
                            <div className='d-flex align-items-center p-2' style={{ fontSize: '13px' }}>
                                <img src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/km_product1.png?1741709416058' alt='' />
                                <p className='m-0'>Giảm giá 10% khi mua từ 5 sản phẩm trở lên</p>
                            </div>
                            <div className='d-flex align-items-center p-2' style={{ fontSize: '13px' }}>
                                <img src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/km_product3.png?1741709416058' alt='' />
                                <p className='m-0'>Tặng 100.000₫ mua hàng tại website thành viên Euro moto, áp dụng khi mua Online tại Hồ Chí Minh và 1 số khu vực khác.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='service-pro'>
                            <div className='title'>
                                Cam kết bán hàng
                            </div>
                            <ul>
                                <li>
                                    <img className='thumb-img' src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/camket_1.png?1741709416058 ' alt='' />
                                    <b>Sản phẩm</b>
                                    <p>Chính hãng</p>
                                </li>
                                <li>
                                    <img className='thumb-img' src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/camket_2.png?1741709416058 ' alt='' />
                                    <b>Giá tốt</b>
                                    <p>Trực tiếp</p>
                                </li>
                                <li>
                                    <img className='thumb-img' src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/camket_3.png?1741709416058' alt='' />
                                    <b>Combo quà</b>
                                    <p>Chất lượng</p>
                                </li>
                                <li>
                                    <img className='thumb-img' src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/camket_4.png?1741709416058 ' alt='' />
                                    <b>Trả góp</b>
                                    <p>Lãi suất thấp</p>
                                </li>
                                <li>
                                    <img className='thumb-img' src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/camket_5.png?1741709416058' alt='' />
                                    <b>Bảo hành</b>
                                    <p>3-5 năm</p>
                                </li>
                                <li>
                                    <img className='thumb-img' src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/camket_6.png?1741709416058' alt='' />
                                    <b>Giao hàng</b>
                                    <p>Tận nhà</p>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div className='mt-5 d-none d-md-block'>
                    <div className='col-md-9'>
                        <div className='product-tab'>
                            <div className='title-tab'>
                                Thông tin sản phẩm
                            </div>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <div className="d-flex flex-column gap-2">
                                        {tabs.map((tab) => (
                                            <div
                                                key={tab.id}
                                                style={{
                                                    border: activeTab === tab.id ? "none" : "2px solid #d8d7d7",
                                                    background: activeTab === tab.id ? "#D71920" : "#fff",
                                                    color: activeTab === tab.id ? "#fff" : "#000",
                                                    borderRadius: '20px', cursor: 'pointer', padding: '8px',
                                                    fontWeight: '500',
                                                    marginTop: '8px'
                                                }}
                                                onClick={() => setActiveTab(tab.id)}
                                            >
                                                {tab.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='col-md-9'>
                                    <div className="">
                                        {tabs.find((tab) => tab.id === activeTab)?.content}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className='col-md-3'>

                    </div>
                </div>
                {/*  */}
                <div className='d-none d-md-block'>
                    <Title
                        titleName='Sản phẩm'
                        titleDes='liên quan'
                    ></Title>
                    <div className='ms-4 d-flex'>
                        {limitedProducts.length > 0 ? (
                            limitedProducts.map((product) => (
                                <ProductFrame
                                    id={product.ProductID}
                                    name={product.ProductName}
                                    image={`http://127.0.0.1:8000/image/${product.category.parent.CategoryParentName}/${product.category.CategoryName}/${product.ProductName}/${product.thumbnail}`}
                                    price={product.ProductPrice}
                                />
                            ))
                        ) : (
                            <p>Không có sản phẩm nào.</p>
                        )}

                    </div>
                </div>
            </div>


        </>
    )
}

export default ProductDetails