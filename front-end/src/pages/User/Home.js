import React, { useState, useEffect } from "react";
import Title from '../../components/Title'
import CategoryCard from '../../components/CategoryCard'
import "../../styles/home.css"
import ProductFrame from "../../components/ProductFrame";
import Bt from "../../components/Bt";
import { Helmet } from "react-helmet-async";
import productApi from "../../api/productApi";
import categoryParentApi from "../../api/categoryParentApi";
import newsApi from '../../api/newApi';
import { useNavigate } from "react-router-dom";


function Home() {
    const [timeLeft, setTimeLeft] = useState({
        days: 128,
        hours: 14,
        minutes: 58,
        seconds: 24,
    });
    const [products, setProducts] = useState([]);
    const [products5, setProducts5] = useState([]);
    const [products2, setProducts2] = useState([]);
    const [productbycate, setProductbycate] = useState([]);
    const [categoryParent, setCategoryParent] = useState([]);
    const [parentId, setParentId] = useState(1);
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    const fetchNews = async () => {
        try {
            const response = await newsApi.getNews();
            setNews(response.data.slice(0, 3));
            console.log(news);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };


    const fetchProducts = () => {
        productApi.getAll()
            .then((res) => {
                setProducts(res);
                setProducts5(res.slice(0, 5));
                setProducts2(res.slice(0, 2)); // Lấy 5 sản phẩm đầu tiên
            })
            .catch((err) => {
                console.error("Lỗi lấy sản phẩm:", err);
            });
    };

    // Hàm đếm ngược
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                let { days, hours, minutes, seconds } = prevTime;

                if (seconds > 0) {
                    seconds--;
                } else {
                    if (minutes > 0) {
                        minutes--;
                        seconds = 59;
                    } else if (hours > 0) {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    } else if (days > 0) {
                        days--;
                        hours = 23;
                        minutes = 59;
                        seconds = 59;
                    }
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        fetchProducts();
        const fetchCategories = async () => {
            try {
                const res = await categoryParentApi.getCategoryPrarent(); // tuỳ tên API
                setCategoryParent(res.data);
            } catch (error) {
                console.error("Lỗi lấy category:", error);
            }
        };

        fetchCategories();

        const fetchProductsbycate = async () => {
            try {
                let res;
                if (parentId) {
                    res = await productApi.getproductbyCategoryparent(parentId);
                }
                setProductbycate(res.data.slice(0, 8));
                console.log(res.data);
            } catch (error) {
                console.error("Lỗi lấy sản phẩm:", error);
            }
        };

        fetchProductsbycate();

        fetchNews();
    }, [parentId]);

    const handleClick = (id) => {
        // Chuyển hướng đến trang chi tiết tin tức
        navigate(`/NewsDetails/${id}`);
    }

    return (
        <>
            <Helmet>
                <title>Trang chủ </title>
            </Helmet>
            <div>
                <img className='w-100' src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/slider_1.jpg?1741709416058' />
                <div className='container'>
                    <Title
                        titleName='Danh mục'
                        titleDes='nổi bật'
                    ></Title>
                    <div className='row'>
                        <div className='col-md-3 p-1'>
                            <CategoryCard
                                imgUrl='https://bizweb.dktcdn.net/thumb/large/100/519/812/collections/xe-tay-ga.jpg?v=1727746181450'
                                categoryName='Xe tay ga'
                            ></CategoryCard>
                        </div>
                        <div className='col-md-3 p-1'>
                            <CategoryCard
                                imgUrl='https://bizweb.dktcdn.net/thumb/large/100/519/812/collections/xe-so.jpg?v=1727746174140'
                                categoryName='Xe số'
                            ></CategoryCard>
                        </div>
                        <div className='col-md-3 p-1'>
                            <CategoryCard
                                imgUrl='https://bizweb.dktcdn.net/thumb/large/100/519/812/collections/xe-con-tay.jpg?v=1727746225237'
                                categoryName='Xe côn tay'
                            ></CategoryCard>
                        </div>
                        <div className='col-md-3 p-1'>
                            <CategoryCard
                                imgUrl='https://bizweb.dktcdn.net/thumb/large/100/519/812/collections/xe-pkl.jpg?v=1727746209677'
                                categoryName='Xe phân khối lớn'
                            ></CategoryCard>
                        </div>
                    </div>
                    {/* deal */}
                    <Title
                        titleName='Deal'
                        titleDes='nổi bật'
                    ></Title>
                    <div className='block-product-list mt-5'>
                        <div className='count-down d-flex align-items-center justify-content-center'>
                            <strong>{timeLeft.days}</strong> Ngày :
                            <strong>{timeLeft.hours}</strong> Giờ :
                            <strong>{timeLeft.minutes}</strong> Phút :
                            <strong>{timeLeft.seconds}</strong> Giây
                        </div>


                        <div className='block-product-flash d-flex'>

                            {products5.map((product) => (
                                <ProductFrame
                                    id={product.ProductID}
                                    name={product.ProductName}
                                    image={`http://127.0.0.1:8000/image/${product.category.parent.CategoryParentName}/${product.category.CategoryName}/${product.ProductName}/${product.thumbnail}`}
                                    price={product.ProductPrice}
                                />
                            ))
                            }
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-4 block-product-bt">
                            <Bt
                                des={'product'}
                                name='Xem tất cả'
                            />
                        </div>
                    </div>
                    {/*  */}
                    <div className="row mt-5 ">
                        <div className="col-md-6 image-hover1 d-none d-md-block">
                            <img className="w-100" src="https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/banner_three_1.jpg?1741709416058" />
                        </div>
                        <div className="col-md-6 image-hover1">
                            <img className="w-100" src="https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/banner_three_2.jpg?1741709416058" />
                        </div>
                    </div>
                    {/*  */}
                    <Title
                        titleName='Sản phẩm'
                        titleDes='nổi bật'
                    ></Title>
                    <div className="row" style={{ height: '500px', borderRadius: '15px', width: '100%', background: '#f0efef' }}>
                        <div className="col-md-6 p-0 d-none d-md-block image-hover1">
                            <img style={{ borderRadius: '15px', width: '100%', height: '500px' }} src="https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/image_product_3.png?1741709416058" />
                        </div>
                        <div className="col-md-6 col-12 mt-5">
                            <div className=" row align-items-center justify-content-center">
                                {products2.map((product) => (
                                    <div className="col-md-6 col-6 d-flex align-items-center justify-content-end me-0">

                                        <ProductFrame
                                            id={product.ProductID}
                                            name={product.ProductName}
                                            image={`http://127.0.0.1:8000/image/${product.category.parent.CategoryParentName}/${product.category.CategoryName}/${product.ProductName}/${product.thumbnail}`}
                                            price={product.ProductPrice}
                                        />

                                    </div>
                                ))
                                }
                            </div>
                            <div className="d-flex align-items-center justify-content-center mt-3 block-product-bt">
                                <Bt
                                    des={'product'}
                                    name='Xem thêm'
                                />
                            </div>
                        </div>
                    </div>
                    {/* all sản phẩm */}
                    <Title
                        titleName='Tất cả'
                        titleDes='sản phẩm'
                    ></Title>
                    <div className='d-flex align-items-center justify-content-center category-all mt-3'>
                        <ul className='d-flex'>
                            {categoryParent.map((cat) => (
                                <li
                                    onClick={() => setParentId(cat.CategoryParentID)}
                                    className={`${parentId === cat.CategoryParentID
                                        ? 'category-all_active'
                                        : 'bg-white text-black'
                                        }`} >
                                    {cat.CategoryParentName}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="d-flex flex-wrap mt-3 d-none d-md-flex" style={{ rowGap: '20px' }}>
                        <div className=" image-hover1" style={{ height: 'auto', marginRight: '20px' }}>
                            <img style={{ width: '486px', height: '336px' }} src="https://bizweb.dktcdn.net/100/519/812/files/dm12.png?v=1727830403260" />
                        </div>
                        {productbycate.map((product) => (
                            <ProductFrame
                                key={product.ProductID}
                                id={product.ProductID}
                                name={product.ProductName}
                                image={`http://127.0.0.1:8000/image/${product.category.parent.CategoryParentName}/${product.category.CategoryName}/${product.ProductName}/${product.thumbnail}`}
                                price={product.ProductPrice}
                            />
                        ))}
                    </div>
                    <div className="d-md-none d-block block-product-list">
                        <div className='block-product-flash d-flex '>
                            {productbycate.map((product) => (
                                <ProductFrame
                                    id={product.ProductID}
                                    name={product.ProductName}
                                    image={`http://127.0.0.1:8000/image/${product.category.parent.CategoryParentName}/${product.category.CategoryName}/${product.ProductName}/${product.thumbnail}`}
                                    price={product.ProductPrice}
                                />
                            ))
                            }
                        </div>
                    </div>
                    {/*  */}
                    <div className="row mt-md-5 mt-1">
                        <div className="col-md-5">
                            <Title
                                titleName='Dịch vụ'
                                titleDes='nổi bật'
                            ></Title>
                            <p>Dola đảm bảo rằng mọi khách hàng đều có được trải nghiệm và đảm bảo xe luôn trong trạng thái tốt nhất.</p>
                            <div className="d-flex align-items-center mt-2">
                                <div style={{ borderRadius: '50%', padding: '12px', background: '#F6CACC' }}>
                                    <img style={{ width: '50px', height: '50px' }} src="https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/icon_dv_1.png?1741709416058" />
                                </div>
                                <p style={{ fontWeight: '600', marginLeft: '12px', marginBottom: '0', fontSize: '20px', color: 'red' }}>BẢO DƯỠNG XE</p>
                            </div>
                            <div className="d-flex align-items-center mt-2">
                                <div style={{ borderRadius: '50%', padding: '12px', background: '#F6CACC' }}>
                                    <img style={{ width: '50px', height: '50px' }} src="https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/icon_dv_2.png?1741709416058" />
                                </div>
                                <p style={{ fontWeight: '600', marginLeft: '12px', marginBottom: '0', fontSize: '20px', color: 'red' }}>PHỤ TÙNG CHÍNH HÃNG</p>
                            </div>
                            <div className="d-flex align-items-center mt-2">
                                <div style={{ borderRadius: '50%', padding: '12px', background: '#F6CACC' }}>
                                    <img style={{ width: '50px', height: '50px' }} src="https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/icon_dv_3.png?1741709416058" />
                                </div>
                                <p style={{ fontWeight: '600', marginLeft: '12px', marginBottom: '0', fontSize: '20px', color: 'red' }}>SỬA CHỮA LƯU ĐỘNG</p>
                            </div>
                            <div className="d-flex align-items-center mt-2">
                                <div style={{ borderRadius: '50%', padding: '12px', background: '#F6CACC' }}>
                                    <img style={{ width: '50px', height: '50px' }} src="https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/icon_dv_4.png?1741709416058" />
                                </div>
                                <p style={{ fontWeight: '600', marginLeft: '12px', marginBottom: '0', fontSize: '20px', color: 'red' }}>VỆ SINH BUỒNG ĐỐT</p>
                            </div>

                        </div>
                        <div className="col-md-7">
                            <img className="w-100" src="https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/image_dv_4.png?1741709416058" />
                        </div>
                    </div>
                    {/*  */}
                    <div className="image-hover1 mt-5 d-none d-md-block " style={{ height: '402px' }}>
                        <img className="w-100" src="https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/banner_one.jpg?1741709416058" />
                    </div>
                    {/* thương hiệu */}
                    <Title
                        titleName='Thương hiệu'
                        titleDes='nổi bật'
                    ></Title>
                    <div className="row">
                        <div className="col-md-4" style={{ height: '500px' }}>
                            <div className="image-hover1" style={{ border: '1px solid #e0dfdf', borderRadius: '10px', padding: '10px' }}>
                                <div style={{ height: '431px' }}>
                                    <img className="w-100" src="https://bizweb.dktcdn.net/thumb/large/100/519/812/collections/honda-logo.png?v=1719892616953" />
                                </div>
                                <button className="" style={{ border: 'none', borderRadius: '5px', width: '100%', height: '40px', textAlign: 'center', background: '#d71920', color: '#fff' }}>Honda</button>
                            </div>
                        </div>
                        <div className="col-md-4" style={{ height: '500px' }}>
                            <div className="image-hover1" style={{ border: '1px solid #e0dfdf', borderRadius: '10px', padding: '10px' }}>
                                <div className="d-flex align-items-center justify-content-center" style={{ height: '431px' }}>
                                    <img className="w-100" src="https://bizweb.dktcdn.net/thumb/large/100/519/812/collections/1280px-yamaha-motor-logo-full-sv.png?v=1719892640410" />
                                </div>
                                <button className="" style={{ border: 'none', borderRadius: '5px', width: '100%', height: '40px', textAlign: 'center', background: '#d71920', color: '#fff' }}>Yamaha</button>
                            </div>
                        </div>
                        <div className="col-md-4" style={{ height: '500px' }}>
                            <div className="image-hover1" style={{ border: '1px solid #e0dfdf', borderRadius: '10px', padding: '10px' }}>
                                <div className="d-flex align-items-center justify-content-center" style={{ height: '431px' }}>
                                    <img className="w-100" src="https://bizweb.dktcdn.net/thumb/large/100/519/812/collections/untitled.png?v=1719892685533" />
                                </div>
                                <button className="" style={{ border: 'none', borderRadius: '5px', width: '100%', height: '40px', textAlign: 'center', background: '#d71920', color: '#fff' }}>SYM</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid evaluate mt-5 text-white d-none d-md-block">
                    <div className="container h-100 d-flex flex-column align-items-center justify-content-center">
                        <p style={{ fontSize: '40px', fontWeight: '600', marginBottom: '20px' }}>Đánh giá khách hàng</p>
                        <div className="d-flex">
                            <div className="evaluate-frame">
                                <p>Tôi rất ưng khi mua xe tại đây, từ chất lượng xe, phụ tùng, thái độ của nhân viên rất vui vẻ và nhiệt tình, tôi sẽ luôn ủng hộ cửa hàng.</p>
                                <div className="d-flex align-items-center">
                                    <img style={{ width: '96px', height: '96px', borderRadius: '50%' }} src="https://scontent.fhph2-1.fna.fbcdn.net/v/t39.30808-6/479675881_1430404127937109_1011207244040765089_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGiApKbCSIVQzQQRTuy7Xf9x_AtavXkQJHH8C1q9eRAkacjDb8DJ90KdmQJiiVN8UmUS7_aPdl8YdWEdWbXBzVm&_nc_ohc=xE0MBy1U2ScQ7kNvgGkDPwd&_nc_oc=AdnkPFz8v6awoV7L1C1H6_m0OOnvoUmlcITY-cqLVUIe0TYq9E0TntCirAqx6F1SV85PTweVNm7WEvEkB6MF04t_&_nc_zt=23&_nc_ht=scontent.fhph2-1.fna&_nc_gid=zdI0b7MKGDECTSQLra8UuA&oh=00_AYGxCNy2yVO-Gj8lSuC4ba1pb_1Y36A9ynG74Rbth4fomQ&oe=67ED2209" />
                                    <p style={{ marginLeft: '12px', fontSize: '18px', fontWeight: '500' }}>
                                        <span>Khắc Đạt</span><br />
                                        <span>Khách hàng thành viên</span>
                                    </p>
                                </div>
                            </div>
                            <div className="evaluate-frame">
                                <p>Tôi rất ưng khi mua xe tại đây, từ chất lượng xe, phụ tùng, thái độ của nhân viên rất vui vẻ và nhiệt tình, tôi sẽ luôn ủng hộ cửa hàng.</p>
                                <div className="d-flex align-items-center">
                                    <img style={{ width: '96px', height: '96px', borderRadius: '50%' }} src="https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/section_review_2.png?1741709416058" />
                                    <p style={{ marginLeft: '12px', fontSize: '18px', fontWeight: '500' }}>
                                        <span>Sở Bình</span><br />
                                        <span>Khách hàng thành viên</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                {/* tin tức */}
                <div className="container">
                    <Title
                        titleName='Tin tức'
                        titleDes='mới nhất'
                    ></Title>
                    <div className="row mt-4 ">
                        {news.map((item, index) => (
                            <div key={index} className="col-md-4 news" onClick={() => handleClick(item.NewsID)}>
                                <div className="image-hover1">
                                    <img style={{ width: '438px', height: '239px' }}
                                        src={`http://127.0.0.1:8000/News/${item.Image}`} />
                                </div>
                                <p className="news-title" style={{ fontSize: '20px', fontWeight: '600', marginTop: '12px' }}>{item.Title}</p>
                                <p>{item.Content.length > 150 ? item.Content.slice(0, 150) + '...' : item.Content}</p>
                            </div>
                        ))}

                    </div>
                </div>
                {/*  */}
                <div className="container evaluate2 mt-5 d-none d-md-block">
                    <div className="row h-100">
                        <div className="col-md-3 d-flex flex-column align-items-center justify-content-center text-white text-center">
                            <img style={{ width: '60px' }} src="https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/chinhsach_1.png?1741709416058" />
                            <h6>Miễn phí vận chuyển</h6>
                            <p>Cho tất cả đơn hàng trong nội thành Hà Nội</p>

                        </div>
                        <div className="col-md-3 d-flex flex-column align-items-center justify-content-center text-white text-center">
                            <img style={{ width: '60px' }} src="https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/chinhsach_2.png?1741709416058" />
                            <h6>Miễn phí đổi - trả</h6>
                            <p>Đối với sản phẩm lỗi sản xuất hoặc vận chuyển</p>

                        </div>
                        <div className="col-md-3 d-flex flex-column align-items-center justify-content-center text-white text-center">
                            <img style={{ width: '60px' }} src="https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/chinhsach_3.png?1741709416058" />
                            <h6>Hỗ trợ nhanh chóng</h6>
                            <p>Gọi hotline 19006750 để được hỗ trợ ngay lập tức</p>

                        </div>
                        <div className="col-md-3 d-flex flex-column align-items-center justify-content-center text-white text-center">
                            <img style={{ width: '60px' }} src="https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/chinhsach_4.png?1741709416058" />
                            <h6>Ưu đãi thành viên</h6>
                            <p>Đăng ký thành viên để được nhận nhiều khuyến mãi</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home