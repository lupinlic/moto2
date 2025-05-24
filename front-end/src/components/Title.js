import React from 'react'

const Title = ({ titleName, titleDes }) => {
    return (
        <div className='text-center mt-5 title'>
            <p style={{ fontSize: '40px', fontWeight: '600' }}>
                <span className='title-name me-2'>{titleName}</span>
                <span style={{ color: 'red' }}>{titleDes}</span>
            </p>
        </div>
    )
}

export default Title