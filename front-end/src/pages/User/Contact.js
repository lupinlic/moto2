import React, { useEffect, useState } from 'react'
import Crumb from '../../components/Crumb'
import { Helmet } from "react-helmet-async";
import customerApi from '../../api/customerApi';
import feedbackApi from '../../api/feedbackApi';

function Contact() {
    const userId = localStorage.getItem('user_id');
    const [customer, setCustomer] = useState();
    const [content, setContent] = useState();

    const getCustomer = () => {

        customerApi.getByIdUser(userId)
            .then(response => {
                setCustomer(response.data)
                console.log(response.data)
            }
            )
            .catch(error => {
                console.error('Có lỗi khi lấy khách hàng ' + error + '-' + error.response.data.message)
            })

    }
    useEffect(() => {
        getCustomer()
    }, [userId])

    const data = {
        CustomerID: customer?.CustomerID,
        Content: content
    }
    const handleSubmit = () => {
        feedbackApi.sentfeedback(data)
            .then(response => {
                console.log(response.data)
                alert('Gửi thông tin thành công!')
                setContent("");
            })
            .catch(error => {
                console.error('Có lỗi khi gửi thông tin ' + error + '-' + error.response.data.message)
            })
    }

    return (
        <div>
            <Helmet>
                <title>Liên hệ</title>
            </Helmet>
            <Crumb
                name='Liên hệ' />
            <div className='container mt-3 contact'>
                <div className='row'>
                    <div className='col-md-6'>
                        <p style={{ fontSize: '24px', color: '#d71920' }}>Cửa hàng Euro Moto</p>
                        <p>Chào mừng quý khách đến với Dola Moto – điểm đến đáng tin cậy cho những người yêu thích xe máy tại khu vực! Chúng tôi chuyên cung cấp các dòng xe máy chất lượng từ những thương hiệu hàng đầu như Honda, Yamaha và SYM,
                            đáp ứng nhu cầu đa dạng của khách hàng từ những mẫu xe tay ga tiện lợi, đến xe số bền bỉ và mạnh mẽ.</p>
                        <div className='row mt-5'>
                            <div className='col-md-6'>
                                <div className='d-flex align-items-center'>
                                    <div className='d-flex align-items-center justify-content-center' style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #d71920', color: '#d71920' }}>
                                        <i class="fa-solid fa-location-dot"></i>
                                    </div>
                                    <div className='ms-2' style={{ fontSize: '14px' }}>
                                        <h6>Địa chỉ</h6>
                                        <p className='m-0'>70 Lữ Gia, Phường 15, Quận 11, TP.HCM</p>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mt-3'>
                                    <div className='d-flex align-items-center justify-content-center' style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #d71920', color: '#d71920' }}>
                                        <i class="fa-solid fa-phone"></i>
                                    </div>
                                    <div className='ms-2' style={{ fontSize: '14px' }}>
                                        <h6>Hotline</h6>
                                        <p className='m-0'>1900 6700</p>
                                    </div>
                                </div>

                            </div>
                            <div className='col-md-6'>
                                <div className='d-flex align-items-center'>
                                    <div className='d-flex align-items-center justify-content-center' style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #d71920', color: '#d71920' }}>
                                        <i class="fa-solid fa-clock"></i>
                                    </div>
                                    <div className='ms-2' style={{ fontSize: '14px' }}>
                                        <h6>Thời gian làm việc</h6>
                                        <p className='m-0'>8h - 22h
                                            Từ thứ 2 đến chủ nhật</p>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mt-3'>
                                    <div className='d-flex align-items-center justify-content-center' style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #d71920', color: '#d71920' }}>
                                        <i class="fa-solid fa-envelope"></i>
                                    </div>
                                    <div className='ms-2' style={{ fontSize: '14px' }}>
                                        <h6>Email</h6>
                                        <p className='m-0'>huatunglam1205@gmail.com</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <p style={{ fontSize: '24px', color: '#d71920' }}>Liên hệ với chúng tôi</p>
                        <p>Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể .</p>

                        <input type='text' placeholder='Họ tên' value={customer?.FullName || ''} readOnly />
                        <input type='text' placeholder='Email' value={customer?.Email || ''} readOnly />
                        <input type='text' placeholder='Điện thoại' value={customer?.PhoneNumber || ''} readOnly />

                        <textarea placeholder='Nội dung' onChange={(e) => (setContent(e.target.value))}></textarea>
                        <button onClick={() => handleSubmit()}>Gửi thông tin</button>
                    </div>
                </div>
                <div className='mt-5'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.952399284493!2d105.7973124!3d20.9829966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313452aa32518ef1%3A0x812b4c82b3c1237e!2zTMOqIEzDqiDEkOG7pWMgMjAgVOG6pXQgVGjhu6ljLCBUw6JuIFRyaeG7gW8sIFRoxqEgdGjhu4sgVGjhu4sgxJDhuqFvLCBIw6AgxJDhuqFv!5e0!3m2!1svi!2s!4v1698684726953!5m2!1svi!2s"
                        width="100%"
                        height="500px"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default Contact