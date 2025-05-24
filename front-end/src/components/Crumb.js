import React from 'react'

const Crumb = ({ name }) => {
    return (
        <div className='container-fluid ' style={{ background: '#F1F1F1', height: '50px' }}>
            <div className='container d-flex align-items-center h-100' >
                <span>Trang chủ</span>
                <span style={{ marginLeft: '8px' }}>/</span>
                <span style={{ color: 'red', marginLeft: '8px' }}>{name}</span>
            </div>

        </div>
    )
}

export default Crumb