import React, { useState, useEffect } from 'react';
import feedbackApi from '../../../api/feedbackApi'

const FeedbackForm = ({ feedbackID, onUpdate, onClose }) => {
    const [feedback, setFeedBack] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            Feedback: feedback,
        };
        try {

            await feedbackApi.updatefeedback(feedbackID, data);
            onUpdate(); // reload danh sách hoặc đóng form
            onClose();
        } catch (err) {
            console.error(err);
            alert('Có lỗi xảy ra khi lưu ');
        }
    }
    return (
        <div>
            <div className="form-popup111">
                <form className="form-container" onSubmit={handleSubmit}>
                    <h4 className='mt-3'>Thông tin tài khoản</h4>
                    <div>
                        <label className="name">Nội dung</label>
                        <input
                            type="text"
                            placeholder="Nhập nội dung phản hồi"
                            name="feedback"
                            value={feedback}
                            onChange={(e) => setFeedBack(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-bt'>
                        <button type="submit" className="btn btn-primary">Lưu</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FeedbackForm