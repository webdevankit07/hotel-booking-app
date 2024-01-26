import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='py-6 bg-blue-800'>
            <div className='container mx-auto'>
                <div className='flex justify-between px-4 md:px-0'>
                    <span className='text-3xl font-bold tracking-tight text-white'>
                        <Link to={'/'}>Holidays.com</Link>
                    </span>
                    <span className='flex space-x-2'>
                        <Link
                            to={'/auth/sign-in'}
                            className='flex items-center px-3 font-bold text-blue-600 transition-all duration-100 ease-in-out bg-white rounded-md hover:bg-gray-200'
                        >
                            Sign In
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Header;
