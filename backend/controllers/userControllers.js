const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/userModel');

exports.signup = (req, res, next) => {
    Employee.findOne({ where: { email: req.body.email } })
        .then(emailFound => {
            if (emailFound) {
                return res.status(401).json({ message: 'Utilisateur existant !' });
            }
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const employeeToCreate = Employee.build({
                        email: req.body.email,
                        password: hash,
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        poste: req.body.poste
                    });
                    employeeToCreate.save();
                    res.status(201).json({ message: 'Utilisateur créé !' });
                })
                .catch(error => res.status(500).json({ message: 'erreur' }));
        })
};

exports.login = (req, res, next) => {
    Employee.findOne({ where: { email: req.body.email } })
        .then(employeeFound => {
            if (!employeeFound) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, employeeFound.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        id: employeeFound.id,
                        token: jwt.sign({ id: employeeFound.id },
                            process.env.SECRET_TOKEN, { expiresIn: '12h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};