import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Navbar({ isLoggedIn, handleLogout }) {
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

  const handleUserIconClick = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };
let isAvail = true;
  return (
    <div className='nav'>
      <div className='navright'>
        <Link to='/' className='site-title'>Apta</Link>
        <ul>
          <CustomLink to="/">Curriculum</CustomLink>
          <CustomLink to="/products">Products</CustomLink>
          <CustomLink to="/contact">Contact Us</CustomLink>
          <CustomLink to="/about">About Us</CustomLink>
        </ul>
      </div>
      <ul className='navright'>

        <li>
          {isAvail && (
            <div>
          <span>Username</span><button onClick={handleLogout} className='m-1'>Log out</button>  </div>)}</li>
        <li className='loginout'>
          {!isAvail && (
          <div onMouseEnter={handleUserIconClick} onMouseLeave={handleUserIconClick}>
            <FontAwesomeIcon icon={faUser} />
            {showDropdown && (
              <ul className="dropdown">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </ul>
            )}
          </div> )}
        </li>
        <li>
          <Link to="/favorites">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
        </li>
      </ul>
    </div>
  );
}

function CustomLink({ to, children }) {
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  );
}

export default Navbar;
