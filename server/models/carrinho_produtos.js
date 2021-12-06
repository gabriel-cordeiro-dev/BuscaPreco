const { DataTypes } = require('sequelize')
const Carrinho = require("../models/carrinho")
const Produtos = require('../models/produtos')
const conn = require('../db')

const CarrinhoProdutos = conn.define('carrinho_has_produtos', {
    carrinho_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Carrinho,
            key: 'id'
        }
    },
    produtos_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Produtos,
            key: 'id'
        }
    },
    quantidade: DataTypes.INTEGER
});

Produtos.hasMany(CarrinhoProdutos, { foreignKey: 'produtos_id' })
CarrinhoProdutos.belongsTo(Produtos, { foreignKey: 'produtos_id' })

Carrinho.hasMany(CarrinhoProdutos, { foreignKey: 'carrinho_id' })
CarrinhoProdutos.belongsTo(Carrinho, { foreignKey: 'carrinho_id' })

module.exports = CarrinhoProdutos