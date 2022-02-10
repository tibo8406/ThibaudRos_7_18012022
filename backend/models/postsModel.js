const Db = require('../db/db');

const postSchema = Db.define("posts", {
    nom_auteur: { type: String, required: true, unique: true },
    prenom_auteur: { type: String, required: true },
    poste_auteur: { type: String, required: true },
    user_id: { type: Number, required: true },
    messages: { type: String, required: true },
    urlMedia: { type: String, required: true },

});

//userSchema.plugin(uniqueValidator);

module.exports = postSchema;