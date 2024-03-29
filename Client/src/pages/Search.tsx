import { useQuery } from '@tanstack/react-query';
import { UseSearchContext } from '../contexts/SearchContext';
import { useState } from 'react';
import { searchHotels } from '../api/apiClient';
import SearchResultsCard from '../components/SearchResultsCard';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/StarRatingFilter';
import HotelTypesFilter from '../components/HotelTypesFilter';
import FacilitiesFilter from '../components/FacilitiesFilter';
import PriceFilter from '../components/PriceFilter';
import SearchBar from '../components/SearchBar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ScrollArea } from '../components/ui/scroll-area';

const Search = () => {
    const search = UseSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>('');

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption,
    };

    const { data: hotelData } = useQuery({
        queryKey: ['searchHotels', searchParams],
        queryFn: () => searchHotels(searchParams),
    });

    const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = e.target.value;

        setSelectedStars((prevStars) =>
            e.target.checked ? [...prevStars, starRating] : prevStars.filter((star) => star !== starRating)
        );
    };

    const handleHotelTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hotelType = e.target.value;

        setSelectedHotelTypes((prevHotelTypes) =>
            e.target.checked ? [...prevHotelTypes, hotelType] : prevHotelTypes.filter((hotel) => hotel !== hotelType)
        );
    };

    const handleFacilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const facility = e.target.value;

        setSelectedFacilities((prevFacilites) =>
            e.target.checked
                ? [...prevFacilites, facility]
                : prevFacilites.filter((prevfacility) => prevfacility !== facility)
        );
    };

    return (
        <div className='mt-20'>
            <SearchBar />
            <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 mt-5'>
                <div className='hidden p-5 mb-5 text-gray-300 border rounded-lg md:block bg-slate-950 lg:sticky border-slate-300 h-fit top-10'>
                    <div className='space-y-5'>
                        <h3 className='pb-5 text-lg font-semibold border-b border-slate-300'>Filter by:</h3>
                        <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
                        <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
                        <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilityChange} />
                        <PriceFilter
                            selectedPrice={selectedPrice}
                            onChange={(value?: number) => setSelectedPrice(value)}
                        />
                    </div>
                </div>
                <ScrollArea className='h-[250px] w-full rounded-md border p-4 md:hidden bg-slate-950 text-gray-300'>
                    <div className='space-y-5'>
                        <h3 className='pb-5 text-lg font-semibold border-b border-slate-300'>Filter by:</h3>
                        <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
                        <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
                        <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilityChange} />
                        <PriceFilter
                            selectedPrice={selectedPrice}
                            onChange={(value?: number) => setSelectedPrice(value)}
                        />
                    </div>
                </ScrollArea>
                <div className='flex flex-col gap-5'>
                    <div className='flex items-center justify-between'>
                        <span className='p-2 text-sm font-semibold text-gray-300 border rounded-md md:font-bold md:text-xl bg-slate-950'>
                            {hotelData?.pagination.total} Hotels found
                            {search.destination ? ` in ${search.destination}` : ''}
                        </span>
                        <Select value={sortOption} onValueChange={(value) => setSortOption(value)}>
                            <SelectTrigger className='w-auto text-gray-300 bg-slate-950'>
                                <SelectValue placeholder='Sort by' />
                            </SelectTrigger>
                            <SelectContent className='text-gray-300 bg-slate-950'>
                                <SelectItem value='starRating'>Star Rating</SelectItem>
                                <SelectItem value='pricePerNightAsc'>Price Per Night (low to high)</SelectItem>
                                <SelectItem value='pricePerNightDesc'>Price Per Night (high to low)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {hotelData?.data.map((hotel) => (
                        <SearchResultsCard hotel={hotel} key={hotel._id} />
                    ))}
                    <div className='py-5'>
                        <Pagination
                            pageNo={hotelData?.pagination.pageNo || 1}
                            pages={hotelData?.pagination.pages || 1}
                            onPageChange={(page) => setPage(page)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
