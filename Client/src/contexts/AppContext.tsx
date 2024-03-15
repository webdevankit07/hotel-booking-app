import { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';
import { useQuery } from '@tanstack/react-query';
import { validateToken } from '../api/apiClient';
import { AppContextType, ToastMessageType } from '../utils/Types';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUB_KEY } from '../conf';

const stripePromise = loadStripe(STRIPE_PUB_KEY);

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessageType | undefined>(undefined);

    const { isError } = useQuery({
        queryKey: ['validateToken'],
        queryFn: validateToken,
        retry: false,
    });

    return (
        <AppContext.Provider
            value={{
                showToast: (toastMassege) => setToast(toastMassege),
                isLoggedIn: !isError,
                stripePromise,
            }}
        >
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
            {children}
        </AppContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContextType;
};
