const Db = require('../db/db');
const employeeSchema = require('./userModel');
const Sequelize = require('sequelize');
const commentsSchema = require('./commentsModel');
const likesSchema = require('./likesModel');

const postSchema = Db.define("posts", {
    messages: { type: Sequelize.STRING, required: true },
    urlMedia: { type: Sequelize.STRING, required: true },
});

postSchema.belongsTo(employeeSchema, { onDelete: "cascade", as: "createur", foreignKey: { allowNull: false } });
postSchema.hasMany(likesSchema, { onDelete: "cascade", as: "likes", });
postSchema.hasMany(commentsSchema, { onDelete: "cascade", as: "comments", });


module.exports = postSchema;