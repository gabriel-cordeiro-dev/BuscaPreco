const { DataTypes } = require('sequelize')
const conn = require('../db')

const Produtos = conn.define('produtos', {
    item_name: DataTypes.STRING,
    preco: DataTypes.DECIMAL
})

module.exports = Produtos