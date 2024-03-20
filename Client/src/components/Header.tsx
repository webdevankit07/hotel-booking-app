import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';
import { Button } from './ui/button';
import { Navbar } from 'flowbite-react';

const Header = () => {
    const { isLoggedIn } = useAppContext();
    const path = useLocation().pathname;

    return (
        <div className='sticky z-50 mx-2 top-3 sm:top-5'>
            <Navbar fluid rounded className='container py-5 border-[1px] bg-gradient-to-tl from-slate-950 to-blue-950'>
                <Navbar.Brand as={'div'} className='text-xl font-bold tracking-tight text-white'>
                    <Link to={'/'}>Travel Nest</Link>
                </Navbar.Brand>
                <span className='hidden space-x-2 md:flex '>
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
                </span>
                <Navbar.Toggle />
                <Navbar.Collapse className='md:hidden'>
                    <Navbar.Link as={'div'} active={path === '/my-bookings'}>
                        <Link to={'/my-bookings'}>My Bookings</Link>
                    </Navbar.Link>
                    <Navbar.Link as={'div'} active={path === '/my-hotels'}>
                        <Link to={'/my-hotels'}>My Hotels</Link>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;
