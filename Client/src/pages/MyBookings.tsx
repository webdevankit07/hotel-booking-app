import { useQuery } from '@tanstack/react-query';
import { fetchMyBookings } from '../api/apiClient';

const MyBookings = () => {
    const { data: hotels } = useQuery({ queryKey: ['fetchMyBookings'], queryFn: fetchMyBookings });

    if (!hotels || hotels.length === 0) {
        return <span>No bookings found</span>;
    }
    return (
        <div className='my-10 space-y-5'>
            <h1 className='text-3xl font-bold text-center underline'>My Bookings</h1>
            {hotels.map((hotel) => (
                <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5 shadow-lg'>
                    <div className='lg:w-full lg:h-[250px]'>
                        <img src={hotel.imageUrls[0]} className='object-cover object-center w-full h-full' />
                    </div>
                    <div className='flex flex-col gap-4 overflow-y-auto max-h-[300px]'>
                        <div className='text-2xl font-bold'>
                            {hotel.name}
                            <div className='text-xs font-normal'>
                                {hotel.city}, {hotel.country}
                            </div>
                        </div>
                        {hotel.bookings.map((booking) => (
                            <div>
                                <div>
                                    <span className='mr-2 font-bold'>Dates: </span>
                                    <span>
                                        {new Date(booking.checkIn).toDateString()} -{' '}
                                        {new Date(booking.checkOut).toDateString()}
                                    </span>
                                </div>
                                <div>
                                    <span className='mr-2 font-bold'>Guests:</span>
                                    <span>
                                        {booking.adultCount} adults, {booking.childCount} children
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyBookings;
