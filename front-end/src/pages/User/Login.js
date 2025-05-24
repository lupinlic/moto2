import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../../styles/login.css"
import Crumb from '../../components/Crumb'
import { Helmet } from "react-helmet-async";
import { useNavigate } from 'react-router-dom';
import authUser from '../../api/authUser';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");
    function HandleLogin(e) {
        e.preventDefault();
        const data = {
            email,
            password,
        }
        authUser.login(data)
            .then(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user_id', response.user.id);
                localStorage.setItem('role', response.user.role);
                HandleCheckRole(response.user.role)
                window.location.reload();
                // console.log(response.data.role)
            })
            .catch(error => {
                setError("Mật khẩu hoặc email không đúng!");
                console.error('Có lỗi khi đăng nhập ' + error + '-' + error.response.data.message)
            })

    }
    function HandleCheckRole(role) {
        if (role == 'user') {
            navigate('/');
        } else {
            navigate('/Admin');
        }
    }

    return (
        <div>
            <Helmet>
                <title>Đăng nhập</title>
            </Helmet>
            <Crumb
                name='Đăng nhập' />
            <div className="login-container">
                <div className="login-header">
                    <h1>Đăng nhập</h1>
                    <p>Chào mừng bạn đến với Dola Moto</p>
                </div>
                <form
                // onSubmit={handleLogin}
                >
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email"
                            //  value={user_email} 
                            onChange={(e) => (setEmail(e.target.value))}
                            name='user_email'
                            // onChange={(e) => setEmail(e.target.value)} 
                            className="form-control" id="email" placeholder="Nhập email của bạn" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mật khẩu</label>
                        <input type="password"
                            onChange={(e) => (setPassword(e.target.value))}
                            //  value={user_password} 
                            name='user_password'
                            // onChange={(e) => setPassword(e.target.value)} 
                            className="form-control" id="password" placeholder="Nhập mật khẩu của bạn" />
                    </div>
                    {error && <p className="error-message text-danger">{error}</p>}
                    <div className="d-flex justify-content-between">
                        <Link to="" className="forgot-password">Quên mật khẩu?</Link>
                    </div>
                    <button type="submit" className="btn btn-pink mt-3" style={{ backgroundColor: '#ec1a1a', color: '#fff' }}
                        // onClick={handleLogin}
                        onClick={(e) => { HandleLogin(e) }}
                    >Đăng nhập</button>
                </form>
                <div className="divider">hoặc</div>
                <div className="social-login">
                    <button className="btn btn-google mb-2" style={{ backgroundColor: '#db4437', color: '#fff' }}>Đăng nhập bằng Google</button>
                    <button className="btn btn-facebook" style={{ backgroundColor: '#4267B2', color: '#fff' }}>Đăng nhập bằng Facebook</button>
                </div>
                <div className="text-center mt-3">
                    <p>Bạn chưa có tài khoản? <Link to="/Register">Đăng ký</Link></p>
                </div>
            </div>

        </div>
    )
}

export default Login