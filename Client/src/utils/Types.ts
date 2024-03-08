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
//! ********************   Component Types ********************* //
