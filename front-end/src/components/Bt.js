import React from 'react'
import { useNavigate } from "react-router-dom";

const Bt = ({ name, des }) => {
    const navigate = useNavigate();
    const handleToProduct = (des) => {
        navigate(`/${des}`);
    };

    return (
        <div
            onClick={() => handleToProduct(des)}
            className="bt d-flex align-items-center justify-content-center" style={{ borderRadius: '20px', padding: '8px', background: '#fff', color: 'red' }}>
            <p className='m-0'>{name}</p>
        </div>
    )
}

export default Bt