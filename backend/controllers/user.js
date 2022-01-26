const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Db = require('../db/db');
const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const userToCreate = User.build({
                email: req.body.email,
                password: hash,
                nom: req.body.nom,
                prenom: req.body.prenom,
                poste: req.body.poste
            });
            userToCreate.save();
            res.status(201).json({ message: 'Utilisateur créé !' });
        })
        .catch(error => res.status(500).json({ message: 'erreur' }));
};


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id },
                            process.env.TOKEN_SECRET, { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};