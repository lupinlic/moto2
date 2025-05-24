import React from 'react'
import Crumb from '../../components/Crumb'
import { Helmet } from "react-helmet-async";
function Question() {
    return (
        <div>
            <Helmet>
                <title>Câu hỏi thường gặp</title>
            </Helmet>
            <Crumb
                name='Câu hỏi thường gặp' />
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-8'>
                        <p style={{ fontSize: '24px' }}>Hỏi đáp về tài khoản</p>
                        <p style={{ marginLeft: '12px' }}>1. Làm thế nào để tôi trở thành thành viên của Dola?</p>
                        <p style={{ marginLeft: '12px' }}>2. Tại sao tôi không thể đăng nhập vào tài khoản của tôi?</p>
                        <p style={{ marginLeft: '12px' }}>3. Tôi có thể sử dụng chung tài khoản với người khác được không?</p>

                        <p style={{ fontSize: '24px' }}> Hỏi đáp về đặt hàng</p>
                        <p style={{ marginLeft: '12px' }}>1. Tôi có thể đặt hàng bằng những hình thức nào?</p>
                        <p style={{ marginLeft: '12px' }}>2. Tôi cần hỗ trợ mua hàng, làm cách nào để liên hệ với tư vấn viên?</p>
                        <p style={{ marginLeft: '12px' }}>3. Dola có giới hạn về số lượng sản phẩm khi đặt hàng không?</p>

                    </div>
                    <div className='col-md-4 contact'>
                        <p style={{ fontSize: '24px', color: '#d71920' }}>Giải đáp thắc mắc</p>
                        <p>Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể .</p>
                        <input type='text' placeholder='Họ tên' />
                        <input type='text' placeholder='Email' />
                        <input type='text' placeholder='Điện thoại' />
                        <textarea placeholder='Nội dung'></textarea>
                        <button>Gửi thông tin</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question