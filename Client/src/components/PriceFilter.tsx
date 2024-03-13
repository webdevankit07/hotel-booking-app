type Props = {
    selectedPrice?: number;
    onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
    return (
        <div>
            <h4 className='mb-2 font-semibold text-md'> Max Price (₹)</h4>
            <select
                className='w-full p-2 border rounded-md'
                value={selectedPrice}
                onChange={(event) => onChange(event.target.value ? parseInt(event.target.value) : undefined)}
            >
                <option value=''>Select Max Price</option>
                {[500, 1000, 2000, 5000, 10000].map((price) => (
                    <option value={price} key={price}>
                        {price}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PriceFilter;
