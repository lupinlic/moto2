import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const role = localStorage.getItem('role');
    const location = useLocation();

    const isLoggedIn = !!role;
    const isAdminRoute = location.pathname.startsWith('/Admin');
    const isAdmin = role === 'admin';

    if (!isLoggedIn) {
        return <Navigate to="/Login" replace />;
    }

    // Nếu là đường dẫn admin mà không phải admin => văng về trang chính
    if (isAdminRoute && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
