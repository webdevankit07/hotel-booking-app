import { BsBuilding, BsMap } from 'react-icons/bs';
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getMyHotels } from '../api/apiClient';
import { Button } from '../components/ui/button';

const MyHotels = () => {
    const { data: hotelData } = useQuery({
        queryKey: ['fetchMyHotels'],
        queryFn: getMyHotels,
        placeholderData: keepPreviousData,
    });

    if (!hotelData) {
        return <span>No Hotels found</span>;
    }

    return (
        <div className='my-16 space-y-10'>
            <span className='flex items-center justify-between px-4'>
                <h1 className='text-3xl font-bold text-gray-300'>All Listed Hotels</h1>
                <Link to='/add-hotel'>
                    <Button variant={'secondary'}>Add Hotel</Button>
                </Link>
            </span>
            <div className='grid grid-cols-1 gap-8'>
                {hotelData.map((hotel) => (
                    <div
                        data-testid='hotel-card'
                        className='flex flex-col justify-between gap-5 p-8 text-gray-300 border rounded-lg bg-slate-950 border-slate-300'
                        key={hotel._id}
                    >
                        <h2 className='text-2xl font-bold'>{hotel.name}</h2>
                        <div className='whitespace-pre-line line-clamp-6 md:line-clamp-none'>{hotel.description}</div>
                        <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                            <div className='flex items-center p-3 border rounded-sm border-slate-300'>
                                <BsMap className='mr-1' />
                                {hotel.city}, {hotel.country}
                            </div>
                            <div className='flex items-center p-2 border rounded-sm md:p-3 border-slate-300'>
                                <BsBuilding className='mr-1' />
                                {hotel.type}
                            </div>
                            <div className='flex items-center p-3 border rounded-sm border-slate-300'>
                                <BiMoney className='mr-1' />₹{hotel.pricePerNight} per night
                            </div>
                            <div className='flex items-center p-3 border rounded-sm border-slate-300'>
                                <BiHotel className='mr-1' />
                                {hotel.adultCount} adults, {hotel.childCount} children
                            </div>
                            <div className='flex items-center p-3 border rounded-sm border-slate-300'>
                                <BiStar className='mr-1' />
                                {hotel.starRating} Star Rating
                            </div>
                        </div>
                        <span className='flex justify-end'>
                            <Link to={`/edit-hotel/${hotel._id}`}>
                                <Button variant={'secondary'} className='text-white bg-blue-500'>
                                    View Details
                                </Button>
                            </Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyHotels;
