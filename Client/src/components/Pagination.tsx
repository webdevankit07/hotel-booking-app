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
            <ul className='flex text-gray-300 border-[2px] border-blue-600 rounded-md overflow-hidden bg-slate-950'>
                {pageNumbers.map((number) => (
                    <li className={`${pageNo === number ? 'bg-gray-800' : 'hover:bg-gray-800'}`} key={number}>
                        <button className='px-2 py-1' onClick={() => onPageChange(number)}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
