const { Task } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

const createTask = async (req, res) => {
  try {
    const { title, description, due_date, user_id } = req.body;
    const task = await Task.create({
      title,
      description,
      status: "pending",
      due_date,
      user_id,
    });
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getTasksByUser = async (req, res) => {
  try {
    const tokenUser = req.user;
    const {
      search = null,
      dateBefore = null,
      dateAfter = null,
      status = null,
    } = req.query;

    const whereCondition = { user_id: tokenUser.id };

    if (search !== null) {
      whereCondition[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (dateBefore !== null || dateAfter !== null) {
      whereCondition.due_date = {};

      if (dateBefore !== null) {
        whereCondition.due_date[Op.lte] = new Date(dateBefore);
      }

      if (dateAfter !== null) {
        whereCondition.due_date[Op.gte] = new Date(dateAfter);
      }
    }

    if (status !== null) {
      whereCondition.status = status;
    }

    const tasks = await Task.findAndCountAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
    });

    return res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor + " + error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, due_date, user_id } = req.body;
    const task = await Task.findByPk(id);
    task.title = title;
    task.description = description;
    task.status = status;
    task.due_date = due_date;
    task.user_id = user_id;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    await task.destroy();
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const finishTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    if (task.status != "in_progress") {
      return res.status(400).json({ message: "La tarea no está en progreso" });
    }
    task.status = "finished";
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  createTask,
  getTasksByUser,
  getTask,
  updateTask,
  deleteTask,
  finishTask,
};
