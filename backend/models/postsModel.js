const Db = require('../db/db');
const employeeSchema = require('./userModel');
const Sequelize = require('sequelize');


const postSchema = Db.define("posts", {
    messages: { type: Sequelize.STRING, required: true },
    urlMedia: { type: Sequelize.STRING, required: true },

});

postSchema.belongsTo(employeeSchema, { onDelete: "cascade", as: "createur", foreignKey: { allowNull: false } })
    //userSchema.plugin(uniqueValidator);

module.exports = postSchema;