exports.checkLoginForm = (req, res, next) => {
    if (req.body.email && req.body.password) {
        next();
    } else {
        res.status(400).json({ message: "Veuillez remplir l'email et le mot de passe" });
    }
};

exports.checkSignupForm = (req, res, next) => {
    if (req.body.email && req.body.password && req.body.nom && req.body.prenom && req.body.poste) {
        next();
    } else {
        res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }
};