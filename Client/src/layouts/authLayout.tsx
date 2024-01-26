import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const AuthLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='container flex-1 mx-auto'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default AuthLayout;
