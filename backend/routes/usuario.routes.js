const express = require("express");
const router = express.Router();

const {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  iniciarSesion,
  obtenerUsuarioPorToken,
} = require("../controllers/usuarios.controller");
const { verifyToken } = require("../auth.middleware");

router.get("/", verifyToken, obtenerUsuarios);
router.get("/me", verifyToken, obtenerUsuarioPorToken);
router.get("/:id", verifyToken, obtenerUsuario);
router.post("/", verifyToken, crearUsuario);
router.put("/:id", verifyToken, actualizarUsuario);
router.delete("/:id", verifyToken, eliminarUsuario);
router.post("/login", iniciarSesion);

module.exports = router;
