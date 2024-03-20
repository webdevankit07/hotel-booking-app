import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Layout = () => {
    return (
        <div className='flex flex-col min-h-screen bg-gradient-to-br from-slate-950 to-blue-950'>
            <Header />
            <div className='container flex-1 mx-auto max-w-7xl'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
