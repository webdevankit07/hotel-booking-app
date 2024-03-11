import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const PrivateAuthRoute = () => {
    const { isLoggedIn } = useAppContext();

    return isLoggedIn ? <Navigate to={'/'} /> : <Outlet />;
};

export default PrivateAuthRoute;
