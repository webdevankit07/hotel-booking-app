import axios from 'axios';
import { SignUpFormData, SigninFormData, ValidationError } from '../utils/Types';
import { apiBaseUrl } from '../conf';

// Axios...
export const Axios = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
});

// handle Axios errors...
export const handleAxiosError = async (error: unknown) => {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return error.response?.data.message;
    } else {
        const err = error as Error;
        return err.message;
    }
};

// User Registration....
export const userRegister = async (formData: SignUpFormData) => {
    try {
        await Axios.post(`/user/register`, {
            fullName: `${formData.firstname} ${formData.lastname}`,
            userName: formData.userName,
            email: formData.email,
            password: formData.password,
        });
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

// User Login....
export const userLogin = async (formData: SigninFormData) => {
    try {
        await Axios.post(`/user/login`, formData);
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

// User Login....
export const userLogout = async () => {
    try {
        await Axios.post(`/user/logout`);
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

// Validate-Token...*:
export const validateToken = async () => {
    try {
        await Axios.get('/user/validate-token');
        return null;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};
