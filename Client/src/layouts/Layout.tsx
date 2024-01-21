import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ScrollToTop from '../components/ScrollToTop';

const Layout = () => {
    return (
        <div className='flex-col min-h-screen flex-'>
            <ScrollToTop />
            <Header />
            <div className='min-h-screen'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
