import { FormEvent, useState } from 'react';
import { UseSearchContext } from '../contexts/SearchContext';
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const search = UseSearchContext();
    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
        navigate('/search');
    };

    const clearSearch = () => {
        setDestination('');
        setCheckIn(new Date());
        setCheckOut(new Date());
        setAdultCount(1);
        setChildCount(0);
    };

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className='grid items-center grid-cols-2 gap-4 p-3 -mt-8 bg-orange-400 rounded shadow-md lg:grid-cols-3 2xl:grid-cols-5'
            >
                <div className='flex flex-row items-center flex-1 px-3 py-2 bg-white rounded-md '>
                    <MdTravelExplore size={25} className='mr-2' />
                    <input
                        placeholder='Where are you going?'
                        className='w-full text-md focus:outline-none'
                        value={destination}
                        onChange={(event) => setDestination(event.target.value)}
                    />
                </div>
                <div className='flex gap-2 px-3 py-1 bg-white rounded-md'>
                    <label className='flex items-center'>
                        Adults:
                        <input
                            className='w-full p-1 font-bold focus:outline-none'
                            type='number'
                            min={1}
                            max={20}
                            value={adultCount}
                            onChange={(event) => setAdultCount(parseInt(event.target.value))}
                        />
                    </label>
                    <label className='flex items-center'>
                        Children:
                        <input
                            className='w-full p-1 font-bold focus:outline-none'
                            type='number'
                            min={0}
                            max={20}
                            value={childCount}
                            onChange={(event) => setChildCount(parseInt(event.target.value))}
                        />
                    </label>
                </div>
                <div>
                    <DatePicker
                        selected={checkIn}
                        onChange={(date: Date) => setCheckIn(date)}
                        selectsStart
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={minDate}
                        maxDate={maxDate}
                        placeholderText='Check-in Date'
                        className='min-w-full px-3 py-2 bg-white rounded-md focus:outline-none'
                        wrapperClassName='min-w-full'
                    />
                </div>
                <div>
                    <DatePicker
                        selected={checkOut}
                        onChange={(date: Date) => setCheckOut(date)}
                        selectsStart
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={minDate}
                        maxDate={maxDate}
                        placeholderText='Check-out Date'
                        className='min-w-full px-3 py-2 bg-white rounded-md focus:outline-none'
                        wrapperClassName='min-w-full'
                    />
                </div>
                <div className='flex col-span-2 gap-4 2xl:gap-1 2xl:col-span-1'>
                    <button className='flex-1 h-full p-2 text-xl font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500'>
                        Search
                    </button>
                    <button
                        className='flex-1 h-full p-2 text-xl font-bold text-white bg-red-600 rounded-md hover:bg-red-500'
                        onClick={clearSearch}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </>
    );
};

export default SearchBar;
