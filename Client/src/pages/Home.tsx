import { useQuery } from '@tanstack/react-query';
import { getAllHotels } from '../api/apiClient';
import HotelCard from '../components/HotelCard';

const Home = () => {
    const { data: hotels } = useQuery({ queryKey: ['RecentHotels'], queryFn: getAllHotels });
    return (
        <div className='px-1'>
            <h1 className='text-2xl font-bold text-center underline '>Top Hotels</h1>
            <div className='flex flex-wrap items-center justify-center gap-2 my-10 sm:gap-3 md:gap-4 lg:gap-6'>
                {hotels && hotels.map((hotel) => <HotelCard hotel={hotel} key={hotel._id} />)}
            </div>
        </div>
    );
};

export default Home;
