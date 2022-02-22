const Db = require('../db/db');
const Sequelize = require('sequelize');
const employeeSchema = require('./userModel');
const postSchema = require('../models/postsModel');

const commentsSchema = Db.define("comments", {
    comment: { type: Sequelize.STRING, required: true },
});

commentsSchema.belongsTo(employeeSchema, { onDelete: "cascade", as: "createur", foreignKey: { allowNull: false } });
commentsSchema.belongsTo(postSchema, { onDelete: "cascade", as: "post", foreignKey: { allowNull: false } });

module.exports = commentsSchema;