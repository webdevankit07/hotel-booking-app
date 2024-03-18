import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Layout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='container flex-1 mx-auto max-w-7xl'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
