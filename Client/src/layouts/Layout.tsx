import Header from '../components/Header';
import Hero from '../components/Hero';

const Layout = () => {
    return (
        <div className='flex-col min-h-screen flex-'>
            <Header />
            <Hero />
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
