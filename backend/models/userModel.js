const Db = require('../db/db');

const employeeSchema = Db.define("employees", {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    poste: { type: String, required: true },
    urlImg: { type: String },
});

//userSchema.plugin(uniqueValidator);

module.exports = employeeSchema;