import { AiFillStar } from 'react-icons/ai';
import { ResHotelType } from '../utils/Types';
import { Link } from 'react-router-dom';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const HotelCard = ({ hotel }: { hotel: ResHotelType }) => {
    return (
        <>
            <Card className='text-white transition-all duration-500 ease-in-out border-gray-600 shadow-lg hover:shadow-2xl bg-slate-900'>
                <CardHeader className='p-3'>
                    <Link to={`detail/${hotel._id}`}>
                        <img
                            className='object-cover w-full h-56 rounded-t-md'
                            src={hotel.imageUrls[Math.floor(Math.random() * 2)]}
                            alt='poster'
                        />
                    </Link>
                    <CardTitle className='pt-2'>
                        {hotel.name}
                        <span className='ml-2 text-xs font-medium text-gray-500 underline'>{hotel.city}</span>
                    </CardTitle>
                    <div className='flex gap-1'>
                        {Array.from({ length: hotel.starRating }).map(() => (
                            <AiFillStar className='fill-yellow-400' key={Math.random() * 1000000000000} />
                        ))}
                    </div>
                    <CardDescription className='text-gray-400 line-clamp-4'>{hotel.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <div className='flex items-center justify-between w-full '>
                        <p className='text-base font-bold'>₹{hotel.pricePerNight}</p>
                        <Link to={`detail/${hotel._id}`}>
                            <Button variant={'secondary'}>View Details</Button>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
};

export default HotelCard;
