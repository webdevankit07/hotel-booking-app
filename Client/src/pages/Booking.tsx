import { useQuery } from '@tanstack/react-query';
import { createPaymentIntent, fetchHotelById, getCurrentUser } from '../api/apiClient';
import { useParams } from 'react-router-dom';
import { UseSearchContext } from '../contexts/SearchContext';
import BookingForm from '../components/BookingForm';
import BookingDetailsSummary from '../components/BookingDetailsSummary';
import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { useAppContext } from '../contexts/AppContext';

const Booking = () => {
    const [numberOfNights, setNumberOfNights] = useState<number>(0);
    const { stripePromise } = useAppContext();
    const search = UseSearchContext();
    const { hotelId } = useParams();

    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);
            setNumberOfNights(Math.ceil(nights));
        }
    }, [search.checkIn, search.checkOut]);

    const { data: hotel } = useQuery({
        queryKey: ['fetchHotelByID', hotelId],
        queryFn: () => fetchHotelById(hotelId as string),
        enabled: !!hotelId,
    });

    const { data: paymentIntentData } = useQuery({
        queryKey: ['createPaymentIntent'],
        queryFn: () => createPaymentIntent(hotelId as string, numberOfNights.toString()),
        enabled: !!hotelId && numberOfNights > 0,
    });

    const { data: currentUser } = useQuery({ queryKey: ['currentUser'], queryFn: getCurrentUser });

    return (
        <div className='grid md:grid-cols-[1fr_2fr] my-10 gap-5'>
            <BookingDetailsSummary
                checkIn={search.checkIn}
                checkOut={search.checkOut}
                adultCount={search.adultCount}
                childCount={search.childCount}
                numberOfNights={numberOfNights}
                hotel={hotel}
            />
            {currentUser && paymentIntentData && (
                <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret: paymentIntentData.clientSecret,
                    }}
                >
                    <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
                </Elements>
            )}
        </div>
    );
};

export default Booking;
