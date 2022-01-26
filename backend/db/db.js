const { Sequelize } = require('sequelize');

let Db = new Sequelize(process.env.BDD_NAME, process.env.BDD_USER, process.env.BDD_PASSWORD, {
    dialect: "mysql",
    host: "localhost"
});

module.exports = Db;