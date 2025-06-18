import React, { useState, useEffect } from 'react';
import newApi from '../../../api/newApi'

function News() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [news, setNews] = useState([]);
    const fetchNews = async () => {
        try {
            const response = await newApi.getNews();
            setNews(response.data);
            console.log(response.data);
            if (!searchTerm.trim()) {
                setFiltered(response.data);
            }
        } catch (error) {
            console.error('Có lỗi khi lấy danh sách tài khoản:', error);
        }
    };
    const handleSearch = () => {
        const lowerSearch = searchTerm.toLowerCase();
        const result = news.filter(u =>
            u.Title.toLowerCase().includes(lowerSearch)
        );
        setFiltered(result);
    };

    const handleShowAll = () => {
        setSearchTerm('');
        setFiltered(news);
    };
    useEffect(() => {
        fetchNews();
    }, []);
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingLeft: '4px' }}>
            <div className=''>
                <div className="container supplier pt-3 d-flex justify-content-between align-items-center mb-3">
                    <button type="button" class="btn btn-success " >Thêm</button>

                    <div className="d-flex align-items-center justify-content-between" style={{ height: '50px' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập từ khóa tìm kiếm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>Tìm</button>
                        <button className="btn btn-secondary" onClick={handleShowAll} style={{ width: '100px' }}>Tất cả</button>
                    </div>
                </div>
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
                        {filtered?.map((item, index) => (
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