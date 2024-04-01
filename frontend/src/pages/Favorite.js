import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Assuming using React Router

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate(); // Use navigate for routing

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (user && user.favorites && user.favorites.length > 0) {
        const products = [];
        for (const id of user.favorites) {
          try {
            const response = await axios.get(`http://localhost:4000/products/${id}`);
            products.push(response.data);
          } catch (error) {
            console.error(`Error fetching product with ID ${id}:`, error);
          }
        }
        setFavoriteProducts(products);
      }
      setIsLoading(false);
    };

    fetchFavoriteProducts();
  }, [user]);

  const removeFromFavorites = async (productId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error('Access token not found');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.delete(`http://localhost:4000/users/favorites/remove/${productId}`, config);

      const updatedUser = JSON.parse(localStorage.getItem('user'));
      updatedUser.favorites = updatedUser.favorites.filter((id) => id !== productId);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setFavoriteProducts(favoriteProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error removing product from favorites:', error);
    }
  };

  // Check for user and redirect if necessary
  if (!user) {
    navigate('/login'); 
    return null; 
  }

  return (
    <div className="product-container">
      <h1>Favorites</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        favoriteProducts.length === 0 ? (
          <p>Empty Wishlist</p>
        ) : (
          favoriteProducts.map((product) => (
            <div key={product.id} className="box">
              <div className="content">
                <div className="img-box">
                  <img src={product.url} alt={product.name} />
                  <div className="detail">
                    <div className="info">
                      <h3>{product.name}</h3>
                      <p>€{product.price}</p>
                      <button onClick={() => removeFromFavorites(product._id)}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default Favorites;
