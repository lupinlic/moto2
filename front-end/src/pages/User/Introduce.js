import React from 'react'
import Crumb from '../../components/Crumb'
import { Helmet } from "react-helmet-async";

function Introduce() {
    return (
        <div>
            <Helmet>
                <title>Giới thiệu</title>
            </Helmet>
            <Crumb
                name='Giới thiệu' />
            <div className='container mt-3'>
                <p style={{ fontSize: '24px' }}>Giới thiệu</p>
                <p style={{ marginLeft: '12px' }}>Chào mừng quý khách đến với Dola Moto – điểm đến đáng tin cậy cho những người yêu thích xe máy tại khu vực! Chúng tôi chuyên cung cấp các dòng xe máy chất lượng từ những thương hiệu hàng đầu như Honda, Yamaha và SYM,
                    đáp ứng nhu cầu đa dạng của khách hàng từ những mẫu xe tay ga tiện lợi, đến xe số bền bỉ và mạnh mẽ.</p>
                <p style={{ fontSize: '24px' }}>Tại sao nên chọn Dola Moto?</p>
                <p style={{ marginLeft: '12px' }}>Sản phẩm chính hãng: Chúng tôi cam kết chỉ cung cấp các dòng xe máy chính hãng với chất lượng đảm bảo, đem đến sự an tâm tuyệt đối cho khách hàng.</p>
                <p style={{ marginLeft: '12px' }}>Dịch vụ tư vấn chuyên nghiệp: Đội ngũ nhân viên tận tâm, giàu kinh nghiệm luôn sẵn sàng hỗ trợ khách hàng lựa chọn mẫu xe phù hợp nhất với nhu cầu và sở thích cá nhân.</p>
                <p style={{ marginLeft: '12px' }}>Giá cả cạnh tranh: Với mong muốn mang lại giá trị tốt nhất, chúng tôi luôn duy trì mức giá hợp lý cùng nhiều chương trình khuyến mãi hấp dẫn.</p>
                <p style={{ marginLeft: '12px' }}>Dịch vụ hậu mãi chu đáo: Dola Moto không chỉ bán xe mà còn mang đến cho khách hàng những dịch vụ bảo dưỡng, sửa chữa tận tâm với đội ngũ kỹ thuật viên lành nghề.</p>
                <p style={{ fontSize: '24px' }}>Các dòng xe nổi bật</p>
                <p style={{ marginLeft: '12px' }}>Honda: Những mẫu xe nổi tiếng như Honda SH, Vision, Air Blade với thiết kế hiện đại và tiết kiệm nhiên liệu.</p>
                <p style={{ marginLeft: '12px' }}>SYM: Các mẫu xe SYM Attila, Elegant với thiết kế thân thiện và hiệu suất ổn định.</p>
                <p style={{ marginLeft: '12px' }}>Yamaha: Xe tay ga Yamaha Grande, Janus, cùng các dòng xe số bền bỉ như Sirius, Exciter.</p>
                <p>Hãy đến ngay Dola Moto để trải nghiệm và chọn cho mình một chiếc xe phù hợp với phong cách và nhu cầu của bạn! Chúng tôi tự hào là người bạn đồng hành tin cậy trên mọi hành trình của bạn.</p>
            </div>
        </div>
    )
}

export default Introduce