export type Props = {
    pageNo: number;
    pages: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({ pageNo, pages, onPageChange }: Props) => {
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='flex justify-center'>
            <ul className='flex border border-slate-300'>
                {pageNumbers.map((number) => (
                    <li className={`px-2 py-1 ${pageNo === number ? 'bg-gray-200' : ''}`} key={number}>
                        <button onClick={() => onPageChange(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
