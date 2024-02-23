import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function NavBar({ handleLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage on component mount
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  // Function to handle logout and update user state
  const handleLogoutClick = () => {
    handleLogout();
    setUser(null); // Clear user state on logout
  };

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
          {user ? (
            <div>
              {user.username}
              <button onClick={handleLogoutClick} className='m-1'>Log out</button>
            </div>
          ) : (
            <DropdownMenu />
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

function DropdownMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
      <FontAwesomeIcon icon={faUser} />
      {isDropdownOpen && (
        <div className="dropdown-content">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
