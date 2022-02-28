const Db = require('../db/db');
const Sequelize = require('sequelize');
const employeeSchema = require('./userModel');
const postSchema = require('./postsModel');

const likesSchema = Db.define("likes", {
    liked: { type: Sequelize.BOOLEAN, required: true },
});

//likesSchema.belongsTo(postSchema, { onDelete: "cascade", as: "post", foreignKey: { allowNull: false, field: "postId" }, targetKey: "id" });

likesSchema.belongsTo(employeeSchema, { onDelete: "cascade", as: "createur", foreignKey: { allowNull: false } });

module.exports = likesSchema;