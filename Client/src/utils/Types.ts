//! ********************  apiClient Types ********************* //
export type ValidationError = {
    message: string;
    errors: Record<string, string[]>;
};

//!
//!
//!
//! ********************  AppContexts Types ********************* //
export type ToastMessageType = {
    message: string | undefined;
    type: 'SUCCESS' | 'ERROR';
};
export type AppContextType = {
    showToast: (toastMassege: ToastMessageType) => void;
    isLoggedIn: boolean;
};
//!
//!
//!
//! ********************  SearchContext Types ********************* //
export type SearchContextType = {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    hotelId: string;
    saveSearchValues: (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number
    ) => void;
};

//!
//!
//!
//! ********************  SignUp Component Types ********************* //
export type SignUpFormData = {
    firstname: string;
    lastname: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
};
//!
//!
//!
//! ********************  SignIn Component Types ********************* //
export type SigninFormData = {
    email: string;
    password: string;
};
//!
//!
//!
//! ********************   AddHotel Types ********************* //
export type HotelType = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageFiles: FileList;
    imageUrls: string[];
};
export type ResHotelType = {
    _id: string;
    UserId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageFiles: FileList;
    imageUrls: string[];
};
//!
//!
//!
//! ********************   Search Hotel Types ********************* //
export type HotelSearchResponse = {
    data: ResHotelType[];
    pagination: { total: number; pageNo: number; pages: number };
};

//!
//!
//!
//! ********************   Search Types ********************* //
export type SearchParamsTypes = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
};
