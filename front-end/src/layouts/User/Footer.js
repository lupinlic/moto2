import React from 'react'
import "../../styles/footer.css"

function Footer() {
    return (
        <div className='footer'>
            <div className="wave-container">
                <svg className="wave wave1" viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0,160 C150,200 350,100 600,150 C850,200 1050,100 1200,160 L1200,200 L0,200 Z"
                        fill="rgba(200,0,0,0.7)"
                    />
                </svg>
                <svg className="wave wave2" viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0,160 C150,200 350,100 600,150 C850,200 1050,100 1200,160 L1200,200 L0,200 Z"
                        fill="rgba(200,0,0,0.5)"
                    />
                </svg>
                <svg className="wave wave2" viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0,160 C150,200 350,100 600,150 C850,200 1050,100 1200,160 L1200,200 L0,200 Z"
                        fill="rgba(200,0,0,0.3)"
                    />
                </svg>
            </div>
            <div className='mid-footer text-white pt-5'>
                <div className='container '>
                    <div className='row'>
                        <div className='col-md-4 col-12'>
                            <img style={{ width: '200px', height: '80px' }} src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/logo-ft.png?1741709416058' />
                            <p className='mt-3'>Chào mừng quý khách đến với Dola Moto – điểm đến đáng tin cậy cho những người yêu thích xe máy tại khu vực!
                                Chúng tôi chuyên cung cấp các dòng xe máy chất lượng từ những thương hiệu hàng đầu như Honda, Yamaha và SYM,
                                đáp ứng nhu cầu đa dạng của khách hàng từ những mẫu xe tay ga tiện lợi, đến xe số bền bỉ và mạnh mẽ.</p>
                            <h6>Địa chỉ: 70 Lữ Gia, Phường 15, Quận 11, TP.HCM</h6>
                            <h6>Điện thoại: 1900 6750</h6>
                            <h6>Email: support@sapo.vn</h6>

                        </div>
                        <div className='col-md-2 col-12'>
                            <h5>Hướng dẫn</h5>
                            <p>Hướng dẫn mua hàng</p>
                            <p>Hướng dẫn giao nhận</p>
                            <p>Hướng dẫn thanh toán</p>
                            <p>Điều khoản dịch vụ</p>
                            <p>Câu hỏi thường gặp</p>
                        </div>
                        <div className='col-md-2 col-12'>
                            <h5>Chính sách</h5>
                            <p>Chính sách thành viên</p>
                            <p>Chính sách thanh toán</p>
                            <p>Chính sách vận chuyển giao nhận</p>
                            <p>Bảo mật thông tin cá nhân</p>

                        </div>
                        <div className='col-md-4 col-12'>
                            <h5>Nhận tin khuyến mãi</h5>
                            <div className='d-flex mt-3'>
                                <input style={{ width: '300px', height: '40px', outline: 'none', border: 'none' }} placeholder='Nhập email nhận tin khuyến mãi' />
                                <button style={{ width: '100px', height: '40px', background: '#FFB42E', border: 'none', color: '#fff' }}>ĐĂNG KÝ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer