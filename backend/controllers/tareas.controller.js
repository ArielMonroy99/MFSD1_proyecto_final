const { Tarea } = require('../models');

const crearTarea = async (req, res) => {
    try {
        const { titulo, descripcion, estado, fecha_limite, usuario_id } = req.body;
        const tarea = await Tarea.create({
            titulo,
            descripcion,
            estado,
            fecha_limite,
            usuario_id
        });
        res.json(tarea);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

const obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tarea.findAll();
        res.json(tareas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

const obtenerTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tarea = await Tarea.findByPk(id);
        res.json(tarea);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

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
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

const eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tarea = await Tarea.findByPk(id);
        await tarea.destroy();
        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

module.exports = {
    crearTarea,
    obtenerTareas,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea
};
