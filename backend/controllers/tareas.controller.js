const { Tarea } = require("../models");
const { Op } = require("sequelize");

const crearTarea = async (req, res) => {
  try {
    const { titulo, descripcion, estado, fecha_limite, usuario_id } = req.body;
    const tarea = await Tarea.create({
      titulo,
      descripcion,
      estado,
      fecha_limite,
      usuario_id,
    });
    res.json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const obtenerTareas = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      filtro = null,
      fechaAntesDe = null,
      fechaDespuesDe = null,
      estado = null,
    } = req.query;

    // Condición base para el usuario
    const whereCondition = { usuario_id: id };

    // Si hay un filtro, buscar tanto en título como en descripción
    if (filtro !== null) {
      whereCondition[Op.or] = [
        { titulo: { [Op.iLike]: `%${filtro}%` } },
        { descripcion: { [Op.iLike]: `%${filtro}%` } },
      ];
    }

    // Filtros de fecha
    if (fechaAntesDe !== null || fechaDespuesDe !== null) {
      whereCondition.fecha_limite = {};

      if (fechaAntesDe !== null) {
        whereCondition.fecha_limite[Op.lte] = new Date(fechaAntesDe);
      }

      if (fechaDespuesDe !== null) {
        whereCondition.fecha_limite[Op.gte] = new Date(fechaDespuesDe);
      }
    }

    if (estado !== null) {
      whereCondition.estado = estado;
    }

    // Realizar la consulta con las condiciones preparadas
    const tareas = await Tarea.findAndCountAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
    });

    return res.json(tareas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const obtenerTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByPk(id);
    res.json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const actualizarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, estado, fecha_limite, usuario_id } = req.body;
    const tarea = await Tarea.findByPk(id);
    tarea.titulo = titulo;
    tarea.descripcion = descripcion;
    tarea.estado = estado;
    tarea.fecha_limite = fecha_limite;
    tarea.usuario_id = usuario_id;
    await tarea.save();
    res.json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByPk(id);
    await tarea.destroy();
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const marcarTareaComoTerminada = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByPk(id);
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    if (tarea.estado != 2) {
      return res.status(400).json({ message: "La tarea no está en progreso" });
    }
    tarea.estado = 3;
    await tarea.save();
    res.json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  crearTarea,
  obtenerTareas,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  marcarTareaComoTerminada,
};
