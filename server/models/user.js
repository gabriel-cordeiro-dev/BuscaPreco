const { DataTypes } = require("sequelize");
const Carrinho = require("../models/carrinho")
const conn = require("../db");

const User = conn.define("users", {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
});

User.hasMany(Carrinho, {
  foreignKey: {
      name: 'users_id'
  }
});

module.exports = User;
