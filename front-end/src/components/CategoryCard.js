import React from 'react'

const CategoryCard = ({ imgUrl, categoryName }) => {
    return (
        <div className="bike-card">
            <div className="bike-card-img">
                <img src={imgUrl} alt={categoryName} className="img-fluid" />
            </div>
            <div className="bike-card-body">
                <div className="bike-card-arrow">
                    <i class="fas fa-arrow-right arrow-icon"></i>
                </div>
                <p className="bike-card-title">{categoryName}</p>
            </div>
        </div>
    )
}

export default CategoryCard