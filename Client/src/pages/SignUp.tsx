import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpFormData } from "../utils/Types";
import { useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

interface ValidationError {
    message: string;
    errors: Record<string, string[]>;
}

const SignUp = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const {
        register,
        watch,
        formState: { errors, isDirty, isSubmitSuccessful },
        handleSubmit,
        reset,
    } = useForm<SignUpFormData>();

    // Form Reset...
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    // Form submit...
    const handleFormSubmit: SubmitHandler<SignUpFormData> = async (formData) => {
        try {
            await axios.post(`/api/v1/users/register`, {
                fullName: `${formData.firstname} ${formData.lastname}`,
                userName: formData.userName,
                email: formData.email,
                password: formData.password,
            });
            showToast({ message: "Registration successful", type: "SUCCESS" });
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
                showToast({ message: error.response?.data.message, type: "ERROR" });
            } else {
                const err = error as Error;
                showToast({ message: err.message, type: "ERROR" });
            }
        }
    };

    return (
        <form
            className="flex flex-col max-w-2xl gap-5 px-4 mx-auto my-10"
            noValidate
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <h2 className="text-3xl font-bold text-center">Create an account</h2>
            <div className="flex flex-col gap-5 md:flex-row">
                <div className="flex-1">
                    <label
                        htmlFor="firstname"
                        className="flex-1 text-sm font-semibold text-gray-700"
                    >
                        First Name
                    </label>
                    <input
                        id="firstname"
                        type="text"
                        className="w-full px-2 py-2 font-normal border rounded"
                        autoComplete="off"
                        {...register("firstname", {
                            required: { value: true, message: "This field is required" },
                            min: { value: 3, message: "firstname must be atleast 3 characters" },
                            max: { value: 100, message: "firstname must be atmost 100 characters" },
                        })}
                    />
                    <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-600">
                        {errors.firstname?.message}
                    </p>
                </div>
                <div className="flex-1">
                    <label
                        htmlFor="lastname"
                        className="text-sm font-semibold text-gray-700"
                    >
                        Last Name
                    </label>
                    <input
                        id="lastname"
                        type="text"
                        className="w-full px-2 py-2 font-normal border rounded"
                        autoComplete="off"
                        {...register("lastname", {
                            required: { value: true, message: "This field is required" },
                            min: { value: 3, message: "lastname must be atleast 3 characters" },
                            max: { value: 100, message: "lastname must be atmost 100 characters" },
                        })}
                    />
                    <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-600">
                        {errors.lastname?.message}
                    </p>
                </div>
            </div>
            <div>
                <label
                    htmlFor="userName"
                    className="flex-1 text-sm font-semibold text-gray-700"
                >
                    User Name
                </label>
                <input
                    id="userName"
                    type="text"
                    className="w-full px-2 py-2 font-normal border rounded"
                    autoComplete="off"
                    {...register("userName", {
                        required: { value: true, message: "This field is required" },
                        min: { value: 3, message: "firstname must be atleast 3 characters" },
                        max: { value: 100, message: "firstname must be atmost 100 characters" },
                    })}
                />
                <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-600">
                    {errors.userName?.message}
                </p>
            </div>
            <div>
                <label
                    htmlFor="email"
                    className="flex-1 text-sm font-semibold text-gray-700"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    className="w-full px-2 py-2 font-normal border rounded"
                    autoComplete="off"
                    {...register("email", {
                        required: { value: true, message: "Email is required" },
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                            message: "Invalid Email Id",
                        },
                        validate: {
                            blockDomain: (value) => {
                                return !value.endsWith("test.com") || "This is not a valid domain";
                            },
                            lengthError: (value) => {
                                return value.length > 6 || "please enter a valid email address";
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
                <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-600">{errors.email?.message}</p>
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="flex-1 text-sm font-semibold text-gray-700"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    className="w-full px-2 py-2 font-normal border rounded"
                    autoComplete="off"
                    {...register("password", {
                        required: { value: true, message: "password is required" },
                        validate: {
                            lengthError: (value) => {
                                return value.length >= 8 || "password must be atleast 8 characters";
                            },
                        },
                    })}
                />
                <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-600">
                    {errors.password?.message}
                </p>
            </div>
            <div>
                <label
                    htmlFor="confirmPassword"
                    className="flex-1 text-sm font-semibold text-gray-700"
                >
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    className="w-full px-2 py-2 font-normal border rounded"
                    autoComplete="off"
                    {...register("confirmPassword", {
                        required: { value: true, message: "Please confirm the password" },
                        validate: (value) => {
                            return watch("password") === value || "your password does not match";
                        },
                    })}
                />
                <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-600">
                    {errors.confirmPassword?.message}
                </p>
            </div>
            <div className="flex items-center justify-between -mt-3 text-sm">
                <span>
                    You aready have an account?
                    <Link
                        to={"/auth/sign-in"}
                        className="mx-1 font-semibold text-blue-700 underline"
                    >
                        Sign In
                    </Link>
                </span>
                <button
                    type="submit"
                    disabled={!isDirty}
                    className="px-4 py-2 text-xl font-semibold text-white bg-blue-600 rounded hover:bg-blue-500 disabled:bg-blue-400"
                >
                    Create Account
                </button>
            </div>
        </form>
    );
};

export default SignUp;
