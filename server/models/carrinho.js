const { DataTypes } = require('sequelize')
const conn = require('../db')

const Carrinho = conn.define('carrinho', {
    quantidade: DataTypes.INTEGER,
    valor_total: DataTypes.DECIMAL
});

module.exports = Carrinho