import { useQuery } from '@tanstack/react-query';
import { fetchMyBookings } from '../api/apiClient';

const MyBookings = () => {
    const { data: hotels } = useQuery({ queryKey: ['fetchMyBookings'], queryFn: fetchMyBookings });

    if (!hotels || hotels.length === 0) {
        return <span>No bookings found</span>;
    }
    return (
        <div className='my-10 space-y-5 md:my-16'>
            <h1 className='max-w-xl p-2 mx-auto mb-10 text-2xl font-bold text-center text-white border rounded-md bg-gradient-to-br to-slate-900 from-blue-950'>
                Your Booking List
            </h1>
            {hotels.map((hotel) => (
                <div
                    key={hotel._id}
                    className='grid grid-cols-1 lg:grid-cols-[1fr_3fr]  bg-slate-950 text-white border-2 border-slate-300 rounded-lg p-2 md:p-4 gap-5 shadow-lg'
                >
                    <div className='lg:w-full lg:h-[250px]'>
                        <img src={hotel.imageUrls[0]} className='object-cover object-center w-full h-full' />
                    </div>
                    <div className='flex flex-col gap-4 overflow-y-auto max-h-[300px] p-2'>
                        <div className='text-2xl font-bold'>
                            {hotel.name}
                            <div className='text-xs font-normal'>
                                {hotel.city}, {hotel.country}
                            </div>
                        </div>
                        {hotel.bookings.map((booking) => (
                            <div key={booking._id} className='p-2 bg-gray-800 border rounded-md'>
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
