import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const AuthLayout = () => {
    return (
        <div className='flex flex-col min-h-screen bg-gradient-to-br from-slate-950 to-blue-950'>
            <Header />
            <div className='container flex-1 mx-auto max-w-7xl'>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
