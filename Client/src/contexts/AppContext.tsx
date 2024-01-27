import { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';
import { useQuery } from '@tanstack/react-query';
import { validateToken } from '../api/api-client';

export type ToastMessage = {
    message: string | undefined;
    type: 'SUCCESS' | 'ERROR';
};

export type AppContext = {
    showToast: (toastMassege: ToastMessage) => void;
    isLoggedIn: boolean;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

    const { isError } = useQuery({
        queryKey: ['validateToken'],
        queryFn: validateToken,
        retry: false,
    });

    return (
        <AppContext.Provider
            value={{
                showToast: (toastMassege) => {
                    setToast(toastMassege);
                },
                isLoggedIn: !isError,
            }}
        >
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(undefined)}
                />
            )}
            {children}
        </AppContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
};
