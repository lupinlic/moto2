import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import orderApi from '../../api/orderApi';
import cartApi from '../../api/cartApi';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

function Thanks() {
    const location = useLocation();
    const { fetchCartCount } = useContext(CartContext);
    const hasOrdered = useRef(false);
    useEffect(() => {

        const queryParams = new URLSearchParams(location.search);
        const extraDataEncoded = queryParams.get("extraData");
        const resultCode = queryParams.get("resultCode");

        if (resultCode === "0" && extraDataEncoded) {
            hasOrdered.current = true;
            const extraData = JSON.parse(decodeURIComponent(extraDataEncoded));
            const payload = extraData.payload;
            const cartid = extraData.cartid;
            console.log("Payload:", payload);
            console.log("Cart ID:", cartid);

            const createOrder = async () => {
                try {
                    const res = await orderApi.addOrder(payload);
                    console.log("Đặt hàng thành công:", payload);
                    sendEmailNotification(payload);
                    await Promise.all(
                        cartid?.map(item =>
                            item ? cartApi.removetocart(item) : null
                        )
                    );
                    fetchCartCount();

                } catch (err) {
                    console.error("Tạo đơn hàng thất bại:", err);
                }
            };

            createOrder();

        }
    }, [location.search]);

    const sendEmailNotification = async (payload) => {
        const paymentMethod = "momo";
        const emailContent = "";

        try {
            const response = await fetch('http://127.0.0.1:8000/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethod: paymentMethod,
                    emailContent: emailContent,
                    customerEmail: payload.customerEmail,
                    orderDetails: payload.orderDetails.map(item => ({
                        ProductName: item.ProductName,
                        Quantity: item.Quantity,
                        Price: item.Price,
                    })),
                    orderId: payload.orderId,
                    totalPrice: payload.totalPrice,
                    shippingAddress: payload.shippingAddress,
                    customerName: payload.customerName,
                    customerPhone: payload.customerPhone,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            console.log('Email đã được gửi thành công');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div className='d-flex align-items-center justify-content-center'>
            <img style={{ width: '500px' }} src='https://www.peeps-hie.org/wp-content/uploads/2020/10/Thank-you-tiny-914x1024.jpg' alt='' />
        </div>
    )
}

export default Thanks