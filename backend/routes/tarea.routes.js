const express = require("express");
const router = express.Router();

const {
  obtenerTareas,
  obtenerTarea,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
  marcarTareaComoTerminada,
} = require("../controllers/tareas.controller");
const { verifyToken } = require("../auth.middleware");

router.get("/usuario/:id", verifyToken, obtenerTareas);
router.get("/:id", verifyToken, obtenerTarea);
router.post("/", verifyToken, crearTarea);
router.put("/:id", verifyToken, actualizarTarea);
router.delete("/:id", verifyToken, eliminarTarea);
router.put("/terminar/:id", verifyToken, marcarTareaComoTerminada);

module.exports = router;
