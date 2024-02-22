const express = require('express');
const router = express.Router();
const {  authenticateUser, checkAdmin } = require('../middleware/authserver');
const Product = require('../models/product');

router.post('/', authenticateUser, checkAdmin, async (req, res) => {
  try {
    const { name, description, category, price, url } = req.body;
    
    const userId = req.user.userId;

    const newProduct = await Product.create({ name, description, category, price, url, userId });
    console.log("Product Added")
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
