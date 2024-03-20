import { useQuery } from '@tanstack/react-query';
import { getAllHotels } from '../api/apiClient';
import HotelCard from '../components/HotelCard';

const Home = () => {
    const { data: hotels } = useQuery({ queryKey: ['RecentHotels'], queryFn: getAllHotels });
    return (
        <div className='px-1'>
            <h1 className='text-2xl font-bold text-center text-gray-300 underline'>Recent Hotels</h1>
            <div className='grid grid-cols-1 gap-2 px-2 my-10 md:grid-cols-2 lg:grid-cols-3 sm:gap-3 md:gap-4'>
                {hotels && hotels.map((hotel) => <HotelCard hotel={hotel} key={hotel._id} />)}
            </div>
        </div>
    );
};

export default Home;
