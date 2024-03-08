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

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                </Route>
                <Route element={<Layout />}>
                    <Route path='/my-bookings' element={<MyBookings />} />
                    <Route path='/my-hotels' element={<MyHotels />} />
                    <Route path='/add-hotel' element={<AddHotel />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/sign-in' element={<SignIn />} />
                </Route>
                <Route path='*' element={<Error />} />
            </Routes>
        </Router>
    );
};

export default App;
