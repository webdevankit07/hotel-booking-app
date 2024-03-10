import { BsBuilding, BsMap } from 'react-icons/bs';
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getMyHotels } from '../api/apiClient';

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
        <div className='my-10 space-y-10'>
            <span className='flex justify-between'>
                <h1 className='text-3xl font-bold'>My Hotels</h1>
                <Link
                    to='/add-hotel'
                    className='flex p-2 text-xl font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500'
                >
                    Add Hotel
                </Link>
            </span>
            <div className='grid grid-cols-1 gap-8'>
                {hotelData.map((hotel) => (
                    <div
                        data-testid='hotel-card'
                        className='flex flex-col justify-between gap-5 p-8 border rounded-lg border-slate-300'
                        key={hotel._id}
                    >
                        <h2 className='text-2xl font-bold'>{hotel.name}</h2>
                        <div className='whitespace-pre-line'>{hotel.description}</div>
                        <div className='grid grid-cols-5 gap-2'>
                            <div className='flex items-center p-3 border rounded-sm border-slate-300'>
                                <BsMap className='mr-1' />
                                {hotel.city}, {hotel.country}
                            </div>
                            <div className='flex items-center p-3 border rounded-sm border-slate-300'>
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
                            <Link
                                to={`/edit-hotel/${hotel._id}`}
                                className='flex p-2 text-xl font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500'
                            >
                                View Details
                            </Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyHotels;
