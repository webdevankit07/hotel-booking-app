import axios from 'axios';
import {
    BookingFormData,
    HotelSearchResponse,
    PaymentIntentResponse,
    ResHotelType,
    SearchParamsTypes,
    SignUpFormData,
    SigninFormData,
    ValidationError,
    currentUserType,
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

// fetchHotelById...*:
export const fetchHotelById = async (hotelId: string) => {
    try {
        const { data } = await Axios.get(`/my-hotels/hotel/${hotelId}`);
        return data.data as ResHotelType;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

// fetchHotelById...*:
export const getCurrentUser = async () => {
    try {
        const { data } = await Axios.get(`/user/me`);
        return data.data.user as currentUserType;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

// create payment Intent...*:
export const createPaymentIntent = async (hotelId: string, numberOfNights: string) => {
    try {
        const { data } = await Axios.post(`/my-hotels/${hotelId}/bookings/payment-intent`, { numberOfNights });
        return data.data as PaymentIntentResponse;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const createRoomBooking = async (formData: BookingFormData) => {
    try {
        const { data } = await Axios.post(`/my-hotels/${formData.hotelId}/bookings`, formData);
        return data.data as PaymentIntentResponse;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const getAllHotels = async () => {
    try {
        const { data } = await Axios.get(`/my-hotels/getAllHotels`);
        return data.data as ResHotelType[];
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};
