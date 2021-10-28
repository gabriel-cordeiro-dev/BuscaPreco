const { DataTypes } = require('sequelize')
const conn = require('../db')

const Mercado = conn.define('mercados', {
    mercado_nome: DataTypes.STRING
})

module.exports = Mercado