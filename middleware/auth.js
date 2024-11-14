// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  // Check if the Authorization header is present
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch the user associated with the token's user ID
    req.user = await User.findById(decoded.id);

    // If no user found with the decoded ID
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // Handle any error during the process (e.g., expired token, invalid token, etc.)
    console.error(err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
