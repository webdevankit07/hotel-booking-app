import { AiFillStar } from 'react-icons/ai';
import { ResHotelType } from '../utils/Types';
import { Link } from 'react-router-dom';

const SearchResultsCard = ({ hotel }: { hotel: ResHotelType }) => {
    return (
        <div className='grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-6   gap-8'>
            <div className='w-full h-[300px]'>
                <img src={hotel.imageUrls[0]} className='object-cover object-center w-full h-full' />
            </div>
            <div className='grid grid-rows-[1fr_2fr_1fr]'>
                <div>
                    <div className='flex items-center'>
                        <span className='flex'>
                            {Array.from({ length: hotel.starRating }).map(() => (
                                <AiFillStar className='fill-yellow-400' key={Math.random() * 1000000000000} />
                            ))}
                        </span>
                        <span className='ml-1 text-sm'>{hotel.type}</span>
                    </div>
                    <Link to={`/detail/${hotel._id}`} className='text-2xl font-bold cursor-pointer'>
                        {hotel.name}
                    </Link>
                </div>

                <div>
                    <div className='line-clamp-4'>{hotel.description}</div>
                </div>

                <div className='grid items-end grid-cols-2 whitespace-nowrap'>
                    <div className='flex flex-wrap items-center flex-1 gap-1'>
                        {hotel.facilities.slice(0, 3).map((facility, i) => (
                            <span className='p-2 text-xs font-bold rounded-lg bg-slate-300 whitespace-nowrap' key={i}>
                                {facility}
                            </span>
                        ))}
                        <span className='text-sm'>
                            {hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}
                        </span>
                    </div>
                    <div className='flex flex-col items-end gap-1'>
                        <span className='font-bold'>₹{hotel.pricePerNight} per night</span>
                        <Link
                            to={`/detail/${hotel._id}`}
                            className='h-full p-2 text-base font-bold text-white bg-blue-600 rounded-md md:text-xl max-w-fit hover:bg-blue-500'
                        >
                            View More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultsCard;
