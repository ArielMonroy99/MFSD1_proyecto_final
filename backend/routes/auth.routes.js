const express = require("express");
const router = express.Router();

const {
  registerUser,
  login,
  obtainAuthUserInfo,
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/me", verifyToken, obtainAuthUserInfo);

module.exports = router;
