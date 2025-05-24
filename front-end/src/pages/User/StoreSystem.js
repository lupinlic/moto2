import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Crumb from '../../components/Crumb'
import { Helmet } from "react-helmet-async";


function StoreSystem() {
    const mapContainerStyle = {
        width: "100%",
        height: "500px",
    };
    const defaultCenter = { lat: 10.7769, lng: 106.7009 }; // Mặc định ở HCM

    const stores = [
        { name: "Dola Sài Gòn", lat: 10.762622, lng: 106.660172 },
        { name: "Dola Bình Dương", lat: 10.980421, lng: 106.651933 },
    ];

    const [selectedLocation, setSelectedLocation] = useState(defaultCenter);

    const goToLocation = (lat, lng) => {
        setSelectedLocation({ lat, lng });
    };

    return (
        <div>
            <Helmet>
                <title>Hệ thống cửa hàng</title>
            </Helmet>
            <Crumb
                name='Hệ thống cửa hàng' />
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-3'>
                        <div className='system-info'>
                            <img style={{ width: '80px', height: '80px' }} src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/icon_hethong1.png?1741709416058' alt='' />
                            <div>
                                <p>Cửa hàng</p>
                                <p style={{ fontSize: '24px' }}>50+</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='system-info'>
                            <img style={{ width: '80px', height: '80px' }} src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/icon_hethong2.png?1741709416058' alt='' />
                            <div>
                                <p>Tỉnh thành</p>
                                <p style={{ fontSize: '24px' }}>30+</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='system-info'>
                            <img style={{ width: '80px', height: '80px' }} src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/icon_hethong3.png?1741709416058' alt='' />
                            <div>
                                <p>Văn phòng đại diện</p>
                                <p style={{ fontSize: '24px' }}>3</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='system-info'>
                            <img style={{ width: '80px', height: '80px' }} src='https://bizweb.dktcdn.net/100/519/812/themes/954445/assets/icon_hethong4.png?1741709416058' alt='' />
                            <div>
                                <p>Nhân sự</p>
                                <p style={{ fontSize: '24px' }}>500+</p>
                            </div>
                        </div>
                    </div>

                </div>
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                    <div className='row mt-3'>
                        <div className='col-md-4'>

                            {stores.map((store, index) => (
                                <div style={{ border: '1px solid #ddd', padding: '10px', marginTop: '12px', borderRadius: '5px' }}>
                                    <h6 style={{ color: '#d71920' }}>{store.name}</h6>
                                    <button
                                        style={{ padding: '5px', border: '1px solid yellow', borderRadius: '5px' }}
                                        key={index} onClick={() => goToLocation(store.lat, store.lng)}>
                                        Chỉ đường
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className='col-md-8'>
                            <GoogleMap mapContainerStyle={mapContainerStyle} center={selectedLocation} zoom={15}>
                                <Marker position={selectedLocation} />
                            </GoogleMap>
                        </div>
                    </div>
                </LoadScript>
            </div>
        </div>
    )
}

export default StoreSystem