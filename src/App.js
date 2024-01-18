
import React from 'react';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Products from './pages/Products';
import {Routes, Route } from 'react-router-dom';

import Navbar from './NavBar';
import './styles.css'

function App() {
  let component;
  return (
    <div>
      <Navbar />
      {/* <div className='container'>{component}      </div> */}
      <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='/products' element ={<Products />} />
        <Route path='/about' element ={<AboutUs />} />
        <Route path='/contact' element ={<ContactUs />} />
        
      </Routes>
    </div>
  )
}

export default App;
