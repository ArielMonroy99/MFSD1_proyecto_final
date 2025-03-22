const express = require("express");
const router = express.Router();

const {
  registerUser,
  login,
  obtainAuthUserInfo,
  logout,
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/me", verifyToken, obtainAuthUserInfo);
router.get("/logout", logout);

module.exports = router;
