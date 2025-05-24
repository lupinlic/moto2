import React, { useState, useEffect } from 'react';
import authUser from '../../../api/authUser';

const AccountForm = ({ userId, onUpdate, onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        if (userId) {
            authUser.get_user(userId)
                .then((response) => {
                    const data = response.data;
                    setUsername(data.name);
                    setEmail(data.email);
                    setRole(data.role);
                })
                .catch((error) => {
                    console.error('Có lỗi khi lấy thông tin tài khoản:', error);
                });
        } else {
            // reset khi không phải edit
            setUsername('');
            setEmail('');
            setRole('');
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const useredit = {
            name: username,
            email: email,
            role: role
        };
        const useradd = {
            name: username,
            email: email,
            password: password,
            role: role
        };
        try {
            if (userId) {
                // Sửa tài khoản
                await authUser.update_user(userId, useredit);

            } else {
                // Thêm tài khoản
                await authUser.add_user(useradd);

            }

            onUpdate(); // reload danh sách hoặc đóng form
            onClose();
        } catch (err) {
            console.error(err);
            alert('Có lỗi xảy ra khi lưu tài khoản.');
        }
    }
    return (
        <div>
            <div className="form-popup111">
                <form className="form-container" onSubmit={handleSubmit}>
                    <h4 className='mt-3'>Thông tin tài khoản</h4>
                    <div>
                        <label className="name">Username</label>
                        <input
                            type="text"
                            placeholder="Nhập tên"
                            name="user_name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="name">Email</label>
                        <input
                            type="text"
                            placeholder="Nhập email"
                            name="user_email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {!userId ? (
                        <div>
                            <label className="name">Password</label>
                            <input
                                type="text"
                                placeholder="Nhập email"
                                name="user_email"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    ) : (<></>)

                    }

                    <div>
                        <label className="name">Role</label>
                        <input
                            type="text"
                            placeholder="Nhập quyền"
                            name="user_password"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
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

export default AccountForm