import React, { useState, useEffect } from 'react';
import feedbackApi from '../../../api/feedbackApi'
import FeedbackForm from './FeedbackForm';

function Feedback() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const openForm = (feedbackId = null) => {
        setSelectedId(feedbackId);
        setIsFormVisible(true);
    };

    // Đóng form
    const closeForm = () => {
        setIsFormVisible(false);
    };
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
                            <th>Phản hồi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedback?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.customer.FullName}</td>
                                <td>{item.Content}</td>
                                <td>{item.Feedback}</td>
                                <td>
                                    {item.Feedback === 'Chưa trả lời'
                                        ? <button className="btn btn-warning btn-sm mr-2" onClick={() => openForm(item.FeedbackID)}>Trả lời</button>
                                        : ''}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            {isFormVisible && (
                <>
                    <div className="overLay"></div> {/* Lớp overlay */}
                    <FeedbackForm
                        feedbackID={selectedId}
                        onUpdate={fetchFeedback}
                        onClose={closeForm} /> {/* Form */}
                </>
            )}
        </div>
    )
}

export default Feedback