import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layputs...
import MainLayout from './layouts/mainLayout';

// pages....
import Home from './pages/Home';
import Error from './pages/Error';
import ScrollToTop from './components/ScrollToTop';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import MyBookings from './pages/MyBookings';
import MyHotels from './pages/MyHotels';
import Layout from './layouts/Layout';
import AddHotel from './pages/AddHotel';
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';
import PrivateRoute from './privateRoutes/PrivateRoute';
import PrivateAuthRoute from './privateRoutes/PrivateAuthRoute';
import HotelDetails from './pages/HotelDetails';
import Booking from './pages/Booking';

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/detail/:hotelId' element={<HotelDetails />} />
                </Route>
                <Route element={<Layout />}>
                    <Route element={<PrivateRoute />}>
                        <Route path='/my-bookings' element={<MyBookings />} />
                        <Route path='/my-hotels' element={<MyHotels />} />
                        <Route path='/add-hotel' element={<AddHotel />} />
                        <Route path='/edit-hotel/:hotelId' element={<EditHotel />} />
                        <Route path='/hotel/:hotelId/booking' element={<Booking />} />
                    </Route>
                    <Route element={<PrivateAuthRoute />}>
                        <Route path='/sign-up' element={<SignUp />} />
                        <Route path='/sign-in' element={<SignIn />} />
                    </Route>
                </Route>
                <Route path='*' element={<Error />} />
            </Routes>
        </Router>
    );
};

export default App;
