import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';

const Home = () => {
    return (
        <>
            <Hero />
            <div className='container mx-auto'>
                <SearchBar />
            </div>
        </>
    );
};

export default Home;
