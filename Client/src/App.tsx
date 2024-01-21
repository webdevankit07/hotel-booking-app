import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages....
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Error from './pages/Error';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<Home />} />
                </Route>
                <Route path='*' element={<Error />} />
            </Routes>
        </Router>
    );
};

export default App;
