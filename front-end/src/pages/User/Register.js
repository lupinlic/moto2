import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../../styles/register.css"
import Crumb from '../../components/Crumb'
import { Helmet } from "react-helmet-async";
import authUser from '../../api/authUser';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    function HandleRegister(e) {
        e.preventDefault();
        const data = {
            name,
            email,
            password,
        }
        authUser.register(data)
            .then(response => {
                alert('chúc mừng bạn đã đăng ký thành công');
                setName();
                setEmail();
                setPassword();
                navigate('/Login');
            })
            .catch(error => {
                console.error('Có lỗi khi đăng ký ' + error + '-' + error.response.data.message)
            })
    }
    return (
        <div>
            <Helmet>
                <title>Đăng ký</title>
            </Helmet>
            <Crumb
                name='Đăng ký' />
            <div className="register-container">
                <div className="register-header">
                    <h1>Đăng ký</h1>
                    <p>Tạo tài khoản mới tại Dola Moto</p>
                </div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Tên đăng nhập</label>
                        <input type="text" className="form-control" id="name" placeholder="Nhập họ và tên của bạn"
                            onChange={(e) => (setName(e.target.value))}
                        // value={user_name}
                        // onChange={(e)=>setuser_name(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Nhập email của bạn"
                            onChange={(e) => (setEmail(e.target.value))}
                        // value={user_email}
                        // onChange={(e)=>setuser_email(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mật khẩu</label>
                        <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu"
                            onChange={(e) => (setPassword(e.target.value))}
                        // value={user_password}
                        // onChange={(e)=>setuser_password(e.target.value)}
                        />
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="confirm-password" className="form-label">Xác nhận mật khẩu</label>
                        <input type="password" className="form-control" id="confirm-password" placeholder="Nhập lại mật khẩu"
                        // value={reUser_password}
                        // onChange={(e)=>setreUser_password(e.target.value)}
                        />
                    </div> */}
                    <button type="submit" className="btn btn-pink mt-3" style={{ backgroundColor: '#e51414', color: '#fff' }}
                        onClick={(e) => HandleRegister(e)}
                    >Đăng ký</button>
                </form>
                <div className="divider">hoặc</div>
                <div className="social-register">
                    <button className="btn btn-google mb-2" style={{ backgroundColor: '#db4437', color: '#fff' }}>Đăng ký bằng Google</button>
                    <button className="btn btn-facebook" style={{ backgroundColor: '#4267B2', color: '#fff' }}>Đăng ký bằng Facebook</button>
                </div>
                <div className="text-center mt-3">
                    <p>Bạn đã có tài khoản? <Link to="/Login">Đăng nhập</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register