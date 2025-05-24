import React, { useState, useEffect } from 'react'
import "../../styles/header.css"
import { Link, useLocation } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import categoryApi from '../../api/categoryApi';
import categoryParentApi from '../../api/categoryParentApi';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

function Header() {
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const location = useLocation();
    const toggleSubMenu = () => {
        setSubMenuOpen(!subMenuOpen);
    };
    const [menuActive, setMenuActive] = useState(false);
    const toggleMenu = () => setMenuActive(!menuActive);
    useEffect(() => {
        setMenuActive(false);
    }, [location]);
    const { cartCount, favoriteCount } = useContext(CartContext);
    const { setCartCount, setFavoriteCount } = useContext(CartContext);
    const { fetchCartCount } = useContext(CartContext);
    const { fetchfavoriteCount } = useContext(CartContext);
    const userId = localStorage.getItem('user_id');
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        setCartCount(0);
        setFavoriteCount(0);
        navigate('/Login')

    };
    const [category, setCategory] = useState([]);
    const [categoryParent, setCategoryParent] = useState([]);
    // api
    const fetchCategory = async () => {
        try {
            const parentRes = await categoryParentApi.getCategoryPrarent();
            const parentData = parentRes.data;
            setCategoryParent(parentData);

            const promises = parentData.map(parent =>
                categoryApi.getCategorybyPrarent(parent.CategoryParentID)
                    .then(res => ({ [parent.CategoryParentID]: res.data }))
            );

            const results = await Promise.all(promises);

            // Gộp tất cả các object lại thành 1 object
            const combinedCategory = results.reduce((acc, cur) => {
                return { ...acc, ...cur };
            }, {});

            setCategory(combinedCategory);
        } catch (error) {
            console.error('Có lỗi khi lấy danh mục cha:', error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);




    return (
        <div className='header container'>
            <div className='h-100 row align-items-center'>
                <div className='col-md-2 col-5'>
                    <img className='w-100' src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/logo.png?1741709416058' alt='' />
                </div>
                <div className='col-md-10 col-7'>
                    <div className='header-topbar row d-none d-md-flex'>
                        <div className='col-md-3'> </div>
                        <div className='col-md-5'>
                            <ul className='header-topbar-list d-flex h-100 align-items-center justify-content-center'>
                                <Link to='/StoreSystem'>
                                    <li>
                                        <i class="fas fa-map-marker-alt"></i>
                                        Hệ thống cửa hàng
                                    </li>
                                </Link>
                                {
                                    userId ? (
                                        <>
                                            <Link to='/Account'>
                                                <li>
                                                    <i class="fas fa-user"></i>
                                                    Tài khoản
                                                </li>
                                            </Link>
                                            <Link to='/Login'>

                                                <li onClick={handleLogout} >
                                                    <i class="fas fa-sign-out-alt"></i>
                                                    Đăng xuất
                                                </li>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to='/Login'>
                                                <li>
                                                    <i class="fas fa-user"></i>
                                                    Đăng nhập
                                                </li>
                                            </Link>
                                            <Link to='/Register'>

                                                <li onClick={handleLogout} >
                                                    <i class="fas fa-user-plus"></i>
                                                    Đăng ký
                                                </li>
                                            </Link>
                                        </>
                                    )
                                }


                            </ul>
                        </div>
                        <div className='col-md-4 social-icons align-items-center justify-content-center'>

                            <a href="#" className="facebook"><i className="fab fa-facebook-f" /></a>
                            <a href="#" className="youtube"><i className="fab fa-youtube" /></a>
                            <a href="#" className="twitter"><i className="fab fa-twitter" /></a>
                            <a href="#" className="pinterest"><i className="fab fa-pinterest" /></a>
                            <a href="#" className="instagram"><i className="fab fa-instagram" /></a>


                        </div>

                    </div>

                    <div className='header-menu row'>
                        <div className='col-md-9 d-none d-md-block'>
                            <ul className='h-100 d-flex align-items-center justify-content-between'>
                                <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
                                    <li>Trang chủ</li>
                                </NavLink>

                                <NavLink to="/Introduce" className={({ isActive }) => (isActive ? "active-link" : "")}>
                                    <li>Giới thiệu</li>
                                </NavLink>
                                <Link className='position-relative header-menu-parent'>
                                    <li><Link to="/Product">Sản phẩm</Link></li>

                                    <div className="dropdown-cate-item position-absolute d-flex align-items-center header-menu-child ">
                                        {categoryParent.map((parent) => (
                                            <ul key={parent.CategoryParentID}> <Link style={{ color: 'red' }} to={`/Product?parent=${parent.CategoryParentID}`}>{parent.CategoryParentName}</Link>
                                                {category[parent.CategoryParentID]?.map((child) => (
                                                    <Link key={child.CategoryID} to={`/Product?category=${child.CategoryID}`}>
                                                        <li>{child.CategoryName}</li>
                                                    </Link>
                                                ))}

                                            </ul>
                                        ))}
                                    </div>

                                </Link>
                                <NavLink to="/News" className={({ isActive }) => (isActive ? "active-link" : "")}>
                                    <li>Tin tức</li>
                                </NavLink>
                                <NavLink to="/Contact" className={({ isActive }) => (isActive ? "active-link" : "")}>
                                    <li>Liên hệ</li>
                                </NavLink>
                                <NavLink to="/Question" className={({ isActive }) => (isActive ? "active-link" : "")}>
                                    <li>Câu hỏi thường gặp</li>
                                </NavLink>
                            </ul>
                        </div>
                        <div className='col-md-1 col-2'></div>
                        <div className='col-md-2 col-10 d-flex align-items-center justify-content-between'>
                            <div className='icon'>
                                <i className="fas fa-search" />
                            </div>
                            <Link to='/LikeProduct'>
                                <div className="icon">
                                    <i className="fas fa-heart" />
                                    <span className="badge">{favoriteCount}</span>
                                </div>
                            </Link>
                            <Link to='/Cart'>
                                <div className="icon">
                                    <i className="fas fa-shopping-cart" />
                                    <span className="badge">{cartCount}</span>
                                </div>
                            </Link>
                            <div className='icon d-block d-md-none'>
                                <i onClick={toggleMenu} class="fa-solid fa-list"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Menu */}
            <div className={`overlaymenu ${menuActive ? 'active' : ''}`} onClick={toggleMenu}></div>
            <div className={`sidebar ${menuActive ? 'active' : ''}`}>
                <span className="close-btn" onClick={toggleMenu}>&times;</span>
                <div>
                    {
                        userId ? (
                            <>
                                <Link to='/Account'>
                                    <li>
                                        <i class="fas fa-user"></i>
                                        Tài khoản
                                    </li>
                                </Link>
                                <Link to='/Login'>

                                    <li onClick={handleLogout} >
                                        <i class="fas fa-sign-out-alt"></i>
                                        Đăng xuất
                                    </li>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to='/Login'>
                                    <li>
                                        <i class="fas fa-user"></i>
                                        Đăng nhập
                                    </li>
                                </Link>
                                <Link to='/Register'>

                                    <li onClick={handleLogout} >
                                        <i class="fas fa-user-plus"></i>
                                        Đăng ký
                                    </li>
                                </Link>
                            </>
                        )
                    }

                </div>
                <div className="mt-1">
                    <Link to="/">Trang chủ</Link>
                    <div className='d-flex align-items-center justify-content-between'>
                        <Link to="/Product">Tất cả sản phẩm</Link>
                        <i onClick={toggleSubMenu} class="fa-solid fa-caret-down"></i>
                    </div>
                    {subMenuOpen && (
                        categoryParent.map((parent) => (
                            <ul className='' key={parent.CategoryParentID}> <Link style={{}} to={`/Product?parent=${parent.CategoryParentID}`}>{parent.CategoryParentName}</Link>
                                {category[parent.CategoryParentID]?.map((child) => (
                                    <Link className='p-1' key={child.CategoryID} to={`/Product?category=${child.CategoryID}`}>
                                        <li style={{ marginLeft: '16px' }}>{child.CategoryName}</li>
                                    </Link>
                                ))}

                            </ul>
                        ))
                    )}

                    <Link to="/News">Tin tức</Link>
                    <Link to="/Introduce">Giới thiệu</Link>
                    <Link to="/Contact">Liên hệ</Link>
                </div>
                <p>Nhận bản tin mới nhất và hỗ trợ từ chúng tôi</p>
                <div className="d-flex">
                    <input type="text" placeholder="Nhập Email của bạn...." />
                    <button>Đăng ký</button>
                </div>
            </div>

        </div>
    )
}

export default Header