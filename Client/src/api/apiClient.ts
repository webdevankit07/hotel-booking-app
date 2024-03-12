import axios from 'axios';
import {
    HotelSearchResponse,
    ResHotelType,
    SearchParamsTypes,
    SignUpFormData,
    SigninFormData,
    ValidationError,
} from '../utils/Types';
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

// My-Hotels...*:
export const getMyHotels = async () => {
    try {
        const { data } = await Axios.get('/my-hotels');
        return data.data as ResHotelType[];
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

// My-Hotel-Details...*:
export const getMyHotelDetails = async (hotelId: string) => {
    try {
        const { data } = await Axios.get(`/my-hotels/${hotelId}`);
        return data.data as ResHotelType;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

// Search-Hotel-Details...*:
export const searchHotels = async (searchParams: SearchParamsTypes): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append('destination', searchParams.destination || '');
    queryParams.append('checkIn', searchParams.checkIn || '');
    queryParams.append('checkOut', searchParams.checkOut || '');
    queryParams.append('adultCount', searchParams.adultCount || '');
    queryParams.append('childCount', searchParams.childCount || '');
    queryParams.append('page', searchParams.page || '');

    queryParams.append('maxPrice', searchParams.maxPrice || '');
    queryParams.append('sortOption', searchParams.sortOption || '');

    searchParams.facilities?.forEach((facility) => queryParams.append('facilities', facility));

    searchParams.types?.forEach((type) => queryParams.append('types', type));
    searchParams.stars?.forEach((star) => queryParams.append('stars', star));

    try {
        const { data: searchData } = await Axios.get(`/my-hotels/search?${queryParams}`);
        return searchData.data;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};
