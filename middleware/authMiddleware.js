const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      
      token = req.headers.authorization.split(" ")[1];

      // verify token, valid and not expired
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // load user from db 
      req.user = await User.findById(decoded.id).select("-password");

      next(); 
    } catch (error) {
      res.status(401).json({ message: "Token is not valid, please log in again" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No token found, please log in" });
  }
};


const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); 
  } else {
    res.status(403).json({ message: "Access denied, admins only" });
  }
};

module.exports = { protect, adminOnly };
