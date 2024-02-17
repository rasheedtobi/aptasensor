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
    // res.send("ok")
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
    res.json({ accessToken, refreshToken });
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

module.exports = router;
