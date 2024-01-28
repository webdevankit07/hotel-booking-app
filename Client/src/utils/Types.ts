//! ********************  SignUp Component ********************* //
export type SignUpFormData = {
    firstname: string;
    lastname: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

//! ********************  SignIn Component ********************* //
export type SigninFormData = {
    email: string;
    password: string;
};
//!
//!
//!
//!
//!
//!
//!
//!
//!
//!
//!
//! ********************  Contexts Types ********************* //
export type ToastMessage = {
    message: string;
    type: 'SUCCESS' | 'ERROR';
};

export type AppContext = {
    showToast: (toastMassege: ToastMessage) => void;
};
