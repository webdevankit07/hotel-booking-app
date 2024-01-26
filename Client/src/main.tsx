import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './store/store.ts';
import { Provider } from 'react-redux';
import { AppContextProvider } from './contexts/AppContext.tsx';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <AppContextProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </AppContextProvider>
    </Provider>
);
