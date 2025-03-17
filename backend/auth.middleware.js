const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);
  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
