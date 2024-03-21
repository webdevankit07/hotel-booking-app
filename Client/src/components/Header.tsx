import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';
import { Button } from './ui/button';
import { Navbar } from 'flowbite-react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';

const Header = () => {
    const { isLoggedIn } = useAppContext();
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const path = useLocation().pathname;

    return (
        <div className='sticky z-50 mx-2 top-3 sm:top-5'>
            <Navbar className='container py-3 rounded-md md:py-5 md:rounded-xl bg-slate-950'>
                <Navbar.Brand as={'div'} className='text-base font-bold tracking-tight text-white md:text-xl'>
                    <Link to={'/'}>Travel Nest</Link>
                </Navbar.Brand>
                <div className='hidden space-x-2 md:flex'>
                    {!isLoggedIn ? (
                        <Link to={'/sign-in'}>
                            <Button variant='secondary'>Sign In</Button>
                        </Link>
                    ) : (
                        <>
                            <div className='flex gap-3 mr-5'>
                                <Link to={'/my-bookings'}>
                                    <Button variant='secondary'>My Bookings</Button>
                                </Link>
                                <Link to={'/my-hotels'}>
                                    <Button variant='secondary'>My Hotels</Button>
                                </Link>
                                <SignOutButton />
                            </div>
                        </>
                    )}
                </div>
                <div className='space-x-2 text-xl text-white cursor-pointer md:hidden'>
                    {isFilter ? (
                        <RxCross2 onClick={() => setIsFilter((prev) => !prev)} />
                    ) : (
                        <GiHamburgerMenu onClick={() => setIsFilter((prev) => !prev)} />
                    )}
                </div>
            </Navbar>
            <div
                className={`absolute w-full p-5 text-white rounded-md  top-10 bg-slate-950 transition-all duration-400 ease-in-out ${
                    isFilter ? 'translate-x-0' : 'translate-x-[-110%]'
                }`}
            >
                <div className='text-center'>
                    {!isLoggedIn ? (
                        <Link to={'/sign-in'}>
                            <Button variant='secondary'>Sign In</Button>
                        </Link>
                    ) : (
                        <div
                            className='flex flex-col space-y-2 [&>*]:py-2 [&>*]:rounded-md'
                            onClick={() => setIsFilter((prev) => !prev)}
                        >
                            <Link to={'/my-bookings'} className={`${path === '/my-bookings' && 'bg-slate-800'}`}>
                                My Bookings
                            </Link>
                            <Link to={'/my-hotels'} className={`${path === '/my-hotels' && 'bg-slate-800'}`}>
                                My Hotels
                            </Link>
                            <SignOutButton />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
