const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasksByUser,
  getTask,
  updateTask,
  deleteTask,
  finishTask,
} = require("../controllers/tasks.controller");
const { verifyToken } = require("../auth.middleware");

router.get("/", verifyToken, getTasksByUser);
router.get("/:id", verifyToken, getTask);
router.post("/", verifyToken, createTask);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);
router.put("/finish/:id", verifyToken, finishTask);

module.exports = router;
