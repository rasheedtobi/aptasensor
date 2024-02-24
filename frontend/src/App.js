
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './NavBar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorite from './pages/Favorite';
import Footer from './pages/Footer';
import './styles.css';

function App() {
 
  const handleLogout = () => {
    // Clear user-related data from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
   
    alert("Thank you. You are logged out")
     // Redirect to login page 
    window.location.href = '/login';
  };

  return (
    <div className='app-wrapper'>
      <Navbar handleLogout={handleLogout} />
      
      <div className="content-wrapper">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/favorites' element={<Favorite />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
