import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState([]);
  const [flaggedProducts, setFlaggedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [flaggedFilter, setFlaggedFilter] = useState(false);

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchFlaggedProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFlaggedProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/favoritedProducts');
      setFlaggedProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sortProducts = (a, b) => {
    const aValue = a[sortOption];
    const bValue = b[sortOption];

    if (sortOption === "price") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleFlaggedFilterChange = (e) => {
    setFlaggedFilter(e.target.checked);
  };

  const filteredProducts = products
    .filter(prod => (!categoryFilter || prod.category === categoryFilter) &&
                       (!flaggedFilter || flaggedProducts.includes(prod.id)))
    .sort(sortProducts);

  const detailPage = (product) => {
    setDetail([{...product, isFlagged: flaggedProducts.includes(product._id)}]);
  };


  const flagProduct = async (productId) => {
  if (user) {
    try {
      const accessToken = localStorage.getItem('accessToken'); // Assuming the access token is stored in localStorage

      // Make sure accessToken exists before proceeding
      if (!accessToken) {
        console.error('Access token not found');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
await axios.post(`http://localhost:4000/users/favorites/add/${productId}`, null, config);

      // Update the detail state if necessary
      // setDetail([{...products.find(product => product.id === productId), isFlagged: true}]);

      // Update user data in local storage
      const updatedUser = {...user, favorites: [...user.favorites, productId]};
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      alert("Product favorited")
    } catch (error) {
      console.error('Error flagging product:', error);
      
    }
  } else {
    
    navigate('/login');
  }
};


const addProduct = (productId) => {
    if (user){
      // To be implemented
      
      console.log('Added')
    } else {
      navigate('/login')
    }
  };

  return (
    <>
      <div className="sorting-filtering">
        <label>
          Sort by 
          <select value={sortOption} onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </label>

        <label>
          Order 
          <select value={sortOrder} onChange={handleOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>

        <label>
          Filter by Category 
          <select value={categoryFilter} onChange={handleCategoryFilterChange}>
            <option value="">All</option>
            <option value="gold">Gold</option>
            <option value="aptamer">Aptamer</option>
          </select>
        </label>

        <label>
          Favorites 
          <input
            type="checkbox"
            checked={flaggedFilter}
            onChange={handleFlaggedFilterChange}
          />
        </label>
      </div>

      <div className="detail-container">
        {/* Detail container JSX */}
      </div>

      <div className="product-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="box">
            <div className="content">
              <div className="img-box">
                <img src={product.url} alt={product.name}></img>
                <div className="detail">
                  <div className="info">
                    <h3>{product.name}</h3>
                    <p> €{product.price}</p>
                  </div>
                  <div className="buttons">
                    <button onClick={() => detailPage(product)}>View</button>
                    <button className="fav" onClick={() => flagProduct(product._id)}>
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button className="add" onClick={() => addProduct(product.id)}>Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
