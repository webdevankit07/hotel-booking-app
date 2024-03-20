import { useForm } from 'react-hook-form';
import { BookingFormData, PaymentIntentResponse, currentUserType } from '../utils/Types';
import { UseSearchContext } from '../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { useMutation } from '@tanstack/react-query';
import { createRoomBooking } from '../api/apiClient';
import { useAppContext } from '../contexts/AppContext';

type Props = {
    currentUser: currentUserType;
    paymentIntent: PaymentIntentResponse;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const { showToast } = useAppContext();
    const search = UseSearchContext();
    const { hotelId } = useParams();

    const { mutate: bookRoom, isPending } = useMutation({
        mutationFn: createRoomBooking,
        onSuccess: () => {
            showToast({ message: 'Booking Saved!', type: 'SUCCESS' });
        },
        onError: (err) => {
            console.log(err.message);
            showToast({ message: err.message, type: 'ERROR' });
        },
    });

    const { handleSubmit, register } = useForm<BookingFormData>({
        defaultValues: {
            fullName: currentUser.fullName,
            email: currentUser.email,
            adultCount: search.adultCount,
            childCount: search.childCount,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            hotelId: hotelId,
            totalCost: paymentIntent.totalCost,
            paymentIntentId: paymentIntent.paymentIntentId,
        },
    });

    const onSubmit = async (formData: BookingFormData) => {
        if (!stripe || !elements) {
            return;
        }
        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) as StripeCardElement,
            },
        });

        if (result.paymentIntent?.status === 'succeeded') {
            bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='grid grid-cols-1 gap-5 p-5 text-gray-300 border rounded-lg border-slate-300 bg-slate-950'
        >
            <span className='text-3xl font-bold'>Confirm Your Details</span>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <label className='flex-1 text-sm font-bold text-gray-300'>
                    First Name
                    <input
                        className='w-full px-3 py-2 mt-1 font-normal text-gray-700 bg-gray-200 border rounded'
                        type='text'
                        readOnly
                        disabled
                        {...register('fullName')}
                    />
                </label>
                <label className='flex-1 text-sm font-bold text-gray-300'>
                    Email
                    <input
                        className='w-full px-3 py-2 mt-1 font-normal text-gray-700 bg-gray-200 border rounded'
                        type='text'
                        readOnly
                        disabled
                        {...register('email')}
                    />
                </label>
            </div>

            <div className='space-y-2'>
                <h2 className='text-xl font-semibold'>Your Price Summary</h2>

                <div className='p-4 text-gray-900 bg-blue-200 rounded-md'>
                    <div className='text-lg font-semibold'>Total Cost: ₹{paymentIntent.totalCost.toFixed(2)}</div>
                    <div className='text-xs'>Includes taxes and charges</div>
                </div>
            </div>

            <div className='space-y-2'>
                <h3 className='text-xl font-semibold'> Payment Details</h3>
                <CardElement id='payment-element' className='p-2 text-sm bg-white border rounded-md' />
            </div>

            <div className='flex justify-end'>
                <button
                    disabled={isPending}
                    type='submit'
                    className='p-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500 text-md disabled:bg-gray-500 disabled:bg-opacity-95'
                >
                    {isPending ? 'Saving...' : 'Confirm Booking'}
                </button>
            </div>
        </form>
    );
};

export default BookingForm;
