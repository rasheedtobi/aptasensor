import React, { useState } from 'react';
import Navbar from './Navbar';
import Login from './Login';

function AuthContainer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Login setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default AuthContainer;
