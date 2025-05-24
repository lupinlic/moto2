import Header from "./Header";
import Footer from "./Footer";
import NotificationBell from "../../components/NotificationBell";
import ContactIcon from "../../components/ContactIcon";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import LoadingOverlay from "../../components/LoadingOverlay";

function User({ children }) {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        // Giả lập delay load trang
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800); // thời gian chờ khi chuyển trang

        return () => clearTimeout(timer);
    }, [location]);
    return (

        <div >
            {loading && <LoadingOverlay />}
            <NotificationBell />
            <ContactIcon />
            <Header />
            <div className="">{children}
            </div>
            <Footer />
        </div>
    );
}
export default User;