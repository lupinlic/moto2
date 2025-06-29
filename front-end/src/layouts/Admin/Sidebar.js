import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    useEffect(() => {
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide) => {
            slide.addEventListener('click', () => {
                // Loại bỏ class active khỏi tất cả slide
                slides.forEach((s) => s.classList.remove('active'));
                // Thêm class active vào slide được chọn
                slide.classList.add('active');
            });
        });

        // child
        const slideschilds = document.querySelectorAll('.slidechild');
        slideschilds.forEach((slidechild) => {
            slidechild.addEventListener('click', () => {
                // Loại bỏ class active khỏi tất cả slide
                slideschilds.forEach((s) => s.classList.remove('activechild'));
                // Thêm class active vào slide được chọn
                slidechild.classList.add('activechild');
            });
        });


    }, []);

    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => setShowDetails(!showDetails);

    const [showcate, setShowCate] = useState(false);

    const toggleCate = () => setShowCate(!showcate);

    return (
        <div className="col-md-2 slider" style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
            <div className="pt-3">
                <img className='' style={{ width: 50, borderRadius: '50%', }} src='https://e7.pngegg.com/pngimages/754/474/png-clipart-computer-icons-system-administrator-avatar-computer-network-heroes-thumbnail.png' alt />
                <span style={{ fontSize: 16, marginLeft: 8, color: '#62677399' }}>Admin</span>
            </div>
            <h6 className="mt-4" style={{ color: '#62677399' }}>NAVIGATION</h6>
            <ul className='navigation m-0 p-0'>

                <li className='slide active' style={{ padding: '8px 20px' }}>
                    <Link to='/Admin'><i class="fas fa-home me-2"></i> Dashboard </Link>
                </li>
                <li className='slide' style={{ padding: '8px 20px' }}><Link to='/Admin/Accounts'> <i class="fas fa-user me-2"></i> Tài khoản</Link> </li>
                <li onClick={toggleCate} className='slide' style={{ padding: '8px 20px' }}>
                    <Link to='' className='d-flex align-items-center'><i class="fas fa-layer-group me-2"></i>
                        <span>Danh mục</span>
                        <div style={{ marginLeft: '40px' }}>{showcate ? '▲' : '▼'}</div>
                    </Link>
                </li>
                {showcate && (
                    <div className='d-flex flex-column' style={{ paddingLeft: '16px' }}>
                        <Link className='slidechild' style={{ padding: '2px 20px' }} to='/Admin/CarCompany'><i class="fas fa-car me-2"></i>Hãng xe</Link>
                        <Link className='slidechild' style={{ padding: '2px 20px' }} to='/Admin/VehicleType'><i class="fas fa-truck me-2"></i>Loại xe</Link>

                    </div>
                )}
                <li onClick={toggleDetails} className='slide' style={{ padding: '8px 20px' }}>
                    <Link to='' className='d-flex align-items-center'><i class="fas fa-box-open me-2"></i>
                        <span>Sản phẩm</span>
                        <div style={{ marginLeft: '40px' }}>{showDetails ? '▲' : '▼'}</div>
                    </Link>
                </li>
                {showDetails && (
                    <div className='d-flex flex-column' style={{ paddingLeft: '16px' }}>
                        <Link className='slidechild' to='/Admin/Product' style={{ padding: '2px 20px' }}><i class="fas fa-cube me-2"></i>Sản phẩm</Link>
                        <Link className='slidechild' to='/Admin/ProductColor' style={{ padding: '2px 20px' }}><i class="fas fa-palette me-2"></i>Màu sắc</Link>
                        <Link className='slidechild' to='/Admin/ProductVersion' style={{ padding: '2px 20px' }}><i class="fas fa-code-branch me-2"></i>Phiên bản</Link>
                    </div>
                )}
                <li className='slide' style={{ padding: '8px 20px' }}><Link to='/Admin/Customer'><i class="fas fa-users me-2"></i>Khách hàng</Link> </li>
                <li className='slide' style={{ padding: '8px 20px' }}><Link to='/Admin/Order'><i class="fas fa-shopping-cart me-2"></i>Đơn hàng</Link> </li>
                <li className='slide' style={{ padding: '8px 20px' }}><Link to='/Admin/News'><i class="fas fa-newspaper me-2"></i>Tin tức</Link> </li>
                <li className='slide' style={{ padding: '8px 20px' }}><Link to='/Admin/Feedback'><i class="fas fa-comments me-2"></i>Phản hồi</Link> </li>




            </ul>
            <div>

            </div>
        </div>

    )
}

export default Sidebar