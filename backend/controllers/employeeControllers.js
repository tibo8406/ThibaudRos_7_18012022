const Employee = require('../models/userModel');
const fs = require('fs');


exports.showAllEmployees = (req, res, next) => {
    Employee.findAll()
        .then(employees => res.status(200).json(employees))
        .catch(error => res.status(400).json({ error }));
};

exports.findOneEmployee = (req, res, next) => {
    Employee.findOne({ where: { id: req.params.id } })
        .then((thisEmployee) => {
            if (thisEmployee !== null) {
                res.status(200).json(thisEmployee);
            } else {
                res.status(401).json({ error: "User non trouvé" });
            }

        });
}

exports.updateEmployeeAccount = (req, res, next) => {
    const employeeObject = JSON.parse(req.body.employee);
    console.log(employeeObject);
    if (req.file && employeeObject.urlImgOld) {
        if (employeeObject.urlImgOld === `${req.protocol}://${req.get('host')}/images/${process.env.DEFAULT_PROFIL_PICTURE}`) {
            employeeObject.urlImgNew = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

        } else {
            const filename = employeeObject.urlImgOld.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {});
            employeeObject.urlImgNew = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
    } else if (req.file && !employeeObject.urlImgOld) {
        employeeObject.urlImgNew = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    } else {
        if (!req.file && employeeObject.urlImgOld && !employeeObject.urlImgNew) {
            if (employeeObject.urlImgOld === `${req.protocol}://${req.get('host')}/images/${process.env.DEFAULT_PROFIL_PICTURE}`) {
                employeeObject.urlImgNew = `${req.protocol}://${req.get('host')}/images/${process.env.DEFAULT_PROFIL_PICTURE}`;
            } else {
                const filename = employeeObject.urlImgOld.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {});
                employeeObject.urlImgNew = `${req.protocol}://${req.get('host')}/images/${process.env.DEFAULT_PROFIL_PICTURE}`;
            }
        } else if (!req.file && employeeObject.urlImgNew) {
            employeeObject.urlImgNew = employeeObject.urlImgOld;
        }
    }


    Employee.update({
            nom: employeeObject.nom,
            prenom: employeeObject.prenom,
            poste: employeeObject.poste,
            email: employeeObject.email,
            urlImg: employeeObject.urlImgNew
        }, {
            where: { id: employeeObject.id }
        })
        .then(() => {
            Employee.findOne({ where: { id: employeeObject.id } })
                .then((thisEmployee) => {
                    if (thisEmployee !== null) {
                        res.status(200).json(thisEmployee);
                    } else {
                        res.status(401).json({ error: "User non trouvé" });
                    }

                });
        })
        .catch(error => res.status(400).json({ error }));
};

exports.deleteAccount = (req, res, next) => {
    Employee.destroy({ where: { id: req.params.id } })
        .then(function(deletedRecord) {
            if (deletedRecord === 1) {
                res.status(200).json({ message: "Compte supprimé" });
            } else {
                res.status(404).json({ message: "Compte non trouvé" })
            }
        })
        .catch(function(error) {
            res.status(500).json(error);
        });
};