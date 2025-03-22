const jwt = require("jsonwebtoken");
// dotenv = require("dotenv");
// dotenv.config();

module.exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  const SECRET_KEY = process.env.JWT_SECRET;
  if (!token) return res.status(401).json({ message: "No autorizado" });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    console.log(SECRET_KEY);
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.user = user;
    console.log(user);
    next();
  });
};
