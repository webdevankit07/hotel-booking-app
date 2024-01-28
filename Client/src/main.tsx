import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./store/store.ts";
import { Provider } from "react-redux";
import { AppContextProvider } from "./contexts/AppContext.tsx";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
});

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </Provider>
    </QueryClientProvider>
);
