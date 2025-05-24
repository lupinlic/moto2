import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

export default function ContactIcon() {
    const [showContact, setShowContact] = useState(true);

    return (
        <div className="mess-bt">
            <i class="fas fa-bell " style={{ color: '#fff' }}
                onClick={() => setShowContact(!showContact)}></i>
            {showContact && (
                <div className="showmessage" style={{ position: 'absolute', padding: '12px', width: '280px', height: '260px', background: '#d71920', top: '-580%', left: '90%', color: '#fff', borderRadius: '15px' }}>
                    <p onClick={() => setShowContact(!showContact)} style={{ position: 'absolute', right: '10px' }}>X</p>
                    <h5 className="mt-3">Tích hợp sẵn các ứng dụng</h5>
                    <ul style={{ fontSize: '14px' }}>
                        <li>
                            <i class="fas fa-arrow-right me-2"></i>
                            <span>Đánh giá sản phẩm</span>
                        </li>
                        <li>
                            <i class="fas fa-arrow-right me-2"></i>
                            <span>Mua X tặng Y</span>
                        </li>
                        <li>
                            <i class="fas fa-arrow-right me-2"></i>
                            <span>Áp dụng Afilate</span>
                        </li>
                        <li>
                            <i class="fas fa-arrow-right me-2"></i>
                            <span>Đa ngôn ngữ</span>
                        </li>
                    </ul>
                    <i>Lưu ý với các ứng dụng trả phí bạn cần cài đặt và mua ứng dụng này trên App store Sapo để sử dụng ngay</i>
                </div>
            )}
        </div>
    );
}
