import { ResHotelType } from '../utils/Types';

type Props = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    numberOfNights: number;
    hotel: ResHotelType | undefined;
};

const BookingDetailsSummary = ({ checkIn, checkOut, adultCount, childCount, numberOfNights, hotel }: Props) => {
    return (
        <div className='grid gap-4 p-5 text-gray-300 border rounded-lg border-slate-300 h-fit bg-slate-950'>
            <h2 className='text-xl font-bold'>Your Booking Details</h2>
            <div className='py-2 border-b'>
                Location:
                <div className='font-bold'>{`${hotel?.name}, ${hotel?.city}, ${hotel?.country}`}</div>
            </div>
            <div className='flex justify-between'>
                <div>
                    Check-in
                    <div className='font-bold'>{checkIn.toDateString()}</div>
                </div>
                <div>
                    Check-out
                    <div className='font-bold'>{checkOut.toDateString()}</div>
                </div>
            </div>
            <div className='py-2 border-t border-b'>
                Total length of stay:
                <div className='font-bold'>{numberOfNights} nights</div>
            </div>

            <div>
                Guests
                <div className='font-bold'>
                    {adultCount} adults & {childCount} children
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsSummary;
