import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layputs...
import AuthLayout from './layouts/authLayout';
import MainLayout from './layouts/mainLayout';

// pages....
import Home from './pages/Home';
import Error from './pages/Error';
import ScrollToTop from './components/ScrollToTop';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import MyBookings from './pages/MyBookings';
import MyHotels from './pages/MyHotels';

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/my-bookings' element={<MyBookings />} />
                    <Route path='/my-hotels' element={<MyHotels />} />
                </Route>
                <Route path='/auth' element={<AuthLayout />}>
                    <Route path='sign-up' element={<SignUp />} />
                    <Route path='sign-in' element={<SignIn />} />
                </Route>
                <Route path='*' element={<Error />} />
            </Routes>
        </Router>
    );
};

export default App;
