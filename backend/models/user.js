const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  accessToken: String,
  refreshToken: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Role field added with default value 'user'
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  cart: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }],
  orderedItems: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    // Additional fields like shipping information, order status, etc., can be added here
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
