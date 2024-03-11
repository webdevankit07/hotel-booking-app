import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Axios, getMyHotelDetails, handleAxiosError } from '../api/apiClient';
import { useForm } from 'react-hook-form';
import { HotelType } from '../utils/Types';
import { hotelFacilities, hotelTypes } from '../utils/utils';
import { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

const EditHotel = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const { hotelId } = useParams();
    const { showToast } = useAppContext();

    const {
        register,
        formState: { errors, isDirty },
        handleSubmit,
        watch,
        reset,
        setValue,
    } = useForm<HotelType>();

    const typeWatch = watch('type');
    const facilitesWatch = watch('facilities');
    const existingImageUrls = watch('imageUrls');

    const { data: hotelData } = useQuery({
        queryKey: ['hotelDetails', hotelId],
        queryFn: () => getMyHotelDetails(hotelId || ''),
        enabled: !!hotelId,
    });

    useEffect(() => {
        reset(hotelData);
    }, [reset, hotelData]);

    const handleFormSubmit = async (data: HotelType) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('city', data.city);
        formData.append('country', data.country);
        formData.append('description', data.description);
        formData.append('type', data.type);
        formData.append('pricePerNight', data.pricePerNight.toString());
        formData.append('starRating', data.starRating.toString());
        formData.append('adultCount', data.adultCount.toString());
        formData.append('childCount', data.childCount.toString());
        data.facilities.forEach((facility, index) => formData.append(`facilities[${index}]`, facility));
        data.imageUrls.forEach((url, index) => formData.append(`imageUrls[${index}]`, url));
        Array.from(data.imageFiles).forEach((imageFile) => formData.append(`imageFiles`, imageFile));

        setLoading(true);
        try {
            const { data } = await Axios.put(`/my-hotels/update-hotel/${hotelData?._id}`, formData);
            setValue('imageUrls', data.data.imageUrls);
            setLoading(false);
            showToast({ message: 'Hotel Saved!', type: 'SUCCESS' });
        } catch (error) {
            const err = await handleAxiosError(error);
            setLoading(false);
            showToast({ message: err, type: 'ERROR' });
        }
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
        e.preventDefault();
        setValue(
            'imageUrls',
            existingImageUrls.filter((url) => url !== imageUrl)
        );
    };

    return (
        <>
            <form
                className='flex flex-col max-w-5xl gap-10 mx-auto my-10'
                onSubmit={handleSubmit(handleFormSubmit)}
                noValidate
            >
                {/*//! ................ Details Section ............... */}
                <section className='flex flex-col gap-4'>
                    <h1 className='mb-3 text-3xl font-bold text-center'>Update Hotel</h1>
                    <div>
                        <label htmlFor='name' className='flex-1 text-sm font-semibold text-gray-700'>
                            Name
                        </label>
                        <input
                            id='name'
                            type='text'
                            className='w-full px-2 py-2 font-normal border rounded'
                            autoComplete='off'
                            {...register('name', {
                                required: { value: true, message: 'Hotel name is required' },
                            })}
                        />
                        <p className='h-2 px-3 pt-1 pb-3 text-sm text-red-600'>{errors.name?.message}</p>
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex-1'>
                            <label htmlFor='city' className='flex-1 text-sm font-semibold text-gray-700'>
                                City
                            </label>
                            <input
                                id='city'
                                type='text'
                                className='w-full px-2 py-2 font-normal border rounded'
                                autoComplete='off'
                                {...register('city', {
                                    required: { value: true, message: 'city is required' },
                                })}
                            />
                            <p className='h-2 px-3 pt-1 pb-3 text-sm text-red-600'>{errors.city?.message}</p>
                        </div>
                        <div className='flex-1'>
                            <label htmlFor='country' className='flex-1 text-sm font-semibold text-gray-700'>
                                Country
                            </label>
                            <input
                                id='country'
                                type='text'
                                className='w-full px-2 py-2 font-normal border rounded'
                                autoComplete='off'
                                {...register('country', {
                                    required: { value: true, message: 'country is required' },
                                })}
                            />
                            <p className='h-2 px-3 pt-1 pb-3 text-sm text-red-600'>{errors.country?.message}</p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor='description' className='flex-1 text-sm font-semibold text-gray-700'>
                            Description
                        </label>
                        <textarea
                            id='description'
                            rows={10}
                            className='w-full px-2 py-2 font-normal border rounded resize-none'
                            autoComplete='off'
                            {...register('description', {
                                required: { value: true, message: 'description is required' },
                            })}
                        />
                        <p className='h-2 px-3 pt-1 pb-3 text-sm text-red-600'>{errors.description?.message}</p>
                    </div>
                    <div className='max-w-[50%]'>
                        <label htmlFor='pricePerNight' className='flex-1 text-sm font-semibold text-gray-700'>
                            Price per night
                        </label>
                        <input
                            id='pricePerNight'
                            type='number'
                            className='w-full px-2 py-2 font-normal border rounded resize-none'
                            autoComplete='off'
                            {...register('pricePerNight', {
                                required: { value: true, message: 'price is required' },
                                min: { value: 1, message: 'minimum price required' },
                            })}
                        />
                        <p className='h-2 px-3 pt-1 pb-3 text-sm text-red-600'>{errors.pricePerNight?.message}</p>
                    </div>
                    <div className='max-w-[50%]'>
                        <label htmlFor='starRating' className='flex-1 text-sm font-semibold text-gray-700'>
                            Star Rating
                        </label>
                        <select
                            id='starRating'
                            className='w-full p-2 font-normal text-gray-700 border rounded'
                            {...register('starRating', {
                                validate: (value) => {
                                    if (!(value >= 1)) {
                                        return 'rate your hotel';
                                    }
                                },
                            })}
                        >
                            <option className='text-sm font-bold'>Select as Rating</option>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option value={num} key={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                        <p className='h-2 px-3 pt-1 pb-3 text-sm text-red-600'>{errors.starRating?.message}</p>
                    </div>
                </section>

                {/*//! ................ TypeSection ............... */}
                <section>
                    <h2 className='mb-3 text-2xl font-bold'>Type</h2>
                    <div className='grid grid-cols-5 gap-2'>
                        {hotelTypes.map((type) => (
                            <label
                                className={` flex items-center justify-center cursor-pointer text-sm rounded-full p-2 font-semibold ${
                                    typeWatch === type ? 'bg-blue-300' : 'bg-gray-300'
                                }`}
                                key={type}
                            >
                                <input
                                    type='radio'
                                    value={type}
                                    className='hidden'
                                    {...register('type', { required: 'This field is required' })}
                                />
                                <span>{type}</span>
                            </label>
                        ))}
                    </div>
                    <p className='h-2 px-3 pt-1 pb-3 text-sm text-red-600'>{errors.type?.message}</p>
                </section>

                {/*//! ................ Faciliteis Section ............... */}
                <section>
                    <h2 className='mb-3 text-2xl font-bold'>Facilities</h2>
                    <div className='grid grid-cols-5 gap-3'>
                        {hotelFacilities.map((facility) => (
                            <label
                                className={` flex items-center justify-center cursor-pointer text-sm rounded-full p-2 font-semibold ${
                                    facilitesWatch && facilitesWatch?.includes(facility) ? 'bg-blue-300' : 'bg-gray-300'
                                }`}
                                key={facility}
                            >
                                <input
                                    type='checkbox'
                                    value={facility}
                                    className='hidden'
                                    {...register('facilities', {
                                        validate: (facilites) => {
                                            if (facilites && facilites.length > 0) {
                                                return true;
                                            } else {
                                                return 'At least one facility is required';
                                            }
                                        },
                                    })}
                                />
                                {facility}
                            </label>
                        ))}
                    </div>
                    <p className='h-2 px-3 pt-1 pb-3 text-sm text-red-600'>{errors.facilities?.message}</p>
                </section>

                {/*//! ................ Guest Section ............... */}
                <section>
                    <h2 className='mb-3 text-2xl font-bold'>Guests</h2>
                    <div className='grid grid-cols-2 gap-5 p-6 bg-gray-300 rounded'>
                        <label className='text-sm font-semibold text-gray-700'>
                            Adults
                            <input
                                type='number'
                                className='w-full px-3 py-2 font-normal border rounded'
                                {...register('adultCount', {
                                    required: 'This field is required',
                                    min: { value: 1, message: 'minimum 1 is required' },
                                })}
                            />
                            <p className='h-2 px-3 pt-1 pb-3 text-sm font-normal text-red-600'>
                                {errors.adultCount?.message}
                            </p>
                        </label>
                        <label className='text-sm font-semibold text-gray-700'>
                            children
                            <input
                                type='number'
                                className='w-full px-3 py-2 font-normal border rounded'
                                {...register('childCount', {
                                    required: 'This field is required',
                                })}
                            />
                            <p className='h-2 px-3 pt-1 pb-3 text-sm font-normal text-red-600'>
                                {errors.childCount?.message}
                            </p>
                        </label>
                    </div>
                </section>

                {/*//! ................ Image Section ............... */}
                <section>
                    <h2 className='mb-3 text-2xl font-bold'>Images</h2>
                    <div className='flex flex-col gap-4 p-4 border rounded'>
                        {existingImageUrls && (
                            <div className='grid grid-cols-6 gap-4'>
                                {existingImageUrls.map((url) => (
                                    <div className='relative group' key={`${url}${Math.random() * 100000}`}>
                                        <img src={url} className='object-cover min-h-full' />
                                        <button
                                            onClick={(event) => handleDelete(event, url)}
                                            className='absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <input
                            type='file'
                            multiple
                            accept='image/*'
                            className='w-full font-normal text-gray-700'
                            {...register('imageFiles', {
                                validate: (imageFiles) => {
                                    if (imageFiles.length + (existingImageUrls?.length || 0) === 0) {
                                        return 'At least one image should be added';
                                    }

                                    if (imageFiles.length + (existingImageUrls?.length || 0) > 6) {
                                        return 'Total images cannot be more than 6';
                                    }
                                    return true;
                                },
                            })}
                        />
                    </div>
                    <p className='h-2 px-3 pt-1 pb-3 text-sm text-red-600'>{errors.imageFiles?.message}</p>
                </section>

                {/*//! ................ Submit Button Section ............... */}
                <button
                    type='submit'
                    disabled={!isDirty || isLoading}
                    className='w-full px-3 py-2 font-semibold text-white bg-blue-600 rounded disabled:bg-blue-400'
                >
                    {isLoading ? 'Saving...' : 'Update Hotel'}
                </button>
            </form>
        </>
    );
};

export default EditHotel;
