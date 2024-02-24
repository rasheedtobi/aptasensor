const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken, authenticateUser, checkAdmin } = require('../middleware/authserver');
const User = require('../models/user');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Could not register user' });
  }
});

router.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    // Generate access token and refresh token
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    // Save refresh token to the database
    user.refreshToken = refreshToken;
    await user.save();
    res.json({ user, accessToken, refreshToken });
    // res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Could not log in' });
  }
// res.send("ok")
});

router.post('/logout', authenticateUser, async (req, res) => {
  try {
    const user = req.user;
    // Invalidate user's access and refresh tokens
    user.accessToken = null;
    user.refreshToken = null;
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Could not log out user' });
  }
});

router.post('/refreshToken', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Generate new access token
    const accessToken = generateAccessToken(user._id);
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Could not refresh token' });
  }
});

// Grant admin rights to user (accessible only to existing admins)
router.put('/:userId/grantAdmin', authenticateUser, checkAdmin, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Update user's role to admin
    user.role = 'admin';
    await user.save();
    res.json({ message: 'Admin rights granted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Add a new route to get user's cart and favorites
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      cart: user.cart,
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a route to add a product to the user's cart
router.post('/cart/add/:productId', authenticateUser, async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = req.user;

    // Check if the product is already in the cart
    if (!user.cart.includes(productId)) {
      user.cart.push(productId);
      await user.save();
      res.json({ message: 'Product added to cart successfully' });
    } else {
      res.status(400).json({ error: 'Product is already in the cart' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a route to remove a product from the user's cart
router.delete('/cart/remove/:productId', authenticateUser, async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = req.user;

    // Check if the product is in the cart
    if (user.cart.includes(productId)) {
      user.cart = user.cart.filter((id) => id !== productId);
      await user.save();
      res.json({ message: 'Product removed from cart successfully' });
    } else {
      res.status(400).json({ error: 'Product is not in the cart' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add a route to add a product to the user's favorites
router.post('/favorites/add/:productId', authenticateUser, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.userId; // Assuming userId holds the ObjectId of the user
    
    // Check if the product is already in the favorites
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      await user.save();
      res.json({ message: 'Product added to favorites successfully' });
    } else {
      res.status(400).json({ error: 'Product is already in favorites' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a route to remove a product from the user's favorites
// Add a route to remove a product from the user's favorites
router.delete('/favorites/remove/:productId', authenticateUser, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.userId; // Assuming userId holds the ObjectId of the user
    
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the product is in the favorites
    const index = user.favorites.indexOf(productId);
    if (index === -1) {
      return res.status(400).json({ error: 'Product is not in favorites' });
    }

    // Remove the product from favorites
    user.favorites.splice(index, 1);
    await user.save();
    res.json({ message: 'Product removed from favorites successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/favorites', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId; // Get the user's ID from the authenticated user object
    const user = await User.findById(userId).populate('favorites'); // Populate the 'favorites' field to get the actual product documents
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ favorites: user.favorites });
  } catch (error) {
    console.error('Error fetching favorite products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Update a product in the user's cart
router.patch('/cart/update/:productId', authenticateUser, async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = req.user;

    // Check if the product is in the cart
    if (user.cart.includes(productId)) {
      // Assuming you have an update object in the request body, e.g., { quantity: 3 }
      const updateObject = req.body;

      // Update the product in the user's cart (for example, updating quantity)
      // You can customize this based on your application logic
      // Example: user.cart.find(product => product.productId === productId).quantity = updateObject.quantity;

      await user.save();
      res.json({ message: 'Product in cart updated successfully' });
    } else {
      res.status(400).json({ error: 'Product is not in the cart' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a product in the user's favorites
router.patch('/favorites/update/:productId', authenticateUser, async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = req.user;

    // Check if the product is in the favorites
    if (user.favorites.includes(productId)) {
      // Assuming you have an update object in the request body, e.g., { rating: 5 }
      const updateObject = req.body;

      // Update the product in the user's favorites (for example, updating rating)
      // You can customize this based on your application logic
      // Example: user.favorites.find(product => product.productId === productId).rating = updateObject.rating;

      await user.save();
      res.json({ message: 'Product in favorites updated successfully' });
    } else {
      res.status(400).json({ error: 'Product is not in favorites' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





router.get('/username', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming userId is available in the request object
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const username = user.username;
    res.json({ username });
  } catch (error) {
    console.error('Error finding user by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;