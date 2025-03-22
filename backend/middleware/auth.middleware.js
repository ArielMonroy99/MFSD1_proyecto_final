const jwt = require("jsonwebtoken");

module.exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  const SECRET_KEY = process.env.JWT_SECRET;
  if (!token) return res.status(401).json({ message: "No autorizado" });
  console.log(token);
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Token inválido" });
    }
    req.user = user;
    next();
  });
};
