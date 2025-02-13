const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.cookies?.token || req.headers["authorization"]?.split(" ")[1]; // ✅ Fixed

  if (!token) {
    return res.status(401).json({
      message: "Token is required/Unauthorized request",
      success: false,
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(400).json({
          message: "Invalid token",
          success: false,
        });
      }
      req.id = user._id;
      req.role = user.role;
      next();
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};


module.exports = verifyToken; 
