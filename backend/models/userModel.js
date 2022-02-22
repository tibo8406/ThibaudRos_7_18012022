const Db = require('../db/db');
const Sequelize = require('sequelize');

const employeeSchema = Db.define("employees", {
    email: { type: Sequelize.STRING, required: true, unique: true },
    password: { type: Sequelize.STRING, required: true },
    nom: { type: Sequelize.STRING, required: true },
    prenom: { type: Sequelize.STRING, required: true },
    poste: { type: Sequelize.STRING, required: true },
    urlImg: { type: Sequelize.STRING },
    //    isAdmin: { type: Sequelize.BOOLEAN, defaultValue: false }

});

module.exports = employeeSchema;