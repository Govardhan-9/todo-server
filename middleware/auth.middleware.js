const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Middleware for checking if user is logged in
const isAuthorized = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    // throw new Error('No token found');
    if (!token) {
      return res.status(401).json({ 
          status: 401, 
          message: "You are Unauthorized" 
        }); 
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = decoded.user;
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: "Your are Unauthorized"
    });
  }
};

module.exports = {isAuthorized}