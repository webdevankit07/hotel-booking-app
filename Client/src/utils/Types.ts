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
};
