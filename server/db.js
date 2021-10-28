const Sequelize = require('sequelize')

require('dotenv').config()

const conn = new Sequelize(
    process.env.DBNAME,
    process.env.DBUSER,
    process.env.DBPASS, {
        host: process.env.DBHOST,
        dialect: 'mysql',
        define: {
            timestamps: true,
            freezeTableName: true,
            underscored: true
        }
    }
)

module.exports = conn