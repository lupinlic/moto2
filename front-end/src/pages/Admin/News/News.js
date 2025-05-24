import React, { useState, useEffect } from 'react';
import newApi from '../../../api/newApi'

function News() {
    const [news, setNews] = useState([]);
    const fetchNews = async () => {
        try {
            const response = await newApi.getNews();
            setNews(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Có lỗi khi lấy danh sách tài khoản:', error);
        }
    };
    useEffect(() => {
        fetchNews();
    }, []);
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingLeft: '4px' }}>
            <div className='container pt-4'>
                <button type="button" class="btn btn-success ">Thêm</button>
                <h5>Danh sách tin tức</h5>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tiêu đề</th>
                            <th>Nội dung</th>
                            <th>Ảnh</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {news?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.Title}</td>
                                <td>{item.Content.length > 150 ? item.Content.slice(0, 150) + '...' : item.Content}</td>
                                <td>
                                    <img src={`http://127.0.0.1:8000/News/${item.Image}`}
                                        alt="Product" style={{ width: '50px', height: '50px' }} />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm mr-2"


                                    >
                                        Sửa
                                    </button>
                                    <button
                                        style={{ marginLeft: '8px' }}
                                        className="btn btn-danger btn-sm"

                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default News