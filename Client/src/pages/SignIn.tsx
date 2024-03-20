import { SubmitHandler, useForm } from 'react-hook-form';
import { SigninFormData } from '../utils/Types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userLogin } from '../api/apiClient';
import { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Button } from '../components/ui/button';
import videoLink from '/video.mp4';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        formState: { errors, isDirty },
        handleSubmit,
    } = useForm<SigninFormData>();

    // Form submit...
    const mutation = useMutation({
        mutationFn: userLogin,
        onSuccess: async () => {
            showToast({ message: 'Login successful', type: 'SUCCESS' });
            await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
            navigate(location.state?.from?.pathname || '/');
        },
        onError: (err: Error) => {
            showToast({ message: err.message, type: 'ERROR' });
        },
    });
    const handleFormSubmit: SubmitHandler<SigninFormData> = async (formData) => mutation.mutate(formData);

    return (
        <div className='h-full'>
            <div className='absolute top-0 left-0 w-full h-full'>
                <video src={videoLink} autoPlay loop muted className='object-cover w-full h-full'></video>
                <div className='absolute top-0 w-full h-full bg-[#0000006f]'></div>
            </div>
            <div className='relative py-10 text-gray-100 border-2 top-24 rounded-xl border-slate-300 backdrop-blur-md md:my-28'>
                <form
                    className='flex flex-col max-w-2xl gap-5 px-4 mx-auto'
                    noValidate
                    onSubmit={handleSubmit(handleFormSubmit)}
                >
                    <h2 className='text-3xl font-bold text-center'>Travel Nest</h2>
                    <div>
                        <label htmlFor='email' className='flex-1 text-sm font-semibold text-gray-100'>
                            Email
                        </label>
                        <input
                            id='email'
                            type='email'
                            className='w-full px-2 py-2 font-normal text-black border rounded placeholder:text-sm'
                            autoComplete='off'
                            placeholder='Enter your email address'
                            {...register('email', {
                                required: { value: true, message: 'Email is required' },
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                                    message: 'Invalid Email Id',
                                },
                                validate: {
                                    lengthError: (value) => {
                                        return value.length >= 6 || 'please enter a valid email address';
                                    },
                                },
                            })}
                        />
                        <p className='h-2 px-3 pt-1 pb-3 text-sm text-red-600'>{errors.email?.message}</p>
                    </div>
                    <div>
                        <label htmlFor='password' className='flex-1 text-sm font-semibold text-gray-100'>
                            Password
                        </label>
                        <div className='relative'>
                            <input
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                className='w-full px-2 py-2 font-normal text-black border rounded placeholder:text-sm'
                                autoComplete='off'
                                placeholder='Enter your password'
                                {...register('password', {
                                    required: { value: true, message: 'password is required' },
                                    validate: {
                                        lengthError: (value) => {
                                            return value.length >= 8 || 'password must be atleast 8 characters';
                                        },
                                    },
                                })}
                            />
                            <div
                                className='absolute text-lg cursor-pointer top-3 right-4 text-slate-600'
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <IoEye /> : <IoEyeOff />}
                            </div>
                        </div>
                        <p className='h-2 px-3 pt-1 pb-3 text-sm text-red-600'>{errors.password?.message}</p>
                    </div>
                    <div className='flex items-center justify-between -mt-3 text-sm'>
                        <span>
                            Not Register Yet?
                            <Link to={'/sign-up'} className='mx-1 font-semibold text-blue-700 underline'>
                                Create an account here
                            </Link>
                        </span>
                        <Button type='submit' disabled={!isDirty} className='text-white bg-blue-600 hover:bg-blue-700'>
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
