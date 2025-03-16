const express = require('express')
const router = express.Router()

const { obtenerUsuarios, obtenerUsuario, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios.controller')

router.get('/', obtenerUsuarios)
router.get('/:id', obtenerUsuario)
router.post('/', crearUsuario)
router.put('/:id', actualizarUsuario)
router.delete('/:id', eliminarUsuario)

module.exports = router
