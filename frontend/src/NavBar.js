import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Navbar({ isLoggedIn, handleLogout }) {
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

  const handleUserIconClick = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  return (
    <div className='nav'>
      <Link to='/' className='site-title'>Apta<span>Sensor</span></Link>
      <ul>
        <CustomLink to="/">Curriculum</CustomLink>
        <CustomLink to="/products">Products</CustomLink>
        <CustomLink to="/contact">Contact Us</CustomLink>
        <CustomLink to="/about">About Us</CustomLink>
        <li onClick={handleUserIconClick}>
          <FontAwesomeIcon icon={faUser} />
          {showDropdown && (
            <ul className="dropdown">
              {isLoggedIn ? (
                <li onClick={handleLogout}>Logout</li>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          )}
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
