const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// const authenticateUser = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: 'Unauthorized: Token not provided' });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ _id: decoded.userId, accessToken: token });
//     if (!user) {
//       return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Servers Error' });
//   }
// };
function authenticateUser (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token === null) return sendStatus(401)
  jwt.verify(token, process.env.JWT_SECRET, (err, user)=> {
    if(err) return res.sendStatus(403)
      req.user = user
      next()
})

}

// const checkAdmin = async (req, res, next) => {
//   try {
//     const userId = req.user.userId; 
//     const user = await User.findById(userId);
//     if (!user || user.role !== 'admin') {
//       return res.status(403).json({ error: 'Forbidden: You are not authorized to perform this action' });
//     }
//     next();
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
const User = require('../models/user'); // Import the User model

const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user.userId; 
    const user = await User.findById(userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: You are not authorized to perform this action' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// module.exports = checkAdmin;

module.exports = { generateAccessToken, generateRefreshToken, authenticateUser, checkAdmin };
