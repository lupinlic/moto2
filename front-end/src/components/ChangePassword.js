import React, { useState } from "react";
import authUser from "../api/authUser";


const ChangePassword = () => {
    const userId = localStorage.getItem('user_id');
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const data = {
        id: userId,
        current_password: oldPassword,
        new_password: newPassword,
    }
    const handleSubmit = (e) => {
        console.log(data)
        e.preventDefault();
        if (newPassword.length < 8) {
            setError("Mật khẩu mới phải có ít nhất 8 ký tự.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp.");
            return;
        }
        setError("");
        alert("Mật khẩu đã được thay đổi thành công!");
        try {
            authUser.changepass(data)
            // Optional: reset form
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            setError("Lỗi khi đổi mật khẩu.");
        }

    };
    return (
        <div className="change-password-container">
            <h4 className="title">ĐỔI MẬT KHẨU</h4>
            <p className="description">
                Để đảm bảo tính bảo mật, vui lòng đặt lại mật khẩu với ít nhất 8 ký tự.
            </p>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="oldPassword d-flex flex-column">
                    <label>Mật khẩu cũ *</label>
                    <input

                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="oldPassword d-flex flex-column">
                    <label>Mật khẩu mới *</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="oldPassword d-flex flex-column">
                    <label>Xác nhận lại mật khẩu *</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="submit-button">
                    ĐẶT LẠI MẬT KHẨU
                </button>
            </form>

            <style jsx>{`
            .oldPassword input{
                width: 300px;
    border-radius: 4px;
    height: 40px;
    font-size: 15px;
    border: 1px solid #e6e6e6;
    border-bottom: 2px solid #d71920;
    padding: 1px 10px;
    margin-bottom: 10px;
    outline: none;
            }
            .submit-button{
                padding: 0 15px;
    border-radius: 3px !important;
    height: 40px;
    line-height: 40px;
    background: #d71920;
    position: relative;
    margin-left: 0px;
    color: #fff;
    border: solid 1px transparent;
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 10px;
            }
            .submit-button:hover{
                background:#ffb42e;
            }
                
      `}</style>
        </div>
    )
}

export default ChangePassword