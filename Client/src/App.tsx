import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error from './pages/Error';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' />
                <Route path='*' element={<Error />} />
            </Routes>
        </Router>
    );
};

export default App;
