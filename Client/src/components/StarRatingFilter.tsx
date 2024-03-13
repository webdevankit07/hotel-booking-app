type Props = {
    selectedStars: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
    return (
        <div className='pb-5 border-b border-slate-300'>
            <h4 className='mb-2 font-semibold text-md'>Property Rating</h4>
            {['5', '4', '3', '2', '1'].map((star, i) => (
                <label className='flex items-center space-x-2 cursor-pointer' htmlFor={star} key={i}>
                    <input
                        type='checkbox'
                        className='rounded cursor-pointer'
                        id={star}
                        value={star}
                        checked={selectedStars.includes(star)}
                        onChange={onChange}
                    />
                    <span>{star} Stars</span>
                </label>
            ))}
        </div>
    );
};

export default StarRatingFilter;
