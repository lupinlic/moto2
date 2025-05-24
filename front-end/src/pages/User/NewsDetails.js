import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import Crumb from '../../components/Crumb'
import { useParams } from 'react-router-dom';
import newsApi from '../../api/newApi';

function NewsDetails() {
    const [news, setNews] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await newsApi.getNewsbyID(id);
                setNews(response.data);
                console.log(news);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        fetchNews();
    }, [id]);
    return (
        <div>
            <Crumb
                name='Tin tức' />
            <div className='container'>
                <h4 className=' mt-4'>{news.Title}</h4>
                <p style={{ whiteSpace: 'pre-line', marginTop: '20px' }}>
                    {news.Content}
                </p>
            </div>
        </div>
    )
}

export default NewsDetails