const { DataTypes } = require('sequelize')
const conn = require('../db')

const Carrinho = conn.define('carrinho', {
    quantidade: DataTypes.INTEGER
})

module.exports = Carrinho