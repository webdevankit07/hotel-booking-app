import { hotelTypes } from '../utils/utils';

type Props = {
    selectedHotelTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
    return (
        <div className='pb-5 border-b border-slate-300'>
            <h4 className='mb-2 font-semibold text-md'>Hotel Type</h4>
            {hotelTypes.map((hotelType) => (
                <label className='flex items-center space-x-2 cursor-pointer' htmlFor={hotelType} key={hotelType}>
                    <input
                        type='checkbox'
                        className='rounded cursor-pointer'
                        id={hotelType}
                        value={hotelType}
                        checked={selectedHotelTypes.includes(hotelType)}
                        onChange={onChange}
                    />
                    <span>{hotelType}</span>
                </label>
            ))}
        </div>
    );
};

export default HotelTypesFilter;
