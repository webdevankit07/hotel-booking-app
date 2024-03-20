import { useForm } from 'react-hook-form';
import { GuestInfoFormData } from '../utils/Types';
import { useAppContext } from '../contexts/AppContext';
import { UseSearchContext } from '../contexts/SearchContext';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactDatePicker from 'react-datepicker';
import { Button } from './ui/button';

type Props = {
    hotelId: string;
    pricePerNight: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
    const { isLoggedIn, showToast } = useAppContext();
    const search = UseSearchContext();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        watch,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        },
    });

    const checkIn = watch('checkIn');
    const checkOut = watch('checkOut');

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues('', data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate('/sign-in', { state: { from: location } });
    };

    const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues('', data.checkIn, data.checkOut, data.adultCount, data.childCount);
        const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);
        if (nights > 0) {
            console.log(nights);
            navigate(`/hotel/${hotelId}/booking`);
        } else {
            showToast({ message: 'Select Booking date', type: 'ERROR' });
        }
    };

    return (
        <div className='flex flex-col gap-4 p-4 text-gray-300 bg-gray-900 rounded'>
            <h3 className='font-bold text-md'>₹{pricePerNight}</h3>
            <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
                <div className='grid items-center grid-cols-1 gap-4'>
                    <div>
                        <ReactDatePicker
                            required
                            selected={checkIn}
                            onChange={(date) => setValue('checkIn', date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText='Check-in Date'
                            className='min-w-full p-2 text-gray-300 focus:outline-none bg-slate-950'
                            wrapperClassName='min-w-full'
                        />
                    </div>
                    <div>
                        <ReactDatePicker
                            required
                            selected={checkOut}
                            onChange={(date) => setValue('checkOut', date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText='Check-in Date'
                            className='min-w-full p-2 text-gray-300 bg-slate-950 focus:outline-none'
                            wrapperClassName='min-w-full'
                        />
                    </div>
                    <div className='flex gap-2 px-2 py-1 text-gray-300 bg-slate-950'>
                        <label className='flex items-center'>
                            Adults:
                            <input
                                className='w-full p-1 font-bold border-none bg-slate-950 focus:outline-none'
                                type='number'
                                min={1}
                                max={20}
                                {...register('adultCount', {
                                    required: 'This field is required',
                                    min: {
                                        value: 1,
                                        message: 'There must be at least one adult',
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        <label className='flex items-center'>
                            Children:
                            <input
                                className='w-full p-1 font-bold border-none bg-slate-950 focus:outline-none'
                                type='number'
                                min={0}
                                max={20}
                                {...register('childCount', {
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        {errors.adultCount && (
                            <span className='text-sm font-semibold text-red-500'>{errors.adultCount.message}</span>
                        )}
                    </div>
                    {isLoggedIn ? <Button variant={'destructive'}>Book Now</Button> : <Button>Sign in to Book</Button>}
                </div>
            </form>
        </div>
    );
};

export default GuestInfoForm;
