import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import React from 'react';
import './styles.css'
function CustomLink({ to, children, ...props}) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path:resolvedPath.pathname, end:true})
  const path = window.location.pathname
  return (
  <li className={isActive ? "active": ""}> 
    <Link to={to}{...props}>{children}</Link>
  </li>
  )
}


function Navbar() {
  
  return (
    <div className='nav'>
 <Link to='/' className='site-title'>Apta<span>Sensor</span></Link>
 <ul>
  <CustomLink to="/">Curriculum</CustomLink>
  <CustomLink to="/products">Products</CustomLink>
  <CustomLink to="/contact">Contact Us</CustomLink>
  <CustomLink to="/about">About Us</CustomLink>

 </ul>
    </div>
  )
}
export default Navbar

