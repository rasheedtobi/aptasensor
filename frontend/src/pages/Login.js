
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:4000/users/login', { email, password });
      const { user, accessToken, refreshToken } = response.data;

     
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      navigate('/');
      alert("login successful");
      window.location.reload(false);
    } catch (error) {
      alert("wrong email or password");
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div className="content-container">
      <h2 className='m-3'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="m-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            placeholder="Your Email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="m-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            placeholder="Your Password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-primary m-3">Login</button>
        <Link to="/register" className="btn btn-primary p-10">Sign Up</Link>
      </form>
    </div>
  );
}

export default Login;
