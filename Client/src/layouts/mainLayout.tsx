import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <Hero />
            <div className='flex-1'>
                <div className='container mx-auto max-w-7xl'>
                    <div className='mb-10'>
                        <SearchBar />
                    </div>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
