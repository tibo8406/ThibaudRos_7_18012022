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
    //const employeeObject = req.file ? JSON.parse(req.body.employee) : req.body.employee;
    //const employeeObject = req.body.employee;
    const employeeObject = JSON.parse(req.body.employee); // expression ternaire // on est soius forme data, il faut parser en json
    console.log(employeeObject);
    if (req.file && employeeObject.urlImg) {
        console.log(employeeObject);
        const filename = employeeObject.urlImg.split('/images/')[1];
        console.log(filename);
        fs.unlink(`images/${filename}`, () => {});
        employeeObject.urlImg = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; // resout l'url urlImg, protocol = http on ajoute :// etc ...
    } else if (req.file && !employeeObject.urlImg) {
        console.log(employeeObject);
        employeeObject.urlImg = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; // resout l'url urlImg, protocol = http on ajoute :// etc ...
    } else {
        if (!req.file && employeeObject.urlImg) {
            console.log(employeeObject);
            console.log(employeeObject);
            const filename = employeeObject.urlImg.split('/images/')[1];
            console.log(filename);
            fs.unlink(`images/${filename}`, () => {});
            employeeObject.urlImg = null;
        } else {

        }
    }

    Employee.update({
        nom: employeeObject.nom,
        prenom: employeeObject.prenom,
        poste: employeeObject.poste,
        email: employeeObject.email,
        urlImg: employeeObject.urlImg
    }, {
        where: { id: employeeObject.id }
    })

    .then(employee => {
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
}