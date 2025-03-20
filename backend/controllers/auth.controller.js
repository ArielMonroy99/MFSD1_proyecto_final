const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const user = await User.create({
      name,
      password: bcrypt.hashSync(password, 10),
      email,
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Datos invalidos" });
      return;
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      const validPassword = bcrypt.compareSync(password, user.password);
      if (validPassword) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRATION,
        });
        res.cookie("token", token, { httpOnly: true, secure: false });
        res.json({ message: "Inicio de sesión exitoso" });
      } else {
        res.status(401).json({ message: "Contraseña incorrecta" });
      }
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const obtainAuthUserInfo = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Acceso denegado, token requerido" });

  try {
    const SECRET_KEY = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findByPk(decoded.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = {
  login,
  registerUser,
  obtainAuthUserInfo,
};
