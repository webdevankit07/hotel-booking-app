import { createContext, useContext } from 'react';

export type ToastMessage = {
    message: string;
    type: 'SUCCESS' | 'ERROR';
};

export type AppContext = {
    showToast: (toastMassege: ToastMessage) => void;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppContext.Provider
            value={{
                showToast: (toastMassege) => {
                    console.log(toastMassege);
                },
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
};
