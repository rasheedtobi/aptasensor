
import React, { useState, useEffect } from "react";
import ProductData from "../ProductData";
import '../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = () => {
  const [detail, setDetail] = useState([]);
  const [flaggedProducts, setFlaggedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [flaggedFilter, setFlaggedFilter] = useState(false);
// Clear local storage


  useEffect(() => {
    const storedFlaggedProducts = JSON.parse(localStorage.getItem("flaggedProducts")) || [];
    setFlaggedProducts(storedFlaggedProducts);
  }, []);

  const sortProducts = (a, b) => {
    const aValue = a[sortOption];
    const bValue = b[sortOption];

    if (sortOption === "price") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
  };

  const filteredProducts = ProductData
    .filter(prod => (!categoryFilter || prod.category === categoryFilter) &&
                       (!flaggedFilter || flaggedProducts.includes(prod.id)))
    .sort(sortProducts);

  const detailPage = (product) => {
    setDetail([{...product, isFlagged: flaggedProducts.includes(product.id)}]);
  };

 const flagProduct = (productId) => {
    if (!flaggedProducts.includes(productId)) {     
      setFlaggedProducts([...flaggedProducts, productId]);
      localStorage.setItem("flaggedProducts", JSON.stringify([...flaggedProducts, productId]));
    }

    setDetail([{...ProductData.find(product => product.id === productId), isFlagged: true}]);
  };

  const addProduct = (productId) => {
  // Implement your logic for adding the product to the cart or any other desired action
  // For example, you can maintain a state for the added products
  // and update it when the "Add" button is clicked
  console.log('Added')
};

  return (
    <>
      <div className="sorting-filtering">
        <label>
          Sort by 
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </label>

        <label>
          Order 
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>

        <label>
          Filter by Category 
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
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
            onChange={() => setFlaggedFilter(!flaggedFilter)}
          />
        </label>
      </div>

<div className="detail-container">
        <div className="detail-content">
          {detail.map((product) => (
            <div key={product.id} className="detail-info">
              <div className="img-box">
                <img src={product.url} alt={product.name}></img>
                <div className="product-detail">
                  <h3>{product.name}</h3>
                  <h4>{product.category}</h4>
                  <p>{product.description}</p>
                  {product.isFlagged && <p>Favorited</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
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
  <button className="fav" onClick={() => flagProduct(product.id)}>
    <FontAwesomeIcon icon={faHeart} /> {/* Render the FontAwesome icon */}
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
