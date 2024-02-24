import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteProducts = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  const fetchFavoriteProducts = async () => {
    try {
      const response = await axios.get('/api/user/favorites');
      setFavoriteProducts(response.data.favorites);
    } catch (error) {
      console.error('Error fetching favorite products:', error);
    }
  };

  return (
    <div className="favorite-products">
      <h3>Favorite Products</h3>
      <div className="product-list">
        {favoriteProducts.map(product => (
          <div key={product._id} className="product">
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteProducts;
