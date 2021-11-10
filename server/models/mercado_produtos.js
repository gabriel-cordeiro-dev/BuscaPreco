const { DataTypes } = require('sequelize')
const Mercados = require('../models/mercado')
const Produtos = require('../models/produtos')
const conn = require('../db')

const MercadoProdutos = conn.define('mercado_has_produtos', {
    mercado_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Mercados,
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
    preco_produto: {
        type: DataTypes.DECIMAL
    }
});
Produtos.hasMany(MercadoProdutos, { foreignKey: 'produtos_id' })
MercadoProdutos.belongsTo(Produtos, { foreignKey: 'produtos_id' })

Mercados.hasMany(MercadoProdutos, { foreignKey: 'mercado_id' })
MercadoProdutos.belongsTo(Mercados, { foreignKey: 'mercado_id' })

module.exports = MercadoProdutos