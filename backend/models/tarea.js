"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tarea extends Model {
    static associate(models) {
      Tarea.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
        as: "usuario",
      });
    }
  }
  Tarea.init(
    {
      titulo: DataTypes.STRING,
      descripcion: DataTypes.STRING,
      estado: DataTypes.INTEGER,
      fecha_limite: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Tarea",
    }
  );
  return Tarea;
};
