import { SubmitHandler, useForm } from 'react-hook-form';
import { SigninFormData } from '../utils/Types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { useQueryClient } from '@tanstack/react-query';

interface ValidationError {
    message: string;
    errors: Record<string, string[]>;
}

const SignIn = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const {
        register,
        formState: { errors, isDirty },
        handleSubmit,
    } = useForm<SigninFormData>();

    // Form submit...
    const handleFormSubmit: SubmitHandler<SigninFormData> = async (formData) => {
        try {
            await axios.post(`/api/v1/users/login`, formData);
            showToast({ message: 'Loggin successful', type: 'SUCCESS' });
            await queryClient.invalidateQueries('validateToken');
            navigate('/');
        } catch (error) {
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
                showToast({ message: error.response?.data.message, type: 'ERROR' });
            } else {
                const err = error as Error;
                showToast({ message: err.message, type: 'ERROR' });
            }
        }
    };

    return (
        <form
            className='flex flex-col gap-5 mt-10'
            noValidate
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <h2 className='text-3xl font-bold text-center'>Sign In</h2>
            <div>
                <label htmlFor='email' className='flex-1 text-sm font-semibold text-gray-700'>
                    Email
                </label>
                <input
                    id='email'
                    type='email'
                    className='w-full px-2 py-2 font-normal border rounded'
                    autoComplete='off'
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
                <label htmlFor='password' className='flex-1 text-sm font-semibold text-gray-700'>
                    Password
                </label>
                <input
                    id='password'
                    type='password'
                    className='w-full px-2 py-2 font-normal border rounded'
                    autoComplete='off'
                    {...register('password', {
                        required: { value: true, message: 'password is required' },
                        validate: {
                            lengthError: (value) => {
                                return value.length >= 8 || 'password must be atleast 8 characters';
                            },
                        },
                    })}
                />
                <p className='h-2 px-3 pt-1 pb-3 text-sm text-red-600'>
                    {errors.password?.message}
                </p>
            </div>
            <button
                type='submit'
                disabled={!isDirty}
                className='p-2 text-xl font-semibold text-white bg-blue-600 rounded hover:bg-blue-500 disabled:bg-blue-400'
            >
                Create Account
            </button>
        </form>
    );
};

export default SignIn;
