const Db = require('../db/db');
const Sequelize = require('sequelize');
const employeeSchema = require('./userModel');
const postSchema = require('../models/postsModel');

const commentsSchema = Db.define("comments", {
    comment: { type: Sequelize.STRING, required: true }, // voir pour changer pour texte
});

// commentsSchema.belongsTo(postSchema, { onDelete: "cascade", as: "post", foreignKey: { allowNull: false, field: "postId" }, targetKey: "id" }); // voir comment faire pour qu'elle marhce

commentsSchema.belongsTo(employeeSchema, { onDelete: "cascade", as: "createur", foreignKey: { allowNull: false } });


module.exports = commentsSchema;