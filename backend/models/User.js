const Db = require('../db/db');

const userSchema = Db.define("user", {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    poste: { type: String, required: true }
});

//userSchema.plugin(uniqueValidator);

module.exports = userSchema;