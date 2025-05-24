import React, { useState, useEffect } from 'react';
import feedbackApi from '../../../api/feedbackApi'

function Feedback() {
    const [feedback, setFeedback] = useState([]);
    const fetchFeedback = async () => {
        try {
            const response = await feedbackApi.getfeedback();
            setFeedback(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Có lỗi khi lấy danh sách tài khoản:', error);
        }
    };
    useEffect(() => {
        fetchFeedback();
    }, []);
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingLeft: '4px' }}>
            <div className='container pt-4'>
                <h5>Danh sách phản hồi</h5>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Khách hàng</th>
                            <th>Nội dung</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedback?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.customer.FullName}</td>
                                <td>{item.Content}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Feedback