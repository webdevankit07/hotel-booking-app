import { createContext, useContext, useState } from 'react';
import { SearchContextType } from '../utils/Types';

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [destination, setDestination] = useState<string>('');
    const [checkIn, setCheckIn] = useState<Date>(new Date());
    const [checkOut, setCheckOut] = useState<Date>(new Date());
    const [adultCount, setAdultCount] = useState<number>(1);
    const [childCount, setChildCount] = useState<number>(0);
    const [hotelId, setHotelId] = useState<string>('');

    const saveSearchValues = (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number,
        hotelId?: string
    ) => {
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
        if (hotelId) {
            setHotelId(hotelId);
        }
        sessionStorage.setItem('destination', destination);
        sessionStorage.setItem('checkIn', checkIn.toISOString());
        sessionStorage.setItem('checkOut', checkOut.toISOString());
        sessionStorage.setItem('adultCount', adultCount.toString());
        sessionStorage.setItem('childCount', childCount.toString());

        if (hotelId) {
            sessionStorage.setItem('hotelId', hotelId);
        }
    };

    return (
        <SearchContext.Provider
            value={{
                destination,
                checkIn,
                checkOut,
                adultCount,
                childCount,
                hotelId,
                saveSearchValues,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const UseSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContextType;
};
