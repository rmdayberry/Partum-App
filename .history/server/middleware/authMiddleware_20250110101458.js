const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Authorization Header Received:", req.header("Authorization"));
  if (!token) {
    return res.status(401).json({ message: "Authorization required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = decoded; // Attach user details to the request
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticate;
