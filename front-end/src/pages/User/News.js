import React, { useState, useEffect } from 'react'
import Crumb from '../../components/Crumb'
import { Helmet } from "react-helmet-async";
import newsApi from '../../api/newApi';
import { useNavigate } from "react-router-dom";

function News() {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await newsApi.getNews();
                setNews(response.data);
                console.log(news);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        fetchNews();
    }, []);

    const handleClick = (id) => {
        // Chuyển hướng đến trang chi tiết tin tức
        navigate(`/NewsDetails/${id}`);
    }
    return (
        <>
            <Helmet>
                <title>Tin tức</title>
            </Helmet>
            <Crumb
                name='Tin tức' />
            <div className='container'>
                <div className="row mt-4 ">
                    {news.map((item, index) => (
                        <div key={index} className="col-md-4 news" onClick={() => handleClick(item.NewsID)}>
                            <div className="image-hover1">
                                <img style={{ width: '438px', height: '239px' }}
                                    src={`http://127.0.0.1:8000/News/${item.Image}`} />
                            </div>
                            <p className="news-title" style={{ fontSize: '20px', fontWeight: '600', marginTop: '12px' }}>{item.Title}</p>
                            <p>{item.Content.length > 150 ? item.Content.slice(0, 150) + '...' : item.Content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default News