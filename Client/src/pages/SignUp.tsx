import { SubmitHandler, useForm } from 'react-hook-form';
import { SignUpFormData } from '../utils/Types';
import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userRegister } from '../api/apiClient';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Button } from '../components/ui/button';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const {
        register,
        watch,
        formState: { errors, isDirty },
        handleSubmit,
    } = useForm<SignUpFormData>();

    // Form submit...
    const mutation = useMutation({
        mutationFn: userRegister,
        onSuccess: async () => {
            showToast({ message: 'Registration successful', type: 'SUCCESS' });
            await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
            navigate('/');
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' });
        },
    });
    const handleFormSubmit: SubmitHandler<SignUpFormData> = async (formData) => mutation.mutate(formData);

    return (
        <div className='py-10 my-10 text-gray-100 border-2 md:mt-24 bg-slate-950 rounded-xl border-slate-300 backdrop-blur-md'>
            <form
                className='relative flex flex-col max-w-2xl gap-5 px-4 mx-auto text-gray-100'
                noValidate
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <h2 className='text-3xl font-bold text-center'>Create an account</h2>
                <div className='flex flex-col gap-5 md:flex-row'>
                    <div className='flex-1'>
                        <label htmlFor='firstname' className='flex-1 text-sm font-semibold text-gray-100'>
                            First Name
                        </label>
                        <input
                            id='firstname'
                            type='text'
                            className='w-full px-2 py-2 font-normal text-black border rounded placeholder:text-sm'
                            autoComplete='off'
                            placeholder='Enter your First Name'
                            {...register('firstname', {
                                required: { value: true, message: 'This field is required' },
                                min: { value: 3, message: 'firstname must be atleast 3 characters' },
                                max: { value: 100, message: 'firstname must be atmost 100 characters' },
                            })}
                        />
                        <p className='h-2 px-3 pt-1 pb-3 text-sm font-bold text-red-500'>{errors.firstname?.message}</p>
                    </div>
                    <div className='flex-1'>
                        <label htmlFor='lastname' className='text-sm font-semibold text-gray-100'>
                            Last Name
                        </label>
                        <input
                            id='lastname'
                            type='text'
                            placeholder='Enter your Last Name'
                            className='w-full px-2 py-2 font-normal text-black border rounded placeholder:text-sm'
                            autoComplete='off'
                            {...register('lastname', {
                                required: { value: true, message: 'This field is required' },
                                min: { value: 3, message: 'lastname must be atleast 3 characters' },
                                max: { value: 100, message: 'lastname must be atmost 100 characters' },
                            })}
                        />
                        <p className='h-2 px-3 pt-1 pb-3 text-sm font-bold text-red-500'>{errors.lastname?.message}</p>
                    </div>
                </div>
                <div>
                    <label htmlFor='userName' className='flex-1 text-sm font-semibold text-gray-100'>
                        User Name
                    </label>
                    <input
                        id='userName'
                        type='text'
                        placeholder='Enter user name'
                        className='w-full px-2 py-2 font-normal text-black border rounded placeholder:text-sm'
                        autoComplete='off'
                        {...register('userName', {
                            required: { value: true, message: 'This field is required' },
                            min: { value: 3, message: 'firstname must be atleast 3 characters' },
                            max: { value: 100, message: 'firstname must be atmost 100 characters' },
                        })}
                    />
                    <p className='h-2 px-3 pt-1 pb-3 text-sm font-bold text-red-500'>{errors.userName?.message}</p>
                </div>
                <div>
                    <label htmlFor='email' className='flex-1 text-sm font-semibold text-gray-100'>
                        Email
                    </label>
                    <input
                        id='email'
                        type='email'
                        placeholder='Enter email address'
                        className='w-full px-2 py-2 font-normal text-black border rounded placeholder:text-sm'
                        autoComplete='off'
                        {...register('email', {
                            required: { value: true, message: 'Email is required' },
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                                message: 'Invalid Email Id',
                            },
                            validate: {
                                blockDomain: (value) => {
                                    return !value.endsWith('test.com') || 'This is not a valid domain';
                                },
                                lengthError: (value) => {
                                    return value.length > 6 || 'please enter a valid email address';
                                },
                                // checkValidEmail: async (value) => {
                                //     const { data } = await axios(
                                //         `https://jsonplaceholder.typicode.com/users?email=${value}`
                                //     );
                                //     return (data && data.length === 0) || 'Email already exists';
                                // },
                            },
                        })}
                    />
                    <p className='h-2 px-3 pt-1 pb-3 text-sm font-bold text-red-500'>{errors.email?.message}</p>
                </div>
                <div>
                    <label htmlFor='password' className='flex-1 text-sm font-semibold text-gray-100'>
                        Password
                    </label>
                    <div className='relative'>
                        <input
                            id='password'
                            placeholder='Enter Password'
                            type={showPassword ? 'text' : 'password'}
                            className='w-full px-2 py-2 font-normal text-black border rounded placeholder:text-sm'
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
                        <div
                            className='absolute text-lg cursor-pointer top-3 right-4'
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <IoEye /> : <IoEyeOff />}
                        </div>
                    </div>

                    <p className='h-2 px-3 pt-1 pb-3 text-sm font-bold text-red-500'>{errors.password?.message}</p>
                </div>
                <div>
                    <label htmlFor='confirmPassword' className='flex-1 text-sm font-semibold text-gray-100'>
                        Confirm Password
                    </label>
                    <input
                        id='confirmPassword'
                        type='password'
                        placeholder={'Confirm Your Password'}
                        className='w-full px-2 py-2 font-normal text-black border rounded placeholder:text-sm'
                        autoComplete='off'
                        {...register('confirmPassword', {
                            required: { value: true, message: 'Please confirm the password' },
                            validate: (value) => {
                                return watch('password') === value || 'your password does not match';
                            },
                        })}
                    />
                    <p className='h-2 px-3 pt-1 pb-3 text-sm font-bold text-red-500'>
                        {errors.confirmPassword?.message}
                    </p>
                </div>
                <div className='flex items-center justify-between -mt-3 text-sm'>
                    <span>
                        You aready have an account?
                        <Link to={'/sign-in'} className='mx-1 font-semibold text-blue-700 underline'>
                            Sign In
                        </Link>
                    </span>
                    <Button type='submit' disabled={!isDirty} className='text-white bg-blue-600 hover:bg-blue-700'>
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
