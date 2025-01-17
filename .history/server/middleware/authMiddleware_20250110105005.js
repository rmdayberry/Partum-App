const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Authorization Header Received:", req.header("Authorization"));
  console.log("Extracted Token:", token);

  if (!token) {
    console.error("No token provided.");
    return res.status(401).json({ message: "Authorization required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    console.log("Current Server Time:", Math.floor(Date.now() / 1000));
    console.log("Token Expiry Time:", decoded.exp);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticate;
