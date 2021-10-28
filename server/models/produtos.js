const { DataTypes } = require('sequelize')
const Mercados = require('../models/mercado')
const conn = require('../db')

const Produtos = conn.define('produtos', {
    item_name: DataTypes.STRING,
    preco: DataTypes.DECIMAL
})

Produtos.hasMany(Mercados)
Mercados.belongsTo(Produtos)

module.exports = Produtos