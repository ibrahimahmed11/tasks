const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Please log in first." });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.userId).select("-password");
    if (!req.user) return res.status(401).json({ message: "User account not found." });
    req.user.isAdmin = req.user.email === process.env.ADMIN_EMAIL?.trim().toLowerCase();
    next();
  } catch {
    res.status(401).json({ message: "Your login session is invalid or expired." });
  }
};

module.exports.requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Administrator permission is required for this action." });
  }
  next();
};
