import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes, useLocation} from 'react-router-dom';

import Navbar from './components/ui/Navbar/Navbar';
import Home from '../src/pages/Home';
import ProductDeets from '../src/pages/ProductDeets';
import Shop from '../src/pages/Shop';
import Profile from '../src/pages/Profile';
import Footer from './components/ui/Footer/Footer';

import Login from './pages/Login';
import Register from './pages/Register';
import CheckoutForm from './pages/CheckoutForm';
import Dropdown from './components/orderHistory/Dropdown';

const App: React.FC = () => {
    // Use useLocation to get the current path
    const location = useLocation();

    // Check if the current path is login or register
    const isAuthRoute =
        location.pathname.toLowerCase() === '/login' ||
        location.pathname.toLowerCase() === '/register' 
        // || location.pathname.toLowerCase() === '/checkout';

    return (
        <>
            {/* Conditionally render Navbar and Footer based on the path */}
            {!isAuthRoute && <Navbar />}

            <div className={`app ${isAuthRoute ? 'full-width' : ''}`}>
                <ToastContainer />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/shop' element={<Shop />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/products/:id' element={<ProductDeets />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/checkout' element={<CheckoutForm />} />
                    <Route path='/dropdown' element={<Dropdown />} />
                </Routes>
            </div>

            {/* Conditionally render Footer based on the path */}
            {!isAuthRoute && <Footer />}
        </>
    );
};

export default App;
