import { AiFillStar } from 'react-icons/ai';
import { ResHotelType } from '../utils/Types';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }: { hotel: ResHotelType }) => {
    return (
        <div className='w-full p-2 overflow-hidden transition-all duration-500 ease-in-out bg-white border-2 rounded-lg shadow-lg hover:scale-105'>
            <Link to={`detail/${hotel._id}`}>
                <img
                    className='object-cover w-full h-56'
                    src={hotel.imageUrls[Math.floor(Math.random() * 2)]}
                    alt='poster'
                />
            </Link>

            <div className='py-5 space-y-2'>
                <div className='flex items-center gap-2 text-xs'>
                    <Link to={`detail/${hotel._id}`} className='block text-xl font-bold text-gray-800 '>
                        {hotel.name}
                    </Link>
                    <span className='text-gray-600 underline'>{hotel.city}</span>
                </div>
                <div className='flex gap-1'>
                    {Array.from({ length: hotel.starRating }).map(() => (
                        <AiFillStar className='fill-yellow-400' key={Math.random() * 1000000000000} />
                    ))}
                </div>
                <p className='text-sm text-gray-700 line-clamp-4'>{hotel.description}</p>
                <div className='flex items-center justify-between'>
                    <p className='text-base font-bold'>₹{hotel.pricePerNight}</p>
                    <Link to={`detail/${hotel._id}`}>
                        <button className='px-3 py-2 font-semibold text-white bg-blue-500 rounded-md'>
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
