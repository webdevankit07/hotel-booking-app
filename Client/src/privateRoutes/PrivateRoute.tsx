import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const PrivateRoute = () => {
    const { isLoggedIn } = useAppContext();
    return isLoggedIn ? <Outlet /> : <Navigate to={'/sign-in'} />;
};

export default PrivateRoute;
