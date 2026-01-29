import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

export const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login but save the current location to return to after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        // If user doesn't have the right role, send to their respective dashboard
        const dashboardMap = {
            customer: '/customer/dashboard',
            worker: '/worker/dashboard',
            admin: '/admin/dashboard',
        };
        return <Navigate to={dashboardMap[user?.role] || '/'} replace />;
    }

    return children;
};
