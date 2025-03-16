const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');

const crearUsuario = async (req, res) => {
    try {
        const { nombre, password, correo } = req.body;
        const usuario = await Usuario.create({
        nombre,
        password: bcrypt.hashSync(password, 10),
        correo
        });
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

const obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, password, correo } = req.body;
        const usuario = await Usuario.findByPk(id);
        usuario.nombre = nombre;
        usuario.password = bcrypt.hashSync(password, 10);
        usuario.correo = correo;
        await usuario.save();
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        await usuario.destroy();
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
};
