// import { Link, useMatch, useResolvedPath } from 'react-router-dom';
// // import React from 'react';
// // import './styles.css'
// // function CustomLink({ to, children, ...props}) {
// //   const resolvedPath = useResolvedPath(to)
// //   const isActive = useMatch({ path:resolvedPath.pathname, end:true})
// //   const path = window.location.pathname
// //   return (
// //   <li className={isActive ? "active": ""}> 
// //     <Link to={to}{...props}>{children}</Link>
// //   </li>
// //   )
// // }


// // function Navbar() {
  
// //   return (
// //     <div className='nav'>
// //  <Link to='/' className='site-title'>Apta<span>Sensor</span></Link>
// //  <ul>
// //   <CustomLink to="/">Curriculum</CustomLink>
// //   <CustomLink to="/products">Products</CustomLink>
// //   <CustomLink to="/contact">Contact Us</CustomLink>
// //   <CustomLink to="/about">About Us</CustomLink>

// //  </ul>
// //     </div>
// //   )
// // }
// // export default Navbar
// import React from 'react';
// // import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import './styles.css'; // Assuming you have some styles for your navbar

// function Navbar() {
//   return (
//     <div className='nav'>
//       <Link to='/' className='site-title'>Apta<span>Sensor</span></Link>
//       <ul>
//         <CustomLink to="/">Curriculum</CustomLink>
//         <CustomLink to="/products">Products</CustomLink>
//         <CustomLink to="/contact">Contact Us</CustomLink>
//         <CustomLink to="/about">About Us</CustomLink>
//         <li>
//           <Link to="/login">
//             <FontAwesomeIcon icon={faUser} />
//           </Link>
//         </li>
//         <li>
//           <Link to="/favorites">
//             <FontAwesomeIcon icon={faHeart} />
//           </Link>
//         </li>
//         <li>
//           <Link to="/cart">
//             <FontAwesomeIcon icon={faShoppingCart} />
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// }

// // function CustomLink({ to, children }) {
// //   return (
// //     <li>
// //       <Link to={to}>{children}</Link>
// //     </li>
// //   );
// // }

// function CustomLink({ to, children, ...props}) {
//   const resolvedPath = useResolvedPath(to)
//   const isActive = useMatch({ path:resolvedPath.pathname, end:true})
//   const path = window.location.pathname
//   return (
//   <li className={isActive ? "active": ""}> 
//     <Link to={to}{...props}>{children}</Link>
//   </li>
//   )
// }

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './styles.css'; // Assuming you have some styles for your navbar

function Navbar() {
  return (
    <div className='nav'>
      <Link to='/' className='site-title'>Apta<span>Sensor</span></Link>
      <ul>
        <CustomLink to="/">Curriculum</CustomLink>
        <CustomLink to="/products">Products</CustomLink>
        <CustomLink to="/contact">Contact Us</CustomLink>
        <CustomLink to="/about">About Us</CustomLink>
        <li>
          <Link to="/login">
            <FontAwesomeIcon icon={faUser} />
          </Link>
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

function CustomLink({ to, children, ...props }) {
  return (
    <li>
      <Link to={to} {...props}>{children}</Link>
    </li>
  );
}

export default Navbar;
