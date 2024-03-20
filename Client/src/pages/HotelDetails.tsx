import { useParams } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { fetchHotelById } from '../api/apiClient';
import GuestInfoForm from '../components/GuestInfoForm';

const HotelDetails = () => {
    const { hotelId } = useParams();

    const { data: hotel } = useQuery({
        queryKey: ['fetchHotelById', hotelId],
        queryFn: () => fetchHotelById(hotelId || ''),
        enabled: !!hotelId,
    });

    if (!hotel) {
        return <div className='text-gray-300'>No Hotel Found!</div>;
    }
    return (
        <div className='my-20 space-y-6'>
            <div>
                <span className='flex'>
                    {Array.from({ length: hotel.starRating }).map(() => (
                        <AiFillStar className='fill-yellow-400' key={Math.random() * 100000000000} />
                    ))}
                </span>
                <h1 className='text-3xl font-bold text-gray-300'>{hotel.name}</h1>
            </div>

            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
                {hotel.imageUrls.map((image, i) => (
                    <div className='h-[300px]' key={i}>
                        <img
                            src={image}
                            alt={hotel.name}
                            className='object-cover object-center w-full h-full rounded-md'
                        />
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4'>
                {hotel.facilities.map((facility, i) => (
                    <div className='p-3 text-gray-300 border rounded-sm border-slate-300 bg-slate-950' key={i}>
                        {facility}
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10'>
                <div className='text-gray-300 whitespace-pre-line'>{hotel.description}</div>
                <div className='h-fit'>
                    <GuestInfoForm pricePerNight={hotel.pricePerNight} hotelId={hotel._id} />
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;
