// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {  authenticateUser, checkAdmin } = require('../middleware/authserver');
const Product = require('../models/product');

// Add product (only accessible to admin users)
router.post('/', authenticateUser, checkAdmin, async (req, res) => {
  try {
    const { name, description, category, price, url } = req.body;
    
    // Get user_id from the decoded token
    const userId = req.user.userId;

    // Create the product associated with the user_id
    const newProduct = await Product.create({ name, description, category, price, url, userId });
    console.log("Prodct Added")
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
